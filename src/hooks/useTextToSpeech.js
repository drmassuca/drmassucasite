import { useState, useEffect, useRef, useCallback } from 'react';

export const useTextToSpeech = () => {
  const [isSupported, setIsSupported] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const [totalLength, setTotalLength] = useState(0);
  const [rate, setRate] = useState(1.0);
  const [voices, setVoices] = useState([]);
  const [selectedVoice, setSelectedVoice] = useState(null);
  const [highlightedText, setHighlightedText] = useState('');

  const utteranceRef = useRef(null);
  const textRef = useRef('');
  const chunksRef = useRef([]);
  const currentChunkRef = useRef(0);
  const timeoutRef = useRef(null);

  // Verificar suporte do browser
  useEffect(() => {
    const supported = 'speechSynthesis' in window && 'SpeechSynthesisUtterance' in window;
    setIsSupported(supported);

    if (supported) {
      // Carregar vozes
      const loadVoices = () => {
        const availableVoices = speechSynthesis.getVoices();
        setVoices(availableVoices);
        
        // Selecionar voz em português como padrão
        const portugueseVoice = availableVoices.find(voice => 
          voice.lang.startsWith('pt') || voice.lang.includes('pt-BR')
        );
        if (portugueseVoice && !selectedVoice) {
          setSelectedVoice(portugueseVoice);
        }
      };

      loadVoices();
      speechSynthesis.addEventListener('voiceschanged', loadVoices);

      return () => {
        speechSynthesis.removeEventListener('voiceschanged', loadVoices);
      };
    }
  }, [selectedVoice]);

  // Dividir texto em chunks menores (para evitar timeouts)
  const createTextChunks = useCallback((text) => {
    const sentences = text.match(/[^\.!?]+[\.!?]+/g) || [text];
    const chunks = [];
    let currentChunk = '';

    sentences.forEach(sentence => {
      if ((currentChunk + sentence).length > 200) {
        if (currentChunk) {
          chunks.push(currentChunk.trim());
          currentChunk = sentence;
        } else {
          chunks.push(sentence.trim());
        }
      } else {
        currentChunk += sentence;
      }
    });

    if (currentChunk) {
      chunks.push(currentChunk.trim());
    }

    return chunks.filter(chunk => chunk.length > 0);
  }, []);

  // Extrair texto limpo do HTML
  const extractTextFromHTML = useCallback((htmlString) => {
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = htmlString;
    
    // Remover elementos desnecessários
    const removeElements = tempDiv.querySelectorAll('script, style, .source-item, .article-sources');
    removeElements.forEach(el => el.remove());
    
    // Adicionar pausas para diferentes elementos
    const headers = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(header => {
      header.textContent = `${header.textContent}. `;
    });

    const paragraphs = tempDiv.querySelectorAll('p');
    paragraphs.forEach(p => {
      p.textContent = `${p.textContent} `;
    });

    return tempDiv.textContent || tempDiv.innerText || '';
  }, []);

  // Inicializar texto para leitura
  const loadText = useCallback((content) => {
    if (!isSupported) return;

    const cleanText = extractTextFromHTML(content);
    textRef.current = cleanText;
    chunksRef.current = createTextChunks(cleanText);
    setTotalLength(cleanText.length);
    setCurrentPosition(0);
    currentChunkRef.current = 0;
  }, [isSupported, extractTextFromHTML, createTextChunks]);

  // Reproduzir chunk específico
  const playChunk = useCallback((chunkIndex = 0) => {
    if (!isSupported || !chunksRef.current[chunkIndex]) return;

    stop(); // Para qualquer reprodução anterior

    const chunk = chunksRef.current[chunkIndex];
    const utterance = new SpeechSynthesisUtterance(chunk);
    
    utterance.rate = rate;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    if (selectedVoice) {
      utterance.voice = selectedVoice;
    }

    utterance.onstart = () => {
      setIsPlaying(true);
      setIsPaused(false);
      setHighlightedText(chunk);
    };

    utterance.onend = () => {
      // Reproduzir próximo chunk
      if (chunkIndex < chunksRef.current.length - 1) {
        currentChunkRef.current = chunkIndex + 1;
        timeoutRef.current = setTimeout(() => {
          playChunk(chunkIndex + 1);
        }, 100);
      } else {
        // Fim da reprodução
        setIsPlaying(false);
        setIsPaused(false);
        setHighlightedText('');
        setCurrentPosition(0);
        currentChunkRef.current = 0;
      }
    };

    utterance.onerror = (event) => {
      console.warn('Speech synthesis error:', event.error);
      setIsPlaying(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    speechSynthesis.speak(utterance);
    
    // Atualizar posição aproximada
    const approximatePosition = chunksRef.current
      .slice(0, chunkIndex)
      .reduce((acc, chunk) => acc + chunk.length, 0);
    setCurrentPosition(approximatePosition);
    
  }, [isSupported, rate, selectedVoice]);

  // Controles principais
  const play = useCallback(() => {
    if (!isSupported) return;

    if (isPaused) {
      speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      playChunk(currentChunkRef.current);
    }
  }, [isSupported, isPaused, playChunk]);

  const pause = useCallback(() => {
    if (!isSupported || !isPlaying) return;

    speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, [isSupported, isPlaying]);

  const stop = useCallback(() => {
    if (!isSupported) return;

    speechSynthesis.cancel();
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    
    setIsPlaying(false);
    setIsPaused(false);
    setHighlightedText('');
    setCurrentPosition(0);
    currentChunkRef.current = 0;
    utteranceRef.current = null;
  }, [isSupported]);

  const changeRate = useCallback((newRate) => {
    setRate(newRate);
    
    // Se estiver reproduzindo, reiniciar com nova velocidade
    if (isPlaying || isPaused) {
      const currentChunk = currentChunkRef.current;
      stop();
      setTimeout(() => {
        playChunk(currentChunk);
      }, 100);
    }
  }, [isPlaying, isPaused, stop, playChunk]);

  const changeVoice = useCallback((voice) => {
    setSelectedVoice(voice);
    
    // Se estiver reproduzindo, reiniciar com nova voz
    if (isPlaying || isPaused) {
      const currentChunk = currentChunkRef.current;
      stop();
      setTimeout(() => {
        playChunk(currentChunk);
      }, 100);
    }
  }, [isPlaying, isPaused, stop, playChunk]);

  // Cleanup
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    isSupported,
    isPlaying,
    isPaused,
    currentPosition,
    totalLength,
    rate,
    voices,
    selectedVoice,
    highlightedText,
    loadText,
    play,
    pause,
    stop,
    changeRate,
    changeVoice,
    progress: totalLength > 0 ? (currentPosition / totalLength) * 100 : 0
  };
};
