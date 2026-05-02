import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Search,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  XCircle,
  TrendingUp,
  TrendingDown,
  ExternalLink,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './SeoAdmin.css';

const TABS = [
  { id: 'indexation', label: 'Indexação', icon: CheckCircle },
  { id: 'queries', label: 'Queries', icon: Search },
  { id: 'pages', label: 'Páginas', icon: ExternalLink },
];

const SeoAdmin = () => {
  const [tab, setTab] = useState('indexation');
  const [loading, setLoading] = useState(true);
  const [inspections, setInspections] = useState([]);
  const [queries, setQueries] = useState([]);
  const [pages, setPages] = useState([]);
  const [activeAlerts, setActiveAlerts] = useState([]);
  const [actioning, setActioning] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Latest run_id de cada tabela (independente, podem ser de runs diferentes)
      const [insRes, qRes, pRes, alertRes] = await Promise.all([
        // Inspections: pega o mais recente por URL
        supabase
          .from('gsc_inspections')
          .select('url, verdict, coverage_state, robots_txt_state, indexing_state, google_canonical, user_canonical, last_crawl_time, page_fetch_state, mobile_verdict, created_at')
          .order('created_at', { ascending: false })
          .limit(500),
        // Queries: pega último run_id e todas as queries dele
        supabase
          .from('gsc_queries')
          .select('query, impressions, clicks, ctr, position, run_id, created_at')
          .order('created_at', { ascending: false })
          .limit(500),
        // Pages: idem
        supabase
          .from('gsc_pages')
          .select('page, impressions, clicks, ctr, position, run_id, created_at')
          .order('created_at', { ascending: false })
          .limit(500),
        // Active alerts
        supabase
          .from('gsc_alerts')
          .select('*')
          .is('ack_at', null)
          .is('dismissed_at', null)
          .order('created_at', { ascending: false })
          .limit(20),
      ]);

      // Inspections: dedupe por URL (mantém o mais recente)
      const insMap = new Map();
      for (const r of insRes.data || []) {
        if (!insMap.has(r.url)) insMap.set(r.url, r);
      }
      setInspections(Array.from(insMap.values()));

      // Queries / Pages: filtra pelo run_id mais recente
      const qLatestRunId = qRes.data?.[0]?.run_id;
      const pLatestRunId = pRes.data?.[0]?.run_id;
      setQueries((qRes.data || []).filter(r => r.run_id === qLatestRunId));
      setPages((pRes.data || []).filter(r => r.run_id === pLatestRunId));
      setActiveAlerts(alertRes.data || []);
    } catch (e) {
      console.error('SEO admin error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const acknowledgeAlert = async id => {
    setActioning(id);
    const { error } = await supabase
      .from('gsc_alerts')
      .update({ ack_at: new Date().toISOString() })
      .eq('id', id);
    setActioning(null);
    if (error) return alert(`Erro: ${error.message}`);
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
  };

  const dismissAlert = async id => {
    if (!window.confirm('Descartar este alerta?')) return;
    setActioning(id);
    const { error } = await supabase
      .from('gsc_alerts')
      .update({ dismissed_at: new Date().toISOString() })
      .eq('id', id);
    setActioning(null);
    if (error) return alert(`Erro: ${error.message}`);
    setActiveAlerts(prev => prev.filter(a => a.id !== id));
  };

  // Stats de indexação
  const indexStats = useMemo(() => {
    const stats = { total: inspections.length, indexed: 0, not_indexed: 0, error: 0, other: 0 };
    for (const r of inspections) {
      const cov = (r.coverage_state || '').toLowerCase();
      if (cov.includes('submitted and indexed') || cov === 'indexed') stats.indexed++;
      else if (cov.includes('not indexed') || cov.includes('discovered') || cov.includes('crawled')) stats.not_indexed++;
      else if (cov.includes('error')) stats.error++;
      else stats.other++;
    }
    return stats;
  }, [inspections]);

  const formatDate = iso => {
    if (!iso) return '—';
    return new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: 'short', year: '2-digit' });
  };

  const coverageColor = state => {
    if (!state) return 'gray';
    const s = state.toLowerCase();
    if (s.includes('submitted and indexed') || s === 'indexed') return 'green';
    if (s.includes('error') || s.includes('blocked')) return 'red';
    if (s.includes('not indexed') || s.includes('discovered') || s.includes('crawled')) return 'yellow';
    return 'gray';
  };

  return (
    <div className="seo-admin">
      <div className="page-header">
        <div>
          <Link to="/admin/site-vivo" className="back-link">
            <ArrowLeft size={14} />
            Site-vivo
          </Link>
          <h1 className="page-title">
            <Search size={22} />
            SEO Vivo
          </h1>
          <p className="page-subtitle">Monitoramento contínuo de Search Console</p>
        </div>
        <button className="btn btn-secondary" onClick={fetchData} disabled={loading}>
          <RefreshCw size={16} className={loading ? 'spin' : ''} />
          Atualizar
        </button>
      </div>

      {/* Active alerts */}
      {activeAlerts.length > 0 && (
        <div className="seo-alerts-banner">
          <h3>
            <AlertTriangle size={16} />
            {activeAlerts.length} alerta(s) ativo(s)
          </h3>
          <div className="seo-alerts">
            {activeAlerts.map(a => (
              <div key={a.id} className={`seo-alert seo-alert--${a.severity}`}>
                <div className="seo-alert-info">
                  <strong>{a.alert_type}</strong> · <a href={a.url} target="_blank" rel="noreferrer">{a.url}</a>
                  <br />
                  <small>
                    {a.prev_state || '?'} → <strong>{a.curr_state || '?'}</strong>
                  </small>
                </div>
                <div className="seo-alert-actions">
                  <button onClick={() => acknowledgeAlert(a.id)} disabled={actioning === a.id}>
                    <CheckCircle size={12} /> Reconhecer
                  </button>
                  <button onClick={() => dismissAlert(a.id)} disabled={actioning === a.id} className="ghost">
                    <XCircle size={12} /> Descartar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="seo-tabs">
        {TABS.map(t => (
          <button
            key={t.id}
            className={`seo-tab ${tab === t.id ? 'active' : ''}`}
            onClick={() => setTab(t.id)}
          >
            <t.icon size={15} />
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab: Indexation */}
      {tab === 'indexation' && (
        <>
          {loading ? (
            <div className="seo-loading">
              <div className="spinner" />
            </div>
          ) : inspections.length === 0 ? (
            <div className="seo-empty">
              <Search size={48} color="#9ca3af" />
              <p>Nenhuma inspection ainda. Aguarde o cron diário 05:00 BRT.</p>
              <small>Ou trigger manual: <code>gh workflow run "SEO Vivo - Daily" -R Xdiag-IA/seo-vivo</code></small>
            </div>
          ) : (
            <>
              {/* Stats summary */}
              <div className="seo-stats-grid">
                <div className="seo-stat-card seo-stat-card--green">
                  <span className="seo-stat-value">{indexStats.indexed}</span>
                  <span className="seo-stat-label">Indexadas</span>
                </div>
                <div className="seo-stat-card seo-stat-card--yellow">
                  <span className="seo-stat-value">{indexStats.not_indexed}</span>
                  <span className="seo-stat-label">Não indexadas</span>
                </div>
                <div className="seo-stat-card seo-stat-card--red">
                  <span className="seo-stat-value">{indexStats.error}</span>
                  <span className="seo-stat-label">Erro</span>
                </div>
                <div className="seo-stat-card seo-stat-card--gray">
                  <span className="seo-stat-value">{indexStats.other}</span>
                  <span className="seo-stat-label">Outros</span>
                </div>
                <div className="seo-stat-card">
                  <span className="seo-stat-value">{indexStats.total}</span>
                  <span className="seo-stat-label">Total monitoradas</span>
                </div>
              </div>

              {/* Table */}
              <div className="seo-table-wrap">
                <table className="seo-table">
                  <thead>
                    <tr>
                      <th>URL</th>
                      <th>Status</th>
                      <th>Verdict</th>
                      <th>Mobile</th>
                      <th>Last crawl</th>
                      <th>Canonical Google</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspections.map(r => (
                      <tr key={r.url}>
                        <td>
                          <a href={r.url} target="_blank" rel="noreferrer" className="seo-url">
                            {r.url.replace(/^https?:\/\/(www\.)?[^/]+/, '')}
                            <ExternalLink size={11} />
                          </a>
                        </td>
                        <td>
                          <span className={`seo-badge seo-badge--${coverageColor(r.coverage_state)}`}>
                            {r.coverage_state || '—'}
                          </span>
                        </td>
                        <td>{r.verdict || '—'}</td>
                        <td>{r.mobile_verdict || '—'}</td>
                        <td>{formatDate(r.last_crawl_time)}</td>
                        <td>
                          {r.google_canonical ? (
                            <small style={{ color: r.google_canonical === r.user_canonical ? '#16a34a' : '#dc2626' }}>
                              {r.google_canonical === r.user_canonical ? '✓ match' : '✗ mismatch'}
                            </small>
                          ) : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </>
      )}

      {/* Tab: Queries */}
      {tab === 'queries' && (
        <>
          {loading ? (
            <div className="seo-loading"><div className="spinner" /></div>
          ) : queries.length === 0 ? (
            <div className="seo-empty">
              <Search size={48} color="#9ca3af" />
              <p>Nenhuma query ainda. Aguarde o cron diário 05:00 BRT.</p>
            </div>
          ) : (
            <div className="seo-table-wrap">
              <table className="seo-table">
                <thead>
                  <tr>
                    <th>Query</th>
                    <th>Impressões</th>
                    <th>Cliques</th>
                    <th>CTR</th>
                    <th>Posição</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.sort((a, b) => b.impressions - a.impressions).slice(0, 200).map((r, i) => (
                    <tr key={`${r.query}-${i}`}>
                      <td><strong>{r.query}</strong></td>
                      <td>{r.impressions.toLocaleString('pt-BR')}</td>
                      <td>{r.clicks.toLocaleString('pt-BR')}</td>
                      <td>{(r.ctr * 100).toFixed(1)}%</td>
                      <td>
                        <span className={`seo-pos seo-pos--${r.position <= 10 ? 'good' : r.position <= 20 ? 'mid' : 'low'}`}>
                          {r.position.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <small className="seo-table-foot">Top 200 de {queries.length} queries (últimos 7 dias)</small>
            </div>
          )}
        </>
      )}

      {/* Tab: Pages */}
      {tab === 'pages' && (
        <>
          {loading ? (
            <div className="seo-loading"><div className="spinner" /></div>
          ) : pages.length === 0 ? (
            <div className="seo-empty">
              <ExternalLink size={48} color="#9ca3af" />
              <p>Nenhuma página com tráfego ainda.</p>
            </div>
          ) : (
            <div className="seo-table-wrap">
              <table className="seo-table">
                <thead>
                  <tr>
                    <th>Página</th>
                    <th>Impressões</th>
                    <th>Cliques</th>
                    <th>CTR</th>
                    <th>Posição</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.sort((a, b) => b.impressions - a.impressions).slice(0, 100).map((r, i) => (
                    <tr key={`${r.page}-${i}`}>
                      <td>
                        <a href={r.page} target="_blank" rel="noreferrer" className="seo-url">
                          {r.page.replace(/^https?:\/\/(www\.)?[^/]+/, '')}
                          <ExternalLink size={11} />
                        </a>
                      </td>
                      <td>{r.impressions.toLocaleString('pt-BR')}</td>
                      <td>{r.clicks.toLocaleString('pt-BR')}</td>
                      <td>{(r.ctr * 100).toFixed(1)}%</td>
                      <td>
                        <span className={`seo-pos seo-pos--${r.position <= 10 ? 'good' : r.position <= 20 ? 'mid' : 'low'}`}>
                          {r.position.toFixed(1)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <small className="seo-table-foot">Top 100 de {pages.length} páginas (últimos 7 dias)</small>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SeoAdmin;
