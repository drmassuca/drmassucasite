import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Play, Pause, Square, Volume2, Settings } from 'lucide-react';
import { useTextToSpeech } from '../hooks/useTextToSpeech';
import './TextToSpeechPlayer.css';

const TextToSpeechPlayer = ({ content }) => {
  const [showSettings, setShowSettings] = useState(false);
  const {
    isSupported,
    isPlaying,
    isPaused,
    rate,
    voices,
    selectedVoice,
    progress,
    loadText,
    play,
    pause,
    stop,
    changeRate,
    changeVoice,
  } = useTextToSpeech();

  // Carregar texto quando o componente monta ou content muda
  React.useEffect(() => {
    if (content && isSupported) {
      loadText(content);
    }
  }, [content, isSupported, loadText]);

  if (!isSupported) {
    return (
      <div className="tts-player unsupported">
        <Volume2 className="tts-icon disabled" />
        <span className="tts-unsupported-text">Leitor não suportado</span>
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

  const rateOptions = [
    { value: 0.5, label: '0.5x' },
    { value: 0.75, label: '0.75x' },
    { value: 1.0, label: '1x' },
    { value: 1.25, label: '1.25x' },
    { value: 1.5, label: '1.5x' },
    { value: 2.0, label: '2x' },
  ];

  const portugueseVoices = voices.filter(
    voice => voice.lang.startsWith('pt') || voice.lang.includes('pt-BR')
  );

  return (
    <div className="tts-player">
      <div className="tts-controls">
        <button
          className="tts-btn play-pause"
          onClick={handlePlayPause}
          aria-label={isPlaying ? 'Pausar leitura' : 'Iniciar leitura'}
          title={isPlaying ? 'Pausar' : 'Reproduzir'}
        >
          {isPlaying ? <Pause className="tts-icon" /> : <Play className="tts-icon" />}
        </button>

        <button
          className="tts-btn stop"
          onClick={stop}
          disabled={!isPlaying && !isPaused}
          aria-label="Parar leitura"
          title="Parar"
        >
          <Square className="tts-icon" />
        </button>

        <div className="tts-progress">
          <div className="tts-progress-bar">
            <div className="tts-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <span className="tts-progress-text">{Math.round(progress)}%</span>
        </div>

        <div className="tts-rate">
          <span className="tts-rate-label">{rate}x</span>
        </div>

        <button
          className="tts-btn settings"
          onClick={() => setShowSettings(!showSettings)}
          aria-label="Configurações de voz"
          title="Configurações"
        >
          <Settings className={`tts-icon ${showSettings ? 'active' : ''}`} />
        </button>
      </div>

      {showSettings && (
        <div className="tts-settings">
          <div className="tts-setting-group">
            <label className="tts-setting-label">Velocidade:</label>
            <div className="tts-rate-options">
              {rateOptions.map(option => (
                <button
                  key={option.value}
                  className={`tts-rate-btn ${rate === option.value ? 'active' : ''}`}
                  onClick={() => changeRate(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {portugueseVoices.length > 0 && (
            <div className="tts-setting-group">
              <label className="tts-setting-label">Voz:</label>
              <select
                className="tts-voice-select"
                value={selectedVoice?.name || ''}
                onChange={e => {
                  const voice = voices.find(v => v.name === e.target.value);
                  if (voice) changeVoice(voice);
                }}
              >
                {portugueseVoices.map(voice => (
                  <option key={voice.name} value={voice.name}>
                    {voice.name} ({voice.lang})
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

TextToSpeechPlayer.propTypes = {
  content: PropTypes.string.isRequired,
};

export default TextToSpeechPlayer;
