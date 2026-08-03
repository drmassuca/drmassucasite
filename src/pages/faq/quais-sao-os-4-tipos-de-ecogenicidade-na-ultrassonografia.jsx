import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quais_sao_os_4_tipos_de_ecogenicidade_na_ultrassonografia() {
  const title =
    'Quais são os 4 tipos de ecogenicidade na ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Entenda a ecogenicidade: anecoico, hipoecoico, isoecoico e hiperecoico — o que significam na prática e por que variam conforme o tecido.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id':
      'https://www.drmassuca.com.br/faq/quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia',
    name: 'Quais são os 4 tipos de ecogenicidade na ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quais são os 4 tipos de ecogenicidade na ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em geral falamos em anecoico (sem ecos, ex.: líquido), hipoecoico (mais escuro), isoecoico (semelhante) e hiperecoico (mais brilhante). O significado depende do contexto e do tecido avaliado.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quais sao os 4 tipos de ecogenicidade na ultrassonografia?"
        description="Em geral falamos em anecoico (sem ecos, ex.: líquido), hipoecoico (mais escuro), isoecoico (semelhante) e hiperecoico (mais brilhante). O significado depende..."
        canonical="https://drmassuca.com.br/faq/quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia"
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
          Quais são os 4 tipos de ecogenicidade na ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Em geral falamos em anecoico (sem ecos, ex.: líquido), hipoecoico (mais escuro), isoecoico
          (semelhante) e hiperecoico (mais brilhante). O significado depende do contexto e do tecido
          avaliado.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Como interpretar
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Anecoico: cistos/coleções líquidas típicas.</ListItem>
              <ListItem>Hipoecoico: muitos nódulos/estruturas sólidas ou inflamatórias.</ListItem>
              <ListItem>Isoecoico: similar ao parênquima adjacente.</ListItem>
              <ListItem>
                Hiperecoico: gordura, fibrose, cálculos, gás (com sombras/artefatos).
              </ListItem>
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
                  to={`/faq/modos-ultrassom-b-m-doppler`}
                  textDecoration="underline"
                >
                  Quais são os modos do ultrassom?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/como-se-chama-um-ultrassom-normal`}
                  textDecoration="underline"
                >
                  Como se chama um ultrassom normal?
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
