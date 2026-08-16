/**
 * Tema oficial do reposicionamento 2026.
 *
 * Fonte da verdade das cores: src/styles/brand-tokens.css
 * (paleta navy/azul herdada da ICS Academy, ciano de produto da Xdiag).
 * Tipografia Inter em tudo, como na família ICS.
 */
import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  fonts: {
    heading: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
    body: "'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
  },

  colors: {
    // Navy institucional (família ICS). brand.900 é a cor principal.
    brand: {
      50: '#e8f1f9',
      100: '#c5dbee',
      200: '#9ec3e2',
      300: '#76aad5',
      400: '#5897cb',
      500: '#3a85c2',
      600: '#2d6ba3',
      700: '#1f5183',
      800: '#0d3b66', // navy claro (gradientes)
      900: '#0a2540', // navy principal (títulos, header, footer)
    },

    // Azul de ação (botões, links). accent.500 = #0693e3 da ICS.
    accent: {
      50: '#e8f4fd',
      100: '#c2e3fa',
      200: '#98d0f6',
      300: '#6dbdf2',
      400: '#3db4f2', // destaque de título
      500: '#0693e3', // botão primário
      600: '#0570b0', // hover
      700: '#045d92',
      800: '#034a74',
      900: '#023756',
    },

    // Ciano de produto (Xdiag). Uso restrito a contexto tecnológico.
    cyan: {
      50: '#ecfeff',
      100: '#cffafe',
      200: '#a5f3fc',
      300: '#67e8f9',
      400: '#22d3ee',
      500: '#06b6d4',
      600: '#0891b2',
      700: '#0e7490',
      800: '#155e75',
      900: '#164e63',
    },
  },

  styles: {
    global: {
      body: {
        bg: '#ffffff',
        color: '#0f172a',
      },
    },
  },

  components: {
    Button: {
      baseStyle: {
        fontWeight: 600,
        borderRadius: '12px',
      },
    },
    Heading: {
      baseStyle: {
        letterSpacing: '-0.02em',
        color: '#0a2540',
      },
    },
  },
});

export default theme;
