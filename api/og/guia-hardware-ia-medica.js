export default function handler(req, res) {
  const ua = (req.headers['user-agent'] || '').toLowerCase();
  const isCrawler = /whatsapp|facebookexternalhit|telegrambot|twitterbot|linkedinbot|slackbot|discordbot|googlebot/i.test(ua);

  if (isCrawler) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.status(200).send(`<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<title>Qual Computador Comprar Para Usar IA na Medicina — Guia 2026 | Dr. Massuca</title>
<meta property="og:title" content="Qual Computador Comprar Para Usar IA na Medicina — Guia 2026" />
<meta property="og:description" content="Guia completo de hardware para o médico que quer usar inteligência artificial: notebooks, desktops, GPU, RAM e SSD. Do básico ao future-ready." />
<meta property="og:image" content="https://drmassuca.com.br/images/ia-medica/guia-hardware-og.jpg" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta property="og:type" content="article" />
<meta property="og:url" content="https://www.drmassuca.com.br/ia-medica/guia-hardware-ia-medica" />
<meta property="og:locale" content="pt_BR" />
<meta property="og:site_name" content="Dr. Massuca" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Qual Computador Comprar Para Usar IA na Medicina — Guia 2026" />
<meta name="twitter:description" content="Guia completo de hardware para médicos: notebooks, desktops, GPU e RAM para IA." />
<meta name="twitter:image" content="https://drmassuca.com.br/images/ia-medica/guia-hardware-og.jpg" />
</head>
<body></body>
</html>`);
  } else {
    res.redirect(301, '/ia-medica/guia-hardware-ia-medica');
  }
}
