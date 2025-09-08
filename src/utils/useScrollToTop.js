import { useEffect } from 'react';

/**
 * Hook personalizado para forçar scroll to top
 * Use este hook em páginas específicas que estão tendo problemas
 */
export const useScrollToTop = (dependency = true) => {
  useEffect(() => {
    if (dependency) {
      // Força scroll para o topo de forma robusta
      const scrollToTop = () => {
        window.scrollTo(0, 0);
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      };

      // Execução imediata
      scrollToTop();

      // Backup após renderização
      const timeoutId = setTimeout(scrollToTop, 10);

      return () => clearTimeout(timeoutId);
    }
  }, [dependency]);
};

export default useScrollToTop;
