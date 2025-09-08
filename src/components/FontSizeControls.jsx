import { Type, Minus, Plus, RotateCcw } from 'lucide-react';
import { useFontSize } from '../hooks/useFontSize';
import './FontSizeControls.css';

const FontSizeControls = () => {
  const { 
    fontSizeConfig, 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize,
    canIncrease, 
    canDecrease 
  } = useFontSize();

  return (
    <div className="font-controls">
      <div className="font-controls-group">
        <Type className="font-controls-icon" />
        
        <button 
          className={`font-btn decrease ${!canDecrease ? 'disabled' : ''}`}
          onClick={decreaseFontSize}
          disabled={!canDecrease}
          aria-label="Diminuir fonte"
          title="Diminuir fonte"
        >
          <Minus className="font-btn-icon" />
          <span className="font-btn-label">A-</span>
        </button>
        
        <div className="font-current">
          <span className="font-current-label">{fontSizeConfig.name}</span>
          <div className="font-scale-indicator">
            <span 
              className="font-scale-bar" 
              style={{ width: `${fontSizeConfig.scale * 60}%` }}
            />
          </div>
        </div>
        
        <button 
          className={`font-btn increase ${!canIncrease ? 'disabled' : ''}`}
          onClick={increaseFontSize}
          disabled={!canIncrease}
          aria-label="Aumentar fonte"
          title="Aumentar fonte"
        >
          <span className="font-btn-label">A+</span>
          <Plus className="font-btn-icon" />
        </button>
        
        <button 
          className="font-btn reset"
          onClick={resetFontSize}
          aria-label="Resetar fonte"
          title="Tamanho normal"
        >
          <RotateCcw className="font-btn-icon" />
        </button>
      </div>
    </div>
  );
};

export default FontSizeControls;
