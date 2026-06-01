-- Memo3D — Migração 009: cobrança por exame (R$30) + cortesia
--
-- Modelo novo (substitui a assinatura anual da migration 007):
--   - Cada exame é cobrado individualmente: R$30 (3000 centavos).
--   - Cada exame precisa ser liberado (paid=true) pra paciente ver aquele exame.
--   - Toda liberação concede +100 créditos de IA, acumulando.
--   - Cortesia: liberação gratuita (paid=true, paid_amount_cents=0, courtesy=true).
--     Libera o exame e concede créditos igual, mas fica FORA da "Receita do mês".
--
-- A coluna subscription_paid_at (migration 007) deixa de ser usada como
-- "libera tudo no ano" — mantida no schema só por compatibilidade/histórico.
--
-- Idempotente.

ALTER TABLE memo_exams
  ADD COLUMN IF NOT EXISTS courtesy BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN memo_exams.courtesy IS
  'Exame liberado como cortesia (gratuito). paid=true e paid_amount_cents=0, mas fora da receita. Concede créditos de IA normalmente.';
