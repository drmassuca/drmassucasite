import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Componente que força o scroll para o topo da página
 * sempre que há mudança de rota/navegação
 * Versão super robusta para resolver problemas com lazy loading
 */
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Função para forçar scroll
    const forceScrollToTop = () => {
      // Múltiplas estratégias executadas em sequência
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;

      // Para casos onde existe um container principal com scroll
      const main = document.querySelector('main');
      if (main) main.scrollTop = 0;

      // Para elementos com overflow scroll
      const containers = document.querySelectorAll('[data-scroll-container]');
      containers.forEach(container => {
        container.scrollTop = 0;
      });
    };

    // Execução imediata
    forceScrollToTop();

    // Retry após microtask (para lazy loading)
    setTimeout(forceScrollToTop, 0);

    // Retry após renderização (para suspense)
    setTimeout(forceScrollToTop, 1);

    // Retry após carregamento completo
    setTimeout(forceScrollToTop, 10);

    // Retry final para casos extremos
    setTimeout(forceScrollToTop, 100);

    // Observer para garantir que funcione quando a página estiver totalmente carregada
    const observer = new MutationObserver(() => {
      forceScrollToTop();
    });

    // Observa mudanças no DOM (lazy loading components)
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Cleanup do observer após um tempo
    const cleanup = setTimeout(() => {
      observer.disconnect();
    }, 500);

    return () => {
      observer.disconnect();
      clearTimeout(cleanup);
    };
  }, [pathname]); // Executa sempre que a rota mudar

  // Componente não renderiza nada visualmente
  return null;
};

export default ScrollToTop;
