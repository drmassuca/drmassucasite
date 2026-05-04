import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, Film, Share2, Play, Download, X, Copy, Check } from 'lucide-react';
import {
  getPatientMe,
  signPatientR2,
  signPatientStream,
  createFamilyShare,
} from '../../lib/memo3d/api';
import { recordAudit } from '../../lib/memo3d/audit';
import ConsentModal from '../components/ConsentModal';
import '../paciente.css';

export default function Conta() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [previewMedia, setPreviewMedia] = useState(null);
  const [shareInfo, setShareInfo] = useState(null);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const me = await getPatientMe();
      // se precisa trocar senha, redireciona
      if (me.patient.must_change_password) {
        navigate('/memo3d/trocar-senha', { replace: true });
        return;
      }
      setData(me);
      setError(null);
    } catch (err) {
      // 401 → token expirado / sem login
      if (
        err.message === 'Authorization header ausente' ||
        err.message === 'Token inválido ou expirado' ||
        err.message === 'Token vazio'
      ) {
        navigate('/memo3d/login', { replace: true });
        return;
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    reload();
  }, [reload]);

  if (loading) {
    return (
      <div className="paciente-loading">
        <div className="spinner" />
        <span>Carregando suas memórias...</span>
      </div>
    );
  }

  if (error) {
    return <div className="error-banner">{error}</div>;
  }

  if (!data) return null;

  const { patient, exams } = data;

  // Termo não aceito → modal bloqueia visualização
  if (!patient.consent_lgpd_at) {
    return <ConsentModal onAccepted={() => reload()} />;
  }

  if (exams.length === 0) {
    return (
      <div className="conta-hero">
        <h1>Olá, {firstName(patient.full_name)}</h1>
        <p>Ainda não há memórias liberadas. Confira de novo após o pagamento na recepção.</p>
      </div>
    );
  }

  return (
    <>
      <div className="conta-hero">
        <h1>Olá, {firstName(patient.full_name)}</h1>
        <p>Aqui estão suas memórias da gestação.</p>
        {exams[0]?.expires_at && (
          <span className="conta-expira">
            Disponíveis até {new Date(exams[0].expires_at).toLocaleDateString('pt-BR')}
          </span>
        )}
      </div>

      {exams.map(exam => (
        <ExamSection
          key={exam.id}
          exam={exam}
          onPreview={setPreviewMedia}
          onShare={async () => {
            try {
              const share = await createFamilyShare(exam.id);
              const url = `${window.location.origin}/memo3d/familia?token=${encodeURIComponent(share.token)}`;
              setShareInfo({ url, expiresAt: share.expiresAt });
              recordAudit({
                action: 'patient.share.create.client',
                resourceType: 'share',
                resourceId: share.shareId,
              });
            } catch (err) {
              alert(`Erro ao compartilhar: ${err.message}`);
            }
          }}
        />
      ))}

      {previewMedia && <MediaPreview media={previewMedia} onClose={() => setPreviewMedia(null)} />}

      {shareInfo && <ShareLinkModal info={shareInfo} onClose={() => setShareInfo(null)} />}
    </>
  );
}

function ExamSection({ exam, onPreview, onShare }) {
  const videos = (exam.memo_media || []).filter(m => m.kind === 'video');
  const photos = (exam.memo_media || []).filter(m => m.kind === 'photo');
  const bookPages = (exam.memo_media || []).filter(m => m.kind === 'book_page');

  return (
    <>
      {videos.length > 0 && (
        <section className="conta-section">
          <div className="conta-section-header">
            <h2>
              Vídeos <small>· {new Date(exam.exam_date).toLocaleDateString('pt-BR')}</small>
            </h2>
            <button type="button" className="conta-share-btn" onClick={onShare}>
              <Share2 size={14} /> Compartilhar com família
            </button>
          </div>
          <div className="midia-grid">
            {videos.map(m => (
              <MediaCard key={m.id} media={m} onClick={() => onPreview(m)} />
            ))}
          </div>
        </section>
      )}

      {photos.length > 0 && (
        <section className="conta-section">
          <div className="conta-section-header">
            <h2>
              Fotos <small>· {new Date(exam.exam_date).toLocaleDateString('pt-BR')}</small>
            </h2>
          </div>
          <div className="midia-grid">
            {photos.map(m => (
              <MediaCard key={m.id} media={m} onClick={() => onPreview(m)} />
            ))}
          </div>
        </section>
      )}

      {bookPages.length > 0 && (
        <section className="conta-section">
          <div className="conta-section-header">
            <h2>Book 3D</h2>
          </div>
          <div className="midia-grid">
            {bookPages.map(m => (
              <MediaCard key={m.id} media={m} onClick={() => onPreview(m)} />
            ))}
          </div>
        </section>
      )}
    </>
  );
}

