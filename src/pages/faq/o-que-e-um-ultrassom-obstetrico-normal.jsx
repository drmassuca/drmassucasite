import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_e_um_ultrassom_obstetrico_normal() {
  const title = 'O que é um ultrassom obstétrico normal? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Exame compatível com a idade gestacional, com localização intrauterina, batimentos, biometria esperada e ausência de achados patológicos relevantes.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-que-e-um-ultrassom-obstetrico-normal',
    url: 'https://www.drmassuca.com.br/faq/o-que-e-um-ultrassom-obstetrico-normal',
    name: 'O que é um ultrassom obstétrico normal?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que é um ultrassom obstétrico normal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É o exame compatível com a idade gestacional, mostrando localização intrauterina, vitalidade, biometrias esperadas e sem achados patológicos relevantes.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que e um ultrassom obstetrico normal?"
        description="É o exame compatível com a idade gestacional, mostrando localização intrauterina, vitalidade, biometrias esperadas e sem achados patológicos relevantes."
        canonical="https://drmassuca.com.br/faq/o-que-e-um-ultrassom-obstetrico-normal"
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
          O que é um ultrassom obstétrico normal?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          É o exame compatível com a idade gestacional, mostrando localização intrauterina,
          vitalidade, biometrias esperadas e sem achados patológicos relevantes.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Itens comuns no laudo
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Número de fetos, placenta, líquido, medidas (DBP, CC, CA, fêmur), Doppler quando
                indicado.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
                  to={`/faq/o-que-um-ultrassom-de-4-semanas-pode-indicar`}
                  textDecoration="underline"
                >
                  O que um ultrassom de 4 semanas pode indicar?
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
