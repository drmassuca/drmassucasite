/**
 * Memo3D — paciente solicita melhoria de foto via Grok (img2img).
 *
 * POST /api/memo3d/paciente/enhance-photo
 * Body: { mediaId, preset, skinTone }
 *
 * Valida ownership da mídia (igual sign-r2), monta prompt baseado em preset
 * + tom de pele, chama xAI grok-imagine-image (Standard $0.02). Retorna URL
 * da imagem gerada (TEMPORÁRIA — vinda da xAI, expira em poucos minutos).
 * NÃO salva no R2 — só salva quando paciente clicar em "salvar" via
 * /save-enhanced.
 */
import { requirePatient, getClientIp } from '../_lib/auth-patient.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { presignGetUrl } from '../_lib/r2-server.js';
import { applyCredit, COST_PHOTO_ENHANCE } from '../_lib/credits.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const XAI_EDIT_URL = 'https://api.x.ai/v1/images/edits';
const MODEL = 'grok-imagine-image';
const COST_PER_IMAGE = 0.02;

const PRESETS = {
  fiel: `Clean up and refine this 3D ultrasound image while keeping it RECOGNIZABLY a 3D ultrasound rendering. DO NOT transform it into a photograph or newborn studio portrait. Preserve composition, framing, pose, and proportions exactly as in the input. Only smooth out scan artifacts and slightly improve clarity, lighting, and skin texture.`,
  medio: `Hyper-realistic 3D ultrasound baby face enhancement. Preserve anatomical features, composition, and proportions exactly. Soft natural skin texture, warm gentle lighting, cinematic depth, realistic shading.`,
  realista: `Photorealistic newborn-style portrait based on this 3D ultrasound. Tight close-up framing on the face — face fills the majority of the frame. De-emphasize or crop limbs and surrounding body parts. Beautiful natural baby face with soft skin, gentle expression, dramatic warm lighting, professional studio mood.`,
};

const SKIN_TONES = {
  padrao: '',
  clara: ' Skin tone: fair, light complexion.',
  parda: ' Skin tone: warm medium brown, pardo Brazilian complexion.',
  negra: ' Skin tone: deep brown, dark skin.',
};

const COMMON_TAIL = `Crop out the ultrasound machine HUD (clinic name, patient ID, technical readings, side scale markers, 3D indicator, all overlay text and borders) — keep only the baby on a soft neutral background. Add two small, elegant labels discretely placed in opposite bottom corners of the image: "AI enhanced" in the bottom-right corner, and "Dr. Massuca" in the bottom-left corner. Both labels in the same delicate style, low opacity, sans-serif.`;

