import { Box, Heading, Text, Stack, List, ListItem, Link as CLink, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import Seo from '../../components/SEO';
import { FaWhatsapp } from 'react-icons/fa';

import SEO from '../../components/SEO';
export default function Faq_qual_e_a_funcao_do_ultrassom() {
  const title = 'Qual é a função do ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Entenda a função do ultrassom: exame por ondas sonoras que cria imagens em tempo real para diagnóstico, acompanhamento de gestação e guiar procedimentos, sem radiação ionizante.';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-e-a-funcao-do-ultrassom',
    url: 'https://www.drmassuca.com.br/faq/qual-e-a-funcao-do-ultrassom',
    name: 'Qual é a função do ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual é a função do ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ultrassom usa ondas sonoras para formar imagens em tempo real de órgãos e vasos. Serve para diagnóstico, monitoramento (gestação, doenças) e guiar procedimentos, sem radiação ionizante.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual e a funcao do ultrassom?"
        description="O ultrassom usa ondas sonoras para formar imagens em tempo real de órgãos e vasos. Serve para diagnóstico, monitoramento (gestação, doenças) e guiar procedim..."
        canonical="https://drmassuca.com.br/faq/qual-e-a-funcao-do-ultrassom"
      />
      <Seo title={title} description={description} jsonLd={jsonLd} />

      <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
        <Heading
          as="h1"
          size="lg"
          mb={4}
          color="green.700"
          textShadow="1px 1px 1px rgba(0,0,0,0.4)"
        >
          Qual é a função do ultrassom?
        </Heading>

        <Text fontWeight="medium" mb={6} color="gray.700">
          O ultrassom usa ondas sonoras para formar imagens em tempo real de órgãos e vasos. Serve
          para diagnóstico, monitoramento (gestação, doenças) e guiar procedimentos, sem radiação
          ionizante.
        </Text>

        <Stack spacing={6} color="gray.700">
          <Stack spacing={2}>
            <Heading as="h2" size="md" color="green.700">
              Quando é indicado / O que mostra
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Avaliação de abdome, pelve, tireoide, mamas, articulações, vasos (Doppler) e
                gestação.
              </ListItem>
              <ListItem>
                Detecta massas, cistos, inflamações, cálculos, alterações vasculares e acompanha
                evolução clínica.
              </ListItem>
            </List>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h2" size="md" color="green.700">
              Como é feito / Preparo
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Transdutor com gel na pele; em algumas situações, bexiga cheia ou jejum (conforme o
                órgão).
              </ListItem>
              <ListItem>Duração típica: 10–30 minutos.</ListItem>
            </List>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h2" size="md" color="green.700">
              Duração e resultado
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Imagens e medidas obtidas na hora; laudo geralmente no mesmo dia, a critério do
                serviço.
              </ListItem>
            </List>
          </Stack>

          <Stack spacing={2}>
            <Heading as="h2" size="md" color="green.700">
              Vantagens e limitações
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Vantagens: seguro, sem radiação, dinâmico, custo acessível.</ListItem>
              <ListItem>
                Limitações: dependente do operador/biotipo; pode exigir exames complementares.
              </ListItem>
            </List>
          </Stack>

          {/* Links relacionados */}
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List pl={6} spacing={1}>
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
                  to={`/faq/quais-sao-os-riscos-da-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quais são os riscos da ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/modos-ultrassom-b-m-doppler`}
                  textDecoration="underline"
                >
                  Modos do ultrassom B, M e Doppler
                </CLink>
              </ListItem>
            </List>
          </Stack>

          {/* Botão pequeno de voltar ao FAQ */}
          <Button as={RouterLink} to="/faq" size="sm" variant="ghost" mt={2}>
            ← Voltar ao FAQ
          </Button>

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
        </Stack>
      </Box>
    </Box>
  );
}
