-- Memo3D — Migração 005: suporte a fotos melhoradas com IA
--
-- Adiciona em memo_media:
--  - source_media_id: link pra mídia original (foto do ultrassom). Se NULL,
--    é mídia original; se preenchido, é versão IA da source.
--  - ai_metadata: JSONB com { preset, skinTone, model, costUsd, promptUsed,
--    generatedAt, ms } pra debug e auditoria.
--
-- ON DELETE CASCADE: se a foto original for apagada (ex.: hard delete por
-- expiração), as versões IA derivadas também somem.

ALTER TABLE memo_media
  ADD COLUMN IF NOT EXISTS source_media_id UUID
    REFERENCES memo_media(id) ON DELETE CASCADE,
  ADD COLUMN IF NOT EXISTS ai_metadata JSONB;

CREATE INDEX IF NOT EXISTS idx_memo_media_source_media_id
  ON memo_media(source_media_id)
  WHERE source_media_id IS NOT NULL;

COMMENT ON COLUMN memo_media.source_media_id IS
  'Quando preenchido, esta mídia é uma versão melhorada por IA da mídia apontada. NULL = mídia original.';
COMMENT ON COLUMN memo_media.ai_metadata IS
  'Metadados da geração por IA: preset, skinTone, model, costUsd, promptUsed, ms.';
