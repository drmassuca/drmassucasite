/**
 * Memo3D — registra mídia no memo_media após upload.
 *
 * POST /api/memo3d/midias/register
 * Body:
 *   { mediaId, examId, kind, filename, sizeBytes, mimeType,
 *     durationSeconds?, width?, height?,
 *     r2Key? (foto/book), streamVideoId? (vídeo),
 *     thumbnailR2Key?, position? }
 *
 * Cliente chama isso APÓS o upload pro R2/Stream ter concluído com sucesso.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VALID_KINDS = ['video', 'photo', 'book_page'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const {
      mediaId,
      examId,
      kind,
      filename,
      sizeBytes,
      mimeType,
      durationSeconds,
      width,
      height,
      r2Key,
      thumbnailR2Key,
      streamVideoId,
      position,
    } = req.body || {};

    if (!mediaId || !UUID_RE.test(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }
    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'examId inválido' });
    }
    if (!kind || !VALID_KINDS.includes(kind)) {
      return res.status(400).json({ error: `kind inválido. Aceitos: ${VALID_KINDS.join(', ')}` });
    }
    if (kind === 'video' && !streamVideoId) {
      return res.status(400).json({ error: 'streamVideoId obrigatório para vídeo' });
    }
    if ((kind === 'photo' || kind === 'book_page') && !r2Key) {
      return res.status(400).json({ error: 'r2Key obrigatório para foto/book_page' });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_media')
      .insert({
        id: mediaId,
        exam_id: examId,
        kind,
        filename: filename || null,
        size_bytes: sizeBytes || null,
        mime_type: mimeType || null,
        duration_seconds: durationSeconds || null,
        width: width || null,
        height: height || null,
        r2_key: r2Key || null,
        thumbnail_r2_key: thumbnailR2Key || null,
        stream_video_id: streamVideoId || null,
        position: position || 0,
        uploaded_by: user.id,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23503') {
        return res.status(404).json({ error: 'Exame não encontrado' });
      }
      throw error;
    }

    await recordAuditServer({
      userId: user.id,
      action: 'media.register',
      resourceType: 'media',
      resourceId: data.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { kind, exam_id: examId, filename: data.filename },
    });

    return res.status(201).json({ media: data });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d media register]', err);
    return res.status(500).json({ error: 'Erro ao registrar mídia' });
  }
}
