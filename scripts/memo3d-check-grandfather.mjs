/**
 * Read-only — mede o impacto de mudar pra "puro por-exame" nas pacientes
 * que têm assinatura do modelo antigo (subscription_paid_at setado).
 *
 * Para cada uma: total de exames vs exames já pagos individualmente.
 * Pacientes com exames NÃO pagos hoje veem esses exames via assinatura;
 * no modelo por-exame esses exames sumiriam até serem liberados.
 *
 *   node --env-file=.env scripts/memo3d-check-grandfather.mjs
 */
import { createClient } from '@supabase/supabase-js';

const url = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const db = createClient(url, key, { auth: { persistSession: false } });
const now = new Date().toISOString();

const { data: subs, error } = await db
  .from('memo_patients')
  .select('id, full_name, subscription_paid_at, memo_exams(id, paid, expires_at)')
  .not('subscription_paid_at', 'is', null)
  .neq('status', 'deleted');
if (error) throw error;

let totalAfetadas = 0;
let totalExamesQueSomem = 0;
const afetadas = [];

for (const p of subs || []) {
  const exames = p.memo_exams || [];
  // Exames hoje VISÍVEIS via assinatura mas que NÃO sumiriam (já pagos e não expirados)
  const visiveisPorExame = exames.filter(e => e.paid === true && e.expires_at && e.expires_at > now);
  // Exames que HOJE a paciente vê (via assinatura) mas SUMIRIAM (não pagos individual)
  const sumiriam = exames.filter(e => !(e.paid === true && e.expires_at && e.expires_at > now));
  if (sumiriam.length > 0) {
    totalAfetadas++;
    totalExamesQueSomem += sumiriam.length;
    afetadas.push({
      nome: p.full_name,
      total: exames.length,
      ficam: visiveisPorExame.length,
      somem: sumiriam.length,
    });
  }
}

console.log('═══ Impacto de "puro por-exame" nas 21 pacientes com assinatura ═══');
console.log(`Pacientes com assinatura: ${subs?.length || 0}`);
console.log(`Pacientes que PERDERIAM acesso a algum exame: ${totalAfetadas}`);
console.log(`Total de exames que sumiriam da visão: ${totalExamesQueSomem}`);
console.log('');
if (afetadas.length) {
  console.log('Detalhe das afetadas:');
  for (const a of afetadas) {
    console.log(`   - ${a.nome}: ${a.total} exames | ${a.ficam} ficam | ${a.somem} somem`);
  }
} else {
  console.log('✔ Nenhuma paciente perde acesso — todas já têm os exames pagos individualmente.');
  console.log('  Mudar pra puro por-exame é seguro.');
}
console.log('');
console.log('✔ Verificação concluída (nada foi alterado).');
