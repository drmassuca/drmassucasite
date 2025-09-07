/**
 * 🎯 DASHBOARD DE ANALYTICS - DR. MASSUCA
 * Interface para visualizar dados de conversão e performance
 */

// 📊 CONFIG DE GOALS PARA GA4
const GA4_GOALS_CONFIG = {
  // Evento principal: WhatsApp clicks
  whatsapp_conversion: {
    event_name: 'conversion_whatsapp',
    conversion_value: 50,
    currency: 'BRL',
    custom_parameters: {
      click_location: '', // hero, mobile_bar, contact_page, etc.
      exam_context: '', // context do exame se aplicável
      user_type: '', // new_visitor, returning_visitor
    },
  },

  // Evento secundário: Phone clicks
  phone_conversion: {
    event_name: 'conversion_phone',
    conversion_value: 40,
    currency: 'BRL',
    custom_parameters: {
      phone_number: '',
      click_location: '',
    },
  },

  // Evento de engajamento: Deep engagement
  deep_engagement: {
    event_name: 'engagement_deep',
    conversion_value: 10,
    currency: 'BRL',
    custom_parameters: {
      time_on_page: '',
      scroll_depth: '',
      pages_viewed: '',
    },
  },

  // Evento de interesse: Exam views
  exam_interest: {
    event_name: 'engagement_exam',
    conversion_value: 5,
    currency: 'BRL',
    custom_parameters: {
      exam_name: '',
      exam_category: '',
      view_duration: '',
    },
  },
};

// 🎨 CONFIGURAÇÕES DE GTM - TRIGGERS E TAGS
const GTM_CONFIG = {
  triggers: {
    // Trigger para WhatsApp clicks
    whatsapp_click_trigger: {
      type: 'click_all_elements',
      conditions: [
        {
          type: 'contains',
          variable: 'Click URL',
          value: 'wa.me',
        },
      ],
      fires_on: 'some_clicks',
    },

    // Trigger para scroll depth
    scroll_depth_trigger: {
      type: 'scroll_depth',
      percentages: [25, 50, 75, 100],
      fires_on: 'all_pages',
    },

    // Trigger para time on page
    timer_trigger: {
      type: 'timer',
      intervals: [30000, 120000, 300000], // 30s, 2min, 5min
      fires_on: 'all_pages',
    },
  },

  tags: {
    // Tag GA4 para conversões WhatsApp
    whatsapp_conversion_tag: {
      type: 'ga4_event',
      event_name: 'conversion_whatsapp',
      parameters: {
        conversion_value: 50,
        currency: 'BRL',
        click_location: '{{Click Classes}}',
        page_location: '{{Page URL}}',
        user_id: '{{User ID}}',
      },
    },

    // Tag GA4 para engajamento
    engagement_tag: {
      type: 'ga4_event',
      event_name: 'engagement_milestone',
      parameters: {
        engagement_type: '{{Event Category}}',
        engagement_value: '{{Event Label}}',
        page_location: '{{Page URL}}',
      },
    },
  },
};

// 🔥 HEATMAP SETUP CONFIGURATION
const HEATMAP_CONFIG = {
  // Configuração para Hotjar (alternativa)
  hotjar: {
    site_id: null, // Seria necessário criar conta
    version: 6,
    trigger_on_consent: true,
  },

  // Configuração para Microsoft Clarity (gratuito)
  clarity: {
    project_id: null, // Seria necessário criar projeto
    trigger_on_consent: true,
    sample_rate: 100, // 100% dos usuários
  },

  // Configuração nativa (implementação própria)
  native: {
    enabled: true,
    sample_rate: 50, // 50% dos usuários para performance
    max_clicks_stored: 100,
    max_movements_stored: 50,
    throttle_ms: 100,
  },
};

// 📈 FUNNELS DE CONVERSÃO
const CONVERSION_FUNNELS = {
  // Funil principal: Homepage -> WhatsApp
  homepage_to_whatsapp: {
    name: 'Homepage to WhatsApp Conversion',
    steps: [
      {
        step: 1,
        name: 'Landing',
        event: 'page_view',
        page: '/',
        expected_completion: 100,
      },
      {
        step: 2,
        name: 'Engagement',
        event: 'scroll_depth',
        value: 25,
        expected_completion: 70,
      },
      {
        step: 3,
        name: 'Interest',
        event: 'time_on_page',
        value: 30,
        expected_completion: 40,
      },
      {
        step: 4,
        name: 'Conversion',
        event: 'conversion_whatsapp',
        expected_completion: 15,
      },
    ],
  },

  // Funil secundário: Exam page -> Contact
  exam_to_contact: {
    name: 'Exam Interest to Contact',
    steps: [
      {
        step: 1,
        name: 'Exam View',
        event: 'page_view',
        page: '/exames/*',
        expected_completion: 100,
      },
      {
        step: 2,
        name: 'Deep Read',
        event: 'scroll_depth',
        value: 50,
        expected_completion: 60,
      },
      {
        step: 3,
        name: 'Contact Action',
        event: ['conversion_whatsapp', 'conversion_phone'],
        expected_completion: 25,
      },
    ],
  },
};

