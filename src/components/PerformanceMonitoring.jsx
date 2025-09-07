import { useEffect } from 'react';

/**
 * Hook simplificado para monitorar performance básica
 * Versão sem dependências externas
 */
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Só executa no browser
    if (typeof window === 'undefined') return;

    // Performance Observer básico para recursos lentos
    if ('PerformanceObserver' in window) {
      try {
        const resourceObserver = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 1000) {
              // Recursos que demoram mais de 1s
              console.warn(`Slow resource: ${entry.name} took ${entry.duration}ms`);

              // Envia para GA4 se disponível
              if (window.gtag) {
                window.gtag('event', 'slow_resource', {
                  event_category: 'Performance',
                  event_label: entry.name,
                  value: Math.round(entry.duration),
                });
              }
            }
          }
        });

        resourceObserver.observe({ entryTypes: ['resource'] });

        // Cleanup
        return () => {
          resourceObserver?.disconnect();
        };
      } catch (e) {
        console.warn('Performance Observer not supported:', e);
      }
    }

    // Monitoramento básico de navegação
    if ('performance' in window && window.performance.timing) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const timing = window.performance.timing;
          const loadTime = timing.loadEventEnd - timing.navigationStart;

          if (loadTime > 3000) {
            // Mais de 3 segundos
            console.warn(`Slow page load: ${loadTime}ms`);

            if (window.gtag) {
              window.gtag('event', 'slow_page_load', {
                event_category: 'Performance',
                value: loadTime,
              });
            }
          }
        }, 100);
      });
    }
  }, []);
};

/**
 * Component wrapper simplificado
 */
const PerformanceMonitoring = ({ children }) => {
  usePerformanceMonitoring();
  return children;
};

export default PerformanceMonitoring;
export { usePerformanceMonitoring };
