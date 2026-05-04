/**
 * Memo3D — helper de autenticação para Vercel Functions.
 *
 * O frontend admin chama os endpoints com o JWT do Supabase no header
 * Authorization: Bearer <token>. Aqui validamos o token e retornamos
 * o user — ou throw 401.
 */
import { getAdminClient } from './supabase-admin.js';

/**
 * Garante que a request veio de um usuário autenticado.
 * Para Fase 2.1: aceita qualquer authenticated user como admin.
 * Quando a auth da paciente entrar (Fase 3), vamos diferenciar
 * via metadata `role: 'patient'` ou via lookup em `memo_patients.auth_user_id`.
 */
export async function requireAdmin(req) {
  const auth = req.headers.authorization || req.headers.Authorization;
  if (!auth || !auth.startsWith('Bearer ')) {
    throwHttp(401, 'Authorization header ausente ou malformado');
  }
  const token = auth.slice('Bearer '.length).trim();
  if (!token) throwHttp(401, 'Token vazio');

  const client = getAdminClient();
  const { data, error } = await client.auth.getUser(token);
  if (error || !data?.user) {
    throwHttp(401, 'Token inválido ou expirado');
  }
  return data.user;
}

/** Extrai IP da request, considerando headers de proxy do Vercel. */
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
