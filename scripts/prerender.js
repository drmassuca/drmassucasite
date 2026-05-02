#!/usr/bin/env node
// Pos-build prerender: gera HTML estatico por rota com title/description/canonical
// corretos para o Googlebot ver conteudo unico em cada pagina (sem precisar
// renderizar JS). O SPA continua hidratando por cima.
//
// Roda automaticamente no `npm run build` (apos `vite build`).

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender] dist/index.html nao encontrado. Rode 'vite build' primeiro.`);
  process.exit(1);
}

const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');
const ORIGIN = 'https://drmassuca.com.br';
const DEFAULT_OG_IMAGE = `${ORIGIN}/foto-home.webp`;

// ---------- Rotas estaticas principais ----------
const STATIC_ROUTES = [
  {
    path: '/sobre',
    title: 'Sobre Dr. Antonio Massucatti Neto | Ultrassom Itaberaí | CRM-GO 17475',
    description:
      'Conheça Dr. Massuca: médico com mais de 20 anos de experiência, pós-graduado em ultrassonografia geral e ecocardiografia fetal em Itaberaí-GO.',
    keywords:
      'Dr Massuca, Antonio Massucatti Neto, CRM-GO 17475, ultrassonografista Itaberaí, médico ultrassom Goiás, pós-graduação ultrassonografia',
  },
  {
    path: '/exames',
    title: 'Exames de Ultrassom Itaberaí-GO | Dr. Massuca | 24+ Tipos de Exames',
    description:
      'Exames de ultrassom em Itaberaí-GO: obstétrico, ginecológico, abdominal, próstata, tireoide e mais. Dr. Massuca com equipamentos modernos. Agende já!',
    keywords:
      'exames ultrassom Itaberaí, ultrassom obstétrico, ultrassom ginecológico, ultrassom abdominal, ecocardiografia fetal, Dr Massuca exames',
  },
  {
    path: '/contato',
    title: 'Contato Dr. Massuca | Agendar Ultrassom Itaberaí-GO | WhatsApp (62) 99660-2117',
    description:
      'Agende seu ultrassom em Itaberaí-GO com Dr. Massuca. WhatsApp: (62) 99660-2117. Atendimento de segunda a sábado. Localização: Rua 19, Vila Leonor.',
    keywords:
      'agendar ultrassom Itaberaí, Dr Massuca contato, WhatsApp ultrassom, telefone ultrassom Itaberaí, endereço Dr Massuca, Vila Leonor',
  },
  {
    path: '/area-do-paciente',
    title: 'Área do Paciente | Dr. Massuca Ultrassom Itaberaí-GO',
    description:
      'Orientações, preparos para exames, resultados e informações úteis para pacientes do Dr. Massuca em Itaberaí-GO.',
    keywords: 'paciente ultrassom Itaberaí, preparo exame ultrassom, Dr Massuca paciente',
  },
  {
    path: '/para-medicos',
    title: 'Para Médicos | Dr. Massuca | Ultrassonografia Itaberaí',
    description:
      'Informações para médicos solicitantes: tipos de exames, protocolos, contato direto. Dr. Massuca, ultrassonografia em Itaberaí-GO.',
    keywords: 'médico solicitante ultrassom, protocolo ultrassom, Dr Massuca médicos',
  },
  {
    path: '/depoimentos',
    title: 'Depoimentos de Pacientes | Dr. Massuca Ultrassom Itaberaí-GO',
    description:
      'Veja depoimentos de pacientes do Dr. Massuca: experiências reais com ultrassom obstétrico, ginecológico e ecocardiografia fetal em Itaberaí-GO.',
    keywords: 'depoimentos Dr Massuca, avaliações ultrassom Itaberaí, pacientes Dr Massuca',
  },
  {
    path: '/ultrassom-3d',
    title: 'Ultrassom 3D / 4D Babyface | Dr. Massuca Itaberaí-GO',
    description:
      'Imagens 3D/4D Babyface do bebê durante exames obstétricos com Dr. Massuca em Itaberaí-GO. Cortesia quando as condições técnicas permitem.',
    keywords: 'ultrassom 3D Itaberaí, ultrassom 4D, babyface, Dr Massuca 3D',
  },
  {
    path: '/faq',
    title: 'FAQ – Dúvidas Frequentes sobre Ultrassom | Dr. Massuca',
    description:
      'FAQ sobre exames de ultrassom em Itaberaí-GO: preparos, tipos, indicações e mais. Respostas rápidas do Dr. Massuca.',
    keywords: 'FAQ ultrassom, dúvidas ultrassom, preparo ultrassom Itaberaí',
  },
  {
    path: '/ia-medica',
    title: 'IA Médica | Dr. Massuca | Ultrassom + Tecnologia',
    description:
      'Conteúdo do Dr. Massuca sobre Inteligência Artificial aplicada à medicina e ultrassonografia. Artigos, reviews, ferramentas.',
    keywords: 'IA medicina, inteligência artificial ultrassom, Dr Massuca IA',
  },
  {
    path: '/privacy-policy',
    title: 'Política de Privacidade | Dr. Massuca',
    description: 'Política de privacidade do site drmassuca.com.br.',
    keywords: 'privacidade, LGPD, drmassuca',
  },
];

// ---------- Rotas de exames (dinamico do exams-data.json) ----------
const examsDataPath = path.join(ROOT, 'src', 'data', 'exams-data.json');
let EXAM_ROUTES = [];
if (fs.existsSync(examsDataPath)) {
  const exams = JSON.parse(fs.readFileSync(examsDataPath, 'utf-8'));
  EXAM_ROUTES = exams.map(e => {
    const firstParagraph = e.paragraphs?.[0]?.replace(/<[^>]+>/g, '').trim() || '';
    return {
      path: `/exames/${e.slug}`,
      title: `${e.title} – Dr. Massuca`,
      description:
        firstParagraph.slice(0, 155).replace(/\s+\S*$/, '') + (firstParagraph.length > 155 ? '…' : ''),
      keywords: `${e.title.toLowerCase()}, ultrassom Itaberaí, Dr Massuca`,
      ogImage: e.image ? `${ORIGIN}${e.image}` : DEFAULT_OG_IMAGE,
    };
  });
}

// ---------- Helpers ----------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function rewriteHtml(template, route) {
  const title = escapeHtml(route.title);
  const description = escapeHtml(route.description);
  const canonical = `${ORIGIN}${route.path}`;
  const ogImage = route.ogImage || DEFAULT_OG_IMAGE;
  const keywords = escapeHtml(route.keywords || '');

  let html = template;

  // <title>
  html = html.replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`);

  // <meta name="description">
  html = html.replace(
    /<meta\s+name="description"[^>]*\/?\s*>/i,
    `<meta name="description" content="${description}" />`
  );

  // <meta name="keywords"> (so se ja existe — caso contrario nao injeta)
  if (keywords) {
    html = html.replace(
      /<meta\s+name="keywords"[^>]*\/?\s*>/i,
      `<meta name="keywords" content="${keywords}" />`
    );
  }

  // <link rel="canonical">
  html = html.replace(
    /<link\s+rel="canonical"[^>]*\/?\s*>/i,
    `<link rel="canonical" href="${canonical}" />`
  );

  // Open Graph
  html = html.replace(
    /<meta\s+property="og:title"[^>]*\/?\s*>/i,
    `<meta property="og:title" content="${title}" />`
  );
  html = html.replace(
    /<meta\s+property="og:description"[^>]*\/?\s*>/i,
    `<meta property="og:description" content="${description}" />`
  );
  html = html.replace(
    /<meta\s+property="og:url"[^>]*\/?\s*>/i,
    `<meta property="og:url" content="${canonical}" />`
  );
  html = html.replace(
    /<meta\s+property="og:image"[^>]*\/?\s*>/i,
    `<meta property="og:image" content="${ogImage}" />`
  );

  return html;
}

// ---------- Geracao ----------
const ROUTES = [...STATIC_ROUTES, ...EXAM_ROUTES];
let written = 0;

for (const route of ROUTES) {
  const html = rewriteHtml(TEMPLATE, route);
  const outDir = path.join(DIST, ...route.path.split('/').filter(Boolean));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  written++;
}

console.log(`[prerender] ${written} rotas geradas (${STATIC_ROUTES.length} estaticas + ${EXAM_ROUTES.length} exames)`);
