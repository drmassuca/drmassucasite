/**
 * Memo3D — cliente R2 server-side (S3 SDK) e geração de URLs pré-assinadas.
 *
 * SERVER-ONLY. Usa R2_ACCESS_KEY_ID e R2_SECRET_ACCESS_KEY do .env.
 * Estes valores nunca podem ir pro bundle do client.
 */
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  HeadObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

let _client = null;

function getClient() {
  if (_client) return _client;
  const { R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY } = process.env;
  if (!R2_ENDPOINT || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    throw new Error(
      'R2 env vars ausentes. Verificar R2_ENDPOINT, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY no .env e Vercel.'
    );
  }
  _client = new S3Client({
    region: 'auto',
    endpoint: R2_ENDPOINT,
    credentials: {
      accessKeyId: R2_ACCESS_KEY_ID,
      secretAccessKey: R2_SECRET_ACCESS_KEY,
    },
  });
  return _client;
}

const BUCKET = () => process.env.R2_BUCKET || 'memo3d';

/**
 * URL pré-assinada PUT — recepção/paciente sobe direto ao R2 sem passar pelo backend.
 */
export async function presignPutUrl({ key, contentType, expiresInSeconds = 600 }) {
  if (!key) throw new Error('presignPutUrl: key obrigatório');
  const cmd = new PutObjectCommand({
    Bucket: BUCKET(),
    Key: key,
    ContentType: contentType,
  });
  return getSignedUrl(getClient(), cmd, { expiresIn: expiresInSeconds });
}

/**
 * URL pré-assinada GET — paciente baixa/visualiza foto. TTL curto recomendado.
 */
export async function presignGetUrl({ key, expiresInSeconds = 1800 }) {
  if (!key) throw new Error('presignGetUrl: key obrigatório');
  const cmd = new GetObjectCommand({ Bucket: BUCKET(), Key: key });
  return getSignedUrl(getClient(), cmd, { expiresIn: expiresInSeconds });
}

/**
 * Sobe um objeto direto do servidor pro R2 (sem URL pré-assinada).
 * Usado por endpoints que precisam processar bytes antes de gravar
 * (ex.: lab IA — sobe a foto pra ser enviada à Grok).
 */
export async function putObject({ key, body, contentType }) {
  if (!key) throw new Error('putObject: key obrigatório');
  if (!body) throw new Error('putObject: body obrigatório');
  const cmd = new PutObjectCommand({
    Bucket: BUCKET(),
    Key: key,
    Body: body,
    ContentType: contentType,
  });
  return getClient().send(cmd);
}

/** Apaga objeto. Usado pelo job de hard delete (exame expirado). */
export async function deleteObject({ key }) {
  if (!key) throw new Error('deleteObject: key obrigatório');
  const cmd = new DeleteObjectCommand({ Bucket: BUCKET(), Key: key });
  return getClient().send(cmd);
}

/** Verifica se objeto existe (HEAD). Útil pra validar upload concluído. */
export async function objectExists({ key }) {
  try {
    await getClient().send(new HeadObjectCommand({ Bucket: BUCKET(), Key: key }));
    return true;
  } catch (err) {
    if (err?.$metadata?.httpStatusCode === 404 || err?.name === 'NotFound') return false;
    throw err;
  }
}
