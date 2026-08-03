import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quando_fazer_a_primeira_ultrassonografia() {
  const title = 'Quando fazer a primeira ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Na gestação, a primeira eco costuma ser entre 5–8 semanas para confirmar localização, vitalidade e datar. Sintomas podem indicar exame mais cedo.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quando-fazer-a-primeira-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/quando-fazer-a-primeira-ultrassonografia',
    name: 'Quando fazer a primeira ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quando fazer a primeira ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na gestação, geralmente entre 5–8 semanas (confirmar intrauterina, vitalidade e datar). Se houver dor/sangramento, avalia-se mais cedo conforme orientação médica.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quando fazer a primeira ultrassonografia?"
        description="Na gestação, geralmente entre 5–8 semanas (confirmar intrauterina, vitalidade e datar). Se houver dor/sangramento, avalia-se mais cedo conforme orientação mé..."
        canonical="https://drmassuca.com.br/faq/quando-fazer-a-primeira-ultrassonografia"
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
          Quando fazer a primeira ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Na gestação, geralmente entre 5–8 semanas (confirmar intrauterina, vitalidade e datar). Se
          houver dor/sangramento, avalia-se mais cedo conforme orientação médica.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Outros contextos
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Fora da gestação: a “primeira” depende da queixa (dor abdominal, nódulo palpável,
                etc.) e do pedido.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
                  to={`/faq/qual-ultrassom-fazer-com-6-semanas`}
                  textDecoration="underline"
                >
                  Qual ultrassom fazer com 6 semanas?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-e-um-ultrassom-obstetrico-normal`}
                  textDecoration="underline"
                >
                  O que é um ultrassom obstétrico normal?
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
