/**
 * Memo3D Lab IA — upload simples de foto pra fase de testes do Grok.
 *
 * POST /api/memo3d/admin/lab-upload
 * Headers:
 *   Authorization: Bearer <jwt admin>
 *   Content-Type: image/jpeg | image/png | image/webp
 * Body: bytes da imagem
 *
 * Salva em R2 sob `lab-ia/uploads/{ts}-{rand}.{ext}` SEM watermark
 * (imagem precisa ir crua pra Grok pra teste). Retorna `{ key, sizeBytes }`.
 *
 * Limpeza: pasta lab-ia/uploads/ pode ser limpa via cron ou manualmente —
 * é só fase de testes.
 */
import { requireAdmin } from '../_lib/auth.js';
import { putObject } from '../_lib/r2-server.js';

const ALLOWED_MIMES = new Set(['image/jpeg', 'image/png', 'image/webp']);
const MAX_BYTES = 4 * 1024 * 1024;

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

    const buffer = await readBodyToBuffer(req, MAX_BYTES);
    if (buffer.length === 0) return res.status(400).json({ error: 'Body vazio' });

    const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';
    const id = globalThis.crypto?.randomUUID
      ? globalThis.crypto.randomUUID()
      : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
    const key = `lab-ia/uploads/${Date.now()}-${id}.${ext}`;
    await putObject({ key, body: buffer, contentType: mime });

    return res.status(200).json({ key, sizeBytes: buffer.length, mime });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d lab-upload]', err);
    // Admin-only e fase de testes: devolve mensagem técnica pra debug rápido.
    return res.status(500).json({
      error: `Erro ao subir foto pro lab: ${err?.message || 'desconhecido'}`,
      name: err?.name,
    });
  }
}
