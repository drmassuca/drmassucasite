/**
 * Memo3D — upload de foto com watermark automático.
 *
 * POST /api/memo3d/uploads/r2-watermark
 * Headers:
 *   Authorization: Bearer <jwt admin>
 *   Content-Type: image/jpeg | image/png | image/webp
 *   X-Memo3d-Patient-Id: <uuid>
 *   X-Memo3d-Exam-Id: <uuid>
 *   X-Memo3d-Media-Id: <uuid>
 * Body: bytes da imagem original
 *
 * Server aplica watermark via sharp e sobe pro R2 com PutObject. Retorna
 * { key, sizeBytes }. Cliente segue depois com /midias/register.
 *
 * Substitui o fluxo presigned PUT direto do navegador pra R2 (que não
 * deixava aplicar watermark — imagem ia bruta).
 */
import { requireAdmin } from '../_lib/auth.js';
import { putObject } from '../_lib/r2-server.js';
import { applyWatermark } from '../_lib/watermark.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 4 * 1024 * 1024; // 4MB — limite Vercel Function

// Desliga o body parser do Vercel pra ler o body como stream/buffer
export const config = {
  api: {
    bodyParser: false,
    sizeLimit: '4mb',
  },
};

function readBodyToBuffer(req, maxBytes) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on('data', chunk => {
      size += chunk.length;
      if (size > maxBytes) {
        reject(Object.assign(new Error('Foto maior que 4MB'), { statusCode: 413 }));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);

    const mime = String(req.headers['content-type'] || '')
      .split(';')[0]
      .trim();
    if (!ALLOWED_MIMES.has(mime)) {
      return res
        .status(400)
        .json({ error: 'Content-Type deve ser image/jpeg, image/png ou image/webp' });
    }

    const patientId = req.headers['x-memo3d-patient-id'];
    const examId = req.headers['x-memo3d-exam-id'];
    const mediaId = req.headers['x-memo3d-media-id'];
    if (!patientId || !UUID_RE.test(patientId)) {
      return res.status(400).json({ error: 'X-Memo3d-Patient-Id inválido' });
    }
    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'X-Memo3d-Exam-Id inválido' });
    }
    if (!mediaId || !UUID_RE.test(mediaId)) {
      return res.status(400).json({ error: 'X-Memo3d-Media-Id inválido' });
    }

    const inputBuffer = await readBodyToBuffer(req, MAX_BYTES);
    if (inputBuffer.length === 0) {
      return res.status(400).json({ error: 'Body vazio' });
    }

    // Aplica watermark — saída sempre JPEG
    const watermarked = await applyWatermark(inputBuffer);

    // Após watermark a saída é sempre .jpg
    const key = `clinic/dr-massuca/patient/${patientId}/exam/${examId}/${mediaId}.jpg`;
    await putObject({ key, body: watermarked, contentType: 'image/jpeg' });

    return res.status(200).json({
      key,
      sizeBytes: watermarked.length,
      mime: 'image/jpeg',
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d r2-watermark]', err);
    return res.status(500).json({ error: 'Erro ao aplicar watermark e subir foto' });
  }
}
