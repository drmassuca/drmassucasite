import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_o_preparo_para_fazer_ultrassonografia_abdominal_total() {
  const title =
    'Qual o preparo para fazer ultrassonografia abdominal total? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Preparo típico inclui jejum e, em alguns casos, bexiga cheia; confirme as orientações do serviço antes do exame.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id':
      'https://www.drmassuca.com.br/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total',
    url: 'https://www.drmassuca.com.br/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total',
    name: 'Qual o preparo para fazer ultrassonografia abdominal total?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o preparo para fazer ultrassonografia abdominal total?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Geralmente pede-se jejum (6–8 h) e evitar gases; alguns serviços solicitam bexiga cheia para melhor avaliação. Siga as orientações do pedido/local.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual o preparo para fazer ultrassonografia abdominal total?"
        description="Geralmente pede-se jejum (6–8 h) e evitar gases; alguns serviços solicitam bexiga cheia para melhor avaliação. Siga as orientações do pedido/local."
        canonical="https://drmassuca.com.br/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total"
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
          Qual o preparo para fazer ultrassonografia abdominal total?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Geralmente pede-se jejum (6–8 h) e evitar gases; alguns serviços solicitam bexiga cheia
          para melhor avaliação. Siga as orientações do pedido/local.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Dicas práticas
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Evitar alimentos que gerem gases no dia anterior; água conforme orientação.
              </ListItem>
              <ListItem>Levar exames anteriores e lista de medicamentos.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/precisa-de-jejum-para-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Precisa de jejum para fazer ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-o-ultrassom-abdominal-total-detecta`}
                  textDecoration="underline"
                >
                  O que o ultrassom abdominal total detecta?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/pode-ter-relacao-antes-de-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Pode ter relação antes de fazer ultrassonografia?
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
