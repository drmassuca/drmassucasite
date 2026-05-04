/**
 * Memo3D — detalhe da paciente (com exames e mídias).
 *
 * GET /api/memo3d/pacientes/detail?id=<uuid>
 *
 * Usa query param em vez de dynamic route porque [id].js não é confiável
 * em projetos Vite + Vercel (filesystem routing cai no SPA fallback).
 *
 * Retorna paciente + exames embutidos + mídias de cada exame.
 */
import { requireAdmin } from '../_lib/auth.js';
import { getAdminClient } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);
    const { id } = req.query;
    if (!id || !UUID_RE.test(id)) {
      return res.status(400).json({ error: 'id inválido' });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_patients')
      .select(
        `
        id, full_name, phone, cpf_last4, email, status,
        consent_lgpd_at, consent_lgpd_version, created_at, created_by, updated_at,
        memo_exams (
          id, exam_date, exam_type, device, notes,
          paid, paid_at, paid_amount_cents,
          expires_at, hard_delete_at, created_at,
          memo_media (
            id, kind, filename, size_bytes, duration_seconds,
            width, height, mime_type,
            r2_key, thumbnail_r2_key, stream_video_id,
            position, uploaded_at
          )
        )
      `
      )
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Paciente não encontrada' });

    // Ordena exames por data desc, mídias por position asc
    const exams = (data.memo_exams || [])
      .map(e => ({
        ...e,
        memo_media: (e.memo_media || []).sort((a, b) => (a.position || 0) - (b.position || 0)),
      }))
      .sort((a, b) => new Date(b.exam_date) - new Date(a.exam_date));

    return res.status(200).json({ patient: { ...data, memo_exams: exams } });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d patient detail]', err);
    return res.status(500).json({ error: 'Erro interno' });
  }
}
