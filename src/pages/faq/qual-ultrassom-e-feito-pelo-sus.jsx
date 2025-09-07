import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_ultrassom_e_feito_pelo_sus() {
  const title = 'Qual ultrassom é feito pelo SUS? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Entenda como o SUS oferta ultrassonografias: depende da indicação clínica e regulação local, com prioridade para exames com impacto assistencial.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-ultrassom-e-feito-pelo-sus',
    url: 'https://www.drmassuca.com.br/faq/qual-ultrassom-e-feito-pelo-sus',
    name: 'Qual ultrassom é feito pelo SUS?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual ultrassom é feito pelo SUS?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O SUS oferta diversos ultrassons (abdome, pélvico, obstétrico, tireoide, mamas, vascular/Doppler, partes moles), conforme indicação clínica e fila/regulação da sua cidade. É preciso pedido médico.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual ultrassom e feito pelo sus?"
        description="O SUS oferta diversos ultrassons (abdome, pélvico, obstétrico, tireoide, mamas, vascular/Doppler, partes moles), conforme indicação clínica e fila/regulação..."
        canonical="https://drmassuca.com.br/faq/qual-ultrassom-e-feito-pelo-sus"
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
          Qual ultrassom é feito pelo SUS?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          O SUS oferta diversos ultrassons (abdome, pélvico, obstétrico, tireoide, mamas,
          vascular/Doppler, partes moles), conforme indicação clínica e fila/regulação da sua
          cidade. É preciso pedido médico.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Como funciona
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Pedido médico na atenção básica ou especializada.</ListItem>
              <ListItem>
                Regulação/agenda define prioridade (gestantes, urgências, risco clínico).
              </ListItem>
              <ListItem>A carteira de exames varia por município/contratos.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/e-possivel-fazer-ultrassom-sem-pedido-medico`}
                  textDecoration="underline"
                >
                  É possível fazer um ultrassom sem pedido médico?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quando-fazer-a-primeira-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quando fazer a primeira ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-ultrassom-e-mais-caro`}
                  textDecoration="underline"
                >
                  Qual ultrassom é mais caro?
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
