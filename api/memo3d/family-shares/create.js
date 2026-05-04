/**
 * Memo3D — paciente cria link de compartilhamento com família.
 *
 * POST /api/memo3d/family-shares/create
 * Body: { examId }
 *
 * Cria registro em memo_family_shares com token aleatório (hash SHA-256
 * armazenado), expira em 24h. Retorna URL pública.
 *
 * Segurança: token cru NUNCA é armazenado no banco — só o hash. Se DB vazar,
 * tokens válidos não vão pra mãos do atacante.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { generateToken, hashToken } from '../../../src/lib/memo3d/tokens.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const SHARE_TTL_HOURS = 24;

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
        .json({ error: 'Aceite o termo de consentimento antes de compartilhar' });
    }

    const { examId } = req.body || {};
    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'examId inválido' });
    }

    const client = getAdminClient();
    const { data: exam, error: eErr } = await client
      .from('memo_exams')
      .select('id, patient_id, paid, expires_at')
      .eq('id', examId)
      .maybeSingle();
    if (eErr) throw eErr;
    if (!exam) return res.status(404).json({ error: 'Exame não encontrado' });
    if (exam.patient_id !== patient.id)
      return res.status(403).json({ error: 'Exame não é desta paciente' });
    if (!exam.paid) return res.status(403).json({ error: 'Exame não pago' });
    if (exam.expires_at && new Date(exam.expires_at) < new Date()) {
      return res.status(403).json({ error: 'Acesso expirado' });
    }

    const token = generateToken();
    const tokenHash = await hashToken(token);
    const expiresAt = new Date(Date.now() + SHARE_TTL_HOURS * 60 * 60 * 1000).toISOString();

    const { data: share, error: sErr } = await client
      .from('memo_family_shares')
      .insert({
        exam_id: exam.id,
        shared_by_patient_id: patient.id,
        token_hash: tokenHash,
        expires_at: expiresAt,
      })
      .select()
      .single();
    if (sErr) throw sErr;

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.share.create',
      resourceType: 'share',
      resourceId: share.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { exam_id: exam.id, expires_at: expiresAt },
    });

    return res.status(201).json({
      shareId: share.id,
      token,
      expiresAt,
      ttlHours: SHARE_TTL_HOURS,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d family-share create]', err);
    return res.status(500).json({ error: 'Erro ao criar compartilhamento' });
  }
}
