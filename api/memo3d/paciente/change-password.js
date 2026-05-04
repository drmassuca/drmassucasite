/**
 * Memo3D — paciente troca a própria senha.
 *
 * POST /api/memo3d/paciente/change-password
 * Body: { newPassword }
 *
 * Atualiza senha via Supabase Auth admin (service role) e marca
 * must_change_password = false em memo_patients.
 *
 * Política mínima da senha: 8 chars, ao menos uma letra e um número.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const PASSWORD_MIN_LENGTH = 8;

function validatePassword(pwd) {
  if (typeof pwd !== 'string') return 'Senha inválida';
  if (pwd.length < PASSWORD_MIN_LENGTH)
    return `Senha deve ter ao menos ${PASSWORD_MIN_LENGTH} caracteres`;
  if (!/[A-Za-z]/.test(pwd)) return 'Senha deve conter ao menos uma letra';
  if (!/[0-9]/.test(pwd)) return 'Senha deve conter ao menos um número';
  return null;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { user, patient } = await requirePatient(req);
    const { newPassword } = req.body || {};

    const validationError = validatePassword(newPassword);
    if (validationError) return res.status(400).json({ error: validationError });

    const client = getAdminClient();

    const { error: pErr } = await client.auth.admin.updateUserById(user.id, {
      password: newPassword,
    });
    if (pErr) throw pErr;

    await client
      .from('memo_patients')
      .update({
        must_change_password: false,
        password_set_at: new Date().toISOString(),
      })
      .eq('id', patient.id);

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.password.changed',
      resourceType: 'patient',
      resourceId: patient.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient change-password]', err);
    return res.status(500).json({ error: 'Erro ao trocar senha' });
  }
}
