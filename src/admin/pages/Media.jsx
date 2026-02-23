import { useState, useEffect, useRef } from 'react';
import {
  Upload,
  Trash2,
  Copy,
  Check,
  Loader2,
  Image as ImageIcon,
  FolderOpen,
  Grid,
  List,
  Search,
  X,
  ExternalLink,
} from 'lucide-react';
import { uploadImage, deleteImage, listImages } from '../../lib/storage';
import './Media.css';

const FOLDERS = [
  { id: 'all', name: 'Todas', icon: FolderOpen },
  { id: 'covers', name: 'Capas', icon: ImageIcon },
  { id: 'content', name: 'Conteúdo', icon: ImageIcon },
  { id: 'misc', name: 'Outros', icon: FolderOpen },
];

const Media = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' ou 'list'
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImages, setSelectedImages] = useState([]);
  const [copiedUrl, setCopiedUrl] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchImages();
  }, [selectedFolder]);

  const fetchImages = async () => {
    setLoading(true);
    try {
      let allImages = [];

      if (selectedFolder === 'all') {
        // Buscar de todas as pastas
        const folders = ['covers', 'content', 'misc'];
        for (const folder of folders) {
          try {
            const folderImages = await listImages(folder);
            allImages = [...allImages, ...folderImages.map(img => ({ ...img, folder }))];
          } catch {
            // Pasta pode não existir ainda
          }
        }
        // Também buscar imagens na raiz
        try {
          const rootImages = await listImages('');
          allImages = [...allImages, ...rootImages.map(img => ({ ...img, folder: 'root' }))];
        } catch {
          // Pasta raiz pode não existir
        }
      } else {
        const folderImages = await listImages(selectedFolder);
        allImages = folderImages.map(img => ({ ...img, folder: selectedFolder }));
      }

      // Ordenar por data (mais recente primeiro)
      allImages.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

      setImages(allImages);
    } catch (error) {
      console.error('Erro ao carregar imagens:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async files => {
    if (!files || files.length === 0) return;

    setUploading(true);
    const folder = selectedFolder === 'all' ? 'misc' : selectedFolder;

    try {
      for (const file of files) {
        if (!file.type.startsWith('image/')) continue;
        await uploadImage(file, folder);
      }
      await fetchImages();
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleFileInput = e => {
    handleUpload(e.target.files);
    e.target.value = '';
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
    handleUpload(e.dataTransfer.files);
  };

  const handleDelete = async image => {
    if (!window.confirm('Tem certeza que deseja excluir esta imagem?')) return;

    try {
      await deleteImage(image.path);
      setImages(images.filter(img => img.path !== image.path));
      setSelectedImages(selectedImages.filter(path => path !== image.path));
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir imagem');
    }
  };

  const handleDeleteSelected = async () => {
    if (!window.confirm(`Excluir ${selectedImages.length} imagem(ns)?`)) return;

    try {
      for (const path of selectedImages) {
        await deleteImage(path);
      }
      setImages(images.filter(img => !selectedImages.includes(img.path)));
      setSelectedImages([]);
    } catch (error) {
      console.error('Erro ao excluir:', error);
      alert('Erro ao excluir imagens');
    }
  };

  const handleCopyUrl = async url => {
    try {
      await navigator.clipboard.writeText(url);
      setCopiedUrl(url);
      setTimeout(() => setCopiedUrl(null), 2000);
    } catch (error) {
      console.error('Erro ao copiar:', error);
    }
  };

  const toggleSelect = path => {
    setSelectedImages(prev =>
      prev.includes(path) ? prev.filter(p => p !== path) : [...prev, path]
    );
  };

  const formatFileSize = bytes => {
    if (!bytes) return '-';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  const formatDate = dateString => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  const filteredImages = images.filter(img =>
    img.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="media-page">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Mídia</h1>
          <p className="page-subtitle">Gerencie as imagens do blog</p>
        </div>
        <div className="header-actions">
          {selectedImages.length > 0 && (
            <button onClick={handleDeleteSelected} className="btn btn-danger">
              <Trash2 size={18} />
              Excluir ({selectedImages.length})
            </button>
          )}
          <button
            onClick={() => fileInputRef.current?.click()}
            className="btn btn-primary"
            disabled={uploading}
          >
            {uploading ? (
              <>
                <Loader2 size={18} className="spinner-icon" /> Enviando...
              </>
            ) : (
              <>
                <Upload size={18} /> Upload
              </>
            )}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileInput}
            className="hidden"
          />
        </div>
      </div>

      {/* Toolbar */}
      <div className="media-toolbar">
        <div className="toolbar-left">
          {/* Folders */}
          <div className="folder-tabs">
            {FOLDERS.map(folder => (
              <button
                key={folder.id}
                onClick={() => setSelectedFolder(folder.id)}
                className={`folder-tab ${selectedFolder === folder.id ? 'active' : ''}`}
              >
                <folder.icon size={16} />
                {folder.name}
              </button>
            ))}
          </div>
        </div>

        <div className="toolbar-right">
          {/* Search */}
          <div className="search-box">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar imagens..."
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              className="search-input"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="clear-search">
                <X size={14} />
              </button>
            )}
          </div>

          {/* View Toggle */}
          <div className="view-toggle">
            <button
              onClick={() => setViewMode('grid')}
              className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
              title="Grade"
            >
              <Grid size={18} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
              title="Lista"
            >
              <List size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Upload Drop Zone */}
      <div
        className={`drop-zone ${dragActive ? 'active' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} />
        <span>Arraste imagens aqui ou clique para fazer upload</span>
        <span className="drop-zone-hint">JPG, PNG, WebP, GIF • Máx. 5MB cada</span>
      </div>

      {/* Content */}
      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
        </div>
      ) : filteredImages.length === 0 ? (
        <div className="empty-state">
          <ImageIcon className="empty-state-icon" />
          <h3 className="empty-state-title">Nenhuma imagem encontrada</h3>
          <p className="empty-state-text">
            {searchTerm ? 'Tente uma busca diferente' : 'Faça upload da sua primeira imagem'}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="images-grid">
          {filteredImages.map(image => (
            <div
              key={image.path}
              className={`image-card ${selectedImages.includes(image.path) ? 'selected' : ''}`}
            >
              <div className="image-checkbox">
                <input
                  type="checkbox"
                  checked={selectedImages.includes(image.path)}
                  onChange={() => toggleSelect(image.path)}
                />
              </div>
              <div className="image-preview">
                <img src={image.url} alt={image.name} loading="lazy" />
              </div>
              <div className="image-info">
                <span className="image-name" title={image.name}>
                  {image.name}
                </span>
                <span className="image-meta">{formatFileSize(image.metadata?.size)}</span>
              </div>
              <div className="image-actions">
                <button
                  onClick={() => handleCopyUrl(image.url)}
                  className="action-btn"
                  title="Copiar URL"
                >
                  {copiedUrl === image.url ? <Check size={16} /> : <Copy size={16} />}
                </button>
                <a
                  href={image.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="action-btn"
                  title="Abrir em nova aba"
                >
                  <ExternalLink size={16} />
                </a>
                <button
                  onClick={() => handleDelete(image)}
                  className="action-btn delete"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="images-list">
          <table className="media-table">
            <thead>
              <tr>
                <th style={{ width: 40 }}></th>
                <th style={{ width: 80 }}>Preview</th>
                <th>Nome</th>
                <th>Pasta</th>
                <th>Tamanho</th>
                <th>Data</th>
                <th style={{ width: 120 }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredImages.map(image => (
                <tr
                  key={image.path}
                  className={selectedImages.includes(image.path) ? 'selected' : ''}
                >
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedImages.includes(image.path)}
                      onChange={() => toggleSelect(image.path)}
                    />
                  </td>
                  <td>
                    <img src={image.url} alt="" className="list-thumbnail" />
                  </td>
                  <td>
                    <span className="list-name" title={image.name}>
                      {image.name}
                    </span>
                  </td>
                  <td>
                    <span className="folder-badge">{image.folder}</span>
                  </td>
                  <td>{formatFileSize(image.metadata?.size)}</td>
                  <td>{formatDate(image.created_at)}</td>
                  <td>
                    <div className="list-actions">
                      <button
                        onClick={() => handleCopyUrl(image.url)}
                        className="action-btn"
                        title="Copiar URL"
                      >
                        {copiedUrl === image.url ? <Check size={14} /> : <Copy size={14} />}
                      </button>
                      <button
                        onClick={() => handleDelete(image)}
                        className="action-btn delete"
                        title="Excluir"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Stats */}
      <div className="media-stats">
        <span>{filteredImages.length} imagem(ns)</span>
        {selectedImages.length > 0 && (
          <span className="selected-count">• {selectedImages.length} selecionada(s)</span>
        )}
      </div>
    </div>
  );
};

export default Media;
