/**
 * Memo3D Admin — painel de atividade agregada.
 *
 * GET /api/memo3d/admin/activity?from=ISO&to=ISO&type=action1,action2&patientId=uuid&page=1&pageSize=50
 *
 * Retorna:
 *  - summary: contadores totais e por tipo no período
 *  - patientStats: top pacientes com contagem
 *  - events: tabela paginada de eventos (com patient embed)
 *  - knownActions: lista de actions distintas pra montar filtros
 *
 * Lê de memo_audit_log + memo_credit_ledger (compras de crédito quando
 * Richard implementar entram aqui também).
 *
 * Nota: PostgREST embedded select entre memo_audit_log e memo_patients
 * exige FK formal, que não existe. Em vez disso, fazemos 2 queries e
 * juntamos no JS pra evitar mudança de schema.
 */
import { requireAdmin } from '../_lib/auth.js';
import { getAdminClient } from '../_lib/supabase-admin.js';

const DEFAULT_PAGE_SIZE = 50;
const MAX_PAGE_SIZE = 200;

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }
  try {
    await requireAdmin(req);

    const { from, to, type, patientId, page, pageSize } = req.query || {};
    const fromIso = from ? new Date(from).toISOString() : null;
    const toIso = to ? new Date(to).toISOString() : null;
    const types = type ? String(type).split(',').filter(Boolean) : null;
    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limit = Math.min(MAX_PAGE_SIZE, parseInt(pageSize, 10) || DEFAULT_PAGE_SIZE);
    const offset = (pageNum - 1) * limit;

    const client = getAdminClient();

    // 1. Eventos paginados (sem embed — fazer JOIN no JS depois)
    let eventsQuery = client
      .from('memo_audit_log')
      .select(
        'id, action, resource_type, resource_id, patient_id, user_id, ip, user_agent, metadata, created_at',
        { count: 'exact' }
      )
      .order('created_at', { ascending: false });

    if (fromIso) eventsQuery = eventsQuery.gte('created_at', fromIso);
    if (toIso) eventsQuery = eventsQuery.lte('created_at', toIso);
    if (types?.length) eventsQuery = eventsQuery.in('action', types);
    if (patientId) eventsQuery = eventsQuery.eq('patient_id', patientId);

    const eventsRes = await eventsQuery.range(offset, offset + limit - 1);
    if (eventsRes.error) throw eventsRes.error;

    // 2. Resumo agregado — todas actions no período (paginação ignorada)
    let summaryQuery = client.from('memo_audit_log').select('action', { count: 'exact' });
    if (fromIso) summaryQuery = summaryQuery.gte('created_at', fromIso);
    if (toIso) summaryQuery = summaryQuery.lte('created_at', toIso);
    if (patientId) summaryQuery = summaryQuery.eq('patient_id', patientId);
    const summaryRes = await summaryQuery;
    if (summaryRes.error) throw summaryRes.error;

    // Conta por action (no JS — Supabase JS não tem GROUP BY direto)
    const byAction = {};
    (summaryRes.data || []).forEach(row => {
      byAction[row.action] = (byAction[row.action] || 0) + 1;
    });

    // 3. Top pacientes (sem embed)
    let patientStats = [];
    if (!patientId) {
      let psQuery = client
        .from('memo_audit_log')
        .select('patient_id')
        .not('patient_id', 'is', null);
      if (fromIso) psQuery = psQuery.gte('created_at', fromIso);
      if (toIso) psQuery = psQuery.lte('created_at', toIso);
      const ps = await psQuery;
      if (!ps.error) {
        const acc = {};
        (ps.data || []).forEach(r => {
          if (!r.patient_id) return;
          if (!acc[r.patient_id]) {
            acc[r.patient_id] = { patient_id: r.patient_id, count: 0 };
          }
          acc[r.patient_id].count += 1;
        });
        patientStats = Object.values(acc)
          .sort((a, b) => b.count - a.count)
          .slice(0, 10);
      }
    }

    // 4. Junta nomes das pacientes (uma única query pra todos os IDs únicos)
    const patientIdsSet = new Set();
    (eventsRes.data || []).forEach(e => {
      if (e.patient_id) patientIdsSet.add(e.patient_id);
    });
    patientStats.forEach(p => patientIdsSet.add(p.patient_id));

    let patientsById = {};
    if (patientIdsSet.size > 0) {
      const { data: patients, error: pErr } = await client
        .from('memo_patients')
        .select('id, full_name, phone')
        .in('id', Array.from(patientIdsSet));
      if (!pErr && patients) {
        patientsById = patients.reduce((acc, p) => {
          acc[p.id] = p;
          return acc;
        }, {});
      }
    }

    // Anexa memo_patients em events e patientStats
    const events = (eventsRes.data || []).map(e => ({
      ...e,
      memo_patients: e.patient_id ? patientsById[e.patient_id] || null : null,
    }));
    patientStats = patientStats.map(p => ({
      ...p,
      full_name: patientsById[p.patient_id]?.full_name || '—',
    }));

    // 5. Compras de crédito — pega do ledger (reason = purchase_pix)
    let purchasesCount = 0;
    let purchasesAmountCents = 0;
    {
      let pq = client
        .from('memo_credit_ledger')
        .select('delta, metadata, created_at, patient_id')
        .eq('reason', 'purchase_pix');
      if (fromIso) pq = pq.gte('created_at', fromIso);
      if (toIso) pq = pq.lte('created_at', toIso);
      if (patientId) pq = pq.eq('patient_id', patientId);
      const pr = await pq;
      if (!pr.error) {
        purchasesCount = (pr.data || []).length;
        purchasesAmountCents = (pr.data || []).reduce(
          (sum, row) => sum + (row.metadata?.amount_cents || 0),
          0
        );
      }
    }

    const knownActions = Object.keys(byAction).sort();

    return res.status(200).json({
      summary: {
        totalEvents: summaryRes.count || 0,
        byAction,
        purchasesCount,
        purchasesAmountCents,
      },
      patientStats,
      knownActions,
      events,
      pagination: {
        page: pageNum,
        pageSize: limit,
        totalCount: eventsRes.count || 0,
        totalPages: Math.ceil((eventsRes.count || 0) / limit),
      },
    });
  } catch (err) {
    if (err.statusCode) return res.status(err.statusCode).json({ error: err.message });
    console.error('[memo3d admin activity]', err);
    return res.status(500).json({
      error: `Erro ao buscar atividade: ${err?.message || 'desconhecido'}`,
    });
  }
}
