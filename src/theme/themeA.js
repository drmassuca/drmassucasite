// theme/themeA.js
// Tema A: Elegante Clássico Médico
// Paleta institucional verde escuro e dourado com tipografia serif

import { extendTheme } from '@chakra-ui/react';
import { baseConfig, baseComponents } from './base';

const themeA = extendTheme({
  ...baseConfig,

  // Nome do tema
  name: 'Elegante Clássico',

  // Cores do Tema A - Institucional
  colors: {
    // Verde Médico Escuro
    brand: {
      50: '#e6f3ed',
      100: '#c0e1d0',
      200: '#96cdb1',
      300: '#6cb991',
      400: '#4daa7a',
      500: '#2d9b63',
      600: '#288f5a',
      700: '#20804f',
      800: '#197144',
      900: '#0f3d2e', // Cor principal
    },

    // Dourado Elegante
    accent: {
      50: '#fdf8e8',
      100: '#f9edc5',
      200: '#f5e19e',
      300: '#f1d677',
      400: '#edcb5a',
      500: '#d4af37', // Dourado principal
      600: '#c49f32',
      700: '#aa8a2b',
      800: '#907524',
      900: '#66521a',
    },

    // Neutros Quentes
    gray: {
      50: '#fafaf9',
      100: '#f5f5f3',
      200: '#e8e8e5',
      300: '#d4d4d0',
      400: '#a8a89f',
      500: '#73736a',
      600: '#5a5a52',
      700: '#45453f',
      800: '#2d2d29',
      900: '#1a1a17',
    },

    // Semânticos
    success: {
      50: '#e7f5e7',
      100: '#c3e6c3',
      200: '#9bd69b',
      300: '#73c573',
      400: '#55b855',
      500: '#37ac37',
      600: '#319d31',
      700: '#298a29',
      800: '#217821',
      900: '#145814',
    },

    info: {
      50: '#e6f4ff',
      100: '#bae3ff',
      200: '#7cc4fa',
      300: '#47a3f3',
      400: '#2186eb',
      500: '#0967d2',
      600: '#0552b5',
      700: '#03449e',
      800: '#01337a',
      900: '#002159',
    },
  },

  // Tipografia Elegante
  fonts: {
    heading: "'Playfair Display', 'Georgia', serif",
    body: "'Inter', 'Helvetica Neue', system-ui, sans-serif",
    mono: "'IBM Plex Mono', 'Courier New', monospace",
  },

  // Componentes customizados para Tema A
  components: {
    ...baseComponents,

    // Botões elegantes
    Button: {
      ...baseComponents.Button,
      variants: {
        solid: {
          bg: 'brand.900',
          color: 'white',
          _hover: {
            bg: 'brand.800',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
          _active: {
            bg: 'brand.700',
            transform: 'translateY(0)',
          },
        },
        outline: {
          borderColor: 'brand.900',
          color: 'brand.900',
          borderWidth: '2px',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
          },
        },
        ghost: {
          color: 'brand.900',
          _hover: {
            bg: 'brand.50',
          },
        },
        accent: {
          bg: 'accent.500',
          color: 'brand.900',
          fontWeight: 'bold',
          _hover: {
            bg: 'accent.400',
            transform: 'translateY(-2px)',
            boxShadow: 'xl',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },

    // Cards com bordas finas
    Card: {
      baseStyle: {
        p: 8,
        bg: 'white',
        borderRadius: 'lg',
        border: '1px solid',
        borderColor: 'gray.200',
        boxShadow: 'sm',
        transition: 'all 0.3s ease',
        _hover: {
          boxShadow: 'lg',
          transform: 'translateY(-4px)',
        },
        _dark: {
          bg: 'gray.800',
          borderColor: 'gray.700',
        },
      },
      variants: {
        elevated: {
          boxShadow: 'xl',
          border: 'none',
        },
        outline: {
          boxShadow: 'none',
          border: '2px solid',
          borderColor: 'brand.200',
        },
        filled: {
          bg: 'brand.50',
          border: 'none',
        },
      },
    },

    // Headings com serifa
    Heading: {
      ...baseComponents.Heading,
      baseStyle: {
        ...baseComponents.Heading.baseStyle,
        fontFamily: 'heading',
        fontWeight: '700',
        letterSpacing: '-0.02em',
        color: 'brand.900',
        _dark: {
          color: 'brand.100',
        },
      },
      variants: {
        hero: {
          fontSize: { base: '4xl', md: '5xl', lg: '6xl' },
          lineHeight: '1.1',
          fontWeight: '400',
          letterSpacing: '-0.03em',
        },
        section: {
          fontSize: { base: '2xl', md: '3xl' },
          fontWeight: '600',
          mb: 4,
          position: 'relative',
          _after: {
            content: '""',
            display: 'block',
            width: '60px',
            height: '3px',
            bg: 'accent.500',
            mt: 3,
          },
        },
      },
    },

    // Links com sublinhado animado
    Link: {
      baseStyle: {
        color: 'brand.700',
        position: 'relative',
        textDecoration: 'none',
        transition: 'all 0.3s ease',
        _hover: {
          color: 'brand.900',
          _after: {
            width: '100%',
          },
        },
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-2px',
          left: 0,
          width: 0,
          height: '2px',
          bg: 'accent.500',
          transition: 'width 0.3s ease',
        },
        _dark: {
          color: 'brand.300',
          _hover: {
            color: 'brand.100',
          },
        },
      },
    },

    // Badges elegantes
    Badge: {
      ...baseComponents.Badge,
      baseStyle: {
        ...baseComponents.Badge.baseStyle,
        borderRadius: 'full',
        px: 3,
        py: 1,
        fontSize: 'xs',
        fontWeight: '600',
        letterSpacing: '0.05em',
      },
      variants: {
        subtle: {
          bg: 'brand.100',
          color: 'brand.900',
        },
        solid: {
          bg: 'brand.900',
          color: 'white',
        },
        outline: {
          borderWidth: '1px',
          borderColor: 'brand.900',
          color: 'brand.900',
        },
        accent: {
          bg: 'accent.500',
          color: 'brand.900',
        },
      },
    },

    // Inputs elegantes
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            _hover: {
              borderColor: 'brand.500',
            },
            _focus: {
              borderColor: 'brand.600',
              boxShadow: '0 0 0 1px var(--chakra-colors-brand-600)',
            },
            _dark: {
              borderColor: 'gray.600',
              _hover: {
                borderColor: 'brand.400',
              },
              _focus: {
                borderColor: 'brand.500',
                boxShadow: '0 0 0 1px var(--chakra-colors-brand-500)',
              },
            },
          },
        },
        filled: {
          field: {
            bg: 'gray.50',
            _hover: {
              bg: 'gray.100',
            },
            _focus: {
              bg: 'white',
              borderColor: 'brand.600',
            },
            _dark: {
              bg: 'gray.800',
              _hover: {
                bg: 'gray.700',
              },
              _focus: {
                bg: 'gray.900',
                borderColor: 'brand.500',
              },
            },
          },
        },
      },
    },

    // Accordion elegante
    Accordion: {
      baseStyle: {
        container: {
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.700',
          },
        },
        button: {
          fontWeight: 'medium',
          _hover: {
            bg: 'gray.50',
            _dark: {
              bg: 'gray.800',
            },
          },
        },
        panel: {
          pt: 4,
          pb: 4,
        },
      },
    },

    // Tabs clássicos
    Tabs: {
      variants: {
        line: {
          tab: {
            borderBottom: '2px solid transparent',
            fontWeight: 'medium',
            _selected: {
              color: 'brand.900',
              borderColor: 'accent.500',
            },
            _hover: {
              color: 'brand.700',
            },
          },
        },
        enclosed: {
          tab: {
            borderWidth: '1px',
            borderColor: 'transparent',
            _selected: {
              bg: 'white',
              borderColor: 'gray.200',
              borderBottomColor: 'white',
            },
          },
        },
      },
    },
  },

  // Estilos globais específicos do Tema A
  styles: {
    global: props => ({
      ...baseConfig.styles.global(props),
      body: {
        ...baseConfig.styles.global(props).body,
        bg: props.colorMode === 'dark' ? 'gray.900' : 'gray.50',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.900',
      },
      // Seleção de texto elegante
      '::selection': {
        bg: 'accent.200',
        color: 'brand.900',
      },
      '::-moz-selection': {
        bg: 'accent.200',
        color: 'brand.900',
      },
      // Scrollbar personalizada
      '::-webkit-scrollbar': {
        width: '10px',
        height: '10px',
      },
      '::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
      },
      '::-webkit-scrollbar-thumb': {
        bg: props.colorMode === 'dark' ? 'brand.700' : 'brand.500',
        borderRadius: 'full',
        _hover: {
          bg: props.colorMode === 'dark' ? 'brand.600' : 'brand.600',
        },
      },
    }),
  },

  // Configuração específica
  config: {
    ...baseConfig.config,
    initialColorMode: 'light',
    useSystemColorMode: true,
  },
});

export default themeA;
