import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * 🎯 COMPONENTE DE ANALYTICS AVANÇADO - DR. MASSUCA
 * Integra com o sistema completo de tracking, A/B testing e heatmaps
 */

const AdvancedAnalytics = () => {
  const location = useLocation();
  const timeOnPageRef = useRef(Date.now());
  const engagementRef = useRef({
    scrollEvents: 0,
    clickEvents: 0,
    timeThresholds: new Set(),
  });

  // Inicializar sistema de analytics
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import e inicialização do sistema
    const initializeAnalytics = async () => {
      try {
        // Aguarda GTM carregar se ainda não carregou
        let attempts = 0;
        while (!window.dataLayer && attempts < 50) {
          await new Promise(resolve => setTimeout(resolve, 100));
          attempts++;
        }

        // Inicializa sistema se não existe
        if (!window.drMassucaAnalytics) {
          const { initDrMassucaAnalytics } = await import('../utils/analytics-system.js');
          initDrMassucaAnalytics();
        }

        console.log('🎯 Advanced Analytics initialized for:', location.pathname);
      } catch (error) {
        console.error('Analytics initialization error:', error);
      }
    };

    initializeAnalytics();
  }, []);

  // Track mudanças de página
  useEffect(() => {
    if (!window.drMassucaAnalytics) return;

    // Reset timer para nova página
    timeOnPageRef.current = Date.now();
    engagementRef.current = {
      scrollEvents: 0,
      clickEvents: 0,
      timeThresholds: new Set(),
    };

    // Track page view
    const pageData = {
      event: 'page_view',
      page_path: location.pathname,
      page_title: document.title,
      timestamp: new Date().toISOString(),
    };

    window.drMassucaAnalytics.sendEvent(pageData);

    // Detectar tipo de página para goals específicos
    detectPageTypeAndGoals(location.pathname);
  }, [location.pathname]);

  // Monitor engajamento na página atual
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const engagementTimer = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - timeOnPageRef.current) / 1000);
      const engagement = engagementRef.current;

      // Track milestones de tempo
      if (timeOnPage >= 30 && !engagement.timeThresholds.has(30)) {
        engagement.timeThresholds.add(30);
        triggerEngagementGoal('time_30s');
      }
      if (timeOnPage >= 120 && !engagement.timeThresholds.has(120)) {
        engagement.timeThresholds.add(120);
        triggerEngagementGoal('deep_engagement');
        // Trigger goal de deep engagement
        window.drMassucaGoals?.triggerConversion('deep_engagement');
      }
      if (timeOnPage >= 300 && !engagement.timeThresholds.has(300)) {
        engagement.timeThresholds.add(300);
        triggerEngagementGoal('very_deep_engagement');
      }
    }, 5000);

    return () => clearInterval(engagementTimer);
  }, [location.pathname]);

  // Configurar A/B tests para a página atual
  useEffect(() => {
    if (!window.drMassucaAB) return;

    setupABTestsForPage(location.pathname);
  }, [location.pathname]);

  return null; // Componente invisível
};

// 🎯 FUNÇÕES AUXILIARES

function detectPageTypeAndGoals(pathname) {
  // Página de exame - trigger goal de interesse
  if (pathname.includes('/exames/') && pathname !== '/exames') {
    setTimeout(() => {
      window.drMassucaGoals?.triggerConversion('exam_interest');
    }, 2000); // Aguarda 2s para confirmar interesse real
  }

  // Página de contato - alta intenção
  if (pathname === '/contato') {
    window.drMassucaAnalytics?.sendEvent({
      event: 'high_intent_page',
      page_type: 'contact',
      intent_level: 'high',
    });
  }

  // Página sobre - engagement
  if (pathname === '/sobre') {
    window.drMassucaAnalytics?.sendEvent({
      event: 'engagement_page',
      page_type: 'about',
      intent_level: 'medium',
    });
  }

  // Homepage - track entrada
  if (pathname === '/') {
    window.drMassucaAnalytics?.sendEvent({
      event: 'homepage_view',
      page_type: 'landing',
      intent_level: 'discovery',
    });
  }
}

