import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_modos_ultrassom_b_m_doppler() {
  const title = 'Quais são os modos do ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Conheça os principais modos do ultrassom: modo B, M, Doppler (color, power, espectral) e 3D/4D, e quando cada um é utilizado.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/modos-ultrassom-b-m-doppler',
    url: 'https://www.drmassuca.com.br/faq/modos-ultrassom-b-m-doppler',
    name: 'Quais são os modos do ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais são os modos do ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Principais: modo B (brilho/2D), modo M (movimento, ex. válvulas), Doppler (color, power, espectral para fluxo sanguíneo) e 3D/4D (volume e tempo real, útil em obstetrícia e superfícies).',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Modos ultrassom b m doppler?"
        description="Principais: modo B (brilho/2D), modo M (movimento, ex. válvulas), Doppler (color, power, espectral para fluxo sanguíneo) e 3D/4D (volume e tempo real, útil e..."
        canonical="https://drmassuca.com.br/faq/modos-ultrassom-b-m-doppler"
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
          Quais são os modos do ultrassom?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Principais: modo B (brilho/2D), modo M (movimento, ex. válvulas), Doppler (color, power,
          espectral para fluxo sanguíneo) e 3D/4D (volume e tempo real, útil em obstetrícia e
          superfícies).
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Resumo dos modos
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>B (2D): anatomia e ecotextura.</ListItem>
              <ListItem>M: linhas de movimento (cardio/fetal).</ListItem>
              <ListItem>
                Doppler color/power/espectral: direção, intensidade e velocidades do fluxo.
              </ListItem>
              <ListItem>3D/4D: reconstrução volumétrica e visualização dinâmica.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quais são os 4 tipos de ecogenicidade na ultrassonografia?
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
