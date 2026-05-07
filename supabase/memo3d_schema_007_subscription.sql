-- Memo3D — Migração 007: assinatura por paciente (1 ano)
--
-- Modelo novo de cobrança: paciente paga R$50 uma vez na primeira aquisição
-- e ganha 1 ano de hospedagem cobrindo TODOS os exames feitos no período,
-- além dos 100 créditos de IA (já implementados na migration 006).
--
-- Adiciona em memo_patients:
--   - subscription_paid_at: data de início da assinatura. Determina o fim
--     automaticamente (subscription_paid_at + 1 ano).
--   - subscription_amount_cents: valor pago pela assinatura (R$50 default).
--
-- Seed retroativo: pra cada paciente que já tinha algum exame pago, popula
-- subscription_paid_at = MIN(paid_at). Idempotente.

ALTER TABLE memo_patients
  ADD COLUMN IF NOT EXISTS subscription_paid_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS subscription_amount_cents INTEGER;

COMMENT ON COLUMN memo_patients.subscription_paid_at IS
  'Data de início da assinatura anual. Paciente tem acesso a todos os exames durante (subscription_paid_at, subscription_paid_at + 1 ano).';
COMMENT ON COLUMN memo_patients.subscription_amount_cents IS
  'Valor pago pela assinatura, em centavos. Default novo: 5000 (R$50).';

-- Seed retroativo idempotente
UPDATE memo_patients p
SET
  subscription_paid_at = sub.first_paid_at,
  subscription_amount_cents = COALESCE(p.subscription_amount_cents, sub.first_amount_cents, 5000)
FROM (
  SELECT
    patient_id,
    MIN(paid_at) AS first_paid_at,
    (SELECT paid_amount_cents FROM memo_exams e2
     WHERE e2.patient_id = e.patient_id AND e2.paid = TRUE AND e2.paid_at IS NOT NULL
     ORDER BY paid_at ASC LIMIT 1) AS first_amount_cents
  FROM memo_exams e
  WHERE paid = TRUE AND paid_at IS NOT NULL
  GROUP BY patient_id
) sub
WHERE p.id = sub.patient_id
  AND p.subscription_paid_at IS NULL
  AND p.status != 'deleted';
