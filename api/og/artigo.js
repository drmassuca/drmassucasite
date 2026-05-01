import { createClient } from '@supabase/supabase-js';

// As env vars VITE_SUPABASE_* sao expostas em runtime para Vercel functions
// (Vercel injeta TODAS as env vars do projeto, sem limitar pelo prefixo VITE_)
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = SUPABASE_URL && SUPABASE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

const FALLBACK_IMAGE = 'https://drmassuca.com.br/logo-pe.webp';

// Lista de bots que pedem Open Graph. user-agent vem em forma especifica
// (consistente entre versoes), entao regex case-sensitive cobre os reais.
const CRAWLER_REGEX = /whatsapp|facebookexternalhit|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|googlebot|bingbot|applebot|skypeuripreview/i;

export default async function handler(req, res) {
  const articleId = parseInt(req.query.id, 10);
  if (!articleId || Number.isNaN(articleId)) {
    return res.status(400).send('id invalido');
  }

  const targetUrl = `https://drmassuca.com.br/ia-medica/artigo/${articleId}`;
  const ua = req.headers['user-agent'] || '';
  const isCrawler = CRAWLER_REGEX.test(ua);

  // Se nao for crawler, redireciona pra rota real do SPA. Defesa em profundidade
  // caso o vercel.json rewrite tenha derrubado um humano aqui por engano.
  if (!isCrawler) {
    return res.redirect(302, targetUrl);
  }

  if (!supabase) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(500).send(renderHtml({
      title: 'Erro de configuracao',
      description: 'Supabase nao configurado',
      image: FALLBACK_IMAGE,
      url: targetUrl,
    }));
  }

  let article = null;
  try {
    const { data } = await supabase
      .from('articles')
      .select('id, title, excerpt, subtitle, image_url, meta_title, meta_description')
      .eq('id', articleId)
      .eq('status', 'published')
      .maybeSingle();
    article = data || null;
  } catch (e) {
    console.error('og/artigo: erro Supabase:', e);
  }

  if (!article) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    return res.status(404).send(renderHtml({
      title: 'Artigo nao encontrado',
      description: 'Esse artigo nao esta disponivel.',
      image: FALLBACK_IMAGE,
      url: targetUrl,
    }));
  }

  const title = article.meta_title || article.title || 'Artigo';
  const description = article.meta_description
    || article.excerpt
    || article.subtitle
    || 'Artigo de Dr. Massuca sobre IA na medicina.';
  const image = absolutize(article.image_url) || FALLBACK_IMAGE;

  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
  res.status(200).send(renderHtml({ title, description, image, url: targetUrl }));
}

function renderHtml({ title, description, image, url }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>${esc(title)} | Dr. Massuca</title>
<meta name="description" content="${esc(description)}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:image" content="${esc(image)}">
<meta property="og:image:alt" content="${esc(title)}">
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

// Converte URL relativa para absoluta (X bot exige absoluta em og:image).
// Aceita ja-absolutas, protocol-relative (//), e absolute paths (/).
function absolutize(url) {
  if (!url) return '';
  const u = String(url).trim();
  if (!u) return '';
  if (/^https?:\/\//i.test(u)) return u;
  if (u.startsWith('//')) return 'https:' + u;
  if (u.startsWith('/')) return 'https://drmassuca.com.br' + u;
  return 'https://drmassuca.com.br/' + u;
}
