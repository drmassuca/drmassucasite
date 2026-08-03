import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_ultrassom_e_100_confiavel() {
  const title = 'O ultrassom é 100% confiável? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Acurácia é alta para muitas indicações, mas depende do biotipo, preparo, técnica e experiência do operador. Pode exigir exames complementares.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-ultrassom-e-100-confiavel',
    url: 'https://www.drmassuca.com.br/faq/o-ultrassom-e-100-confiavel',
    name: 'O ultrassom é 100% confiável?',
    mainEntity: {
      '@type': 'Question',
      name: 'O ultrassom é 100% confiável?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não há exame 100% em todas as situações. A acurácia do ultrassom é alta para diversas indicações, mas depende de preparo, biotipo, técnica e experiência; às vezes, complementa-se com TC/RM.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O ultrassom e 100 confiavel?"
        description="Não há exame 100% em todas as situações. A acurácia do ultrassom é alta para diversas indicações, mas depende de preparo, biotipo, técnica e experiência; às..."
        canonical="https://drmassuca.com.br/faq/o-ultrassom-e-100-confiavel"
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
          O ultrassom é 100% confiável?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Não há exame 100% em todas as situações. A acurácia do ultrassom é alta para diversas
          indicações, mas depende de preparo, biotipo, técnica e experiência; às vezes,
          complementa-se com TC/RM.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Como aumentar a confiabilidade
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Cumprir preparo, usar Doppler quando indicado, comparar com exames prévios e
                clínica.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
                  to={`/faq/quais-sao-as-contraindicacoes-do-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são as contraindicações do ultrassom?
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
