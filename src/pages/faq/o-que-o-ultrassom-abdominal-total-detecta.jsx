import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_o_ultrassom_abdominal_total_detecta() {
  const title = 'O que o ultrassom abdominal total detecta? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Veja o que o ultrassom abdominal total pode detectar: fígado, vesícula, vias biliares, pâncreas, baço, rins, bexiga e aorta, entre outros.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-que-o-ultrassom-abdominal-total-detecta',
    url: 'https://www.drmassuca.com.br/faq/o-que-o-ultrassom-abdominal-total-detecta',
    name: 'O que o ultrassom abdominal total detecta?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que o ultrassom abdominal total detecta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avalia fígado, vesícula e vias biliares, pâncreas, baço, rins, aorta e bexiga (varia por serviço). Detecta cálculos, inflamações, dilatações, massas e alterações difusas (ex.: esteatose).',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que o ultrassom abdominal total detecta?"
        description="Avalia fígado, vesícula e vias biliares, pâncreas, baço, rins, aorta e bexiga (varia por serviço). Detecta cálculos, inflamações, dilatações, massas e altera..."
        canonical="https://drmassuca.com.br/faq/o-que-o-ultrassom-abdominal-total-detecta"
      />
      <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
        <Seo title={title} description={description} jsonLd={jsonLd} />
        <Heading
          as="h1"
          size="lg"
          mb={4}
          color="green.700"
          textShadow="1px 1px 1px rgba(0,0,0,0.4)"
        >
          O que o ultrassom abdominal total detecta?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Avalia fígado, vesícula e vias biliares, pâncreas, baço, rins, aorta e bexiga (varia por
          serviço). Detecta cálculos, inflamações, dilatações, massas e alterações difusas (ex.:
          esteatose).
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Exemplos
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Hepatobiliar: colelitíase, colecistite, dilatação de via biliar.</ListItem>
              <ListItem>Rins/urinário: litíase, hidronefrose, cistos/tumores.</ListItem>
              <ListItem>Aorta: ectasias/aneurisma.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total`}
                  textDecoration="underline"
                >
                  Qual o preparo para fazer ultrassonografia abdominal total?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/precisa-de-jejum-para-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Precisa de jejum para fazer ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos`}
                  textDecoration="underline"
                >
                  Qual o tipo de ultrassom que vê todos os órgãos?
                </CLink>
              </ListItem>
            </List>
          </Stack>
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
  );
}
