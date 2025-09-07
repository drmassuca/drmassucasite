import {
  Box,
  Heading,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { FAQ_ITEMS } from './data';

export default function FaqIndex() {
  const canonical = 'https://drmassuca.com.br/faq';

  const title = 'FAQ – Dúvidas Frequentes sobre Ultrassom | Dr. Massuca';
  const description =
    'FAQ sobre exames de ultrassom em Itaberaí-GO – respostas rápidas do Dr. Massuca.';

  // Agrupar itens por seção
  const sections = Array.from(new Set(FAQ_ITEMS.map(item => item.section)));
  const itemsBySection = sections.map(sec => ({
    section: sec,
    items: FAQ_ITEMS.filter(i => i.section === sec),
  }));

  // Schema FAQPage completo
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'FAQ – Dúvidas Frequentes sobre Ultrassom',
    url: canonical,
    mainEntity: FAQ_ITEMS.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.answer || q.shortAnswer,
      },
    })),
  };

  return (
    <>
      <SEO
        title="FAQ – Perguntas Frequentes"
        description="{item.shortAnswer}"
        canonical="https://drmassuca.com.br/faq"
      />
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image="https://drmassuca.com.br/icons/icon-512.png"
      />

      {/* Schema FAQPage */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            size="lg"
            mb={6}
            textAlign="center"
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            FAQ – Dúvidas Frequentes
          </Heading>

          {itemsBySection.map(({ section, items }) => (
            <Box key={section} mb={8}>
              <Heading
                as="h2"
                size="md"
                mb={4}
                color="green.700"
                textShadow="1px 1px 1px rgba(0,0,0,0.4)"
                borderBottom="1px solid"
                borderColor="green.200"
                pb={2}
              >
                {section}
              </Heading>

              <Accordion allowToggle>
                {items.map(item => (
                  <AccordionItem key={item.slug} border="none" mb={2}>
                    <h3>
                      <AccordionButton
                        _expanded={{ bg: 'green.50', color: 'green.800' }}
                        px={4}
                        py={3}
                        borderRadius="md"
                        fontSize={{ base: 'md', md: 'lg' }}
                        fontWeight="medium"
                        textAlign="left"
                        boxShadow="sm"
                        _hover={{
                          bg: 'green.100',
                          transform: 'translateY(-2px)',
                          boxShadow: 'md',
                        }}
                        transition="all 0.2s"
                      >
                        <Box flex="1" textAlign="left">
                          {item.question}
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h3>

                    <AccordionPanel pb={4} fontSize="sm" color="gray.700">
                      <Text mb={3}>{item.shortAnswer}</Text>
                      <Button
                        as={RouterLink}
                        to={`/faq/${item.slug}`}
                        size="sm"
                        bg="green.700"
                        color="white"
                        _hover={{ bg: 'green.800' }}
                        borderRadius="md"
                      >
                        Saiba mais
                      </Button>
                    </AccordionPanel>
                  </AccordionItem>
                ))}
              </Accordion>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
