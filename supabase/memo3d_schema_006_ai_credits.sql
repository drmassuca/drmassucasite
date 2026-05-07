-- Memo3D — Migração 006: créditos de IA
--
-- Adiciona em memo_patients:
--   - ai_credits: saldo atual de créditos
--
-- Cria memo_credit_ledger: histórico de transações (grant/consume/refund).
-- Toda mudança em ai_credits deve gerar uma entry no ledger pra auditoria.
--
-- Seed retroativo: dá 100 créditos uma vez pra todas as pacientes não-deleted
-- já cadastradas. A entry no ledger usa reason='initial_grant_retroactive' e
-- a re-execução do script é idempotente (só insere se ainda não foi feito).

ALTER TABLE memo_patients
  ADD COLUMN IF NOT EXISTS ai_credits INTEGER NOT NULL DEFAULT 0;

CREATE TABLE IF NOT EXISTS memo_credit_ledger (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES memo_patients(id) ON DELETE CASCADE,
  delta INTEGER NOT NULL,                    -- + ganho, - consumo
  reason TEXT NOT NULL,                       -- ex: initial_grant, photo_enhance
  balance_after INTEGER NOT NULL,             -- saldo após a operação (audit)
  metadata JSONB,                             -- ex: { mediaId, preset, costUsd }
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_memo_credit_ledger_patient
  ON memo_credit_ledger(patient_id, created_at DESC);

COMMENT ON COLUMN memo_patients.ai_credits IS
  'Saldo atual de créditos de IA da paciente. Sincronizado com memo_credit_ledger.';
COMMENT ON TABLE memo_credit_ledger IS
  'Histórico imutável de transações de créditos de IA. Toda mudança em ai_credits deve gerar entry aqui.';

-- Seed retroativo idempotente — uma execução só
DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM memo_credit_ledger WHERE reason = 'initial_grant_retroactive') THEN
    INSERT INTO memo_credit_ledger (patient_id, delta, reason, balance_after, metadata)
    SELECT
      id,
      100,
      'initial_grant_retroactive',
      ai_credits + 100,
      jsonb_build_object(
        'reason_detail', 'one-time retroactive grant for existing patients',
        'granted_at', now()
      )
    FROM memo_patients
    WHERE status != 'deleted';

    UPDATE memo_patients
    SET ai_credits = ai_credits + 100
    WHERE status != 'deleted';
  END IF;
END $$;
