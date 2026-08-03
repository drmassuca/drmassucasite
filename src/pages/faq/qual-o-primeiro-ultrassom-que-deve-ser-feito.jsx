import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_o_primeiro_ultrassom_que_deve_ser_feito() {
  const title = 'Qual o primeiro ultrassom que deve ser feito? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em gestação, o primeiro costuma ser o ultrassom obstétrico inicial (5–8s). Para outras queixas, o médico direciona o exame adequado.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-o-primeiro-ultrassom-que-deve-ser-feito',
    url: 'https://www.drmassuca.com.br/faq/qual-o-primeiro-ultrassom-que-deve-ser-feito',
    name: 'Qual o primeiro ultrassom que deve ser feito?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o primeiro ultrassom que deve ser feito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na gestação, o primeiro é o ultrassom obstétrico inicial (5–8 semanas). Em outras situações, o médico define o exame inicial conforme a queixa (abdome, pélvico, partes moles, doppler, etc.).',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual o primeiro ultrassom que deve ser feito?"
        description="Na gestação, o primeiro é o ultrassom obstétrico inicial (5–8 semanas). Em outras situações, o médico define o exame inicial conforme a queixa (abdome, pélvi..."
        canonical="https://drmassuca.com.br/faq/qual-o-primeiro-ultrassom-que-deve-ser-feito"
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
          Qual o primeiro ultrassom que deve ser feito?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Na gestação, o primeiro é o ultrassom obstétrico inicial (5–8 semanas). Em outras
          situações, o médico define o exame inicial conforme a queixa (abdome, pélvico, partes
          moles, doppler, etc.).
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Por que isso importa
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Fazer o exame certo na janela correta evita repetir e acelera o diagnóstico.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-exames-de-ultrassonografia-na-gravidez`}
                  textDecoration="underline"
                >
                  Quais exames de ultrassonografia na gravidez?
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
