import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quais_sao_os_riscos_da_ultrassonografia() {
  const title = 'Quais são os riscos da ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Ultrassonografia diagnóstica é considerada segura; não usa radiação ionizante. Riscos são mínimos quando realizada por profissional treinado.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quais-sao-os-riscos-da-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/quais-sao-os-riscos-da-ultrassonografia',
    name: 'Quais são os riscos da ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais são os riscos da ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A ultrassonografia não usa radiação ionizante e é considerada segura em níveis diagnósticos. Riscos são mínimos quando feita por profissional habilitado.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quais sao os riscos da ultrassonografia?"
        description="A ultrassonografia não usa radiação ionizante e é considerada segura em níveis diagnósticos. Riscos são mínimos quando feita por profissional habilitado."
        canonical="https://drmassuca.com.br/faq/quais-sao-os-riscos-da-ultrassonografia"
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
          Quais são os riscos da ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          A ultrassonografia não usa radiação ionizante e é considerada segura em níveis
          diagnósticos. Riscos são mínimos quando feita por profissional habilitado.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Segurança
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Décadas de uso clínico; parâmetros conservadores; monitoramento de potência/tempo de
                exposição.
              </ListItem>
              <ListItem>
                Possíveis desconfortos: pressão do transdutor, gel frio; raramente alergia ao gel.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-as-contraindicacoes-do-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são as contraindicações do ultrassom?
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
