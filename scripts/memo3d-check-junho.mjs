/**
 * Read-only — confere o estado de "Valores" do Memo3D na virada do mês.
 * Não altera nada. Roda com:
 *   node --env-file=.env scripts/memo3d-check-junho.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const db = createClient(url, key, { auth: { persistSession: false } });

const now = new Date();
const startOfMonth = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString();
const brl = c => `R$ ${((c || 0) / 100).toFixed(2).replace('.', ',')}`;

// 1) Receita do mês (mesma query do Dashboard): exames com paid_at >= 1o do mês
const { data: monthPaid, error: e1 } = await db
  .from('memo_exams')
  .select('id, patient_id, paid_at, paid_amount_cents')
  .gte('paid_at', startOfMonth);
if (e1) throw e1;

const monthCents = (monthPaid || []).reduce((s, r) => s + (r.paid_amount_cents || 0), 0);

console.log('═══ Memo3D — estado de Valores ═══');
console.log('Início do mês (UTC):', startOfMonth);
console.log('');
console.log(`Exames com paid_at neste mês: ${monthPaid?.length || 0}`);
console.log(`Receita do mês (soma): ${brl(monthCents)}`);
if (monthPaid?.length) {
  console.log('  Detalhe:');
  for (const r of monthPaid) {
    console.log(
      `   - exam ${r.id.slice(0, 8)} | ${brl(r.paid_amount_cents)} | paid_at ${r.paid_at}`
    );
  }
}

// 2) Total histórico de exames pagos (contexto)
const { count: totalPaid } = await db
  .from('memo_exams')
  .select('id', { count: 'exact', head: true })
  .eq('paid', true);
console.log('');
console.log(`Total de exames pagos (todos os meses): ${totalPaid ?? '?'}`);

// 3) Pacientes com assinatura setada (modelo antigo R$50) — contexto p/ grandfather
const { data: subs } = await db
  .from('memo_patients')
  .select('id, full_name, subscription_paid_at, status')
  .not('subscription_paid_at', 'is', null)
  .neq('status', 'deleted');
console.log('');
console.log(`Pacientes com subscription_paid_at setado (modelo antigo): ${subs?.length || 0}`);
for (const p of subs || []) {
  console.log(`   - ${p.full_name} (${p.status}) desde ${p.subscription_paid_at}`);
}

console.log('');
console.log('✔ Verificação concluída (nada foi alterado).');