function buildPrompt(preset, skinTone) {
  const head = PRESETS[preset];
  const skin = SKIN_TONES[skinTone] || '';
  return `${head}${skin} ${COMMON_TAIL}`;
}

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

    const apiKey = process.env.GROK_API_KEY;
    if (!apiKey) return res.status(500).json({ error: 'GROK_API_KEY não configurada' });

    const { mediaId, preset, skinTone } = req.body || {};
    if (!mediaId || !UUID_RE.test(mediaId)) {
      return res.status(400).json({ error: 'mediaId inválido' });
    }
    if (!preset || !PRESETS[preset]) {
      return res.status(400).json({ error: 'preset inválido (fiel|medio|realista)' });
    }
    if (!skinTone || !(skinTone in SKIN_TONES)) {
      return res.status(400).json({ error: 'skinTone inválido (padrao|clara|parda|negra)' });
    }

    // Valida ownership + status
    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_media')
      .select(
        'id, kind, r2_key, source_media_id, memo_exams!inner ( id, patient_id, paid, expires_at )'
      )
      .eq('id', mediaId)
      .maybeSingle();
    if (error) throw error;
    if (!data) return res.status(404).json({ error: 'Mídia não encontrada' });
    if (data.source_media_id) {
      return res.status(400).json({ error: 'Não é possível melhorar uma imagem já melhorada' });
    }
    if (data.kind !== 'photo') {
      return res.status(400).json({ error: 'Apenas fotos podem ser melhoradas por enquanto' });
    }
    const exam = data.memo_exams;
    if (exam.patient_id !== patient.id) {
      return res.status(403).json({ error: 'Mídia não pertence à paciente' });
    }
    if (!exam.paid) return res.status(403).json({ error: 'Exame não pago' });
    if (exam.expires_at && new Date(exam.expires_at) < new Date()) {
      return res.status(403).json({ error: 'Acesso expirado' });
    }
    if (!data.r2_key) return res.status(404).json({ error: 'Mídia sem r2_key' });

    // Pré-checa saldo de créditos. Cobrança real ocorre só após sucesso da
    // xAI — assim erro técnico não consome créditos da paciente. Mas se a
    // paciente "descartar" o resultado depois de visto, continua cobrado
    // (custo Grok já foi incorrido).
    if ((patient.ai_credits || 0) < COST_PHOTO_ENHANCE) {
      return res.status(402).json({
        error: 'Saldo insuficiente de créditos de IA',
        balance: patient.ai_credits || 0,
        required: COST_PHOTO_ENHANCE,
      });
    }

    const imageUrl = await presignGetUrl({ key: data.r2_key, expiresInSeconds: 600 });
    const prompt = buildPrompt(preset, skinTone);

    const start = Date.now();
    const response = await fetch(XAI_EDIT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        prompt,
        image: { url: imageUrl, type: 'image_url' },
      }),
    });
    const ms = Date.now() - start;
    const text = await response.text();
    let body = null;
    try {
      body = JSON.parse(text);
    } catch (_) {
      /* não-JSON */
    }
    if (!response.ok) {
      const errMsg =
        body?.error?.message || body?.error || text.slice(0, 300) || `HTTP ${response.status}`;
      // Registra falha pra Dr. ver no painel — sem cobrar créditos da paciente
      recordAuditServer({
        patientId: patient.id,
        userId: user.id,
        action: 'patient.ai.fail',
        resourceType: 'media',
        resourceId: mediaId,
        ip: getClientIp(req),
        userAgent: req.headers['user-agent'] || null,
        metadata: {
          preset,
          skinTone,
          model: MODEL,
          ms,
          httpStatus: response.status,
          error: String(errMsg).slice(0, 500),
        },
      }).catch(e => console.error('[memo3d enhance-photo] audit fail err', e));
      return res.status(502).json({ error: `Erro na xAI: ${errMsg}`, ms });
    }
    const items = body?.data || body?.images || [];
    const generatedUrl = items
      .map(it => {
        if (typeof it === 'string') return it;
        if (it?.url) return it.url;
        if (it?.b64_json) return `data:image/jpeg;base64,${it.b64_json}`;
        return null;
      })
      .filter(Boolean)[0];

    if (!generatedUrl) {
      recordAuditServer({
        patientId: patient.id,
        userId: user.id,
        action: 'patient.ai.fail',
        resourceType: 'media',
        resourceId: mediaId,
        ip: getClientIp(req),
        userAgent: req.headers['user-agent'] || null,
        metadata: {
          preset,
          skinTone,
          model: MODEL,
          ms,
          error: 'xAI sem imagem no payload',
        },
      }).catch(e => console.error('[memo3d enhance-photo] audit fail err', e));
      return res.status(502).json({ error: 'xAI não retornou imagem', ms });
    }

    // Debita créditos AGORA (Grok já entregou). Se falhar o débito (ex.
    // saldo virou 0 entre check e debit), retorna 402 mas a imagem já
    // existe — improvável e dá pra logar.
    let newBalance;
    try {
      const result = await applyCredit({
        patientId: patient.id,
        delta: -COST_PHOTO_ENHANCE,
        reason: 'photo_enhance',
        metadata: { mediaId, preset, skinTone, model: MODEL, ms },
      });
      newBalance = result.balance;
    } catch (creditErr) {
      console.error('[memo3d enhance-photo] débito de créditos falhou', creditErr);
      if (creditErr.statusCode === 402) {
        return res.status(402).json({
          error: 'Saldo insuficiente — outra geração consumiu seus créditos',
          balance: creditErr.balance,
          required: creditErr.required,
        });
      }
      return res.status(500).json({ error: `Erro ao debitar créditos: ${creditErr.message}` });
    }

    await recordAuditServer({
      patientId: patient.id,
      userId: user.id,
      action: 'patient.ai.generate',
      resourceType: 'media',
      resourceId: mediaId,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { preset, skinTone, model: MODEL, ms, costUsd: COST_PER_IMAGE },
    });

    return res.status(200).json({
      generatedUrl,
      preset,
      skinTone,
      model: MODEL,
      costUsd: COST_PER_IMAGE,
      ms,
      promptUsed: prompt,
      creditsBalance: newBalance,
      creditsCost: COST_PHOTO_ENHANCE,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d enhance-photo]', err);
    return res.status(500).json({
      error: `Erro ao gerar: ${err?.message || 'desconhecido'}`,
    });
  }
}
