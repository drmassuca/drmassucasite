-- =============================================
-- MEMO3D — Migration 002: coluna stream_video_id
-- =============================================
-- Adiciona referência ao Cloudflare Stream em memo_media.
-- Aplicar via SQL Editor do Supabase no projeto do drmassucasite.
-- Idempotente: usa IF NOT EXISTS.
-- =============================================

ALTER TABLE memo_media
  ADD COLUMN IF NOT EXISTS stream_video_id VARCHAR(64);

COMMENT ON COLUMN memo_media.stream_video_id IS
  'UID do vídeo no Cloudflare Stream (preenchido apenas quando kind = ''video'')';

CREATE INDEX IF NOT EXISTS idx_memo_media_stream_video
  ON memo_media(stream_video_id)
  WHERE stream_video_id IS NOT NULL;
