/**
 * Memo3D — editar paciente.
 *
 * PATCH /api/memo3d/pacientes/update
 * Body: { id, fullName?, phone?, cpfLast4?, email? }
 *
 * Apenas campos enviados são alterados. Validação igual ao create.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PHONE_E164 = /^\+\d{10,15}$/;
const CPF_LAST4 = /^\d{4}$/;

export default async function handler(req, res) {
  if (req.method !== 'PATCH' && req.method !== 'POST') {
    res.setHeader('Allow', 'PATCH, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { id, fullName, phone, cpfLast4, email } = req.body || {};

    if (!id || !UUID_RE.test(id)) {
      return res.status(400).json({ error: 'id inválido' });
    }

    const updates = {};
    if (fullName !== undefined) {
      if (typeof fullName !== 'string' || fullName.trim().length < 3) {
        return res.status(400).json({ error: 'fullName mínimo 3 caracteres' });
      }
      updates.full_name = fullName.trim();
    }
    if (phone !== undefined) {
      if (!PHONE_E164.test(phone)) {
        return res.status(400).json({ error: 'phone deve estar em E.164 (ex: +5562999998888)' });
      }
      updates.phone = phone;
    }
    if (cpfLast4 !== undefined) {
      if (!CPF_LAST4.test(cpfLast4)) {
        return res.status(400).json({ error: 'cpfLast4 deve ter 4 dígitos' });
      }
      updates.cpf_last4 = cpfLast4;
    }
    if (email !== undefined) {
      const e = (email || '').trim();
      if (e && !e.includes('@')) {
        return res.status(400).json({ error: 'email inválido' });
      }
      updates.email = e || null;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'Nenhum campo para atualizar' });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_patients')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      if (error.code === '23505') {
        return res.status(409).json({ error: 'Telefone já em uso por outra paciente' });
      }
      throw error;
    }

    await recordAuditServer({
      patientId: id,
      userId: user.id,
      action: 'patient.update',
      resourceType: 'patient',
      resourceId: id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { fields: Object.keys(updates) },
    });

    return res.status(200).json({ patient: data });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient update]', err);
    return res.status(500).json({ error: 'Erro ao atualizar paciente' });
  }
}
