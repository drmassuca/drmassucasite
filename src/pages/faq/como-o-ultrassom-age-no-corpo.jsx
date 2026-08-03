import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_como_o_ultrassom_age_no_corpo() {
  const title = 'Como o ultrassom age no corpo? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'O ultrassom diagnóstico usa ondas sonoras refletidas pelos tecidos para formar imagens; não utiliza radiação ionizante.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/como-o-ultrassom-age-no-corpo',
    url: 'https://www.drmassuca.com.br/faq/como-o-ultrassom-age-no-corpo',
    name: 'Como o ultrassom age no corpo?',
    mainEntity: {
      '@type': 'Question',
      name: 'Como o ultrassom age no corpo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Emite ondas sonoras pelo transdutor; parte é refletida pelos tecidos e captada de volta, formando imagens em tempo real. Não usa radiação ionizante.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Como o ultrassom age no corpo?"
        description="Emite ondas sonoras pelo transdutor; parte é refletida pelos tecidos e captada de volta, formando imagens em tempo real. Não usa radiação ionizante."
        canonical="https://drmassuca.com.br/faq/como-o-ultrassom-age-no-corpo"
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
          Como o ultrassom age no corpo?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Emite ondas sonoras pelo transdutor; parte é refletida pelos tecidos e captada de volta,
          formando imagens em tempo real. Não usa radiação ionizante.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Pontos-chave
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Frequências altas (ultra-som) e baixa energia no modo diagnóstico.
              </ListItem>
              <ListItem>
                Ajustes técnicos (ganho, foco, frequência) otimizam a visualização.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
                  to={`/faq/quais-sao-as-vantagens-do-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são as vantagens do ultrassom?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/modos-ultrassom-b-m-doppler`}
                  textDecoration="underline"
                >
                  Quais são os modos do ultrassom?
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
