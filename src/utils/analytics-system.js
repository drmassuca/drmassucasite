// ============================================================================
// 📈 SISTEMA COMPLETO DE ANALYTICS E CONVERSÃO - DR. MASSUCA
// ============================================================================

// 🎯 1. SISTEMA DE EVENTS AVANÇADO
// ----------------------------------------------------------------------------

/**
 * Sistema central de tracking de eventos
 * Funciona com GTM (GTM-PPH3NLG6) e GA4 (G-T14CXNTC7V)
 */
class DrMassucaAnalytics {
  constructor() {
    this.gtmId = 'GTM-PPH3NLG6';
    this.ga4Id = 'G-T14CXNTC7V';
    this.initialized = false;
    this.events = [];

    this.init();
  }

  init() {
    if (typeof window === 'undefined') return;

    // Aguarda o GTM carregar
    this.waitForGTM(() => {
      this.initialized = true;
      this.setupEventListeners();
      this.trackPageLoad();
      console.log('🎯 DrMassuca Analytics initialized');
    });
  }

  waitForGTM(callback, attempts = 0) {
    if (window.dataLayer && window.gtag) {
      callback();
    } else if (attempts < 50) {
      setTimeout(() => this.waitForGTM(callback, attempts + 1), 100);
    } else {
      console.warn('⚠️ GTM não carregou - usando fallback');
      callback();
    }
  }

  // 📊 TRACK DE CONVERSÕES (WHATSAPP)
  trackWhatsAppClick(location, examType = null) {
    const eventData = {
      event: 'conversion_whatsapp',
      event_category: 'Conversão',
      event_label: location,
      value: 1,
      conversion_location: location,
      exam_type: examType,
      timestamp: new Date().toISOString(),
      user_id: this.getUserId(),
    };

    this.sendEvent(eventData);

    // Evento específico para o GTM
    this.sendEvent({
      event: 'whatsapp_click',
      click_location: location,
      exam_context: examType,
    });

    console.log('📱 WhatsApp click tracked:', location);
  }

  // 📊 TRACK DE ENGAJAMENTO (INSTAGRAM)
  trackInstagramClick(location) {
    const eventData = {
      event: 'engagement_instagram',
      event_category: 'Engajamento',
      event_label: location,
      click_location: location,
      timestamp: new Date().toISOString(),
    };

    this.sendEvent(eventData);
    console.log('📸 Instagram click tracked:', location);
  }

  // 📊 TRACK DE CONTATOS (TELEFONE/EMAIL)
  trackContactClick(method, value) {
    const eventData = {
      event: 'contact_click',
      event_category: 'Contato',
      event_label: method,
      contact_method: method,
      contact_value: value,
      timestamp: new Date().toISOString(),
    };

    this.sendEvent(eventData);
    console.log(`📞 ${method} click tracked:`, value);
  }

  // 📊 TRACK DE NAVEGAÇÃO (EXAMES)
  trackExamView(examName, examCategory) {
    const eventData = {
      event: 'exam_view',
      event_category: 'Navegação',
      event_label: examName,
      exam_name: examName,
      exam_category: examCategory,
      timestamp: new Date().toISOString(),
    };

    this.sendEvent(eventData);
    console.log('🔬 Exam view tracked:', examName);
  }

  // 📊 TRACK DE COMPORTAMENTO (SCROLL, TEMPO)
  trackScrollDepth(percentage) {
    if ([25, 50, 75, 100].includes(percentage)) {
      const eventData = {
        event: 'scroll_depth',
        event_category: 'Engajamento',
        event_label: `${percentage}%`,
        scroll_percentage: percentage,
        page_url: window.location.pathname,
      };

      this.sendEvent(eventData);
    }
  }

  trackTimeOnPage(seconds) {
    const milestones = [30, 60, 120, 300]; // 30s, 1m, 2m, 5m

    if (milestones.includes(seconds)) {
      const eventData = {
        event: 'time_on_page',
        event_category: 'Engajamento',
        event_label: `${seconds}s`,
        time_seconds: seconds,
        page_url: window.location.pathname,
      };

      this.sendEvent(eventData);
    }
  }

