/**
 * Memo3D — histórico de uso da paciente logada.
 *
 * GET /api/memo3d/paciente/usage
 *
 * Retorna:
 *   - logins: últimos N eventos action='patient.login*' do audit log
 *   - shares: family shares criados pela paciente, com contador e
 *     última visualização
 *
 * A paciente usa pra ver "minha atividade" na tela /conta:
 * - quando entrei na conta da última vez
 * - quem (família) abriu meus links e quando
 *
 * Filtragem por patient_id é forçada no servidor — não confia no client.
 */
import { requirePatient } from '../_lib/auth-patient.js';
import { getAdminClient } from '../_lib/supabase-admin.js';

const LOGIN_LIMIT = 20;

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'POST') {
    res.setHeader('Allow', 'GET, POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { patient } = await requirePatient(req);
    const client = getAdminClient();

    const [loginsRes, sharesRes] = await Promise.all([
      client
        .from('memo_audit_log')
        .select('id, action, ip, user_agent, created_at')
        .eq('patient_id', patient.id)
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
        .eq('shared_by_patient_id', patient.id)
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
    console.error('[memo3d patient usage]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
