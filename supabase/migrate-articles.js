/**
 * Script de Migração - JSONs para Supabase
 * 
 * Este script migra os artigos dos arquivos JSON locais para o Supabase.
 * Execute com: node supabase/migrate-articles.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuração do Supabase
const supabaseUrl = 'https://auvyolzrjoyzsribmapa.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY; // Usar service key para bypass RLS

if (!supabaseServiceKey) {
  console.log('⚠️  SUPABASE_SERVICE_KEY não definida.');
  console.log('   Para rodar a migração, você precisa da Service Role Key.');
  console.log('   Encontre em: Supabase Dashboard > Settings > API > service_role');
  console.log('');
  console.log('   Execute assim:');
  console.log('   SUPABASE_SERVICE_KEY=sua_key node supabase/migrate-articles.js');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

// Mapeamento de categorias para IDs
const categoryMap = {
  'Infraestrutura': 1,
  'Startups': 2,
  'Aplicação Clínica': 3,
  'Regulamentação': 4,
  'Internacional': 5,
  'Ética': 6
};

// Função para gerar slug
function generateSlug(title) {
  return title
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s-]/g, '')    // Remove caracteres especiais
    .replace(/\s+/g, '-')            // Espaços para hífens
    .replace(/-+/g, '-')             // Remove hífens duplicados
    .substring(0, 100);              // Limita tamanho
}

// Função principal de migração
async function migrateArticles() {
  console.log('🚀 Iniciando migração de artigos...\n');

  const articlesDir = path.join(__dirname, '../src/pages/ia-medica/articles');
  
  // Verificar se o diretório existe
  if (!fs.existsSync(articlesDir)) {
    console.error('❌ Diretório de artigos não encontrado:', articlesDir);
    process.exit(1);
  }

  // Ler todos os arquivos JSON
  const files = fs.readdirSync(articlesDir)
    .filter(f => f.startsWith('article-') && f.endsWith('.json'));

  console.log(`📁 Encontrados ${files.length} artigos para migrar\n`);

  let successCount = 0;
  let errorCount = 0;

  for (const file of files) {
    try {
      const filePath = path.join(articlesDir, file);
      const rawData = fs.readFileSync(filePath, 'utf-8');
      const article = JSON.parse(rawData);

      // Preparar dados para o Supabase
      const articleData = {
        title: article.title,
        slug: generateSlug(article.title),
        subtitle: article.subtitle || null,
        excerpt: article.excerpt,
        content: article.content,
        category_id: categoryMap[article.category] || null,
        tags: article.tags || [],
        image_url: article.image,
        author: article.author || 'Dr. Massuca',
        read_time: article.readTime,
        status: 'published',
        featured: article.featured || false,
        published_at: article.date ? new Date(article.date).toISOString() : new Date().toISOString(),
        metadata: {
          // Campos extras específicos de cada artigo
          investment: article.investment || null,
          users: article.users || null,
          patients: article.patients || null,
          accuracy: article.accuracy || null,
          hallucination: article.hallucination || null,
          comparison: article.comparison || null,
          location: article.location || null,
          promise: article.promise || null,
          reality: article.reality || null,
          victims: article.victims || null,
          gap: article.gap || null,
          duration: article.duration || null,
          consultations: article.consultations || null,
          enhancement: article.enhancement || null,
          preservation: article.preservation || null,
          errorRate: article.errorRate || null,
          responsibility: article.responsibility || null,
          regulation: article.regulation || null,
          scope: article.scope || null,
          violations: article.violations || null,
          timeReduction: article.timeReduction || null,
          hospitals: article.hospitals || null,
        },
        sources: article.sources || [],
        views: article.views || 0,
        likes: article.likes || 0,
        shares: article.shares || 0,
      };

      // Remover valores null do metadata
      articleData.metadata = Object.fromEntries(
        Object.entries(articleData.metadata).filter(([_, v]) => v != null)
      );

      // Inserir no Supabase
      const { data, error } = await supabase
        .from('articles')
        .upsert(articleData, { 
          onConflict: 'slug',
          ignoreDuplicates: false 
        })
        .select();

      if (error) {
        console.error(`❌ Erro ao migrar ${file}:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Migrado: ${article.title.substring(0, 50)}...`);
        successCount++;
      }

    } catch (err) {
      console.error(`❌ Erro ao processar ${file}:`, err.message);
      errorCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`📊 Resumo da Migração:`);
  console.log(`   ✅ Sucesso: ${successCount}`);
  console.log(`   ❌ Erros: ${errorCount}`);
  console.log(`   📁 Total: ${files.length}`);
  console.log('='.repeat(50));
}

// Executar migração
migrateArticles().catch(console.error);
