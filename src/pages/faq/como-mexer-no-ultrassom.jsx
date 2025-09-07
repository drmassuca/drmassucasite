import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_como_mexer_no_ultrassom() {
  const title = 'Como mexer no ultrassom? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Operação do aparelho é atividade médica/técnica; para pacientes, o importante é o preparo e entender como o exame é realizado e interpretado.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/como-mexer-no-ultrassom',
    url: 'https://www.drmassuca.com.br/faq/como-mexer-no-ultrassom',
    name: 'Como mexer no ultrassom?',
    mainEntity: {
      '@type': 'Question',
      name: 'Como mexer no ultrassom?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'A operação do aparelho é atribuição profissional (médico treinado). Para o paciente, interessa preparo adequado, posicionamento e compreensão do laudo.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Como mexer no ultrassom?"
        description="A operação do aparelho é atribuição profissional (médico treinado). Para o paciente, interessa preparo adequado, posicionamento e compreensão do laudo."
        canonical="https://drmassuca.com.br/faq/como-mexer-no-ultrassom"
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
          Como mexer no ultrassom?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          A operação do aparelho é atribuição profissional (médico treinado). Para o paciente,
          interessa preparo adequado, posicionamento e compreensão do laudo.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Para o paciente
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Chegar com preparo solicitado; levar exames anteriores; seguir orientações do
                serviço.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/como-e-feito-um-ultrassom-abdominal`}
                  textDecoration="underline"
                >
                  Como é feito um ultrassom abdominal?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total`}
                  textDecoration="underline"
                >
                  Qual o preparo para fazer ultrassonografia abdominal total?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/precisa-de-jejum-para-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Precisa de jejum para fazer ultrassonografia?
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
