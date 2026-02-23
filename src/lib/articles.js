/**
 * Serviço de Artigos - Busca do Supabase
 *
 * Este serviço abstrai a busca de artigos, permitindo
 * usar Supabase ou fallback para JSONs locais.
 */

import { supabase, isSupabaseConfigured } from './supabase';

// Cache simples para evitar requisições repetidas
const cache = {
  articles: null,
  categories: null,
  timestamp: null,
  TTL: 5 * 60 * 1000, // 5 minutos
};

const isCacheValid = () => {
  return cache.timestamp && Date.now() - cache.timestamp < cache.TTL;
};

/**
 * Busca todos os artigos publicados
 */
export const getPublishedArticles = async () => {
  // Verificar cache
  if (isCacheValid() && cache.articles) {
    return cache.articles;
  }

  // Se Supabase não configurado, usar fallback
  if (!isSupabaseConfigured()) {
    console.warn('Supabase não configurado, usando dados locais');
    return getFallbackArticles();
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(
        `
        *,
        categories (id, name, slug, icon, color)
      `
      )
      .eq('status', 'published')
      .order('published_at', { ascending: false });

    if (error) throw error;

    // Transformar para formato compatível com o frontend atual
    const articles = data.map(transformArticle);

    // Atualizar cache
    cache.articles = articles;
    cache.timestamp = Date.now();

    return articles;
  } catch (error) {
    console.error('Erro ao buscar artigos:', error);
    return getFallbackArticles();
  }
};

/**
 * Busca um artigo por ID ou slug
 */
export const getArticleById = async idOrSlug => {
  if (!isSupabaseConfigured()) {
    return getFallbackArticleById(idOrSlug);
  }

  try {
    // Tentar buscar por ID numérico primeiro
    const isNumeric = /^\d+$/.test(idOrSlug);

    let query = supabase.from('articles').select(`
        *,
        categories (id, name, slug, icon, color)
      `);

    if (isNumeric) {
      query = query.eq('id', parseInt(idOrSlug));
    } else {
      query = query.eq('slug', idOrSlug);
    }

    const { data, error } = await query.single();

    if (error) throw error;

    return transformArticle(data);
  } catch (error) {
    console.error('Erro ao buscar artigo:', error);
    return getFallbackArticleById(idOrSlug);
  }
};

/**
 * Busca artigos por categoria
 */
export const getArticlesByCategory = async categorySlug => {
  if (!isSupabaseConfigured()) {
    const all = await getFallbackArticles();
    return all.filter(a => a.category?.toLowerCase() === categorySlug?.toLowerCase());
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(
        `
        *,
        categories!inner (id, name, slug, icon, color)
      `
      )
      .eq('status', 'published')
      .eq('categories.slug', categorySlug)
      .order('published_at', { ascending: false });

    if (error) throw error;

    return data.map(transformArticle);
  } catch (error) {
    console.error('Erro ao buscar por categoria:', error);
    return [];
  }
};

/**
 * Busca artigos em destaque
 */
export const getFeaturedArticles = async (limit = 3) => {
  if (!isSupabaseConfigured()) {
    const all = await getFallbackArticles();
    return all.filter(a => a.featured).slice(0, limit);
  }

  try {
    const { data, error } = await supabase
      .from('articles')
      .select(
        `
        *,
        categories (id, name, slug, icon, color)
      `
      )
      .eq('status', 'published')
      .eq('featured', true)
      .order('published_at', { ascending: false })
      .limit(limit);

    if (error) throw error;

    return data.map(transformArticle);
  } catch (error) {
    console.error('Erro ao buscar destaques:', error);
    return [];
  }
};

/**
 * Busca artigos com texto (full-text search)
 */
export const searchArticles = async query => {
  if (!isSupabaseConfigured()) {
    const all = await getFallbackArticles();
    const q = query.toLowerCase();
    return all.filter(
      a =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt?.toLowerCase().includes(q) ||
        a.tags?.some(t => t.toLowerCase().includes(q))
    );
  }

  try {
    const { data, error } = await supabase.rpc('search_articles', { search_query: query });

    if (error) throw error;

    return data.map(transformArticle);
  } catch (error) {
    console.error('Erro na busca:', error);
    return [];
  }
};

/**
 * Busca categorias
 */
export const getCategories = async () => {
  if (isCacheValid() && cache.categories) {
    return cache.categories;
  }

  if (!isSupabaseConfigured()) {
    return getFallbackCategories();
  }

  try {
    const { data, error } = await supabase.from('categories').select('*').order('name');

    if (error) throw error;

    cache.categories = data;
    return data;
  } catch (error) {
    console.error('Erro ao buscar categorias:', error);
    return getFallbackCategories();
  }
};

