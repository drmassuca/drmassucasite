import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { Upload, X, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';
import { uploadImage, deleteImage, getPathFromUrl } from '../../../lib/storage';
import './ImageUpload.css';

const ImageUpload = ({ value, onChange, folder = 'covers' }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragActive, setDragActive] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async file => {
    if (!file) return;

    setUploading(true);
    setError('');

    try {
      const result = await uploadImage(file, folder);
      onChange(result.url);
    } catch (err) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleInputChange = e => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleDrag = e => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      handleFile(file);
    }
  };

  const handleRemove = async () => {
    if (!value) return;

    // Tentar excluir do storage se for URL do Supabase
    const path = getPathFromUrl(value);
    if (path) {
      try {
        await deleteImage(path);
      } catch (err) {
        console.error('Erro ao excluir imagem:', err);
      }
    }

    onChange('');
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="image-upload">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp,image/gif"
        onChange={handleInputChange}
        className="hidden-input"
      />

      {value ? (
        // Preview da imagem
        <div className="image-preview-container">
          <img src={value} alt="Preview" className="image-preview-img" />
          <div className="image-preview-overlay">
            <button
              type="button"
              onClick={handleClick}
              className="overlay-btn"
              title="Trocar imagem"
            >
              <Upload size={18} />
            </button>
            <button
              type="button"
              onClick={handleRemove}
              className="overlay-btn danger"
              title="Remover imagem"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ) : (
        // Área de upload
        <div
          className={`upload-area ${dragActive ? 'drag-active' : ''} ${uploading ? 'uploading' : ''}`}
          onClick={handleClick}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          {uploading ? (
            <>
              <Loader2 size={32} className="upload-icon spinning" />
              <span className="upload-text">Enviando...</span>
            </>
          ) : (
            <>
              <ImageIcon size={32} className="upload-icon" />
              <span className="upload-text">Clique ou arraste uma imagem</span>
              <span className="upload-hint">JPG, PNG, WebP ou GIF • Máx. 5MB</span>
            </>
          )}
        </div>
      )}

      {error && (
        <div className="upload-error">
          <X size={14} />
          {error}
        </div>
      )}

      {/* Campo para URL manual */}
      <div className="url-input-wrapper">
        <input
          type="text"
          value={value}
          onChange={e => onChange(e.target.value)}
          className="url-input"
          placeholder="Ou cole uma URL de imagem..."
        />
      </div>
    </div>
  );
};

ImageUpload.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  folder: PropTypes.string,
};

export default ImageUpload;
