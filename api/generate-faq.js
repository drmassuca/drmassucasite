// api/generate-faq.js
// Serverless Function — Vercel
// Gera resposta via Grok (Responses API + web_search) e salva no Supabase

const GROK_URL   = 'https://api.x.ai/v1/responses';
const SUPA_URL   = 'https://auvyolzrjoyzsribmapa.supabase.co';

function slugify(text) {
  return text
    .toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .slice(0, 80);
}

async function supaInsert(item, serviceKey) {
  const res = await fetch(`${SUPA_URL}/rest/v1/faq_items`, {
    method: 'POST',
    headers: {
      'apikey': serviceKey,
      'Authorization': `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(item),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data?.message || 'Supabase insert error');
  return Array.isArray(data) ? data[0] : data;
}

async function supaSlugExists(slug, serviceKey) {
  const res = await fetch(
    `${SUPA_URL}/rest/v1/faq_items?slug=eq.${encodeURIComponent(slug)}&select=id&limit=1`,
    { headers: { 'apikey': serviceKey, 'Authorization': `Bearer ${serviceKey}` } }
  );
  const data = await res.json();
  return Array.isArray(data) && data.length > 0;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question } = req.body || {};
  if (!question?.trim()) return res.status(400).json({ error: 'question é obrigatório' });

  const GROK_API_KEY  = process.env.GROK_API_KEY;
  const SERVICE_KEY   = process.env.SUPABASE_SERVICE_KEY;

  if (!GROK_API_KEY || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Variáveis de ambiente ausentes' });
  }

  // ── Grok: Responses API com web_search + function tool ────────────────
  let generated;
  try {
    const grokRes = await fetch(GROK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROK_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'grok-4-1-fast-reasoning',
        tools: [
          { type: 'web_search' },
          {
            type: 'function',
            name: 'format_faq_response',
            description: 'Formata a resposta final como JSON estruturado para o FAQ do Dr. Massuca.',
            parameters: {
              type: 'object',
              properties: {
                answer: {
                  type: 'string',
                  description: 'Resposta completa em texto corrido, máximo 3 parágrafos, sem markdown.',
                },
                short_answer: {
                  type: 'string',
                  description: 'Resumo em uma frase de até 120 caracteres.',
                },
                section: {
                  type: 'string',
                  enum: [
                    '1. Função do Ultrassom',
                    '2. Tipos de Ultrassom',
                    '3. Valor e Acesso',
                    '4. Indicações do Ultrassom',
                    'Outras Dúvidas',
                  ],
                },
                slug: {
                  type: 'string',
                  description: 'Slug kebab-case sem acentos, máximo 60 caracteres.',
                },
              },
              required: ['answer', 'short_answer', 'section', 'slug'],
            },
          },
        ],
        tool_choice: 'auto',
        input: [
          {
            role: 'system',
            content: `Você é o assistente virtual do Dr. Massuca (Dr. Antonio Massucatti Neto, CRM-GO 17475), médico ultrassonografista em Itaberaí-GO. Site: drmassuca.com.br.

Para perguntas sobre a clínica (endereço, exames, horários, contato), use a web_search para buscar informações sobre "Dr. Massuca Itaberaí". Para dúvidas médicas sobre ultrassom, use seu conhecimento médico.

Após obter as informações, SEMPRE chame a function format_faq_response. Responda em português brasileiro, de forma clara e acolhedora. Nunca invente dados. Nunca substitua a consulta médica.`,
          },
          { role: 'user', content: question.trim() },
        ],
      }),
    });

    if (!grokRes.ok) {
      const err = await grokRes.text();
      throw new Error(`Grok error ${grokRes.status}: ${err}`);
    }

    const grokData = await grokRes.json();

    // Extrai argumentos da function tool
    let toolArgs = null;
    for (const msg of grokData.output || []) {
      if (msg.type === 'function_call' && msg.name === 'format_faq_response') {
        toolArgs = JSON.parse(msg.arguments);
        break;
      }
    }

    if (toolArgs) {
      toolArgs.answer = toolArgs.answer
        ?.replace(/<grok:render[^>]*>.*?<\/grok:render>/gs, '')
        ?.replace(/\[\d+\]\([^)]+\)/g, '')
        ?.replace(/\s+/g, ' ')
        ?.trim();
      generated = toolArgs;
    } else {
      const msg = grokData.output?.find(o => o.type === 'message');
      const raw = msg?.content?.find(c => c.type === 'output_text')?.text?.trim();
      if (!raw) throw new Error('Sem resposta do Grok');
      generated = {
        answer:       raw.replace(/<grok:render[^>]*>.*?<\/grok:render>/gs, '').replace(/\[\d+\]\([^)]+\)/g, '').trim(),
        short_answer: raw.slice(0, 120),
        section:      'Outras Dúvidas',
        slug:         slugify(question.trim()),
      };
    }

  } catch (err) {
    return res.status(502).json({ error: err.message });
  }

  // ── Salva no Supabase ─────────────────────────────────────────────────
  try {
    let slug = generated.slug || slugify(question.trim());
    const exists = await supaSlugExists(slug, SERVICE_KEY);
    if (exists) slug = `${slug}-${Date.now()}`;

    const saved = await supaInsert({
      question:     question.trim(),
      answer:       generated.answer,
      short_answer: generated.short_answer,
      slug,
      section:      generated.section || 'Outras Dúvidas',
      ai_generated: true,
      approved:     false,
    }, SERVICE_KEY);

    return res.status(200).json(saved);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
