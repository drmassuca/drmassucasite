// api/chat.js
// Vercel Serverless Function - Chatbot com RAG
// Fluxo: embed query -> Supabase pgvector match -> Grok com contexto

const GROK_URL = 'https://api.x.ai/v1/responses';
const GROK_MODEL = 'grok-4-1-fast-non-reasoning';
const OPENAI_URL = 'https://api.openai.com/v1/embeddings';
const EMBED_MODEL = 'text-embedding-3-small';
const EMBED_DIMS = 1536;

const SYSTEM_PROMPT = `Voce e o assistente virtual oficial do Dr. Antonio Massucatti Neto (Dr. Massuca), CRM-GO 17475, medico ultrassonografista em Itaberai-GO.

REGRAS:
- Responda SEMPRE em portugues brasileiro, com tom cordial, agil e direto.
- Use APENAS o contexto fornecido abaixo. Se a informacao nao estiver no contexto, diga que vai direcionar para o WhatsApp da clinica.
- NUNCA se refira ao Dr. Massuca como "especialista" - sempre como "medico pos-graduado em ultrassonografia geral e ecocardiografia fetal".
- NUNCA invente dados (precos, horarios, nomes de exames que nao apareceram no contexto).
- NUNCA substitua avaliacao medica - oriente a procurar atendimento se for caso clinico.

REDIRECIONAMENTO OBRIGATORIO PARA WHATSAPP (62) 99660-2117:
- Para precos, valores, custos
- Para agendamento, marcar consulta, horarios disponiveis
- Para casos onde o contexto nao tem a resposta especifica
- Resposta padrao: "Te passo tudo certinho pelo WhatsApp! E so clicar no botao logo abaixo do chat."

Limite-se a respostas concisas (2-4 paragrafos curtos). Se a conversa passar de 5 trocas, oriente o usuario a continuar pelo WhatsApp.`;

async function embed(text, openaiKey) {
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: text,
      dimensions: EMBED_DIMS,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI embed ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data[0].embedding;
}

async function matchContent(supaUrl, serviceKey, queryEmbedding, count = 5) {
  const res = await fetch(`${supaUrl}/rest/v1/rpc/match_site_content`, {
    method: 'POST',
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query_embedding: queryEmbedding,
      match_count: count,
      match_threshold: 0.35,
    }),
  });
  if (!res.ok) {
    console.error('Supabase RPC error:', await res.text());
    return [];
  }
  return res.json();
}

function buildContextText(matches) {
  if (!matches || matches.length === 0) {
    return '(Nenhum contexto encontrado para essa pergunta. Direcione para o WhatsApp.)';
  }
  return matches
    .map((m, i) => `[${i + 1}] ${m.title}\n${m.content}`)
    .join('\n\n---\n\n');
}

async function callGrok(grokKey, systemContext, userMessages) {
  const input = [
    { role: 'system', content: `${SYSTEM_PROMPT}\n\nCONTEXTO DO SITE:\n${systemContext}` },
    ...userMessages,
  ];

  const res = await fetch(GROK_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${grokKey}`,
    },
    body: JSON.stringify({
      model: GROK_MODEL,
      input,
    }),
  });
  if (!res.ok) throw new Error(`Grok ${res.status}: ${await res.text()}`);
  const data = await res.json();

  // Responses API retorna output[].content[].text
  for (const msg of data.output || []) {
    if (msg.type === 'message') {
      const text = msg.content?.find(c => c.type === 'output_text')?.text;
      if (text) return text.trim();
    }
  }
  throw new Error('Grok nao retornou resposta de texto.');
}

export default async function handler(req, res) {
  // CORS basico (mesma origem na pratica, mas defensivo)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages } = req.body || {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array obrigatorio' });
  }

  const lastUser = [...messages].reverse().find(m => m.role === 'user');
  if (!lastUser?.content?.trim()) {
    return res.status(400).json({ error: 'Ultima mensagem do user vazia' });
  }

  const GROK_API_KEY = process.env.GROK_API_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const SUPA_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!GROK_API_KEY) return res.status(500).json({ error: 'GROK_API_KEY ausente' });
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY ausente' });
  if (!SUPA_URL || !SERVICE_KEY) return res.status(500).json({ error: 'Supabase env ausente' });

  try {
    const queryEmbedding = await embed(lastUser.content, OPENAI_API_KEY);
    const matches = await matchContent(SUPA_URL, SERVICE_KEY, queryEmbedding, 5);
    const context = buildContextText(matches);

    const sanitized = messages
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: m.content }));

    const answer = await callGrok(GROK_API_KEY, context, sanitized);

    return res.status(200).json({
      answer,
      sources: matches.map(m => ({
        source: m.source,
        source_id: m.source_id,
        title: m.title,
        similarity: Number(m.similarity?.toFixed(3)),
      })),
    });
  } catch (e) {
    console.error('chat handler error:', e);
    return res.status(502).json({ error: e.message });
  }
}
