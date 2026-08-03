import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_resultado_da_ultrassonografia_sai_na_hora_3() {
  const title = 'O resultado da ultrassonografia sai na hora? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em muitos serviços, o laudo sai no mesmo dia. O tempo depende da complexidade do exame e do fluxo de trabalho.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-resultado-da-ultrassonografia-sai-na-hora-3',
    url: 'https://www.drmassuca.com.br/faq/o-resultado-da-ultrassonografia-sai-na-hora-3',
    name: 'O resultado da ultrassonografia sai na hora?',
    mainEntity: {
      '@type': 'Question',
      name: 'O resultado da ultrassonografia sai na hora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Geralmente no mesmo dia. Pode variar com a complexidade, necessidade de comparar exames anteriores e movimento do serviço.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O resultado da ultrassonografia sai na hora 3?"
        description="Geralmente no mesmo dia. Pode variar com a complexidade, necessidade de comparar exames anteriores e movimento do serviço."
        canonical="https://drmassuca.com.br/faq/o-resultado-da-ultrassonografia-sai-na-hora-3"
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
          O resultado da ultrassonografia sai na hora?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Geralmente no mesmo dia. Pode variar com a complexidade, necessidade de comparar exames
          anteriores e movimento do serviço.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Dica
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Se precisar urgente, avise a equipe antes do exame.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-e-a-funcao-do-ultrassom`}
                  textDecoration="underline"
                >
                  Qual é a função do ultrassom?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-o-nome-do-medico-que-faz-ultrassonografia`}
                  textDecoration="underline"
                >
                  Qual o nome do médico que faz ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-as-vantagens-do-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são as vantagens do ultrassom?
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
