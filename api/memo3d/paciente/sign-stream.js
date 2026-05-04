/**
 * Memo3D — paciente solicita signed token para reprodução de vídeo no Stream.
 *
 * POST /api/memo3d/paciente/sign-stream
 * Body: { mediaId }
 *
 * Validações iguais a sign-r2 (mídia pertence à paciente, exame pago,
 * não expirado, consentimento aceito). Retorna token Cloudflare Stream
 * que vira path segment na URL do iframe.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { signPlaybackToken } from '../_lib/stream-server.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const TOKEN_TTL_SECONDS = 1800;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { user, patient } = await requirePatient(req);
    if (!patient.consent_lgpd_at) {
      return res
        .status(403)
        .json({ error: 'Aceite o termo de consentimento antes de visualizar mídias' });
    }

    const { mediaId } = req.body || {};
    if (!mediaId || !UUID_RE.test(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_media')
      .select(
        `
        id, kind, stream_video_id,
        memo_exams!inner ( id, patient_id, paid, expires_at )
      `
      )
      .eq('id', mediaId)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Mídia não encontrada' });
    const exam = data.memo_exams;
    if (exam.patient_id !== patient.id)
      return res.status(403).json({ error: 'Mídia não pertence a esta paciente' });
    if (!exam.paid) return res.status(403).json({ error: 'Exame não pago' });
    if (exam.expires_at && new Date(exam.expires_at) < new Date()) {
      return res.status(403).json({ error: 'Acesso expirado' });
    }
    if (data.kind !== 'video') return res.status(400).json({ error: 'Não é vídeo' });
    if (!data.stream_video_id) return res.status(404).json({ error: 'stream_video_id ausente' });

    const token = await signPlaybackToken({
      uid: data.stream_video_id,
      expiresInSeconds: TOKEN_TTL_SECONDS,
      downloadable: false,
    });

    // audit opcional: thumbnails passam audit=false; play real deixa true.
    const shouldAudit = req.body?.audit !== false;
    if (shouldAudit) {
      await recordAuditServer({
        patientId: patient.id,
        userId: user.id,
        action: 'patient.video.play',
        resourceType: 'media',
        resourceId: mediaId,
        ip: getClientIp(req),
        userAgent: req.headers['user-agent'] || null,
      });
    }

    return res.status(200).json({
      token,
      uid: data.stream_video_id,
      customerSubdomain: process.env.CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN,
      expiresIn: TOKEN_TTL_SECONDS,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d sign-stream]', err);
    return res.status(500).json({ error: 'Erro ao gerar token de vídeo' });
  }
}
