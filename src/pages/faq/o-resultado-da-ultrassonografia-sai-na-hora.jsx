import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_resultado_da_ultrassonografia_sai_na_hora() {
  const title = 'O resultado da ultrassonografia sai na hora? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em muitos serviços o laudo sai no mesmo dia; o tempo varia conforme a complexidade do exame e o fluxo do serviço.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-resultado-da-ultrassonografia-sai-na-hora',
    url: 'https://www.drmassuca.com.br/faq/o-resultado-da-ultrassonografia-sai-na-hora',
    name: 'O resultado da ultrassonografia sai na hora?',
    mainEntity: {
      '@type': 'Question',
      name: 'O resultado da ultrassonografia sai na hora?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Frequentemente sim, no mesmo dia. O tempo de liberação do laudo depende da complexidade, da necessidade de comparação com exames prévios e do fluxo do serviço.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O resultado da ultrassonografia sai na hora?"
        description="Frequentemente sim, no mesmo dia. O tempo de liberação do laudo depende da complexidade, da necessidade de comparação com exames prévios e do fluxo do serviço."
        canonical="https://drmassuca.com.br/faq/o-resultado-da-ultrassonografia-sai-na-hora"
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
          Frequentemente sim, no mesmo dia. O tempo de liberação do laudo depende da complexidade,
          da necessidade de comparação com exames prévios e do fluxo do serviço.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Fatores que influenciam
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Exames múltiplos/complexos; necessidade de revisão; horários de pico.
              </ListItem>
              <ListItem>Se for urgente, avise o serviço para priorização quando possível.</ListItem>
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
                  to={`/faq/quais-sao-as-vantagens-do-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são as vantagens do ultrassom?
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
