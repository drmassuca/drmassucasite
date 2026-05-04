/**
 * Memo3D — wrapper client para auditoria.
 *
 * Faz POST para /api/memo3d/audit, que valida e grava em memo_audit_log
 * via Supabase service role (bypassa RLS, registra IP/user agent).
 *
 * Falha silenciosa: auditoria nunca pode quebrar UX.
 */

const ENDPOINT = '/api/memo3d/audit';

/**
 * @param {object} payload
 * @param {string} payload.action       ex: 'login', 'view_video', 'download_photo', 'share_create'
 * @param {string} [payload.resourceType]  ex: 'patient', 'exam', 'media', 'share'
 * @param {string} [payload.resourceId]    UUID do recurso
 * @param {object} [payload.metadata]      JSON livre
 */
export async function recordAudit({ action, resourceType, resourceId, metadata } = {}) {
  if (!action) return;
  try {
    await fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ action, resourceType, resourceId, metadata }),
      // keepalive permite registrar mesmo durante navegação/saída de página
      keepalive: true,
    });
  } catch (err) {
    if (typeof console !== 'undefined') {
      console.warn('[memo3d audit] falha ao registrar', err);
    }
  }
}
