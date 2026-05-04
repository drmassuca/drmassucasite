/**
 * Memo3D — criar exame para uma paciente.
 *
 * POST /api/memo3d/exames/create
 * Body: { patientId, examDate (YYYY-MM-DD), examType?, device?, notes? }
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

const VALID_TYPES = [
  'morfologico_1tri',
  'morfologico_2tri',
  'doppler',
  'obstetrico',
  '4d',
  'outro',
];
const VALID_DEVICES = ['voluson_s10', 'hera_z20'];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { patientId, examDate, examType, device, notes } = req.body || {};

    if (!patientId || !UUID_RE.test(patientId)) {
      return res.status(400).json({ error: 'patientId inválido' });
    }
    if (!examDate || !DATE_RE.test(examDate)) {
      return res.status(400).json({ error: 'examDate em formato YYYY-MM-DD' });
    }
    if (examType && !VALID_TYPES.includes(examType)) {
      return res.status(400).json({
        error: `examType inválido. Aceitos: ${VALID_TYPES.join(', ')}`,
      });
    }
    if (device && !VALID_DEVICES.includes(device)) {
      return res.status(400).json({
        error: `device inválido. Aceitos: ${VALID_DEVICES.join(', ')}`,
      });
    }

    const client = getAdminClient();
    const { data, error } = await client
      .from('memo_exams')
      .insert({
        patient_id: patientId,
        exam_date: examDate,
        exam_type: examType || null,
        device: device || null,
        notes: notes?.trim() || null,
        created_by: user.id,
      })
      .select()
      .single();

    if (error) {
      if (error.code === '23503') {
        return res.status(404).json({ error: 'Paciente não encontrada' });
      }
      throw error;
    }

    await recordAuditServer({
      patientId,
      userId: user.id,
      action: 'exam.create',
      resourceType: 'exam',
      resourceId: data.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: {
        exam_date: data.exam_date,
        exam_type: data.exam_type,
        device: data.device,
      },
    });

    return res.status(201).json({ exam: data });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d exam create]', err);
    return res.status(500).json({ error: 'Erro interno ao criar exame' });
  }
}
