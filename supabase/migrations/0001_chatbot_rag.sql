-- =============================================================
-- Chatbot RAG: pgvector + faq_items.embedding + site_chunks
-- Execute no SQL Editor do Supabase apos confirmar que faq_items
-- ja existe (criado por create_faq_table.sql).
-- =============================================================

CREATE EXTENSION IF NOT EXISTS vector;

-- ----- faq_items: adicionar coluna de embedding ---------------
ALTER TABLE faq_items
  ADD COLUMN IF NOT EXISTS embedding vector(1536);

CREATE INDEX IF NOT EXISTS faq_items_embedding_hnsw_idx
  ON faq_items
  USING hnsw (embedding vector_cosine_ops);

-- ----- site_chunks: conteudo de exames, sobre, 3D, IA Medica --
CREATE TABLE IF NOT EXISTS site_chunks (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_type text NOT NULL,
  source_slug text,
  title       text,
  content     text NOT NULL,
  embedding   vector(1536),
  created_at  timestamptz DEFAULT now(),
  updated_at  timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS site_chunks_source_idx
  ON site_chunks (source_type, source_slug);

CREATE INDEX IF NOT EXISTS site_chunks_embedding_hnsw_idx
  ON site_chunks
  USING hnsw (embedding vector_cosine_ops);

-- Trigger para updated_at
CREATE OR REPLACE FUNCTION set_site_chunks_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_site_chunks_updated_at ON site_chunks;
CREATE TRIGGER trg_site_chunks_updated_at
  BEFORE UPDATE ON site_chunks
  FOR EACH ROW
  EXECUTE FUNCTION set_site_chunks_updated_at();

-- ----- match_site_content: busca semantica unificada ----------
-- Busca em faq_items (aprovados) + site_chunks, retorna top K
-- por similaridade do cosseno acima do threshold.
CREATE OR REPLACE FUNCTION match_site_content(
  query_embedding vector(1536),
  match_count     int   DEFAULT 5,
  match_threshold float DEFAULT 0.4
)
RETURNS TABLE (
  source      text,
  source_id   text,
  title       text,
  content     text,
  similarity  float
)
LANGUAGE sql
STABLE
AS $$
  WITH unioned AS (
    SELECT
      'faq'::text                          AS source,
      slug::text                           AS source_id,
      question                             AS title,
      coalesce(answer, short_answer, '')   AS content,
      1 - (embedding <=> query_embedding)  AS similarity
    FROM faq_items
    WHERE approved = true AND embedding IS NOT NULL

    UNION ALL

    SELECT
      source_type                          AS source,
      coalesce(source_slug, id::text)      AS source_id,
      coalesce(title, '')                  AS title,
      content                              AS content,
      1 - (embedding <=> query_embedding)  AS similarity
    FROM site_chunks
    WHERE embedding IS NOT NULL
  )
  SELECT *
  FROM unioned
  WHERE similarity > match_threshold
  ORDER BY similarity DESC
  LIMIT match_count;
$$;

-- RLS
ALTER TABLE site_chunks ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "site_chunks read public" ON site_chunks;
CREATE POLICY "site_chunks read public" ON site_chunks
  FOR SELECT USING (true);

DROP POLICY IF EXISTS "site_chunks write service" ON site_chunks;
CREATE POLICY "site_chunks write service" ON site_chunks
  FOR ALL USING (auth.role() = 'service_role');

COMMENT ON TABLE  site_chunks IS 'Chunks de conteudo do site (exames, sobre, 3D, IA Medica) para RAG do chatbot';
COMMENT ON COLUMN site_chunks.source_type IS 'exam | about | contact | 3d | ia-medica';
COMMENT ON FUNCTION match_site_content IS 'Busca semantica top-K em faq_items + site_chunks via cosine similarity';
