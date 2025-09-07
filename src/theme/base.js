// theme/base.js
// Configurações compartilhadas entre os temas A e B

export const baseConfig = {
  // Breakpoints responsivos
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '992px',
    xl: '1280px',
    '2xl': '1536px',
  },

  // Espaçamentos padrão
  space: {
    px: '1px',
    0.5: '0.125rem',
    1: '0.25rem',
    1.5: '0.375rem',
    2: '0.5rem',
    2.5: '0.625rem',
    3: '0.75rem',
    3.5: '0.875rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
    12: '3rem',
    14: '3.5rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
    28: '7rem',
    32: '8rem',
    36: '9rem',
    40: '10rem',
    44: '11rem',
    48: '12rem',
    52: '13rem',
    56: '14rem',
    60: '15rem',
    64: '16rem',
    72: '18rem',
    80: '20rem',
    96: '24rem',
  },

  // Tamanhos de fonte base
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
    '6xl': '3.75rem',
    '7xl': '4.5rem',
    '8xl': '6rem',
    '9xl': '8rem',
  },

  // Pesos de fonte
  fontWeights: {
    hairline: 100,
    thin: 200,
    light: 300,
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
    black: 900,
  },

  // Altura de linha
  lineHeights: {
    normal: 'normal',
    none: 1,
    shorter: 1.25,
    short: 1.375,
    base: 1.5,
    tall: 1.625,
    taller: '2',
    3: '.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    7: '1.75rem',
    8: '2rem',
    9: '2.25rem',
    10: '2.5rem',
  },

  // Raios de borda
  radii: {
    none: '0',
    sm: '0.125rem',
    base: '0.25rem',
    md: '0.375rem',
    lg: '0.5rem',
    xl: '0.75rem',
    '2xl': '1rem',
    '3xl': '1.5rem',
    full: '9999px',
  },

  // Sombras base
  shadows: {
    xs: '0 0 0 1px rgba(0, 0, 0, 0.05)',
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
    none: 'none',
  },

  // Z-index
  zIndices: {
    hide: -1,
    auto: 'auto',
    base: 0,
    docked: 10,
    dropdown: 1000,
    sticky: 1100,
    banner: 1200,
    overlay: 1300,
    modal: 1400,
    popover: 1500,
    skipLink: 1600,
    toast: 1700,
    tooltip: 1800,
  },

  // Transições base
  transition: {
    property: {
      common: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
      colors: 'background-color, border-color, color, fill, stroke',
      dimensions: 'width, height',
      position: 'left, right, top, bottom',
      background: 'background-color, background-image, background-position',
    },
    easing: {
      'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
      'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
      bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    },
    duration: {
      'ultra-fast': '50ms',
      faster: '100ms',
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
      slower: '400ms',
      'ultra-slow': '500ms',
    },
  },

  // Configurações globais
  config: {
    cssVarPrefix: 'chakra',
    initialColorMode: 'system', // Auto dark mode
    useSystemColorMode: true,
  },

  // Estilos globais compartilhados
  styles: {
    global: props => ({
      'html, body': {
        height: '100%',
        scrollBehavior: 'smooth',
      },
      body: {
        fontFamily: 'body',
        lineHeight: 'base',
        WebkitFontSmoothing: 'antialiased',
        MozOsxFontSmoothing: 'grayscale',
        textRendering: 'optimizeLegibility',
      },
      '*::placeholder': {
        opacity: 0.6,
      },
      '*, *::before, *::after': {
        borderColor: props.colorMode === 'dark' ? 'gray.700' : 'gray.200',
      },
      // Animação de spin para loading
      '@keyframes spin': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      // Animação de pulse
      '@keyframes pulse': {
        '0%, 100%': { opacity: 1 },
        '50%': { opacity: 0.5 },
      },
      // Animação de bounce
      '@keyframes bounce': {
        '0%, 100%': {
          transform: 'translateY(-25%)',
          animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
        },
        '50%': {
          transform: 'translateY(0)',
          animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
        },
      },
      // Animação de fade in
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      },
      // Animação de slide up
      '@keyframes slideUp': {
        from: {
          transform: 'translateY(20px)',
          opacity: 0,
        },
        to: {
          transform: 'translateY(0)',
          opacity: 1,
        },
      },
      // Animação de scale
      '@keyframes scale': {
        from: {
          transform: 'scale(0.95)',
          opacity: 0,
        },
        to: {
          transform: 'scale(1)',
          opacity: 1,
        },
      },
    }),
  },
};

// Componentes base compartilhados
export const baseComponents = {
  // Container padrão
  Container: {
    baseStyle: {
      maxW: 'container.xl',
      px: { base: 4, md: 6, lg: 8 },
    },
  },

  // Botão base
  Button: {
    baseStyle: {
      fontWeight: 'semibold',
      borderRadius: 'lg',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      _focus: {
        boxShadow: 'outline',
      },
      _disabled: {
        opacity: 0.4,
        cursor: 'not-allowed',
        boxShadow: 'none',
      },
    },
    sizes: {
      xs: {
        h: 6,
        minW: 6,
        fontSize: 'xs',
        px: 2,
      },
      sm: {
        h: 8,
        minW: 8,
        fontSize: 'sm',
        px: 3,
      },
      md: {
        h: 10,
        minW: 10,
        fontSize: 'md',
        px: 4,
      },
      lg: {
        h: 12,
        minW: 12,
        fontSize: 'lg',
        px: 6,
      },
      xl: {
        h: 14,
        minW: 14,
        fontSize: 'xl',
        px: 8,
      },
    },
  },

  // Heading base
  Heading: {
    baseStyle: {
      fontWeight: 'bold',
      lineHeight: 'shorter',
    },
    sizes: {
      xs: { fontSize: 'xs' },
      sm: { fontSize: 'sm' },
      md: { fontSize: 'md' },
      lg: { fontSize: 'lg' },
      xl: { fontSize: 'xl' },
      '2xl': { fontSize: '2xl' },
      '3xl': { fontSize: '3xl' },
      '4xl': { fontSize: '4xl' },
      '5xl': { fontSize: '5xl' },
      '6xl': { fontSize: '6xl' },
    },
  },

  // Link base
  Link: {
    baseStyle: {
      transition: 'all 0.2s',
      cursor: 'pointer',
      textDecoration: 'none',
      outline: 'none',
      _hover: {
        textDecoration: 'underline',
      },
      _focus: {
        boxShadow: 'outline',
      },
    },
  },

  // Card base
  Card: {
    baseStyle: {
      p: 6,
      bg: 'white',
      borderRadius: 'xl',
      boxShadow: 'md',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    },
  },

  // Badge base
  Badge: {
    baseStyle: {
      px: 2,
      py: 1,
      borderRadius: 'md',
      fontSize: 'xs',
      fontWeight: 'semibold',
      textTransform: 'uppercase',
    },
  },

  // Input base
  Input: {
    baseStyle: {
      field: {
        width: '100%',
        minWidth: 0,
        outline: 0,
        position: 'relative',
        appearance: 'none',
        transition: 'all 0.2s',
      },
    },
  },

  // Textarea base
  Textarea: {
    baseStyle: {
      width: '100%',
      minWidth: 0,
      outline: 0,
      position: 'relative',
      appearance: 'none',
      transition: 'all 0.2s',
      minHeight: '80px',
      paddingY: '8px',
      lineHeight: 'short',
    },
  },
};
