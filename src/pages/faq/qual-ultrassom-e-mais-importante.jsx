import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_ultrassom_e_mais_importante() {
  const title = 'Qual ultrassom é mais importante? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Não existe um ultrassom “mais importante” universalmente; a prioridade depende da queixa, do órgão-alvo e do momento clínico.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-ultrassom-e-mais-importante',
    url: 'https://www.drmassuca.com.br/faq/qual-ultrassom-e-mais-importante',
    name: 'Qual ultrassom é mais importante?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual ultrassom é mais importante?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não há “o mais importante” para todos. Importância depende da indicação clínica (ex.: obstétrico morfológico em janela certa; doppler em suspeita vascular; abdome total em dor abdominal).',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual ultrassom e mais importante?"
        description="Não há “o mais importante” para todos. Importância depende da indicação clínica (ex.: obstétrico morfológico em janela certa; doppler em suspeita vascular; a..."
        canonical="https://drmassuca.com.br/faq/qual-ultrassom-e-mais-importante"
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
          Qual ultrassom é mais importante?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Não há “o mais importante” para todos. Importância depende da indicação clínica (ex.:
          obstétrico morfológico em janela certa; doppler em suspeita vascular; abdome total em dor
          abdominal).
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Critérios de prioridade
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Sintoma-alvo, janela diagnóstica e impacto terapêutico.</ListItem>
              <ListItem>Discussão com o médico direciona o melhor exame.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/ultrassom-mais-completo`}
                  textDecoration="underline"
                >
                  Qual o ultrassom mais completo?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-ultrassom-indica-gravidez`}
                  textDecoration="underline"
                >
                  Qual ultrassom indica gravidez?
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
