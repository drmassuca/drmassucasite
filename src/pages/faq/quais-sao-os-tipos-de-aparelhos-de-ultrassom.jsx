import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quais_sao_os_tipos_de_aparelhos_de_ultrassom() {
  const title = 'Quais são os tipos de aparelhos de ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Conheça categorias de aparelhos de ultrassom: portáteis, de console e de alta performance, além dos principais transdutores utilizados.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quais-sao-os-tipos-de-aparelhos-de-ultrassom',
    url: 'https://www.drmassuca.com.br/faq/quais-sao-os-tipos-de-aparelhos-de-ultrassom',
    name: 'Quais são os tipos de aparelhos de ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais são os tipos de aparelhos de ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Há portáteis, de console e alta performance; a escolha depende do uso (leito, clínica, pesquisa). Transdutores comuns: convexo, linear, setorial e endocavitário.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quais sao os tipos de aparelhos de ultrassom?"
        description="Há portáteis, de console e alta performance; a escolha depende do uso (leito, clínica, pesquisa). Transdutores comuns: convexo, linear, setorial e endocavitá..."
        canonical="https://drmassuca.com.br/faq/quais-sao-os-tipos-de-aparelhos-de-ultrassom"
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
          Quais são os tipos de aparelhos de ultrassom?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Há portáteis, de console e alta performance; a escolha depende do uso (leito, clínica,
          pesquisa). Transdutores comuns: convexo, linear, setorial e endocavitário.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Resumo
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Portátil: mobilidade e ponto-de-cuidado.</ListItem>
              <ListItem>Console/estacionário: clínica/centro de imagem.</ListItem>
              <ListItem>Alta performance: recursos avançados e melhor resolução.</ListItem>
              <ListItem>
                Transdutores: convexo (abdome), linear (superficiais/vasos), setorial (janela
                estreita), endocavitário (pélvico/prostático).
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/modos-ultrassom-b-m-doppler`}
                  textDecoration="underline"
                >
                  Quais são os modos do ultrassom?
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
