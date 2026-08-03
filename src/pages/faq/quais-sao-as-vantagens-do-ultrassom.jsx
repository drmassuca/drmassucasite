import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quais_sao_as_vantagens_do_ultrassom() {
  const title = 'Quais são as vantagens do ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Vantagens do ultrassom: segurança, ausência de radiação, avaliação dinâmica, custo acessível e uso amplo em diagnóstico e procedimentos.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quais-sao-as-vantagens-do-ultrassom',
    url: 'https://www.drmassuca.com.br/faq/quais-sao-as-vantagens-do-ultrassom',
    name: 'Quais são as vantagens do ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais são as vantagens do ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É seguro, sem radiação, dinâmico, acessível e portátil. Permite diagnóstico em tempo real e guiar procedimentos com precisão.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quais sao as vantagens do ultrassom?"
        description="É seguro, sem radiação, dinâmico, acessível e portátil. Permite diagnóstico em tempo real e guiar procedimentos com precisão."
        canonical="https://drmassuca.com.br/faq/quais-sao-as-vantagens-do-ultrassom"
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
          Quais são as vantagens do ultrassom?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          É seguro, sem radiação, dinâmico, acessível e portátil. Permite diagnóstico em tempo real
          e guiar procedimentos com precisão.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Destaques
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Point-of-care, repetibilidade, acompanhamento sem risco cumulativo.
              </ListItem>
              <ListItem>Integração com Doppler para estudo funcional.</ListItem>
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
                  to={`/faq/quais-sao-os-riscos-da-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quais são os riscos da ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/ultrassom-mais-completo`}
                  textDecoration="underline"
                >
                  Qual o ultrassom mais completo?
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
