import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_precisa_de_jejum_para_fazer_ultrassonografia() {
  const title = 'Precisa de jejum para fazer ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em muitas avaliações abdominais, sim: jejum de 6–8h. Outros exames não exigem jejum; siga o preparo do pedido.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/precisa-de-jejum-para-fazer-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/precisa-de-jejum-para-fazer-ultrassonografia',
    name: 'Precisa de jejum para fazer ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Precisa de jejum para fazer ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Para abdome e vias biliares, costuma-se pedir jejum (6–8h) e controle de gases. Tireoide, mamas, partes moles e Doppler geralmente não exigem jejum.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Precisa de jejum para fazer ultrassonografia?"
        description="Para abdome e vias biliares, costuma-se pedir jejum (6–8h) e controle de gases. Tireoide, mamas, partes moles e Doppler geralmente não exigem jejum."
        canonical="https://drmassuca.com.br/faq/precisa-de-jejum-para-fazer-ultrassonografia"
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
          Precisa de jejum para fazer ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Para abdome e vias biliares, costuma-se pedir jejum (6–8h) e controle de gases. Tireoide,
          mamas, partes moles e Doppler geralmente não exigem jejum.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Bexiga cheia
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Alguns exames pélvicos pedem bexiga cheia para melhor janela.</ListItem>
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
                  to={`/faq/pode-ter-relacao-antes-de-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Pode ter relação antes de fazer ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-e-necessario-para-se-preparar-para-um-ultrassom-abdominal`}
                  textDecoration="underline"
                >
                  O que é necessário para se preparar para um ultrassom abdominal?
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
