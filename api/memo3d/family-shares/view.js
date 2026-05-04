/**
 * Memo3D — visualização pública de family share (sem login).
 *
 * POST /api/memo3d/family-shares/view
 * Body: { token, mediaId? }
 *
 * Sem o mediaId: valida token, retorna metadados do exame (nome paciente,
 * data, lista de mídias com kind/filename). Sem URLs ainda — pra evitar
 * gerar URLs caras pra requests de teste/preview.
 *
 * Com mediaId: gera signed URL R2 (foto) ou Stream token (vídeo) para a
 * mídia específica do exame compartilhado.
 *
 * Sempre incrementa view_count e atualiza last_viewed_at/ip.
 */
import { getAdminClient } from '../_lib/supabase-admin.js';
import { hashToken, isValidTokenFormat } from '../../../src/lib/memo3d/tokens.js';
import { presignGetUrl } from '../_lib/r2-server.js';
import { signPlaybackToken } from '../_lib/stream-server.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'GET') {
    res.setHeader('Allow', 'POST, GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const token = req.method === 'GET' ? req.query.token : req.body?.token;
    const mediaId = req.method === 'GET' ? req.query.mediaId : req.body?.mediaId;

    if (!token || !isValidTokenFormat(token)) {
      return res.status(400).json({ error: 'token inválido' });
    }

    const tokenHash = await hashToken(token);
    const client = getAdminClient();

    const { data: share, error } = await client
      .from('memo_family_shares')
      .select(
        `
        id, exam_id, expires_at, view_count,
        memo_exams!inner (
          id, exam_date, exam_type, device,
          patient_id,
          memo_patients!inner ( full_name ),
          memo_media (
            id, kind, filename, size_bytes, duration_seconds,
            width, height, mime_type,
            r2_key, stream_video_id, position
          )
        )
      `
      )
      .eq('token_hash', tokenHash)
      .maybeSingle();

    if (error) throw error;
    if (!share) return res.status(404).json({ error: 'Link inválido ou expirado' });
    if (new Date(share.expires_at) < new Date()) {
      return res.status(410).json({ error: 'Link expirado' });
    }

    // Atualiza estatísticas (não bloqueia se falhar)
    client
      .from('memo_family_shares')
      .update({
        view_count: (share.view_count || 0) + 1,
        last_viewed_at: new Date().toISOString(),
        last_viewed_ip: getClientIp(req),
      })
      .eq('id', share.id)
      .then(() => {})
      .catch(() => {});

    // Sem mediaId → retorna meta do exame
    if (!mediaId) {
      const exam = share.memo_exams;
      const medias = (exam.memo_media || [])
        .map(m => ({
          id: m.id,
          kind: m.kind,
          filename: m.filename,
          size_bytes: m.size_bytes,
          duration_seconds: m.duration_seconds,
          width: m.width,
          height: m.height,
          mime_type: m.mime_type,
          position: m.position,
        }))
        .sort((a, b) => (a.position || 0) - (b.position || 0));

      return res.status(200).json({
        shareId: share.id,
        expiresAt: share.expires_at,
        exam: {
          id: exam.id,
          exam_date: exam.exam_date,
          exam_type: exam.exam_type,
          device: exam.device,
          patient_name: exam.memo_patients?.full_name,
        },
        medias,
      });
    }

    // Com mediaId → signed URL/token específico
    if (!UUID_RE.test(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }
    const media = (share.memo_exams.memo_media || []).find(m => m.id === mediaId);
    if (!media) return res.status(404).json({ error: 'Mídia não pertence ao share' });

    if (media.kind === 'video') {
      if (!media.stream_video_id) return res.status(404).json({ error: 'stream_video_id ausente' });
      const streamToken = await signPlaybackToken({
        uid: media.stream_video_id,
        expiresInSeconds: 1800,
        downloadable: false,
      });
      return res.status(200).json({
        kind: 'video',
        streamToken,
        uid: media.stream_video_id,
        customerSubdomain: process.env.CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN,
      });
    }

    if (!media.r2_key) return res.status(404).json({ error: 'r2_key ausente' });
    const url = await presignGetUrl({ key: media.r2_key, expiresInSeconds: 1800 });
    return res.status(200).json({ kind: media.kind, url });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d family-share view]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
