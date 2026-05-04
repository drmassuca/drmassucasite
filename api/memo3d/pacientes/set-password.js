/**
 * Memo3D — gerar senha temporária para a paciente.
 *
 * POST /api/memo3d/pacientes/set-password
 * Body: { patientId }
 *
 * Fluxo:
 *  1. Verifica que paciente existe.
 *  2. Cria (ou atualiza) auth.users com email derivado do telefone:
 *     '+5562999998888' → '5562999998888@memo3d.local'
 *     user_metadata: { role: 'patient', patient_id: <uuid> }
 *  3. Define senha aleatória (10 chars sem ambíguos).
 *  4. Vincula auth_user_id em memo_patients.
 *  5. Marca must_change_password = true, password_set_at = now.
 *  6. Retorna senha em texto pra recepção mostrar/anotar/entregar.
 *
 * A senha NÃO é armazenada em texto no banco. Supabase Auth guarda
 * o hash. Se a recepção perder o papel, basta gerar nova senha.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PASSWORD_LENGTH = 10;
// Caracteres legíveis (sem 0, O, 1, I, l ambíguos)
const ALLOWED_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';

function generatePassword() {
  const arr = new Uint8Array(PASSWORD_LENGTH);
  crypto.getRandomValues(arr);
  let pwd = '';
  for (let i = 0; i < PASSWORD_LENGTH; i++) {
    pwd += ALLOWED_CHARS[arr[i] % ALLOWED_CHARS.length];
  }
  return pwd;
}

function emailFromPhone(phone) {
  return phone.replace(/\+/g, '') + '@memo3d.local';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { patientId } = req.body || {};

    if (!patientId || !UUID_RE.test(patientId)) {
      return res.status(400).json({ error: 'patientId inválido' });
    }

    const client = getAdminClient();
    const { data: patient, error: pErr } = await client
      .from('memo_patients')
      .select('id, full_name, phone, auth_user_id, status')
      .eq('id', patientId)
      .maybeSingle();

    if (pErr) throw pErr;
    if (!patient) return res.status(404).json({ error: 'Paciente não encontrada' });
    if (patient.status === 'deleted') {
      return res.status(400).json({ error: 'Paciente excluída — restaure antes de gerar senha' });
    }

    const password = generatePassword();
    const email = emailFromPhone(patient.phone);
    const userMetadata = { role: 'patient', patient_id: patient.id };

    let authUserId = patient.auth_user_id;

    if (authUserId) {
      // já existe auth user vinculado → atualiza senha
      const { error: uErr } = await client.auth.admin.updateUserById(authUserId, {
        password,
        user_metadata: userMetadata,
      });
      if (uErr) throw uErr;
    } else {
      // cria novo auth user
      const { data: created, error: cErr } = await client.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: userMetadata,
      });
      if (cErr) {
        // Se email já existe (raríssimo, mas possível), busca e atualiza
        if (cErr.message?.toLowerCase().includes('already registered')) {
          // Lookup pelo email
          const { data: list } = await client.auth.admin.listUsers();
          const found = list?.users?.find(u => u.email === email);
          if (found) {
            await client.auth.admin.updateUserById(found.id, {
              password,
              user_metadata: userMetadata,
            });
            authUserId = found.id;
          } else {
            throw cErr;
          }
        } else {
          throw cErr;
        }
      } else {
        authUserId = created.user.id;
      }
    }

    // Atualiza memo_patients
    await client
      .from('memo_patients')
      .update({
        auth_user_id: authUserId,
        must_change_password: true,
        password_set_at: new Date().toISOString(),
      })
      .eq('id', patient.id);

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.password.set',
      resourceType: 'patient',
      resourceId: patient.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
    });

    return res.status(200).json({
      password,
      mustChangeOnLogin: true,
      loginEmail: email,
      message:
        'Senha temporária gerada. Anote e entregue à paciente. Ela será obrigada a trocar no primeiro login.',
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d set-password]', err);
    return res.status(500).json({ error: 'Erro ao gerar senha' });
  }
}
