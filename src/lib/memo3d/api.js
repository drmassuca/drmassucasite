/**
 * Memo3D — client fetcher para os endpoints /api/memo3d/*.
 *
 * Adiciona automaticamente o JWT do Supabase no header Authorization,
 * para que o backend possa validar via `requireAdmin`.
 */
import { supabase } from '../supabase';

async function authedFetch(url, opts = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { ...opts, headers });
}

async function asJson(res) {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch (_) {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}

// ─── Pacientes ─────────────────────────────────────────────

/**
 * @param {object} payload
 * @param {string} payload.fullName
 * @param {string} payload.phone     formato E.164 (+5562999998888)
 * @param {string} payload.cpfLast4  4 dígitos
 * @param {string} [payload.email]
 */
export async function createPatient(payload) {
  const res = await authedFetch('/api/memo3d/pacientes/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await asJson(res);
  return data.patient;
}
