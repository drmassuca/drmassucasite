// api/webhooks/article-published.js
// Webhook receiver pra Supabase Database Webhooks na tabela `articles`.
// Mantem site_chunks (source_type='article') sincronizado automaticamente.
//
// Disparos esperados:
// - INSERT com status='published' -> embeda
// - UPDATE pra published (de qualquer status) -> embeda/re-embeda
// - UPDATE de artigo published com content mudado -> re-embeda
// - UPDATE de published -> not-published -> deleta chunks
// - DELETE -> deleta chunks
// - Outros (draft -> draft, mudar likes/views/etc sem content change) -> ignore
//
// Auth: header X-Webhook-Secret deve bater com env ARTICLE_WEBHOOK_SECRET.
// Configurado em: Supabase Dashboard -> Database -> Webhooks.

import { embedSingleArticle, deleteArticleChunks } from '../build-embeddings.js';

function contentChanged(record, oldRecord) {
  if (!oldRecord) return true; // INSERT
  return (
    record.title !== oldRecord.title ||
    record.subtitle !== oldRecord.subtitle ||
    record.excerpt !== oldRecord.excerpt ||
    record.content !== oldRecord.content
  );
}

export default async function handler(req, res) {
  const startedAt = Date.now();

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Auth: secret no header customizado
  const expected = process.env.ARTICLE_WEBHOOK_SECRET;
  const provided = req.headers['x-webhook-secret'] || '';
  if (!expected) return res.status(500).json({ error: 'ARTICLE_WEBHOOK_SECRET nao configurado' });
  if (provided !== expected) return res.status(401).json({ error: 'Webhook secret invalido' });

  const SUPA_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!SUPA_URL || !SERVICE_KEY) return res.status(500).json({ error: 'Supabase env ausente' });
  if (!OPENAI_API_KEY) return res.status(500).json({ error: 'OPENAI_API_KEY ausente' });

  const { type, record, old_record } = req.body || {};

  if (!type) return res.status(400).json({ error: 'type ausente no payload' });

  const log = [];
  const ctx = {
    supaUrl: SUPA_URL,
    serviceKey: SERVICE_KEY,
    openaiKey: OPENAI_API_KEY,
    log,
  };

  try {
    // DELETE: remove chunks
    if (type === 'DELETE') {
      const slug = old_record?.slug;
      if (slug) await deleteArticleChunks(slug, ctx);
      return res.status(200).json({
        success: true,
        action: 'deleted_on_db_delete',
        slug,
        duration_ms: Date.now() - startedAt,
        log,
      });
    }

    // INSERT/UPDATE
    if (!record) {
      return res.status(400).json({ error: 'record ausente no payload (INSERT/UPDATE)' });
    }

    const isPublished = record.status === 'published';
    const wasPublished = old_record?.status === 'published';

    // Foi despublicado: delete chunks
    if (!isPublished && wasPublished) {
      await deleteArticleChunks(record.slug, ctx);
      return res.status(200).json({
        success: true,
        action: 'deleted_on_unpublish',
        slug: record.slug,
        duration_ms: Date.now() - startedAt,
        log,
      });
    }

    // Nao publicado e nao era publicado: ignore
    if (!isPublished) {
      return res.status(200).json({
        success: true,
        action: 'ignored',
        reason: `status=${record.status} (nao publicado)`,
        slug: record.slug,
        duration_ms: Date.now() - startedAt,
      });
    }

    // Publicado MAS content nao mudou (UPDATE de likes/views/etc): skip
    if (type === 'UPDATE' && !contentChanged(record, old_record)) {
      return res.status(200).json({
        success: true,
        action: 'skipped',
        reason: 'content nao mudou',
        slug: record.slug,
        duration_ms: Date.now() - startedAt,
      });
    }

    // Publicado e content mudou (ou INSERT): embeda
    const chunks = await embedSingleArticle(record, ctx);
    return res.status(200).json({
      success: true,
      action: 'embedded',
      slug: record.slug,
      chunks,
      duration_ms: Date.now() - startedAt,
      log,
    });
  } catch (e) {
    console.error('article-published webhook error:', e);
    return res.status(500).json({
      error: e.message,
      duration_ms: Date.now() - startedAt,
      log,
    });
  }
}
