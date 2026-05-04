/**
 * Memo3D — cliente Cloudflare Stream server-side (REST API).
 *
 * SERVER-ONLY. Usa CLOUDFLARE_ACCOUNT_ID + CLOUDFLARE_STREAM_API_TOKEN do .env.
 *
 * Estratégia para coexistir com vídeos de outros projetos (escola/MedX)
 * na mesma conta Cloudflare: cada upload Memo3D recebe metadata
 * `{ project: 'memo3d', patient_id, exam_id }`. As consultas filtram
 * por essa tag.
 */

const PROJECT_TAG = 'memo3d';
const STREAM_API_BASE = 'https://api.cloudflare.com/client/v4';

function streamHeaders() {
  const token = process.env.CLOUDFLARE_STREAM_API_TOKEN;
  if (!token) throw new Error('CLOUDFLARE_STREAM_API_TOKEN ausente no .env');
  return {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };
}

function accountId() {
  const id = process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!id) throw new Error('CLOUDFLARE_ACCOUNT_ID ausente no .env');
  return id;
}

/**
 * Solicita URL de upload direto.
 * Recepção/paciente faz POST multipart desse URL com o arquivo.
 *
 * Retorna { uploadURL, uid }. Salve o uid em memo_media.stream_video_id.
 */
export async function requestDirectUpload({
  patientId,
  examId,
  maxDurationSeconds = 600,
  expiresInSeconds = 1800,
}) {
  if (!patientId || !examId) {
    throw new Error('requestDirectUpload: patientId e examId obrigatórios');
  }
  const url = `${STREAM_API_BASE}/accounts/${accountId()}/stream/direct_upload`;
  const body = {
    maxDurationSeconds,
    expiry: new Date(Date.now() + expiresInSeconds * 1000).toISOString(),
    requireSignedURLs: true, // playback exige token assinado
    meta: {
      project: PROJECT_TAG,
      patient_id: patientId,
      exam_id: examId,
    },
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: streamHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Stream direct upload falhou (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.result; // { uploadURL, uid }
}

/**
 * Gera token assinado pra reprodução de vídeo específico.
 *
 * O token vai como path segment na URL do player:
 *   https://<customer>.cloudflarestream.com/<TOKEN>/iframe
 *
 * @param {string} uid               id do vídeo Stream
 * @param {number} expiresInSeconds  TTL do token (default 30 min)
 * @param {boolean} downloadable     permitir download (default false)
 */
export async function signPlaybackToken({ uid, expiresInSeconds = 1800, downloadable = false }) {
  if (!uid) throw new Error('signPlaybackToken: uid obrigatório');
  const url = `${STREAM_API_BASE}/accounts/${accountId()}/stream/${uid}/token`;
  const body = {
    exp: Math.floor(Date.now() / 1000) + expiresInSeconds,
    downloadable,
  };
  const res = await fetch(url, {
    method: 'POST',
    headers: streamHeaders(),
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Stream sign token falhou (${res.status}): ${text}`);
  }
  const data = await res.json();
  return data.result.token;
}

export async function getVideoInfo(uid) {
  if (!uid) throw new Error('getVideoInfo: uid obrigatório');
  const url = `${STREAM_API_BASE}/accounts/${accountId()}/stream/${uid}`;
  const res = await fetch(url, { headers: streamHeaders() });
  if (!res.ok) throw new Error(`Stream get video falhou (${res.status})`);
  const data = await res.json();
  return data.result;
}

export async function deleteVideo(uid) {
  if (!uid) throw new Error('deleteVideo: uid obrigatório');
  const url = `${STREAM_API_BASE}/accounts/${accountId()}/stream/${uid}`;
  const res = await fetch(url, { method: 'DELETE', headers: streamHeaders() });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Stream delete falhou (${res.status}): ${text}`);
  }
  return true;
}

/**
 * Lista vídeos do projeto Memo3D.
 *
 * Atenção: a API do Stream não suporta filtro por metadata server-side.
 * Listagem traz todos os vídeos da conta e filtramos no Node.
 * Para volume grande, use a query no `memo_media` (banco) em vez disso.
 */
export async function listMemo3dVideos({ examId, limit = 1000 } = {}) {
  const url = `${STREAM_API_BASE}/accounts/${accountId()}/stream?limit=${limit}`;
  const res = await fetch(url, { headers: streamHeaders() });
  if (!res.ok) throw new Error(`Stream list falhou (${res.status})`);
  const data = await res.json();
  const videos = data.result || [];
  return videos.filter(v => {
    if (v.meta?.project !== PROJECT_TAG) return false;
    if (examId && v.meta?.exam_id !== examId) return false;
    return true;
  });
}
