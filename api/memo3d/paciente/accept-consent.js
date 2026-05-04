/**
 * Memo3D — paciente aceita o termo de consentimento LGPD.
 *
 * POST /api/memo3d/paciente/accept-consent
 * Body: { version }
 *
 * Registra: consent_lgpd_at = NOW, consent_lgpd_ip = req IP, consent_lgpd_version.
 * Auditoria também registra o evento. Sem aceite, paciente não vê mídias.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { user, patient } = await requirePatient(req);
    const { version } = req.body || {};
    if (!version || typeof version !== 'string') {
      return res.status(400).json({ error: 'version obrigatória' });
    }

    const ip = getClientIp(req);
    const now = new Date().toISOString();

    const client = getAdminClient();
    await client
      .from('memo_patients')
      .update({
        consent_lgpd_at: now,
        consent_lgpd_ip: ip,
        consent_lgpd_version: version,
      })
      .eq('id', patient.id);

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.consent.accept',
      resourceType: 'patient',
      resourceId: patient.id,
      ip,
      userAgent: req.headers['user-agent'] || null,
      metadata: { version },
    });

    return res.status(200).json({ ok: true, consent_lgpd_at: now, version });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d accept-consent]', err);
    return res.status(500).json({ error: 'Erro ao registrar consentimento' });
  }
}
