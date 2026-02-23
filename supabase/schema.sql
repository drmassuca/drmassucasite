-- =============================================
-- SCHEMA DO BLOG IA MÉDICA - DR. MASSUCA
-- Execute este script no SQL Editor do Supabase
-- =============================================

-- 1. TABELA DE CATEGORIAS
-- =============================================
CREATE TABLE IF NOT EXISTS categories (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE,
  slug VARCHAR(100) NOT NULL UNIQUE,
  description TEXT,
  icon VARCHAR(50), -- Nome do ícone Lucide
  color VARCHAR(7), -- Cor hex
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir categorias padrão
INSERT INTO categories (name, slug, icon, color) VALUES
  ('Infraestrutura', 'infraestrutura', 'Brain', '#3B82F6'),
  ('Startups', 'startups', 'TrendingUp', '#10B981'),
  ('Aplicação Clínica', 'aplicacao-clinica', 'Users', '#8B5CF6'),
  ('Regulamentação', 'regulamentacao', 'Tag', '#F59E0B'),
  ('Internacional', 'internacional', 'Calendar', '#EC4899'),
  ('Ética', 'etica', 'Stethoscope', '#EF4444')
ON CONFLICT (slug) DO NOTHING;

-- 2. TABELA DE ARTIGOS
-- =============================================
CREATE TABLE IF NOT EXISTS articles (
  id SERIAL PRIMARY KEY,
  
  -- Conteúdo principal
  title VARCHAR(500) NOT NULL,
  slug VARCHAR(500) NOT NULL UNIQUE,
  subtitle TEXT,
  excerpt TEXT,
  content TEXT, -- HTML do artigo
  
  -- Categorização
  category_id INTEGER REFERENCES categories(id),
  tags TEXT[] DEFAULT '{}',
  
  -- Mídia
  image_url TEXT,
  image_alt TEXT,
  
  -- Metadados
  author VARCHAR(100) DEFAULT 'Dr. Massuca',
  read_time VARCHAR(20),
  
  -- Status e publicação
  status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'scheduled', 'archived')),
  featured BOOLEAN DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE,
  
  -- Métricas especiais (flexível para diferentes tipos de artigo)
  metadata JSONB DEFAULT '{}',
  -- Exemplo: {"investment": "US$ 320 milhões", "users": "20.000+", "accuracy": "93%"}
  
  -- Engajamento
  views INTEGER DEFAULT 0,
  likes INTEGER DEFAULT 0,
  shares INTEGER DEFAULT 0,
  
  -- SEO
  meta_title VARCHAR(70),
  meta_description VARCHAR(160),
  
  -- Fontes e referências
  sources JSONB DEFAULT '[]',
  -- Formato: [{"title": "...", "url": "...", "type": "Estudo"}]
  
  -- Timestamps
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Autor (para futuro multi-usuário)
  created_by UUID REFERENCES auth.users(id),
  updated_by UUID REFERENCES auth.users(id)
);