  // 📊 TRACK DE PERFORMANCE
  trackPageLoad() {
    if (!window.performance) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        const timing = window.performance.timing;
        const loadTime = timing.loadEventEnd - timing.navigationStart;

        const eventData = {
          event: 'page_performance',
          event_category: 'Performance',
          event_label: window.location.pathname,
          load_time: loadTime,
          dom_ready: timing.domContentLoadedEventEnd - timing.navigationStart,
          first_paint: this.getFirstPaint(),
        };

        this.sendEvent(eventData);
      }, 1000);
    });
  }

  getFirstPaint() {
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find(entry => entry.name === 'first-contentful-paint');
    return firstPaint ? Math.round(firstPaint.startTime) : null;
  }

  // 🔧 UTILITIES
  sendEvent(eventData) {
    if (!this.initialized) {
      this.events.push(eventData);
      return;
    }

    // Envia para dataLayer (GTM)
    if (window.dataLayer) {
      window.dataLayer.push(eventData);
    }

    // Envia diretamente para GA4 (backup)
    if (window.gtag) {
      window.gtag('event', eventData.event, eventData);
    }

    // Salva histórico local
    this.saveEventLocally(eventData);
  }

  saveEventLocally(eventData) {
    try {
      const stored = JSON.parse(localStorage.getItem('drmassuca_events') || '[]');
      stored.push({
        ...eventData,
        timestamp: new Date().toISOString(),
      });

      // Mantém apenas os últimos 100 eventos
      if (stored.length > 100) {
        stored.splice(0, stored.length - 100);
      }

      localStorage.setItem('drmassuca_events', JSON.stringify(stored));
    } catch (e) {
      console.warn('Não foi possível salvar evento localmente:', e);
    }
  }

  getUserId() {
    let userId = localStorage.getItem('drmassuca_user_id');
    if (!userId) {
      userId = 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('drmassuca_user_id', userId);
    }
    return userId;
  }

  // 🎧 EVENT LISTENERS AUTOMÁTICOS
  setupEventListeners() {
    // Auto-track de links WhatsApp
    document.addEventListener('click', e => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.href;

      // WhatsApp
      if (href.includes('wa.me') || href.includes('whatsapp')) {
        const location = this.getClickLocation(link);
        const examType = this.detectExamContext();
        this.trackWhatsAppClick(location, examType);
      }

      // Instagram
      else if (href.includes('instagram.com')) {
        const location = this.getClickLocation(link);
        this.trackInstagramClick(location);
      }

      // Telefone
      else if (href.startsWith('tel:')) {
        const phone = href.replace('tel:', '');
        this.trackContactClick('phone', phone);
      }

      // Email
      else if (href.startsWith('mailto:')) {
        const email = href.replace('mailto:', '');
        this.trackContactClick('email', email);
      }

      // Links de exames
      else if (href.includes('/exames/')) {
        const examName = this.extractExamName(href);
        this.trackExamView(examName, 'detailed_view');
      }
    });

    // Auto-track de scroll
    this.setupScrollTracking();

    // Auto-track de tempo na página
    this.setupTimeTracking();
  }

  getClickLocation(element) {
    // Detecta onde o link foi clicado
    if (element.closest('header')) return 'header';
    if (element.closest('footer')) return 'footer';
    if (element.closest('[class*="hero"]')) return 'hero';
    if (element.closest('[class*="mobile"]')) return 'mobile_bar';
    if (element.closest('[class*="contact"]')) return 'contact_page';

    // Tenta detectar pela posição na página
    const rect = element.getBoundingClientRect();
    const viewHeight = window.innerHeight;

    if (rect.top < viewHeight * 0.3) return 'top_section';
    if (rect.top < viewHeight * 0.7) return 'middle_section';
    return 'bottom_section';
  }

  detectExamContext() {
    const path = window.location.pathname;
    if (path.includes('/exames/')) {
      return path.split('/exames/')[1] || 'unknown_exam';
    }
    return null;
  }

  extractExamName(href) {
    const parts = href.split('/exames/');
    return parts[1] ? parts[1].replace(/[/-]/g, '_') : 'unknown_exam';
  }

  setupScrollTracking() {
    let tracked = new Set();

    window.addEventListener('scroll', () => {
      const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;

      [25, 50, 75, 100].forEach(milestone => {
        if (scrolled >= milestone && !tracked.has(milestone)) {
          tracked.add(milestone);
          this.trackScrollDepth(milestone);
        }
      });
    });
  }

  setupTimeTracking() {
    const startTime = Date.now();

    setInterval(() => {
      const secondsOnPage = Math.floor((Date.now() - startTime) / 1000);
      this.trackTimeOnPage(secondsOnPage);
    }, 5000);
  }

  // 📊 RELATÓRIOS E DADOS
  getStoredEvents() {
    try {
      return JSON.parse(localStorage.getItem('drmassuca_events') || '[]');
    } catch {
      return [];
    }
  }

  generateReport() {
    const events = this.getStoredEvents();
    const report = {
      total_events: events.length,
      whatsapp_clicks: events.filter(e => e.event === 'conversion_whatsapp').length,
      instagram_clicks: events.filter(e => e.event === 'engagement_instagram').length,
      contact_clicks: events.filter(e => e.event === 'contact_click').length,
      exam_views: events.filter(e => e.event === 'exam_view').length,
      average_time_on_page: this.calculateAverageTime(events),
      top_click_locations: this.getTopLocations(events),
    };

    console.table(report);
    return report;
  }

  calculateAverageTime(events) {
    const timeEvents = events.filter(e => e.event === 'time_on_page');
    if (timeEvents.length === 0) return 0;

    const total = timeEvents.reduce((sum, e) => sum + (e.time_seconds || 0), 0);
    return Math.round(total / timeEvents.length);
  }

  getTopLocations(events) {
    const locations = {};
    events.forEach(e => {
      if (e.click_location) {
        locations[e.click_location] = (locations[e.click_location] || 0) + 1;
      }
    });

    return Object.entries(locations)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([location, count]) => ({ location, count }));
  }
}

