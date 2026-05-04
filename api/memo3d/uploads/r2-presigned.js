/**
 * Memo3D — gera URL pré-assinada PUT para upload de foto no R2.
 *
 * POST /api/memo3d/uploads/r2-presigned
 * Body: { patientId, examId, mediaId, mime, size? }
 *
 * Retorna { uploadUrl, key, expiresIn }. O cliente faz PUT direto na uploadUrl
 * com o arquivo no body e o mesmo Content-Type. Após o PUT, chama
 * /api/memo3d/midias/register para gravar metadata em memo_media.
 */
import { requireAdmin } from '../_lib/auth.js';
import { presignPutUrl } from '../_lib/r2-server.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 20 * 1024 * 1024; // 20MB

function extFromMime(mime) {
  if (mime === 'image/jpeg') return 'jpg';
  if (mime === 'image/png') return 'png';
  return 'webp';
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);
    const { patientId, examId, mediaId, mime, size } = req.body || {};

    if (!patientId || !UUID_RE.test(patientId)) {
      return res.status(400).json({ error: 'patientId inválido' });
    }
    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'examId inválido' });
    }
    if (!mediaId || !UUID_RE.test(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }
    if (!mime || !ALLOWED_MIMES.has(mime)) {
      return res
        .status(400)
        .json({ error: 'mime não suportado. Aceitos: jpeg, png, webp' });
    }
    if (size && size > MAX_BYTES) {
      return res.status(400).json({ error: `Tamanho máximo: ${MAX_BYTES / 1024 / 1024}MB` });
    }

    const ext = extFromMime(mime);
    const key = `clinic/dr-massuca/patient/${patientId}/exam/${examId}/${mediaId}.${ext}`;
    const uploadUrl = await presignPutUrl({ key, contentType: mime, expiresInSeconds: 600 });

    return res.status(200).json({ uploadUrl, key, expiresIn: 600 });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d r2 presigned]', err);
    return res.status(500).json({ error: 'Erro ao gerar URL de upload' });
  }
}
