/**
 * Memo3D — webhook do Mercado Pago.
 *
 * POST /api/memo3d/webhooks/mercadopago
 *
 * Segurança:
 *  - HMAC-SHA256 da assinatura (header x-signature) com MP_WEBHOOK_SECRET.
 *  - Sem assinatura válida → 401, NÃO processamos nada.
 *  - Validação de external_reference (pix_{patientId}_{packId}_{ts}).
 *  - Validação do valor pago vs. preço do pack (defesa contra manipulação do checkout).
 *  - Idempotência via UNIQUE INDEX em mp_payment_id.
 *  - Tratamento de refunded / charged_back: reverte créditos via applyCredit.
 *
 * Fonte da verdade pra creditar saldo é este webhook — nenhum outro endpoint
 * deve adicionar créditos a partir de uma intent de compra.
 */
import { Payment } from 'mercadopago';
import { getMpClient, verifyWebhookSignature } from '../_lib/mercadopago.js';
import { getAdminClient, recordAuditServer } from '../_lib/supabase-admin.js';
import { getPack } from '../_lib/credit-packs.js';
import { applyCredit } from '../_lib/credits.js';

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
const PRICE_TOLERANCE_BRL = 0.5; // R$ 0.50 — arredondamentos do MP

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  try {
    const xSignature = req.headers['x-signature'];
    const xRequestId = req.headers['x-request-id'];

    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : req.body || {};
    const { type, data } = body;
    const dataId = data?.id ? String(data.id) : '';

    if (!verifyWebhookSignature({ dataId, xSignature, xRequestId })) {
      console.warn('[memo3d webhook MP] assinatura inválida — rejeitado', { xRequestId });
      return res.status(401).end();
    }

    if (!dataId) {
      // Notificação de teste ou sem id — ack pra MP não retentar
      return res.status(200).end();
    }

    if (type === 'payment') {
      await handlePayment(dataId);
    } else {
      // Outros tipos (subscription_preapproval, plan, etc) — ignora por ora
      console.info('[memo3d webhook MP] tipo ignorado', { type, dataId });
    }

    return res.status(200).end();
  } catch (err) {
    console.error('[memo3d webhook MP] erro', err);
    // 500 → MP vai retentar (boa prática pra erros transitórios)
    return res.status(500).end();
  }
}

/**
 * Processa notificação de pagamento (compra avulsa de pack de créditos).
 */
async function handlePayment(paymentId) {
  const mp = getMpClient();
  const payment = await new Payment(mp).get({ id: paymentId });

  const externalRef = payment.external_reference;
  if (!externalRef) {
    console.warn('[memo3d webhook MP] payment sem external_reference', { paymentId });
    return;
  }

  // Esperamos: pix_{patientId}_{packId}_{ts}
  const parts = externalRef.split('_');
  if (parts[0] !== 'pix' || parts.length < 4) {
    console.info('[memo3d webhook MP] external_reference fora do formato Memo3D — ignora', {
      paymentId,
      externalRef,
    });
    return;
  }
  const patientId = parts[1];
  const packId = parts[2];

  if (!UUID_RE.test(patientId)) {
    console.warn('[memo3d webhook MP] patientId inválido', { paymentId, patientId });
    return;
  }
  const pack = getPack(packId);
  if (!pack) {
    console.warn('[memo3d webhook MP] packId desconhecido', { paymentId, packId });
    return;
  }

  const supabase = getAdminClient();

  // Localiza a row de intent
  const { data: purchase, error: purchaseErr } = await supabase
    .from('memo_pix_purchases')
    .select('id, patient_id, pack_id, credits, amount_brl, status, ledger_id')
    .eq('external_reference', externalRef)
    .maybeSingle();
  if (purchaseErr) throw purchaseErr;
  if (!purchase) {
    console.warn('[memo3d webhook MP] purchase não encontrada', { externalRef, paymentId });
    return;
  }
  if (purchase.patient_id !== patientId || purchase.pack_id !== packId) {
    console.warn('[memo3d webhook MP] mismatch entre external_reference e purchase', {
      externalRef,
      purchase,
    });
    return;
  }

  console.info('[memo3d webhook MP] payment status', {
    paymentId,
    status: payment.status,
    amount: payment.transaction_amount,
    purchaseId: purchase.id,
  });

  if (payment.status === 'approved') {
    await handleApproved({ supabase, payment, paymentId, purchase, pack });
  } else if (payment.status === 'rejected' || payment.status === 'cancelled') {
    await handleFailed({ supabase, paymentId, purchase, status: payment.status });
  } else if (payment.status === 'refunded' || payment.status === 'charged_back') {
    await handleRefunded({ supabase, paymentId, purchase, status: payment.status });
  } else {
    // pending, in_process, authorized, in_mediation — só registra
    console.info('[memo3d webhook MP] status intermediário — sem mudança', {
      paymentId,
      status: payment.status,
    });
  }
}

