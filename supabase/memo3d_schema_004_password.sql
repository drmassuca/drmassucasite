-- =============================================
-- MEMO3D — Migration 004: senha temporária + force change on first login
-- =============================================
-- Suporta o fluxo da Fase 2.3: a recepção gera senha aleatória pra
-- paciente, anota, entrega presencialmente. No primeiro login da
-- paciente (Fase 3), o sistema força troca de senha antes de qualquer
-- outra ação.
-- =============================================

ALTER TABLE memo_patients
  ADD COLUMN IF NOT EXISTS must_change_password BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE memo_patients
  ADD COLUMN IF NOT EXISTS password_set_at TIMESTAMPTZ;

COMMENT ON COLUMN memo_patients.must_change_password IS
  'Quando TRUE, força a paciente trocar a senha no próximo login (cenário pós-geração de senha temporária pela recepção).';

COMMENT ON COLUMN memo_patients.password_set_at IS
  'Última vez que a senha foi definida (gerada ou trocada). Útil pra auditoria.';
