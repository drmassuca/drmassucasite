import { useEffect, useMemo, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  Filter,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  Search,
  RefreshCw,
} from 'lucide-react';
import { getAdminActivity } from '../../../lib/memo3d/api';
import './memo3d.css';

const ACTION_LABELS = {
  'patient.login': '🔑 Login',
  'patient.create': '👤 Cadastro',
  'patient.media.view': '👁️ Visualizou foto',
  'patient.media.download': '⬇️ Baixou foto',
  'patient.share.create.client': '🔗 Gerou link família',
  'patient.share.create': '🔗 Gerou link família',
  'family.share.view': '👨‍👩‍👧 Família abriu link',
  'patient.ai.generate': '✨ Gerou IA',
  'patient.ai.save': '💾 Salvou IA',
  'patient.ai.fail': '❌ Falha IA',
  'patient.credit.purchase': '💳 Comprou créditos',
  'exam.mark_paid': '💰 Exame pago',
  'exam.create': '📋 Exame criado',
  'media.upload.client': '📤 Upload de mídia',
};

function actionLabel(action) {
  return ACTION_LABELS[action] || action;
}

function maskIp(ip) {
  if (!ip) return '—';
  const v4 = /^(\d+)\.(\d+)\.(\d+)\.(\d+)$/.exec(ip);
  if (v4) return `${v4[1]}.${v4[2]}.${v4[3]}.•••`;
  if (ip.includes(':')) return ip.split(':').slice(0, 3).join(':') + ':•••';
  return ip;
}

function parseUserAgent(ua) {
  if (!ua) return '—';
  const lc = ua.toLowerCase();
  let device = 'PC';
  if (lc.includes('iphone')) device = 'iPhone';
  else if (lc.includes('ipad')) device = 'iPad';
  else if (lc.includes('android')) device = 'Android';
  else if (lc.includes('mac os')) device = 'Mac';
  else if (lc.includes('windows')) device = 'Win';
  let browser = '';
  if (lc.includes('edg/')) browser = 'Edge';
  else if (lc.includes('chrome/') && !lc.includes('chromium/')) browser = 'Chrome';
  else if (lc.includes('firefox/')) browser = 'FF';
  else if (lc.includes('safari/') && !lc.includes('chrome/')) browser = 'Safari';
  return browser ? `${device}·${browser}` : device;
}

function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

function relTimeRange(rangeKey) {
  const now = new Date();
  const to = now.toISOString();
  const start = new Date(now);
  if (rangeKey === '24h') start.setHours(start.getHours() - 24);
  else if (rangeKey === '7d') start.setDate(start.getDate() - 7);
  else if (rangeKey === '30d') start.setDate(start.getDate() - 30);
  else if (rangeKey === '90d') start.setDate(start.getDate() - 90);
  else return { from: null, to: null };
  return { from: start.toISOString(), to };
}