async function handleApproved({ supabase, payment, paymentId, purchase, pack }) {
  // Defesa contra manipulação: o valor pago precisa bater com o pack
  const paidAmount = Number(payment.transaction_amount ?? 0);
  const expectedAmount = Number(pack.priceBrl);
  if (paidAmount + PRICE_TOLERANCE_BRL < expectedAmount) {
    console.error('[memo3d webhook MP] valor pago menor que o esperado — rejeitado', {
      paymentId,
      paidAmount,
      expectedAmount,
      purchaseId: purchase.id,
    });
    await supabase
      .from('memo_pix_purchases')
      .update({
        status: 'rejected',
        mp_payment_id: paymentId,
        metadata: {
          rejection_reason: 'underpayment',
          paid_amount: paidAmount,
          expected_amount: expectedAmount,
        },
      })
      .eq('id', purchase.id)
      .eq('status', 'pending');
    return;
  }

  // Idempotência: se já está approved, não reprocessa
  if (purchase.status === 'approved') {
    console.info('[memo3d webhook MP] compra já aprovada — ignorando duplicata', {
      paymentId,
      purchaseId: purchase.id,
    });
    return;
  }

  // Atualiza status pra approved (apenas a partir de pending pra evitar reprocesso)
  // mp_payment_id tem unique index → segunda tentativa quebra aqui
  const { data: updated, error: updateErr } = await supabase
    .from('memo_pix_purchases')
    .update({
      status: 'approved',
      mp_payment_id: paymentId,
      confirmed_at: new Date().toISOString(),
    })
    .eq('id', purchase.id)
    .eq('status', 'pending')
    .select('id')
    .maybeSingle();

  if (updateErr) {
    if (updateErr.code === '23505') {
      console.info('[memo3d webhook MP] mp_payment_id duplicado — provavelmente já processado', {
        paymentId,
      });
      return;
    }
    throw updateErr;
  }
  if (!updated) {
    console.info('[memo3d webhook MP] nenhuma linha pending — provavelmente já processado', {
      paymentId,
      purchaseId: purchase.id,
    });
    return;
  }

  // Credita
  const result = await applyCredit({
    patientId: purchase.patient_id,
    delta: purchase.credits,
    reason: 'purchase_pix',
    metadata: {
      purchase_id: purchase.id,
      pack_id: purchase.pack_id,
      mp_payment_id: paymentId,
      amount_brl: purchase.amount_brl,
    },
  });

  // Liga a purchase ao ledger pra auditoria fácil
  await supabase
    .from('memo_pix_purchases')
    .update({ ledger_id: result.ledgerId })
    .eq('id', purchase.id);

  await recordAuditServer({
    patientId: purchase.patient_id,
    action: 'patient.credits.purchase_approved',
    resourceType: 'memo_pix_purchases',
    resourceId: purchase.id,
    metadata: {
      pack_id: purchase.pack_id,
      credits: purchase.credits,
      amount_brl: purchase.amount_brl,
      mp_payment_id: paymentId,
      new_balance: result.balance,
    },
  }).catch(err => console.error('[memo3d audit]', err));

  console.info('[memo3d webhook MP] compra aprovada e creditada', {
    paymentId,
    purchaseId: purchase.id,
    credits: purchase.credits,
    newBalance: result.balance,
  });
}

async function handleFailed({ supabase, paymentId, purchase, status }) {
  await supabase
    .from('memo_pix_purchases')
    .update({
      status: status === 'cancelled' ? 'cancelled' : 'rejected',
      mp_payment_id: paymentId,
    })
    .eq('id', purchase.id)
    .eq('status', 'pending');

  console.info('[memo3d webhook MP] compra falhou', { paymentId, status, purchaseId: purchase.id });
}

async function handleRefunded({ supabase, paymentId, purchase, status }) {
  // Idempotência
  if (purchase.status === 'refunded') {
    console.info('[memo3d webhook MP] compra já refundada', { paymentId });
    return;
  }

  // Só reverte créditos se a compra estava approved (créditos foram dados)
  const wasApproved = purchase.status === 'approved';

  await supabase
    .from('memo_pix_purchases')
    .update({
      status: 'refunded',
      mp_payment_id: paymentId,
      refunded_at: new Date().toISOString(),
    })
    .eq('id', purchase.id);

  if (wasApproved) {
    try {
      const result = await applyCredit({
        patientId: purchase.patient_id,
        delta: -purchase.credits,
        reason: status === 'charged_back' ? 'chargeback' : 'refund',
        metadata: {
          purchase_id: purchase.id,
          pack_id: purchase.pack_id,
          mp_payment_id: paymentId,
        },
      });
      console.warn('[memo3d webhook MP] créditos revertidos por estorno', {
        paymentId,
        purchaseId: purchase.id,
        credits: purchase.credits,
        newBalance: result.balance,
      });
    } catch (err) {
      // Saldo pode estar < credits revertidos (paciente já gastou) — log e segue.
      // Em prod, regra de negócio decide se aceita saldo negativo ou não.
      console.error('[memo3d webhook MP] falha ao reverter créditos no estorno', {
        paymentId,
        purchaseId: purchase.id,
        error: err.message,
      });
    }
  }

  await recordAuditServer({
    patientId: purchase.patient_id,
    action: 'patient.credits.purchase_refunded',
    resourceType: 'memo_pix_purchases',
    resourceId: purchase.id,
    metadata: {
      pack_id: purchase.pack_id,
      credits: purchase.credits,
      amount_brl: purchase.amount_brl,
      mp_payment_id: paymentId,
      mp_status: status,
      reverted: wasApproved,
    },
  }).catch(err => console.error('[memo3d audit]', err));
}
