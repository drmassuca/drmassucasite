-- Memo3D — Migração 008: compras de créditos via PIX (Mercado Pago)
--
-- Modelo:
--   Paciente compra um "pack" de créditos via Mercado Pago (preferencialmente PIX).
--   Cada compra gera uma row em memo_pix_purchases com status='pending'.
--   O webhook do MP (api/memo3d/webhooks/mercadopago) confirma e dispara
--   applyCredit() — que credita em memo_patients.ai_credits e registra no ledger.
--
-- Catálogo (hardcoded em api/memo3d/_lib/credit-packs.js):
--   lembranca: 200 créditos / 5 fotos / R$ 9,90
--   album:     500 créditos / 12 fotos / R$ 19,90
--   memoria:   1200 créditos / 30 fotos / R$ 39,90
--
-- external_reference no formato: "pix_{patientId}_{packId}_{ts}"
-- mp_payment_id (do webhook) é unique para garantir idempotência.

CREATE TABLE IF NOT EXISTS memo_pix_purchases (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id UUID NOT NULL REFERENCES memo_patients(id) ON DELETE CASCADE,
  pack_id TEXT NOT NULL,                              -- 'lembranca' | 'album' | 'memoria'
  credits INTEGER NOT NULL,                           -- créditos do pack no momento da compra
  amount_brl NUMERIC(10,2) NOT NULL,                  -- preço pago em BRL
  status TEXT NOT NULL DEFAULT 'pending'              -- pending|approved|rejected|refunded|cancelled
    CHECK (status IN ('pending','approved','rejected','refunded','cancelled')),
  external_reference TEXT NOT NULL UNIQUE,            -- chave da nossa intent (pix_{patientId}_{packId}_{ts})
  mp_preference_id TEXT,                              -- id da Preference no MP
  mp_payment_id TEXT,                                 -- id do Payment quando aprovado
  ledger_id UUID REFERENCES memo_credit_ledger(id),   -- linha do crédito gerado em approved
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  confirmed_at TIMESTAMPTZ,
  refunded_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_memo_pix_purchases_patient
  ON memo_pix_purchases(patient_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_memo_pix_purchases_status
  ON memo_pix_purchases(status);

-- Idempotência forte: mesmo mp_payment_id nunca processa duas vezes
CREATE UNIQUE INDEX IF NOT EXISTS idx_memo_pix_purchases_payment
  ON memo_pix_purchases(mp_payment_id) WHERE mp_payment_id IS NOT NULL;

COMMENT ON TABLE memo_pix_purchases IS
  'Compras de pacotes de créditos via Mercado Pago. Webhook ativa status=approved e gera entry em memo_credit_ledger.';
COMMENT ON COLUMN memo_pix_purchases.external_reference IS
  'Identifier nosso enviado ao MP. Formato: pix_{patientId}_{packId}_{timestamp}.';
COMMENT ON COLUMN memo_pix_purchases.ledger_id IS
  'Aponta pra linha em memo_credit_ledger criada quando o pagamento foi aprovado.';