/**
 * Incrementa visualizações de um artigo
 */
export const incrementViews = async articleId => {
  if (!isSupabaseConfigured()) return;

  try {
    await supabase.rpc('increment_views', { article_id: articleId });
  } catch (error) {
    console.error('Erro ao incrementar views:', error);
  }
};

/**
 * Transforma artigo do Supabase para formato do frontend
 */
const transformArticle = article => {
  if (!article) return null;

  return {
    id: article.id,
    title: article.title,
    slug: article.slug,
    subtitle: article.subtitle,
    excerpt: article.excerpt,
    content: article.content,
    category: article.categories?.name || article.category_id,
    categorySlug: article.categories?.slug,
    categoryIcon: article.categories?.icon,
    categoryColor: article.categories?.color,
    tags: article.tags || [],
    image: article.image_url,
    imageAlt: article.image_alt,
    author: article.author,
    readTime: article.read_time,
    date: article.published_at,
    featured: article.featured,
    views: article.views || 0,
    likes: article.likes || 0,
    shares: article.shares || 0,
    // Metadados extras
    ...article.metadata,
    sources: article.sources || [],
    // SEO
    metaTitle: article.meta_title,
    metaDescription: article.meta_description,
  };
};

// =============================================
// FALLBACK PARA DADOS LOCAIS (JSONs antigos)
// =============================================

/**
 * Carrega artigos dos JSONs locais (fallback)
 */
const getFallbackArticles = async () => {
  try {
    // Importar dinamicamente os metadados do IAMedica
    // Isso é um fallback temporário até a migração completa
    const articlesData = [
      { id: 1, path: '/src/pages/ia-medica/articles/article-1.json' },
      { id: 2, path: '/src/pages/ia-medica/articles/article-2.json' },
      { id: 3, path: '/src/pages/ia-medica/articles/article-3.json' },
      { id: 4, path: '/src/pages/ia-medica/articles/article-4.json' },
      { id: 5, path: '/src/pages/ia-medica/articles/article-5.json' },
      { id: 6, path: '/src/pages/ia-medica/articles/article-6.json' },
      { id: 7, path: '/src/pages/ia-medica/articles/article-7.json' },
      { id: 8, path: '/src/pages/ia-medica/articles/article-8.json' },
      { id: 9, path: '/src/pages/ia-medica/articles/article-9.json' },
      { id: 10, path: '/src/pages/ia-medica/articles/article-10.json' },
      { id: 11, path: '/src/pages/ia-medica/articles/article-11.json' },
      { id: 12, path: '/src/pages/ia-medica/articles/article-12.json' },
      { id: 13, path: '/src/pages/ia-medica/articles/article-13.json' },
      { id: 14, path: '/src/pages/ia-medica/articles/article-14.json' },
      { id: 15, path: '/src/pages/ia-medica/articles/article-15.json' },
    ];

    const articles = await Promise.all(
      articlesData.map(async ({ id }) => {
        try {
          const response = await fetch(`/src/pages/ia-medica/articles/article-${id}.json`);
          if (!response.ok) return null;
          const data = await response.json();
          return { ...data, id };
        } catch {
          return null;
        }
      })
    );

    return articles.filter(Boolean);
  } catch (error) {
    console.error('Erro no fallback:', error);
    return [];
  }
};

const getFallbackArticleById = async id => {
  try {
    const response = await fetch(`/src/pages/ia-medica/articles/article-${id}.json`);
    if (!response.ok) return null;
    const data = await response.json();
    return { ...data, id: parseInt(id) };
  } catch {
    return null;
  }
};

const getFallbackCategories = () => [
  { id: 1, name: 'Infraestrutura', slug: 'infraestrutura', icon: 'Brain', color: '#3B82F6' },
  { id: 2, name: 'Startups', slug: 'startups', icon: 'TrendingUp', color: '#10B981' },
  { id: 3, name: 'Aplicação Clínica', slug: 'aplicacao-clinica', icon: 'Users', color: '#8B5CF6' },
  { id: 4, name: 'Regulamentação', slug: 'regulamentacao', icon: 'Tag', color: '#F59E0B' },
  { id: 5, name: 'Internacional', slug: 'internacional', icon: 'Calendar', color: '#EC4899' },
  { id: 6, name: 'Ética', slug: 'etica', icon: 'Stethoscope', color: '#EF4444' },
];

// Limpar cache (útil para admin)
export const clearCache = () => {
  cache.articles = null;
  cache.categories = null;
  cache.timestamp = null;
};

export default {
  getPublishedArticles,
  getArticleById,
  getArticlesByCategory,
  getFeaturedArticles,
  searchArticles,
  getCategories,
  incrementViews,
  clearCache,
};
