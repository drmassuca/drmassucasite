import TextToSpeechPlayer from './TextToSpeechPlayer';
import FontSizeControls from './FontSizeControls';
import ThemeToggle from './ThemeToggle';
import './ArticleControls.css';

const ArticleControls = ({ content }) => {
  return (
    <div className="article-controls">
      <div className="article-controls-container">
        {/* Seção Esquerda - Leitor de Texto */}
        <div className="controls-section left">
          <TextToSpeechPlayer content={content} />
        </div>
        
        {/* Seção Centro - Controles de Fonte */}
        <div className="controls-section center">
          <FontSizeControls />
        </div>
        
        {/* Seção Direita - Toggle de Tema */}
        <div className="controls-section right">
          <ThemeToggle />
        </div>
      </div>
    </div>
  );
};

export default ArticleControls;
