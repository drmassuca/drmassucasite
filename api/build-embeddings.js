// api/build-embeddings.js
// One-shot endpoint pra popular embeddings de FAQ + site_chunks.
// Protegido por EMBED_BUILD_TOKEN (qualquer string aleatoria que voce escolher).
// Reusa OPENAI_API_KEY e SUPABASE_SERVICE_KEY ja configurados no Vercel.
//
// Uso:
//   curl "https://drmassuca.com.br/api/build-embeddings?token=SEU_TOKEN"
//   curl "https://drmassuca.com.br/api/build-embeddings?token=SEU_TOKEN&only=faq"
//   curl "https://drmassuca.com.br/api/build-embeddings?token=SEU_TOKEN&force=1"
//
// Tambem funciona pelo browser (GET), mas use curl pra ver o JSON formatado.

import examsData from '../src/data/exams-data.json' with { type: 'json' };

const OPENAI_URL = 'https://api.openai.com/v1/embeddings';
const EMBED_MODEL = 'text-embedding-3-small';
const EMBED_DIMS = 1536;

const CURATED_CHUNKS = [
  {
    source_type: 'about',
    source_slug: 'sobre',
    title: 'Sobre o Dr. Massuca',
    content:
      'Dr. Antonio Massucatti Neto, CRM-GO 17475. Medico com pos-graduacao em ultrassonografia geral e ecocardiografia fetal. Mais de 20 anos de experiencia. Atua em Itaberai-GO. Trabalho guiado por etica, precisao diagnostica e escuta atenta. Realiza exames de ultrassom obstetrico, ginecologico, abdominal, prostata, mamas, tireoide, partes moles e ecocardiografia fetal.',
  },
  {
    source_type: 'contact',
    source_slug: 'contato',
    title: 'Contato e localizacao',
    content:
      'WhatsApp para agendamento: (62) 99660-2117. Telefone fixo: (62) 3375-2614. Email: drmassucatti@gmail.com. Instagram: @drmassuca. Endereco: Rua 19, Qd. 33, Lt. 01 - Vila Leonor - Itaberai - GO - CEP 76630-000. Referencia: Premium Centro Clinico. Horario: Segunda a Sexta 7h-18h, Sabado 8h-12h, Domingo fechado.',
  },
  {
    source_type: 'payment',
    source_slug: 'pagamento',
    title: 'Pagamento e convenios',
    content:
      'A clinica nao atende convenios (atendimento particular). Formas de pagamento aceitas: PIX e dinheiro. Nao aceita cartao. Precos variam conforme o exame e protocolo - informados via WhatsApp no agendamento. Comprovantes/nota fiscal alinhados via WhatsApp.',
  },
  {
    source_type: '3d',
    source_slug: 'ultrassom-3d',
    title: 'Ultrassom 3D / 4D Babyface',
    content:
      'O Dr. Massuca oferece imagens 3D/4D Babyface durante exames obstetricos como cortesia (sem custo adicional), quando as condicoes tecnicas permitem (posicao fetal, posicao da placenta, qualidade da janela acustica, idade gestacional). Nem sempre e possivel obter as imagens, mesmo com bebe em boa posicao. As imagens sao registradas pelo proprio sistema do aparelho (qualidade superior a celular). Nao e permitido filmar com celular durante a avaliacao para nao interferir na concentracao do medico.',
  },
  {
    source_type: 'rules',
    source_slug: 'regras',
    title: 'Orientacoes da clinica',
    content:
      'Pontualidade: a agenda e organizada para atencao exclusiva, sem tolerancia para atrasos. Reagendamentos: contato pelo WhatsApp com pelo menos um dia de antecedencia (remarcacoes no mesmo dia nao sao possiveis). Acompanhantes: nao e permitida a entrada de criancas na sala de exame para manter o ambiente focado no diagnostico. Revelacao de sexo: avise a secretaria antes do exame se for cha revelacao - o medico nao revela durante a avaliacao e a informacao consta no resultado.',
  },
  {
    source_type: 'preparos',
    source_slug: 'preparos',
    title: 'Preparos para os exames',
    content:
      'Abdome Superior: jejum 6-8h, evitar gordura/gasosas na vespera. Abdome Inferior/Pelve: bexiga cheia (500ml-1L de agua, 1-2h antes). Abdome Total: jejum 6-8h + bexiga cheia se incluir pelve. Endovaginal: sem preparo, bexiga vazia. Endometriose com preparo: jejum 4-6h + preparo intestinal. Mamas: sem preparo, pele limpa, sem cremes ou desodorantes. Tireoide/Cervical: sem preparo, levar exames previos. Doppler obstetrico: sem preparo. Obstetrico de rotina: sem preparo especifico.',
  },
  {
    source_type: 'periods',
    source_slug: 'periodos-gestacionais',
    title: 'Periodos recomendados nos exames obstetricos',
    content:
      'Obstetrico de rotina: ideal entre 15-19 semanas e novamente entre 26-40 semanas. Morfologico 1o trimestre / Translucencia Nucal: 11+0 a 13+6 semanas (preferencia 12-13). Morfologico 2o trimestre: 20-24 semanas (ideal 22-23). Ecocardiografia fetal: 20-30 semanas. Monitorizacao da ovulacao: iniciar D10-D12 do ciclo, 3-4 exames alternados.',
  },
];

