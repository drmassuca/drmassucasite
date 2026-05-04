/**
 * Memo3D — client fetcher para os endpoints /api/memo3d/*.
 *
 * Adiciona automaticamente o JWT do Supabase no header Authorization,
 * para que o backend possa validar via `requireAdmin`.
 */
import { supabase } from '../supabase';

async function authedFetch(url, opts = {}) {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;
  const headers = {
    'Content-Type': 'application/json',
    ...(opts.headers || {}),
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  return fetch(url, { ...opts, headers });
}

async function asJson(res) {
  if (!res.ok) {
    let msg = `HTTP ${res.status}`;
    try {
      const data = await res.json();
      if (data?.error) msg = data.error;
    } catch (_) {
      /* ignore */
    }
    throw new Error(msg);
  }
  return res.json();
}

function uuid() {
  return crypto.randomUUID();
}

// ─── Pacientes ─────────────────────────────────────────────

/**
 * @param {object} payload
 * @param {string} payload.fullName
 * @param {string} payload.phone     formato E.164 (+5562999998888)
 * @param {string} payload.cpfLast4  4 dígitos
 * @param {string} [payload.email]
 */
export async function createPatient(payload) {
  const res = await authedFetch('/api/memo3d/pacientes/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await asJson(res);
  return data.patient;
}

/** Busca paciente com exames e mídias embutidos. */
export async function getPatient(id) {
  const res = await authedFetch(`/api/memo3d/pacientes/detail?id=${encodeURIComponent(id)}`, {
    method: 'GET',
  });
  const data = await asJson(res);
  return data.patient;
}

/** Atualiza paciente. Apenas campos enviados são alterados. */
export async function updatePatient({ id, fullName, phone, cpfLast4, email }) {
  const payload = { id };
  if (fullName !== undefined) payload.fullName = fullName;
  if (phone !== undefined) payload.phone = phone;
  if (cpfLast4 !== undefined) payload.cpfLast4 = cpfLast4;
  if (email !== undefined) payload.email = email;
  const res = await authedFetch('/api/memo3d/pacientes/update', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await asJson(res);
  return data.patient;
}

/** Soft delete (status='deleted'). */
export async function deletePatient(id) {
  const res = await authedFetch('/api/memo3d/pacientes/delete', {
    method: 'POST',
    body: JSON.stringify({ id }),
  });
  return asJson(res);
}

/** Gera nova senha temporária. Retorna { password, loginEmail, mustChangeOnLogin }. */
export async function setPatientPassword(patientId) {
  const res = await authedFetch('/api/memo3d/pacientes/set-password', {
    method: 'POST',
    body: JSON.stringify({ patientId }),
  });
  return asJson(res);
}

// ─── Exames ────────────────────────────────────────────────

/**
 * @param {object} payload
 * @param {string} payload.patientId
 * @param {string} payload.examDate  YYYY-MM-DD
 * @param {string} [payload.examType]
 * @param {string} [payload.device]   'voluson_s10' | 'hera_z20'
 * @param {string} [payload.notes]
 */
export async function createExam(payload) {
  const res = await authedFetch('/api/memo3d/exames/create', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
  const data = await asJson(res);
  return data.exam;
}

/** Marca exame como pago. amountCents default 3000 (R$30,00). */
export async function markExamPaid(examId, amountCents = 3000) {
  const res = await authedFetch('/api/memo3d/exames/mark-paid', {
    method: 'POST',
    body: JSON.stringify({ examId, amountCents }),
  });
  const data = await asJson(res);
  return data.exam;
}

// ─── Uploads ───────────────────────────────────────────────

/**
 * Sobe foto direto pro R2 (PUT pré-assinado) e registra metadata.
 * Retorna a row de memo_media criada.
 *
 * @param {object} args
 * @param {string} args.patientId
 * @param {string} args.examId
 * @param {File}   args.file
 * @param {function} [args.onProgress]  callback(0..1) — placeholder, sem implementação ainda
 */
export async function uploadPhoto({ patientId, examId, file }) {
  const mediaId = uuid();
  const mime = file.type;

  // 1) pede URL pré-assinada
  const presignRes = await authedFetch('/api/memo3d/uploads/r2-presigned', {
    method: 'POST',
    body: JSON.stringify({ patientId, examId, mediaId, mime, size: file.size }),
  });
  const { uploadUrl, key } = await asJson(presignRes);

  // 2) PUT direto pro R2 (não passa pelo backend — não precisa do token)
  const putRes = await fetch(uploadUrl, {
    method: 'PUT',
    headers: { 'Content-Type': mime },
    body: file,
  });
  if (!putRes.ok) {
    throw new Error(`Upload pro R2 falhou (HTTP ${putRes.status})`);
  }

  // 3) registra metadata no banco
  const dimensions = await readImageDimensions(file).catch(() => ({}));
  const registerRes = await authedFetch('/api/memo3d/midias/register', {
    method: 'POST',
    body: JSON.stringify({
      mediaId,
      examId,
      kind: 'photo',
      filename: file.name,
      sizeBytes: file.size,
      mimeType: mime,
      width: dimensions.width || null,
      height: dimensions.height || null,
      r2Key: key,
    }),
  });
  const data = await asJson(registerRes);
  return data.media;
}

/**
 * Sobe vídeo pro Cloudflare Stream (direct upload) e registra metadata.
 *
 * @param {object} args
 * @param {string} args.patientId
 * @param {string} args.examId
 * @param {File}   args.file
 */
export async function uploadVideo({ patientId, examId, file }) {
  const mediaId = uuid();

  // 1) pede direct upload URL
  const reqRes = await authedFetch('/api/memo3d/uploads/stream-direct', {
    method: 'POST',
    body: JSON.stringify({ patientId, examId }),
  });
  const { uploadURL, uid: streamVideoId } = await asJson(reqRes);

  // 2) POST multipart pro Stream
  const formData = new FormData();
  formData.append('file', file, file.name);
  const uploadRes = await fetch(uploadURL, {
    method: 'POST',
    body: formData,
  });
  if (!uploadRes.ok) {
    const text = await uploadRes.text().catch(() => '');
    throw new Error(`Upload pro Stream falhou (HTTP ${uploadRes.status}): ${text.slice(0, 200)}`);
  }

  // 3) registra metadata
  const registerRes = await authedFetch('/api/memo3d/midias/register', {
    method: 'POST',
    body: JSON.stringify({
      mediaId,
      examId,
      kind: 'video',
      filename: file.name,
      sizeBytes: file.size,
      mimeType: file.type,
      streamVideoId,
    }),
  });
  const data = await asJson(registerRes);
  return data.media;
}

/** Lê dimensões de imagem usando URL.createObjectURL + Image. */
function readImageDimensions(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
    img.onerror = err => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
}
