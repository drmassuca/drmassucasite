/**
 * Memo3D — wrapper do SDK Mercado Pago.
 *
 * Centraliza:
 *  - Config singleton (lazy, só inicializa quando algum endpoint usa)
 *  - Verificação de assinatura HMAC-SHA256 do webhook
 *  - Detecção de base URL pra back_urls / notification_url
 *
 * Env vars (server-only, NUNCA com prefixo VITE_):
 *  - MP_ACCESS_TOKEN: token de produção/sandbox do Mercado Pago
 *  - MP_WEBHOOK_SECRET: secret configurada no painel MP em Webhooks → Configurações
 *  - MEMO3D_BASE_URL (opcional): override da URL pública (default: derivada do request)
 */
import { createHmac, timingSafeEqual } from 'crypto';
import { MercadoPagoConfig, Preference, Payment } from 'mercadopago';

let _client = null;

export function getMpClient() {
  if (_client) return _client;
  const accessToken = process.env.MP_ACCESS_TOKEN;
  if (!accessToken) {
    throw new Error('MP_ACCESS_TOKEN não configurado no ambiente');
  }
  _client = new MercadoPagoConfig({ accessToken });
  return _client;
}

export { Preference, Payment };

/**
 * Verifica a assinatura HMAC-SHA256 do webhook do Mercado Pago.
 *
 * Manifesto canônico: `id:{dataId};request-id:{xRequestId};ts:{ts};`
 * Comparação em tempo constante (timingSafeEqual) pra resistir a timing attacks.
 *
 * Se MP_WEBHOOK_SECRET não estiver configurado, rejeita por padrão.
 */
export function verifyWebhookSignature({ dataId, xSignature, xRequestId }) {
  const webhookSecret = process.env.MP_WEBHOOK_SECRET;
  if (!webhookSecret) {
    console.error('[memo3d webhook] MP_WEBHOOK_SECRET ausente — rejeitando');
    return false;
  }
  if (!xSignature || !xRequestId || !dataId) return false;

  let ts;
  let v1;
  for (const part of String(xSignature).split(',')) {
    const [k, v] = part.split('=', 2);
    if (!k || !v) continue;
    if (k.trim() === 'ts') ts = v.trim();
    if (k.trim() === 'v1') v1 = v.trim();
  }
  if (!ts || !v1) return false;

  const manifest = `id:${dataId};request-id:${xRequestId};ts:${ts};`;
  const hmac = createHmac('sha256', webhookSecret).update(manifest).digest('hex');

  if (hmac.length !== v1.length) return false;
  try {
    const a = Buffer.from(hmac, 'hex');
    const b = Buffer.from(v1, 'hex');
    if (a.length !== b.length) return false;
    return timingSafeEqual(a, b);
  } catch {
    return false;
  }
}

/**
 * Detecta a URL pública do site para uso em back_urls e notification_url.
 * Prioriza MEMO3D_BASE_URL (env), depois Vercel headers, depois host header.
 */
export function detectBaseUrl(req) {
  if (process.env.MEMO3D_BASE_URL) return process.env.MEMO3D_BASE_URL;
  const proto = (req.headers['x-forwarded-proto'] || 'https').toString().split(',')[0];
  const host = req.headers['x-forwarded-host'] || req.headers.host;
  if (host) return `${proto}://${host}`;
  return 'https://drmassuca.com.br';
}
