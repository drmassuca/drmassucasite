/**
 * Publica artigo 20 no Supabase lendo o HTML do arquivo standalone
 *
 * PASSO 1: Abra o arquivo abaixo no browser e salve como HTML:
 *   C:\DEV\SITES\drmassucasite\src\pages\ia-medica\articles\article-20-content.html
 *   (o Claude vai gerar esse arquivo separadamente)
 *
 * PASSO 2: Execute:
 *   cd C:\DEV\SITES\drmassucasite
 *   SUPABASE_SERVICE_KEY=sua_key node supabase/publish-article-20.js
 *
 * A Service Role Key está em:
 *   Supabase Dashboard → Settings → API → service_role
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
  console.error('\n❌  SUPABASE_SERVICE_KEY nao definida.\n');
  console.log('   Windows PowerShell:');
  console.log('   $env:SUPABASE_SERVICE_KEY="sua_key"; node supabase/publish-article-20.js\n');
  console.log('   Windows CMD:');
  console.log('   set SUPABASE_SERVICE_KEY=sua_key && node supabase/publish-article-20.js\n');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function publish() {
  // Ler HTML do arquivo separado
  const htmlPath = path.join(__dirname, '../src/pages/ia-medica/articles/article-20-content.html');

  if (!fs.existsSync(htmlPath)) {
    console.error('❌  Arquivo nao encontrado:', htmlPath);
    console.log('   Peça ao Claude para gerar o arquivo article-20-content.html');
    process.exit(1);
  }

  const content = fs.readFileSync(htmlPath, 'utf-8');
  console.log('\n🔄  Publicando artigo 20...');
  console.log('   Content:', content.length, 'chars\n');

  const { data, error } = await supabase
    .from('articles')
    .upsert({
      slug: 'samsung-hera-z20-vs-ge-voluson-expert-22',
      title: 'Samsung HERA Z20 vs. GE Voluson Expert 22: o duelo definitivo em ultrassom obstétrico premium',
      subtitle: 'Testei os dois aparelhos mais avançados do mundo em morfologia fetal no This Is Us 2026 — e trouxe specs que nao existem em nenhuma publicacao publica',
      excerpt: 'Samsung Z20 vs GE Expert 22: revisado pela Samsung Medison Brasil, calculadora de ROI interativa, notas 9.2 vs 9.0 e vencedor declarado.',
      content: content,
      category_id: 3,
      tags: ['Ultrassom', 'Samsung HERA Z20', 'GE Voluson Expert 22', 'Morfologia Fetal', 'Ecocardiografia Fetal', 'IA em Medicina', 'Review de Equipamentos', 'NEXUS'],
      author: 'Dr. Massuca',
      read_time: '18 min',
      status: 'published',
      featured: true,
      published_at: '2026-03-30T00:00:00.000Z',
      sources: [
        {title: 'Samsung HERA Z20 — ISUOG 2024', url: 'https://news.samsung.com/global/samsung-unveils-premium-ob-gyn-ultrasound-system-hera-z20-in-isuog-world-congress-2024', type: 'industry'},
        {title: 'GE Voluson Expert 22 — Datasheet', url: 'https://let.web-sme-csp.com/wp-content/uploads/2022/09/Voluson-Expert-22-Datasheet__DOC2668404_JB19599XX.pdf', type: 'industry'},
        {title: 'FDA 510(k) K241971', url: 'https://xrayinterpreter.com/fda/K241971', type: 'regulatory'},
        {title: 'FetalHQ — PMC 2025', url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12112619/', type: 'academic'},
        {title: 'NEXUS', url: 'https://nexusultrassonografia.com.br/', type: 'institutional'}
      ],
      metadata: {}
    }, { onConflict: 'slug', ignoreDuplicates: false })
    .select('id, slug');

  if (error) {
    console.error('❌  Erro:', error.message);
    if (error.details) console.error('   Detalhes:', error.details);
    process.exit(1);
  }

  console.log('✅  Publicado com sucesso!');
  console.log('   ID:', data[0]?.id);
  console.log('\n🌐  https://drmassuca.com.br/ia-medica/samsung-hera-z20-vs-ge-voluson-expert-22\n');
}

publish().catch(console.error);
