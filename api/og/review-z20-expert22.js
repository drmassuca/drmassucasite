export default function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const isCrawler = /whatsapp|facebookexternalhit|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|googlebot/i.test(ua);

  if (isCrawler) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Samsung HERA Z20 vs GE Voluson Expert 22 — Review Completo | Dr. Massuca</title>
<meta property="og:title" content="Samsung HERA Z20 vs GE Voluson Expert 22 — Review Completo" />
<meta property="og:description" content="Comparativo técnico entre os dois ultrassons obstétricos mais avançados do mundo: hardware, IA, transdutores, ergonomia e ROI. Dados exclusivos do congresso This Is Us 2026." />
<meta property="og:image" content="https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/banner-z20-vs-expert22.jpeg" />
<meta property="og:image:width" content="1024" />
<meta property="og:image:height" content="1024" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.drmassuca.com.br/ia-medica/review-z20-expert22" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Dr. Massuca" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Samsung HERA Z20 vs GE Voluson Expert 22 — Review Completo" />
<meta name="twitter:description" content="Comparativo técnico entre os dois ultrassons obstétricos mais avançados do mundo." />
<meta name="twitter:image" content="https://auvyolzrjoyzsribmapa.supabase.co/storage/v1/object/public/images/articles/banner-z20-vs-expert22.jpeg" />
</head>
<body></body>
</html>`);
  } else {
    res.redirect(301, '/ia-medica/review-z20-expert22');
  }
}
