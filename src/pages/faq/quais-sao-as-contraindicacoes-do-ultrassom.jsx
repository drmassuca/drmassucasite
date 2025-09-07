import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quais_sao_as_contraindicacoes_do_ultrassom() {
  const title = 'Quais são as contraindicações do ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Não há contraindicações absolutas para o ultrassom diagnóstico; situações locais podem limitar o exame e exigir adaptações.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quais-sao-as-contraindicacoes-do-ultrassom',
    url: 'https://www.drmassuca.com.br/faq/quais-sao-as-contraindicacoes-do-ultrassom',
    name: 'Quais são as contraindicações do ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais são as contraindicações do ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não há contraindicações absolutas para o ultrassom diagnóstico. Situações locais (feridas, dor intensa) podem limitar ou exigir adaptação técnica.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quais sao as contraindicacoes do ultrassom?"
        description="Não há contraindicações absolutas para o ultrassom diagnóstico. Situações locais (feridas, dor intensa) podem limitar ou exigir adaptação técnica."
        canonical="https://drmassuca.com.br/faq/quais-sao-as-contraindicacoes-do-ultrassom"
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
          Quais são as contraindicações do ultrassom?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Não há contraindicações absolutas para o ultrassom diagnóstico. Situações locais (feridas,
          dor intensa) podem limitar ou exigir adaptação técnica.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Exemplos práticos
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Feridas, curativos, dor à compressão, gases excessivos; alternativa: outro
                acesso/posição ou exame complementar.
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
                  to={`/faq/qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos`}
                  textDecoration="underline"
                >
                  Qual o tipo de ultrassom que vê todos os órgãos?
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
