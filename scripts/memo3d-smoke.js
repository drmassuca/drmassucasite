/**
 * Memo3D — smoke test.
 *
 * Verifica que o ambiente está minimamente saudável:
 *   1. Variáveis de ambiente preenchidas
 *   2. Geração + hash de token funciona
 *   3. R2 acessível (ListObjects no bucket memo3d)
 *   4. Cloudflare Stream API token funciona (lista 1 vídeo)
 *   5. Supabase admin acessa memo_patients (RLS bypass)
 *
 * Não faz nenhuma ação destrutiva nem cria recursos.
 *
 * Como rodar:
 *   npm run smoke:memo3d
 *
 * Ou direto:
 *   node --env-file=.env scripts/memo3d-smoke.js
 */

import { ListObjectsV2Command, S3Client } from '@aws-sdk/client-s3';
import { generateToken, hashToken, isValidTokenFormat } from '../src/lib/memo3d/tokens.js';

const REQUIRED_VARS = [
  'R2_ACCOUNT_ID',
  'R2_ACCESS_KEY_ID',
  'R2_SECRET_ACCESS_KEY',
  'R2_BUCKET',
  'R2_ENDPOINT',
  'CLOUDFLARE_ACCOUNT_ID',
  'CLOUDFLARE_STREAM_API_TOKEN',
  'CLOUDFLARE_STREAM_CUSTOMER_SUBDOMAIN',
  'SUPABASE_SERVICE_ROLE_KEY',
];

const ok = (label) => console.log(`  \x1b[32m✓\x1b[0m ${label}`);
const fail = (label, err) => {
  console.log(`  \x1b[31m✗\x1b[0m ${label}`);
  if (err) console.log(`     ${err.message || err}`);
  process.exitCode = 1;
};
const section = (title) => console.log(`\n\x1b[1m${title}\x1b[0m`);

async function checkEnv() {
  section('1. Variáveis de ambiente');
  const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
  if (supabaseUrl) {
    ok(`SUPABASE_URL = ${supabaseUrl}`);
  } else {
    fail('SUPABASE_URL ou VITE_SUPABASE_URL ausente');
  }
  for (const name of REQUIRED_VARS) {
    if (process.env[name]) {
      const masked = name.includes('KEY') || name.includes('TOKEN') || name.includes('SECRET')
        ? `${process.env[name].slice(0, 4)}…${process.env[name].slice(-4)}`
        : process.env[name];
      ok(`${name} = ${masked}`);
    } else {
      fail(`${name} ausente`);
    }
  }
}

async function checkTokens() {
  section('2. Geração e hash de tokens');
  try {
    const t = generateToken();
    if (!isValidTokenFormat(t)) throw new Error('formato inválido');
    ok(`token gerado: ${t.slice(0, 12)}…`);
    const h = await hashToken(t);
    if (h.length !== 64) throw new Error(`hash com tamanho inesperado: ${h.length}`);
    ok(`hash SHA-256: ${h.slice(0, 12)}…`);
  } catch (err) {
    fail('falha em tokens.js', err);
  }
}

async function checkR2() {
  section('3. R2 (Cloudflare)');
  try {
    const client = new S3Client({
      region: 'auto',
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID,
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
      },
    });
    const cmd = new ListObjectsV2Command({
      Bucket: process.env.R2_BUCKET,
      MaxKeys: 1,
    });
    const res = await client.send(cmd);
    ok(`bucket "${process.env.R2_BUCKET}" acessível (${res.KeyCount ?? 0} objetos no listing limitado)`);
  } catch (err) {
    fail('R2 ListObjectsV2 falhou', err);
  }
}

async function checkStream() {
  section('4. Cloudflare Stream');
  try {
    const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
    const token = process.env.CLOUDFLARE_STREAM_API_TOKEN;
    const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/stream?limit=1`;
    const res = await fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      const text = await res.text();
      throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
    }
    const data = await res.json();
    if (!data.success) throw new Error(`API retornou success=false: ${JSON.stringify(data.errors)}`);
    ok(`Stream API token válido (conta tem ${data.result?.length ?? 0} vídeos retornados no limit=1)`);
  } catch (err) {
    fail('Stream API falhou', err);
  }
}

async function checkSupabase() {
  section('5. Supabase admin (service role)');
  try {
    const { createClient } = await import('@supabase/supabase-js');
    const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
    const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!url || !key) throw new Error('URL ou SERVICE_ROLE_KEY ausente');
    const client = createClient(url, key, {
      auth: { autoRefreshToken: false, persistSession: false },
    });
    // count em memo_patients prova: (a) tabela existe (b) service role bypassa RLS
    const { count, error } = await client
      .from('memo_patients')
      .select('*', { count: 'exact', head: true });
    if (error) throw error;
    ok(`memo_patients acessível, count=${count}`);
  } catch (err) {
    fail('Supabase admin falhou', err);
  }
}

async function main() {
  console.log('\x1b[1m═══ Memo3D smoke test ═══\x1b[0m');
  await checkEnv();
  await checkTokens();
  await checkR2();
  await checkStream();
  await checkSupabase();
  console.log('');
  if (process.exitCode === 1) {
    console.log('\x1b[31mAlgum item falhou. Veja acima.\x1b[0m\n');
  } else {
    console.log('\x1b[32mTudo OK. Memo3D pronto pra próxima fase.\x1b[0m\n');
  }
}

main().catch(err => {
  console.error('\x1b[31mErro inesperado:\x1b[0m', err);
  process.exit(1);
});
