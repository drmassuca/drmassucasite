/**
 * Atualiza artigo 20 no Supabase lendo direto do HTML standalone
 * 
 * Execute com:
 * SUPABASE_SERVICE_KEY=sua_key node supabase/update-article-20.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const supabaseUrl = 'https://auvyolzrjoyzsribmapa.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseServiceKey) {
  console.error('\n❌  SUPABASE_SERVICE_KEY não definida.\n');
  console.log('   Execute assim:');
  console.log('   SUPABASE_SERVICE_KEY=sua_key node supabase/update-article-20.js\n');
  console.log('   A Service Role Key está em:');
  console.log('   Supabase Dashboard → Settings → API → service_role\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ── CONTEÚDO HTML INLINE ────────────────────────────────────────────────────
// Cole aqui o conteúdo do arquivo review_ultrassom_z20_expert22.html
// entre as tags <body> e </body>, precedido pelo bloco <style>
// OU coloque o HTML completo no arquivo src/pages/ia-medica/articles/article-20-content.html
// e o script vai lê-lo automaticamente.

async function updateArticle20() {
  console.log('\n🔄  Atualizando artigo 20 — Samsung Z20 vs GE Expert 22\n');

  // Tentar ler HTML do arquivo separado
  const htmlPath = path.join(__dirname, '../src/pages/ia-medica/articles/article-20-content.html');
  const jsonPath = path.join(__dirname, '../src/pages/ia-medica/articles/article-20.json');

  let content = '';

  if (fs.existsSync(htmlPath)) {
    content = fs.readFileSync(htmlPath, 'utf-8');
    console.log('✅  HTML carregado de article-20-content.html (' + content.length + ' chars)');
  } else if (fs.existsSync(jsonPath)) {
    const article = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
    content = article.content || '';
    console.log('ℹ️   HTML carregado do article-20.json (' + content.length + ' chars)');
  } else {
    console.error('❌  Nenhum arquivo de conteúdo encontrado.');
    process.exit(1);
  }

  if (!content || content.length < 1000) {
    console.error('❌  Conteúdo muito pequeno ou vazio.');
    process.exit(1);
  }

  const articleData = {
    slug: 'samsung-hera-z20-vs-ge-voluson-expert-22',
    title: 'Samsung HERA Z20 vs. GE Voluson Expert 22: o duelo definitivo em ultrassom obstétrico premium',
    subtitle: 'Testei os dois aparelhos mais avançados do mundo em morfologia fetal no This Is Us 2026 — e trouxe specs que não existem em nenhuma publicação pública',
    excerpt: 'Samsung HERA Z20 contra GE Voluson Expert 22: testados no congresso This Is Us 2026 da Escola NEXUS em Brasília. Hardware coletado onsite, revisado pela Samsung Medison Brasil, calculadora de ROI interativa, notas finais e vencedor declarado.',
    content: content,
    category_id: 3,
    tags: ['Ultrassom', 'Samsung HERA Z20', 'GE Voluson Expert 22', 'Morfologia Fetal', 'Ecocardiografia Fetal', 'IA em Medicina', 'Review de Equipamentos', 'NEXUS'],
    image_url: null,
    author: 'Dr. Massuca',
    read_time: '18 min',
    status: 'published',
    featured: true,
    published_at: '2026-03-30T00:00:00.000Z',
    sources: [
      { title: 'Samsung HERA Z20 — ISUOG 2024', url: 'https://news.samsung.com/global/samsung-unveils-premium-ob-gyn-ultrasound-system-hera-z20-in-isuog-world-congress-2024', type: 'industry' },
      { title: 'GE Voluson Expert 22 — Datasheet', url: 'https://let.web-sme-csp.com/wp-content/uploads/2022/09/Voluson-Expert-22-Datasheet__DOC2668404_JB19599XX.pdf', type: 'industry' },
      { title: 'FDA 510(k) K241971', url: 'https://xrayinterpreter.com/fda/K241971', type: 'regulatory' },
      { title: 'FetalHQ — PMC 2025', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12112619/', type: 'academic' },
      { title: 'NEXUS — Escola de Ultrassonografia', url: 'https://nexusultrassonografia.com.br/', type: 'institutional' }
    ],
    metadata: {}
  };

  const { data, error } = await supabase
    .from('articles')
    .upsert(articleData, { onConflict: 'slug', ignoreDuplicates: false })
    .select('id, slug');

  if (error) {
    console.error('\n❌  Erro ao atualizar:', error.message);
    if (error.details) console.error('   Detalhes:', error.details);
    process.exit(1);
  }

  console.log('\n✅  Artigo atualizado com sucesso!');
  console.log('   ID:', data[0]?.id);
  console.log('   Slug:', data[0]?.slug);
  console.log('\n🌐  URL: https://drmassuca.com.br/ia-medica/samsung-hera-z20-vs-ge-voluson-expert-22\n');
}

updateArticle20().catch(err => {
  console.error('❌  Erro inesperado:', err.message);
  process.exit(1);
});
