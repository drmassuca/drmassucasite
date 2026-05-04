import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Image as ImageIcon,
  Film,
  Share2,
  Play,
  Download,
  X,
  Copy,
  Check,
  Calendar,
  Activity,
  Hourglass,
  Sparkles,
  ShieldCheck,
  MessageCircle,
} from 'lucide-react';
import {
  getPatientMe,
  signPatientR2,
  signPatientStream,
  createFamilyShare,
} from '../../lib/memo3d/api';
import { recordAudit } from '../../lib/memo3d/audit';
import ConsentModal from '../components/ConsentModal';
import '../paciente.css';

const TYPE_LABELS = {
  morfologico_1tri: 'Morfológico 1º trimestre',
  morfologico_2tri: 'Morfológico 2º trimestre',
  doppler: 'Doppler obstétrico',
  obstetrico: 'Obstétrico',
  '4d': 'Ultrassom 4D',
  outro: 'Outro',
};

const DEVICE_LABELS = {
  voluson_s10: 'GE Voluson S10',
  hera_z20: 'Samsung HERA Z20',
};

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
        <p>
          {exams.length === 1
            ? 'Aqui está sua memória.'
            : `Você tem ${exams.length} exames com memórias liberadas.`}
        </p>
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

      {/* Cards informativos pra dar densidade visual e antecipar dúvidas */}
      <section className="conta-extras">
        <div className="conta-extras-rule" />
        <div className="conta-extras-grid">
          <article className="conta-extra-card">
            <Share2 className="conta-extra-icon" />
            <h3>Compartilhe com a família</h3>
            <p>
              Use o botão <em>compartilhar com família</em> em qualquer exame. O link
              gerado dura 24 horas — sem necessidade de cadastro pra quem recebe.
            </p>
          </article>
          <article className="conta-extra-card">
            <Sparkles className="conta-extra-icon" />
            <h3>Impressão 3D do bebê</h3>
            <p>
              Curtiu uma das fotos? Fale com a clínica pelo WhatsApp e a gente
              transforma a imagem em escultura física, sob encomenda.
            </p>
            <a
              href="https://wa.me/5562996602117?text=Olá%21%20Quero%20saber%20sobre%20a%20impressão%203D%20a%20partir%20da%20minha%20galeria."
              target="_blank"
              rel="noopener noreferrer"
              className="conta-extra-link"
            >
              Falar no WhatsApp →
            </a>
          </article>
          <article className="conta-extra-card">
            <ShieldCheck className="conta-extra-icon" />
            <h3>Sua memória, segura</h3>
            <p>
              Suas memórias ficam disponíveis por 12 meses. Após esse período, são
              apagadas em definitivo. Você pode pedir exclusão antecipada a qualquer
              momento.
            </p>
          </article>
        </div>
      </section>

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
    <section className="exam-section">
      <header className="exam-section-header">
        <div className="exam-section-info">
          <h2>
            <Calendar size={18} /> Exame de{' '}
            {new Date(exam.exam_date).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric',
            })}
          </h2>
          <div className="exam-section-tags">
            {exam.exam_type && (
              <span className="exam-section-tag">
                {TYPE_LABELS[exam.exam_type] || exam.exam_type}
              </span>
            )}
            {exam.device && (
              <span className="exam-section-tag exam-section-device">
                <Activity size={11} /> {DEVICE_LABELS[exam.device] || exam.device}
              </span>
            )}
            {exam.expires_at && (
              <span className="exam-section-expires">
                <Hourglass size={11} /> até {new Date(exam.expires_at).toLocaleDateString('pt-BR')}
              </span>
            )}
          </div>
        </div>
        <button type="button" className="conta-share-btn" onClick={onShare}>
          <Share2 size={14} /> Compartilhar com família
        </button>
      </header>

      {exam.memo_media.length === 0 ? (
        <p className="exam-section-empty">Nenhuma mídia neste exame ainda.</p>
      ) : (
        <>
          {videos.length > 0 && (
            <div className="exam-subsection">
              <h3>
                Vídeos <span className="count">({videos.length})</span>
              </h3>
              <div className="midia-grid">
                {videos.map(m => (
                  <MediaCard key={m.id} media={m} onClick={() => onPreview(m)} />
                ))}
              </div>
            </div>
          )}

          {photos.length > 0 && (
            <div className="exam-subsection">
              <h3>
                Fotos <span className="count">({photos.length})</span>
              </h3>
              <div className="midia-grid">
                {photos.map(m => (
                  <MediaCard key={m.id} media={m} onClick={() => onPreview(m)} />
                ))}
              </div>
            </div>
          )}

          {bookPages.length > 0 && (
            <div className="exam-subsection">
              <h3>
                Book 3D <span className="count">({bookPages.length})</span>
              </h3>
              <div className="midia-grid">
                {bookPages.map(m => (
                  <MediaCard key={m.id} media={m} onClick={() => onPreview(m)} />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
}

function MediaCard({ media, onClick }) {
  const isVideo = media.kind === 'video';
  const [thumbUrl, setThumbUrl] = useState(null);

  useEffect(() => {
    let cancelled = false;
    async function loadThumb() {
      try {
        if (isVideo) {
          const r = await signPatientStream(media.id, { audit: false });
          if (cancelled) return;
          // Frame em ~2s do vídeo, altura 240px (Stream redimensiona)
          setThumbUrl(
            `https://${r.customerSubdomain}/${r.token}/thumbnails/thumbnail.jpg?time=2s&height=240`
          );
        } else {
          const r = await signPatientR2(media.id, { audit: false });
          if (cancelled) return;
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
  }, [media.id, isVideo]);

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
