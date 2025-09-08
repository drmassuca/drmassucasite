import { useState, useEffect } from 'react';

const FONT_SIZES = {
  'very-small': {
    name: 'Muito Pequeno',
    scale: 0.8,
    multipliers: {
      base: 0.8,
      h1: 0.8,
      h2: 0.8,
      h3: 0.8,
      h4: 0.8,
      p: 0.8,
      small: 0.8,
    },
  },
  small: {
    name: 'Pequeno',
    scale: 0.9,
    multipliers: {
      base: 0.9,
      h1: 0.9,
      h2: 0.9,
      h3: 0.9,
      h4: 0.9,
      p: 0.9,
      small: 0.9,
    },
  },
  normal: {
    name: 'Normal',
    scale: 1.0,
    multipliers: {
      base: 1.0,
      h1: 1.0,
      h2: 1.0,
      h3: 1.0,
      h4: 1.0,
      p: 1.0,
      small: 1.0,
    },
  },
  large: {
    name: 'Grande',
    scale: 1.15,
    multipliers: {
      base: 1.15,
      h1: 1.15,
      h2: 1.15,
      h3: 1.15,
      h4: 1.15,
      p: 1.15,
      small: 1.15,
    },
  },
  'very-large': {
    name: 'Muito Grande',
    scale: 1.3,
    multipliers: {
      base: 1.3,
      h1: 1.3,
      h2: 1.3,
      h3: 1.3,
      h4: 1.3,
      p: 1.3,
      small: 1.3,
    },
  },
};

const FONT_SIZE_ORDER = ['very-small', 'small', 'normal', 'large', 'very-large'];

export const useFontSize = () => {
  const [currentSize, setCurrentSize] = useState(() => {
    const saved = localStorage.getItem('article-font-size');
    return saved && FONT_SIZES[saved] ? saved : 'normal';
  });

  useEffect(() => {
    // Salvar no localStorage
    localStorage.setItem('article-font-size', currentSize);

    // Aplicar variáveis CSS
    const root = document.documentElement;
    const config = FONT_SIZES[currentSize];

    // Aplicar escala geral
    root.style.setProperty('--article-font-scale', config.scale);

    // Aplicar multiplicadores específicos
    Object.entries(config.multipliers).forEach(([element, multiplier]) => {
      root.style.setProperty(`--article-font-${element}`, multiplier);
    });

    // Aplicar classe para estilos condicionais
    FONT_SIZE_ORDER.forEach(size => {
      root.classList.remove(`font-size-${size}`);
    });
    root.classList.add(`font-size-${currentSize}`);
  }, [currentSize]);

  const increaseFontSize = () => {
    const currentIndex = FONT_SIZE_ORDER.indexOf(currentSize);
    if (currentIndex < FONT_SIZE_ORDER.length - 1) {
      setCurrentSize(FONT_SIZE_ORDER[currentIndex + 1]);
    }
  };

  const decreaseFontSize = () => {
    const currentIndex = FONT_SIZE_ORDER.indexOf(currentSize);
    if (currentIndex > 0) {
      setCurrentSize(FONT_SIZE_ORDER[currentIndex - 1]);
    }
  };

  const resetFontSize = () => {
    setCurrentSize('normal');
  };

  const canIncrease = FONT_SIZE_ORDER.indexOf(currentSize) < FONT_SIZE_ORDER.length - 1;
  const canDecrease = FONT_SIZE_ORDER.indexOf(currentSize) > 0;

  return {
    currentSize,
    fontSizeConfig: FONT_SIZES[currentSize],
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
    canIncrease,
    canDecrease,
    setFontSize: setCurrentSize,
    availableSizes: FONT_SIZES,
  };
};