function MediaCard({ media, onClick }) {
  const isVideo = media.kind === 'video';
  return (
    <div className="midia-card">
      <div className="midia-card-thumb" onClick={onClick}>
        {isVideo ? (
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
        {!isVideo && <DownloadBtn media={media} />}
      </div>
    </div>
  );
}

function DownloadBtn({ media }) {
  const [loading, setLoading] = useState(false);
  return (
    <button
      type="button"
      className="midia-action-btn"
      title="Baixar"
      disabled={loading}
      onClick={async e => {
        e.stopPropagation();
        setLoading(true);
        try {
          const { url } = await signPatientR2(media.id);
          recordAudit({
            action: 'patient.media.download',
            resourceType: 'media',
            resourceId: media.id,
          });
          window.open(url, '_blank', 'noopener');
        } catch (err) {
          alert(`Erro: ${err.message}`);
        } finally {
          setLoading(false);
        }
      }}
    >
      <Download size={14} />
    </button>
  );
}

function MediaPreview({ media, onClose }) {
  const [src, setSrc] = useState(null);
  const [streamSrc, setStreamSrc] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      try {
        if (media.kind === 'video') {
          const r = await signPatientStream(media.id);
          if (cancelled) return;
          setStreamSrc(`https://${r.customerSubdomain}/${r.token}/iframe`);
        } else {
          const r = await signPatientR2(media.id);
          if (cancelled) return;
          setSrc(r.url);
        }
      } catch (err) {
        if (!cancelled) setError(err.message);
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [media]);

  return (
    <div className="midia-modal" onClick={onClose}>
      <div className="midia-modal-content" onClick={e => e.stopPropagation()}>
        <button type="button" className="midia-modal-close" onClick={onClose}>
          <X size={14} /> Fechar
        </button>
        {error && <div className="error-banner">{error}</div>}
        {!error && media.kind === 'video' && streamSrc && (
          <iframe
            src={streamSrc}
            allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
            allowFullScreen
            title="Vídeo do exame"
          />
        )}
        {!error && media.kind !== 'video' && src && (
          <img src={src} alt={media.filename || 'foto'} />
        )}
        {!error && !src && !streamSrc && (
          <div className="paciente-loading">
            <div className="spinner" />
          </div>
        )}
      </div>
    </div>
  );
}

function ShareLinkModal({ info, onClose }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="midia-modal" onClick={onClose}>
      <div className="consent-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 540 }}>
        <h2>
          <Share2 size={20} style={{ verticalAlign: 'middle', marginRight: 8, color: '#d4af37' }} />
          Link gerado
        </h2>
        <p>Esse link funciona por 24 horas. Envie para sua família via WhatsApp ou outro app.</p>
        <div className="password-row" style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
          <code
            style={{
              flex: 1,
              background: '#f8fafc',
              border: '1px solid #e2e8f0',
              padding: '0.6rem',
              borderRadius: 8,
              fontSize: '0.85rem',
              wordBreak: 'break-all',
            }}
          >
            {info.url}
          </code>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              navigator.clipboard.writeText(info.url);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
          >
            {copied ? (
              <>
                <Check size={14} /> Copiado
              </>
            ) : (
              <>
                <Copy size={14} /> Copiar
              </>
            )}
          </button>
        </div>
        <p style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.75rem' }}>
          Expira em {new Date(info.expiresAt).toLocaleString('pt-BR')}
        </p>
        <div className="consent-actions">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}

function firstName(full) {
  if (!full) return '';
  return full.trim().split(/\s+/)[0];
}
