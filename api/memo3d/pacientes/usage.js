/**
 * Memo3D — histórico de uso de uma paciente, visto por admin/recepção.
 *
 * GET /api/memo3d/pacientes/usage?id=<patientId>
 *
 * Mesmos dados do /paciente/usage (logins + family shares), mas com:
 *   - patient_id vindo da query e validação de admin (qualquer authenticated)
 *   - mais histórico (50 logins em vez de 20)
 *   - sem filtro por user_id — admin enxerga toda a atividade da paciente
 */
import { requireAdmin } from '../_lib/auth.js';
import { getAdminClient } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const LOGIN_LIMIT = 50;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);

    const id = req.query.id;
    if (!id || !UUID_RE.test(id)) {
      return res.status(400).json({ error: 'id inválido' });
    }

    const client = getAdminClient();

    const [loginsRes, sharesRes] = await Promise.all([
      client
        .from('memo_audit_log')
        .select('id, action, ip, user_agent, created_at')
        .eq('patient_id', id)
        .like('action', 'patient.login%')
        .order('created_at', { ascending: false })
        .limit(LOGIN_LIMIT),
      client
        .from('memo_family_shares')
        .select(
          `
          id, exam_id, expires_at, view_count, last_viewed_at, last_viewed_ip, created_at,
          memo_exams!inner ( id, exam_date, exam_type )
        `
        )
        .eq('shared_by_patient_id', id)
        .order('created_at', { ascending: false }),
    ]);

    if (loginsRes.error) throw loginsRes.error;
    if (sharesRes.error) throw sharesRes.error;

    return res.status(200).json({
      logins: loginsRes.data || [],
      shares: (sharesRes.data || []).map(s => ({
        id: s.id,
        exam_id: s.exam_id,
        exam_date: s.memo_exams?.exam_date || null,
        exam_type: s.memo_exams?.exam_type || null,
        expires_at: s.expires_at,
        created_at: s.created_at,
        view_count: s.view_count || 0,
        last_viewed_at: s.last_viewed_at,
        last_viewed_ip: s.last_viewed_ip,
      })),
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d pacientes usage]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
