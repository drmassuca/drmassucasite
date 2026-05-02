import { useEffect } from 'react';

/**
 * Coleta Core Web Vitals (LCP, INP, CLS, FCP, TTFB) e envia via dataLayer.
 * GTM aplica Consent Mode v2: pings anonimizados sem consent, full com consent.
 * INP substituiu FID em março/2024 como métrica oficial do CWV.
 */
const usePerformanceMonitoring = () => {
  useEffect(() => {
    const sendToAnalytics = metric => {
      const value = Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value);

      window.dataLayer?.push({
        event: 'web_vitals',
        metric_name: metric.name,
        metric_value: value,
        metric_id: metric.id,
        metric_rating: metric.rating,
        page_path: window.location.pathname,
      });
    };

    const observe = async () => {
      try {
        const { onCLS, onINP, onLCP, onFCP, onTTFB } = await import('web-vitals');
        onCLS(sendToAnalytics);
        onINP(sendToAnalytics);
        onLCP(sendToAnalytics);
        onFCP(sendToAnalytics);
        onTTFB(sendToAnalytics);
      } catch (error) {
        if (process.env.NODE_ENV === 'development') {
          console.warn('Web Vitals indisponível:', error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      observe();
    }
  }, []);
};

const PerformanceMonitoring = ({ children }) => {
  usePerformanceMonitoring();
  return children || null;
};

export default PerformanceMonitoring;
export { usePerformanceMonitoring };
