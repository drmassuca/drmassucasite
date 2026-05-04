/**
 * Memo3D — helpers compartilhados para Cloudflare Stream.
 *
 * Não usa credenciais. Apenas valida tipos/tamanhos e constrói URLs
 * de player a partir do customer subdomain + uid + signed token.
 *
 * Lógica server (upload, sign token, list) fica em
 * api/memo3d/_lib/stream-server.js.
 */

export const STREAM_ALLOWED_MIMES = new Set([
  'video/mp4',
  'video/quicktime',
  'video/x-msvideo',
  'video/webm',
]);

// Decisão de produto Memo3D: limitar upload a 100 MB por vídeo.
// Recepção orientada a exportar dos aparelhos (Voluson S10 / HERA Z20)
// em qualidade web (H.264 720p). Vídeo cru de 200+ MB sofre em rede ruim.
export const STREAM_MAX_BYTES = 100 * 1024 * 1024;

/** URL do player iframe (recomendado — usa o player do Cloudflare). */
export function buildIframeUrl({ customerSubdomain, signedToken }) {
  if (!customerSubdomain || !signedToken) {
    throw new Error('buildIframeUrl: customerSubdomain e signedToken são obrigatórios');
  }
  return `https://${customerSubdomain}/${signedToken}/iframe`;
}

/** URL do manifest HLS (pra <video> nativo / video.js / hls.js). */
export function buildHlsUrl({ customerSubdomain, signedToken }) {
  if (!customerSubdomain || !signedToken) {
    throw new Error('buildHlsUrl: customerSubdomain e signedToken são obrigatórios');
  }
  return `https://${customerSubdomain}/${signedToken}/manifest/video.m3u8`;
}

/** URL da thumbnail (frame) do vídeo. */
export function buildThumbnailUrl({ customerSubdomain, signedToken, time = '5s' }) {
  if (!customerSubdomain || !signedToken) {
    throw new Error('buildThumbnailUrl: customerSubdomain e signedToken são obrigatórios');
  }
  return `https://${customerSubdomain}/${signedToken}/thumbnails/thumbnail.jpg?time=${encodeURIComponent(time)}`;
}

export function isAllowedVideoMime(mime) {
  return STREAM_ALLOWED_MIMES.has(mime);
}
