-- =============================================
-- MEMO3D — Migration 003: r2_key nullable em memo_media
-- =============================================
-- Vídeos vivem no Cloudflare Stream (não R2), então r2_key fica null.
-- O check de presença é feito no application layer (api/memo3d/midias/register.js):
--   - kind='video'  → exige stream_video_id
--   - kind='photo'  → exige r2_key
--   - kind='book_page' → exige r2_key
-- =============================================

ALTER TABLE memo_media
  ALTER COLUMN r2_key DROP NOT NULL;

-- Constraint de integridade: cada media precisa ter pelo menos uma referência.
ALTER TABLE memo_media
  DROP CONSTRAINT IF EXISTS memo_media_storage_ref;

ALTER TABLE memo_media
  ADD CONSTRAINT memo_media_storage_ref
  CHECK (
    (kind = 'video' AND stream_video_id IS NOT NULL)
    OR (kind IN ('photo', 'book_page') AND r2_key IS NOT NULL)
  );