// 🎯 A/B TESTS CONFIGURATION
const AB_TESTS_CONFIG = {
  // Teste 1: CTAs do WhatsApp
  homepage_whatsapp_cta: {
    name: 'Homepage WhatsApp CTA Test',
    status: 'active',
    traffic_split: 50,
    variants: {
      control: {
        text: 'Agendar pelo WhatsApp',
        style: 'default',
        urgency: false,
      },
      variant_a: {
        text: 'Agende Hoje - WhatsApp',
        style: 'urgent',
        urgency: true,
        extra_styling: {
          animation: 'pulse 2s infinite',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)',
        },
      },
    },
    success_metric: 'conversion_whatsapp',
    minimum_sample_size: 100,
    statistical_significance: 0.95,
  },

  // Teste 2: Headlines de exames
  exam_headlines: {
    name: 'Exam Page Headlines Test',
    status: 'active',
    traffic_split: 50,
    variants: {
      control: {
        approach: 'technical',
        style: 'professional',
      },
      variant_a: {
        approach: 'emotional',
        style: 'personal',
        extra_elements: ['trust_badges', 'emotional_icons'],
      },
    },
    success_metric: 'engagement_exam',
    pages: ['/exames/*'],
    minimum_sample_size: 50,
  },
};

// 📊 DASHBOARD WIDGETS CONFIG
const DASHBOARD_CONFIG = {
  kpis: {
    primary: [
      {
        name: 'WhatsApp Conversions',
        metric: 'conversion_whatsapp',
        goal: 50, // conversões por mês
        format: 'number',
      },
      {
        name: 'Conversion Rate',
        calculation: 'conversion_whatsapp / page_views * 100',
        goal: 3.5, // 3.5%
        format: 'percentage',
      },
      {
        name: 'Cost Per Conversion',
        calculation: 'ad_spend / total_conversions',
        goal: 25, // R$ 25
        format: 'currency',
      },
    ],
    secondary: [
      {
        name: 'Avg. Time on Page',
        metric: 'avg_time_on_page',
        goal: 90, // 90 segundos
        format: 'duration',
      },
      {
        name: 'Bounce Rate',
        metric: 'bounce_rate',
        goal: 45, // 45% (lower is better)
        format: 'percentage',
        inverse: true,
      },
      {
        name: 'Pages per Session',
        metric: 'pages_per_session',
        goal: 2.5,
        format: 'decimal',
      },
    ],
  },

  charts: [
    {
      type: 'line',
      title: 'Daily Conversions Trend',
      metrics: ['conversion_whatsapp', 'conversion_phone'],
      timeframe: '30d',
    },
    {
      type: 'funnel',
      title: 'Conversion Funnel',
      data: 'homepage_to_whatsapp',
    },
    {
      type: 'heatmap_overlay',
      title: 'Click Heatmap',
      pages: ['/', '/exames', '/contato'],
    },
    {
      type: 'bar',
      title: 'Top Converting Pages',
      metric: 'conversion_rate_by_page',
      limit: 10,
    },
  ],
};

// 🚨 ALERTS & NOTIFICATIONS
const ALERTS_CONFIG = {
  performance: {
    conversion_drop: {
      condition: 'conversion_rate < 2.0',
      threshold: '20% decrease from 7-day average',
      notification: 'email',
      severity: 'high',
    },
    page_speed: {
      condition: 'avg_page_load_time > 3000',
      threshold: '3 seconds',
      notification: 'console',
      severity: 'medium',
    },
  },

  opportunities: {
    high_traffic_low_conversion: {
      condition: 'page_views > 100 AND conversion_rate < 1.0',
      action: 'suggest_ab_test',
      severity: 'medium',
    },
    new_top_performing_page: {
      condition: 'conversion_rate > 5.0 AND page_views > 50',
      action: 'highlight_success',
      severity: 'low',
    },
  },
};

// 🔧 IMPLEMENTATION HELPERS
const IMPLEMENTATION_SCRIPTS = {
  // Script para adicionar ao GTM
  gtm_dataLayer_push: `
    // Enhanced ecommerce para conversões
    dataLayer.push({
      'event': 'conversion_whatsapp',
      'conversion_value': 50,
      'conversion_currency': 'BRL',
      'user_properties': {
        'visitor_type': 'new_visitor'
      }
    });
  `,

  // Script para GA4 goals setup
  ga4_goals_script: `
    // Configurar conversões como goals no GA4
    gtag('config', 'G-T14CXNTC7V', {
      'custom_map': {
        'conversion_whatsapp': 'whatsapp_conversion',
        'conversion_phone': 'phone_conversion'
      }
    });
  `,

  // Script para heatmap nativo
  native_heatmap_init: `
    // Inicializar tracking de cliques
    document.addEventListener('click', function(e) {
      const clickData = {
        x: e.clientX,
        y: e.clientY,
        element: e.target.tagName,
        timestamp: Date.now(),
        page: window.location.pathname
      };
      
      // Enviar para dataLayer
      dataLayer.push({
        'event': 'click_tracking',
        'click_data': clickData
      });
    });
  `,
};

export {
  GA4_GOALS_CONFIG,
  GTM_CONFIG,
  HEATMAP_CONFIG,
  CONVERSION_FUNNELS,
  AB_TESTS_CONFIG,
  DASHBOARD_CONFIG,
  ALERTS_CONFIG,
  IMPLEMENTATION_SCRIPTS,
};
