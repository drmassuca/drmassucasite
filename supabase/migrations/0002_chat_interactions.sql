-- =============================================================
-- Chat Vivo: log de interacoes do chatbot (api/chat.js)
-- Base para observabilidade do RAG: cobertura, fallback, latencia.
-- Consumido por: cron do modulo chat-vivo + UI /admin/site-vivo/chat.
-- =============================================================

CREATE TABLE IF NOT EXISTS chat_interactions (
  id                   uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at           timestamptz NOT NULL DEFAULT now(),
  session_id           text,
  user_message         text NOT NULL,
  response             text,
  top_similarity       double precision,
  sources_count        integer NOT NULL DEFAULT 0,
  sources              jsonb,
  latency_ms           integer,
  fallback_to_whatsapp boolean NOT NULL DEFAULT false,
  error                text
);

CREATE INDEX IF NOT EXISTS chat_interactions_created_at_idx
  ON chat_interactions (created_at DESC);

CREATE INDEX IF NOT EXISTS chat_interactions_session_id_idx
  ON chat_interactions (session_id)
  WHERE session_id IS NOT NULL;

-- Index pra dashboard "perguntas mal respondidas" (fallback ou top_similarity baixa)
CREATE INDEX IF NOT EXISTS chat_interactions_quality_idx
  ON chat_interactions (created_at DESC)
  WHERE fallback_to_whatsapp = true OR top_similarity IS NULL OR top_similarity < 0.4;

-- RLS: apenas service_role acessa. Dashboard /admin lê via API protegida (auth Supabase).
ALTER TABLE chat_interactions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "chat_interactions service all" ON chat_interactions;
CREATE POLICY "chat_interactions service all" ON chat_interactions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

COMMENT ON TABLE chat_interactions IS
  'Log de interacoes do chatbot (api/chat.js). Base do modulo Chat Vivo (observabilidade).';
COMMENT ON COLUMN chat_interactions.session_id IS
  'Identificador opcional de sessao (frontend gera). Permite reconstituir conversas.';
COMMENT ON COLUMN chat_interactions.top_similarity IS
  'Maior similaridade entre os matches retornados pelo match_site_content (null se zero matches)';
COMMENT ON COLUMN chat_interactions.sources_count IS
  'Quantidade de chunks retornados pelo RAG (0 = fallback total)';
COMMENT ON COLUMN chat_interactions.sources IS
  'Array de matches: [{source, source_id, title, similarity}]';
COMMENT ON COLUMN chat_interactions.fallback_to_whatsapp IS
  'Heuristica: resposta menciona WhatsApp E sources_count = 0 (RAG nao achou nada relevante)';
