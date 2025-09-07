// components/ui/Card.jsx
// Card reutilizável com variantes para temas A e B

import { Box, useTheme } from '@chakra-ui/react';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const Card = ({
  children,
  variant = 'default',
  hoverable = true,
  animated = false,
  delay = 0,
  ...props
}) => {
  const theme = useTheme();
  const isThemeB = theme.name === 'Vibrante Indígena';

  const getVariantStyles = () => {
    if (isThemeB) {
      // Estilos para Tema B
      switch (variant) {
        case 'neo':
          return {
            bg: 'gray.50',
            boxShadow: '20px 20px 60px #d1d1d1, -20px -20px 60px #ffffff',
            _hover: hoverable
              ? {
                  boxShadow: '25px 25px 75px #d1d1d1, -25px -25px 75px #ffffff',
                  transform: 'translateY(-5px)',
                }
              : {},
            _dark: {
              bg: 'gray.900',
              boxShadow: '20px 20px 60px #0d0d0d, -20px -20px 60px #2b2b2b',
            },
          };
        case 'glass':
          return {
            bg: 'rgba(255, 255, 255, 0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid',
            borderColor: 'rgba(255, 255, 255, 0.3)',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.15)',
            _hover: hoverable
              ? {
                  bg: 'rgba(255, 255, 255, 0.8)',
                  transform: 'translateY(-5px) rotate(-1deg)',
                }
              : {},
            _dark: {
              bg: 'rgba(0, 0, 0, 0.7)',
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
          };
        case 'gradient':
          return {
            bgGradient: 'linear(135deg, brand.50, accent.50)',
            border: 'none',
            _hover: hoverable
              ? {
                  bgGradient: 'linear(135deg, brand.100, accent.100)',
                  transform: 'translateY(-8px) rotate(-2deg)',
                }
              : {},
          };
        default:
          return {
            bg: 'white',
            borderRadius: '2xl',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
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
            _hover: hoverable
              ? {
                  transform: 'translateY(-8px) rotate(-1deg)',
                  boxShadow: '0 30px 60px -15px rgba(0, 0, 0, 0.2)',
                }
              : {},
            _dark: {
              bg: 'gray.800',
            },
          };
      }
    } else {
      // Estilos para Tema A
      switch (variant) {
        case 'elevated':
          return {
            boxShadow: 'xl',
            border: 'none',
            _hover: hoverable
              ? {
                  boxShadow: '2xl',
                  transform: 'translateY(-4px)',
                }
              : {},
          };
        case 'outline':
          return {
            boxShadow: 'none',
            border: '2px solid',
            borderColor: 'brand.200',
            _hover: hoverable
              ? {
                  borderColor: 'brand.400',
                  transform: 'translateY(-2px)',
                }
              : {},
          };
        case 'filled':
          return {
            bg: 'brand.50',
            border: 'none',
            _hover: hoverable
              ? {
                  bg: 'brand.100',
                  transform: 'translateY(-2px)',
                }
              : {},
          };
        default:
          return {
            bg: 'white',
            borderRadius: 'lg',
            border: '1px solid',
            borderColor: 'gray.200',
            boxShadow: 'sm',
            _hover: hoverable
              ? {
                  boxShadow: 'lg',
                  transform: 'translateY(-4px)',
                }
              : {},
            _dark: {
              bg: 'gray.800',
              borderColor: 'gray.700',
            },
          };
      }
    }
  };

  const baseStyles = {
    p: 6,
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    ...getVariantStyles(),
  };

  if (animated) {
    return (
      <MotionBox
        {...baseStyles}
        {...props}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay, duration: 0.5 }}
      >
        {children}
      </MotionBox>
    );
  }

  return (
    <Box {...baseStyles} {...props}>
      {children}
    </Box>
  );
};

Card.propTypes = {
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf([
    'default',
    'elevated',
    'outline',
    'filled',
    'neo',
    'glass',
    'gradient',
  ]),
  hoverable: PropTypes.bool,
  animated: PropTypes.bool,
  delay: PropTypes.number,
};

export default Card;
