import { createClient } from '@supabase/supabase-js';

// As env vars VITE_SUPABASE_* sao expostas em runtime para Vercel functions
// (Vercel injeta TODAS as env vars do projeto, sem limitar pelo prefixo VITE_)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const SITE_BASE = 'https://drmassuca.com.br';
const FALLBACK_IMAGE = `${SITE_BASE}/logo-pe.webp`;

// Cache do index.html em memoria do warm container Vercel.
// Quando o container morre/scala, recarrega na primeira request.
let indexHtmlCache = null;
let indexHtmlCacheAt = 0;
const INDEX_CACHE_TTL_MS = 60 * 60 * 1000; // 1h

async function fetchIndexHtml() {
  const now = Date.now();
  if (indexHtmlCache && (now - indexHtmlCacheAt) < INDEX_CACHE_TTL_MS) {
    return indexHtmlCache;
  }
  try {
    const r = await fetch(`${SITE_BASE}/`, {
      headers: { 'User-Agent': 'OG-Injector/1.0 (+vercel-function)' },
      redirect: 'follow',
    });
    if (r.ok) {
      const html = await r.text();
      // sanity check: deve ter bundle Vite e div root
      if (html.includes('id="root"') && html.length > 500) {
        indexHtmlCache = html;
        indexHtmlCacheAt = now;
        return html;
      }
    }
  } catch (e) {
    console.error('fetchIndexHtml failed:', e);
  }
  return null;
}

export default async function handler(req, res) {
  // O parametro 'id' aceita tanto numero quanto slug. Site tem 2 rotas para o
  // mesmo artigo (/ia-medica/artigo/14 e /ia-medica/artigo/<slug>).
  const idOrSlug = String(req.query.id || '').trim();
  if (!idOrSlug) {
    return res.status(400).send('id ou slug invalido');
  }

  const targetUrl = `${SITE_BASE}/ia-medica/artigo/${idOrSlug}`;

  if (!supabase) {
    return res.status(500).send('Supabase nao configurado');
  }

  // Detecta se e id numerico ou slug (texto)
  const isNumericId = /^\d+$/.test(idOrSlug);

  let article = null;
  try {
    let q = supabase
      .from('articles')
      .select('id, slug, title, excerpt, subtitle, image_url, meta_title, meta_description')
      .eq('status', 'published');
    q = isNumericId
      ? q.eq('id', parseInt(idOrSlug, 10))
      : q.eq('slug', idOrSlug);
    const { data } = await q.maybeSingle();
    article = data || null;
  } catch (e) {
    console.error('og/artigo: erro Supabase:', e);
  }

  if (!article) {
    // Sem artigo, deixa o SPA mostrar um 404 proprio. Servir index.html original
    // ou redirect; vou redirect pra rota real (SPA mostra 404 ou listagem)
    res.setHeader('Cache-Control', 'no-store');
    return res.redirect(302, targetUrl);
  }

  const title = article.meta_title || article.title || 'Artigo';
  const description = article.meta_description
    || article.excerpt
    || article.subtitle
    || 'Artigo de Dr. Massuca sobre IA na medicina.';
  const image = absolutize(article.image_url) || FALLBACK_IMAGE;

  // Estrategia: fetch o index.html buildado e injetar meta tags do artigo.
  // Browsers humanos hidratam o SPA (bundle Vite continua referenciado).
  // Crawlers e validators leem as meta tags corretas, ignoram o JS.
  const baseHtml = await fetchIndexHtml();

  if (baseHtml) {
    const modified = injectMetaTags(baseHtml, { title, description, image, url: targetUrl });
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    return res.status(200).send(modified);
  }

  // Fallback se fetch falhou: HTML simples com OG tags (suficiente pra crawlers)
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
  return res.status(200).send(renderSimpleHtml({ title, description, image, url: targetUrl }));
}

function injectMetaTags(html, { title, description, image, url }) {
  const fullTitle = `${title} | Dr. Massuca`;

  // Helper: substitui ou adiciona tag antes de </head>
  function replaceOrAdd(html, regex, replacement) {
    if (regex.test(html)) {
      return html.replace(regex, replacement);
    }
    return html.replace('</head>', `${replacement}\n</head>`);
  }

  let out = html;

  // Title
  out = out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(fullTitle)}</title>`);

  // Description
  out = replaceOrAdd(
    out,
    /<meta\s+name="description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="description" content="${esc(description)}">`,
  );

  // Open Graph
  out = replaceOrAdd(
    out,
    /<meta\s+property="og:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:title" content="${esc(title)}">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+property="og:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:description" content="${esc(description)}">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+property="og:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:image" content="${esc(image)}">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+property="og:type"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:type" content="article">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+property="og:url"\s+content="[^"]*"\s*\/?>/i,
    `<meta property="og:url" content="${esc(url)}">`,
  );

  // Twitter Card (adiciona se nao existir, sobrescreve se existir)
  out = replaceOrAdd(
    out,
    /<meta\s+name="twitter:card"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:card" content="summary_large_image">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+name="twitter:title"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:title" content="${esc(title)}">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+name="twitter:description"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:description" content="${esc(description)}">`,
  );
  out = replaceOrAdd(
    out,
    /<meta\s+name="twitter:image"\s+content="[^"]*"\s*\/?>/i,
    `<meta name="twitter:image" content="${esc(image)}">`,
  );

  // Canonical
  out = replaceOrAdd(
    out,
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${esc(url)}">`,
  );

  return out;
}

function renderSimpleHtml({ title, description, image, url }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${esc(title)} | Dr. Massuca</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:type" content="article">
<meta property="og:url" content="${esc(url)}">
<meta property="og:locale" content="pt_BR">
<meta property="og:site_name" content="Dr. Massuca">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(title)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${esc(image)}">
<link rel="canonical" href="${esc(url)}">
</head>
<body></body>
</html>`;
}

function esc(s) {
  return String(s).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  }[c]));
}

function absolutize(url) {
  if (!url) return '';
  const u = String(url).trim();
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('//')) return 'https:' + u;
  if (u.startsWith('/')) return SITE_BASE + u;
  return SITE_BASE + '/' + u;
}