export default function Memo3dAtividade() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [rangeKey, setRangeKey] = useState('7d');
  const [activeTypes, setActiveTypes] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(50);
  const [search, setSearch] = useState('');

  const range = useMemo(() => relTimeRange(rangeKey), [rangeKey]);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getAdminActivity({
        from: range.from,
        to: range.to,
        types: activeTypes,
        page,
        pageSize,
      });
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [range.from, range.to, activeTypes, page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  const filteredEvents = useMemo(() => {
    if (!data?.events) return [];
    if (!search.trim()) return data.events;
    const s = search.toLowerCase();
    return data.events.filter(e => {
      return (
        e.action?.toLowerCase().includes(s) ||
        e.memo_patients?.full_name?.toLowerCase().includes(s) ||
        e.ip?.includes(s) ||
        JSON.stringify(e.metadata || {})
          .toLowerCase()
          .includes(s)
      );
    });
  }, [data, search]);

  function toggleType(action) {
    setActiveTypes(prev =>
      prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
    );
    setPage(1);
  }

  return (
    <div className="memo3d-page">
      <header className="page-header">
        <div>
          <h1>
            <Activity size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Atividade Memo3D
          </h1>
          <p>
            Painel agregado de tudo que acontece com pacientes — visualizações, IA,
            compartilhamentos, pagamentos.
          </p>
        </div>
        <button type="button" className="btn btn-secondary" onClick={load} disabled={loading}>
          <RefreshCw size={14} className={loading ? 'spin' : ''} /> Atualizar
        </button>
      </header>

      {error && (
        <div className="error-banner">
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      {/* Cards de resumo */}
      <section className="atividade-summary">
        <SummaryCard
          label="Eventos no período"
          value={data?.summary?.totalEvents ?? '—'}
          loading={loading}
        />
        <SummaryCard
          label="✨ IA geradas"
          value={data?.summary?.byAction?.['patient.ai.generate'] ?? 0}
          loading={loading}
        />
        <SummaryCard
          label="💾 IA salvas"
          value={data?.summary?.byAction?.['patient.ai.save'] ?? 0}
          loading={loading}
        />
        <SummaryCard
          label="❌ Falhas IA"
          value={data?.summary?.byAction?.['patient.ai.fail'] ?? 0}
          loading={loading}
        />
        <SummaryCard
          label="🔗 Links família"
          value={data?.summary?.byAction?.['patient.share.create.client'] ?? 0}
          loading={loading}
        />
        <SummaryCard
          label="👨‍👩‍👧 Family views"
          value={data?.summary?.byAction?.['family.share.view'] ?? 0}
          loading={loading}
        />
        <SummaryCard
          label="🔑 Logins"
          value={data?.summary?.byAction?.['patient.login'] ?? 0}
          loading={loading}
        />
        <SummaryCard
          label="💳 Compras crédito"
          value={data?.summary?.purchasesCount ?? 0}
          sub={
            data?.summary?.purchasesAmountCents
              ? `R$ ${(data.summary.purchasesAmountCents / 100).toFixed(2).replace('.', ',')}`
              : null
          }
          loading={loading}
        />
      </section>

      {/* Filtros */}
      <section className="atividade-filters">
        <div className="atividade-range">
          <span>Período:</span>
          {[
            { k: '24h', l: '24h' },
            { k: '7d', l: '7 dias' },
            { k: '30d', l: '30 dias' },
            { k: '90d', l: '90 dias' },
            { k: 'all', l: 'Tudo' },
          ].map(r => (
            <button
              key={r.k}
              type="button"
              className={`btn btn-secondary${rangeKey === r.k ? ' is-active' : ''}`}
              onClick={() => {
                setRangeKey(r.k);
                setPage(1);
              }}
            >
              {r.l}
            </button>
          ))}
        </div>

        <div className="atividade-search">
          <Search size={14} />
          <input
            type="text"
            placeholder="Buscar por nome, IP, action, metadata..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        <div className="atividade-types">
          <Filter size={14} />
          <span>Tipos:</span>
          {(data?.knownActions || []).map(a => (
            <button
              key={a}
              type="button"
              className={`atividade-type-chip${activeTypes.includes(a) ? ' is-active' : ''}`}
              onClick={() => toggleType(a)}
            >
              {actionLabel(a)} ({data?.summary?.byAction?.[a] || 0})
            </button>
          ))}
          {activeTypes.length > 0 && (
            <button
              type="button"
              className="atividade-type-clear"
              onClick={() => setActiveTypes([])}
            >
              limpar
            </button>
          )}
        </div>
      </section>

      <div className="atividade-grid">
        {/* Top pacientes */}
        {data?.patientStats?.length > 0 && (
          <aside className="atividade-aside">
            <h2>Top pacientes</h2>
            <ul className="atividade-top">
              {data.patientStats.map(p => (
                <li key={p.patient_id}>
                  <Link to={`/admin/memo3d/pacientes/detail?id=${p.patient_id}`}>
                    <strong>{p.full_name}</strong>
                    <span>{p.count} eventos</span>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}

        {/* Tabela de eventos */}
        <section className="atividade-events">
          <header className="atividade-events-header">
            <h2>Eventos ({data?.pagination?.totalCount ?? '—'})</h2>
            <Pagination
              page={page}
              totalPages={data?.pagination?.totalPages || 1}
              onChange={setPage}
              loading={loading}
            />
          </header>

          {loading && !data && (
            <div className="loading-state">
              <Loader2 className="spin" size={20} /> carregando...
            </div>
          )}
          {data && filteredEvents.length === 0 && (
            <div className="empty-state">Nenhum evento neste período/filtro.</div>
          )}
          {filteredEvents.length > 0 && (
            <div className="table-wrap">
              <table className="data-table atividade-table">
                <thead>
                  <tr>
                    <th>Quando</th>
                    <th>Tipo</th>
                    <th>Paciente</th>
                    <th>Recurso</th>
                    <th>IP</th>
                    <th>Device</th>
                    <th>Detalhes</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEvents.map(e => (
                    <EventRow key={e.id} event={e} />
                  ))}
                </tbody>
              </table>
            </div>
          )}

          <footer className="atividade-events-footer">
            <Pagination
              page={page}
              totalPages={data?.pagination?.totalPages || 1}
              onChange={setPage}
              loading={loading}
            />
          </footer>
        </section>
      </div>
    </div>
  );
}

function SummaryCard({ label, value, sub, loading }) {
  return (
    <div className="stat-card atividade-card">
      <div className="stat-text">
        <div className="stat-label">{label}</div>
        <div className="stat-value">{loading ? '…' : value}</div>
        {sub && <div className="atividade-card-sub">{sub}</div>}
      </div>
    </div>
  );
}

function Pagination({ page, totalPages, onChange, loading }) {
  if (totalPages <= 1) return null;
  return (
    <div className="atividade-pagination">
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange(Math.max(1, page - 1))}
        disabled={page <= 1 || loading}
      >
        <ChevronLeft size={14} />
      </button>
      <span>
        {page} / {totalPages}
      </span>
      <button
        type="button"
        className="btn btn-secondary"
        onClick={() => onChange(Math.min(totalPages, page + 1))}
        disabled={page >= totalPages || loading}
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

function EventRow({ event }) {
  const [expanded, setExpanded] = useState(false);
  const patientName = event.memo_patients?.full_name || '—';
  return (
    <>
      <tr>
        <td>{formatDateTime(event.created_at)}</td>
        <td>{actionLabel(event.action)}</td>
        <td>
          {event.patient_id ? (
            <Link to={`/admin/memo3d/pacientes/detail?id=${event.patient_id}`} className="link">
              {patientName}
            </Link>
          ) : (
            '—'
          )}
        </td>
        <td className="atividade-resource">
          {event.resource_type && event.resource_id
            ? `${event.resource_type}/${event.resource_id.slice(0, 8)}…`
            : '—'}
        </td>
        <td>{maskIp(event.ip)}</td>
        <td>{parseUserAgent(event.user_agent)}</td>
        <td>
          {event.metadata && Object.keys(event.metadata).length > 0 ? (
            <button
              type="button"
              className="atividade-meta-btn"
              onClick={() => setExpanded(e => !e)}
            >
              {expanded ? 'ocultar' : 'ver'}
            </button>
          ) : (
            '—'
          )}
        </td>
      </tr>
      {expanded && event.metadata && (
        <tr className="atividade-meta-row">
          <td colSpan={7}>
            <pre>{JSON.stringify(event.metadata, null, 2)}</pre>
          </td>
        </tr>
      )}
    </>
  );
}
