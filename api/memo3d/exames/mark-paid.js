/**
 * Memo3D — marcar exame como pago.
 *
 * POST /api/memo3d/exames/mark-paid
 * Body: { examId, amountCents? (default 3000) }
 *
 * Trigger memo_calc_expiration calcula automaticamente expires_at
 * (exam_date + 12 meses) e hard_delete_at (+ 30 dias) quando paid
 * vira true.
 *
 * Também atualiza status da paciente pra 'active' se ainda 'pending'.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { examId, amountCents } = req.body || {};

    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'examId inválido' });
    }
    const amount = Number.isFinite(amountCents) ? amountCents : 3000;
    if (amount < 0 || amount > 1000000) {
      return res.status(400).json({ error: 'amountCents fora do intervalo razoável' });
    }

    const client = getAdminClient();
    const { data: exam, error } = await client
      .from('memo_exams')
      .update({
        paid: true,
        paid_amount_cents: amount,
        paid_by: user.id,
      })
      .eq('id', examId)
      .select()
      .single();

    if (error) throw error;
    if (!exam) return res.status(404).json({ error: 'Exame não encontrado' });

    // Promove paciente pra active se ainda pending
    if (exam.patient_id) {
      await client
        .from('memo_patients')
        .update({ status: 'active' })
        .eq('id', exam.patient_id)
        .eq('status', 'pending');
    }

    await recordAuditServer({
      patientId: exam.patient_id,
      userId: user.id,
      action: 'exam.mark_paid',
      resourceType: 'exam',
      resourceId: exam.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: { amount_cents: amount, expires_at: exam.expires_at },
    });

    return res.status(200).json({ exam });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d mark-paid]', err);
    return res.status(500).json({ error: 'Erro ao marcar como pago' });
  }
}
