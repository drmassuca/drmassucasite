/**
 * Memo3D — paciente solicita signed URL para download/visualização de foto no R2.
 *
 * POST /api/memo3d/paciente/sign-r2
 * Body: { mediaId }
 *
 * Server valida que a mídia pertence a um exame da paciente logada,
 * que o exame está pago e não expirado, e que aceitou consentimento.
 * Retorna URL com TTL curto (30min) e registra audit log.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { presignGetUrl } from '../_lib/r2-server.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const URL_TTL_SECONDS = 1800;

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
    // Verifica que mídia pertence a exame válido da paciente
    const { data, error } = await client
      .from('memo_media')
      .select(
        `
        id, kind, r2_key, thumbnail_r2_key,
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
    if (data.kind === 'video') {
      return res.status(400).json({ error: 'Vídeo não está no R2 — use sign-stream' });
    }
    if (!data.r2_key) return res.status(404).json({ error: 'Mídia sem r2_key' });

    const url = await presignGetUrl({ key: data.r2_key, expiresInSeconds: URL_TTL_SECONDS });

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.media.view',
      resourceType: 'media',
      resourceId: mediaId,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { kind: data.kind },
    });

    return res.status(200).json({ url, expiresIn: URL_TTL_SECONDS });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d sign-r2]', err);
    return res.status(500).json({ error: 'Erro ao gerar URL' });
  }
}
