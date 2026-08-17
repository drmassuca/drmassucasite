// api/chat.js
// Vercel Serverless Function - Chatbot com RAG
// Fluxo: embed query -> Supabase pgvector match -> Grok com contexto

const GROK_URL = 'https://api.x.ai/v1/responses';
const GROK_MODEL = 'grok-4-1-fast-non-reasoning';
const OPENAI_URL = 'https://api.openai.com/v1/embeddings';
const EMBED_MODEL = 'text-embedding-3-small';
const EMBED_DIMS = 1536;

const SYSTEM_PROMPT = `Voce e o assistente virtual oficial do Dr. Antonio Massucatti Neto (Dr. Massuca), CRM-GO 17475.

QUEM ELE E (fatos estaveis, voce pode afirmar sem precisar do contexto abaixo):
O Dr. Massuca atua em quatro frentes, nesta ordem de peso:
1. Medico ultrassonografista, com consultorio em Itaberai-GO. Pos-graduado em
   ultrassonografia geral e ecocardiografia fetal, mais de 20 anos de medicina.
2. Educador medico: professor do curso "Medicina com IA: O Metodo Pratico para o
   Medico Moderno", em parceria com a ICS Academy. Sim, ele da aulas de IA na medicina.
3. Criador de produtos de inteligencia artificial para medicina: fundador e CEO da
   Xdiag Tecnologias (xdiag.com.br), com os produtos AILA, Xdiag Privacy e ICS Academy.
4. Palestrante sobre IA na medicina em congressos e sociedades medicas.
Tese que ele defende: a IA amplia o medico e depende do fundamento dele.

REGRAS:
- Responda SEMPRE em portugues brasileiro, com tom cordial, agil e direto.
- TEXTO PURO, sem markdown. A bolha do chat nao renderiza formatacao, entao
  asterisco, underline e acento grave aparecem literais na tela. Nao use ** para
  negrito, nem # para titulo, nem \`codigo\`. Para lista, use hifen no inicio da linha.
- Para DETALHES (precos, datas, horarios, nomes de exames, grade de curso, titulos de
  palestra), use apenas o contexto fornecido abaixo. Nao invente nenhum detalhe.
- A identidade das quatro frentes acima voce pode afirmar sempre. Nunca responda que
  "nao encontrou informacao" sobre o curso, a Xdiag ou as palestras: eles existem.
  Se faltar o detalhe especifico, confirme a frente e encaminhe para a pagina certa.
- NUNCA se refira ao Dr. Massuca como "especialista" - sempre como "medico pos-graduado
  em ultrassonografia geral e ecocardiografia fetal".
- NUNCA o descreva como programador ou desenvolvedor. Ele e medico e cria produtos.
- NUNCA substitua avaliacao medica - oriente a procurar atendimento se for caso clinico.

PARA ONDE ENCAMINHAR:
- Precos, agendamento, horarios disponiveis: WhatsApp (62) 99660-2117.
  Resposta padrao: "Te passo tudo certinho pelo WhatsApp! E so clicar no botao logo abaixo do chat."
- Curso de IA para medicos: pagina /curso-medicina-com-ia.
- Produtos de IA e a empresa: pagina /xdiag.
- Convite para palestra e agenda de eventos: pagina /palestras.
- Duvida clinica sobre exame: pagina do exame em /exames, e reforce a avaliacao medica.

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
      match_threshold: 0.45,
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
    return (
      '(Nenhum trecho do site casou com essa pergunta. Se ela for sobre quem o ' +
      'Dr. Massuca e ou sobre uma das quatro frentes, responda pela identidade ' +
      'acima e encaminhe para a pagina certa. Se pedir preco, data ou ' +
      'agendamento, direcione para o WhatsApp.)'
    );
  }
  return matches
    .map((m, i) => `[${i + 1}] ${m.title}\n${m.content}`)
    .join('\n\n---\n\n');
}

// A bolha do chat renderiza texto puro (<Text whiteSpace="pre-wrap">), sem
// parser de markdown. Sem isto, ** e ` chegam como literal na tela. O prompt
// ja pede texto puro; esta funcao e a rede de seguranca.
function stripMarkdown(s) {
  return String(s || '')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1 ($2)') // link -> texto (url)
    .replace(/(\*\*|__)(.*?)\1/g, '$2') // negrito
    .replace(/(^|[\s(])[*_]([^*_\n]+)[*_](?=[\s.,;:!?)]|$)/g, '$1$2') // italico
    .replace(/`([^`\n]+)`/g, '$1') // codigo inline
    .replace(/^#{1,6}\s+/gm, '') // titulo
    .replace(/^\s*[*+]\s+/gm, '- '); // bullet * ou + vira hifen
}

// Heuristica de fallback: ou RAG nao retornou nada, OU top_sim baixo
// E modelo admitiu nao saber. Menciao isolada de "WhatsApp" nao conta
// (pode ser direcionamento valido pra preco/agendamento, com RAG forte).
function detectFallback(sources, answer) {
  if (!sources || sources.length === 0) return true;
  const topSim = sources[0]?.similarity ?? 0;
  if (topSim >= 0.5) return false;
  const text = String(answer || '');
  return /n[ãa]o\s+(tenho|sei|consigo|encontrei|posso)/i.test(text)
      || /sem\s+informa[çc][ãa]o/i.test(text)
      || /n[ãa]o\s+est[áa]\s+no\s+contexto/i.test(text);
}

async function logInteraction(supaUrl, serviceKey, payload) {
  try {
    const r = await fetch(`${supaUrl}/rest/v1/chat_interactions`, {
      method: 'POST',
      headers: {
        'apikey': serviceKey,
        'Authorization': `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(payload),
    });
    if (!r.ok) console.error('chat_interactions log failed:', r.status, await r.text());
  } catch (e) {
    console.error('chat_interactions log error:', e.message);
  }
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
  const startedAt = Date.now();

  // CORS basico (mesma origem na pratica, mas defensivo)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { messages, sessionId } = req.body || {};
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

  const sessionIdSafe = typeof sessionId === 'string' && sessionId.length <= 128 ? sessionId : null;
  let matches = [];

  try {
    const queryEmbedding = await embed(lastUser.content, OPENAI_API_KEY);
    matches = await matchContent(SUPA_URL, SERVICE_KEY, queryEmbedding, 5);
    const context = buildContextText(matches);

    const sanitized = messages
      .filter(m => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
      .map(m => ({ role: m.role, content: m.content }));

    const answer = stripMarkdown(await callGrok(GROK_API_KEY, context, sanitized));

    const sources = matches.map(m => ({
      source: m.source,
      source_id: m.source_id,
      title: m.title,
      similarity: Number(m.similarity?.toFixed(3)),
    }));

    // Log da interacao (await pra garantir gravacao no Vercel serverless;
    // latencia adicional ~50ms aceitavel comparado aos ~2s do Grok).
    await logInteraction(SUPA_URL, SERVICE_KEY, {
      session_id: sessionIdSafe,
      user_message: lastUser.content,
      response: answer,
      top_similarity: sources[0]?.similarity ?? null,
      sources_count: sources.length,
      sources,
      latency_ms: Date.now() - startedAt,
      fallback_to_whatsapp: detectFallback(sources, answer),
    });

    return res.status(200).json({ answer, sources });
  } catch (e) {
    console.error('chat handler error:', e);

    // Log do erro tambem (best-effort)
    await logInteraction(SUPA_URL, SERVICE_KEY, {
      session_id: sessionIdSafe,
      user_message: lastUser.content,
      response: null,
      top_similarity: matches[0] ? Number(matches[0].similarity?.toFixed(3)) : null,
      sources_count: matches.length,
      sources: matches.length
        ? matches.map(m => ({
            source: m.source,
            source_id: m.source_id,
            title: m.title,
            similarity: Number(m.similarity?.toFixed(3)),
          }))
        : null,
      latency_ms: Date.now() - startedAt,
      fallback_to_whatsapp: false,
      error: e.message,
    });

    return res.status(502).json({ error: e.message });
  }
}
