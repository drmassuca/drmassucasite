import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quantos_dias_vale_um_ultrassom() {
  const title = 'Quantos dias vale um ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'O laudo não tem “validade legal” universal; a utilidade clínica depende do objetivo (pré-operatório, gestação, dor aguda) e de exigências de convênios.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quantos-dias-vale-um-ultrassom',
    url: 'https://www.drmassuca.com.br/faq/quantos-dias-vale-um-ultrassom',
    name: 'Quantos dias vale um ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quantos dias vale um ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não há validade única. A “validade” prática depende do objetivo clínico (ex.: pré-operatório, gestação, dor aguda) e de exigências de convênios/solicitações.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quantos dias vale um ultrassom?"
        description="Não há validade única. A “validade” prática depende do objetivo clínico (ex.: pré-operatório, gestação, dor aguda) e de exigências de convênios/solicitações."
        canonical="https://drmassuca.com.br/faq/quantos-dias-vale-um-ultrassom"
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
          Quantos dias vale um ultrassom?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Não há validade única. A “validade” prática depende do objetivo clínico (ex.:
          pré-operatório, gestação, dor aguda) e de exigências de convênios/solicitações.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Exemplos
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Pré-operatório: serviços costumam aceitar exames recentes (dias a poucas semanas).
              </ListItem>
              <ListItem>
                Gestação: mudanças são rápidas; laudos “envelhecem” em dias/semanas.
              </ListItem>
              <ListItem>Crônicos: podem valer por mais tempo, se estáveis.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-resultado-da-ultrassonografia-sai-na-hora-3`}
                  textDecoration="underline"
                >
                  O resultado da ultrassonografia sai na hora?
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
                  to={`/faq/qual-ultrassom-indica-gravidez`}
                  textDecoration="underline"
                >
                  Qual ultrassom indica gravidez?
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
