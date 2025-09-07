import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quais_doencas_o_ultrassom_detecta() {
  const title = 'Quais doenças o ultrassom detecta? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Exemplos de doenças detectáveis no ultrassom: cistos, nódulos, inflamações, cálculos, tromboses, dilatações e achados da gestação, conforme a região estudada.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quais-doencas-o-ultrassom-detecta',
    url: 'https://www.drmassuca.com.br/faq/quais-doencas-o-ultrassom-detecta',
    name: 'Quais doenças o ultrassom detecta?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais doenças o ultrassom detecta?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Depende da região. O ultrassom identifica cistos, nódulos, inflamações, cálculos, coleções, alterações vasculares (Doppler) e achados obstétricos relevantes. Muitas vezes é o exame inicial.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quais doencas o ultrassom detecta?"
        description="Depende da região. O ultrassom identifica cistos, nódulos, inflamações, cálculos, coleções, alterações vasculares (Doppler) e achados obstétricos relevantes...."
        canonical="https://drmassuca.com.br/faq/quais-doencas-o-ultrassom-detecta"
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
          Quais doenças o ultrassom detecta?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Depende da região. O ultrassom identifica cistos, nódulos, inflamações, cálculos,
          coleções, alterações vasculares (Doppler) e achados obstétricos relevantes. Muitas vezes é
          o exame inicial.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Exemplos por área
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Hepatobiliar: esteatose, hepatites, colelitíase/colecistite, dilatação biliar.
              </ListItem>
              <ListItem>Urinário: nefrolitíase, hidronefrose, cistos/tumores renais.</ListItem>
              <ListItem>Pélvico ginecológico: miomas, cistos ovarianos, DIP.</ListItem>
              <ListItem>Tireoide/Mamas: nódulos e padrões suspeitos que orientam biópsia.</ListItem>
              <ListItem>Vascular (Doppler): trombose venosa, estenose, aneurisma.</ListItem>
              <ListItem>
                Obstétrico: vitalidade, número de fetos, biometria, morfologia por idade
                gestacional.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Limitações
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Lesões muito pequenas/profundas podem exigir TC/RM ou complementos.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-o-ultrassom-avalia`}
                  textDecoration="underline"
                >
                  O que o ultrassom avalia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-o-ultrassom-abdominal-total-detecta`}
                  textDecoration="underline"
                >
                  O que o ultrassom abdominal total detecta?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-ultrassom-e-100-confiavel`}
                  textDecoration="underline"
                >
                  O ultrassom é 100% confiável?
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
