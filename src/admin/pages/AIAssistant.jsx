import { useState } from 'react';
import {
  Sparkles,
  Wand2,
  FileText,
  Tag,
  Type,
  Copy,
  Check,
  Loader2,
  AlertCircle,
  RefreshCw,
  Lightbulb,
} from 'lucide-react';
import {
  isAIConfigured,
  generateTitles,
  generateExcerpt,
  generateTags,
  improveText,
  generateDraft,
} from '../../lib/ai';
import './AIAssistant.css';

const AIAssistant = () => {
  const [activeTab, setActiveTab] = useState('titles');
  const [input, setInput] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [copiedIndex, setCopiedIndex] = useState(null);

  const isConfigured = isAIConfigured();

  const handleGenerate = async () => {
    if (!input.trim()) {
      setError('Digite algum conteúdo para gerar sugestões');
      return;
    }

    setLoading(true);
    setError('');
    setResults([]);

    try {
      let result;

      switch (activeTab) {
        case 'titles':
          result = await generateTitles(input);
          setResults(result);
          break;
        case 'excerpt':
          result = await generateExcerpt(input);
          setResults([result]);
          break;
        case 'tags':
          result = await generateTags(input);
          setResults(result);
          break;
        case 'improve':
          result = await improveText(input);
          setResults([result]);
          break;
        case 'draft':
          result = await generateDraft(input);
          setResults([result]);
          break;
        default:
          break;
      }
    } catch (err) {
      console.error('Erro na geração:', err);
      setError(err.message || 'Erro ao gerar conteúdo. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async (text, index) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error('Erro ao copiar:', err);
    }
  };

  const tabs = [
    {
      id: 'titles',
      label: 'Títulos',
      icon: Type,
      placeholder: 'Cole o conteúdo do artigo ou descreva o tema...',
    },
    {
      id: 'excerpt',
      label: 'Resumo',
      icon: FileText,
      placeholder: 'Cole o conteúdo do artigo para gerar um resumo...',
    },
    {
      id: 'tags',
      label: 'Tags',
      icon: Tag,
      placeholder: 'Cole o conteúdo do artigo para sugerir tags...',
    },
    {
      id: 'improve',
      label: 'Melhorar',
      icon: Wand2,
      placeholder: 'Cole o texto que deseja melhorar...',
    },
    {
      id: 'draft',
      label: 'Rascunho',
      icon: Lightbulb,
      placeholder: 'Descreva o tema do artigo que deseja criar...',
    },
  ];

  const activeTabConfig = tabs.find(t => t.id === activeTab);

  if (!isConfigured) {
    return (
      <div className="ai-assistant">
        <div className="page-header">
          <div>
            <h1 className="page-title">Assistente IA</h1>
            <p className="page-subtitle">Geração de conteúdo com inteligência artificial</p>
          </div>
        </div>

        <div className="ai-not-configured">
          <AlertCircle size={48} className="warning-icon" />
          <h2>API do Gemini não configurada</h2>
          <p>Para usar o Assistente IA, configure sua chave da API do Google Gemini:</p>
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
            <li>Crie uma nova API key</li>
            <li>
              Adicione no arquivo <code>.env</code>: <code>VITE_GEMINI_API_KEY=sua_chave</code>
            </li>
            <li>Reinicie o servidor de desenvolvimento</li>
          </ol>
        </div>
      </div>
    );
  }

  return (
    <div className="ai-assistant">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <Sparkles size={24} className="title-icon" />
            Assistente IA
          </h1>
          <p className="page-subtitle">Geração de conteúdo com inteligência artificial</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="ai-tabs">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id);
              setResults([]);
              setError('');
            }}
            className={`ai-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <div className="ai-content">
        <div className="ai-input-section">
          <label className="input-label">
            {activeTab === 'draft' ? 'Tema do artigo' : 'Conteúdo de entrada'}
          </label>
          <textarea
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder={activeTabConfig?.placeholder}
            className="ai-textarea"
            rows={activeTab === 'draft' ? 4 : 10}
          />

          <div className="input-actions">
            <span className="char-count">{input.length} caracteres</span>
            <button
              onClick={handleGenerate}
              disabled={loading || !input.trim()}
              className="btn btn-primary"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="spinner-icon" /> Gerando...
                </>
              ) : (
                <>
                  <Sparkles size={18} /> Gerar
                </>
              )}
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="ai-results-section">
          <div className="results-header">
            <h3>Resultados</h3>
            {results.length > 0 && (
              <button
                onClick={handleGenerate}
                disabled={loading}
                className="btn btn-secondary btn-sm"
              >
                <RefreshCw size={14} />
                Regenerar
              </button>
            )}
          </div>

          {error && (
            <div className="ai-error">
              <AlertCircle size={18} />
              {error}
            </div>
          )}

          {loading && (
            <div className="ai-loading">
              <Loader2 size={32} className="spinner-icon" />
              <p>Gerando conteúdo...</p>
            </div>
          )}

          {!loading && results.length === 0 && !error && (
            <div className="ai-empty">
              <Sparkles size={32} className="empty-icon" />
              <p>Os resultados aparecerão aqui</p>
            </div>
          )}

          {results.length > 0 && (
            <div className={`ai-results ${activeTab === 'tags' ? 'tags-grid' : ''}`}>
              {activeTab === 'tags' ? (
                <div className="tags-container">
                  {results.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => handleCopy(tag, index)}
                      className="result-tag"
                      title="Clique para copiar"
                    >
                      {copiedIndex === index ? <Check size={12} /> : null}
                      {tag}
                    </button>
                  ))}
                </div>
              ) : (
                results.map((result, index) => (
                  <div key={index} className="result-item">
                    <div className="result-content">
                      {activeTab === 'draft' || activeTab === 'improve' ? (
                        <pre className="result-text long">{result}</pre>
                      ) : (
                        <span className="result-text">{result}</span>
                      )}
                    </div>
                    <button
                      onClick={() => handleCopy(result, index)}
                      className="copy-btn"
                      title="Copiar"
                    >
                      {copiedIndex === index ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </div>

      {/* Tips */}
      <div className="ai-tips">
        <h4>💡 Dicas</h4>
        <ul>
          {activeTab === 'titles' && (
            <>
              <li>Cole o conteúdo completo do artigo para melhores sugestões</li>
              <li>Ou descreva o tema principal em algumas frases</li>
            </>
          )}
          {activeTab === 'excerpt' && (
            <>
              <li>O resumo gerado é otimizado para SEO (até 160 caracteres)</li>
              <li>Use como meta description do artigo</li>
            </>
          )}
          {activeTab === 'tags' && (
            <>
              <li>Clique nas tags para copiar individualmente</li>
              <li>Use tags relevantes para melhorar a descoberta do conteúdo</li>
            </>
          )}
          {activeTab === 'improve' && (
            <>
              <li>Cole parágrafos ou seções específicas para melhorar</li>
              <li>A IA mantém o tom profissional mas torna o texto mais claro</li>
            </>
          )}
          {activeTab === 'draft' && (
            <>
              <li>Descreva o tema de forma clara e específica</li>
              <li>Inclua palavras-chave importantes que deseja no artigo</li>
              <li>O rascunho é um ponto de partida - sempre revise e personalize</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AIAssistant;
