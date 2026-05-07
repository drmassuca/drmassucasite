/**
 * Memo3D — paciente salva uma versão IA gerada.
 *
 * POST /api/memo3d/paciente/save-enhanced
 * Body: { sourceMediaId, generatedImageUrl, preset, skinTone, costUsd,
 *         model, ms, promptUsed }
 *
 * Fluxo:
 *  1. valida paciente + consent + ownership da source
 *  2. baixa a imagem da generatedImageUrl (URL temporária da xAI)
 *  3. sobe pro R2 sob nova key
 *  4. insere row em memo_media com source_media_id + ai_metadata
 *  5. audit `patient.ai.save`
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { putObject } from '../_lib/r2-server.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const VALID_PRESETS = new Set(['fiel', 'medio', 'realista']);
const VALID_SKIN_TONES = new Set(['padrao', 'clara', 'parda', 'negra']);
const MAX_BYTES = 8 * 1024 * 1024; // imagem da xAI tipicamente <2MB; margem confortável

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const { user, patient } = await requirePatient(req);
    if (!patient.consent_lgpd_at) {
      return res.status(403).json({ error: 'Aceite o termo de consentimento antes' });
    }

    const { sourceMediaId, generatedImageUrl, preset, skinTone, costUsd, model, ms, promptUsed } =
      req.body || {};

    if (!sourceMediaId || !UUID_RE.test(sourceMediaId)) {
      return res.status(400).json({ error: 'sourceMediaId inválido' });
    }
    if (!generatedImageUrl || typeof generatedImageUrl !== 'string') {
      return res.status(400).json({ error: 'generatedImageUrl obrigatória' });
    }
    if (!preset || !VALID_PRESETS.has(preset)) {
      return res.status(400).json({ error: 'preset inválido' });
    }
    if (!skinTone || !VALID_SKIN_TONES.has(skinTone)) {
      return res.status(400).json({ error: 'skinTone inválido' });
    }

    // Valida ownership da source
    const client = getAdminClient();
    const { data: source, error: srcErr } = await client
      .from('memo_media')
      .select(
        'id, kind, exam_id, source_media_id, memo_exams!inner ( patient_id, paid, expires_at )'
      )
      .eq('id', sourceMediaId)
      .maybeSingle();
    if (srcErr) throw srcErr;
    if (!source) return res.status(404).json({ error: 'Source media não encontrada' });
    if (source.source_media_id) {
      return res.status(400).json({ error: 'Source não pode ser uma versão IA' });
    }
    if (source.kind !== 'photo') {
      return res.status(400).json({ error: 'Source deve ser foto' });
    }
    const exam = source.memo_exams;
    if (exam.patient_id !== patient.id) {
      return res.status(403).json({ error: 'Source não pertence à paciente' });
    }
    if (!exam.paid) return res.status(403).json({ error: 'Exame não pago' });
    if (exam.expires_at && new Date(exam.expires_at) < new Date()) {
      return res.status(403).json({ error: 'Acesso expirado' });
    }

    // Baixa a imagem gerada
    const imgRes = await fetch(generatedImageUrl);
    if (!imgRes.ok) {
      return res
        .status(502)
        .json({ error: `Não consegui baixar imagem da xAI (HTTP ${imgRes.status})` });
    }
    const contentLength = Number(imgRes.headers.get('content-length') || 0);
    if (contentLength > MAX_BYTES) {
      return res.status(413).json({ error: `Imagem maior que ${MAX_BYTES / 1024 / 1024}MB` });
    }
    const arrayBuffer = await imgRes.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    if (buffer.length === 0) return res.status(502).json({ error: 'xAI retornou imagem vazia' });
    if (buffer.length > MAX_BYTES) {
      return res.status(413).json({ error: `Imagem maior que ${MAX_BYTES / 1024 / 1024}MB` });
    }

    // Mime: a xAI tipicamente retorna JPEG; aceita o que vier no header
    const upstreamMime = (imgRes.headers.get('content-type') || 'image/jpeg').split(';')[0].trim();
    const mime = ['image/jpeg', 'image/png', 'image/webp'].includes(upstreamMime)
      ? upstreamMime
      : 'image/jpeg';
    const ext = mime === 'image/png' ? 'png' : mime === 'image/webp' ? 'webp' : 'jpg';

    // Gera novo media id e key
    const newMediaId =
      globalThis.crypto?.randomUUID?.() ||
      `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 14)}`;
    const r2Key = `clinic/dr-massuca/patient/${patient.id}/exam/${source.exam_id}/${newMediaId}-ai.${ext}`;

    await putObject({ key: r2Key, body: buffer, contentType: mime });

    // Insere metadata
    const aiMetadata = {
      preset,
      skinTone,
      model: model || null,
      costUsd: typeof costUsd === 'number' ? costUsd : null,
      ms: typeof ms === 'number' ? ms : null,
      promptUsed: typeof promptUsed === 'string' ? promptUsed.slice(0, 4000) : null,
      generatedAt: new Date().toISOString(),
    };

    const filename = `enhanced-${preset}-${Date.now()}.${ext}`;
    const { data: inserted, error: insErr } = await client
      .from('memo_media')
      .insert({
        id: newMediaId,
        exam_id: source.exam_id,
        kind: 'photo',
        filename,
        size_bytes: buffer.length,
        mime_type: mime,
        r2_key: r2Key,
        source_media_id: sourceMediaId,
        ai_metadata: aiMetadata,
      })
      .select(
        'id, kind, filename, size_bytes, mime_type, r2_key, source_media_id, ai_metadata, uploaded_at'
      )
      .single();
    if (insErr) {
      console.error('[memo3d save-enhanced] insert error', insErr);
      return res.status(500).json({ error: `Erro ao registrar mídia: ${insErr.message}` });
    }

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.ai.save',
      resourceType: 'media',
      resourceId: newMediaId,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { preset, skinTone, model: model || null, costUsd, sourceMediaId },
    });

    return res.status(200).json({ media: inserted });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d save-enhanced]', err);
    return res.status(500).json({
      error: `Erro ao salvar: ${err?.message || 'desconhecido'}`,
    });
  }
}
