import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Loader2,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
  RefreshCw,
  X,
  User,
  Calendar,
} from 'lucide-react';
import { getAdminAiGallery } from '../../../lib/memo3d/api';
import './memo3d.css';

const PRESET_LABEL = {
  fiel: 'Fiel',
  medio: 'Médio',
  realista: 'Realista',
};

const SKIN_LABEL = {
  padrao: 'Padrão',
  clara: 'Clara',
  parda: 'Morena/Parda',
  negra: 'Negra',
};

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

function formatDateTime(iso) {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export default function Memo3dGaleriaIA() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rangeKey, setRangeKey] = useState('30d');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(24);
  const [selected, setSelected] = useState(null); // item aberto no modal

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const range = relTimeRange(rangeKey);
      const result = await getAdminAiGallery({
        from: range.from,
        to: range.to,
        page,
        pageSize,
      });
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [rangeKey, page, pageSize]);

  useEffect(() => {
    load();
  }, [load]);

  // Fecha modal com Esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === 'Escape') setSelected(null);
    }
    if (selected) {
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }
    return undefined;
  }, [selected]);

  return (
    <div className="memo3d-page">
      <header className="page-header">
        <div>
          <h1>
            <Sparkles size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Galeria IA
          </h1>
          <p>
            Imagens geradas pelas pacientes com a ferramenta de melhoria por IA. Clique numa imagem
            pra comparar com a foto original.
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
      </section>

      {loading && !data && (
        <div className="loading-state">
          <Loader2 className="spin" size={20} /> carregando galeria...
        </div>
      )}

      {data && data.items.length === 0 && (
        <div className="empty-state">
          Nenhuma imagem IA gerada no período. As pacientes ainda não usaram, ou o filtro está muito
          estreito.
        </div>
      )}

      {data && data.items.length > 0 && (
        <>
          <div className="galeria-ia-grid">
            {data.items.map(item => (
              <article
                key={item.id}
                className="galeria-ia-card"
                onClick={() => setSelected(item)}
                onKeyDown={e => {
                  if (e.key === 'Enter') setSelected(item);
                }}
                role="button"
                tabIndex={0}
              >
                <div className="galeria-ia-thumb">
                  {item.aiUrl ? (
                    <img src={item.aiUrl} alt={`IA de ${item.patient?.fullName || ''}`} />
                  ) : (
                    <div className="galeria-ia-thumb-empty">
                      <AlertTriangle size={20} /> Imagem indisponível
                    </div>
                  )}
                  <span className="galeria-ia-badge">✨ IA</span>
                </div>
                <div className="galeria-ia-meta">
                  <strong>{item.patient?.fullName || '—'}</strong>
                  <div className="galeria-ia-tags">
                    {item.aiMetadata?.preset && (
                      <span className="galeria-ia-tag">
                        {PRESET_LABEL[item.aiMetadata.preset] || item.aiMetadata.preset}
                      </span>
                    )}
                    {item.aiMetadata?.skinTone && (
                      <span className="galeria-ia-tag">
                        {SKIN_LABEL[item.aiMetadata.skinTone] || item.aiMetadata.skinTone}
                      </span>
                    )}
                  </div>
                  <span className="muted galeria-ia-time">
                    <Calendar size={11} /> {formatDateTime(item.uploadedAt)}
                  </span>
                </div>
              </article>
            ))}
          </div>

          <footer className="galeria-ia-footer">
            <span className="muted">
              {data.pagination.totalCount} imagem
              {data.pagination.totalCount === 1 ? '' : 's'} no período
            </span>
            {data.pagination.totalPages > 1 && (
              <div className="atividade-pagination">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page <= 1 || loading}
                >
                  <ChevronLeft size={14} />
                </button>
                <span>
                  {page} / {data.pagination.totalPages}
                </span>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setPage(p => Math.min(data.pagination.totalPages, p + 1))}
                  disabled={page >= data.pagination.totalPages || loading}
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            )}
          </footer>
        </>
      )}

      {selected && <ComparisonModal item={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}

function ComparisonModal({ item, onClose }) {
  const meta = item.aiMetadata || {};
  return (
    <div className="galeria-ia-modal" onClick={onClose}>
      <div className="galeria-ia-modal-content" onClick={e => e.stopPropagation()}>
        <button type="button" className="galeria-ia-modal-close" onClick={onClose}>
          <X size={16} /> Fechar
        </button>

        <header>
          <h2>
            <User size={16} />{' '}
            {item.patient ? (
              <Link
                to={`/admin/memo3d/pacientes/detail?id=${item.patient.id}`}
                onClick={e => e.stopPropagation()}
              >
                {item.patient.fullName}
              </Link>
            ) : (
              '—'
            )}
          </h2>
          <span className="muted">
            Exame de {item.exam?.date ? new Date(item.exam.date).toLocaleDateString('pt-BR') : '—'}{' '}
            · Gerada em {formatDateTime(item.uploadedAt)}
          </span>
        </header>

        <div className="galeria-ia-compare">
          <figure>
            <figcaption>Original</figcaption>
            {item.originalUrl ? (
              <img src={item.originalUrl} alt="original" />
            ) : (
              <div className="galeria-ia-thumb-empty">Original indisponível</div>
            )}
          </figure>
          <figure>
            <figcaption>Melhorada por IA</figcaption>
            {item.aiUrl ? (
              <img src={item.aiUrl} alt="ia" />
            ) : (
              <div className="galeria-ia-thumb-empty">IA indisponível</div>
            )}
          </figure>
        </div>

        <dl className="galeria-ia-details">
          <dt>Estilo</dt>
          <dd>{PRESET_LABEL[meta.preset] || meta.preset || '—'}</dd>
          <dt>Tom de pele</dt>
          <dd>{SKIN_LABEL[meta.skinTone] || meta.skinTone || '—'}</dd>
          <dt>Modelo</dt>
          <dd>{meta.model || '—'}</dd>
          <dt>Custo Grok</dt>
          <dd>{typeof meta.costUsd === 'number' ? `$${meta.costUsd.toFixed(3)}` : '—'}</dd>
          <dt>Tempo</dt>
          <dd>{typeof meta.ms === 'number' ? `${meta.ms} ms` : '—'}</dd>
        </dl>

        {meta.promptUsed && (
          <details className="galeria-ia-prompt">
            <summary>Prompt usado</summary>
            <pre>{meta.promptUsed}</pre>
          </details>
        )}
      </div>
    </div>
  );
}
