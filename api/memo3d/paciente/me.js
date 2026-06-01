/**
 * Memo3D — dados da paciente logada + exames visíveis + mídias.
 *
 * GET /api/memo3d/paciente/me
 *
 * Regra de visibilidade (modelo de cobrança por exame — migration 009):
 *  - Só exames liberados individualmente são visíveis: paid = true e
 *    expires_at > now. Cada exame precisa ser liberado pela recepção (R$30
 *    ou cortesia) pra aparecer pra paciente.
 *
 * Filtragem feita no server pra não confiar no client.
 */
import { requirePatient } from '../_lib/auth-patient.js';
import { getAdminClient } from '../_lib/supabase-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { patient } = await requirePatient(req);
    const client = getAdminClient();

    const now = new Date();

    // Visibilidade por exame: só os liberados (pagos/cortesia) e não expirados.
    const { data: exams, error } = await client
      .from('memo_exams')
      .select(
        `
        id, exam_date, exam_type, device, notes,
        paid, paid_at, paid_amount_cents, expires_at,
        memo_media (
          id, kind, filename, size_bytes, duration_seconds,
          width, height, mime_type,
          r2_key, thumbnail_r2_key, stream_video_id,
          position, uploaded_at,
          source_media_id, ai_metadata
        )
      `
      )
      .eq('patient_id', patient.id)
      .eq('paid', true)
      .gt('expires_at', now.toISOString())
      .order('exam_date', { ascending: false });
    if (error) throw error;

    // Ordena mídias por position
    const examsOut = (exams || []).map(e => ({
      ...e,
      memo_media: (e.memo_media || []).sort((a, b) => (a.position || 0) - (b.position || 0)),
    }));

    return res.status(200).json({
      patient: {
        id: patient.id,
        full_name: patient.full_name,
        phone: patient.phone,
        email: patient.email,
        status: patient.status,
        must_change_password: patient.must_change_password,
        consent_lgpd_at: patient.consent_lgpd_at,
        consent_lgpd_version: patient.consent_lgpd_version,
        ai_credits: patient.ai_credits || 0,
      },
      exams: examsOut,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient me]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
