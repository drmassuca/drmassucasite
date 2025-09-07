import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_como_se_chama_um_ultrassom_normal() {
  const title = 'Como se chama um ultrassom normal? | FAQ Ultrassom – Dr. Massuca';
  const description =
    '“Ultrassom normal” geralmente refere-se a exame sem achados patológicos relevantes para a indicação clínica.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/como-se-chama-um-ultrassom-normal',
    url: 'https://www.drmassuca.com.br/faq/como-se-chama-um-ultrassom-normal',
    name: 'Como se chama um ultrassom normal?',
    mainEntity: {
      '@type': 'Question',
      name: 'Como se chama um ultrassom normal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Costuma-se dizer exame sem alterações significativas ou sem sinais de doença para a indicação. O laudo descreve estruturas e conclui se há ou não achados relevantes.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Como se chama um ultrassom normal?"
        description="Costuma-se dizer exame sem alterações significativas ou sem sinais de doença para a indicação. O laudo descreve estruturas e conclui se há ou não achados rel..."
        canonical="https://drmassuca.com.br/faq/como-se-chama-um-ultrassom-normal"
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
          Como se chama um ultrassom normal?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Costuma-se dizer exame sem alterações significativas ou sem sinais de doença para a
          indicação. O laudo descreve estruturas e conclui se há ou não achados relevantes.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Observação
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                “Normal” = compatível com o esperado para idade/sexo/órgão e sem achados patológicos
                significativos.
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
                  to={`/faq/quais-sao-os-4-tipos-de-ecogenicidade-na-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quais são os 4 tipos de ecogenicidade na ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-ultrassom-e-100-confiavel`}
                  textDecoration="underline"
                >
                  O ultrassom é 100% confiável?
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
