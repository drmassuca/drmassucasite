#!/usr/bin/env node
// Gera embeddings de todo o conteudo do site (FAQ + exames + sobre + contato + 3D + IA Medica)
// e popula faq_items.embedding + site_chunks no Supabase.
//
// Pre-requisito: variaveis no .env.local OU passar via env:
//   OPENAI_API_KEY=sk-...
//   SUPABASE_URL=https://xxx.supabase.co
//   SUPABASE_SERVICE_KEY=eyJhbGc...   (service role, NAO a anon)
//
// Uso:
//   node scripts/build-embeddings.js
//   node scripts/build-embeddings.js --only=faq          # so FAQ
//   node scripts/build-embeddings.js --only=site         # so site_chunks
//   node scripts/build-embeddings.js --force             # re-embedar tudo

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------- env ----------
function loadDotEnv() {
  const candidates = ['.env.local', '.env'];
  for (const name of candidates) {
    const p = path.join(__dirname, '..', name);
    if (!fs.existsSync(p)) continue;
    const text = fs.readFileSync(p, 'utf-8');
    for (const line of text.split('\n')) {
      const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (!m) continue;
      const [, k, v] = m;
      if (!process.env[k]) process.env[k] = v.replace(/^['"]|['"]$/g, '');
    }
  }
}
loadDotEnv();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!OPENAI_API_KEY) die('OPENAI_API_KEY ausente. Coloque em .env.local ou export.');
if (!SUPABASE_URL) die('SUPABASE_URL ausente.');
if (!SERVICE_KEY) die('SUPABASE_SERVICE_KEY ausente (precisa ser service_role, nao anon).');

const args = process.argv.slice(2);
const ONLY = (args.find(a => a.startsWith('--only=')) || '').split('=')[1] || 'all';
const FORCE = args.includes('--force');

// ---------- helpers ----------
function die(msg) { console.error(`ERRO: ${msg}`); process.exit(1); }

function stripHtml(s) {
  return (s || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

async function embed(text) {
  const res = await fetch('https://api.openai.com/v1/embeddings', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${OPENAI_API_KEY}`,
    },
    body: JSON.stringify({
      model: 'text-embedding-3-small',
      input: text,
      dimensions: 1536,
    }),
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`OpenAI ${res.status}: ${err}`);
  }
  const data = await res.json();
  return data.data[0].embedding;
}

async function supa(method, path, body) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    method,
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Supabase ${method} ${path} ${res.status}: ${err}`);
  }
  return res.json();
}

// ---------- FAQ ----------
async function embedFaqs() {
  console.log('\n[FAQ] Buscando faq_items aprovados...');
  const filter = FORCE ? '' : '&embedding=is.null';
  const items = await supa(
    'GET',
    `faq_items?select=id,question,short_answer,answer&approved=eq.true${filter}`
  );
  console.log(`[FAQ] ${items.length} itens para embedar`);

  let i = 0;
  for (const item of items) {
    i++;
    const text = `${item.question}\n\n${item.short_answer || ''}\n\n${item.answer || ''}`.trim();
    const embedding = await embed(text);
    await supa('PATCH', `faq_items?id=eq.${item.id}`, { embedding });
    console.log(`[FAQ ${i}/${items.length}] ${item.question.slice(0, 60)}`);
  }
  console.log(`[FAQ] OK: ${items.length} embeddings`);
}

// ---------- Site chunks ----------
function loadExams() {
  const p = path.join(__dirname, '..', 'src', 'data', 'exams-data.json');
  if (!fs.existsSync(p)) return [];
  const arr = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return arr.map(e => ({
    source_type: 'exam',
    source_slug: e.slug,
    title: e.title,
    content: stripHtml(`${e.title}. ${e.paragraphs.join(' ')}`),
  }));
}

function curatedChunks() {
  return [
    {
      source_type: 'about',
      source_slug: 'sobre',
      title: 'Sobre o Dr. Massuca',
      content: 'Dr. Antonio Massucatti Neto, CRM-GO 17475. Medico com pos-graduacao em ultrassonografia geral e ecocardiografia fetal. Mais de 20 anos de experiencia. Atua em Itaberai-GO. Trabalho guiado por etica, precisao diagnostica e escuta atenta. Realiza exames de ultrassom obstetrico, ginecologico, abdominal, prostata, mamas, tireoide, partes moles e ecocardiografia fetal.',
    },
    {
      source_type: 'contact',
      source_slug: 'contato',
      title: 'Contato e localizacao',
      content: 'WhatsApp para agendamento: (62) 99660-2117. Telefone fixo: (62) 3375-2614. Email: drmassucatti@gmail.com. Instagram: @drmassuca. Endereco: Rua 19, Qd. 33, Lt. 01 - Vila Leonor - Itaberai - GO - CEP 76630-000. Referencia: Premium Centro Clinico. Horario: Segunda a Sexta 7h-18h, Sabado 8h-12h, Domingo fechado.',
    },
    {
      source_type: 'payment',
      source_slug: 'pagamento',
      title: 'Pagamento e convenios',
      content: 'A clinica nao atende convenios (atendimento particular). Formas de pagamento aceitas: PIX e dinheiro. Nao aceita cartao. Precos variam conforme o exame e protocolo - informados via WhatsApp no agendamento. Comprovantes/nota fiscal alinhados via WhatsApp.',
    },
    {
      source_type: '3d',
      source_slug: 'ultrassom-3d',
      title: 'Ultrassom 3D / 4D Babyface',
      content: 'O Dr. Massuca oferece imagens 3D/4D Babyface durante exames obstetricos como cortesia (sem custo adicional), quando as condicoes tecnicas permitem (posicao fetal, posicao da placenta, qualidade da janela acustica, idade gestacional). Nem sempre e possivel obter as imagens, mesmo com bebe em boa posicao. As imagens sao registradas pelo proprio sistema do aparelho (qualidade superior a celular). Nao e permitido filmar com celular durante a avaliacao para nao interferir na concentracao do medico.',
    },
    {
      source_type: 'rules',
      source_slug: 'regras',
      title: 'Orientacoes da clinica',
      content: 'Pontualidade: a agenda e organizada para atencao exclusiva, sem tolerancia para atrasos. Reagendamentos: contato pelo WhatsApp com pelo menos um dia de antecedencia (remarcacoes no mesmo dia nao sao possiveis). Acompanhantes: nao e permitida a entrada de criancas na sala de exame para manter o ambiente focado no diagnostico. Revelacao de sexo: avise a secretaria antes do exame se for cha revelacao - o medico nao revela durante a avaliacao e a informacao consta no resultado.',
    },
    {
      source_type: 'preparos',
      source_slug: 'preparos',
      title: 'Preparos para os exames',
      content: 'Abdome Superior: jejum 6-8h, evitar gordura/gasosas na vespera. Abdome Inferior/Pelve: bexiga cheia (500ml-1L de agua, 1-2h antes). Abdome Total: jejum 6-8h + bexiga cheia se incluir pelve. Endovaginal: sem preparo, bexiga vazia. Endometriose com preparo: jejum 4-6h + preparo intestinal. Mamas: sem preparo, pele limpa, sem cremes ou desodorantes. Tireoide/Cervical: sem preparo, levar exames previos. Doppler obstetrico: sem preparo. Obstetrico de rotina: sem preparo especifico.',
    },
    {
      source_type: 'periods',
      source_slug: 'periodos-gestacionais',
      title: 'Periodos recomendados nos exames obstetricos',
      content: 'Obstetrico de rotina: ideal entre 15-19 semanas e novamente entre 26-40 semanas. Morfologico 1o trimestre / Translucencia Nucal: 11+0 a 13+6 semanas (preferencia 12-13). Morfologico 2o trimestre: 20-24 semanas (ideal 22-23). Ecocardiografia fetal: 20-30 semanas. Monitorizacao da ovulacao: iniciar D10-D12 do ciclo, 3-4 exames alternados.',
    },
  ];
}

async function embedSiteChunks() {
  console.log('\n[SITE] Montando chunks...');
  const exams = loadExams();
  const curated = curatedChunks();
  const all = [...curated, ...exams];
  console.log(`[SITE] ${all.length} chunks (${curated.length} curados + ${exams.length} exames)`);

  if (FORCE) {
    console.log('[SITE] --force: deletando todos site_chunks existentes');
    await fetch(`${SUPABASE_URL}/rest/v1/site_chunks?source_type=neq.zzz`, {
      method: 'DELETE',
      headers: { apikey: SERVICE_KEY, Authorization: `Bearer ${SERVICE_KEY}` },
    });
  }

  let i = 0;
  for (const chunk of all) {
    i++;
    const existing = await supa(
      'GET',
      `site_chunks?select=id,embedding&source_type=eq.${chunk.source_type}&source_slug=eq.${encodeURIComponent(chunk.source_slug)}&limit=1`
    );

    const embedding = await embed(`${chunk.title}. ${chunk.content}`);

    if (existing.length === 0) {
      await supa('POST', 'site_chunks', { ...chunk, embedding });
    } else if (FORCE || !existing[0].embedding) {
      await supa('PATCH', `site_chunks?id=eq.${existing[0].id}`, { ...chunk, embedding });
    } else {
      console.log(`[SITE ${i}/${all.length}] (skip ja embedado) ${chunk.title}`);
      continue;
    }
    console.log(`[SITE ${i}/${all.length}] ${chunk.title}`);
  }
  console.log(`[SITE] OK: ${all.length} chunks processados`);
}

// ---------- main ----------
(async () => {
  try {
    if (ONLY === 'all' || ONLY === 'faq') await embedFaqs();
    if (ONLY === 'all' || ONLY === 'site') await embedSiteChunks();
    console.log('\n[OK] Embeddings prontas. Bot pode usar /api/chat agora.');
  } catch (e) {
    console.error('\n[FALHA]', e.message);
    process.exit(1);
  }
})();
