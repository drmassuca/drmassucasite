/**
 * Memo3D — criar paciente.
 *
 * POST /api/memo3d/pacientes/create
 * Body: { fullName, phone, cpfLast4, email? }
 *
 * Validação server-side. Auditoria registrada após sucesso.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { applyCredit, INITIAL_GRANT } from '../_lib/credits.js';

const PHONE_E164 = /^\+\d{10,15}$/;
const CPF_LAST4 = /^\d{4}$/;
const NAME_MIN = 3;
const NAME_MAX = 255;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { fullName, phone, cpfLast4, email } = req.body || {};

    // Validação
    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < NAME_MIN) {
      return res.status(400).json({ error: `Nome obrigatório (mín ${NAME_MIN} caracteres)` });
    }
    if (fullName.trim().length > NAME_MAX) {
      return res.status(400).json({ error: `Nome muito longo (máx ${NAME_MAX} caracteres)` });
    }
    if (!phone || !PHONE_E164.test(phone)) {
      return res.status(400).json({
        error: 'Telefone deve estar em formato E.164 (ex: +5562999998888)',
      });
    }
    if (!cpfLast4 || !CPF_LAST4.test(cpfLast4)) {
      return res.status(400).json({ error: 'cpfLast4 deve ter exatamente 4 dígitos' });
    }
    if (email && (typeof email !== 'string' || !email.includes('@'))) {
      return res.status(400).json({ error: 'Email inválido' });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_patients')
      .insert({
        full_name: fullName.trim(),
        phone,
        cpf_last4: cpfLast4,
        email: email?.trim() || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      // 23505 = unique violation (telefone duplicado)
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Já existe paciente com este telefone' });
      }
      throw error;
    }

    await recordAuditServer({
      patientId: data.id,
      userId: user.id,
      action: 'patient.create',
      resourceType: 'patient',
      resourceId: data.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { full_name: data.full_name, phone: data.phone },
    });

    // Grant inicial de créditos de IA (na aquisição). Falha não bloqueia
    // criação da paciente — só loga.
    try {
      const { balance } = await applyCredit({
        patientId: data.id,
        delta: INITIAL_GRANT,
        reason: 'initial_grant',
        metadata: { granted_by: user.id, granted_at: new Date().toISOString() },
      });
      data.ai_credits = balance;
    } catch (creditErr) {
      console.error('[memo3d patient create] grant inicial falhou', creditErr);
    }

    return res.status(201).json({ patient: data });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient create]', err);
    return res.status(500).json({ error: 'Erro interno ao criar paciente' });
  }
}
