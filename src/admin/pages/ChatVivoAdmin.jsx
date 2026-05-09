import { Fragment, useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  MessageCircle,
  AlertTriangle,
  RefreshCw,
  ChevronDown,
  ChevronRight,
  Clock,
  Zap,
  Target,
  TrendingDown,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import './ChatVivoAdmin.css';

const PERIOD_OPTIONS = [
  { value: '24h', label: 'Últimas 24h', ms: 24 * 60 * 60 * 1000 },
  { value: '7d', label: 'Últimos 7 dias', ms: 7 * 24 * 60 * 60 * 1000 },
  { value: '30d', label: 'Últimos 30 dias', ms: 30 * 24 * 60 * 60 * 1000 },
];

const FILTER_OPTIONS = [
  { value: 'all', label: 'Todas' },
  { value: 'bad', label: 'Mal respondidas' },
  { value: 'errors', label: 'Erros' },
];

const ChatVivoAdmin = () => {
  const { session } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [rebuilding, setRebuilding] = useState(false);
  const [rebuildResult, setRebuildResult] = useState(null);
  const [period, setPeriod] = useState('7d');
  const [filter, setFilter] = useState('all');
  const [interactions, setInteractions] = useState([]);
  const [stats, setStats] = useState({
    total_24h: 0,
    total_7d: 0,
    avg_top_sim: null,
    avg_latency: null,
    fallback_rate: null,
    fallback_count_7d: 0,
  });
  const [expanded, setExpanded] = useState(null);

  const periodMs = useMemo(
    () => PERIOD_OPTIONS.find(p => p.value === period)?.ms ?? PERIOD_OPTIONS[1].ms,
    [period]
  );

  const fetchData = async () => {
    try {
      const now = Date.now();
      const since = new Date(now - periodMs).toISOString();
      const since24h = new Date(now - 24 * 60 * 60 * 1000).toISOString();
      const since7d = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Lista principal (filtrada)
      let q = supabase
        .from('chat_interactions')
        .select(
          'id, created_at, session_id, user_message, response, top_similarity, sources_count, sources, latency_ms, fallback_to_whatsapp, error'
        )
        .gte('created_at', since)
        .order('created_at', { ascending: false })
        .limit(200);

      if (filter === 'bad') {
        q = q.or('fallback_to_whatsapp.eq.true,top_similarity.lt.0.45');
      } else if (filter === 'errors') {
        q = q.not('error', 'is', null);
      }

      // Stats (sempre 7d, independente do filtro)
      const [{ data: rows, error }, { count: t24 }, { count: t7 }, { data: stats7d }] =
        await Promise.all([
          q,
          supabase
            .from('chat_interactions')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', since24h),
          supabase
            .from('chat_interactions')
            .select('*', { count: 'exact', head: true })
            .gte('created_at', since7d),
          supabase
            .from('chat_interactions')
            .select('top_similarity, latency_ms, fallback_to_whatsapp')
            .gte('created_at', since7d)
            .limit(2000),
        ]);

      if (error) throw error;

      const validTopSim = (stats7d || [])
        .filter(r => r.top_similarity != null)
        .map(r => r.top_similarity);
      const validLat = (stats7d || []).filter(r => r.latency_ms != null).map(r => r.latency_ms);
      const fallbackCount = (stats7d || []).filter(r => r.fallback_to_whatsapp).length;
      const totalRows = (stats7d || []).length;

      setStats({
        total_24h: t24 ?? 0,
        total_7d: t7 ?? 0,
        avg_top_sim: validTopSim.length
          ? validTopSim.reduce((a, b) => a + b, 0) / validTopSim.length
          : null,
        avg_latency: validLat.length
          ? Math.round(validLat.reduce((a, b) => a + b, 0) / validLat.length)
          : null,
        fallback_rate: totalRows ? (fallbackCount / totalRows) * 100 : null,
        fallback_count_7d: fallbackCount,
      });
      setInteractions(rows || []);
    } catch (e) {
      console.error('ChatVivoAdmin error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, [period, filter]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  const handleRebuild = async (only, force) => {
    if (!session?.access_token) {
      setRebuildResult({ error: 'Sessão expirada — faça login novamente.' });
      return;
    }
    setRebuilding(true);
    setRebuildResult(null);
    try {
      const r = await fetch('/api/admin/rebuild-rag', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ only, force }),
      });
      const result = await r.json();
      if (!r.ok) {
        setRebuildResult({ error: result.error || `HTTP ${r.status}` });
      } else {
        setRebuildResult(result);
      }
    } catch (e) {
      setRebuildResult({ error: e.message });
    } finally {
      setRebuilding(false);
    }
  };

  const formatTime = iso => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const fmtMs = ms => (ms == null ? '—' : ms < 1000 ? `${ms}ms` : `${(ms / 1000).toFixed(1)}s`);
  const fmtSim = s => (s == null ? '—' : s.toFixed(3));
  const simColor = s => {
    if (s == null) return 'gray';
    if (s >= 0.6) return 'green';
    if (s >= 0.45) return 'yellow';
    return 'red';
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="cv-admin">
      <div className="page-header">
        <div>
          <Link to="/admin/site-vivo" className="back-link">
            <ArrowLeft size={14} />
            Site-vivo
          </Link>
          <h1 className="page-title">
            <MessageCircle size={22} />
            Chat Vivo
          </h1>
          <p className="page-subtitle">
            Observabilidade do chatbot: cobertura do RAG, latência, fallback.
          </p>
        </div>
        <div className="cv-header-actions">
          <button
            type="button"
            className="cv-rebuild-btn"
            onClick={() => handleRebuild('all', false)}
            disabled={rebuilding}
            title="Indexa só artigos/FAQs novos (rápido)"
          >
            <RefreshCw size={14} className={rebuilding ? 'spin' : ''} />
            {rebuilding ? 'Indexando…' : 'Indexar novos'}
          </button>
          <button
            type="button"
            className="cv-rebuild-btn cv-rebuild-btn--ghost"
            onClick={() => handleRebuild('all', true)}
            disabled={rebuilding}
            title="Reconstrói TODOS os embeddings do zero (~20s)"
          >
            Reconstruir tudo
          </button>
          <button className="btn btn-secondary" onClick={onRefresh} disabled={refreshing}>
            <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
            Atualizar
          </button>
        </div>
      </div>

      {rebuildResult && (
        <div
          className={`cv-rebuild-banner cv-rebuild-banner--${
            rebuildResult.error ? 'err' : 'ok'
          }`}
        >
          {rebuildResult.error ? (
            <>✕ {rebuildResult.error}</>
          ) : (
            <>
              ✓ {(rebuildResult.faqs_processed || 0) +
                (rebuildResult.site_chunks_processed || 0) +
                (rebuildResult.articles_chunks_processed || 0)}{' '}
              chunks processados em{' '}
              {(rebuildResult.duration_ms / 1000).toFixed(1)}s
            </>
          )}
        </div>
      )}

      {/* Stats cards (sempre 7d) */}
      <div className="cv-stats-grid">
        <div className="cv-stat-card">
          <div className="cv-stat-icon cv-icon-blue">
            <MessageCircle size={18} />
          </div>
          <div>
            <div className="cv-stat-value">{stats.total_24h}</div>
            <div className="cv-stat-label">interações 24h</div>
          </div>
        </div>
        <div className="cv-stat-card">
          <div className="cv-stat-icon cv-icon-purple">
            <MessageCircle size={18} />
          </div>
          <div>
            <div className="cv-stat-value">{stats.total_7d}</div>
            <div className="cv-stat-label">interações 7d</div>
          </div>
        </div>
        <div className="cv-stat-card">
          <div className="cv-stat-icon cv-icon-green">
            <Target size={18} />
          </div>
          <div>
            <div className="cv-stat-value">
              {stats.avg_top_sim != null ? stats.avg_top_sim.toFixed(3) : '—'}
            </div>
            <div className="cv-stat-label">top_sim médio (7d)</div>
          </div>
        </div>
        <div className="cv-stat-card">
          <div className="cv-stat-icon cv-icon-orange">
            <Zap size={18} />
          </div>
          <div>
            <div className="cv-stat-value">{fmtMs(stats.avg_latency)}</div>
            <div className="cv-stat-label">latência média (7d)</div>
          </div>
        </div>
        <div className="cv-stat-card">
          <div className="cv-stat-icon cv-icon-red">
            <TrendingDown size={18} />
          </div>
          <div>
            <div className="cv-stat-value">
              {stats.fallback_rate != null ? `${stats.fallback_rate.toFixed(1)}%` : '—'}
            </div>
            <div className="cv-stat-label">fallback ({stats.fallback_count_7d}/{stats.total_7d})</div>
          </div>
        </div>
      </div>

      {/* Filtros */}
      <div className="cv-filters">
        <div className="cv-filter-group">
          <label>Período:</label>
          {PERIOD_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`cv-chip ${period === opt.value ? 'active' : ''}`}
              onClick={() => setPeriod(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="cv-filter-group">
          <label>Filtro:</label>
          {FILTER_OPTIONS.map(opt => (
            <button
              key={opt.value}
              className={`cv-chip ${filter === opt.value ? 'active' : ''}`}
              onClick={() => setFilter(opt.value)}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Lista de interações */}
      <div className="cv-section">
        <div className="cv-section-header">
          <h2>
            <MessageCircle size={18} />
            Interações ({interactions.length}{interactions.length === 200 ? '+' : ''})
          </h2>
        </div>
        {interactions.length === 0 ? (
          <div className="cv-empty">
            <MessageCircle size={32} color="#94a3b8" />
            <p>Nenhuma interação no período/filtro selecionado.</p>
          </div>
        ) : (
          <div className="cv-table-wrap">
            <table className="cv-table">
              <thead>
                <tr>
                  <th style={{ width: 32 }}></th>
                  <th>Quando</th>
                  <th>Pergunta</th>
                  <th>top_sim</th>
                  <th>Sources</th>
                  <th>Latência</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {interactions.map(it => {
                  const isExp = expanded === it.id;
                  const badge = it.error
                    ? { txt: 'erro', cls: 'red' }
                    : it.fallback_to_whatsapp
                    ? { txt: 'fallback', cls: 'yellow' }
                    : { txt: 'ok', cls: 'green' };
                  return (
                    <Fragment key={it.id}>
                      <tr
                        className={`cv-row ${isExp ? 'cv-row--expanded' : ''}`}
                        onClick={() => setExpanded(isExp ? null : it.id)}
                      >
                        <td>{isExp ? <ChevronDown size={14} /> : <ChevronRight size={14} />}</td>
                        <td>
                          <Clock size={12} style={{ verticalAlign: 'middle', marginRight: 4 }} />
                          {formatTime(it.created_at)}
                        </td>
                        <td className="cv-q">{it.user_message}</td>
                        <td>
                          <span className={`cv-pill cv-pill-${simColor(it.top_similarity)}`}>
                            {fmtSim(it.top_similarity)}
                          </span>
                        </td>
                        <td>{it.sources_count}</td>
                        <td>{fmtMs(it.latency_ms)}</td>
                        <td>
                          <span className={`cv-badge cv-badge-${badge.cls}`}>{badge.txt}</span>
                        </td>
                      </tr>
                      {isExp && (
                        <tr className="cv-row-detail">
                          <td colSpan={7}>
                            <div className="cv-detail">
                              {it.error && (
                                <div className="cv-detail-block cv-detail-block--err">
                                  <strong>Erro:</strong> {it.error}
                                </div>
                              )}
                              <div className="cv-detail-block">
                                <strong>Pergunta completa:</strong>
                                <p>{it.user_message}</p>
                              </div>
                              {it.response && (
                                <div className="cv-detail-block">
                                  <strong>Resposta:</strong>
                                  <p>{it.response}</p>
                                </div>
                              )}
                              {Array.isArray(it.sources) && it.sources.length > 0 && (
                                <div className="cv-detail-block">
                                  <strong>Sources retornados ({it.sources.length}):</strong>
                                  <ul className="cv-sources">
                                    {it.sources.map((s, i) => (
                                      <li key={i}>
                                        <span className={`cv-pill cv-pill-${simColor(s.similarity)}`}>
                                          {fmtSim(s.similarity)}
                                        </span>{' '}
                                        <strong>[{s.source}]</strong>{' '}
                                        <span className="cv-source-title">{s.title}</span>
                                        {s.source_id && (
                                          <small className="cv-source-id"> · {s.source_id}</small>
                                        )}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              )}
                              {it.session_id && (
                                <div className="cv-detail-meta">session: {it.session_id}</div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatVivoAdmin;
