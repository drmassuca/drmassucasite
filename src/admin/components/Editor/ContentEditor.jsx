import { useState } from 'react';
import PropTypes from 'prop-types';
import { Code, Eye } from 'lucide-react';
import RichTextEditor from './RichTextEditor';
import './RichTextEditor.css';

const ContentEditor = ({ content, onChange, placeholder }) => {
  const [mode, setMode] = useState('visual'); // 'visual' ou 'html'

  return (
    <div className="content-editor">
      {/* Mode Toggle */}
      <div className="editor-mode-toggle">
        <button
          type="button"
          className={`mode-btn ${mode === 'visual' ? 'active' : ''}`}
          onClick={() => setMode('visual')}
        >
          <Eye size={16} />
          Editor Visual
        </button>
        <button
          type="button"
          className={`mode-btn ${mode === 'html' ? 'active' : ''}`}
          onClick={() => setMode('html')}
        >
          <Code size={16} />
          Código HTML
        </button>
      </div>

      {/* Editor */}
      {mode === 'visual' ? (
        <RichTextEditor content={content} onChange={onChange} placeholder={placeholder} />
      ) : (
        <textarea
          value={content}
          onChange={e => onChange(e.target.value)}
          className="html-source-editor"
          placeholder="<p>Escreva o conteúdo em HTML...</p>"
        />
      )}
    </div>
  );
};

ContentEditor.propTypes = {
  content: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
};

export default ContentEditor;
