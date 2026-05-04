/**
 * Memo3D — registra evento de login da paciente.
 *
 * POST /api/memo3d/paciente/login-event
 *
 * Chamado pelo client logo após signInWithPassword bem-sucedido.
 * Como o login da paciente vai direto pro Supabase Auth (sem passar
 * por endpoint nosso), precisamos desse hook explícito pra alimentar
 * o contador de acessos visível pro admin no detalhe da paciente.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { recordAuditServer } from '../_lib/supabase-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { user, patient } = await requirePatient(req);
    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.login',
      resourceType: 'patient',
      resourceId: patient.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient login-event]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
