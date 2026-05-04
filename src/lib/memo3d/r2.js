/**
 * Memo3D — helpers compartilhados (browser + server) para mídia no R2.
 *
 * Não usa credenciais. Apenas constrói paths e valida tipos/tamanhos.
 * Lógica server (presigned URLs) fica em api/memo3d/_lib/r2-server.js.
 */

export const R2_ALLOWED_PHOTO_MIMES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
]);

export const R2_MAX_PHOTO_BYTES = 20 * 1024 * 1024; // 20 MB por foto

/**
 * Path canônico de um arquivo dentro do bucket `memo3d`.
 * Estrutura: clinic/dr-massuca/patient/<id>/exam/<id>/<media_id>.<ext>
 */
export function buildR2Key({ patientId, examId, mediaId, ext }) {
  if (!patientId || !examId || !mediaId || !ext) {
    throw new Error('buildR2Key: patientId, examId, mediaId e ext são obrigatórios');
  }
  return `clinic/dr-massuca/patient/${patientId}/exam/${examId}/${mediaId}.${ext}`;
}

/** Path para thumbnail derivada de uma media. */
export function buildR2ThumbKey({ patientId, examId, mediaId }) {
  return `clinic/dr-massuca/patient/${patientId}/exam/${examId}/${mediaId}.thumb.webp`;
}

/** Detecta extensão a partir do mime type. */
export function extFromMime(mime) {
  switch (mime) {
    case 'image/jpeg': return 'jpg';
    case 'image/png':  return 'png';
    case 'image/webp': return 'webp';
    default: throw new Error(`mime não suportado: ${mime}`);
  }
}

export function isAllowedPhotoMime(mime) {
  return R2_ALLOWED_PHOTO_MIMES.has(mime);
}
