import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_em_quais_partes_do_corpo_se_faz_ultrassonografia() {
  const title = 'Em quais partes do corpo se faz ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Ultrassonografia pode avaliar abdome, pelve, mamas, tireoide, articulações, músculos, vasos (Doppler) e gestação, conforme a indicação clínica.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/em-quais-partes-do-corpo-se-faz-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/em-quais-partes-do-corpo-se-faz-ultrassonografia',
    name: 'Em quais partes do corpo se faz ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Em quais partes do corpo se faz ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Quase todo o corpo pode ser avaliado: abdome e pelve, mamas e tireoide, músculos e articulações, vasos (Doppler) e gestação. A escolha depende da queixa e do pedido médico.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Em quais partes do corpo se faz ultrassonografia?"
        description="Quase todo o corpo pode ser avaliado: abdome e pelve, mamas e tireoide, músculos e articulações, vasos (Doppler) e gestação. A escolha depende da queixa e do..."
        canonical="https://drmassuca.com.br/faq/em-quais-partes-do-corpo-se-faz-ultrassonografia"
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
          Em quais partes do corpo se faz ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Quase todo o corpo pode ser avaliado: abdome e pelve, mamas e tireoide, músculos e
          articulações, vasos (Doppler) e gestação. A escolha depende da queixa e do pedido médico.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Principais áreas
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Abdome superior/inferior, pélvico ginecológico, obstétrico, mamas, tireoide, partes
                moles, urinário/prostata, parede abdominal, hérnias, doppler arterial/venoso.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Observações
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Alguns órgãos têm preparo específico (jejum, bexiga cheia).</ListItem>
              <ListItem>
                Lesões ósseas e pulmonares são limitadas ao envoltório superficial.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total`}
                  textDecoration="underline"
                >
                  Qual o preparo para fazer ultrassonografia abdominal total?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/precisa-de-jejum-para-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Precisa de jejum para fazer ultrassonografia?
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
