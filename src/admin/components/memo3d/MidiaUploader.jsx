import { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, Film, X, Loader2 } from 'lucide-react';
import { uploadPhoto, uploadVideo } from '../../../lib/memo3d/api';
import { recordAudit } from '../../../lib/memo3d/audit';

const PHOTO_MIMES = ['image/jpeg', 'image/png', 'image/webp'];
const VIDEO_MIMES = ['video/mp4', 'video/quicktime', 'video/x-msvideo', 'video/webm'];
const PHOTO_MAX = 20 * 1024 * 1024;
const VIDEO_MAX = 100 * 1024 * 1024;

function detectKind(file) {
  if (PHOTO_MIMES.includes(file.type)) return 'photo';
  if (VIDEO_MIMES.includes(file.type)) return 'video';
  return null;
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

export default function MidiaUploader({ patientId, examId, onUploaded }) {
  const fileInputRef = useRef(null);
  const [queue, setQueue] = useState([]); // [{ id, file, kind, status: idle|uploading|done|error, error?, mediaId? }]

  function handleFiles(fileList) {
    const newItems = [];
    for (const file of fileList) {
      const kind = detectKind(file);
      if (!kind) {
        newItems.push({
          id: Math.random().toString(36).slice(2),
          file,
          kind: null,
          status: 'error',
          error: 'Tipo não suportado (JPEG, PNG, WebP, MP4, MOV, AVI, WebM)',
        });
        continue;
      }
      const max = kind === 'photo' ? PHOTO_MAX : VIDEO_MAX;
      if (file.size > max) {
        newItems.push({
          id: Math.random().toString(36).slice(2),
          file,
          kind,
          status: 'error',
          error: `Arquivo maior que ${max / 1024 / 1024}MB`,
        });
        continue;
      }
      newItems.push({
        id: Math.random().toString(36).slice(2),
        file,
        kind,
        status: 'idle',
      });
    }
    setQueue(q => [...q, ...newItems]);
    // dispara upload sequencial dos itens novos
    newItems.forEach(item => {
      if (item.status === 'idle') uploadOne(item.id, item.file, item.kind);
    });
  }

  async function uploadOne(itemId, file, kind) {
    setQueue(q => q.map(i => (i.id === itemId ? { ...i, status: 'uploading' } : i)));
    try {
      const fn = kind === 'photo' ? uploadPhoto : uploadVideo;
      const media = await fn({ patientId, examId, file });
      recordAudit({
        action: 'media.upload.client',
        resourceType: 'media',
        resourceId: media.id,
        metadata: { kind, filename: file.name },
      });
      setQueue(q =>
        q.map(i => (i.id === itemId ? { ...i, status: 'done', mediaId: media.id } : i))
      );
      onUploaded?.(media);
    } catch (err) {
      setQueue(q =>
        q.map(i => (i.id === itemId ? { ...i, status: 'error', error: err.message } : i))
      );
    }
  }

  function removeItem(itemId) {
    setQueue(q => q.filter(i => i.id !== itemId));
  }

  return (
    <div className="midia-uploader">
      <div className="uploader-dropzone">
        <Upload size={28} />
        <p>
          <strong>Adicionar mídia ao exame</strong>
        </p>
        <p className="muted">
          Fotos (JPEG, PNG, WebP — até 20MB) ou vídeo (MP4, MOV, AVI, WebM — até 100MB)
        </p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,video/mp4,video/quicktime,video/x-msvideo,video/webm"
          style={{ display: 'none' }}
          onChange={e => {
            handleFiles(Array.from(e.target.files || []));
            e.target.value = ''; // permite re-selecionar mesmo arquivo
          }}
        />
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => fileInputRef.current?.click()}
        >
          Escolher arquivos
        </button>
      </div>

      {queue.length > 0 && (
        <ul className="upload-queue">
          {queue.map(item => (
            <li key={item.id} className={`upload-item upload-${item.status}`}>
              <span className="upload-icon">
                {item.status === 'uploading' && <Loader2 className="spin" size={16} />}
                {item.status !== 'uploading' && item.kind === 'photo' && <ImageIcon size={16} />}
                {item.status !== 'uploading' && item.kind === 'video' && <Film size={16} />}
                {item.status !== 'uploading' && !item.kind && <X size={16} />}
              </span>
              <span className="upload-name">{item.file.name}</span>
              <span className="upload-size">{formatSize(item.file.size)}</span>
              <span className="upload-status">
                {item.status === 'idle' && 'Aguardando'}
                {item.status === 'uploading' && 'Enviando...'}
                {item.status === 'done' && 'Pronto ✓'}
                {item.status === 'error' && (item.error || 'Erro')}
              </span>
              {item.status !== 'uploading' && (
                <button
                  type="button"
                  className="upload-remove"
                  onClick={() => removeItem(item.id)}
                  aria-label="Remover da lista"
                >
                  <X size={14} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
