import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_a_ultrassonografia_identifica() {
  const title = 'O que a ultrassonografia identifica? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Saiba o que a ultrassonografia pode identificar: cistos, nódulos, inflamações, cálculos, coleções e alterações de fluxo sanguíneo com Doppler.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-que-a-ultrassonografia-identifica',
    url: 'https://www.drmassuca.com.br/faq/o-que-a-ultrassonografia-identifica',
    name: 'O que a ultrassonografia identifica?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que a ultrassonografia identifica?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Identifica cistos, nódulos, inflamações, cálculos, coleções, alterações de tamanho e textura dos órgãos e fluxo sanguíneo com Doppler; também acompanha gestação e guia procedimentos.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que a ultrassonografia identifica?"
        description="Identifica cistos, nódulos, inflamações, cálculos, coleções, alterações de tamanho e textura dos órgãos e fluxo sanguíneo com Doppler; também acompanha gesta..."
        canonical="https://drmassuca.com.br/faq/o-que-a-ultrassonografia-identifica"
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
          O que a ultrassonografia identifica?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Identifica cistos, nódulos, inflamações, cálculos, coleções, alterações de tamanho e
          textura dos órgãos e fluxo sanguíneo com Doppler; também acompanha gestação e guia
          procedimentos.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Exemplos práticos
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Fígado (esteatose, massas), vesícula (cálculos), rins (litíase, hidronefrose), pelve
                (miomas, cistos), mamas/tireoide (nódulos), vascular (trombose/estenose).
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-doencas-o-ultrassom-detecta`}
                  textDecoration="underline"
                >
                  Quais doenças o ultrassom detecta?
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
                  to={`/faq/o-que-o-ultrassom-avalia`}
                  textDecoration="underline"
                >
                  O que o ultrassom avalia?
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
