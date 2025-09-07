// components/ui/PageHeader.jsx
// Cabeçalho de página com breadcrumb e animações

import { Box, Heading, Text, Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

const PageHeader = ({
  title,
  subtitle,
  breadcrumbs = [],
  variant = 'default',
  animated = true,
}) => {
  const animationProps = animated
    ? {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: 'easeOut' },
      }
    : {};

  const getBgByVariant = () => {
    switch (variant) {
      case 'hero':
        return 'linear(to-r, brand.900, brand.700)';
      case 'gradient':
        return 'linear(135deg, brand.50, accent.50)';
      case 'dark':
        return 'gray.900';
      default:
        return 'white';
    }
  };

  const getColorByVariant = () => {
    switch (variant) {
      case 'hero':
      case 'dark':
        return 'white';
      default:
        return 'gray.800';
    }
  };

  return (
    <MotionBox
      bg={getBgByVariant()}
      color={getColorByVariant()}
      py={{ base: 12, md: 16 }}
      px={{ base: 4, md: 6, lg: 8 }}
      position="relative"
      overflow="hidden"
      {...animationProps}
    >
      {/* Elemento decorativo de fundo */}
      {variant === 'hero' && (
        <Box
          position="absolute"
          top="-50%"
          right="-10%"
          width="50%"
          height="200%"
          bg="whiteAlpha.100"
          transform="rotate(15deg)"
          borderRadius="full"
        />
      )}

      <Box maxW="container.xl" mx="auto" position="relative">
        {/* Breadcrumb */}
        {breadcrumbs.length > 0 && (
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color={getColorByVariant()} />}
            mb={4}
            fontSize="sm"
            opacity={0.8}
          >
            <BreadcrumbItem>
              <BreadcrumbLink as={RouterLink} to="/">
                Início
              </BreadcrumbLink>
            </BreadcrumbItem>
            {breadcrumbs.map((crumb, index) => (
              <BreadcrumbItem key={index} isCurrentPage={index === breadcrumbs.length - 1}>
                <BreadcrumbLink as={crumb.href ? RouterLink : 'span'} to={crumb.href}>
                  {crumb.label}
                </BreadcrumbLink>
              </BreadcrumbItem>
            ))}
          </Breadcrumb>
        )}

        {/* Título */}
        <MotionHeading
          as="h1"
          size="2xl"
          mb={subtitle ? 4 : 0}
          fontWeight="bold"
          initial={animated ? { opacity: 0, x: -20 } : {}}
          animate={animated ? { opacity: 1, x: 0 } : {}}
          transition={animated ? { delay: 0.2, duration: 0.6 } : {}}
        >
          {title}
        </MotionHeading>

        {/* Subtítulo */}
        {subtitle && (
          <Text
            fontSize="lg"
            opacity={0.9}
            maxW="2xl"
            initial={animated ? { opacity: 0 } : {}}
            animate={animated ? { opacity: 1 } : {}}
            transition={animated ? { delay: 0.4, duration: 0.6 } : {}}
          >
            {subtitle}
          </Text>
        )}
      </Box>
    </MotionBox>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  breadcrumbs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      href: PropTypes.string,
    })
  ),
  variant: PropTypes.oneOf(['default', 'hero', 'gradient', 'dark']),
  animated: PropTypes.bool,
};

export default PageHeader;