function stripHtml(s) {
  return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

async function embedBatch(texts, openaiKey) {
  const res = await fetch(OPENAI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${openaiKey}`,
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: texts,
      dimensions: EMBED_DIMS,
    }),
  });
  if (!res.ok) throw new Error(`OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.data.map(d => d.embedding);
}

async function supa(supaUrl, key, method, path, body) {
  const res = await fetch(`${supaUrl}/rest/v1/${path}`, {
    method,
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`Supabase ${method} ${path} ${res.status}: ${await res.text()}`);
  return res.json();
}

async function processFAQ({ supaUrl, serviceKey, openaiKey, force, log }) {
  const filter = force ? '' : '&embedding=is.null';
  const items = await supa(
    supaUrl,
    serviceKey,
    'GET',
    `faq_items?select=id,question,short_answer,answer&approved=eq.true${filter}`
  );
  log.push(`FAQ: ${items.length} itens para embedar`);
  if (items.length === 0) return 0;

  const texts = items.map(
    f => `${f.question}\n\n${f.short_answer || ''}\n\n${f.answer || ''}`.trim()
  );
  const embeddings = await embedBatch(texts, openaiKey);

  await Promise.all(
    items.map((item, i) =>
      supa(supaUrl, serviceKey, 'PATCH', `faq_items?id=eq.${item.id}`, {
        embedding: embeddings[i],
      })
    )
  );
  log.push(`FAQ: ${items.length} embeddings populados`);
  return items.length;
}

async function processSiteChunks({ supaUrl, serviceKey, openaiKey, force, log }) {
  const exams = examsData.map(e => ({
    source_type: 'exam',
    source_slug: e.slug,
    title: e.title,
    content: stripHtml(`${e.title}. ${e.paragraphs.join(' ')}`),
  }));
  const all = [...CURATED_CHUNKS, ...exams];
  log.push(`Site chunks: ${all.length} (${CURATED_CHUNKS.length} curados + ${exams.length} exames)`);

  if (force) {
    const r = await fetch(`${supaUrl}/rest/v1/site_chunks?source_type=neq.zzz`, {
      method: 'DELETE',
      headers: { apikey: serviceKey, Authorization: `Bearer ${serviceKey}` },
    });
    if (r.ok) log.push('site_chunks limpos (force=1)');
  }

  const texts = all.map(c => `${c.title}. ${c.content}`);
  const embeddings = await embedBatch(texts, openaiKey);

  // Pega existentes em paralelo
  const existing = await Promise.all(
    all.map(c =>
      supa(
        supaUrl,
        serviceKey,
        'GET',
        `site_chunks?select=id&source_type=eq.${c.source_type}&source_slug=eq.${encodeURIComponent(c.source_slug)}&limit=1`
      )
    )
  );

  // POST novos / PATCH existentes em paralelo
  await Promise.all(
    all.map((chunk, i) => {
      const found = existing[i][0];
      const body = { ...chunk, embedding: embeddings[i] };
      if (found) {
        return supa(supaUrl, serviceKey, 'PATCH', `site_chunks?id=eq.${found.id}`, body);
      }
      return supa(supaUrl, serviceKey, 'POST', 'site_chunks', body);
    })
  );

  log.push(`Site chunks: ${all.length} embeddings populados`);
  return all.length;
}

export default async function handler(req, res) {
  const startedAt = Date.now();
  const log = [];

  // Auth
  const token = req.query?.token || req.headers['x-build-token'];
  if (!token || token !== process.env.EMBED_BUILD_TOKEN) {
    return res.status(401).json({ error: 'Token invalido ou ausente' });
  }

  const only = req.query?.only || 'all';
  const force = req.query?.force === '1' || req.query?.force === 'true';

  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  const SUPA_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY ausente no Vercel' });
  if (!SUPA_URL || !SERVICE_KEY)
    return res.status(500).json({ error: 'SUPABASE_URL ou SUPABASE_SERVICE_KEY ausente no Vercel' });

  try {
    const ctx = { supaUrl: SUPA_URL, serviceKey: SERVICE_KEY, openaiKey: OPENAI_API_KEY, force, log };

    let faqCount = 0;
    let siteCount = 0;

    if (only === 'all' || only === 'faq') faqCount = await processFAQ(ctx);
    if (only === 'all' || only === 'site') siteCount = await processSiteChunks(ctx);

    return res.status(200).json({
      success: true,
      faqs_processed: faqCount,
      site_chunks_processed: siteCount,
      duration_ms: Date.now() - startedAt,
      log,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      duration_ms: Date.now() - startedAt,
      log,
    });
  }
}
