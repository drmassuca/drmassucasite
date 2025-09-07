// components/ui/Prose.jsx
// Wrapper para conteúdo markdown/texto com estilos apropriados

import { Box, useTheme } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Prose = ({ children, ...props }) => {
  const theme = useTheme();
  const isThemeB = theme.name === 'Vibrante Indígena';

  const proseStyles = {
    // Estilos base para texto
    lineHeight: 'tall',
    fontSize: { base: 'md', md: 'lg' },
    color: 'gray.700',
    _dark: {
      color: 'gray.300',
    },

    // Headings
    'h1, h2, h3, h4, h5, h6': {
      fontFamily: 'heading',
      fontWeight: 'bold',
      lineHeight: 'shorter',
      mt: 8,
      mb: 4,
      color: isThemeB ? 'brand.600' : 'brand.900',
      _dark: {
        color: isThemeB ? 'brand.400' : 'brand.100',
      },
    },
    h1: {
      fontSize: { base: '2xl', md: '3xl', lg: '4xl' },
    },
    h2: {
      fontSize: { base: 'xl', md: '2xl', lg: '3xl' },
    },
    h3: {
      fontSize: { base: 'lg', md: 'xl', lg: '2xl' },
    },
    h4: {
      fontSize: { base: 'md', md: 'lg', lg: 'xl' },
    },

    // Parágrafos
    p: {
      mb: 6,
      '&:last-child': {
        mb: 0,
      },
    },

    // Links
    a: {
      color: isThemeB ? 'accent.600' : 'brand.700',
      fontWeight: 'medium',
      textDecoration: 'underline',
      textUnderlineOffset: '2px',
      transition: 'all 0.2s',
      _hover: {
        color: isThemeB ? 'brand.600' : 'brand.900',
        textUnderlineOffset: '4px',
      },
      _dark: {
        color: isThemeB ? 'accent.400' : 'brand.300',
        _hover: {
          color: isThemeB ? 'brand.400' : 'brand.100',
        },
      },
    },

    // Listas
    'ul, ol': {
      pl: 6,
      mb: 6,
      '& li': {
        mb: 2,
      },
    },
    ul: {
      listStyleType: isThemeB ? 'square' : 'disc',
    },
    ol: {
      listStyleType: 'decimal',
    },

    // Blockquote
    blockquote: {
      borderLeft: '4px solid',
      borderColor: isThemeB ? 'accent.500' : 'accent.500',
      pl: 6,
      py: 2,
      my: 6,
      fontStyle: 'italic',
      color: 'gray.600',
      bg: isThemeB ? 'accent.50' : 'brand.50',
      borderRadius: 'md',
      _dark: {
        bg: 'gray.800',
        color: 'gray.400',
        borderColor: isThemeB ? 'accent.400' : 'accent.400',
      },
    },

    // Code
    code: {
      bg: 'gray.100',
      color: isThemeB ? 'brand.700' : 'brand.800',
      px: 2,
      py: 1,
      borderRadius: 'md',
      fontSize: '0.875em',
      fontFamily: 'mono',
      _dark: {
        bg: 'gray.800',
        color: isThemeB ? 'brand.300' : 'brand.200',
      },
    },

    pre: {
      bg: 'gray.900',
      color: 'gray.100',
      p: 4,
      borderRadius: 'lg',
      overflowX: 'auto',
      mb: 6,
      fontSize: 'sm',
      '& code': {
        bg: 'transparent',
        color: 'inherit',
        p: 0,
      },
    },

    // Tabelas
    table: {
      width: '100%',
      mb: 6,
      borderCollapse: 'collapse',
    },
    'th, td': {
      textAlign: 'left',
      p: 3,
      borderBottom: '1px solid',
      borderColor: 'gray.200',
      _dark: {
        borderColor: 'gray.700',
      },
    },
    th: {
      fontWeight: 'bold',
      bg: isThemeB ? 'brand.50' : 'gray.50',
      color: isThemeB ? 'brand.700' : 'brand.900',
      _dark: {
        bg: 'gray.800',
        color: isThemeB ? 'brand.300' : 'brand.100',
      },
    },

    // Linha horizontal
    hr: {
      borderColor: 'gray.300',
      my: 8,
      _dark: {
        borderColor: 'gray.700',
      },
    },

    // Imagens
    img: {
      maxWidth: '100%',
      height: 'auto',
      borderRadius: 'lg',
      my: 6,
    },

    // Strong e emphasis
    strong: {
      fontWeight: 'bold',
      color: isThemeB ? 'brand.700' : 'brand.900',
      _dark: {
        color: isThemeB ? 'brand.300' : 'brand.100',
      },
    },
    em: {
      fontStyle: 'italic',
    },

    // Marcação
    mark: {
      bg: isThemeB ? 'secondary.200' : 'accent.200',
      color: 'gray.900',
      px: 1,
      borderRadius: 'sm',
    },
  };

  return (
    <Box sx={proseStyles} {...props}>
      {children}
    </Box>
  );
};

Prose.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Prose;
