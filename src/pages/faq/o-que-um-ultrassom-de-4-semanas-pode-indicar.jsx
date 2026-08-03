import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_um_ultrassom_de_4_semanas_pode_indicar() {
  const title = 'O que um ultrassom de 4 semanas pode indicar? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Com cerca de 4 semanas, pode-se ver saco gestacional (principalmente via transvaginal). Vesícula vitelínica e embrião aparecem nas semanas seguintes.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-que-um-ultrassom-de-4-semanas-pode-indicar',
    url: 'https://www.drmassuca.com.br/faq/o-que-um-ultrassom-de-4-semanas-pode-indicar',
    name: 'O que um ultrassom de 4 semanas pode indicar?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que um ultrassom de 4 semanas pode indicar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Por volta de 4 semanas, pode-se identificar o saco gestacional (melhor por transvaginal). A vesícula vitelínica surge em geral 5–6 semanas e o embrião/batimentos a partir de 6+.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que um ultrassom de 4 semanas pode indicar?"
        description="Por volta de 4 semanas, pode-se identificar o saco gestacional (melhor por transvaginal). A vesícula vitelínica surge em geral 5–6 semanas e o embrião/batime..."
        canonical="https://drmassuca.com.br/faq/o-que-um-ultrassom-de-4-semanas-pode-indicar"
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
          O que um ultrassom de 4 semanas pode indicar?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Por volta de 4 semanas, pode-se identificar o saco gestacional (melhor por transvaginal).
          A vesícula vitelínica surge em geral 5–6 semanas e o embrião/batimentos a partir de 6+.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Importante
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Datas incertas e variação individual podem postergar a visualização.
              </ListItem>
              <ListItem>Em sintomas (dor/sangramento), o exame pode ser indicado antes.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
                  to={`/faq/quando-fazer-a-primeira-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quando fazer a primeira ultrassonografia?
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
