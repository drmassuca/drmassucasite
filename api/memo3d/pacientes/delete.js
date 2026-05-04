/**
 * Memo3D — excluir paciente (soft delete).
 *
 * POST /api/memo3d/pacientes/delete
 * Body: { id }
 *
 * Soft delete: marca status='deleted' e desativa acesso, mas mantém
 * dados pra auditoria LGPD. O hard delete final acontece no job que
 * roda contra hard_delete_at (Fase 5).
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { id } = req.body || {};

    if (!id || !UUID_RE.test(id)) {
      return res.status(400).json({ error: 'id inválido' });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_patients')
      .update({ status: 'deleted' })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Paciente não encontrada' });

    await recordAuditServer({
      patientId: id,
      userId: user.id,
      action: 'patient.delete',
      resourceType: 'patient',
      resourceId: id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { full_name: data.full_name, phone: data.phone, soft: true },
    });

    return res.status(200).json({ ok: true, patient: data });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient delete]', err);
    return res.status(500).json({ error: 'Erro ao excluir paciente' });
  }
}
