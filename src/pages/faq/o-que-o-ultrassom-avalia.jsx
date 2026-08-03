import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_o_ultrassom_avalia() {
  const title = 'O que o ultrassom avalia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Avalia órgãos, vasos e tecidos em tempo real; identifica cistos, nódulos, inflamações, cálculos e o fluxo sanguíneo (Doppler).';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-que-o-ultrassom-avalia',
    url: 'https://www.drmassuca.com.br/faq/o-que-o-ultrassom-avalia',
    name: 'O que o ultrassom avalia?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que o ultrassom avalia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Avalia morfologia e função de órgãos, vasos e tecidos em tempo real, incluindo fluxo com Doppler. Ajuda no diagnóstico, seguimento e guia procedimentos.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que o ultrassom avalia?"
        description="Avalia morfologia e função de órgãos, vasos e tecidos em tempo real, incluindo fluxo com Doppler. Ajuda no diagnóstico, seguimento e guia procedimentos."
        canonical="https://drmassuca.com.br/faq/o-que-o-ultrassom-avalia"
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
          O que o ultrassom avalia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Avalia morfologia e função de órgãos, vasos e tecidos em tempo real, incluindo fluxo com
          Doppler. Ajuda no diagnóstico, seguimento e guia procedimentos.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Itens usuais
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Tamanho, forma, ecotextura, vascularização, coleções, mobilidade, relação com
                estruturas.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-a-ultrassonografia-identifica`}
                  textDecoration="underline"
                >
                  O que a ultrassonografia identifica?
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
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quais são os 4 tipos de ecogenicidade na ultrassonografia?
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
