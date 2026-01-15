import { useEffect } from 'react';

/**
 * Hook para monitorar Core Web Vitals e performance
 * Versão completa com web-vitals
 */
const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Função para enviar métricas para GA4
    const sendToAnalytics = metric => {
      if (window.gtag) {
        window.gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          non_interaction: true,
        });
      }

      // Log para desenvolvimento
      if (process.env.NODE_ENV === 'development') {
        console.log('Web Vital:', metric);
      }
    };

    // Monitora Core Web Vitals
    const observeWebVitals = async () => {
      try {
        const { getCLS, getFID, getFCP, getLCP, getTTFB } = await import('web-vitals');

        getCLS(sendToAnalytics);
        getFID(sendToAnalytics);
        getLCP(sendToAnalytics);
        getFCP(sendToAnalytics);
        getTTFB(sendToAnalytics);
      } catch (error) {
        console.warn('Web Vitals not available:', error);
      }
    };

    if (typeof window !== 'undefined') {
      observeWebVitals();
    }
  }, []);
};

const PerformanceMonitoring = ({ children }) => {
  usePerformanceMonitoring();
  return children;
};

export default PerformanceMonitoring;
export { usePerformanceMonitoring };
