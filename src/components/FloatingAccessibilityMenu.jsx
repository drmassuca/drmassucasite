import React, { useState, useEffect, useRef } from 'react';
import { Settings, X, Volume2, Type, Sun, Moon, Play, Pause, Square, Minus, Plus, RotateCcw } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import { useFontSize } from '../hooks/useFontSize';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import './FloatingAccessibilityMenu.css';

const FloatingAccessibilityMenu = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeControl, setActiveControl] = useState(null);
  const menuRef = useRef(null);
  
  // Hooks de funcionalidade
  const { isDark, toggleTheme } = useTheme();
  const { 
    currentSize, 
    fontSizeConfig, 
    increaseFontSize, 
    decreaseFontSize, 
    resetFontSize,
    canIncrease, 
    canDecrease 
  } = useFontSize();
  const {
    isSupported: ttsSupported,
    isPlaying,
    isPaused,
    progress,
    loadText,
    play,
    pause,
    stop
  } = useTextToSpeech();

  // Debug: Verificar se as variáveis CSS estão sendo aplicadas
  useEffect(() => {
    console.log('🔍 Font Size Debug:', {
      currentSize,
      scale: fontSizeConfig.scale,
      canIncrease,
      canDecrease,
      cssVariable: getComputedStyle(document.documentElement).getPropertyValue('--article-font-scale'),
      htmlClass: document.documentElement.className
    });
    
    // Forçar uma atualização visual para garantir que as mudanças sejam aplicadas
    document.documentElement.style.setProperty('--article-font-debug', fontSizeConfig.scale);
  }, [currentSize, fontSizeConfig, canIncrease, canDecrease]);

  // Carregar texto quando o componente monta
  useEffect(() => {
    if (content && ttsSupported) {
      loadText(content);
    }
  }, [content, ttsSupported, loadText]);

  // Fechar ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveControl(null);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isOpen]);

  // Fechar com ESC
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setActiveControl(null);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setActiveControl(null);
    }
  };

  const handleControlClick = (controlType) => {
    setActiveControl(activeControl === controlType ? null : controlType);
  };

  // Componente TTS simplificado
  const TTSPanel = () => {
    if (!ttsSupported) {
      return (
        <div className="tts-unsupported">
          <Volume2 className="tts-icon-disabled" />
          <span>Leitor não suportado neste navegador</span>
        </div>
      );
    }

    const handlePlayPause = () => {
      if (isPlaying) {
        pause();
      } else {
        play();
      }
    };

    return (
      <div className="simple-tts">
        <div className="tts-controls-simple">
          <button
            className="tts-btn-simple play-pause"
            onClick={handlePlayPause}
            title={isPlaying ? 'Pausar' : 'Reproduzir'}
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </button>
          
          <button
            className="tts-btn-simple stop"
            onClick={stop}
            disabled={!isPlaying && !isPaused}
            title="Parar"
          >
            <Square size={18} />
          </button>

          <div className="tts-progress-simple">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="progress-text">{Math.round(progress)}%</span>
          </div>
        </div>
      </div>
    );
  };

  // Componente de Fonte simplificado
  const FontPanel = () => {
    const handleDecrease = () => {
      decreaseFontSize();
    };

    const handleIncrease = () => {
      increaseFontSize();
    };

    const handleReset = () => {
      resetFontSize();
    };

    return (
      <div className="simple-font">
        <div className="font-info">
          <Type className="font-icon" />
          <span className="font-current">{fontSizeConfig.name} ({fontSizeConfig.scale}x)</span>
        </div>
        
        <div className="font-controls-simple">
          <button
            className={`font-btn-simple decrease ${!canDecrease ? 'disabled' : ''}`}
            onClick={handleDecrease}
            disabled={!canDecrease}
            title="Diminuir fonte"
          >
            <Minus size={16} />
            <span>A-</span>
          </button>
          
          <div className="font-scale">
            <div className="scale-bar">
              <div 
                className="scale-fill" 
                style={{ width: `${fontSizeConfig.scale * 60}%` }}
              />
            </div>
          </div>
          
          <button
            className={`font-btn-simple increase ${!canIncrease ? 'disabled' : ''}`}
            onClick={handleIncrease}
            disabled={!canIncrease}
            title="Aumentar fonte"
          >
            <span>A+</span>
            <Plus size={16} />
          </button>
          
          <button
            className="font-btn-simple reset"
            onClick={handleReset}
            title="Resetar"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
    );
  };

  // Componente de Tema simplificado
  const ThemePanel = () => (
    <div className="simple-theme">
      <button
        className="theme-toggle-simple"
        onClick={toggleTheme}
        title={isDark ? 'Modo Claro' : 'Modo Escuro'}
      >
        <div className="theme-icon-container">
          {isDark ? (
            <Moon className="theme-icon" />
          ) : (
            <Sun className="theme-icon" />
          )}
        </div>
        
        <div className="theme-switch">
          <div className={`switch-track ${isDark ? 'dark' : 'light'}`}>
            <div className="switch-thumb" />
          </div>
        </div>
        
        <span className="theme-label">
          {isDark ? 'Modo Escuro' : 'Modo Claro'}
        </span>
      </button>
    </div>
  );

  const controls = [
    {
      id: 'tts',
      label: 'Leitor de Texto',
      icon: Volume2,
      component: <TTSPanel />,
      shortLabel: 'Áudio'
    },
    {
      id: 'font',
      label: 'Tamanho da Fonte',
      icon: Type,
      component: <FontPanel />,
      shortLabel: 'Fonte'
    },
    {
      id: 'theme',
      label: 'Tema da Página',
      icon: isDark ? Moon : Sun,
      component: <ThemePanel />,
      shortLabel: 'Tema'
    }
  ];

  return (
    <div 
      ref={menuRef}
      className={`floating-accessibility-menu ${isOpen ? 'open' : ''}`}
      role="dialog"
      aria-label="Menu de acessibilidade"
      aria-expanded={isOpen}
    >
      {/* FAB Principal */}
      <button
        className={`fab-main ${isOpen ? 'active' : ''}`}
        onClick={toggleMenu}
        aria-label={isOpen ? 'Fechar menu de acessibilidade' : 'Abrir menu de acessibilidade'}
        title="Acessibilidade"
      >
        <div className="fab-icon">
          {isOpen ? (
            <X className="icon" />
          ) : (
            <Settings className="icon" />
          )}
        </div>
        <span className="fab-pulse"></span>
      </button>

      {/* Menu Expandido */}
      {isOpen && (
        <>
          {/* Overlay para móvel */}
          <div className="menu-overlay" onClick={() => setIsOpen(false)} />
          
          {/* Container dos Controles */}
          <div className="controls-container">
            {controls.map((control, index) => {
              const IconComponent = control.icon;
              const isActive = activeControl === control.id;
              
              return (
                <div
                  key={control.id}
                  className={`control-item ${isActive ? 'active' : ''}`}
                  style={{ '--delay': `${index * 0.1}s` }}
                >
                  {/* Botão do Controle */}
                  <button
                    className="control-button"
                    onClick={() => handleControlClick(control.id)}
                    aria-label={control.label}
                    title={control.label}
                    aria-expanded={isActive}
                  >
                    <IconComponent className="control-icon" />
                    <span className="control-label">{control.shortLabel}</span>
                  </button>

                  {/* Panel do Controle */}
                  {isActive && (
                    <div className="control-panel">
                      <div className="panel-header">
                        <h3>{control.label}</h3>
                        <button
                          className="panel-close"
                          onClick={() => setActiveControl(null)}
                          aria-label={`Fechar ${control.label}`}
                        >
                          <X className="close-icon" />
                        </button>
                      </div>
                      <div className="panel-content">
                        {control.component}
                      </div>
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

export default FloatingAccessibilityMenu;