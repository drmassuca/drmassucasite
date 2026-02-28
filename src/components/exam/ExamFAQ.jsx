import { Helmet } from 'react-helmet-async';
import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
} from '@chakra-ui/react';
import { examFAQs } from './examData';

/**
 * FAQ inline com accordion + schema FAQPage.
 * @param {{ slug: string }} props
 */
export default function ExamFAQ({ slug }) {
  const faqs = examFAQs[slug];
  if (!faqs || faqs.length === 0) return null;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <Box mt={8}>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Heading as="h2" fontSize="2xl" mb={4}>
        Perguntas frequentes
      </Heading>

      <Accordion allowMultiple>
        {faqs.map(({ q, a }, idx) => (
          <AccordionItem
            key={idx}
            border="1px solid"
            borderColor="gray.200"
            borderRadius="md"
            mb={2}
          >
            <h3>
              <AccordionButton
                py={3}
                px={4}
                _expanded={{ bg: 'green.50', fontWeight: 'bold' }}
                _hover={{ bg: 'gray.50' }}
                borderRadius="md"
              >
                <Box flex="1" textAlign="left" fontSize="lg" fontWeight="semibold">
                  {q}
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h3>
            <AccordionPanel pb={4} px={4}>
              <Text fontSize="md" color="gray.700">
                {a}
              </Text>
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </Box>
  );
}
