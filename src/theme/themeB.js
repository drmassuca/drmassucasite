// theme/themeB.js
// Tema B: Moderno Vibrante com Inspiração Indígena
// Paleta colorida inspirada em arte indígena brasileira com neumorfismo suave

import { extendTheme } from '@chakra-ui/react';
import { baseConfig, baseComponents } from './base';

const themeB = extendTheme({
  ...baseConfig,

  // Nome do tema
  name: 'Vibrante Indígena',

  // Cores do Tema B - Inspiração Indígena Brasileira
  colors: {
    // Terracota / Urucum
    brand: {
      50: '#fef5f1',
      100: '#fce8dd',
      200: '#f9cdb9',
      300: '#f5a989',
      400: '#ef7d52',
      500: '#e85d2c', // Cor principal - Urucum
      600: '#da4920',
      700: '#b5391b',
      800: '#912f1c',
      900: '#76291a',
    },

    // Turquesa / Jade
    accent: {
      50: '#e6fffe',
      100: '#c3fffc',
      200: '#87fff9',
      300: '#42f9f2',
      400: '#0de4e3',
      500: '#00c4c7', // Turquesa vibrante
      600: '#009da3',
      700: '#077d83',
      800: '#0a6269',
      900: '#0e5257',
    },

    // Amarelo Sol / Dourado Tropical
    secondary: {
      50: '#fffbea',
      100: '#fff3c4',
      200: '#fce588',
      300: '#f9d04c',
      400: '#f6b724',
      500: '#f59e0b', // Amarelo sol
      600: '#d97706',
      700: '#b45309',
      800: '#92400e',
      900: '#78350f',
    },

    // Roxo Açaí
    tertiary: {
      50: '#faf5ff',
      100: '#f3e8ff',
      200: '#e9d5ff',
      300: '#d8b4fe',
      400: '#c084fc',
      500: '#a855f7',
      600: '#9333ea',
      700: '#7e22ce',
      800: '#6b21a8',
      900: '#4c1d95', // Roxo açaí escuro
    },

    // Verde Floresta
    quaternary: {
      50: '#ecfdf5',
      100: '#d1fae5',
      200: '#a7f3d0',
      300: '#6ee7b7',
      400: '#34d399',
      500: '#10b981',
      600: '#059669', // Verde floresta
      700: '#047857',
      800: '#065f46',
      900: '#064e3b',
    },

    // Neutros Modernos
    gray: {
      50: '#fafafa',
      100: '#f4f4f5',
      200: '#e4e4e7',
      300: '#d4d4d8',
      400: '#a1a1aa',
      500: '#71717a',
      600: '#52525b',
      700: '#3f3f46',
      800: '#27272a',
      900: '#18181b',
    },
  },

  // Tipografia Moderna
  fonts: {
    heading: "'Poppins', 'Montserrat', system-ui, sans-serif",
    body: "'DM Sans', 'Inter', system-ui, sans-serif",
    mono: "'JetBrains Mono', 'Fira Code', monospace",
  },

  // Componentes customizados para Tema B
  components: {
    ...baseComponents,

    // Botões com neumorfismo e gradientes
    Button: {
      ...baseComponents.Button,
      baseStyle: {
        ...baseComponents.Button.baseStyle,
        borderRadius: 'full',
        fontWeight: 'bold',
        letterSpacing: '0.02em',
        position: 'relative',
        overflow: 'hidden',
        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
          transition: 'left 0.5s ease',
        },
        _hover: {
          _before: {
            left: '100%',
          },
        },
      },
      variants: {
        solid: {
          bgGradient: 'linear(to-r, brand.500, brand.600)',
          color: 'white',
          boxShadow: '0 10px 25px -5px rgba(232, 93, 44, 0.3)',
          _hover: {
            bgGradient: 'linear(to-r, brand.600, brand.700)',
            transform: 'translateY(-3px) scale(1.02)',
            boxShadow: '0 20px 40px -10px rgba(232, 93, 44, 0.4)',
          },
          _active: {
            transform: 'translateY(-1px) scale(1)',
          },
        },
        outline: {
          borderWidth: '3px',
          borderColor: 'brand.500',
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
            transform: 'translateY(-2px)',
            boxShadow: 'lg',
          },
        },
        ghost: {
          color: 'brand.600',
          _hover: {
            bg: 'brand.50',
            transform: 'scale(1.05)',
          },
        },
        neo: {
          bg: 'gray.100',
          color: 'brand.600',
          boxShadow: '8px 8px 16px #d1d1d1, -8px -8px 16px #ffffff',
          _hover: {
            boxShadow: '12px 12px 20px #d1d1d1, -12px -12px 20px #ffffff',
            transform: 'translateY(-2px)',
          },
          _active: {
            boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff',
            transform: 'translateY(0)',
          },
          _dark: {
            bg: 'gray.800',
            color: 'accent.400',
            boxShadow: '8px 8px 16px #1a1a1a, -8px -8px 16px #2e2e2e',
            _hover: {
              boxShadow: '12px 12px 20px #1a1a1a, -12px -12px 20px #2e2e2e',
            },
            _active: {
              boxShadow: 'inset 8px 8px 16px #1a1a1a, inset -8px -8px 16px #2e2e2e',
            },
          },
        },
        gradient: {
          bgGradient: 'linear(45deg, brand.500, accent.500, secondary.500)',
          color: 'white',
          backgroundSize: '200% 200%',
          animation: 'gradient 3s ease infinite',
          _hover: {
            transform: 'translateY(-3px) scale(1.05)',
            boxShadow: '0 20px 40px -10px rgba(0, 196, 199, 0.5)',
          },
        },
      },
      defaultProps: {
        variant: 'solid',
      },
    },

    // Cards com cantos arredondados e sombras suaves
    Card: {
      baseStyle: {
        p: 6,
        bg: 'white',
        borderRadius: '2xl',
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        _before: {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '4px',
          bgGradient: 'linear(to-r, brand.400, accent.400, secondary.400)',
        },
        _hover: {
          transform: 'translateY(-8px) rotate(-1deg)',
          boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.2)',
        },
        _dark: {
          bg: 'gray.800',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        },
      },
      variants: {
        neo: {
          bg: 'gray.50',
          boxShadow: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff',
          _hover: {
            boxShadow: '25px 25px 75px #d1d1d1, -25px -25px 75px #ffffff',
          },
          _dark: {
            bg: 'gray.900',
            boxShadow: '20px 20px 60px #0d0d0d, -20px -20px 60px #2b2b2b',
          },
        },
        glass: {
          bg: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid',
          borderColor: 'rgba(255, 255, 255, 0.3)',
          boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
          _dark: {
            bg: 'rgba(0, 0, 0, 0.7)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
          },
        },
        gradient: {
          bgGradient: 'linear(135deg, brand.50, accent.50)',
          border: 'none',
          _hover: {
            bgGradient: 'linear(135deg, brand.100, accent.100)',
          },
        },
      },
    },

    // Headings modernos e vibrantes
    Heading: {
      ...baseComponents.Heading,
      baseStyle: {
        ...baseComponents.Heading.baseStyle,
        fontFamily: 'heading',
        fontWeight: '800',
        letterSpacing: '-0.03em',
        bgGradient: 'linear(to-r, brand.600, accent.600)',
        bgClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        _dark: {
          bgGradient: 'linear(to-r, brand.400, accent.400)',
        },
      },
      variants: {
        hero: {
          fontSize: { base: '4xl', md: '6xl', lg: '7xl' },
          lineHeight: '0.95',
          fontWeight: '900',
          animation: 'gradient 3s ease infinite',
          backgroundSize: '200% 200%',
        },
        section: {
          fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
          fontWeight: '700',
          mb: 6,
          position: 'relative',
          _after: {
            content: '""',
            display: 'block',
            width: '100px',
            height: '6px',
            bgGradient: 'linear(to-r, brand.400, accent.400, secondary.400)',
            borderRadius: 'full',
            mt: 4,
          },
        },
        solid: {
          color: 'gray.900',
          bgGradient: 'none',
          WebkitTextFillColor: 'currentColor',
          _dark: {
            color: 'gray.100',
          },
        },
      },
    },

    // Links com animações divertidas
    Link: {
      baseStyle: {
        color: 'accent.600',
        fontWeight: 'medium',
        position: 'relative',
        textDecoration: 'none',
        display: 'inline-block',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _hover: {
          color: 'brand.600',
          transform: 'translateY(-2px)',
          _after: {
            scaleX: 1,
          },
        },
        _after: {
          content: '""',
          position: 'absolute',
          bottom: '-4px',
          left: 0,
          right: 0,
          height: '3px',
          bgGradient: 'linear(to-r, brand.400, accent.400)',
          borderRadius: 'full',
          transform: 'scaleX(0)',
          transformOrigin: 'center',
          transition: 'transform 0.3s ease',
        },
        _dark: {
          color: 'accent.400',
          _hover: {
            color: 'brand.400',
          },
        },
      },
    },

    // Badges coloridos
    Badge: {
      ...baseComponents.Badge,
      baseStyle: {
        ...baseComponents.Badge.baseStyle,
        borderRadius: 'full',
        px: 4,
        py: 1.5,
        fontSize: 'xs',
        fontWeight: '700',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      },
      variants: {
        subtle: {
          bgGradient: 'linear(to-r, brand.100, accent.100)',
          color: 'brand.800',
        },
        solid: {
          bgGradient: 'linear(to-r, brand.500, accent.500)',
          color: 'white',
        },
        outline: {
          borderWidth: '2px',
          borderColor: 'brand.500',
          color: 'brand.600',
        },
        neon: {
          bg: 'transparent',
          color: 'accent.400',
          border: '2px solid',
          borderColor: 'accent.400',
          boxShadow: '0 0 20px rgba(0, 196, 199, 0.5), inset 0 0 20px rgba(0, 196, 199, 0.1)',
        },
      },
    },

    // Inputs modernos
    Input: {
      variants: {
        outline: {
          field: {
            borderColor: 'gray.300',
            borderWidth: '2px',
            borderRadius: 'xl',
            _hover: {
              borderColor: 'accent.400',
            },
            _focus: {
              borderColor: 'brand.500',
              boxShadow: '0 0 0 3px rgba(232, 93, 44, 0.1)',
            },
            _dark: {
              borderColor: 'gray.600',
              _hover: {
                borderColor: 'accent.500',
              },
              _focus: {
                borderColor: 'brand.400',
                boxShadow: '0 0 0 3px rgba(232, 93, 44, 0.2)',
              },
            },
          },
        },
        filled: {
          field: {
            bg: 'gray.100',
            borderRadius: 'xl',
            _hover: {
              bg: 'gray.200',
            },
            _focus: {
              bg: 'white',
              borderWidth: '2px',
              borderColor: 'brand.500',
            },
            _dark: {
              bg: 'gray.800',
              _hover: {
                bg: 'gray.700',
              },
              _focus: {
                bg: 'gray.900',
                borderColor: 'brand.400',
              },
            },
          },
        },
        neo: {
          field: {
            bg: 'gray.50',
            borderRadius: 'xl',
            boxShadow: 'inset 8px 8px 16px #d1d1d1, inset -8px -8px 16px #ffffff',
            _focus: {
              boxShadow: 'inset 12px 12px 20px #d1d1d1, inset -12px -12px 20px #ffffff',
            },
            _dark: {
              bg: 'gray.900',
              boxShadow: 'inset 8px 8px 16px #0d0d0d, inset -8px -8px 16px #2b2b2b',
            },
          },
        },
      },
    },

    // Accordion animado
    Accordion: {
      baseStyle: {
        container: {
          borderRadius: 'xl',
          overflow: 'hidden',
          mb: 4,
          boxShadow: 'md',
          _dark: {
            boxShadow: 'dark-lg',
          },
        },
        button: {
          fontWeight: 'semibold',
          bg: 'white',
          _hover: {
            bg: 'gray.50',
            _dark: {
              bg: 'gray.800',
            },
          },
          _expanded: {
            bg: 'brand.50',
            _dark: {
              bg: 'gray.800',
            },
          },
        },
        panel: {
          pt: 4,
          pb: 6,
          px: 6,
          bg: 'white',
          _dark: {
            bg: 'gray.900',
          },
        },
      },
    },

    // Tabs modernos
    Tabs: {
      variants: {
        line: {
          tab: {
            fontWeight: 'bold',
            borderBottom: '3px solid transparent',
            mb: '-3px',
            _selected: {
              color: 'brand.600',
              borderImage:
                'linear-gradient(to right, var(--chakra-colors-brand-400), var(--chakra-colors-accent-400)) 1',
            },
            _hover: {
              color: 'brand.500',
            },
          },
        },
        soft: {
          tab: {
            borderRadius: 'xl',
            fontWeight: 'semibold',
            _selected: {
              bg: 'brand.100',
              color: 'brand.700',
            },
            _hover: {
              bg: 'gray.100',
            },
          },
        },
        enclosed: {
          tab: {
            borderTopRadius: 'xl',
            borderWidth: '2px',
            borderColor: 'transparent',
            borderBottom: 'none',
            mb: '-2px',
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

  // Estilos globais específicos do Tema B
  styles: {
    global: props => ({
      ...baseConfig.styles.global(props),
      body: {
        ...baseConfig.styles.global(props).body,
        bg: props.colorMode === 'dark' ? 'gray.900' : 'white',
        color: props.colorMode === 'dark' ? 'gray.100' : 'gray.800',
      },
      // Animação de gradiente
      '@keyframes gradient': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
      // Animação de float
      '@keyframes float': {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      // Animação de rotate
      '@keyframes rotate': {
        from: { transform: 'rotate(0deg)' },
        to: { transform: 'rotate(360deg)' },
      },
      // Seleção de texto colorida
      '::selection': {
        bg: 'accent.200',
        color: 'brand.900',
      },
      '::-moz-selection': {
        bg: 'accent.200',
        color: 'brand.900',
      },
      // Scrollbar customizada e colorida
      '::-webkit-scrollbar': {
        width: '12px',
        height: '12px',
      },
      '::-webkit-scrollbar-track': {
        bg: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        borderRadius: 'full',
      },
      '::-webkit-scrollbar-thumb': {
        bgGradient: 'linear(to-b, brand.400, accent.400)',
        borderRadius: 'full',
        border: '2px solid',
        borderColor: props.colorMode === 'dark' ? 'gray.800' : 'gray.100',
        _hover: {
          bgGradient: 'linear(to-b, brand.500, accent.500)',
        },
      },
    }),
  },

  // Configuração específica
  config: {
    ...baseConfig.config,
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
});

export default themeB;
