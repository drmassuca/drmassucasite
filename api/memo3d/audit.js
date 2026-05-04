/**
 * Memo3D — endpoint de auditoria.
 *
 * POST /api/memo3d/audit
 * Body: { action, resourceType?, resourceId?, metadata? }
 *
 * Usado pelo client wrapper src/lib/memo3d/audit.js para registrar
 * eventos sensíveis. Service role bypassa RLS pra inserir em memo_audit_log.
 */
import { requireAdmin, getClientIp } from './_lib/auth.js';
import { recordAuditServer } from './_lib/supabase-admin.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { action, resourceType, resourceId, metadata } = req.body || {};
    if (!action || typeof action !== 'string') {
      return res.status(400).json({ error: 'action é obrigatório' });
    }
    await recordAuditServer({
      userId: user.id,
      action,
      resourceType: resourceType || null,
      resourceId: resourceId || null,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: metadata || {},
    });
    return res.status(200).json({ ok: true });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d audit endpoint]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
