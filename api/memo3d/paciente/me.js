/**
 * Memo3D — dados da paciente logada + exames visíveis + mídias.
 *
 * GET /api/memo3d/paciente/me
 *
 * Regra de visibilidade (modelo de assinatura anual):
 *  - Se a paciente tem subscription_paid_at e subscription_paid_at + 1 ano > now,
 *    todos os exames dela são visíveis (independente de paid individual).
 *  - Caso contrário, fallback retrocompatível: só exames com paid = true e
 *    expires_at > now (regra antiga de cobrança por exame).
 *
 * Filtragem feita no server pra não confiar no client.
 */
import { requirePatient } from '../_lib/auth-patient.js';
import { getAdminClient } from '../_lib/supabase-admin.js';

const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { patient } = await requirePatient(req);
    const client = getAdminClient();

    const now = new Date();
    const subStart = patient.subscription_paid_at ? new Date(patient.subscription_paid_at) : null;
    const subExpiresAt = subStart ? new Date(subStart.getTime() + ONE_YEAR_MS) : null;
    const subActive = !!subExpiresAt && subExpiresAt > now;

    // Fetch sem filtro paid se subscription ativa; com filtro se não
    let query = client
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
      .order('exam_date', { ascending: false });

    if (!subActive) {
      // Compatibilidade com modelo antigo: só exames pagos individualmente
      query = query.eq('paid', true).gt('expires_at', now.toISOString());
    }

    const { data: exams, error } = await query;
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
        subscription_paid_at: patient.subscription_paid_at || null,
        subscription_expires_at: subExpiresAt ? subExpiresAt.toISOString() : null,
        subscription_active: subActive,
      },
      exams: examsOut,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient me]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
