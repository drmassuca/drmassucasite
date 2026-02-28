import { Helmet } from 'react-helmet-async';
import { Box, Text, Link } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { breadcrumbLabels } from './examData';

/**
 * Breadcrumb com schema BreadcrumbList.
 * @param {{ slug: string }} props
 */
export default function ExamBreadcrumb({ slug }) {
  const label = breadcrumbLabels[slug] || slug;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Início', item: 'https://drmassuca.com.br/' },
      { '@type': 'ListItem', position: 2, name: 'Exames', item: 'https://drmassuca.com.br/exames' },
      {
        '@type': 'ListItem',
        position: 3,
        name: label,
        item: `https://drmassuca.com.br/exames/${slug}`,
      },
    ],
  };

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <Box mb={6} fontSize="sm" color="gray.500">
        <Link as={RouterLink} to="/" _hover={{ color: 'green.600' }}>
          Início
        </Link>
        <Text as="span" mx={2}>
          ›
        </Text>
        <Link as={RouterLink} to="/exames" _hover={{ color: 'green.600' }}>
          Exames
        </Link>
        <Text as="span" mx={2}>
          ›
        </Text>
        <Text as="span" color="green.700" fontWeight="semibold">
          {label}
        </Text>
      </Box>
    </>
  );
}
