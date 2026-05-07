import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Sparkles,
  Loader2,
  AlertTriangle,
  Save,
  RotateCcw,
  Check,
  ShoppingCart,
} from 'lucide-react';
import { signPatientR2, enhancePhoto, saveEnhancedPhoto } from '../../lib/memo3d/api';
import { useCredits } from '../contexts/CreditsContext';
import '../paciente.css';

const SKIN_TONES = [
  { id: 'padrao', label: 'Padrão' },
  { id: 'clara', label: 'Clara' },
  { id: 'parda', label: 'Morena/Parda' },
  { id: 'negra', label: 'Negra' },
];

const PRESETS = [
  {
    id: 'fiel',
    label: 'Fiel',
    description: 'Limpa o ultrassom mantendo aparência original',
  },
  {
    id: 'medio',
    label: 'Médio',
    description: 'Refina mantendo composição',
  },
  {
    id: 'realista',
    label: 'Realista',
    description: 'Retrato fotográfico em close-up',
  },
];

export default function MelhorarIA() {
  const { mediaId } = useParams();
  const navigate = useNavigate();
  const { balance, costPerPhoto, setBalance, photosRemaining } = useCredits();
  const [sourceUrl, setSourceUrl] = useState(null);
  const [loadingSource, setLoadingSource] = useState(true);
  const [skinTone, setSkinTone] = useState('padrao');
  const [preset, setPreset] = useState('medio');
  const [generating, setGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);

  const insufficientCredits = balance != null && balance < costPerPhoto;

  useEffect(() => {
    let cancelled = false;
    async function loadSource() {
      try {
        setLoadingSource(true);
        setError(null);
        const r = await signPatientR2(mediaId, { audit: false });
        if (cancelled) return;
        setSourceUrl(r.url);
      } catch (err) {
        if (!cancelled) {
          if (
            err.message === 'Authorization header ausente' ||
            err.message === 'Token inválido ou expirado' ||
            err.message === 'Token vazio'
          ) {
            navigate('/memo3d/login', { replace: true });
            return;
          }
          setError(err.message);
        }
      } finally {
        if (!cancelled) setLoadingSource(false);
      }
    }
    loadSource();
    return () => {
      cancelled = true;
    };
  }, [mediaId, navigate]);

  async function handleGenerate() {
    if (insufficientCredits) {
      setShowBuyModal(true);
      return;
    }
    setGenerating(true);
    setError(null);
    setResult(null);
    setSaved(false);
    try {
      const data = await enhancePhoto({ mediaId, preset, skinTone });
      setResult(data);
      // Servidor já debitou — atualiza saldo localmente sem refetch
      if (typeof data.creditsBalance === 'number') {
        setBalance(data.creditsBalance);
      }
    } catch (err) {
      // 402 = saldo insuficiente; abre modal de compra
      if (
        err.message?.includes('Saldo insuficiente') ||
        err.message?.includes('saldo insuficiente')
      ) {
        setShowBuyModal(true);
      } else {
        setError(err.message);
      }
    } finally {
      setGenerating(false);
    }
  }

  async function handleSave() {
    if (!result) return;
    setSaving(true);
    setError(null);
    try {
      await saveEnhancedPhoto({
        sourceMediaId: mediaId,
        generatedImageUrl: result.generatedUrl,
        preset: result.preset,
        skinTone: result.skinTone,
        costUsd: result.costUsd,
        model: result.model,
        ms: result.ms,
        promptUsed: result.promptUsed,
      });
      setSaved(true);
      setTimeout(() => navigate('/memo3d/conta'), 1500);
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  }

  return (
    <div className="melhorar-ia">
      <header className="melhorar-ia-header">
        <Link to="/memo3d/conta" className="melhorar-ia-back">
          <ArrowLeft size={14} /> voltar pra galeria
        </Link>
        <h1>
          <Sparkles size={20} /> Melhorar com IA
        </h1>
        <p>
          Sua foto refinada com inteligência artificial — escolha o estilo, gere e salve o que ficar
          melhor.
        </p>
      </header>

      {error && (
        <div className="error-banner">
          <AlertTriangle size={14} /> {error}
        </div>
      )}

      <div className="melhorar-ia-grid">
        <section className="melhorar-ia-source">
          <h2>Foto original</h2>
          {loadingSource ? (
            <div className="paciente-loading">
              <div className="spinner" />
            </div>
          ) : sourceUrl ? (
            <img src={sourceUrl} alt="foto original" className="melhorar-ia-img" />
          ) : null}
        </section>

        <section className="melhorar-ia-controls">
          <div className="melhorar-ia-block">
            <h3>Tom de pele do bebê</h3>
            <p className="muted">
              Escolha o que mais combina com sua família — a IA não tem como saber só pela foto.
            </p>
            <div className="melhorar-ia-skintone">
              {SKIN_TONES.map(t => (
                <button
                  key={t.id}
                  type="button"
                  className={`melhorar-ia-skin-btn${skinTone === t.id ? ' is-active' : ''}`}
                  onClick={() => setSkinTone(t.id)}
                  disabled={generating}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="melhorar-ia-block">
            <h3>Estilo</h3>
            <div className="melhorar-ia-presets">
              {PRESETS.map(p => (
                <button
                  key={p.id}
                  type="button"
                  className={`melhorar-ia-preset${preset === p.id ? ' is-active' : ''}`}
                  onClick={() => setPreset(p.id)}
                  disabled={generating}
                >
                  <strong>{p.label}</strong>
                  <span>{p.description}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="melhorar-ia-cost">
            <span>
              Esta operação custa <strong>{costPerPhoto} créditos</strong>
            </span>
            <span className="muted">
              {balance == null
                ? '— carregando saldo...'
                : `Saldo: ${balance} · ${photosRemaining} foto${photosRemaining === 1 ? '' : 's'} restantes`}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary melhorar-ia-generate"
            onClick={handleGenerate}
            disabled={!sourceUrl || generating}
          >
            {generating ? (
              <>
                <Loader2 className="spin" size={16} /> Gerando...
              </>
            ) : insufficientCredits ? (
              <>
                <ShoppingCart size={16} /> Comprar créditos
              </>
            ) : result ? (
              <>
                <RotateCcw size={16} /> Gerar de novo ({costPerPhoto} créditos)
              </>
            ) : (
              <>
                <Sparkles size={16} /> Gerar versão melhorada ({costPerPhoto} créditos)
              </>
            )}
          </button>
        </section>
      </div>

      {showBuyModal && <BuyCreditsModal onClose={() => setShowBuyModal(false)} />}

      {result && (
        <section className="melhorar-ia-result">
          <h2>Resultado</h2>
          <p className="muted">
            Compare com sua foto original. Se gostar, salve nas suas memórias.
          </p>
          <div className="melhorar-ia-compare">
            <figure>
              <figcaption>Original</figcaption>
              <img src={sourceUrl} alt="original" />
            </figure>
            <figure>
              <figcaption>Melhorada</figcaption>
              <img src={result.generatedUrl} alt="melhorada" />
            </figure>
          </div>
          <div className="melhorar-ia-actions">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSave}
              disabled={saving || saved}
            >
              {saved ? (
                <>
                  <Check size={16} /> Salva! Voltando pra galeria...
                </>
              ) : saving ? (
                <>
                  <Loader2 className="spin" size={16} /> Salvando...
                </>
              ) : (
                <>
                  <Save size={16} /> Salvar nas minhas memórias
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setResult(null)}
              disabled={saving || saved}
            >
              Descartar e tentar outro estilo
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

function BuyCreditsModal({ onClose }) {
  return (
    <div className="midia-modal" onClick={onClose}>
      <div className="consent-card" onClick={e => e.stopPropagation()} style={{ maxWidth: 520 }}>
        <h2>
          <ShoppingCart size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
          Comprar créditos de IA
        </h2>
        <p>
          Você usou seus créditos disponíveis. Em breve será possível comprar mais créditos
          diretamente aqui pelo site.
        </p>
        <p>
          Por enquanto, fale com a clínica pelo WhatsApp para liberar créditos extras na sua conta:
        </p>
        <div className="consent-actions">
          <a
            href="https://wa.me/5562996602117?text=Ol%C3%A1%21%20Quero%20comprar%20mais%20cr%C3%A9ditos%20de%20IA%20pra%20melhorar%20minhas%20fotos%20no%20Memo3D."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ShoppingCart size={14} /> Falar com a clínica
          </a>
          <button type="button" onClick={onClose} className="btn btn-secondary">
            Fechar
          </button>
        </div>
      </div>
    </div>
  );
}
