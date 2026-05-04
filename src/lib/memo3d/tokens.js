/**
 * Memo3D — geração e validação de tokens de acesso únicos.
 *
 * Tokens seguem o formato "v1.<entropy>" onde entropy são 32 bytes
 * randômicos em base64url (~43 chars). O token cru NUNCA é armazenado
 * no banco; o server guarda apenas SHA-256(token) na coluna token_hash.
 *
 * Funciona em browser (Web Crypto API) e em Node.js 18+ (que tem
 * Web Crypto global).
 */

const TOKEN_VERSION = 'v1';
const ENTROPY_BYTES = 32;

/**
 * Gera novo token aleatório criptograficamente seguro.
 * @returns {string} ex: "v1.AbC123...xyz"
 */
export function generateToken() {
  const bytes = new Uint8Array(ENTROPY_BYTES);
  crypto.getRandomValues(bytes);
  return `${TOKEN_VERSION}.${bytesToBase64Url(bytes)}`;
}

/**
 * Calcula SHA-256(token) em hex. Usado no server para comparar
 * com `memo_access_tokens.token_hash`.
 * @param {string} token
 * @returns {Promise<string>} hash em hex (64 chars)
 */
export async function hashToken(token) {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const buffer = await crypto.subtle.digest('SHA-256', data);
  return bufferToHex(buffer);
}

/** Valida o formato sem acessar banco. */
export function isValidTokenFormat(token) {
  if (typeof token !== 'string') return false;
  const parts = token.split('.');
  return parts.length === 2 && parts[0] === TOKEN_VERSION && parts[1].length >= 40;
}

// ─── helpers internos ─────────────────────────────────────────────

function bytesToBase64Url(bytes) {
  let binary = '';
  for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
  const base64 = btoa(binary);
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function bufferToHex(buffer) {
  const bytes = new Uint8Array(buffer);
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}
