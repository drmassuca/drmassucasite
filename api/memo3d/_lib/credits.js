/**
 * Memo3D — helper pra créditos de IA.
 *
 * Toda mudança em memo_patients.ai_credits deve passar por aqui pra garantir
 * sincronia com memo_credit_ledger (audit trail). Saldo nunca pode ficar negativo.
 *
 * Constantes:
 *  - INITIAL_GRANT: créditos no momento da aquisição (cadastro da paciente)
 *  - COST_PHOTO_ENHANCE: custo de uma melhoria de foto via Grok
 */
import { getAdminClient } from './supabase-admin.js';

export const INITIAL_GRANT = 100;
export const COST_PHOTO_ENHANCE = 40;

/**
 * Aplica delta no saldo da paciente + registra no ledger.
 * Retorna { balance: <novo saldo>, ledgerId }.
 *
 * Se delta é negativo e saldo ficaria < 0, lança Error com statusCode 402.
 *
 * Não usa transação SQL (Supabase JS não tem nativo). Risco de race
 * condition é baixo no contexto da paciente (uma sessão tipicamente).
 *
 * @param {object} args
 * @param {string} args.patientId
 * @param {number} args.delta — positivo = ganho, negativo = consumo
 * @param {string} args.reason — initial_grant | photo_enhance | purchase_pix | ...
 * @param {object} [args.metadata]
 */
export async function applyCredit({ patientId, delta, reason, metadata }) {
  if (!patientId) throw new Error('applyCredit: patientId obrigatório');
  if (typeof delta !== 'number' || !Number.isInteger(delta)) {
    throw new Error('applyCredit: delta deve ser inteiro');
  }
  if (!reason) throw new Error('applyCredit: reason obrigatório');

  const client = getAdminClient();

  // Lê saldo atual
  const { data: patient, error: pErr } = await client
    .from('memo_patients')
    .select('ai_credits')
    .eq('id', patientId)
    .maybeSingle();
  if (pErr) throw pErr;
  if (!patient) throw new Error('Paciente não encontrada');

  const currentBalance = patient.ai_credits || 0;
  const newBalance = currentBalance + delta;
  if (newBalance < 0) {
    const err = new Error('Saldo insuficiente de créditos de IA');
    err.statusCode = 402;
    err.balance = currentBalance;
    err.required = -delta;
    throw err;
  }

  // Atualiza saldo (optimistic lock via WHERE ai_credits = currentBalance)
  const { data: updated, error: uErr } = await client
    .from('memo_patients')
    .update({ ai_credits: newBalance })
    .eq('id', patientId)
    .eq('ai_credits', currentBalance)
    .select('ai_credits')
    .maybeSingle();
  if (uErr) throw uErr;
  if (!updated) {
    // Saldo mudou entre read e write — conflito
    const err = new Error('Conflito de saldo, tente novamente');
    err.statusCode = 409;
    throw err;
  }

  // Registra no ledger
  const { data: ledgerRow, error: lErr } = await client
    .from('memo_credit_ledger')
    .insert({
      patient_id: patientId,
      delta,
      reason,
      balance_after: newBalance,
      metadata: metadata || null,
    })
    .select('id')
    .single();
  if (lErr) {
    // Ledger falhou mas saldo foi atualizado — log critical mas não reverte
    // (em prod isso pediria transação SQL via RPC).
    console.error('[memo3d credits] ledger insert failed but balance updated', {
      patientId,
      delta,
      reason,
      newBalance,
      error: lErr,
    });
    throw lErr;
  }

  return { balance: newBalance, ledgerId: ledgerRow.id };
}

/** Lê saldo + últimas N transações da paciente. */
export async function getCreditsState(patientId, ledgerLimit = 20) {
  const client = getAdminClient();

  const { data: patient, error: pErr } = await client
    .from('memo_patients')
    .select('ai_credits')
    .eq('id', patientId)
    .maybeSingle();
  if (pErr) throw pErr;
  if (!patient) throw new Error('Paciente não encontrada');

  const { data: ledger, error: lErr } = await client
    .from('memo_credit_ledger')
    .select('id, delta, reason, balance_after, metadata, created_at')
    .eq('patient_id', patientId)
    .order('created_at', { ascending: false })
    .limit(ledgerLimit);
  if (lErr) throw lErr;

  return {
    balance: patient.ai_credits || 0,
    ledger: ledger || [],
  };
}
