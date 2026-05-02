import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  ArrowLeft,
  Smartphone,
  Monitor,
  RefreshCw,
  XCircle,
  Eye,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './VitalsAdmin.css';

const TABS = ['alerts', 'runs'];
const STRATEGIES = ['mobile', 'desktop'];

const VitalsAdmin = () => {
  const [tab, setTab] = useState('alerts');
  const [alertFilter, setAlertFilter] = useState('active');
  const [strategyFilter, setStrategyFilter] = useState('all');
  const [alerts, setAlerts] = useState([]);
  const [runs, setRuns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actioning, setActioning] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Alerts
      let alertQuery = supabase
        .from('vitals_alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (alertFilter === 'active') {
        alertQuery = alertQuery.is('ack_at', null).is('dismissed_at', null);
      } else if (alertFilter === 'acknowledged') {
        alertQuery = alertQuery.not('ack_at', 'is', null);
      } else if (alertFilter === 'dismissed') {
        alertQuery = alertQuery.not('dismissed_at', 'is', null);
      }

      // Latest runs (most recent per url+strategy via subquery would be ideal,
      // but for MVP just show last 50 runs ordered by created_at)
      const { data: alertData } = await alertQuery;
      const { data: runData } = await supabase
        .from('vitals_runs')
        .select('id, run_id, path, label, strategy, score, lcp_ms, inp_ms, cls, tbt_ms, fcp_ms, error, created_at')
        .order('created_at', { ascending: false })
        .limit(50);

      setAlerts(alertData || []);
      setRuns(runData || []);
    } catch (e) {
      console.error('VitalsAdmin error:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [alertFilter]);

  const acknowledgeAlert = async id => {
    setActioning(id);
    const { error } = await supabase
      .from('vitals_alerts')
      .update({ ack_at: new Date().toISOString() })
      .eq('id', id);
    setActioning(null);
    if (error) return alert(`Erro: ${error.message}`);
    setAlerts(prev => prev.filter(a => a.id !== id || alertFilter !== 'active'));
    if (alertFilter !== 'active') fetchData();
  };

  const dismissAlert = async id => {
    if (!window.confirm('Descartar este alerta? (Não vai sumir do histórico)')) return;
    setActioning(id);
    const { error } = await supabase
      .from('vitals_alerts')
      .update({ dismissed_at: new Date().toISOString() })
      .eq('id', id);
    setActioning(null);
    if (error) return alert(`Erro: ${error.message}`);
    setAlerts(prev => prev.filter(a => a.id !== id || alertFilter !== 'active'));
    if (alertFilter !== 'active') fetchData();
  };

  // Latest run per (path, strategy) — group runs
  const latestRunsByKey = useMemo(() => {
    const map = new Map();
    for (const r of runs) {
      const key = `${r.path}|${r.strategy}`;
      if (!map.has(key)) map.set(key, r);
    }
    return Array.from(map.values());
  }, [runs]);

  const filteredRuns = useMemo(() => {
    if (strategyFilter === 'all') return latestRunsByKey;
    return latestRunsByKey.filter(r => r.strategy === strategyFilter);
  }, [latestRunsByKey, strategyFilter]);

  const formatTime = iso => {
    if (!iso) return '—';
    const d = new Date(iso);
    return d.toLocaleString('pt-BR', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const fmtMs = ms => (ms == null ? '—' : ms < 1000 ? `${Math.round(ms)}ms` : `${(ms / 1000).toFixed(2)}s`);
  const fmtCls = v => (v == null ? '—' : v.toFixed(3));

  const scoreColor = s => {
    if (s == null) return 'gray';
    if (s >= 90) return 'green';
    if (s >= 50) return 'yellow';
    return 'red';
  };

  const cwvColor = (metric, value) => {
    if (value == null) return 'gray';
    const t = {
      lcp: [2500, 4000],
      inp: [200, 500],
      cls: [0.1, 0.25],
      tbt: [200, 600],
      fcp: [1800, 3000],
    }[metric];
    if (!t) return 'gray';
    if (value <= t[0]) return 'green';
    if (value <= t[1]) return 'yellow';
    return 'red';
  };

  return (
    <div className="vitals-admin">
      <div className="page-header">
        <div>
          <Link to="/admin/site-vivo" className="back-link">
            <ArrowLeft size={14} />
            Site-vivo
          </Link>
          <h1 className="page-title">
            <Activity size={22} />
            Vitals Vivo
          </h1>
          <p className="page-subtitle">
            Monitoramento contínuo de Core Web Vitals via PageSpeed Insights API
          </p>
        </div>
        <button className="btn btn-secondary" onClick={fetchData}>
          <RefreshCw size={16} />
          Atualizar
        </button>
      </div>

      {/* Tab nav */}
      <div className="va-tabs">
        <button
          className={`va-tab ${tab === 'alerts' ? 'active' : ''}`}
          onClick={() => setTab('alerts')}
        >
          <AlertTriangle size={15} />
          Alertas
        </button>
        <button
          className={`va-tab ${tab === 'runs' ? 'active' : ''}`}
          onClick={() => setTab('runs')}
        >
          <Activity size={15} />
          Runs recentes
        </button>
      </div>

      {/* Tab: Alerts */}
      {tab === 'alerts' && (
        <>
          <div className="va-filters">
            <button
              className={`va-filter ${alertFilter === 'active' ? 'active' : ''}`}
              onClick={() => setAlertFilter('active')}
            >
              Ativos
            </button>
            <button
              className={`va-filter ${alertFilter === 'acknowledged' ? 'active' : ''}`}
              onClick={() => setAlertFilter('acknowledged')}
            >
              Reconhecidos
            </button>
            <button
              className={`va-filter ${alertFilter === 'dismissed' ? 'active' : ''}`}
              onClick={() => setAlertFilter('dismissed')}
            >
              Descartados
            </button>
            <button
              className={`va-filter ${alertFilter === 'all' ? 'active' : ''}`}
              onClick={() => setAlertFilter('all')}
            >
              Todos
            </button>
          </div>

          {loading ? (
            <div className="va-loading">
              <div className="spinner" />
            </div>
          ) : alerts.length === 0 ? (
            <div className="va-empty">
              <CheckCircle size={48} color="#22c55e" />
              <p>
                {alertFilter === 'active'
                  ? 'Nenhum alerta ativo. Performance estável.'
                  : 'Nenhum alerta nessa categoria.'}
              </p>
            </div>
          ) : (
            <div className="va-alerts">
              {alerts.map(alert => (
                <div key={alert.id} className={`va-alert va-alert--${alert.severity}`}>
                  <div className="va-alert-header">
                    <span className={`va-sev va-sev--${alert.severity}`}>{alert.severity}</span>
                    <span className="va-alert-meta">
                      {alert.path} · {alert.strategy === 'mobile' ? <Smartphone size={11} /> : <Monitor size={11} />}{' '}
                      {alert.strategy}
                    </span>
                    <span className="va-alert-time">{formatTime(alert.created_at)}</span>
                  </div>
                  <div className="va-alert-body">
                    <div className="va-alert-metric">
                      <strong>{alert.metric.toUpperCase()}</strong>:{' '}
                      {Number(alert.prev_value).toFixed(1)} → {Number(alert.curr_value).toFixed(1)}{' '}
                      <span className="va-alert-delta">
                        ({alert.delta >= 0 ? '+' : ''}
                        {Number(alert.delta).toFixed(1)})
                      </span>
                    </div>
                    {alert.diagnosis && (
                      <details className="va-alert-diagnosis">
                        <summary>Ver diagnóstico Claude</summary>
                        <pre>{alert.diagnosis}</pre>
                      </details>
                    )}
                  </div>
                  {!alert.ack_at && !alert.dismissed_at && (
                    <div className="va-alert-actions">
                      <button
                        className="va-btn va-btn--primary"
                        onClick={() => acknowledgeAlert(alert.id)}
                        disabled={actioning === alert.id}
                      >
                        <CheckCircle size={13} /> Reconhecer
                      </button>
                      <button
                        className="va-btn va-btn--ghost"
                        onClick={() => dismissAlert(alert.id)}
                        disabled={actioning === alert.id}
                      >
                        <XCircle size={13} /> Descartar
                      </button>
                    </div>
                  )}
                  {alert.ack_at && (
                    <div className="va-alert-meta-foot">Reconhecido em {formatTime(alert.ack_at)}</div>
                  )}
                  {alert.dismissed_at && (
                    <div className="va-alert-meta-foot">Descartado em {formatTime(alert.dismissed_at)}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Tab: Runs */}
      {tab === 'runs' && (
        <>
          <div className="va-filters">
            <button
              className={`va-filter ${strategyFilter === 'all' ? 'active' : ''}`}
              onClick={() => setStrategyFilter('all')}
            >
              Todas
            </button>
            {STRATEGIES.map(s => (
              <button
                key={s}
                className={`va-filter ${strategyFilter === s ? 'active' : ''}`}
                onClick={() => setStrategyFilter(s)}
              >
                {s === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />} {s}
              </button>
            ))}
          </div>

          {loading ? (
            <div className="va-loading">
              <div className="spinner" />
            </div>
          ) : filteredRuns.length === 0 ? (
            <div className="va-empty">
              <Activity size={48} color="#9ca3af" />
              <p>Nenhuma run ainda. Aguarde o cron diário.</p>
            </div>
          ) : (
            <div className="va-table-wrap">
              <table className="va-table">
                <thead>
                  <tr>
                    <th>Página</th>
                    <th>Strategy</th>
                    <th>Score</th>
                    <th>LCP</th>
                    <th>INP</th>
                    <th>CLS</th>
                    <th>TBT</th>
                    <th>FCP</th>
                    <th>Quando</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredRuns.map(r => (
                    <tr key={r.id}>
                      <td>
                        <strong>{r.label || r.path}</strong>
                        <br />
                        <small style={{ color: '#6b7280' }}>{r.path}</small>
                      </td>
                      <td>
                        {r.strategy === 'mobile' ? <Smartphone size={12} /> : <Monitor size={12} />}{' '}
                        {r.strategy}
                      </td>
                      <td>
                        {r.error ? (
                          <span className="va-error">erro</span>
                        ) : (
                          <span className={`va-score va-score--${scoreColor(r.score)}`}>{r.score ?? '—'}</span>
                        )}
                      </td>
                      <td className={`va-cell va-cell--${cwvColor('lcp', r.lcp_ms)}`}>{fmtMs(r.lcp_ms)}</td>
                      <td className={`va-cell va-cell--${cwvColor('inp', r.inp_ms)}`}>{fmtMs(r.inp_ms)}</td>
                      <td className={`va-cell va-cell--${cwvColor('cls', r.cls)}`}>{fmtCls(r.cls)}</td>
                      <td className={`va-cell va-cell--${cwvColor('tbt', r.tbt_ms)}`}>{fmtMs(r.tbt_ms)}</td>
                      <td className={`va-cell va-cell--${cwvColor('fcp', r.fcp_ms)}`}>{fmtMs(r.fcp_ms)}</td>
                      <td>
                        <small>{formatTime(r.created_at)}</small>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default VitalsAdmin;
