/**
 * Memo3D — liberar exame (pago R$30 ou cortesia).
 *
 * POST /api/memo3d/exames/mark-paid
 * Body: { examId, amountCents? (default 3000 = R$30), courtesy? (bool) }
 *
 * Modelo de cobrança (migration 009): cobrança POR EXAME.
 *  - Cada exame é liberado individualmente — só assim a paciente vê aquele exame.
 *  - Preço padrão R$30. courtesy=true → grava R$0 e marca courtesy (fora da receita).
 *  - Toda liberação NOVA concede +100 créditos de IA, acumulando.
 *
 * Trigger memo_calc_expiration calcula automaticamente expires_at do exame
 * (exam_date + 12 meses) e hard_delete_at (+ 30 dias) quando paid vira true.
 *
 * Ações no momento da liberação:
 *  1. Marca exame como pago (paid, paid_amount_cents, paid_by, courtesy)
 *  2. Promove status da paciente pra 'active' se ainda 'pending'
 *  3. Se for a PRIMEIRA liberação deste exame (transição não-pago → pago),
 *     concede 100 créditos de IA. Re-marcar exame já pago não concede de novo.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { applyCredit, INITIAL_GRANT } from '../_lib/credits.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEFAULT_AMOUNT_CENTS = 3000; // R$30 — preço padrão por exame

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    const user = await requireAdmin(req);
    const { examId, amountCents, courtesy } = req.body || {};

    if (!examId || !UUID_RE.test(examId)) {
      return res.status(400).json({ error: 'examId inválido' });
    }

    const isCourtesy = courtesy === true;
    const amount = isCourtesy ? 0 : Number.isFinite(amountCents) ? amountCents : DEFAULT_AMOUNT_CENTS;
    if (amount < 0 || amount > 1000000) {
      return res.status(400).json({ error: 'amountCents fora do intervalo razoável' });
    }

    const client = getAdminClient();

    // Lê estado atual pra saber se é a primeira liberação (transição → pago)
    const { data: existing, error: readErr } = await client
      .from('memo_exams')
      .select('id, paid, patient_id')
      .eq('id', examId)
      .maybeSingle();
    if (readErr) throw readErr;
    if (!existing) return res.status(404).json({ error: 'Exame não encontrado' });

    const wasPaid = existing.paid === true;

    const { data: exam, error } = await client
      .from('memo_exams')
      .update({
        paid: true,
        paid_amount_cents: amount,
        paid_by: user.id,
        courtesy: isCourtesy,
      })
      .eq('id', examId)
      .select()
      .single();

    if (error) throw error;

    let creditsGranted = 0;

    if (exam.patient_id) {
      // Promove paciente pra active se ainda pending
      await client
        .from('memo_patients')
        .update({ status: 'active' })
        .eq('id', exam.patient_id)
        .eq('status', 'pending');

      // Concede créditos só na primeira liberação deste exame (não em re-marcações)
      if (!wasPaid) {
        try {
          const { balance } = await applyCredit({
            patientId: exam.patient_id,
            delta: INITIAL_GRANT,
            reason: isCourtesy ? 'exam_courtesy' : 'exam_paid',
            metadata: {
              exam_id: exam.id,
              amount_cents: amount,
              courtesy: isCourtesy,
              granted_by: user.id,
            },
          });
          creditsGranted = INITIAL_GRANT;
          console.log(
            `[memo3d mark-paid] exam ${exam.id} liberado (${
              isCourtesy ? 'cortesia' : 'R$' + amount / 100
            }), créditos da paciente agora ${balance}`
          );
        } catch (creditErr) {
          console.error('[memo3d mark-paid] grant de créditos falhou', creditErr);
        }
      }
    }

    await recordAuditServer({
      patientId: exam.patient_id,
      userId: user.id,
      action: 'exam.mark_paid',
      resourceType: 'exam',
      resourceId: exam.id,
      ip: getClientIp(req),
      userAgent: req.headers['user-agent'] || null,
      metadata: {
        amount_cents: amount,
        courtesy: isCourtesy,
        expires_at: exam.expires_at,
        credits_granted: creditsGranted,
      },
    });

    return res.status(200).json({
      exam,
      courtesy: isCourtesy,
      creditsGranted,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d mark-paid]', err);
    return res.status(500).json({ error: 'Erro ao liberar exame' });
  }
}
