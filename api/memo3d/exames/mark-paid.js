/**
 * Memo3D — marcar exame como pago.
 *
 * POST /api/memo3d/exames/mark-paid
 * Body: { examId, amountCents? (default 5000 = R$50) }
 *
 * Trigger memo_calc_expiration calcula automaticamente expires_at do exame
 * (exam_date + 12 meses) e hard_delete_at (+ 30 dias) quando paid vira true.
 *
 * Ações no momento da marcação:
 *  1. Marca exame como pago (paid, paid_amount_cents, paid_by)
 *  2. Promove status da paciente pra 'active' se ainda 'pending'
 *  3. Modelo de assinatura: se a paciente não tem assinatura ativa
 *     (subscription_paid_at NULL ou + 1 ano expirada), ativa/renova com
 *     paid_at = now() — libera todos os exames da paciente por 1 ano.
 *  4. Na primeira ativação ou renovação, concede 100 créditos de IA.
 */
import { requireAdmin, getClientIp } from '../_lib/auth.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { applyCredit, INITIAL_GRANT } from '../_lib/credits.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const DEFAULT_AMOUNT_CENTS = 5000; // R$50 — preço padrão da assinatura anual
const ONE_YEAR_MS = 365 * 24 * 60 * 60 * 1000;

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
    const amount = Number.isFinite(amountCents) ? amountCents : DEFAULT_AMOUNT_CENTS;
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

    let subscriptionAction = 'none'; // 'activated' | 'renewed' | 'none'
    let creditsGranted = 0;

    if (exam.patient_id) {
      // Promove paciente pra active se ainda pending
      await client
        .from('memo_patients')
        .update({ status: 'active' })
        .eq('id', exam.patient_id)
        .eq('status', 'pending');

      // Lê estado da assinatura
      const { data: patient } = await client
        .from('memo_patients')
        .select('subscription_paid_at')
        .eq('id', exam.patient_id)
        .maybeSingle();

      const now = new Date();
      const subStart = patient?.subscription_paid_at
        ? new Date(patient.subscription_paid_at)
        : null;
      const subExpiresAt = subStart ? new Date(subStart.getTime() + ONE_YEAR_MS) : null;
      const subActive = subExpiresAt && subExpiresAt > now;

      if (!subStart) {
        subscriptionAction = 'activated';
      } else if (!subActive) {
        subscriptionAction = 'renewed';
      }

      if (subscriptionAction !== 'none') {
        await client
          .from('memo_patients')
          .update({
            subscription_paid_at: now.toISOString(),
            subscription_amount_cents: amount,
          })
          .eq('id', exam.patient_id);

        // Grant inicial de créditos (ou renovação)
        try {
          const { balance } = await applyCredit({
            patientId: exam.patient_id,
            delta: INITIAL_GRANT,
            reason: subscriptionAction === 'activated' ? 'initial_grant' : 'subscription_renewal',
            metadata: {
              exam_id: exam.id,
              amount_cents: amount,
              granted_by: user.id,
            },
          });
          creditsGranted = INITIAL_GRANT;
          console.log(
            `[memo3d mark-paid] subscription ${subscriptionAction} for patient ${exam.patient_id}, credits balance now ${balance}`
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
        expires_at: exam.expires_at,
        subscription_action: subscriptionAction,
        credits_granted: creditsGranted,
      },
    });

    return res.status(200).json({
      exam,
      subscriptionAction,
      creditsGranted,
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d mark-paid]', err);
    return res.status(500).json({ error: 'Erro ao marcar como pago' });
  }
}
