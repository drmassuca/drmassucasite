/**
 * Memo3D — helper de autenticação da PACIENTE.
 *
 * Diferente de requireAdmin: aqui exigimos role='patient' explicitamente
 * (ou role implícito pelo registro em memo_patients.auth_user_id).
 *
 * Retorna { user, patient } — onde patient é a row de memo_patients.
 */
import { getAdminClient } from './supabase-admin.js';

export async function requirePatient(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throwHttp(401, 'Authorization header ausente');
  }
  const token = auth.slice('Bearer '.length).trim();
  if (!token) throwHttp(401, 'Token vazio');

  const client = getAdminClient();
  const { data, error } = await client.auth.getUser(token);
  if (error || !data?.user) throwHttp(401, 'Token inválido ou expirado');

  const user = data.user;

  // Carrega registro de memo_patients vinculado a esse auth user
  const { data: patient, error: pErr } = await client
    .from('memo_patients')
    .select('*')
    .eq('auth_user_id', user.id)
    .maybeSingle();

  if (pErr) throw pErr;
  if (!patient) throwHttp(403, 'Usuário sem registro de paciente vinculado');
  if (patient.status === 'deleted') throwHttp(403, 'Conta excluída');

  // Sanity: role no metadata deve bater (mas não bloqueia se ausente — fonte da verdade é memo_patients.auth_user_id)
  const role = user.user_metadata?.role;
  if (role && role !== 'patient') {
    throwHttp(403, `Role inesperada: ${role}`);
  }

  return { user, patient };
}

export function getClientIp(req) {
  const xff = req.headers['x-forwarded-for'];
  if (xff) return xff.split(',')[0].trim();
  return req.headers['x-real-ip'] || req.socket?.remoteAddress || null;
}

function throwHttp(statusCode, message) {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
}
