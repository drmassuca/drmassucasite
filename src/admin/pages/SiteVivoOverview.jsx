import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Activity,
  HelpCircle,
  MessageCircle,
  Search,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  ArrowUpRight,
  RefreshCw,
  Clock,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import './SiteVivoOverview.css';

const SiteVivoOverview = () => {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState({
    faq: { pending: 0, published: 0, ai_last_7d: 0 },
    vitals: { runs_last_7d: 0, urls_monitored: 0, active_alerts: 0, last_run_at: null },
    chat: { embeddings: 0, faq_embedded: 0, chunks_embedded: 0 },
    seo: { sitemap_urls: 92, last_deploy: null },
  });
  const [recentAlerts, setRecentAlerts] = useState([]);

  const fetchAll = async () => {
    try {
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // FAQ Vivo
      const [{ count: faqPending }, { count: faqPublished }, { count: faqAI7d }] =
        await Promise.all([
          supabase.from('faq_items').select('*', { count: 'exact', head: true }).eq('approved', false),
          supabase.from('faq_items').select('*', { count: 'exact', head: true }).eq('approved', true),
          supabase
            .from('faq_items')
            .select('*', { count: 'exact', head: true })
            .eq('ai_generated', true)
            .gte('created_at', sevenDaysAgo),
        ]);

      // Vitals Vivo
      const [
        { count: vitalsRuns7d },
        { count: vitalsActiveAlerts },
        { data: lastRunRows },
        { data: distinctUrlRows },
      ] = await Promise.all([
        supabase
          .from('vitals_runs')
          .select('*', { count: 'exact', head: true })
          .gte('created_at', sevenDaysAgo),
        supabase
          .from('vitals_alerts')
          .select('*', { count: 'exact', head: true })
          .is('ack_at', null)
          .is('dismissed_at', null),
        supabase.from('vitals_runs').select('created_at').order('created_at', { ascending: false }).limit(1),
        supabase.from('vitals_runs').select('url').limit(1000),
      ]);

      const distinctUrls = new Set((distinctUrlRows || []).map(r => r.url));

      // Chat Vivo (embeddings)
      const [{ count: faqEmbedded }, { count: chunksEmbedded }] = await Promise.all([
        supabase
          .from('faq_items')
          .select('*', { count: 'exact', head: true })
          .eq('approved', true)
          .not('embedding', 'is', null),
        supabase.from('site_chunks').select('*', { count: 'exact', head: true }),
      ]);

      // Recent active alerts (top 5)
      const { data: alerts } = await supabase
        .from('vitals_alerts')
        .select('id, path, strategy, severity, metric, prev_value, curr_value, delta, created_at')
        .is('ack_at', null)
        .is('dismissed_at', null)
        .order('created_at', { ascending: false })
        .limit(5);

      setData({
        faq: {
          pending: faqPending ?? 0,
          published: faqPublished ?? 0,
          ai_last_7d: faqAI7d ?? 0,
        },
        vitals: {
          runs_last_7d: vitalsRuns7d ?? 0,
          urls_monitored: distinctUrls.size,
          active_alerts: vitalsActiveAlerts ?? 0,
          last_run_at: lastRunRows?.[0]?.created_at ?? null,
        },
        chat: {
          embeddings: (faqEmbedded ?? 0) + (chunksEmbedded ?? 0),
          faq_embedded: faqEmbedded ?? 0,
          chunks_embedded: chunksEmbedded ?? 0,
        },
        seo: {
          sitemap_urls: 92,
          last_deploy: null,
        },
      });

      setRecentAlerts(alerts || []);
    } catch (e) {
      console.error('Site-vivo overview error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchAll();
  };

  const formatRelative = iso => {
    if (!iso) return '—';
    const date = new Date(iso);
    const diff = Date.now() - date.getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins} min atrás`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h atrás`;
    const days = Math.floor(hrs / 24);
    return `${days}d atrás`;
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="sv-overview">
      <div className="page-header">
        <div>
          <h1 className="page-title">Site-vivo</h1>
          <p className="page-subtitle">Programa de curadoria contínua. Cada módulo opera autônomo.</p>
        </div>
        <button className="btn btn-secondary" onClick={onRefresh} disabled={refreshing}>
          <RefreshCw size={16} className={refreshing ? 'spin' : ''} />
          Atualizar
        </button>
      </div>

      {/* Module Cards */}
      <div className="sv-modules-grid">
        {/* FAQ Vivo */}
        <Link to="/admin/faq" className="sv-module-card">
          <div className="sv-module-header">
            <div className="sv-module-icon sv-icon-blue">
              <HelpCircle size={22} />
            </div>
            <span className="sv-status sv-status-ok">
              <CheckCircle size={12} />
              Ativo
            </span>
          </div>
          <h3 className="sv-module-title">FAQ Vivo</h3>
          <p className="sv-module-desc">Geração automática de FAQ via Search Console + Claude</p>
          <div className="sv-module-stats">
            <div className="sv-stat">
              <span className="sv-stat-value">{data.faq.pending}</span>
              <span className="sv-stat-label">aguardando aprovação</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">{data.faq.published}</span>
              <span className="sv-stat-label">publicados</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">{data.faq.ai_last_7d}</span>
              <span className="sv-stat-label">IA gerou (7d)</span>
            </div>
          </div>
          <div className="sv-module-action">
            Gerenciar FAQ <ArrowUpRight size={14} />
          </div>
        </Link>

        {/* Vitals Vivo */}
        <Link to="/admin/site-vivo/vitals" className="sv-module-card">
          <div className="sv-module-header">
            <div className="sv-module-icon sv-icon-green">
              <Activity size={22} />
            </div>
            <span className={`sv-status ${data.vitals.active_alerts > 0 ? 'sv-status-warn' : 'sv-status-ok'}`}>
              {data.vitals.active_alerts > 0 ? (
                <>
                  <AlertTriangle size={12} />
                  {data.vitals.active_alerts} alerta(s)
                </>
              ) : (
                <>
                  <CheckCircle size={12} />
                  OK
                </>
              )}
            </span>
          </div>
          <h3 className="sv-module-title">Vitals Vivo</h3>
          <p className="sv-module-desc">Monitoramento contínuo de Core Web Vitals via PSI + GA4</p>
          <div className="sv-module-stats">
            <div className="sv-stat">
              <span className="sv-stat-value">{data.vitals.runs_last_7d}</span>
              <span className="sv-stat-label">runs (7d)</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">{data.vitals.urls_monitored}</span>
              <span className="sv-stat-label">URLs monitoradas</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">{formatRelative(data.vitals.last_run_at)}</span>
              <span className="sv-stat-label">última run</span>
            </div>
          </div>
          <div className="sv-module-action">
            Ver detalhes <ArrowUpRight size={14} />
          </div>
        </Link>

        {/* Chat Vivo */}
        <div className="sv-module-card sv-module-card--inactive">
          <div className="sv-module-header">
            <div className="sv-module-icon sv-icon-purple">
              <MessageCircle size={22} />
            </div>
            <span className="sv-status sv-status-ok">
              <CheckCircle size={12} />
              Ativo
            </span>
          </div>
          <h3 className="sv-module-title">Chat Vivo</h3>
          <p className="sv-module-desc">Chatbot Grok com RAG sobre todo conteúdo do site</p>
          <div className="sv-module-stats">
            <div className="sv-stat">
              <span className="sv-stat-value">{data.chat.embeddings}</span>
              <span className="sv-stat-label">embeddings totais</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">{data.chat.faq_embedded}</span>
              <span className="sv-stat-label">FAQ indexados</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">{data.chat.chunks_embedded}</span>
              <span className="sv-stat-label">chunks site</span>
            </div>
          </div>
        </div>

        {/* SEO Vivo */}
        <div className="sv-module-card sv-module-card--inactive">
          <div className="sv-module-header">
            <div className="sv-module-icon sv-icon-orange">
              <Search size={22} />
            </div>
            <span className="sv-status sv-status-ok">
              <CheckCircle size={12} />
              Ativo
            </span>
          </div>
          <h3 className="sv-module-title">SEO Vivo</h3>
          <p className="sv-module-desc">Prerender + sitemap auto-gerado em cada deploy</p>
          <div className="sv-module-stats">
            <div className="sv-stat">
              <span className="sv-stat-value">{data.seo.sitemap_urls}</span>
              <span className="sv-stat-label">URLs no sitemap</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">~daily</span>
              <span className="sv-stat-label">regenera</span>
            </div>
            <div className="sv-stat">
              <span className="sv-stat-value">build-time</span>
              <span className="sv-stat-label">freq.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Active Alerts */}
      <div className="sv-section">
        <div className="sv-section-header">
          <h2>
            <AlertTriangle size={18} />
            Alertas ativos
          </h2>
          {recentAlerts.length > 0 && (
            <Link to="/admin/site-vivo/vitals" className="view-all-link">
              Ver todos <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
        {recentAlerts.length === 0 ? (
          <div className="sv-empty">
            <CheckCircle size={32} color="#22c55e" />
            <p>Nenhum alerta ativo. Tudo no verde.</p>
          </div>
        ) : (
          <div className="sv-alerts-list">
            {recentAlerts.map(alert => (
              <div key={alert.id} className={`sv-alert sv-alert--${alert.severity}`}>
                <div className="sv-alert-sev">{alert.severity}</div>
                <div className="sv-alert-info">
                  <div className="sv-alert-title">
                    {alert.path} <small>({alert.strategy})</small>
                  </div>
                  <div className="sv-alert-detail">
                    <strong>{alert.metric}</strong>: {Number(alert.prev_value).toFixed(1)} →{' '}
                    {Number(alert.curr_value).toFixed(1)}
                    <span className="sv-alert-delta">
                      ({alert.delta >= 0 ? '+' : ''}
                      {Number(alert.delta).toFixed(1)})
                    </span>
                  </div>
                </div>
                <div className="sv-alert-time">
                  <Clock size={12} />
                  {formatRelative(alert.created_at)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer hint */}
      <div className="sv-footer-hint">
        <TrendingUp size={14} />
        <span>
          Tese do Site-vivo: <strong>curadoria contínua</strong> — cada deploy + cada cron mantém o
          site automaticamente saudável.
        </span>
      </div>
    </div>
  );
};

export default SiteVivoOverview;