-- 3. TABELA DE TEMPLATES
-- =============================================
CREATE TABLE IF NOT EXISTS article_templates (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  
  -- Estrutura do template (HTML base)
  structure TEXT NOT NULL,
  
  -- Campos personalizados do template
  custom_fields JSONB DEFAULT '[]',
  -- Exemplo: [{"name": "investment", "label": "Investimento", "type": "text"}]
  
  -- CSS adicional específico do template
  custom_css TEXT,
  
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Inserir templates padrão
INSERT INTO article_templates (name, description, icon, structure, custom_fields) VALUES
(
  'Notícia Rápida',
  'Para notícias curtas e objetivas (2-4 parágrafos)',
  'Zap',
  '<div class="article-lead-box"><p>{{lead}}</p></div>
<h2>{{section_1_title}}</h2>
<p>{{section_1_content}}</p>
<h2>{{section_2_title}}</h2>
<p>{{section_2_content}}</p>
<div class="call-to-action"><h3>Conclusão</h3><p>{{conclusion}}</p></div>',
  '[
    {"name": "lead", "label": "Lead (parágrafo inicial)", "type": "textarea", "required": true},
    {"name": "section_1_title", "label": "Título Seção 1", "type": "text"},
    {"name": "section_1_content", "label": "Conteúdo Seção 1", "type": "richtext"},
    {"name": "section_2_title", "label": "Título Seção 2", "type": "text"},
    {"name": "section_2_content", "label": "Conteúdo Seção 2", "type": "richtext"},
    {"name": "conclusion", "label": "Conclusão", "type": "textarea"}
  ]'::jsonb
),
(
  'Análise Profunda',
  'Para artigos longos e detalhados com múltiplas seções',
  'FileText',
  '<div class="article-lead-box"><p>{{lead}}</p></div>
<div class="highlight-box"><h3>RESUMO</h3><ul>{{summary_points}}</ul></div>
<h2>CONTEXTO</h2>
<p>{{context}}</p>
<h2>ANÁLISE</h2>
{{analysis}}
<h2>IMPACTO</h2>
{{impact}}
<h2>CONCLUSÃO</h2>
<p>{{conclusion}}</p>
<div class="call-to-action"><h3>E você?</h3><p>{{cta}}</p></div>',
  '[
    {"name": "lead", "label": "Lead (parágrafo inicial)", "type": "textarea", "required": true},
    {"name": "summary_points", "label": "Pontos do Resumo (HTML lista)", "type": "richtext"},
    {"name": "context", "label": "Contexto", "type": "richtext"},
    {"name": "analysis", "label": "Análise (pode ter múltiplos H3)", "type": "richtext"},
    {"name": "impact", "label": "Impacto", "type": "richtext"},
    {"name": "conclusion", "label": "Conclusão", "type": "textarea"},
    {"name": "cta", "label": "Call to Action", "type": "textarea"}
  ]'::jsonb
),
(
  'Dados e Estatísticas',
  'Para artigos focados em números e comparações',
  'BarChart3',
  '<div class="article-lead-box"><p>{{lead}}</p></div>
<div class="highlight-box"><h3>NÚMEROS-CHAVE</h3><ul>{{key_numbers}}</ul></div>
<h2>O QUE OS DADOS MOSTRAM</h2>
{{data_analysis}}
<h2>COMPARATIVO</h2>
{{comparison}}
<h2>IMPLICAÇÕES</h2>
{{implications}}
<div class="call-to-action"><h3>Conclusão</h3><p>{{conclusion}}</p></div>',
  '[
    {"name": "lead", "label": "Lead", "type": "textarea", "required": true},
    {"name": "key_numbers", "label": "Números-chave (HTML lista)", "type": "richtext"},
    {"name": "data_analysis", "label": "Análise dos Dados", "type": "richtext"},
    {"name": "comparison", "label": "Comparativo", "type": "richtext"},
    {"name": "implications", "label": "Implicações", "type": "richtext"},
    {"name": "conclusion", "label": "Conclusão", "type": "textarea"}
  ]'::jsonb
),
(
  'Tutorial/Guia',
  'Para guias práticos passo-a-passo',
  'BookOpen',
  '<div class="article-lead-box"><p>{{lead}}</p></div>
<div class="highlight-box"><h3>PRÉ-REQUISITOS</h3><ul>{{prerequisites}}</ul></div>
<div class="process-steps"><h3>PASSO A PASSO</h3>{{steps}}</div>
<h2>DICAS IMPORTANTES</h2>
{{tips}}
<div class="call-to-action"><h3>Próximos Passos</h3><p>{{next_steps}}</p></div>',
  '[
    {"name": "lead", "label": "Introdução", "type": "textarea", "required": true},
    {"name": "prerequisites", "label": "Pré-requisitos (HTML lista)", "type": "richtext"},
    {"name": "steps", "label": "Passos (use div.step)", "type": "richtext"},
    {"name": "tips", "label": "Dicas", "type": "richtext"},
    {"name": "next_steps", "label": "Próximos Passos", "type": "textarea"}
  ]'::jsonb
)
ON CONFLICT DO NOTHING;

-- 4. TABELA DE HISTÓRICO DE ALTERAÇÕES
-- =============================================
CREATE TABLE IF NOT EXISTS article_revisions (
  id SERIAL PRIMARY KEY,
  article_id INTEGER REFERENCES articles(id) ON DELETE CASCADE,
  
  -- Snapshot do artigo
  title VARCHAR(500),
  content TEXT,
  metadata JSONB,
  
  -- Quem e quando
  changed_by UUID REFERENCES auth.users(id),
  changed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Descrição da mudança
  change_description TEXT
);

