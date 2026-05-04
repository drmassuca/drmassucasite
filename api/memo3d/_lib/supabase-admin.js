/**
 * Memo3D — cliente Supabase com SERVICE ROLE (bypassa RLS).
 *
 * SERVER-ONLY. Usa SUPABASE_SERVICE_ROLE_KEY do .env (NÃO o ANON KEY público).
 *
 * Service role tem permissão total no banco — usar apenas em handlers
 * de Vercel Functions, nunca expor no bundle do client.
 */
import { createClient } from '@supabase/supabase-js';

let _client = null;

export function getAdminClient() {
  if (_client) return _client;
  const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) {
    throw new Error(
      'Supabase admin env vars ausentes. Verificar SUPABASE_URL/VITE_SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env e Vercel.'
    );
  }
  _client = createClient(url, serviceKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
  return _client;
}

/**
 * Registra um evento no memo_audit_log. Chamado pelos endpoints de API.
 */
export async function recordAuditServer({
  patientId,
  userId,
  action,
  resourceType,
  resourceId,
  ip,
  userAgent,
  metadata,
}) {
  if (!action) throw new Error('recordAuditServer: action obrigatório');
  const client = getAdminClient();
  const { error } = await client.from('memo_audit_log').insert({
    patient_id: patientId ?? null,
    user_id: userId ?? null,
    action,
    resource_type: resourceType ?? null,
    resource_id: resourceId ?? null,
    ip: ip ?? null,
    user_agent: userAgent ?? null,
    metadata: metadata ?? {},
  });
  if (error) {
    console.error('[memo3d audit insert error]', error);
    throw error;
  }
}
