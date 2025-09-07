import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_o_momento_certo_para_fazer_ultrassonografia() {
  const title = 'Qual o momento certo para fazer ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'O momento depende da indicação clínica. Em gestação, janelas típicas são 5–8s (inicial), 11–14s (1º tri) e 20–24s (2º tri).';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-o-momento-certo-para-fazer-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/qual-o-momento-certo-para-fazer-ultrassonografia',
    name: 'Qual o momento certo para fazer ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o momento certo para fazer ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É definido pela queixa e pelo objetivo. Na gestação, usualmente: 5–8 semanas (inicial), 11–14 (1º tri) e 20–24 (2º tri). Urgências (dor/sangramento) indicam realização imediata.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual o momento certo para fazer ultrassonografia?"
        description="É definido pela queixa e pelo objetivo. Na gestação, usualmente: 5–8 semanas (inicial), 11–14 (1º tri) e 20–24 (2º tri). Urgências (dor/sangramento) indicam..."
        canonical="https://drmassuca.com.br/faq/qual-o-momento-certo-para-fazer-ultrassonografia"
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
          Qual o momento certo para fazer ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          É definido pela queixa e pelo objetivo. Na gestação, usualmente: 5–8 semanas (inicial),
          11–14 (1º tri) e 20–24 (2º tri). Urgências (dor/sangramento) indicam realização imediata.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Fora da gestação
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Dor abdominal, nódulo palpável, suspeita vascular: o médico define prioridade
                conforme sintomas.
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
                  to={`/faq/quais-exames-de-ultrassonografia-na-gravidez`}
                  textDecoration="underline"
                >
                  Quais exames de ultrassonografia na gravidez?
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
