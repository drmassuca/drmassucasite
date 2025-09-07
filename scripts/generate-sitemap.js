// generate-sitemap.js
// Script para gerar sitemap.xml dinamicamente
// Uso: node scripts/generate-sitemap.js

const fs = require('fs');
const path = require('path');

// Importar dados dos exames
const examsData = require('../src/data/exams-data.json');

// Configuração
const DOMAIN = 'https://drmassuca.com.br';
const TODAY = new Date().toISOString().split('T')[0];

// Páginas estáticas principais
const staticPages = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/sobre', priority: '0.9', changefreq: 'monthly' },
  { path: '/exames', priority: '0.9', changefreq: 'weekly' },
  { path: '/area-do-paciente', priority: '0.8', changefreq: 'monthly' },
  { path: '/para-medicos', priority: '0.8', changefreq: 'monthly' },
  { path: '/depoimentos', priority: '0.7', changefreq: 'monthly' },
  { path: '/contato', priority: '0.9', changefreq: 'monthly' },
  { path: '/ultrassom-3d', priority: '0.8', changefreq: 'monthly' },
  { path: '/faq', priority: '0.8', changefreq: 'weekly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
];

// Lista manual de FAQs mais importantes (já que não podemos importar JSX aqui)
const topFaqSlugs = [
  'qual-e-a-funcao-do-ultrassom',
  'quais-doencas-o-ultrassom-detecta',
  'quando-fazer-a-primeira-ultrassonografia',
  'precisa-de-jejum-para-fazer-ultrassonografia',
  'o-resultado-da-ultrassonografia-sai-na-hora',
  'quais-sao-os-riscos-da-ultrassonografia',
  'qual-ultrassom-indica-gravidez',
  'qual-a-melhor-semana-para-fazer-ultrassonografia-3d',
  'e-possivel-fazer-ultrassom-sem-pedido-medico',
  'o-ultrassom-e-100-confiavel',
];

// Gerar URLs dos exames
const examPages = examsData.map(exam => ({
  path: `/exames/${exam.slug}`,
  priority: '0.7',
  changefreq: 'monthly',
}));

// Gerar URLs do FAQ
const faqPages = topFaqSlugs.map(slug => ({
  path: `/faq/${slug}`,
  priority: '0.6',
  changefreq: 'monthly',
}));

// Função para criar XML de URL
function createUrlXml(page) {
  return `  <url>
    <loc>${DOMAIN}${page.path}</loc>
    <lastmod>${TODAY}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`;
}

// Gerar sitemap completo
function generateSitemap() {
  const allPages = [...staticPages, ...examPages, ...faqPages];
  
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${allPages.map(createUrlXml).join('\n')}
</urlset>`;

  // Salvar arquivo
  const outputPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
  fs.writeFileSync(outputPath, xml, 'utf8');
  
  console.log(`✅ Sitemap gerado com sucesso!`);
  console.log(`📍 Localização: ${outputPath}`);
  console.log(`📊 Total de URLs: ${allPages.length}`);
  console.log(`📅 Data: ${TODAY}`);
}

// Executar
if (require.main === module) {
  try {
    generateSitemap();
  } catch (error) {
    console.error('❌ Erro ao gerar sitemap:', error);
    process.exit(1);
  }
}

module.exports = { generateSitemap };