// ============================================================================
// 🧪 2. SISTEMA DE A/B TESTING
// ============================================================================

class ABTesting {
  constructor() {
    this.tests = new Map();
    this.userVariants = JSON.parse(localStorage.getItem('drmassuca_ab_variants') || '{}');
  }

  // Criar teste A/B
  createTest(testName, variants, trafficSplit = 0.5) {
    if (!Array.isArray(variants) || variants.length < 2) {
      throw new Error('A/B test needs at least 2 variants');
    }

    this.tests.set(testName, {
      variants,
      trafficSplit,
      startDate: new Date().toISOString(),
    });

    return this.getVariant(testName);
  }

  // Obter variante para usuário
  getVariant(testName) {
    const test = this.tests.get(testName);
    if (!test) return null;

    // Verifica se usuário já tem variante
    if (this.userVariants[testName]) {
      return this.userVariants[testName];
    }

    // Atribui nova variante
    const random = Math.random();
    const variantIndex = random < test.trafficSplit ? 0 : 1;
    const variant = test.variants[variantIndex];

    // Salva para usuário
    this.userVariants[testName] = variant;
    localStorage.setItem('drmassuca_ab_variants', JSON.stringify(this.userVariants));

    // Tracked no analytics
    window.drMassucaAnalytics?.sendEvent({
      event: 'ab_test_assigned',
      test_name: testName,
      variant: variant,
      timestamp: new Date().toISOString(),
    });

    return variant;
  }

  // Converter usuário (goal atingido)
  convert(testName, conversionType = 'default') {
    const variant = this.userVariants[testName];
    if (!variant) return;

    window.drMassucaAnalytics?.sendEvent({
      event: 'ab_test_conversion',
      test_name: testName,
      variant: variant,
      conversion_type: conversionType,
      timestamp: new Date().toISOString(),
    });
  }
}

// ============================================================================
// 🔥 3. HEATMAPS & USER BEHAVIOR
// ============================================================================

class HeatmapTracker {
  constructor() {
    this.clicks = [];
    this.movements = [];
    this.scrollData = [];
    this.setupTracking();
  }

  setupTracking() {
    // Track clicks
    document.addEventListener('click', e => {
      this.recordClick(e.clientX, e.clientY, e.target);
    });

    // Track mouse movements (throttled)
    let mouseMoveTimeout;
    document.addEventListener('mousemove', e => {
      clearTimeout(mouseMoveTimeout);
      mouseMoveTimeout = setTimeout(() => {
        this.recordMovement(e.clientX, e.clientY);
      }, 100);
    });

    // Track scroll behavior
    window.addEventListener('scroll', () => {
      this.recordScroll();
    });
  }

  recordClick(x, y, element) {
    const click = {
      x: Math.round((x / window.innerWidth) * 100), // Percentage
      y: Math.round((y / window.innerHeight) * 100),
      element: element.tagName.toLowerCase(),
      className: element.className,
      timestamp: Date.now(),
      url: window.location.pathname,
    };

    this.clicks.push(click);
    this.saveHeatmapData();
  }

  recordMovement(x, y) {
    // Only record if significantly different from last position
    const lastMove = this.movements[this.movements.length - 1];
    if (lastMove && Math.abs(lastMove.x - x) < 10 && Math.abs(lastMove.y - y) < 10) {
      return;
    }

    this.movements.push({
      x: Math.round((x / window.innerWidth) * 100),
      y: Math.round((y / window.innerHeight) * 100),
      timestamp: Date.now(),
      url: window.location.pathname,
    });

    // Keep only last 100 movements
    if (this.movements.length > 100) {
      this.movements.shift();
    }
  }

