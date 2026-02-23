import { useState, useEffect, useCallback, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Save,
  Eye,
  ArrowLeft,
  Image,
  Tag,
  Calendar,
  Clock,
  Sparkles,
  Loader2,
  AlertCircle,
  Check,
  X,
  Plus,
  Trash2,
  ExternalLink,
  Cloud,
  CloudOff,
  Layout,
  FileJson,
} from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { ContentEditor } from '../components/Editor';
import { ImageUpload } from '../components/ImageUpload';
import { AIWritingAssistant } from '../components/AIWritingAssistant';
import ContentCorrector from '../components/ContentCorrector/ContentCorrector';
import { isAIConfigured } from '../../lib/ai';
import './PostEditor.css';

// Templates disponíveis
const POST_TEMPLATES = [
  { id: 'classic', name: 'Clássico', description: 'Layout limpo e tradicional' },
  { id: 'magazine', name: 'Revista', description: 'Estilo magazine com destaque visual' },
  { id: 'scientific', name: 'Científico', description: 'Formal, ideal para artigos técnicos' },
  { id: 'news', name: 'Notícia', description: 'Estilo jornalístico dinâmico' },
];

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    subtitle: '',
    excerpt: '',
    content: '',
    category_id: '',
    tags: [],
    image_url: '',
    author: 'Dr. Massuca',
    read_time: '',
    status: 'draft',
    featured: false,
    published_at: '',
    scheduled_for: '',
    metadata: {},
    sources: [],
    highlights: [],
    meta_title: '',
    meta_description: '',
    template: 'classic',
  });

  // UI state
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [categories, setCategories] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [activeTab, setActiveTab] = useState('content');
  const [showAIAssistant, setShowAIAssistant] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importJson, setImportJson] = useState('');

  // New source form
  const [newSource, setNewSource] = useState({ title: '', url: '', type: 'Estudo' });

  // Autosave state
  const [autoSaveStatus, setAutoSaveStatus] = useState('idle');
  const [, setLastSaved] = useState(null);
  const autoSaveTimer = useRef(null);
  const hasUnsavedChanges = useRef(false);

  useEffect(() => {
    fetchCategories();
    if (isEditing) {
      fetchPost();
    }
  }, [id]);

  const fetchPost = async () => {
    try {
      const { data, error } = await supabase.from('articles').select('*').eq('id', id).single();

      if (error) throw error;

      setFormData({
        ...data,
        published_at: data.published_at ? data.published_at.split('T')[0] : '',
        scheduled_for: data.scheduled_for ? data.scheduled_for.split('T')[0] : '',
        tags: data.tags || [],
        metadata: data.metadata || {},
        sources: data.sources || [],
        highlights: data.highlights || [],
        meta_title: data.meta_title || '',
        meta_description: data.meta_description || '',
        template: data.template || 'classic',
      });
    } catch (error) {
      console.error('Erro ao carregar post:', error);
      setError('Post não encontrado');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('*').order('name');
    setCategories(data || []);
  };

  // Autosave function
  const performAutoSave = useCallback(async () => {
    if (!formData.title.trim() || formData.status === 'published') {
      return;
    }

    setAutoSaveStatus('saving');

    try {
      const postData = {
        ...formData,
        status: formData.status === 'published' ? 'published' : 'draft',
        published_at: formData.published_at ? new Date(formData.published_at).toISOString() : null,
        scheduled_for: formData.scheduled_for
          ? new Date(formData.scheduled_for).toISOString()
          : null,
        metadata: Object.keys(formData.metadata).length > 0 ? formData.metadata : {},
        // Converte strings vazias para null em campos que esperam inteiros
        category_id: formData.category_id ? parseInt(formData.category_id, 10) : null,
        read_time: formData.read_time || null,
      };

      delete postData.id;
      delete postData.created_at;
      delete postData.updated_at;

      if (isEditing) {
        const { error } = await supabase.from('articles').update(postData).eq('id', id);

        if (error) throw error;
      } else if (formData.title.trim() && formData.slug) {
        const { data, error } = await supabase.from('articles').insert(postData).select().single();

        if (error) throw error;

        if (data?.id) {
          navigate(`/admin/posts/${data.id}`, { replace: true });
        }
      }

      setAutoSaveStatus('saved');
      setLastSaved(new Date());
      hasUnsavedChanges.current = false;

      setTimeout(() => setAutoSaveStatus('idle'), 3000);
    } catch (error) {
      console.error('Erro no autosave:', error);
      setAutoSaveStatus('error');
      setTimeout(() => setAutoSaveStatus('idle'), 5000);
    }
  }, [formData, isEditing, id, navigate]);

  // Autosave effect
  useEffect(() => {
    hasUnsavedChanges.current = true;

    if (autoSaveTimer.current) {
      clearTimeout(autoSaveTimer.current);
    }

    if (formData.title.trim()) {
      autoSaveTimer.current = setTimeout(() => {
        performAutoSave();
      }, 30000);
    }

    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, [formData, performAutoSave]);

  useEffect(() => {
    return () => {
      if (autoSaveTimer.current) {
        clearTimeout(autoSaveTimer.current);
      }
    };
  }, []);

  // Generate slug from title
  const generateSlug = useCallback(title => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .substring(0, 100);
  }, []);

  // Handle form changes
  const handleChange = e => {
    const { name, value, type, checked } = e.target;

    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    if (name === 'title' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }
  };

  // Handle content change from editor
  const handleContentChange = newContent => {
    setFormData(prev => ({
      ...prev,
      content: newContent,
    }));
  };

  // Handle AI updates
  const handleAIUpdateField = (field, value) => {
    // Mapeamento de campos da IA para campos do formulário
    const fieldMapping = {
      readTime: 'read_time',
    };
    const actualField = fieldMapping[field] || field;

    setFormData(prev => ({
      ...prev,
      [actualField]: value,
    }));

    // Atualiza slug automaticamente quando título muda
    if (actualField === 'title' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        slug: generateSlug(value),
      }));
    }

    // Mensagens de sucesso descritivas
    const fieldNames = {
      title: 'Título',
      subtitle: 'Subtítulo',
      slug: 'URL (slug)',
      excerpt: 'Resumo/Excerpt',
      meta_title: 'Meta Title (SEO)',
      meta_description: 'Meta Description (SEO)',
      tags: 'Tags',
      template: 'Template',
      highlights: 'Destaques',
      read_time: 'Tempo de leitura',
      sources: 'Fontes',
      content: 'Conteúdo',
      metadata: 'Metadados',
    };
    const fieldName = fieldNames[actualField] || actualField;
    setSuccess(`${fieldName} atualizado!`);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleAIInsertContent = content => {
    // Convert markdown to HTML if needed
    let htmlContent = content;
    if (content.includes('##') || content.includes('**')) {
      htmlContent = content
        .replace(/## (.*)/g, '<h2>$1</h2>')
        .replace(/### (.*)/g, '<h3>$1</h3>')
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\n\n/g, '</p><p>')
        .replace(/^(.*)$/gm, match => {
          if (!match.startsWith('<')) return `<p>${match}</p>`;
          return match;
        });
    }

    setFormData(prev => ({
      ...prev,
      content: prev.content + '\n' + htmlContent,
    }));
    setSuccess('Conteúdo inserido!');
    setTimeout(() => setSuccess(''), 3000);
  };

  // Import JSON from Grok
  const handleImportJson = () => {
    let data;
    try {
      data = JSON.parse(importJson);
    } catch {
      setError('JSON inválido. Verifique a formatação e tente novamente.');
      setTimeout(() => setError(''), 5000);
      return;
    }

    const filledFields = [];
    const updates = {};

    // Direct mappings
    if (data.title) {
      updates.title = data.title;
      updates.slug = generateSlug(data.title);
      filledFields.push('Título', 'Slug');
    }
    if (data.subtitle) {
      updates.subtitle = data.subtitle;
      filledFields.push('Subtítulo');
    }
    if (data.excerpt) {
      updates.excerpt = data.excerpt;
      filledFields.push('Resumo');
    }
    if (data.content) {
      updates.content = data.content;
      filledFields.push('Conteúdo');
    }
    if (data.author) {
      updates.author = data.author;
      filledFields.push('Autor');
    }
    if (data.tags && Array.isArray(data.tags)) {
      updates.tags = data.tags;
      filledFields.push('Tags');
    }
    if (typeof data.featured === 'boolean') {
      updates.featured = data.featured;
      filledFields.push('Destaque');
    }
    if (data.sources && Array.isArray(data.sources)) {
      updates.sources = data.sources;
      filledFields.push('Fontes');
    }

    // Renamed fields
    if (data.readTime) {
      updates.read_time = data.readTime;
      filledFields.push('Tempo de leitura');
    }
    if (data.date) {
      updates.published_at = data.date;
      filledFields.push('Data de publicação');
    }

    // Category lookup by name
    if (data.category) {
      const match = categories.find(
        cat => cat.name.toLowerCase() === data.category.toLowerCase()
      );
      if (match) {
        updates.category_id = match.id;
        filledFields.push(`Categoria (${match.name})`);
      } else {
        filledFields.push(`⚠️ Categoria "${data.category}" não encontrada`);
      }
    }

    // Image: store description as metadata (it's not a URL)
    if (data.image) {
      updates.metadata = {
        ...formData.metadata,
        image_description: data.image,
      };
      filledFields.push('Descrição da imagem (metadados)');
    }

    // Apply all updates
    setFormData(prev => ({ ...prev, ...updates }));

    setSuccess(`JSON importado! Campos: ${filledFields.join(', ')}`);
    setTimeout(() => setSuccess(''), 8000);
    setShowImportModal(false);
    setImportJson('');
  };

  // Tags handling
  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = tagToRemove => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove),
    }));
  };

  // Sources handling
  const handleAddSource = () => {
    if (newSource.title && newSource.url) {
      setFormData(prev => ({
        ...prev,
        sources: [...prev.sources, { ...newSource }],
      }));
      setNewSource({ title: '', url: '', type: 'Estudo' });
    }
  };

  const handleRemoveSource = index => {
    setFormData(prev => ({
      ...prev,
      sources: prev.sources.filter((_, i) => i !== index),
    }));
  };

  // Save post
  const handleSave = async (publishNow = false) => {
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const postData = {
        ...formData,
        status: publishNow ? 'published' : formData.status,
        published_at: publishNow
          ? (formData.published_at ? new Date(formData.published_at).toISOString() : new Date().toISOString())
          : formData.published_at
            ? new Date(formData.published_at).toISOString()
            : null,
        scheduled_for: formData.scheduled_for
          ? new Date(formData.scheduled_for).toISOString()
          : null,
        metadata: Object.keys(formData.metadata).length > 0 ? formData.metadata : {},
        // Converte strings vazias para null em campos que esperam inteiros
        category_id: formData.category_id ? parseInt(formData.category_id, 10) : null,
        read_time: formData.read_time || null,
      };

      delete postData.id;
      delete postData.created_at;
      delete postData.updated_at;

      let result;
      if (isEditing) {
        result = await supabase.from('articles').update(postData).eq('id', id).select().single();
      } else {
        result = await supabase.from('articles').insert(postData).select().single();
      }

      if (result.error) throw result.error;

      setSuccess(publishNow ? 'Post publicado com sucesso!' : 'Post salvo com sucesso!');

      if (!isEditing) {
        navigate(`/admin/posts/${result.data.id}`);
      }
    } catch (error) {
      console.error('Erro ao salvar:', error);
      setError(error.message || 'Erro ao salvar post');
    } finally {
      setSaving(false);
    }
  };

  // Estimate read time
  const estimateReadTime = () => {
    const wordCount = formData.content.replace(/<[^>]*>/g, '').split(/\s+/).length;
    const minutes = Math.ceil(wordCount / 200);
    setFormData(prev => ({
      ...prev,
      read_time: `${minutes} min`,
    }));
  };

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className={`post-editor ${showAIAssistant ? 'ai-panel-open' : ''}`}>
      {/* Header */}
      <div className="editor-header">
        <div className="header-left">
          <button onClick={() => navigate('/admin/posts')} className="back-btn">
            <ArrowLeft size={20} />
          </button>
          <div className="header-title">
            <h1>{isEditing ? 'Editar Post' : 'Novo Post'}</h1>
            {formData.status && (
              <span className={`status-badge status-${formData.status}`}>
                {formData.status === 'published'
                  ? 'Publicado'
                  : formData.status === 'draft'
                    ? 'Rascunho'
                    : formData.status === 'scheduled'
                      ? 'Agendado'
                      : 'Arquivado'}
              </span>
            )}
          </div>
        </div>

        <div className="header-actions">
          {autoSaveStatus !== 'idle' && (
            <div className={`autosave-indicator ${autoSaveStatus}`}>
              {autoSaveStatus === 'saving' && (
                <>
                  <Loader2 size={14} className="spinner-icon" /> Salvando...
                </>
              )}
              {autoSaveStatus === 'saved' && (
                <>
                  <Cloud size={14} /> Salvo automaticamente
                </>
              )}
              {autoSaveStatus === 'error' && (
                <>
                  <CloudOff size={14} /> Erro ao salvar
                </>
              )}
            </div>
          )}

          <button
            onClick={() => setShowImportModal(true)}
            className="btn btn-secondary"
            title="Importar JSON do Grok"
          >
            <FileJson size={18} />
            <span>Importar JSON</span>
          </button>

          {isAIConfigured() && (
            <button
              onClick={() => setShowAIAssistant(!showAIAssistant)}
              className={`btn btn-ai ${showAIAssistant ? 'active' : ''}`}
              title="Assistente IA"
            >
              <Sparkles size={18} />
              <span>Assistente IA</span>
            </button>
          )}

          <button onClick={() => setShowPreview(!showPreview)} className="btn btn-secondary">
            <Eye size={18} />
            <span>{showPreview ? 'Editor' : 'Preview'}</span>
          </button>
          <button onClick={() => handleSave(false)} className="btn btn-secondary" disabled={saving}>
            {saving ? <Loader2 size={18} className="spinner-icon" /> : <Save size={18} />}
            <span>Salvar</span>
          </button>
          <button onClick={() => handleSave(true)} className="btn btn-primary" disabled={saving}>
            <Check size={18} />
            <span>Publicar</span>
          </button>
        </div>
      </div>

      {/* Alerts */}
      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError('')}>
            <X size={16} />
          </button>
        </div>
      )}
      {success && (
        <div className="alert alert-success">
          <Check size={18} />
          {success}
          <button onClick={() => setSuccess('')}>
            <X size={16} />
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="editor-tabs">
        <button
          className={`tab ${activeTab === 'content' ? 'active' : ''}`}
          onClick={() => setActiveTab('content')}
        >
          Conteúdo
        </button>
        <button
          className={`tab ${activeTab === 'seo' ? 'active' : ''}`}
          onClick={() => setActiveTab('seo')}
        >
          SEO
        </button>
        <button
          className={`tab ${activeTab === 'template' ? 'active' : ''}`}
          onClick={() => setActiveTab('template')}
        >
          <Layout size={16} />
          Template
        </button>
        <button
          className={`tab ${activeTab === 'metadata' ? 'active' : ''}`}
          onClick={() => setActiveTab('metadata')}
        >
          Metadados
        </button>
        <button
          className={`tab ${activeTab === 'sources' ? 'active' : ''}`}
          onClick={() => setActiveTab('sources')}
        >
          Fontes ({formData.sources.length})
        </button>
      </div>

      {/* Main Content */}
      <div className="editor-content">
        <div className="editor-main">
          {showPreview ? (
            <div className={`preview-container template-${formData.template}`}>
              <div className="preview-header">
                <h2>{formData.title || 'Título do Post'}</h2>
                {formData.subtitle && <p className="preview-subtitle">{formData.subtitle}</p>}
              </div>
              <div
                className="preview-body"
                dangerouslySetInnerHTML={{
                  __html: formData.content || '<p>Conteúdo do post...</p>',
                }}
              />
            </div>
          ) : (
            <>
              {activeTab === 'content' && (
                <div className="tab-content">
                  {/* Title */}
                  <div className="form-group">
                    <label className="form-label">Título *</label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      className="form-input title-input"
                      placeholder="Digite o título do post..."
                    />
                  </div>

                  {/* Subtitle */}
                  <div className="form-group">
                    <label className="form-label">Subtítulo</label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Subtítulo opcional..."
                    />
                  </div>

                  {/* Excerpt */}
                  <div className="form-group">
                    <label className="form-label">Resumo / Excerpt</label>
                    <textarea
                      name="excerpt"
                      value={formData.excerpt}
                      onChange={handleChange}
                      className="form-input"
                      rows={3}
                      placeholder="Breve descrição para listagens..."
                    />
                  </div>

                  {/* Content */}
                  <div className="form-group">
                    <label className="form-label">
                      Conteúdo
                      <button
                        type="button"
                        onClick={estimateReadTime}
                        className="btn btn-sm btn-secondary ml-2"
                      >
                        <Clock size={14} />
                        Calcular tempo de leitura
                      </button>
                    </label>
                    <ContentEditor
                      content={formData.content}
                      onChange={handleContentChange}
                      placeholder="Comece a escrever o conteúdo do post..."
                    />

                    {/* Corretor de Formatação IA */}
                    <ContentCorrector
                      content={formData.content}
                      onContentChange={handleContentChange}
                    />
                  </div>
                </div>
              )}

              {activeTab === 'seo' && (
                <div className="tab-content">
                  <div className="form-group">
                    <label className="form-label">Slug (URL)</label>
                    <div className="slug-input-wrapper">
                      <span className="slug-prefix">/ia-medica/artigo/</span>
                      <input
                        type="text"
                        name="slug"
                        value={formData.slug}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="url-do-post"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Meta Title (SEO)</label>
                    <input
                      type="text"
                      name="meta_title"
                      value={formData.meta_title}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Título para SEO (máx. 70 caracteres)"
                      maxLength={70}
                    />
                    <span className="char-count">{formData.meta_title?.length || 0}/70</span>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Meta Description (SEO)</label>
                    <textarea
                      name="meta_description"
                      value={formData.meta_description}
                      onChange={handleChange}
                      className="form-input"
                      rows={3}
                      placeholder="Descrição para SEO (máx. 160 caracteres)"
                      maxLength={160}
                    />
                    <span className="char-count">{formData.meta_description?.length || 0}/160</span>
                  </div>
                </div>
              )}

              {activeTab === 'template' && (
                <div className="tab-content">
                  <p className="tab-description">
                    Escolha como seu artigo será exibido para os leitores. Cada template tem um
                    estilo visual único.
                  </p>

                  <div className="template-grid">
                    {POST_TEMPLATES.map(template => (
                      <div
                        key={template.id}
                        className={`template-card ${formData.template === template.id ? 'selected' : ''}`}
                        onClick={() => setFormData(prev => ({ ...prev, template: template.id }))}
                      >
                        <div className={`template-preview template-preview-${template.id}`}>
                          <div className="template-preview-header"></div>
                          <div className="template-preview-content">
                            <div className="template-preview-line"></div>
                            <div className="template-preview-line short"></div>
                            <div className="template-preview-line"></div>
                          </div>
                        </div>
                        <div className="template-info">
                          <h4>{template.name}</h4>
                          <p>{template.description}</p>
                        </div>
                        {formData.template === template.id && (
                          <div className="template-selected-badge">
                            <Check size={14} />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'metadata' && (
                <div className="tab-content">
                  <p className="tab-description">
                    Adicione informações extras que aparecem nos cards (investimento, usuários,
                    etc.)
                  </p>

                  <div className="metadata-grid">
                    {['investment', 'users', 'patients', 'accuracy', 'promise', 'reality'].map(
                      key => (
                        <div key={key} className="form-group">
                          <label className="form-label">{key}</label>
                          <input
                            type="text"
                            value={formData.metadata[key] || ''}
                            onChange={e =>
                              setFormData(prev => ({
                                ...prev,
                                metadata: { ...prev.metadata, [key]: e.target.value || undefined },
                              }))
                            }
                            className="form-input"
                            placeholder={`Ex: ${key === 'investment' ? 'US$ 100 milhões' : '20.000+'}`}
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {activeTab === 'sources' && (
                <div className="tab-content">
                  <p className="tab-description">Adicione as fontes e referências do artigo.</p>

                  <div className="add-source-form">
                    <div className="form-group">
                      <input
                        type="text"
                        value={newSource.title}
                        onChange={e => setNewSource(prev => ({ ...prev, title: e.target.value }))}
                        className="form-input"
                        placeholder="Título da fonte"
                      />
                    </div>
                    <div className="form-group">
                      <input
                        type="url"
                        value={newSource.url}
                        onChange={e => setNewSource(prev => ({ ...prev, url: e.target.value }))}
                        className="form-input"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="form-group">
                      <select
                        value={newSource.type}
                        onChange={e => setNewSource(prev => ({ ...prev, type: e.target.value }))}
                        className="form-input"
                      >
                        <option value="Estudo">Estudo</option>
                        <option value="Notícia">Notícia</option>
                        <option value="Oficial">Oficial</option>
                        <option value="Análise">Análise</option>
                      </select>
                    </div>
                    <button type="button" onClick={handleAddSource} className="btn btn-primary">
                      <Plus size={18} />
                    </button>
                  </div>

                  <div className="sources-list">
                    {formData.sources.map((source, index) => (
                      <div key={index} className="source-item">
                        <div className="source-info">
                          <span className="source-title">{source.title}</span>
                          <a
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-url"
                          >
                            {source.url}
                            <ExternalLink size={12} />
                          </a>
                          <span className="source-type">{source.type}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveSource(index)}
                          className="btn btn-icon btn-danger"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                    {formData.sources.length === 0 && (
                      <p className="no-sources">Nenhuma fonte adicionada ainda.</p>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar */}
        <aside className="editor-sidebar">
          {/* Status */}
          <div className="sidebar-card">
            <h3>Publicação</h3>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-input"
              >
                <option value="draft">Rascunho</option>
                <option value="published">Publicado</option>
                <option value="scheduled">Agendado</option>
                <option value="archived">Arquivado</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">
                <Calendar size={14} />
                Data de publicação
              </label>
              <input
                type="date"
                name="published_at"
                value={formData.published_at}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            {formData.status === 'scheduled' && (
              <div className="form-group">
                <label className="form-label">
                  <Calendar size={14} />
                  Agendar para
                </label>
                <input
                  type="date"
                  name="scheduled_for"
                  value={formData.scheduled_for}
                  onChange={handleChange}
                  className="form-input"
                />
              </div>
            )}

            <div className="form-group">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                />
                <span>Post em destaque</span>
              </label>
            </div>
          </div>

          {/* Category */}
          <div className="sidebar-card">
            <h3>Categoria</h3>
            <select
              name="category_id"
              value={formData.category_id}
              onChange={handleChange}
              className="form-input"
            >
              <option value="">Selecione...</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div className="sidebar-card">
            <h3>
              <Tag size={16} />
              Tags
            </h3>
            <div className="tags-input-wrapper">
              <input
                type="text"
                value={tagInput}
                onChange={e => setTagInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                className="form-input"
                placeholder="Adicionar tag..."
              />
              <button type="button" onClick={handleAddTag} className="add-tag-btn">
                <Plus size={16} />
              </button>
            </div>
            <div className="tags-list">
              {formData.tags.map(tag => (
                <span key={tag} className="tag">
                  {tag}
                  <button onClick={() => handleRemoveTag(tag)}>
                    <X size={12} />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="sidebar-card">
            <h3>
              <Image size={16} />
              Imagem de Capa
            </h3>
            <ImageUpload
              value={formData.image_url}
              onChange={url => setFormData(prev => ({ ...prev, image_url: url }))}
              folder="covers"
            />
          </div>

          {/* Other */}
          <div className="sidebar-card">
            <h3>Informações</h3>
            <div className="form-group">
              <label className="form-label">Autor</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label className="form-label">Tempo de leitura</label>
              <input
                type="text"
                name="read_time"
                value={formData.read_time}
                onChange={handleChange}
                className="form-input"
                placeholder="5 min"
              />
            </div>
          </div>
        </aside>
      </div>

      {/* AI Writing Assistant Panel */}
      <AIWritingAssistant
        isOpen={showAIAssistant}
        onClose={() => setShowAIAssistant(false)}
        formData={formData}
        onUpdateField={handleAIUpdateField}
        onInsertContent={handleAIInsertContent}
        categories={categories}
      />

      {/* Import JSON Modal */}
      {showImportModal && (
        <div className="import-modal-overlay" onClick={() => setShowImportModal(false)}>
          <div className="import-modal" onClick={e => e.stopPropagation()}>
            <div className="import-modal-header">
              <h2>
                <FileJson size={20} />
                Importar JSON
              </h2>
              <button onClick={() => setShowImportModal(false)} className="btn btn-icon">
                <X size={20} />
              </button>
            </div>
            <div className="import-modal-body">
              <p className="import-modal-description">
                Cole o JSON gerado pelo Grok AI. Os campos serão mapeados automaticamente para o
                formulário.
              </p>
              <textarea
                className="form-input import-json-textarea"
                rows={15}
                value={importJson}
                onChange={e => setImportJson(e.target.value)}
                placeholder='{"title": "...", "content": "...", ...}'
                autoFocus
              />
            </div>
            <div className="import-modal-footer">
              <button onClick={() => setShowImportModal(false)} className="btn btn-secondary">
                Cancelar
              </button>
              <button
                onClick={handleImportJson}
                className="btn btn-primary"
                disabled={!importJson.trim()}
              >
                <Check size={18} />
                Importar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostEditor;
