/**
 * Memo3D Admin — galeria de imagens geradas por IA pelas pacientes.
 *
 * GET /api/memo3d/admin/ai-gallery?from=ISO&to=ISO&patientId=uuid&page=1&pageSize=24
 *
 * Lista imagens IA (memo_media com source_media_id preenchido) com:
 *  - URL assinada da imagem IA + da imagem original
 *  - Nome da paciente, exam date
 *  - ai_metadata (preset, skinTone, model, costUsd, ms)
 *
 * JOIN feito no JS (memo_patients e memo_media source não têm FK declarada
 * pra embedded select — segue padrão do painel de Atividade).
 */
import { requireAdmin } from '../_lib/auth.js';
import { getAdminClient } from '../_lib/supabase-admin.js';
import { presignGetUrl } from '../_lib/r2-server.js';

const DEFAULT_PAGE_SIZE = 24;
const MAX_PAGE_SIZE = 96;
const URL_TTL = 1800; // 30 min — recarrega quando expira

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);

    const { from, to, patientId, page, pageSize } = req.query || {};
    const fromIso = from ? new Date(from).toISOString() : null;
    const toIso = to ? new Date(to).toISOString() : null;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limit = Math.min(MAX_PAGE_SIZE, parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE);
    const offset = (pageNum - 1) * limit;

    const client = getAdminClient();

    // 1. Lista fotos IA paginadas
    let query = client
      .from('memo_media')
      .select('id, kind, filename, r2_key, source_media_id, ai_metadata, uploaded_at, exam_id', {
        count: 'exact',
      })
      .not('source_media_id', 'is', null)
      .eq('kind', 'photo')
      .order('uploaded_at', { ascending: false });

    if (fromIso) query = query.gte('uploaded_at', fromIso);
    if (toIso) query = query.lte('uploaded_at', toIso);

    const mediaRes = await query.range(offset, offset + limit - 1);
    if (mediaRes.error) throw mediaRes.error;

    const aiMedias = mediaRes.data || [];

    // 2. Pega exames pra ter exam_date + patient_id
    const examIds = Array.from(new Set(aiMedias.map(m => m.exam_id).filter(Boolean)));
    let examsById = {};
    if (examIds.length > 0) {
      const { data: exams } = await client
        .from('memo_exams')
        .select('id, patient_id, exam_date, exam_type, device')
        .in('id', examIds);
      examsById = (exams || []).reduce((acc, e) => {
        acc[e.id] = e;
        return acc;
      }, {});
    }

    // 3. Filtra por patientId se passado (no JS porque a relação é via exam)
    let filtered = aiMedias;
    if (patientId) {
      filtered = aiMedias.filter(m => examsById[m.exam_id]?.patient_id === patientId);
    }

    // 4. Pega nomes das pacientes
    const patientIds = Array.from(
      new Set(filtered.map(m => examsById[m.exam_id]?.patient_id).filter(Boolean))
    );
    let patientsById = {};
    if (patientIds.length > 0) {
      const { data: patients } = await client
        .from('memo_patients')
        .select('id, full_name')
        .in('id', patientIds);
      patientsById = (patients || []).reduce((acc, p) => {
        acc[p.id] = p;
        return acc;
      }, {});
    }

    // 5. Pega source_media (foto original) pra ter r2_key e gerar URL antes/depois
    const sourceIds = Array.from(new Set(filtered.map(m => m.source_media_id).filter(Boolean)));
    let sourcesById = {};
    if (sourceIds.length > 0) {
      const { data: sources } = await client
        .from('memo_media')
        .select('id, r2_key, filename')
        .in('id', sourceIds);
      sourcesById = (sources || []).reduce((acc, s) => {
        acc[s.id] = s;
        return acc;
      }, {});
    }

    // 6. Pra cada item, gera URLs assinadas (IA + original)
    const items = await Promise.all(
      filtered.map(async m => {
        const exam = examsById[m.exam_id];
        const patient = exam ? patientsById[exam.patient_id] : null;
        const source = sourcesById[m.source_media_id];

        let aiUrl = null;
        let originalUrl = null;
        try {
          if (m.r2_key) aiUrl = await presignGetUrl({ key: m.r2_key, expiresInSeconds: URL_TTL });
        } catch (_) {
          /* segue null */
        }
        try {
          if (source?.r2_key) {
            originalUrl = await presignGetUrl({ key: source.r2_key, expiresInSeconds: URL_TTL });
          }
        } catch (_) {
          /* segue null */
        }

        return {
          id: m.id,
          uploadedAt: m.uploaded_at,
          filename: m.filename,
          aiUrl,
          originalUrl,
          aiMetadata: m.ai_metadata || {},
          patient: patient ? { id: patient.id, fullName: patient.full_name } : null,
          exam: exam
            ? {
                id: exam.id,
                date: exam.exam_date,
                type: exam.exam_type,
                device: exam.device,
              }
            : null,
        };
      })
    );

    return res.status(200).json({
      items,
      pagination: {
        page: pageNum,
        pageSize: limit,
        totalCount: mediaRes.count || 0,
        totalPages: Math.ceil((mediaRes.count || 0) / limit),
      },
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d admin ai-gallery]', err);
    return res.status(500).json({
      error: `Erro ao buscar galeria IA: ${err?.message || 'desconhecido'}`,
    });
  }
}
