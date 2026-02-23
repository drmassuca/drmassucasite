import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AlertTriangle,
  Check,
  X,
  Loader2,
  RefreshCw,
  ChevronRight,
  Sparkles,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { detectFormattingIssues, applyCorrection, isAIConfigured } from '../../../lib/ai';
import './ContentCorrector.css';

const ISSUE_TYPE_LABELS = {
  palavras_emendadas: { label: 'Palavras emendadas', color: '#ef4444' },
  datas_emendadas: { label: 'Datas emendadas', color: '#f97316' },
  tabela_texto: { label: 'Tabela como texto', color: '#8b5cf6' },
  pontuacao: { label: 'Pontuação', color: '#3b82f6' },
  encoding: { label: 'Encoding quebrado', color: '#ec4899' },
  aspas_colchetes: { label: 'Formatação', color: '#14b8a6' },
};

const ContentCorrector = ({ content, onContentChange }) => {
  const [issues, setIssues] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const [appliedCorrections, setAppliedCorrections] = useState(new Set());
  const [ignoredCorrections, setIgnoredCorrections] = useState(new Set());

  const analyzeContent = async () => {
    if (!content || !isAIConfigured()) return;

    setIsAnalyzing(true);
    setIssues([]);
    setAppliedCorrections(new Set());
    setIgnoredCorrections(new Set());

    try {
      const foundIssues = await detectFormattingIssues(content);
      setIssues(foundIssues);
      setHasAnalyzed(true);
    } catch (error) {
      console.error('Erro ao analisar:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleApplyCorrection = (index, issue) => {
    const newContent = applyCorrection(content, issue.original, issue.corrected);

    if (newContent !== content) {
      onContentChange(newContent);
      setAppliedCorrections(prev => new Set([...prev, index]));
    } else {
      // Se não conseguiu aplicar, marca como problema
      console.warn('Não foi possível aplicar a correção:', issue);
    }
  };

  const handleIgnoreCorrection = index => {
    setIgnoredCorrections(prev => new Set([...prev, index]));
  };

  const handleApplyAll = () => {
    let newContent = content;
    const newApplied = new Set(appliedCorrections);

    issues.forEach((issue, index) => {
      if (!appliedCorrections.has(index) && !ignoredCorrections.has(index)) {
        const result = applyCorrection(newContent, issue.original, issue.corrected);
        if (result !== newContent) {
          newContent = result;
          newApplied.add(index);
        }
      }
    });

    onContentChange(newContent);
    setAppliedCorrections(newApplied);
  };

  const pendingIssues = issues.filter(
    (_, idx) => !appliedCorrections.has(idx) && !ignoredCorrections.has(idx)
  );

  const getIssueTypeInfo = type => {
    return ISSUE_TYPE_LABELS[type] || { label: type, color: '#6b7280' };
  };

  if (!isAIConfigured()) {
    return (
      <div className="corrector-panel">
        <div className="corrector-header">
          <AlertTriangle size={18} />
          <span>Corretor IA</span>
        </div>
        <div className="corrector-not-configured">
          <p>Configure a API do Gemini para usar o corretor.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="corrector-panel">
      <div className="corrector-header">
        <div className="corrector-title">
          <Sparkles size={18} />
          <span>Corretor IA</span>
        </div>

        <button
          className="corrector-analyze-btn"
          onClick={analyzeContent}
          disabled={isAnalyzing || !content}
        >
          {isAnalyzing ? (
            <>
              <Loader2 size={14} className="spinning" />
              Analisando...
            </>
          ) : (
            <>
              <RefreshCw size={14} />
              {hasAnalyzed ? 'Reanalisar' : 'Analisar'}
            </>
          )}
        </button>
      </div>

      {!hasAnalyzed && !isAnalyzing && (
        <div className="corrector-empty">
          <AlertTriangle size={32} className="empty-icon" />
          <p>
            Clique em <strong>Analisar</strong> para detectar erros de formatação no conteúdo.
          </p>
        </div>
      )}

      {isAnalyzing && (
        <div className="corrector-loading">
          <Loader2 size={24} className="spinning" />
          <p>Analisando conteúdo...</p>
          <span>A IA está procurando erros de formatação</span>
        </div>
      )}

      {hasAnalyzed && !isAnalyzing && issues.length === 0 && (
        <div className="corrector-success">
          <CheckCircle size={32} />
          <p>Nenhum erro encontrado!</p>
          <span>O conteúdo parece estar bem formatado.</span>
        </div>
      )}

      {hasAnalyzed && !isAnalyzing && issues.length > 0 && (
        <>
          <div className="corrector-summary">
            <div className="summary-stats">
              <span className="stat total">{issues.length} problemas</span>
              <span className="stat applied">{appliedCorrections.size} corrigidos</span>
              <span className="stat ignored">{ignoredCorrections.size} ignorados</span>
            </div>

            {pendingIssues.length > 0 && (
              <button className="apply-all-btn" onClick={handleApplyAll}>
                <Check size={14} />
                Aplicar todas ({pendingIssues.length})
              </button>
            )}
          </div>

          <div className="corrector-issues">
            {issues.map((issue, index) => {
              const isApplied = appliedCorrections.has(index);
              const isIgnored = ignoredCorrections.has(index);
              const typeInfo = getIssueTypeInfo(issue.type);

              return (
                <div
                  key={index}
                  className={`issue-card ${isApplied ? 'applied' : ''} ${isIgnored ? 'ignored' : ''}`}
                >
                  <div className="issue-header">
                    <span className="issue-type-badge" style={{ backgroundColor: typeInfo.color }}>
                      {typeInfo.label}
                    </span>

                    {isApplied && (
                      <span className="issue-status applied">
                        <CheckCircle size={14} /> Corrigido
                      </span>
                    )}
                    {isIgnored && (
                      <span className="issue-status ignored">
                        <XCircle size={14} /> Ignorado
                      </span>
                    )}
                  </div>

                  <div className="issue-content">
                    <div className="issue-original">
                      <span className="label">Erro:</span>
                      <code className="text-error">{issue.original}</code>
                    </div>

                    <ChevronRight size={16} className="arrow-icon" />

                    <div className="issue-corrected">
                      <span className="label">Correção:</span>
                      <code className="text-success">{issue.corrected}</code>
                    </div>
                  </div>

                  {issue.context && (
                    <div className="issue-context">
                      <span className="context-label">Contexto:</span>
                      <span className="context-text">...{issue.context.slice(0, 100)}...</span>
                    </div>
                  )}

                  {!isApplied && !isIgnored && (
                    <div className="issue-actions">
                      <button
                        className="action-btn apply"
                        onClick={() => handleApplyCorrection(index, issue)}
                      >
                        <Check size={14} />
                        Aplicar
                      </button>
                      <button
                        className="action-btn ignore"
                        onClick={() => handleIgnoreCorrection(index)}
                      >
                        <X size={14} />
                        Ignorar
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

ContentCorrector.propTypes = {
  content: PropTypes.string,
  onContentChange: PropTypes.func,
};

export default ContentCorrector;