function triggerEngagementGoal(type) {
  window.drMassucaAnalytics?.sendEvent({
    event: 'engagement_milestone',
    engagement_type: type,
    page_url: window.location.pathname,
    timestamp: new Date().toISOString(),
  });
}

function setupABTestsForPage(pathname) {
  // A/B Test: CTAs do WhatsApp na homepage
  if (pathname === '/') {
    const ctaVariant = window.drMassucaAB.createTest('homepage_whatsapp_cta', [
      {
        id: 'original',
        text: 'Agendar pelo WhatsApp',
        style: 'primary',
        urgency: false,
      },
      {
        id: 'urgent',
        text: 'Agende Hoje - WhatsApp',
        style: 'primary_urgent',
        urgency: true,
      },
    ]);

    // Aplica variante se elemento existe
    setTimeout(() => {
      const whatsappButton = document.querySelector('a[href*="wa.me"]');
      if (whatsappButton && ctaVariant) {
        applyWhatsAppCTAVariant(whatsappButton, ctaVariant);
      }
    }, 1000);
  }

  // A/B Test: Headlines de exames
  if (pathname.includes('/exames/')) {
    const headlineVariant = window.drMassucaAB.createTest('exam_headlines', [
      { id: 'technical', style: 'technical' },
      { id: 'emotional', style: 'emotional' },
    ]);

    if (headlineVariant) {
      applyExamHeadlineVariant(headlineVariant);
    }
  }
}

function applyWhatsAppCTAVariant(button, variant) {
  if (variant.id === 'urgent') {
    button.textContent = variant.text;
    button.style.animation = 'pulse 2s infinite';
    button.style.boxShadow = '0 0 20px rgba(212, 175, 55, 0.5)';

    // Track que variante foi aplicada
    window.drMassucaAnalytics?.sendEvent({
      event: 'ab_variant_applied',
      test_name: 'homepage_whatsapp_cta',
      variant_id: variant.id,
    });
  }
}

function applyExamHeadlineVariant(variant) {
  const heading = document.querySelector('h1');
  if (!heading) return;

  if (variant.id === 'emotional') {
    // Adiciona elementos emocionais
    heading.style.color = '#d4af37';

    // Adiciona ícones ou elementos visuais se for emotional
    const icon = document.createElement('span');
    icon.innerHTML = ' ❤️';
    icon.style.fontSize = '0.8em';
    heading.appendChild(icon);
  }

  window.drMassucaAnalytics?.sendEvent({
    event: 'ab_variant_applied',
    test_name: 'exam_headlines',
    variant_id: variant.id,
  });
}

// 🎯 HOOK PARA TRACKING MANUAL EM COMPONENTES
export const useAnalyticsTracking = () => {
  const location = useLocation();

  const trackWhatsAppClick = (context = 'manual', examType = null) => {
    window.drMassucaAnalytics?.trackWhatsAppClick(context, examType);
    window.drMassucaGoals?.triggerConversion('whatsapp_conversion');

    // A/B test conversion
    window.drMassucaAB?.convert('homepage_whatsapp_cta', 'whatsapp_click');
  };

  const trackPhoneClick = phoneNumber => {
    window.drMassucaAnalytics?.trackContactClick('phone', phoneNumber);
    window.drMassucaGoals?.triggerConversion('phone_conversion');
  };

  const trackInstagramClick = (context = 'manual') => {
    window.drMassucaAnalytics?.trackInstagramClick(context);
  };

  const trackExamInterest = examName => {
    window.drMassucaAnalytics?.trackExamView(examName, 'user_initiated');
    window.drMassucaGoals?.triggerConversion('exam_interest');
  };

  const trackCustomEvent = (eventName, eventData) => {
    window.drMassucaAnalytics?.sendEvent({
      event: eventName,
      ...eventData,
      page_context: location.pathname,
      timestamp: new Date().toISOString(),
    });
  };

  return {
    trackWhatsAppClick,
    trackPhoneClick,
    trackInstagramClick,
    trackExamInterest,
    trackCustomEvent,
  };
};

export default AdvancedAnalytics;
