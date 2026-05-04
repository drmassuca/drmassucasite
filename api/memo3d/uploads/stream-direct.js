/**
 * Memo3D — gera URL de upload direto no Cloudflare Stream para vídeo.
 *
 * POST /api/memo3d/uploads/stream-direct
 * Body: { patientId, examId, maxDurationSeconds? }
 *
 * Retorna { uploadURL, uid }. O cliente faz POST multipart-form na uploadURL
 * com campo "file". Após o upload, chama /api/memo3d/midias/register com
 * streamVideoId = uid para gravar metadata em memo_media.
 *
 * Vídeos são marcados com metadata { project: 'memo3d', patient_id, exam_id }
 * para isolar dos vídeos de outros projetos na mesma conta Cloudflare.
 */
import { requireAdmin } from '../_lib/auth.js';
import { requestDirectUpload } from '../_lib/stream-server.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const MAX_DURATION_SECONDS = 1800; // 30 min — limite generoso

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);
    const { patientId, examId, maxDurationSeconds } = req.body || {};

    if (!patientId || !UUID_RE.test(patientId)) {
      return res.status(400).json({ error: 'patientId inválido' });
    }
    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'examId inválido' });
    }
    const dur = Math.min(maxDurationSeconds || 600, MAX_DURATION_SECONDS);

    const result = await requestDirectUpload({
      patientId,
      examId,
      maxDurationSeconds: dur,
    });

    return res.status(200).json(result);
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d stream direct upload]', err);
    return res.status(500).json({ error: 'Erro ao iniciar upload de vídeo' });
  }
}
