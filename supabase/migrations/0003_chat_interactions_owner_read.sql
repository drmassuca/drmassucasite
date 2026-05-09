-- =============================================================
-- Chat Vivo: permitir leitura de chat_interactions pelo owner logado.
-- (Service-role já podia tudo via policy "chat_interactions service all".)
-- Necessário para a página /admin/site-vivo/chat ler via supabase client.
-- =============================================================

DROP POLICY IF EXISTS "chat_interactions owner select" ON chat_interactions;

CREATE POLICY "chat_interactions owner select" ON chat_interactions
  FOR SELECT
  TO authenticated
  USING (
    coalesce(auth.jwt() -> 'user_metadata' ->> 'role', 'owner') = 'owner'
  );

COMMENT ON POLICY "chat_interactions owner select" ON chat_interactions IS
  'Owner autenticado pode ler logs de interacoes (dashboard /admin/site-vivo/chat)';
