#!/usr/bin/env node
// Pos-build: gera HTML estatico per rota + regenera sitemap.xml.
//
// Por que: SPA serve HTML identico em todas as rotas pro Googlebot pre-JS.
// Google deindexa por duplicate content. Prerender resolve gerando HTML
// unico per URL com title/description/canonical proprios. SPA hidrata
// por cima normalmente.
//
// Cobertura:
//  - 10 rotas estaticas principais
//  - 24 paginas de exames (de src/data/exams-data.json)
//  - N paginas de FAQ aprovadas (fetch do Supabase em build time)
//  - sitemap.xml regenerado com lastmod=hoje pra TODAS as URLs
//
// Build do Vercel tem acesso a VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY.
// Local: dotenv loader le .env / .env.local.

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const DIST = path.join(ROOT, 'dist');
const TEMPLATE_PATH = path.join(DIST, 'index.html');

// ---------- Load .env ----------
function loadDotEnv() {
  for (const name of ['.env.local', '.env']) {
    const p = path.join(ROOT, name);
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

const ORIGIN = 'https://drmassuca.com.br';
const TODAY = new Date().toISOString().slice(0, 10);
const DEFAULT_OG_IMAGE = `${ORIGIN}/foto-home.webp`;
const SUPA_URL = process.env.VITE_SUPABASE_URL || 'https://auvyolzrjoyzsribmapa.supabase.co';
const SUPA_KEY = process.env.VITE_SUPABASE_ANON_KEY;

if (!fs.existsSync(TEMPLATE_PATH)) {
  console.error(`[prerender] dist/index.html nao encontrado. Rode 'vite build' primeiro.`);
  process.exit(1);
}

const TEMPLATE = fs.readFileSync(TEMPLATE_PATH, 'utf-8');

// ============================================================
// ROTAS ESTATICAS PRINCIPAIS
// ============================================================
const STATIC_ROUTES = [
  {
    path: '/sobre',
    title: 'Sobre Dr. Antonio Massucatti Neto | Ultrassom Itaberaí | CRM-GO 17475',
    description:
      'Conheça Dr. Massuca: médico com mais de 20 anos de experiência, pós-graduado em ultrassonografia geral e ecocardiografia fetal em Itaberaí-GO.',
    keywords:
      'Dr Massuca, Antonio Massucatti Neto, CRM-GO 17475, ultrassonografista Itaberaí, médico ultrassom Goiás',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/exames',
    title: 'Exames de Ultrassom Itaberaí-GO | Dr. Massuca | 24+ Tipos de Exames',
    description:
      'Exames de ultrassom em Itaberaí-GO: obstétrico, ginecológico, abdominal, próstata, tireoide e mais. Dr. Massuca com equipamentos modernos.',
    keywords:
      'exames ultrassom Itaberaí, ultrassom obstétrico, ultrassom ginecológico, ultrassom abdominal, ecocardiografia fetal',
    priority: 0.9,
    changefreq: 'weekly',
  },
  {
    path: '/contato',
    title: 'Contato Dr. Massuca | Agendar Ultrassom Itaberaí-GO | WhatsApp (62) 99660-2117',
    description:
      'Agende seu ultrassom em Itaberaí-GO com Dr. Massuca. WhatsApp: (62) 99660-2117. Atendimento de segunda a sábado. Localização: Rua 19, Vila Leonor.',
    keywords: 'agendar ultrassom Itaberaí, Dr Massuca contato, WhatsApp ultrassom, telefone Itaberaí',
    priority: 0.9,
    changefreq: 'monthly',
  },
  {
    path: '/area-do-paciente',
    title: 'Área do Paciente | Dr. Massuca Ultrassom Itaberaí-GO',
    description:
      'Orientações, preparos para exames, resultados e informações úteis para pacientes do Dr. Massuca em Itaberaí-GO.',
    keywords: 'paciente ultrassom Itaberaí, preparo exame ultrassom, Dr Massuca paciente',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/para-medicos',
    title: 'Para Médicos | Dr. Massuca | Ultrassonografia Itaberaí',
    description:
      'Informações para médicos solicitantes: tipos de exames, protocolos, contato direto. Dr. Massuca, ultrassonografia em Itaberaí-GO.',
    keywords: 'médico solicitante ultrassom, protocolo ultrassom, Dr Massuca médicos',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/depoimentos',
    title: 'Depoimentos de Pacientes | Dr. Massuca Ultrassom Itaberaí-GO',
    description:
      'Veja depoimentos de pacientes do Dr. Massuca: experiências reais com ultrassom obstétrico, ginecológico e ecocardiografia fetal em Itaberaí-GO.',
    keywords: 'depoimentos Dr Massuca, avaliações ultrassom Itaberaí, pacientes Dr Massuca',
    priority: 0.7,
    changefreq: 'monthly',
  },
  {
    path: '/ultrassom-3d',
    title: 'Ultrassom 3D / 4D Babyface | Dr. Massuca Itaberaí-GO',
    description:
      'Imagens 3D/4D Babyface do bebê durante exames obstétricos com Dr. Massuca em Itaberaí-GO. Cortesia quando as condições técnicas permitem.',
    keywords: 'ultrassom 3D Itaberaí, ultrassom 4D, babyface, Dr Massuca 3D',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/faq',
    title: 'FAQ – Dúvidas Frequentes sobre Ultrassom | Dr. Massuca',
    description:
      'FAQ sobre exames de ultrassom em Itaberaí-GO: preparos, tipos, indicações e mais. Respostas rápidas do Dr. Massuca.',
    keywords: 'FAQ ultrassom, dúvidas ultrassom, preparo ultrassom Itaberaí',
    priority: 0.8,
    changefreq: 'weekly',
  },
  {
    path: '/ia-medica',
    title: 'IA Médica | Dr. Massuca | Ultrassom + Tecnologia',
    description:
      'Conteúdo do Dr. Massuca sobre Inteligência Artificial aplicada à medicina e ultrassonografia. Artigos, reviews, ferramentas.',
    keywords: 'IA medicina, inteligência artificial ultrassom, Dr Massuca IA',
    priority: 0.9,
    changefreq: 'weekly',
  },
  {
    path: '/privacy-policy',
    title: 'Política de Privacidade | Dr. Massuca',
    description: 'Política de privacidade do site drmassuca.com.br.',
    keywords: 'privacidade, LGPD, drmassuca',
    priority: 0.3,
    changefreq: 'yearly',
  },
];

// ============================================================
// ROTAS DE EXAMES (de exams-data.json)
// ============================================================
function loadExamRoutes() {
  const p = path.join(ROOT, 'src', 'data', 'exams-data.json');
  if (!fs.existsSync(p)) return [];
  const exams = JSON.parse(fs.readFileSync(p, 'utf-8'));
  return exams.map(e => {
    const firstParagraph = e.paragraphs?.[0]?.replace(/<[^>]+>/g, '').trim() || '';
    return {
      path: `/exames/${e.slug}`,
      title: `${e.title} – Dr. Massuca`,
      description:
        firstParagraph.slice(0, 155).replace(/\s+\S*$/, '') +
        (firstParagraph.length > 155 ? '…' : ''),
      keywords: `${e.title.toLowerCase()}, ultrassom Itaberaí, Dr Massuca`,
      ogImage: e.image ? `${ORIGIN}${e.image}` : DEFAULT_OG_IMAGE,
      priority: 0.7,
      changefreq: 'monthly',
    };
  });
}

// ============================================================
// ROTAS DA IA MEDICA (hardcoded por enquanto - expandir depois)
// ============================================================
const IA_MEDICA_ROUTES = [
  {
    path: '/ia-medica/stable-diffusion-3d-fetal',
    title: 'Stable Diffusion 3D Fetal | IA Médica | Dr. Massuca',
    description:
      'Como usar Stable Diffusion para gerar imagens 3D fetais. Tutorial completo do Dr. Massuca: instalação, configuração, exemplos.',
    priority: 0.8,
    changefreq: 'monthly',
  },
  {
    path: '/ia-medica/stable-diffusion-3d-fetal/instalacao',
    title: 'Instalação do Stable Diffusion 3D Fetal | Dr. Massuca',
    description: 'Guia de instalação do Stable Diffusion para imagens 3D fetais.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/ia-medica/stable-diffusion-3d-fetal/configuracao',
    title: 'Configuração do Stable Diffusion 3D Fetal | Dr. Massuca',
    description: 'Configurações recomendadas para Stable Diffusion gerar imagens 3D fetais.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/ia-medica/stable-diffusion-3d-fetal/exemplos',
    title: 'Exemplos de Stable Diffusion 3D Fetal | Dr. Massuca',
    description: 'Exemplos práticos de imagens geradas com Stable Diffusion para uso fetal.',
    priority: 0.6,
    changefreq: 'monthly',
  },
  {
    path: '/ia-medica/stable-diffusion-3d-fetal/problemas',
    title: 'Problemas comuns – Stable Diffusion 3D Fetal | Dr. Massuca',
    description: 'Problemas frequentes ao usar Stable Diffusion para imagens 3D fetais e soluções.',
    priority: 0.6,
    changefreq: 'monthly',
  },
];

// ============================================================
// FETCH FAQ ITEMS DO SUPABASE
// ============================================================
async function fetchFaqItems() {
  if (!SUPA_KEY) {
    console.warn('[prerender] VITE_SUPABASE_ANON_KEY ausente, pulando FAQ dinamicas');
    return [];
  }
  const url = `${SUPA_URL}/rest/v1/faq_items?select=question,slug,short_answer,answer,updated_at,created_at&approved=eq.true&order=section.asc,created_at.asc`;
  const res = await fetch(url, {
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
  });
  if (!res.ok) {
    console.warn(`[prerender] FAQ fetch falhou ${res.status}: ${await res.text()}`);
    return [];
  }
  return res.json();
}

function faqItemToRoute(item) {
  const desc =
    item.short_answer ||
    (item.answer || '').replace(/<[^>]+>/g, '').slice(0, 155).replace(/\s+\S*$/, '') + '…';
  return {
    path: `/faq/${item.slug}`,
    title: `${item.question} | FAQ Ultrassom – Dr. Massuca`,
    description: desc,
    keywords: `FAQ ultrassom, ${item.question.toLowerCase().slice(0, 80)}, Dr Massuca`,
    priority: 0.6,
    changefreq: 'monthly',
    lastmod: (item.updated_at || item.created_at || '').slice(0, 10) || TODAY,
  };
}

// ============================================================
// HELPERS
// ============================================================
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

  let html = template
    .replace(/<title>[^<]*<\/title>/i, `<title>${title}</title>`)
    .replace(
      /<meta\s+name="description"[^>]*\/?\s*>/i,
      `<meta name="description" content="${description}" />`
    )
    .replace(
      /<link\s+rel="canonical"[^>]*\/?\s*>/i,
      `<link rel="canonical" href="${canonical}" />`
    )
    .replace(
      /<meta\s+property="og:title"[^>]*\/?\s*>/i,
      `<meta property="og:title" content="${title}" />`
    )
    .replace(
      /<meta\s+property="og:description"[^>]*\/?\s*>/i,
      `<meta property="og:description" content="${description}" />`
    )
    .replace(
      /<meta\s+property="og:url"[^>]*\/?\s*>/i,
      `<meta property="og:url" content="${canonical}" />`
    )
    .replace(
      /<meta\s+property="og:image"[^>]*\/?\s*>/i,
      `<meta property="og:image" content="${ogImage}" />`
    );

  if (keywords) {
    html = html.replace(
      /<meta\s+name="keywords"[^>]*\/?\s*>/i,
      `<meta name="keywords" content="${keywords}" />`
    );
  }

  return html;
}

function writeRouteHtml(route) {
  const html = rewriteHtml(TEMPLATE, route);
  const outDir = path.join(DIST, ...route.path.split('/').filter(Boolean));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
}

// ============================================================
// SITEMAP GENERATOR
// ============================================================
function generateSitemap(routes) {
  const lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    '',
    '  <!-- Gerado automaticamente por scripts/prerender.js -->',
    `  <!-- Build em ${new Date().toISOString()} -->`,
    '',
  ];
  for (const r of routes) {
    lines.push('  <url>');
    lines.push(`    <loc>${ORIGIN}${r.path}</loc>`);
    lines.push(`    <lastmod>${r.lastmod || TODAY}</lastmod>`);
    lines.push(`    <changefreq>${r.changefreq || 'monthly'}</changefreq>`);
    lines.push(`    <priority>${r.priority ?? 0.5}</priority>`);
    lines.push('  </url>');
  }
  lines.push('');
  lines.push('</urlset>');
  return lines.join('\n');
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  const startedAt = Date.now();

  // Static + exams + IA Medica routes
  const examRoutes = loadExamRoutes();
  const staticAll = [...STATIC_ROUTES, ...examRoutes, ...IA_MEDICA_ROUTES];

  // FAQ dynamic from Supabase
  const faqItems = await fetchFaqItems();
  const faqRoutes = faqItems.map(faqItemToRoute);

  const allRoutes = [...staticAll, ...faqRoutes];

  // Prerender HTML files
  let written = 0;
  for (const route of allRoutes) {
    writeRouteHtml(route);
    written++;
  }

  // Generate sitemap (root + all routes)
  const sitemapRoutes = [
    { path: '/', priority: 1.0, changefreq: 'weekly', lastmod: TODAY },
    ...allRoutes,
  ];
  const sitemap = generateSitemap(sitemapRoutes);
  fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

  console.log(
    `[prerender] ${written} rotas geradas em ${Date.now() - startedAt}ms ` +
      `(${STATIC_ROUTES.length} estaticas + ${examRoutes.length} exames + ` +
      `${IA_MEDICA_ROUTES.length} IA Medica + ${faqRoutes.length} FAQ dinamicas)`
  );
  console.log(`[prerender] sitemap.xml regenerado com ${sitemapRoutes.length} URLs`);
}

main().catch(e => {
  console.error('[prerender] ERRO:', e);
  process.exit(1);
});