  recordScroll() {
    const scrollPercent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    this.scrollData.push({
      scroll_percent: scrollPercent,
      timestamp: Date.now(),
      url: window.location.pathname,
    });
  }

  saveHeatmapData() {
    try {
      const data = {
        clicks: this.clicks.slice(-50), // Last 50 clicks
        movements: this.movements.slice(-50),
        scrollData: this.scrollData.slice(-20),
        session_id: this.getSessionId(),
      };

      localStorage.setItem('drmassuca_heatmap', JSON.stringify(data));
    } catch (e) {
      console.warn('Could not save heatmap data:', e);
    }
  }

  getSessionId() {
    let sessionId = sessionStorage.getItem('drmassuca_session');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      sessionStorage.setItem('drmassuca_session', sessionId);
    }
    return sessionId;
  }

  getHeatmapData() {
    try {
      return JSON.parse(localStorage.getItem('drmassuca_heatmap') || '{}');
    } catch {
      return {};
    }
  }

  generateHeatmapVisualization() {
    const data = this.getHeatmapData();
    console.log('🔥 Heatmap Data:', data);

    // Em uma implementação real, isso renderizaria um heatmap visual
    return data;
  }
}

// ============================================================================
// 🎯 4. GOALS E CONVERSIONS CONFIG
// ============================================================================

class ConversionGoals {
  constructor() {
    this.goals = {
      // Goal 1: WhatsApp Click (Principal)
      whatsapp_conversion: {
        name: 'WhatsApp Conversion',
        description: 'User clicked WhatsApp button',
        value: 50, // R$ 50 estimated value
        category: 'conversion',
      },

      // Goal 2: Phone Call
      phone_conversion: {
        name: 'Phone Conversion',
        description: 'User clicked phone number',
        value: 40,
        category: 'conversion',
      },

      // Goal 3: Deep Engagement
      deep_engagement: {
        name: 'Deep Engagement',
        description: 'User spent 2+ minutes or visited 3+ pages',
        value: 10,
        category: 'engagement',
      },

      // Goal 4: Exam Interest
      exam_interest: {
        name: 'Exam Interest',
        description: 'User viewed exam details page',
        value: 5,
        category: 'engagement',
      },
    };
  }

  // Configurar goal no GA4
  setupGA4Goals() {
    Object.entries(this.goals).forEach(([goalId, goal]) => {
      if (window.gtag) {
        window.gtag('config', 'G-T14CXNTC7V', {
          custom_map: {
            [goalId]: goal.name,
          },
        });
      }
    });
  }

  // Disparar conversão
  triggerConversion(goalId, customValue = null) {
    const goal = this.goals[goalId];
    if (!goal) return;

    const conversionData = {
      event: 'conversion',
      event_category: goal.category,
      event_label: goal.name,
      value: customValue || goal.value,
      currency: 'BRL',
      goal_id: goalId,
      goal_name: goal.name,
      timestamp: new Date().toISOString(),
    };

    // Envia para analytics
    window.drMassucaAnalytics?.sendEvent(conversionData);

    console.log('🎯 Goal triggered:', goalId, conversionData);
  }
}

// ============================================================================
// 🚀 5. INICIALIZAÇÃO E EXPORTS
// ============================================================================

// Inicializar sistema completo
function initDrMassucaAnalytics() {
  if (typeof window === 'undefined') return;

  // Analytics principal
  window.drMassucaAnalytics = new DrMassucaAnalytics();

  // A/B Testing
  window.drMassucaAB = new ABTesting();

  // Heatmaps
  window.drMassucaHeatmap = new HeatmapTracker();

  // Goals
  window.drMassucaGoals = new ConversionGoals();
  window.drMassucaGoals.setupGA4Goals();

  // Helpers globais
  window.trackWhatsApp = (location, exam) =>
    window.drMassucaAnalytics.trackWhatsAppClick(location, exam);
  window.trackInstagram = location => window.drMassucaAnalytics.trackInstagramClick(location);
  window.triggerGoal = (goalId, value) => window.drMassucaGoals.triggerConversion(goalId, value);

  console.log('🚀 Dr. Massuca Analytics System fully initialized!');
}

// Auto-inicializar quando DOM carregar
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initDrMassucaAnalytics);
} else {
  initDrMassucaAnalytics();
}

// Export para uso em componentes React
export { DrMassucaAnalytics, ABTesting, HeatmapTracker, ConversionGoals, initDrMassucaAnalytics };