-- 5. TABELA DE IMAGENS/MÍDIA
-- =============================================
CREATE TABLE IF NOT EXISTS media (
  id SERIAL PRIMARY KEY,
  
  filename VARCHAR(255) NOT NULL,
  original_name VARCHAR(255),
  mime_type VARCHAR(100),
  size_bytes INTEGER,
  
  -- URL no storage do Supabase
  storage_path TEXT NOT NULL,
  public_url TEXT,
  
  -- Metadados
  alt_text TEXT,
  caption TEXT,
  
  -- Organização
  folder VARCHAR(100) DEFAULT 'general',
  
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. CONFIGURAÇÕES DO BLOG
-- =============================================
CREATE TABLE IF NOT EXISTS blog_settings (
  key VARCHAR(100) PRIMARY KEY,
  value JSONB NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Configurações padrão
INSERT INTO blog_settings (key, value) VALUES
  ('site_title', '"IA Médica - Dr. Massuca"'),
  ('posts_per_page', '10'),
  ('enable_comments', 'false'),
  ('enable_likes', 'true'),
  ('enable_shares', 'true'),
  ('default_author', '"Dr. Massuca"'),
  ('ai_features_enabled', 'true')
ON CONFLICT (key) DO NOTHING;

-- 7. LOGS DE IA (para rastrear uso)
-- =============================================
CREATE TABLE IF NOT EXISTS ai_logs (
  id SERIAL PRIMARY KEY,
  
  action VARCHAR(50) NOT NULL, -- 'generate_title', 'generate_excerpt', 'suggest_tags', etc
  input_data JSONB,
  output_data JSONB,
  
  model_used VARCHAR(50),
  tokens_used INTEGER,
  
  article_id INTEGER REFERENCES articles(id),
  user_id UUID REFERENCES auth.users(id),
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- ÍNDICES PARA PERFORMANCE
-- =============================================

CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles(featured) WHERE featured = true;
CREATE INDEX IF NOT EXISTS idx_articles_tags ON articles USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Índice para busca full-text
CREATE INDEX IF NOT EXISTS idx_articles_search ON articles 
  USING GIN(to_tsvector('portuguese', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, '')));

-- =============================================
-- FUNÇÕES E TRIGGERS
-- =============================================

-- Função para atualizar updated_at automaticamente
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para articles
DROP TRIGGER IF EXISTS trigger_articles_updated_at ON articles;
CREATE TRIGGER trigger_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Função para gerar slug automaticamente
CREATE OR REPLACE FUNCTION generate_slug(title TEXT)
RETURNS TEXT AS $$
BEGIN
  RETURN lower(
    regexp_replace(
      regexp_replace(
        regexp_replace(
          translate(title, 'áàâãäéèêëíìîïóòôõöúùûüçñ', 'aaaaaeeeeiiiioooooouuuucn'),
          '[^a-zA-Z0-9\s-]', '', 'g'
        ),
        '\s+', '-', 'g'
      ),
      '-+', '-', 'g'
    )
  );
END;
$$ LANGUAGE plpgsql;

-- Função para busca full-text
CREATE OR REPLACE FUNCTION search_articles(search_query TEXT)
RETURNS SETOF articles AS $$
BEGIN
  RETURN QUERY
  SELECT *
  FROM articles
  WHERE 
    status = 'published'
    AND (
      to_tsvector('portuguese', coalesce(title, '') || ' ' || coalesce(excerpt, '') || ' ' || coalesce(content, ''))
      @@ plainto_tsquery('portuguese', search_query)
      OR title ILIKE '%' || search_query || '%'
      OR excerpt ILIKE '%' || search_query || '%'
      OR search_query = ANY(tags)
    )
  ORDER BY published_at DESC;
END;
$$ LANGUAGE plpgsql;

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Habilitar RLS
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_revisions ENABLE ROW LEVEL SECURITY;
ALTER TABLE media ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE ai_logs ENABLE ROW LEVEL SECURITY;

-- Políticas para leitura pública (artigos publicados)
CREATE POLICY "Artigos publicados são públicos" ON articles
  FOR SELECT USING (status = 'published');

CREATE POLICY "Categorias são públicas" ON categories
  FOR SELECT USING (true);

-- Políticas para usuários autenticados (admin)
CREATE POLICY "Admins podem tudo em articles" ON articles
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem tudo em categories" ON categories
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem tudo em templates" ON article_templates
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem ver revisões" ON article_revisions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem inserir revisões" ON article_revisions
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Admins podem tudo em media" ON media
  FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem ver settings" ON blog_settings
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem atualizar settings" ON blog_settings
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem ver logs de IA" ON ai_logs
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Admins podem inserir logs de IA" ON ai_logs
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- =============================================
-- STORAGE BUCKET PARA IMAGENS
-- =============================================

-- Nota: Execute isto separadamente no Dashboard do Supabase
-- ou via API, pois SQL não cria buckets diretamente

-- INSERT INTO storage.buckets (id, name, public)
-- VALUES ('article-images', 'article-images', true);

-- =============================================
-- COMENTÁRIOS FINAIS
-- =============================================

COMMENT ON TABLE articles IS 'Artigos do blog IA Médica';
COMMENT ON TABLE categories IS 'Categorias dos artigos';
COMMENT ON TABLE article_templates IS 'Templates pré-definidos para criação de artigos';
COMMENT ON TABLE article_revisions IS 'Histórico de alterações dos artigos';
COMMENT ON TABLE media IS 'Imagens e arquivos de mídia';
COMMENT ON TABLE blog_settings IS 'Configurações gerais do blog';
COMMENT ON TABLE ai_logs IS 'Logs de uso de IA para geração de conteúdo';
