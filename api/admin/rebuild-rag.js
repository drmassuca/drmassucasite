// api/admin/rebuild-rag.js
// Endpoint admin pra disparar rebuild do RAG sem precisar do EMBED_BUILD_TOKEN.
// Auth: JWT Supabase + role check (apenas user com role 'owner' em user_metadata).
// Chamado pelo botao "Reconstruir RAG" em /admin/site-vivo.
//
// Body JSON:
//   { only?: 'all' | 'faq' | 'site' | 'articles', force?: boolean }
//
// Reusa as funcoes process* exportadas por ../build-embeddings.js.

import { processFAQ, processSiteChunks, processArticles } from '../build-embeddings.js';

async function getUserFromJwt(supaUrl, anonKey, jwt) {
  try {
    const res = await fetch(`${supaUrl}/auth/v1/user`, {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${jwt}`,
      },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export default async function handler(req, res) {
  const startedAt = Date.now();

  // CORS (mesma origem na pratica, mas defensivo)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  // Auth: extrai JWT do header
  const authHeader = req.headers.authorization || '';
  const jwt = authHeader.replace(/^Bearer\s+/i, '').trim();
  if (!jwt) return res.status(401).json({ error: 'Authorization Bearer token ausente' });

  const SUPA_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const ANON_KEY = process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  if (!SUPA_URL || !ANON_KEY || !SERVICE_KEY) {
    return res.status(500).json({ error: 'Supabase env ausente (URL/ANON/SERVICE)' });
  }
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY ausente' });

  // Valida JWT
  const user = await getUserFromJwt(SUPA_URL, ANON_KEY, jwt);
  if (!user || !user.id) return res.status(401).json({ error: 'JWT invalido ou expirado' });

  // Role check: apenas 'owner' (user.user_metadata.role)
  const role = user.user_metadata?.role || 'owner';
  if (role !== 'owner') {
    return res.status(403).json({ error: 'Acesso restrito ao owner' });
  }

  // Parametros
  const { only = 'all', force = false } = req.body || {};
  if (!['all', 'faq', 'site', 'articles'].includes(only)) {
    return res.status(400).json({ error: `Parametro 'only' invalido: ${only}` });
  }

  const log = [];
  const ctx = {
    supaUrl: SUPA_URL,
    serviceKey: SERVICE_KEY,
    openaiKey: OPENAI_API_KEY,
    force: !!force,
    log,
  };

  try {
    let faqCount = 0;
    let siteCount = 0;
    let articlesCount = 0;

    if (only === 'all' || only === 'faq') faqCount = await processFAQ(ctx);
    if (only === 'all' || only === 'site') siteCount = await processSiteChunks(ctx);
    if (only === 'all' || only === 'articles') articlesCount = await processArticles(ctx);

    return res.status(200).json({
      success: true,
      triggered_by: user.email,
      only,
      force: !!force,
      faqs_processed: faqCount,
      site_chunks_processed: siteCount,
      articles_chunks_processed: articlesCount,
      duration_ms: Date.now() - startedAt,
      log,
    });
  } catch (e) {
    return res.status(500).json({
      error: e.message,
      duration_ms: Date.now() - startedAt,
      log,
    });
  }
}
