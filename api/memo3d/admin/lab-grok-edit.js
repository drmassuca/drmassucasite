/**
 * Memo3D Lab IA — chama xAI Image Edit (img2img) nos dois modelos em paralelo.
 *
 * POST /api/memo3d/admin/lab-grok-edit
 * Body JSON: { photoKey: 'lab-ia/uploads/...', prompt: string }
 *
 * Fluxo:
 *  1. valida admin + payload + photoKey dentro de lab-ia/uploads/
 *  2. gera presigned GET URL da foto (TTL 10 min) — xAI baixa por essa URL
 *  3. dispara duas chamadas em paralelo pra https://api.x.ai/v1/images/edits:
 *     - grok-imagine-image          ($0.02/img)
 *     - grok-imagine-image-quality  ($0.05/img)
 *  4. retorna { standard, quality } com { ok, ms, costUsd, images?, error? }
 *
 * Env: GROK_API_KEY obrigatória no Vercel (mesma usada pelo chatbot).
 */
import { requireAdmin } from '../_lib/auth.js';
import { presignGetUrl } from '../_lib/r2-server.js';

const MODELS = [
  { id: 'grok-imagine-image', costPerImage: 0.02 },
  { id: 'grok-imagine-image-quality', costPerImage: 0.05 },
];

const XAI_EDIT_URL = 'https://api.x.ai/v1/images/edits';

async function callGrok({ model, prompt, imageUrl, apiKey }) {
  const start = Date.now();
  try {
    const response = await fetch(XAI_EDIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        prompt,
        image: { url: imageUrl, type: 'image_url' },
      }),
    });
    const ms = Date.now() - start;
    const text = await response.text();
    let data = null;
    try {
      data = JSON.parse(text);
    } catch (_) {
      /* não-JSON */
    }
    if (!response.ok) {
      const errMsg =
        data?.error?.message || data?.error || text.slice(0, 300) || `HTTP ${response.status}`;
      return { ok: false, ms, error: String(errMsg) };
    }
    // Resposta esperada (estilo OpenAI): { data: [{ url } | { b64_json }] }
    // Aceitamos algumas variações pra robustez.
    const items = data?.data || data?.images || [];
    const images = items
      .map(it => {
        if (typeof it === 'string') return it;
        if (it?.url) return it.url;
        if (it?.b64_json) return `data:image/jpeg;base64,${it.b64_json}`;
        return null;
      })
      .filter(Boolean);
    return { ok: true, ms, images };
  } catch (err) {
    return { ok: false, ms: Date.now() - start, error: err.message || 'Erro desconhecido' };
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);

    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: 'GROK_API_KEY não configurada no servidor' });
    }

    const { photoKey, prompt } = req.body || {};
    if (!photoKey || typeof photoKey !== 'string') {
      return res.status(400).json({ error: 'photoKey obrigatório' });
    }
    if (!photoKey.startsWith('lab-ia/uploads/')) {
      return res.status(400).json({ error: 'photoKey fora do escopo do lab' });
    }
    if (!prompt || typeof prompt !== 'string' || prompt.trim().length < 3) {
      return res.status(400).json({ error: 'prompt obrigatório (mín 3 chars)' });
    }
    if (prompt.length > 8000) {
      return res.status(400).json({ error: 'prompt muito longo (máx 8000 chars)' });
    }

    const imageUrl = await presignGetUrl({ key: photoKey, expiresInSeconds: 600 });

    const [standardRaw, qualityRaw] = await Promise.all(
      MODELS.map(m => callGrok({ model: m.id, prompt: prompt.trim(), imageUrl, apiKey }))
    );

    const standard = {
      model: MODELS[0].id,
      ...standardRaw,
      costUsd: standardRaw.ok ? MODELS[0].costPerImage * (standardRaw.images?.length || 0) : 0,
    };
    const quality = {
      model: MODELS[1].id,
      ...qualityRaw,
      costUsd: qualityRaw.ok ? MODELS[1].costPerImage * (qualityRaw.images?.length || 0) : 0,
    };

    return res.status(200).json({ standard, quality });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d lab-grok-edit]', err);
    return res.status(500).json({ error: 'Erro ao chamar Grok' });
  }
}
