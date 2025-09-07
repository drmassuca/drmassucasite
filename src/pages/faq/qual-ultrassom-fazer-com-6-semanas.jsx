import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_ultrassom_fazer_com_6_semanas() {
  const title = 'Qual ultrassom fazer com 6 semanas? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em torno de 6 semanas, o ultrassom transvaginal costuma mostrar saco gestacional, vesícula vitelínica e, muitas vezes, embrião com batimentos.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-ultrassom-fazer-com-6-semanas',
    url: 'https://www.drmassuca.com.br/faq/qual-ultrassom-fazer-com-6-semanas',
    name: 'Qual ultrassom fazer com 6 semanas?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual ultrassom fazer com 6 semanas?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O transvaginal é o mais indicado: visualiza saco gestacional, vesícula vitelínica e, muitas vezes, embrião com batimentos. A visibilidade varia entre pacientes.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual ultrassom fazer com 6 semanas?"
        description="O transvaginal é o mais indicado: visualiza saco gestacional, vesícula vitelínica e, muitas vezes, embrião com batimentos. A visibilidade varia entre pacientes."
        canonical="https://drmassuca.com.br/faq/qual-ultrassom-fazer-com-6-semanas"
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
          Qual ultrassom fazer com 6 semanas?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          O transvaginal é o mais indicado: visualiza saco gestacional, vesícula vitelínica e,
          muitas vezes, embrião com batimentos. A visibilidade varia entre pacientes.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Observações
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Datas incertas e variações individuais podem adiar a detecção de batimentos.
              </ListItem>
              <ListItem>Siga orientação do obstetra.</ListItem>
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
                  to={`/faq/o-que-um-ultrassom-de-4-semanas-pode-indicar`}
                  textDecoration="underline"
                >
                  O que um ultrassom de 4 semanas pode indicar?
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
