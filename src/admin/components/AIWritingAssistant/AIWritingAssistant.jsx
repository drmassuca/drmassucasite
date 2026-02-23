import { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  X,
  Send,
  Wand2,
  FileText,
  Tag,
  Type,
  Lightbulb,
  Copy,
  Check,
  Loader2,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  MessageSquare,
  Zap,
  BookOpen,
  FileEdit,
  Link,
  Layout,
  Clock,
  CheckCircle,
  AlertCircle,
  Settings,
  FolderOpen,
  Table,
} from 'lucide-react';
import {
  isAIConfigured,
  generateTitles,
  generateExcerpt,
  generateTags,
  improveText,
  generateDraft,
  generateFullArticle,
  fixContentFormatting,
  suggestCategory,
  cleanupFormatting,
} from '../../../lib/ai';
import PropTypes from 'prop-types';
import './AIWritingAssistant.css';

const AIWritingAssistant = ({
  isOpen,
  onClose,
  formData,
  onUpdateField,
  onInsertContent,
  categories = [], // NOVO: recebe categorias do PostEditor
}) => {
  const [activeMode, setActiveMode] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    {
      role: 'assistant',
      content:
        'Olá! Sou seu assistente de escrita. Posso ajudar você a:\n\n• Gerar ideias e títulos\n• Criar rascunhos de artigos\n• Melhorar textos existentes\n• Sugerir tags e resumos\n\nComo posso ajudar?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedItem, setCopiedItem] = useState(null);
  const [quickResults, setQuickResults] = useState(null);
  const [expandedSection, setExpandedSection] = useState('generate');
  const [draftTopic, setDraftTopic] = useState('');
  const [improveTextValue, setImproveTextValue] = useState('');

  // Estados para gerar artigo completo
  const [fullArticleContext, setFullArticleContext] = useState('');
  const [fullArticleStyle, setFullArticleStyle] = useState('informativo');
  const [fullArticleLength, setFullArticleLength] = useState('médio');
  const [fullArticleCategory, setFullArticleCategory] = useState(''); // NOVO: categoria selecionada

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  const isConfigured = isAIConfigured();

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleCopy = async (text, id) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedItem(id);
      setTimeout(() => setCopiedItem(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const sendChatMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage = inputMessage.trim();
    setInputMessage('');

    setChatMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const context = `
Contexto do artigo atual:
- Título: ${formData.title || '(não definido)'}
- Conteúdo: ${formData.content ? formData.content.replace(/<[^>]*>/g, '').slice(0, 1500) + '...' : '(vazio)'}
- Tags: ${formData.tags?.join(', ') || '(nenhuma)'}
`;

      const response = await generateChatResponse(userMessage, context, chatMessages);

      setChatMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      console.error('Erro no chat:', error);
      setChatMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Desculpe, ocorreu um erro. Tente novamente.',
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const quickActions = {
    generateTitles: async () => {
      if (!formData.content && !formData.title) {
        setQuickResults({ type: 'error', message: 'Adicione algum conteúdo primeiro' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const content = formData.content?.replace(/<[^>]*>/g, '') || formData.title;
        const titles = await generateTitles(content, formData.title);
        setQuickResults({ type: 'titles', items: titles });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    generateExcerpt: async () => {
      if (!formData.content && !formData.title) {
        setQuickResults({ type: 'error', message: 'Adicione algum conteúdo primeiro' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const content = formData.content?.replace(/<[^>]*>/g, '') || formData.title;
        const excerpt = await generateExcerpt(content, formData.title);
        setQuickResults({ type: 'excerpt', text: excerpt });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    generateTags: async () => {
      if (!formData.content && !formData.title) {
        setQuickResults({ type: 'error', message: 'Adicione algum conteúdo primeiro' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const content = formData.content?.replace(/<[^>]*>/g, '') || formData.title;
        const tags = await generateTags(content, formData.title);
        setQuickResults({ type: 'tags', items: tags });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    generateDraft: async () => {
      if (!draftTopic.trim()) {
        setQuickResults({ type: 'error', message: 'Informe o tema do artigo' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const draft = await generateDraft(draftTopic);
        setQuickResults({ type: 'draft', text: draft });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    improveText: async () => {
      if (!improveTextValue.trim()) {
        setQuickResults({ type: 'error', message: 'Cole um texto para melhorar' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const improved = await improveText(improveTextValue);
        setQuickResults({ type: 'improved', text: improved, original: improveTextValue });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    generateFullArticle: async () => {
      if (!fullArticleContext.trim()) {
        setQuickResults({ type: 'error', message: 'Descreva o tema/contexto do artigo' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const article = await generateFullArticle(fullArticleContext, {
          style: fullArticleStyle,
          length: fullArticleLength,
        });
        setQuickResults({ type: 'fullArticle', article });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    // NOVAS FUNÇÕES DE CORREÇÃO
    fixFormatting: async () => {
      if (!formData.content) {
        setQuickResults({ type: 'error', message: 'Adicione conteúdo ao editor primeiro' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const fixedContent = await fixContentFormatting(formData.content);
        setQuickResults({ type: 'fixedContent', text: fixedContent });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },

    suggestCategoryAction: async () => {
      if (!formData.content && !formData.title) {
        setQuickResults({ type: 'error', message: 'Adicione título ou conteúdo primeiro' });
        return;
      }
      setIsLoading(true);
      setQuickResults(null);
      try {
        const content = formData.content?.replace(/<[^>]*>/g, '') || '';
        const suggestion = await suggestCategory(content, formData.title || '', categories);
        setQuickResults({ type: 'categorySuggestion', suggestion });
      } catch (err) {
        setQuickResults({ type: 'error', message: err.message });
      } finally {
        setIsLoading(false);
      }
    },
  };

  const applyResult = (type, value) => {
    switch (type) {
      case 'title':
        onUpdateField('title', value);
        break;
      case 'slug':
        onUpdateField('slug', value);
        break;
      case 'excerpt':
        onUpdateField('excerpt', value);
        break;
      case 'tags':
        onUpdateField('tags', [...new Set([...(formData.tags || []), ...value])]);
        break;
      case 'template':
        onUpdateField('template', value);
        break;
      case 'highlights':
        onUpdateField('highlights', value);
        break;
      case 'readTime':
        onUpdateField('readTime', value);
        break;
      case 'sources':
        onUpdateField('sources', value);
        break;
      case 'content':
        // Aplica limpeza de formatação antes de inserir
        onInsertContent(cleanupFormatting(value));
        break;
      case 'fullArticle':
        // Aplica todos os campos do artigo
        if (value) {
          onUpdateField('title', value.title);
          if (value.subtitle) onUpdateField('subtitle', value.subtitle);
          onUpdateField('slug', value.slug);
          onUpdateField('excerpt', value.excerpt);
          if (value.meta_title) onUpdateField('meta_title', value.meta_title);
          if (value.meta_description) onUpdateField('meta_description', value.meta_description);
          onUpdateField('tags', value.tags);
          onUpdateField('template', value.template);
          onUpdateField('highlights', value.highlights);
          // Formata readTime como "X min"
          const readTimeStr =
            typeof value.readTime === 'number' ? `${value.readTime} min` : value.readTime;
          onUpdateField('readTime', readTimeStr);
          onUpdateField('sources', value.sources);
          if (value.metadata) onUpdateField('metadata', value.metadata);
          // NOVO: Aplica categoria se selecionada
          if (fullArticleCategory) {
            onUpdateField('category_id', fullArticleCategory);
          }
          // Aplica limpeza de formatação antes de inserir
          onInsertContent(cleanupFormatting(value.content));
        }
        break;
      default:
        break;
    }
  };

  if (!isOpen) return null;

  if (!isConfigured) {
    return (
      <div className="ai-assistant-panel">
        <div className="ai-panel-header">
          <div className="ai-panel-title">
            <Sparkles size={20} />
            <span>Assistente IA</span>
          </div>
          <button onClick={onClose} className="ai-close-btn">
            <X size={20} />
          </button>
        </div>
        <div className="ai-not-configured">
          <Sparkles size={40} className="sparkle-icon" />
          <h3>API não configurada</h3>
          <p>Configure sua chave da API do Google Gemini para usar o assistente.</p>
          <ol>
            <li>
              Acesse{' '}
              <a
                href="https://aistudio.google.com/app/apikey"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google AI Studio
              </a>
            </li>
            <li>Crie uma API key</li>
            <li>
              Adicione no <code>.env</code>:
            </li>
          </ol>
          <code className="env-code">VITE_GEMINI_API_KEY=sua_chave</code>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-assistant-panel">
      <div className="ai-panel-header">
        <div className="ai-panel-title">
          <Sparkles size={20} />
          <span>Assistente IA</span>
        </div>
        <button onClick={onClose} className="ai-close-btn">
          <X size={20} />
        </button>
      </div>

      <div className="ai-mode-tabs">
        <button
          className={`ai-mode-tab ${activeMode === 'chat' ? 'active' : ''}`}
          onClick={() => setActiveMode('chat')}
        >
          <MessageSquare size={16} />
          Chat
        </button>
        <button
          className={`ai-mode-tab ${activeMode === 'quick' ? 'active' : ''}`}
          onClick={() => setActiveMode('quick')}
        >
          <Zap size={16} />
          Ações Rápidas
        </button>
      </div>

      {activeMode === 'chat' && (
        <div className="ai-chat-container">
          <div className="ai-chat-messages">
            {chatMessages.map((msg, idx) => (
              <div key={idx} className={`ai-message ${msg.role} ${msg.isError ? 'error' : ''}`}>
                {msg.role === 'assistant' && (
                  <div className="ai-avatar">
                    <Sparkles size={14} />
                  </div>
                )}
                <div className="ai-message-content">
                  <p style={{ whiteSpace: 'pre-wrap' }}>{msg.content}</p>
                  {msg.role === 'assistant' && !msg.isError && (
                    <button
                      className="ai-copy-btn"
                      onClick={() => handleCopy(msg.content, `msg-${idx}`)}
                    >
                      {copiedItem === `msg-${idx}` ? <Check size={12} /> : <Copy size={12} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="ai-message assistant">
                <div className="ai-avatar">
                  <Sparkles size={14} />
                </div>
                <div className="ai-message-content">
                  <div className="ai-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="ai-chat-input">
            <textarea
              ref={inputRef}
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  sendChatMessage();
                }
              }}
              placeholder="Peça ajuda com seu artigo..."
              rows={2}
            />
            <button
              onClick={sendChatMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="ai-send-btn"
            >
              {isLoading ? <Loader2 size={18} className="spinning" /> : <Send size={18} />}
            </button>
          </div>

          <div className="ai-quick-prompts">
            <button onClick={() => setInputMessage('Sugira um título atraente para este artigo')}>
              Sugerir título
            </button>
            <button onClick={() => setInputMessage('Melhore a introdução do artigo')}>
              Melhorar intro
            </button>
            <button onClick={() => setInputMessage('Crie uma conclusão para este artigo')}>
              Criar conclusão
            </button>
          </div>
        </div>
      )}

      {activeMode === 'quick' && (
        <div className="ai-quick-container">
          <div className="ai-section">
            <button
              className="ai-section-header"
              onClick={() => setExpandedSection(expandedSection === 'generate' ? null : 'generate')}
            >
              <div className="section-title">
                <Lightbulb size={18} />
                <span>Gerar Conteúdo</span>
              </div>
              {expandedSection === 'generate' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {expandedSection === 'generate' && (
              <div className="ai-section-content">
                <button
                  className="ai-action-btn"
                  onClick={quickActions.generateTitles}
                  disabled={isLoading}
                >
                  <Type size={16} />
                  <span>Gerar Títulos</span>
                  {isLoading && <Loader2 size={14} className="spinning" />}
                </button>

                <button
                  className="ai-action-btn"
                  onClick={quickActions.generateExcerpt}
                  disabled={isLoading}
                >
                  <FileText size={16} />
                  <span>Gerar Resumo</span>
                </button>

                <button
                  className="ai-action-btn"
                  onClick={quickActions.generateTags}
                  disabled={isLoading}
                >
                  <Tag size={16} />
                  <span>Sugerir Tags</span>
                </button>

                <div className="ai-draft-generator">
                  <input
                    type="text"
                    placeholder="Tema do artigo..."
                    value={draftTopic}
                    onChange={e => setDraftTopic(e.target.value)}
                    className="ai-input"
                  />
                  <button
                    className="ai-action-btn primary"
                    onClick={quickActions.generateDraft}
                    disabled={isLoading}
                  >
                    <BookOpen size={16} />
                    <span>Gerar Rascunho</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="ai-section">
            <button
              className="ai-section-header"
              onClick={() => setExpandedSection(expandedSection === 'improve' ? null : 'improve')}
            >
              <div className="section-title">
                <Wand2 size={18} />
                <span>Melhorar Texto</span>
              </div>
              {expandedSection === 'improve' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {expandedSection === 'improve' && (
              <div className="ai-section-content">
                <p className="ai-hint">Cole o texto que deseja melhorar:</p>
                <textarea
                  className="ai-textarea"
                  placeholder="Cole aqui o texto para melhorar..."
                  rows={4}
                  value={improveTextValue}
                  onChange={e => setImproveTextValue(e.target.value)}
                />
                <button
                  className="ai-action-btn primary"
                  onClick={quickActions.improveText}
                  disabled={isLoading}
                >
                  <Wand2 size={16} />
                  <span>Melhorar Texto</span>
                </button>
              </div>
            )}
          </div>

          {/* NOVA SEÇÃO: Gerar Artigo Completo */}
          <div className="ai-section ai-section-highlight">
            <button
              className="ai-section-header"
              onClick={() =>
                setExpandedSection(expandedSection === 'fullArticle' ? null : 'fullArticle')
              }
            >
              <div className="section-title">
                <FileEdit size={18} />
                <span>Gerar Artigo Completo</span>
                <span className="ai-badge-new">NOVO</span>
              </div>
              {expandedSection === 'fullArticle' ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>

            {expandedSection === 'fullArticle' && (
              <div className="ai-section-content">
                <p className="ai-hint">
                  Descreva o tema/contexto e a IA criará um artigo completo com título, SEO, tags,
                  template, fontes e conteúdo.
                </p>

                <textarea
                  className="ai-textarea"
                  placeholder="Ex: Escreva um artigo sobre os benefícios da vitamina D para idosos, incluindo sintomas de deficiência, fontes alimentares e recomendações de suplementação..."
                  rows={5}
                  value={fullArticleContext}
                  onChange={e => setFullArticleContext(e.target.value)}
                />

                <div className="ai-options-row">
                  <div className="ai-option-group">
                    <label>Estilo:</label>
                    <select
                      value={fullArticleStyle}
                      onChange={e => setFullArticleStyle(e.target.value)}
                      className="ai-select"
                    >
                      <option value="informativo">Informativo</option>
                      <option value="didático">Didático</option>
                      <option value="científico">Científico</option>
                      <option value="notícia">Notícia / News</option>
                      <option value="investigativo">Investigativo</option>
                      <option value="conversacional">Conversacional</option>
                    </select>
                  </div>

                  <div className="ai-option-group">
                    <label>Tamanho:</label>
                    <select
                      value={fullArticleLength}
                      onChange={e => setFullArticleLength(e.target.value)}
                      className="ai-select"
                    >
                      <option value="curto">Curto (600-800)</option>
                      <option value="médio">Médio (1000-1500)</option>
                      <option value="longo">Longo (1800-2500)</option>
                    </select>
                  </div>
                </div>

                {/* NOVO: Seletor de Categoria */}
                <div className="ai-options-row">
                  <div className="ai-option-group ai-option-full">
                    <label>Categoria:</label>
                    <select
                      value={fullArticleCategory}
                      onChange={e => setFullArticleCategory(e.target.value)}
                      className="ai-select"
                    >
                      <option value="">Selecione uma categoria...</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>
                          {cat.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  className="ai-action-btn primary ai-btn-large"
                  onClick={quickActions.generateFullArticle}
                  disabled={isLoading || !fullArticleContext.trim()}
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={18} className="spinning" />
                      <span>Gerando artigo completo...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={18} />
                      <span>Gerar Artigo Completo</span>
                    </>
                  )}
                </button>

                {isLoading && (
                  <div className="ai-generation-status">
                    <p>A IA está criando seu artigo com:</p>
                    <ul>
                      <li>
                        <CheckCircle size={14} /> Título otimizado para SEO
                      </li>
                      <li>
                        <CheckCircle size={14} /> Meta description
                      </li>
                      <li>
                        <CheckCircle size={14} /> Tags relevantes
                      </li>
                      <li>
                        <CheckCircle size={14} /> Template adequado
                      </li>
                      <li>
                        <CheckCircle size={14} /> Conteúdo completo
                      </li>
                      <li>
                        <CheckCircle size={14} /> Fontes e referências
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* NOVA SEÇÃO: Correções e Ferramentas */}
          <div className="ai-section">
            <button
              className="ai-section-header"
              onClick={() => setExpandedSection(expandedSection === 'fixes' ? null : 'fixes')}
            >
              <div className="section-title">
                <Settings size={18} />
                <span>Correções e Ferramentas</span>
              </div>
              {expandedSection === 'fixes' ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </button>

            {expandedSection === 'fixes' && (
              <div className="ai-section-content">
                <p className="ai-hint">Ferramentas para corrigir e otimizar o artigo atual.</p>

                <button
                  className="ai-action-btn"
                  onClick={quickActions.fixFormatting}
                  disabled={isLoading || !formData.content}
                >
                  <Table size={16} />
                  <span>Corrigir Formatação</span>
                  {isLoading && <Loader2 size={14} className="spinning" />}
                </button>
                <p className="ai-action-desc">
                  Corrige tabelas, listas mal formatadas e encoding quebrado
                </p>

                <button
                  className="ai-action-btn"
                  onClick={quickActions.suggestCategoryAction}
                  disabled={isLoading || (!formData.content && !formData.title)}
                >
                  <FolderOpen size={16} />
                  <span>Sugerir Categoria</span>
                </button>
                <p className="ai-action-desc">Analisa o conteúdo e sugere a melhor categoria</p>
              </div>
            )}
          </div>

          {quickResults && (
            <div className="ai-results">
              <div className="ai-results-header">
                <h4>Resultados</h4>
                <button className="ai-clear-btn" onClick={() => setQuickResults(null)}>
                  <Trash2 size={14} />
                </button>
              </div>

              {quickResults.type === 'error' && (
                <div className="ai-error">{quickResults.message}</div>
              )}

              {quickResults.type === 'titles' && (
                <div className="ai-results-list">
                  {quickResults.items.map((title, idx) => (
                    <div key={idx} className="ai-result-item">
                      <span>{title}</span>
                      <div className="ai-result-actions">
                        <button onClick={() => handleCopy(title, `title-${idx}`)} title="Copiar">
                          {copiedItem === `title-${idx}` ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                        <button
                          onClick={() => applyResult('title', title)}
                          title="Usar como título"
                          className="apply-btn"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {quickResults.type === 'excerpt' && (
                <div className="ai-result-text">
                  <p>{quickResults.text}</p>
                  <div className="ai-result-actions">
                    <button onClick={() => handleCopy(quickResults.text, 'excerpt')}>
                      {copiedItem === 'excerpt' ? <Check size={14} /> : <Copy size={14} />}
                      Copiar
                    </button>
                    <button
                      onClick={() => applyResult('excerpt', quickResults.text)}
                      className="apply-btn"
                    >
                      <Plus size={14} />
                      Usar como resumo
                    </button>
                  </div>
                </div>
              )}

              {quickResults.type === 'tags' && (
                <div className="ai-tags-result">
                  {quickResults.items.map((tag, idx) => (
                    <span key={idx} className="ai-tag">
                      {tag}
                    </span>
                  ))}
                  <button
                    onClick={() => applyResult('tags', quickResults.items)}
                    className="ai-apply-tags-btn"
                  >
                    <Plus size={14} />
                    Adicionar todas
                  </button>
                </div>
              )}

              {(quickResults.type === 'draft' || quickResults.type === 'improved') && (
                <div className="ai-result-text large">
                  <pre>{quickResults.text}</pre>
                  <div className="ai-result-actions">
                    <button onClick={() => handleCopy(quickResults.text, 'content')}>
                      {copiedItem === 'content' ? <Check size={14} /> : <Copy size={14} />}
                      Copiar
                    </button>
                    <button
                      onClick={() => applyResult('content', quickResults.text)}
                      className="apply-btn"
                    >
                      <Plus size={14} />
                      Inserir no editor
                    </button>
                  </div>
                </div>
              )}

              {/* Resultado de Correção de Formatação */}
              {quickResults.type === 'fixedContent' && (
                <div className="ai-result-text large">
                  <div className="ai-article-success">
                    <CheckCircle size={20} />
                    <span>Conteúdo corrigido!</span>
                  </div>
                  <div
                    className="ai-content-html-preview"
                    dangerouslySetInnerHTML={{ __html: quickResults.text.slice(0, 800) + '...' }}
                  />
                  <div className="ai-result-actions">
                    <button onClick={() => handleCopy(quickResults.text, 'fixedContent')}>
                      {copiedItem === 'fixedContent' ? <Check size={14} /> : <Copy size={14} />}
                      Copiar HTML
                    </button>
                    <button
                      onClick={() => applyResult('content', quickResults.text)}
                      className="apply-btn"
                    >
                      <Plus size={14} />
                      Aplicar ao Editor
                    </button>
                  </div>
                </div>
              )}

              {/* Resultado de Sugestão de Categoria */}
              {quickResults.type === 'categorySuggestion' && quickResults.suggestion && (
                <div className="ai-category-suggestion">
                  <div className="ai-article-success">
                    <FolderOpen size={20} />
                    <span>Sugestão de Categoria</span>
                  </div>

                  {quickResults.suggestion.bestExisting && (
                    <div className="ai-suggestion-item">
                      <label>
                        <CheckCircle size={14} /> Categoria existente recomendada:
                      </label>
                      <div className="ai-suggestion-value">
                        <span className="ai-category-badge">
                          {quickResults.suggestion.bestExisting}
                        </span>
                        <button
                          className="ai-apply-single"
                          onClick={() => {
                            const cat = categories.find(
                              c => c.name === quickResults.suggestion.bestExisting
                            );
                            if (cat) onUpdateField('category_id', cat.id);
                          }}
                          title="Aplicar categoria"
                        >
                          <Plus size={12} /> Aplicar
                        </button>
                      </div>
                    </div>
                  )}

                  {quickResults.suggestion.suggestedNew && (
                    <div className="ai-suggestion-item">
                      <label>
                        <Lightbulb size={14} /> Nova categoria sugerida:
                      </label>
                      <div className="ai-suggestion-value">
                        <span className="ai-category-badge new">
                          {quickResults.suggestion.suggestedNew}
                        </span>
                        <span className="ai-new-category-hint">(Criar no Supabase)</span>
                      </div>
                    </div>
                  )}

                  {quickResults.suggestion.reason && (
                    <div className="ai-suggestion-reason">
                      <p>
                        <em>{quickResults.suggestion.reason}</em>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Resultado do Artigo Completo */}
              {quickResults.type === 'fullArticle' && quickResults.article && (
                <div className="ai-full-article-result">
                  <div className="ai-article-success">
                    <CheckCircle size={24} />
                    <span>Artigo gerado com sucesso!</span>
                  </div>

                  <div className="ai-article-preview">
                    <div className="ai-preview-item">
                      <label>
                        <Type size={14} /> Título:
                      </label>
                      <p>{quickResults.article.title}</p>
                      <button
                        className="ai-apply-single"
                        onClick={() => applyResult('title', quickResults.article.title)}
                        title="Aplicar título"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {quickResults.article.subtitle && (
                      <div className="ai-preview-item">
                        <label>
                          <Type size={14} /> Subtítulo:
                        </label>
                        <p className="ai-subtitle-preview">{quickResults.article.subtitle}</p>
                        <button
                          className="ai-apply-single"
                          onClick={() => onUpdateField('subtitle', quickResults.article.subtitle)}
                          title="Aplicar subtítulo"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}

                    <div className="ai-preview-item">
                      <label>
                        <Link size={14} /> Slug:
                      </label>
                      <code>{quickResults.article.slug}</code>
                      <button
                        className="ai-apply-single"
                        onClick={() => applyResult('slug', quickResults.article.slug)}
                        title="Aplicar slug"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="ai-preview-item">
                      <label>
                        <FileText size={14} /> Excerpt (Cards):
                      </label>
                      <p className="ai-excerpt-preview">{quickResults.article.excerpt}</p>
                      <button
                        className="ai-apply-single"
                        onClick={() => applyResult('excerpt', quickResults.article.excerpt)}
                        title="Aplicar resumo"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {quickResults.article.meta_title && (
                      <div className="ai-preview-item ai-seo-item">
                        <label>
                          <Sparkles size={14} /> Meta Title (SEO):
                        </label>
                        <p className="ai-meta-preview">{quickResults.article.meta_title}</p>
                        <span className="ai-char-count">
                          {quickResults.article.meta_title.length}/60
                        </span>
                        <button
                          className="ai-apply-single"
                          onClick={() =>
                            onUpdateField('meta_title', quickResults.article.meta_title)
                          }
                          title="Aplicar meta title"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}

                    {quickResults.article.meta_description && (
                      <div className="ai-preview-item ai-seo-item">
                        <label>
                          <Sparkles size={14} /> Meta Description (SEO):
                        </label>
                        <p className="ai-meta-preview">{quickResults.article.meta_description}</p>
                        <span className="ai-char-count">
                          {quickResults.article.meta_description.length}/160
                        </span>
                        <button
                          className="ai-apply-single"
                          onClick={() =>
                            onUpdateField('meta_description', quickResults.article.meta_description)
                          }
                          title="Aplicar meta description"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}

                    <div className="ai-preview-item">
                      <label>
                        <Layout size={14} /> Template:
                      </label>
                      <span className="ai-template-badge">{quickResults.article.template}</span>
                      <button
                        className="ai-apply-single"
                        onClick={() => applyResult('template', quickResults.article.template)}
                        title="Aplicar template"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    <div className="ai-preview-item">
                      <label>
                        <Clock size={14} /> Tempo de leitura:
                      </label>
                      <span>{quickResults.article.readTime} min</span>
                    </div>

                    <div className="ai-preview-item">
                      <label>
                        <Tag size={14} /> Tags:
                      </label>
                      <div className="ai-tags-preview">
                        {quickResults.article.tags.map((tag, idx) => (
                          <span key={idx} className="ai-tag-small">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button
                        className="ai-apply-single"
                        onClick={() => applyResult('tags', quickResults.article.tags)}
                        title="Aplicar tags"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {quickResults.article.highlights?.length > 0 && (
                      <div className="ai-preview-item">
                        <label>
                          <Lightbulb size={14} /> Destaques:
                        </label>
                        <ul className="ai-highlights-preview">
                          {quickResults.article.highlights.map((h, idx) => (
                            <li key={idx}>{h}</li>
                          ))}
                        </ul>
                        <button
                          className="ai-apply-single"
                          onClick={() => applyResult('highlights', quickResults.article.highlights)}
                          title="Aplicar destaques"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}

                    {quickResults.article.sources?.length > 0 && (
                      <div className="ai-preview-item">
                        <label>
                          <BookOpen size={14} /> Fontes ({quickResults.article.sources.length}):
                        </label>
                        <ul className="ai-sources-preview">
                          {quickResults.article.sources.map((source, idx) => (
                            <li key={idx}>
                              <span className="source-title">{source.title}</span>
                              <span className="source-type">({source.type})</span>
                            </li>
                          ))}
                        </ul>
                        <button
                          className="ai-apply-single"
                          onClick={() => applyResult('sources', quickResults.article.sources)}
                          title="Aplicar fontes"
                        >
                          <Plus size={12} />
                        </button>
                      </div>
                    )}

                    {quickResults.article.suggestedImage && (
                      <div className="ai-preview-item">
                        <label>
                          <AlertCircle size={14} /> Sugestão de imagem:
                        </label>
                        <p className="ai-image-suggestion">{quickResults.article.suggestedImage}</p>
                      </div>
                    )}

                    {quickResults.article.metadata &&
                      (quickResults.article.metadata.promise ||
                        quickResults.article.metadata.reality) && (
                        <div className="ai-preview-item ai-metadata-item">
                          <label>
                            <Lightbulb size={14} /> Metadados (Card):
                          </label>
                          <div className="ai-metadata-preview">
                            {quickResults.article.metadata.promise && (
                              <span className="ai-metadata-badge promise">
                                <strong>Promessa:</strong> {quickResults.article.metadata.promise}
                              </span>
                            )}
                            {quickResults.article.metadata.reality && (
                              <span className="ai-metadata-badge reality">
                                <strong>Realidade:</strong> {quickResults.article.metadata.reality}
                              </span>
                            )}
                          </div>
                          <button
                            className="ai-apply-single"
                            onClick={() => onUpdateField('metadata', quickResults.article.metadata)}
                            title="Aplicar metadados"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      )}

                    <div className="ai-preview-item ai-content-preview">
                      <label>
                        <FileEdit size={14} /> Conteúdo:
                      </label>
                      <div
                        className="ai-content-html-preview"
                        dangerouslySetInnerHTML={{
                          __html: quickResults.article.content.slice(0, 500) + '...',
                        }}
                      />
                      <button
                        className="ai-apply-single"
                        onClick={() => applyResult('content', quickResults.article.content)}
                        title="Aplicar conteúdo"
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <div className="ai-full-article-actions">
                    <button
                      className="ai-action-btn primary ai-btn-large"
                      onClick={() => applyResult('fullArticle', quickResults.article)}
                    >
                      <CheckCircle size={18} />
                      <span>Aplicar Tudo ao Editor</span>
                    </button>

                    <button
                      className="ai-action-btn secondary"
                      onClick={() =>
                        handleCopy(JSON.stringify(quickResults.article, null, 2), 'fullArticle')
                      }
                    >
                      {copiedItem === 'fullArticle' ? <Check size={16} /> : <Copy size={16} />}
                      <span>Copiar JSON</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

async function generateChatResponse(userMessage, context, history) {
  const { GoogleGenerativeAI } = await import('@google/generative-ai');
  const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const systemPrompt = `Você é um assistente de escrita especializado em conteúdo médico para blogs.
Seu objetivo é ajudar o usuário a criar artigos de qualidade sobre saúde e medicina.

Regras:
- Seja conciso e direto nas respostas
- Use linguagem profissional mas acessível
- Não dê conselhos médicos específicos
- Sempre recomende consultar profissionais de saúde
- Formate respostas de forma clara
- Se o usuário pedir para gerar conteúdo, gere diretamente

${context}

Histórico recente:
${history
  .slice(-4)
  .map(m => `${m.role}: ${m.content}`)
  .join('\n')}
`;

  const result = await model.generateContent(`${systemPrompt}\n\nUsuário: ${userMessage}`);
  const response = await result.response;
  return response.text().trim();
}

AIWritingAssistant.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  formData: PropTypes.shape({
    title: PropTypes.string,
    content: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onUpdateField: PropTypes.func,
  onInsertContent: PropTypes.func,
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      name: PropTypes.string,
    })
  ),
};

export default AIWritingAssistant;
