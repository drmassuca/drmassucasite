-- =============================================================
-- RLS hardening (Security Advisor: 11 errors -> 0).
-- Aplicado no projeto auvyolzrjoyzsribmapa em 2026-08-01.
--
-- Supersede a 0003: a policy "chat_interactions owner select" lia
-- auth.jwt() -> 'user_metadata' ->> 'role', que e editavel pelo proprio
-- usuario (supabase.auth.updateUser), e o coalesce(...,'owner') ainda
-- deixava passar QUALQUER authenticated sem role no metadata. Falha real,
-- nao teorica: usuario sem metadata enxergava as 19 linhas de log.
--
-- As tabelas xvivo_* do mesmo banco sao versionadas no repo x-vivo
-- (scripts/migration_2026_08_rls.sql) — polyrepo, cada modulo cuida do seu.
-- =============================================================

-- -------------------------------------------------------------
-- 1) memo_credit_ledger: deny-all para anon/authenticated.
-- Ledger financeiro (compras PIX + consumo de creditos de IA), tocado
-- APENAS por api/memo3d/** via getAdminClient() (service_role, bypassa RLS).
-- O admin do front le memo_patients/memo_exams/memo_audit_log, nunca o ledger.
-- -------------------------------------------------------------
ALTER TABLE public.memo_credit_ledger ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.memo_credit_ledger FROM anon, authenticated;

-- -------------------------------------------------------------
-- 2) app_admins: fonte da verdade de quem e admin, fora do alcance do usuario.
-- Sem policy publica de proposito — so service_role e a funcao SECURITY
-- DEFINER abaixo enxergam.
-- -------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.app_admins (
  user_id    uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.app_admins ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON public.app_admins FROM anon, authenticated;

COMMENT ON TABLE public.app_admins IS
  'Allowlist de admins. Usada por is_app_admin() nas policies de RLS. Nao usar user_metadata (editavel pelo usuario) para checagem de permissao.';

-- Seed do owner. Por email para nao depender de UUID de um projeto especifico.
-- No projeto auvyolzrjoyzsribmapa: 9fb3f313-31da-443c-b0b2-3ec4b68cb2a6.
-- NAO incluir a conta 'reception' (cristiana@) — o frontend ja a redireciona
-- pra /recepcao e ela nunca acessa rotas /admin.
INSERT INTO public.app_admins (user_id)
SELECT id FROM auth.users WHERE email = 'drmassucatti@gmail.com'
ON CONFLICT (user_id) DO NOTHING;

-- -------------------------------------------------------------
-- 3) is_app_admin(): SECURITY DEFINER porque app_admins tem RLS sem policy —
-- subquery direta dentro da policy seria bloqueada e ninguem passaria.
-- search_path fixo evita hijacking (warning "Function Search Path Mutable").
-- -------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.is_app_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
STABLE
AS $$
  SELECT EXISTS (SELECT 1 FROM public.app_admins a WHERE a.user_id = auth.uid());
$$;

-- Só authenticated precisa executar (para anon, auth.uid() e null -> false).
REVOKE EXECUTE ON FUNCTION public.is_app_admin() FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.is_app_admin() TO authenticated;

-- -------------------------------------------------------------
-- 4) chat_interactions: troca a policy insegura.
-- Escrita continua por service_role (api/chat.js). Leitura e do dashboard
-- /admin/site-vivo/chat com o JWT do owner.
-- -------------------------------------------------------------
DROP POLICY IF EXISTS "chat_interactions admin select" ON public.chat_interactions;

CREATE POLICY "chat_interactions admin select" ON public.chat_interactions
  FOR SELECT
  TO authenticated
  USING (public.is_app_admin());

DROP POLICY IF EXISTS "chat_interactions owner select" ON public.chat_interactions;

COMMENT ON POLICY "chat_interactions admin select" ON public.chat_interactions IS
  'Leitura restrita a UIDs em app_admins (dashboard /admin/site-vivo/chat)';

-- -------------------------------------------------------------
-- Verificacao (rodar manualmente; espera 19+ linhas e depois 0):
--
--   begin;
--     set local role authenticated;
--     set local request.jwt.claims to '{"sub":"9fb3f313-31da-443c-b0b2-3ec4b68cb2a6","role":"authenticated"}';
--     select count(*) from public.chat_interactions;
--   rollback;
--
--   begin;
--     set local role authenticated;
--     set local request.jwt.claims to '{"sub":"00000000-0000-0000-0000-000000000001","role":"authenticated"}';
--     select count(*) from public.chat_interactions;
--   rollback;
-- -------------------------------------------------------------
