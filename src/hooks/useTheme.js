import { useState, useEffect } from 'react';

export const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    // Verificar localStorage primeiro
    const savedTheme = localStorage.getItem('article-theme');
    if (savedTheme) {
      return savedTheme;
    }
    
    // Fallback para preferência do sistema
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    
    return 'light';
  });

  useEffect(() => {
    // Salvar no localStorage
    localStorage.setItem('article-theme', theme);
    
    // Aplicar classe no documento
    const root = document.documentElement;
    root.classList.remove('theme-light', 'theme-dark');
    root.classList.add(`theme-${theme}`);
    
    // Aplicar variáveis CSS
    if (theme === 'dark') {
      root.style.setProperty('--article-bg-primary', '#1a1a2e');
      root.style.setProperty('--article-bg-secondary', '#16213e');
      root.style.setProperty('--article-bg-content', 'rgba(22, 33, 62, 0.95)');
      root.style.setProperty('--article-bg-highlight', 'rgba(30, 41, 66, 0.9)');
      root.style.setProperty('--article-text-primary', '#ffffff');
      root.style.setProperty('--article-text-secondary', '#b8c5d6');
      root.style.setProperty('--article-text-muted', '#8896a6');
      root.style.setProperty('--article-border-color', 'rgba(184, 197, 214, 0.2)');
      root.style.setProperty('--article-border-hover', 'rgba(102, 126, 234, 0.4)');
      root.style.setProperty('--article-shadow-light', 'rgba(0, 0, 0, 0.3)');
      root.style.setProperty('--article-shadow-medium', 'rgba(0, 0, 0, 0.4)');
      root.style.setProperty('--article-quote-bg', 'rgba(30, 41, 66, 0.8)');
    } else {
      root.style.setProperty('--article-bg-primary', '#667eea');
      root.style.setProperty('--article-bg-secondary', '#764ba2');
      root.style.setProperty('--article-bg-content', 'rgba(255, 255, 255, 0.95)');
      root.style.setProperty('--article-bg-highlight', 'rgba(248, 249, 255, 0.9)');
      root.style.setProperty('--article-text-primary', '#333333');
      root.style.setProperty('--article-text-secondary', '#666666');
      root.style.setProperty('--article-text-muted', '#888888');
      root.style.setProperty('--article-border-color', '#e9ecef');
      root.style.setProperty('--article-border-hover', '#667eea');
      root.style.setProperty('--article-shadow-light', 'rgba(0, 0, 0, 0.1)');
      root.style.setProperty('--article-shadow-medium', 'rgba(0, 0, 0, 0.15)');
      root.style.setProperty('--article-quote-bg', 'rgba(248, 249, 250, 0.9)');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const isDark = theme === 'dark';

  return {
    theme,
    isDark,
    toggleTheme,
    setTheme
  };
};
