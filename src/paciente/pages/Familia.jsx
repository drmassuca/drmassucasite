import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Image as ImageIcon, Film, Hourglass, Play, X } from 'lucide-react';
import { viewFamilyShare, viewFamilyShareMedia } from '../../lib/memo3d/api';
import '../paciente.css';

/**
 * Página pública de visualização compartilhada com a família.
 * Acessada via /memo3d/familia?token=<token>. Sem login.
 *
 * - Token expirado → mostra mensagem.
 * - Sem download na UI (botão de download não aparece).
 * - Visualização gera signed URL/token de TTL curto.
 */
export default function Familia() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [share, setShare] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!token) {
        setError('Link inválido.');
        setLoading(false);
        return;
      }
      try {
        const r = await viewFamilyShare(token);
        if (!cancelled) setShare(r);
      } catch (err) {
        if (!cancelled) setError(err.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (loading) {
    return (
      <div className="paciente-layout">
        <header className="paciente-header">
          <span className="paciente-brand">
            <img src="/logo.webp" alt="Dr. Massuca" className="paciente-brand-logo" /> <strong>Memo3D</strong>
          </span>
        </header>
        <div className="paciente-loading">
          <div className="spinner" />
          <span>Carregando memórias compartilhadas...</span>
        </div>
      </div>
    );
  }

  if (error || !share) {
    return (
      <div className="paciente-layout">
        <header className="paciente-header">
          <span className="paciente-brand">
            <img src="/logo.webp" alt="Dr. Massuca" className="paciente-brand-logo" /> <strong>Memo3D</strong>
          </span>
        </header>
        <div className="familia-page">
          <div className="familia-hero">
            <h1>Link inválido ou expirado</h1>
            <p>{error || 'Verifique se o link está completo ou peça um novo à família.'}</p>
          </div>
        </div>
      </div>
    );
  }

  const { exam, medias, expiresAt } = share;

  return (
    <div className="paciente-layout">
      <header className="paciente-header">
        <span className="paciente-brand">
          <img src="/logo.webp" alt="Dr. Massuca" className="paciente-brand-logo" />
          <div>
            <strong>Memo3D</strong>
            <span>compartilhado por {exam.patient_name}</span>
          </div>
        </span>
      </header>

      <div className="familia-page">
        <div className="familia-hero">
          <h1>Memórias de {exam.patient_name}</h1>
          <p>Exame de {new Date(exam.exam_date).toLocaleDateString('pt-BR')}</p>
          <span className="familia-expires">
            <Hourglass size={14} /> Disponível até {new Date(expiresAt).toLocaleString('pt-BR')}
          </span>
        </div>

        <div className="midia-grid">
          {medias.map(m => (
            <FamiliaCard key={m.id} token={token} media={m} onClick={() => setPreviewMedia(m)} />
          ))}
        </div>
      </div>

      {previewMedia && (
        <FamiliaPreview token={token} media={previewMedia} onClose={() => setPreviewMedia(null)} />
      )}
    </div>
  );
}

function FamiliaCard({ token, media, onClick }) {
  const isVideo = media.kind === 'video';
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadThumb() {
      try {
        const r = await viewFamilyShareMedia(token, media.id);
        if (cancelled) return;
        if (r.kind === 'video') {
          setThumbUrl(
            `https://${r.customerSubdomain}/${r.streamToken}/thumbnails/thumbnail.jpg?time=2s&height=240`
          );
        } else {
          setThumbUrl(r.url);
        }
      } catch (_) {
        /* fallback pra ícone */
      }
    }
    loadThumb();
    return () => {
      cancelled = true;
    };
  }, [token, media.id]);

  return (
    <div className="midia-card">
      <div className="midia-card-thumb" onClick={onClick}>
        {thumbUrl ? (
          <img src={thumbUrl} alt={media.filename || ''} />
        ) : isVideo ? (
          <Film className="midia-card-thumb-icon" />
        ) : (
          <ImageIcon className="midia-card-thumb-icon" />
        )}
        <div className="midia-play-overlay">
          {isVideo ? <Play size={36} /> : <ImageIcon size={36} />}
        </div>
      </div>
      <div className="midia-card-meta">
        <span>{isVideo ? 'Vídeo' : 'Foto'}</span>
      </div>
    </div>
  );
}

function FamiliaPreview({ token, media, onClose }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        const r = await viewFamilyShareMedia(token, media.id);
        if (!cancelled) setData(r);
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [token, media]);

  return (
    <div className="midia-modal" onClick={onClose}>
      <div className="midia-modal-content" onClick={e => e.stopPropagation()}>
        <button type="button" className="midia-modal-close" onClick={onClose}>
          <X size={14} /> Fechar
        </button>
        {error && <div className="error-banner">{error}</div>}
        {!error && data && data.kind === 'video' && (
          <iframe
            src={`https://${data.customerSubdomain}/${data.streamToken}/iframe`}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            title="Vídeo compartilhado"
          />
        )}
        {!error && data && data.kind !== 'video' && (
          <img src={data.url} alt={media.filename || 'foto'} draggable={false} />
        )}
        {!error && !data && (
          <div className="paciente-loading">
            <div className="spinner" />
          </div>
        )}
      </div>
    </div>
  );
}
