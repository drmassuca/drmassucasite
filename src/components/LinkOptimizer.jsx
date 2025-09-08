import { useEffect } from 'react';

/**
 * 🎯 COMPONENTE PARA OTIMIZAR LINKS EXISTENTES COM DATA ATTRIBUTES
 * Adiciona tracking automático para todos os links de conversão
 *
 * ✅ Versão silenciosa - sem console.logs desnecessários
 */

const LinkOptimizer = () => {
  useEffect(() => {
    const optimizeLinks = () => {
      // Otimizar links WhatsApp
      const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
      whatsappLinks.forEach((link, index) => {
        if (!link.dataset.tracked) {
          // Adiciona data attributes para GTM
          link.setAttribute('data-event', 'whatsapp_click');
          link.setAttribute('data-conversion-type', 'whatsapp');
          link.setAttribute('data-conversion-value', '50');

          // Detecta localização do link
          const location = detectLinkLocation(link);
          link.setAttribute('data-click-location', location);

          // Detecta contexto de exame se aplicável
          const examContext = detectExamContext();
          if (examContext) {
            link.setAttribute('data-exam-context', examContext);
          }

          // Adiciona ID único
          link.setAttribute('data-link-id', `whatsapp-${index + 1}`);
          link.dataset.tracked = 'true';

          // 🔇 Log apenas em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            console.log(`📱 WhatsApp link optimized: ${location}`);
          }
        }
      });

      // Otimizar links Instagram
      const instagramLinks = document.querySelectorAll('a[href*="instagram.com"]');
      instagramLinks.forEach((link, index) => {
        if (!link.dataset.tracked) {
          link.setAttribute('data-event', 'instagram_click');
          link.setAttribute('data-engagement-type', 'social');
          link.setAttribute('data-click-location', detectLinkLocation(link));
          link.setAttribute('data-link-id', `instagram-${index + 1}`);
          link.dataset.tracked = 'true';

          // 🔇 Log apenas em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            console.log(`📸 Instagram link optimized`);
          }
        }
      });

      // Otimizar links de telefone
      const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
      phoneLinks.forEach((link, index) => {
        if (!link.dataset.tracked) {
          link.setAttribute('data-event', 'phone_click');
          link.setAttribute('data-conversion-type', 'phone');
          link.setAttribute('data-conversion-value', '40');
          link.setAttribute('data-contact-method', 'phone');
          link.setAttribute('data-phone-number', link.href.replace('tel:', ''));
          link.setAttribute('data-link-id', `phone-${index + 1}`);
          link.dataset.tracked = 'true';

          // 🔇 Log apenas em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            console.log(`📞 Phone link optimized`);
          }
        }
      });

      // Otimizar links de email
      const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
      emailLinks.forEach((link, index) => {
        if (!link.dataset.tracked) {
          link.setAttribute('data-event', 'email_click');
          link.setAttribute('data-contact-method', 'email');
          link.setAttribute('data-email-address', link.href.replace('mailto:', ''));
          link.setAttribute('data-link-id', `email-${index + 1}`);
          link.dataset.tracked = 'true';

          // 🔇 Log apenas em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            console.log(`📧 Email link optimized`);
          }
        }
      });

      // Otimizar links de exames
      const examLinks = document.querySelectorAll('a[href*="/exames/"]');
      examLinks.forEach((link, index) => {
        if (!link.dataset.tracked && !link.href.endsWith('/exames')) {
          const examName = extractExamName(link.href);
          link.setAttribute('data-event', 'exam_click');
          link.setAttribute('data-exam-name', examName);
          link.setAttribute('data-engagement-type', 'exam_interest');
          link.setAttribute('data-link-id', `exam-${index + 1}`);
          link.dataset.tracked = 'true';

          // 🔇 Log apenas em desenvolvimento
          if (process.env.NODE_ENV === 'development') {
            console.log(`🔬 Exam link optimized: ${examName}`);
          }
        }
      });
    };

    // Executar otimização inicial
    optimizeLinks();

    // Observer para novos elementos adicionados dinamicamente
    const observer = new MutationObserver(() => {
      optimizeLinks();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null; // Componente invisível
};

// 🔧 FUNÇÕES AUXILIARES

function detectLinkLocation(element) {
  // Detecta contexto específico do link
  if (element.closest('header')) return 'header';
  if (element.closest('footer')) return 'footer';
  if (element.closest('[class*="hero"]')) return 'hero_section';
  if (element.closest('[class*="mobile"]')) return 'mobile_bar';
  if (element.closest('[class*="contact"]')) return 'contact_section';
  if (element.closest('nav')) return 'navigation';

  // Detecta por posição na viewport
  const rect = element.getBoundingClientRect();
  const viewHeight = window.innerHeight;

  if (rect.top < viewHeight * 0.2) return 'top_fold';
  if (rect.top < viewHeight * 0.5) return 'above_fold';
  if (rect.top < viewHeight * 0.8) return 'below_fold';
  return 'bottom_section';
}

function detectExamContext() {
  const path = window.location.pathname;
  if (path.includes('/exames/')) {
    const examSlug = path.split('/exames/')[1];
    return examSlug ? examSlug.replace(/[/-]/g, '_') : null;
  }
  return null;
}

function extractExamName(href) {
  const parts = href.split('/exames/');
  if (parts[1]) {
    return parts[1].replace(/[/-]/g, '_').replace(/\?.*/g, ''); // Remove query params
  }
  return 'unknown_exam';
}

export default LinkOptimizer;
