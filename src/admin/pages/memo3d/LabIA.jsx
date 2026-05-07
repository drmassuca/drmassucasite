import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  Upload,
  Sparkles,
  Loader2,
  Download,
  AlertTriangle,
  Image as ImageIcon,
  Clock,
  DollarSign,
  X,
} from 'lucide-react';
import { labUploadPhoto, labGrokEdit } from '../../../lib/memo3d/api';
import { useMemo3dPath } from '../../../lib/memo3d/path-context';
import './memo3d.css';

const ALLOWED_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_BYTES = 4 * 1024 * 1024;
const HISTORY_KEY = 'memo3d_labia_history';
const HISTORY_LIMIT = 10;

const DEFAULT_PROMPT = `Hyper-realistic 3D ultrasound baby face enhancement. Preserve anatomical features, composition, and proportions exactly. Soft natural skin texture, warm gentle lighting, cinematic depth, realistic shading. Avoid: cartoon, anime, plastic skin, doll-like, deformed, added hair, blurry, distorted.`;

export default function LabIA() {
  const basePath = useMemo3dPath();
  const fileInputRef = useRef(null);
  const dragCounter = useRef(0);

  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [photoKey, setPhotoKey] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const [prompt, setPrompt] = useState(DEFAULT_PROMPT);
  const [generating, setGenerating] = useState(false);
  const [genError, setGenError] = useState(null);
  const [result, setResult] = useState(null); // { standard, quality }

  const [isDragOver, setIsDragOver] = useState(false);
  const [history, setHistory] = useState(() => loadHistory());

  // Revoga URL local ao trocar de arquivo
  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  function loadHistory() {
    try {
      const raw = window.sessionStorage.getItem(HISTORY_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (_) {
      return [];
    }
  }

  function saveHistory(next) {
    setHistory(next);
    try {
      window.sessionStorage.setItem(HISTORY_KEY, JSON.stringify(next));
    } catch (_) {
      /* ignore */
    }
  }

  async function handleFile(f) {
    if (!ALLOWED_MIMES.includes(f.type)) {
      setUploadError('Tipo não suportado (JPEG, PNG, WebP)');
      return;
    }
    if (f.size > MAX_BYTES) {
      setUploadError(`Arquivo maior que ${MAX_BYTES / 1024 / 1024}MB`);
      return;
    }
    setUploadError(null);
    setResult(null);
    setGenError(null);

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const localUrl = URL.createObjectURL(f);
    setFile(f);
    setPreviewUrl(localUrl);
    setPhotoKey(null);

    setUploading(true);
    try {
      const { key } = await labUploadPhoto(f);
      setPhotoKey(key);
    } catch (err) {
      setUploadError(err.message);
    } finally {
      setUploading(false);
    }
  }

  function clearFile() {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setPhotoKey(null);
    setResult(null);
    setUploadError(null);
    setGenError(null);
  }

  async function handleGenerate() {
    if (!photoKey) {
      setGenError('Espere o upload terminar.');
      return;
    }
    if (!prompt.trim() || prompt.trim().length < 3) {
      setGenError('Prompt obrigatório (mín 3 chars).');
      return;
    }
    setGenerating(true);
    setGenError(null);
    setResult(null);
    const startedAt = Date.now();
    try {
      const data = await labGrokEdit({ photoKey, prompt: prompt.trim() });
      setResult(data);
      const totalCost = (data.standard?.costUsd || 0) + (data.quality?.costUsd || 0);
      const entry = {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        ts: new Date().toISOString(),
        prompt: prompt.trim(),
        standardOk: !!data.standard?.ok,
        standardMs: data.standard?.ms,
        standardImages: data.standard?.images?.length || 0,
        qualityOk: !!data.quality?.ok,
        qualityMs: data.quality?.ms,
        qualityImages: data.quality?.images?.length || 0,
        totalCostUsd: totalCost,
        roundtripMs: Date.now() - startedAt,
      };
      saveHistory([entry, ...history].slice(0, HISTORY_LIMIT));
    } catch (err) {
      setGenError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  // Drag & drop
  function onDragEnter(e) {
    e.preventDefault();
    e.stopPropagation();
    if (!Array.from(e.dataTransfer.types || []).includes('Files')) return;
    dragCounter.current += 1;
    setIsDragOver(true);
  }
  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'copy';
  }
  function onDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current -= 1;
    if (dragCounter.current <= 0) {
      dragCounter.current = 0;
      setIsDragOver(false);
    }
  }
  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current = 0;
    setIsDragOver(false);
    const f = (e.dataTransfer.files || [])[0];
    if (f) handleFile(f);
  }

  return (
    <div className="memo3d-page lab-ia">
      <header className="page-header">
        <div>
          <Link to={basePath} className="back-link">
            <ArrowLeft size={14} /> voltar pro dashboard
          </Link>
          <h1>
            <Sparkles size={20} style={{ verticalAlign: 'middle', marginRight: 8 }} />
            Lab IA — comparador Grok
          </h1>
          <p>
            Sobe uma foto, ajusta o prompt e gera no <code>grok-imagine-image</code> ($0.02) e no{' '}
            <code>grok-imagine-image-quality</code> ($0.05) lado a lado pra calibrar antes de levar
            pra paciente.
          </p>
        </div>
      </header>

      <section className="section">
        <h2>1. Foto de referência</h2>
        {!file ? (
          <div
            className={`uploader-dropzone${isDragOver ? ' is-dragover' : ''}`}
            onDragEnter={onDragEnter}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            onDrop={onDrop}
            onClick={() => fileInputRef.current?.click()}
            role="button"
            tabIndex={0}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                fileInputRef.current?.click();
              }
            }}
          >
            <Upload size={28} />
            <p>
              <strong>{isDragOver ? 'Solte aqui' : 'Arraste uma foto ou clique'}</strong>
            </p>
            <p className="muted">
              JPEG, PNG ou WebP — até 4MB. Sem watermark (vai bruta pra Grok).
            </p>
            <input
              ref={fileInputRef}
              type="file"
              accept={ALLOWED_MIMES.join(',')}
              style={{ display: 'none' }}
              onChange={e => {
                const f = (e.target.files || [])[0];
                if (f) handleFile(f);
                e.target.value = '';
              }}
            />
          </div>
        ) : (
          <div className="lab-ia-source">
            <img src={previewUrl} alt="foto de referência" className="lab-ia-source-img" />
            <div className="lab-ia-source-meta">
              <strong>{file.name}</strong>
              <span className="muted">
                {file.type} · {(file.size / 1024).toFixed(0)} KB
              </span>
              {uploading && (
                <span className="muted">
                  <Loader2 className="spin" size={14} /> Subindo pro R2...
                </span>
              )}
              {photoKey && !uploading && <span className="muted">✓ Pronto: {photoKey}</span>}
              <button type="button" className="btn btn-secondary" onClick={clearFile}>
                <X size={14} /> Trocar foto
              </button>
            </div>
          </div>
        )}
        {uploadError && (
          <div className="error-banner" style={{ marginTop: 12 }}>
            <AlertTriangle size={14} /> {uploadError}
          </div>
        )}
      </section>

      <section className="section">
        <h2>2. Prompt</h2>
        <textarea
          className="lab-ia-prompt"
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={5}
          placeholder="Descreve a transformação..."
        />
        <div className="lab-ia-prompt-meta">
          <span className="muted">
            {prompt.length} chars · sem `negative_prompt` na xAI — ponha negativos como
            &ldquo;Avoid: ...&rdquo; no fim do positivo
          </span>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => setPrompt(DEFAULT_PROMPT)}
            disabled={prompt === DEFAULT_PROMPT}
          >
            Restaurar padrão
          </button>
        </div>
      </section>

      <section className="section">
        <button
          type="button"
          className="btn btn-primary lab-ia-generate"
          onClick={handleGenerate}
          disabled={!photoKey || uploading || generating}
        >
          {generating ? (
            <>
              <Loader2 className="spin" size={16} /> Gerando comparação...
            </>
          ) : (
            <>
              <Sparkles size={16} /> Gerar comparação (standard $0.02 + quality $0.05)
            </>
          )}
        </button>
        {genError && (
          <div className="error-banner" style={{ marginTop: 12 }}>
            <AlertTriangle size={14} /> {genError}
          </div>
        )}
      </section>

      {result && (
        <section className="section">
          <h2>3. Resultado</h2>
          <div className="lab-ia-grid">
            <ResultColumn
              title="grok-imagine-image"
              subtitle="Standard · $0.02/img"
              data={result.standard}
            />
            <ResultColumn
              title="grok-imagine-image-quality"
              subtitle="Quality · $0.05/img"
              data={result.quality}
            />
          </div>
        </section>
      )}

      {history.length > 0 && (
        <section className="section">
          <h2>Histórico desta sessão ({history.length})</h2>
          <table className="lab-ia-history">
            <thead>
              <tr>
                <th>Quando</th>
                <th>Prompt (corte)</th>
                <th>Standard</th>
                <th>Quality</th>
                <th>Custo total</th>
              </tr>
            </thead>
            <tbody>
              {history.map(h => (
                <tr key={h.id}>
                  <td>{new Date(h.ts).toLocaleTimeString('pt-BR')}</td>
                  <td className="lab-ia-history-prompt">
                    {h.prompt.slice(0, 80)}
                    {h.prompt.length > 80 ? '…' : ''}
                  </td>
                  <td>{h.standardOk ? `${h.standardImages} img · ${h.standardMs}ms` : '✗ erro'}</td>
                  <td>{h.qualityOk ? `${h.qualityImages} img · ${h.qualityMs}ms` : '✗ erro'}</td>
                  <td>${h.totalCostUsd.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => saveHistory([])}
            style={{ marginTop: 12 }}
          >
            Limpar histórico
          </button>
        </section>
      )}
    </div>
  );
}

function ResultColumn({ title, subtitle, data }) {
  return (
    <div className="lab-ia-col">
      <div className="lab-ia-col-header">
        <h3>{title}</h3>
        <span className="muted">{subtitle}</span>
      </div>
      <div className="lab-ia-col-stats">
        <span>
          <Clock size={12} /> {data.ms}ms
        </span>
        <span>
          <DollarSign size={12} /> {data.costUsd.toFixed(3)}
        </span>
        <span>
          <ImageIcon size={12} /> {data.images?.length || 0}
        </span>
      </div>
      {!data.ok && (
        <div className="error-banner">
          <AlertTriangle size={14} /> {data.error}
        </div>
      )}
      {data.ok && data.images?.length > 0 && (
        <div className="lab-ia-col-images">
          {data.images.map((url, i) => (
            <figure key={i} className="lab-ia-img">
              <img src={url} alt={`${title} variação ${i + 1}`} />
              <figcaption>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  download
                  className="btn btn-secondary"
                >
                  <Download size={12} /> Baixar
                </a>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
      {data.ok && (!data.images || data.images.length === 0) && (
        <p className="muted">Nenhuma imagem retornada.</p>
      )}
    </div>
  );
}
