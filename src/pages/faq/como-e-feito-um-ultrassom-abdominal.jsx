import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';

export default function FaqComoEFeitoUltrassomAbdominal() {
  /* SEO base */
  const canonical = '/faq/como-e-feito-um-ultrassom-abdominal';
  const title = 'Como é feito um ultrassom abdominal? – FAQ | Dr. Massuca';
  const description =
    'FAQ – Entenda passo a passo como é feito o ultrassom abdominal em Itaberaí-GO com o Dr. Massuca.';

  /* JSON-LD individual (Question/Answer) */
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `https://drmassuca.com.br${canonical}`,
    url: `https://drmassuca.com.br${canonical}`,
    name: 'Como é feito um ultrassom abdominal?',
    mainEntity: {
      '@type': 'Question',
      name: 'Como é feito um ultrassom abdominal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O médico desliza um transdutor com gel sobre o abdome para visualizar fígado, vesícula, pâncreas, rins, baço e grandes vasos. Costuma-se pedir jejum e, em alguns casos, bexiga cheia.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <>
      <SEO
        title="Como e feito um ultrassom abdominal?"
        description="O médico desliza um transdutor com gel sobre o abdome para visualizar fígado, vesícula, pâncreas, rins, baço e vasos. Geralmente pede-se jejum e, em alguns c..."
        canonical="https://drmassuca.com.br/faq/como-e-feito-um-ultrassom-abdominal"
      />
      <SEO title={title} description={description} canonical={canonical} />

      {/* Schema JSON-LD */}
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            size="lg"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            Como é feito um ultrassom abdominal?
          </Heading>

          <Text fontWeight="medium" mb={6}>
            O médico desliza um transdutor com gel sobre o abdome para visualizar fígado, vesícula,
            pâncreas, rins, baço e vasos. Geralmente pede-se jejum e, em alguns casos, bexiga cheia.
          </Text>

          <Stack spacing={6}>
            {/* Passo a passo */}
            <Stack spacing={2}>
              <Heading as="h2" size="md">
                Passo a passo
              </Heading>
              <List styleType="disc" pl={6}>
                <ListItem>
                  Checagem do preparo → exame em decúbito → imagens e medidas → laudo.
                </ListItem>
              </List>
            </Stack>

            {/* Links relacionados */}
            <Stack spacing={2}>
              <Text fontWeight="semibold">Veja também:</Text>
              <List styleType="disc" pl={6}>
                <ListItem>
                  <CLink
                    as={RouterLink}
                    to="/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total"
                    textDecoration="underline"
                  >
                    Qual o preparo para fazer ultrassonografia abdominal total?
                  </CLink>
                </ListItem>
                <ListItem>
                  <CLink
                    as={RouterLink}
                    to="/faq/o-que-o-ultrassom-abdominal-total-detecta"
                    textDecoration="underline"
                  >
                    O que o ultrassom abdominal total detecta?
                  </CLink>
                </ListItem>
                <ListItem>
                  <CLink
                    as={RouterLink}
                    to="/faq/precisa-de-jejum-para-fazer-ultrassonografia"
                    textDecoration="underline"
                  >
                    Precisa de jejum para fazer ultrassonografia?
                  </CLink>
                </ListItem>
              </List>
            </Stack>

            {/* Voltar */}
            <Button as={RouterLink} to="/faq" size="sm" variant="ghost" mt={2}>
              ← Voltar ao FAQ
            </Button>
          </Stack>

          {/* Botão WhatsApp */}
          <Box textAlign="center" mt={6}>
            <Button
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              bg="green.700"
              color="white"
              _hover={{ bg: 'green.800' }}
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 4 }}
              fontSize={{ base: 'sm', md: 'md' }}
              borderRadius="lg"
              minW={{ base: '220px', md: 'auto' }}
            >
              Falar com a clínica pelo WhatsApp
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
