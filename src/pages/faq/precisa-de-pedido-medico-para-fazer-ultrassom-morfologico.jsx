import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_precisa_de_pedido_medico_para_fazer_ultrassom_morfologico() {
  const title =
    'Precisa de pedido médico para fazer ultrassom morfológico? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em regra, sim: serviços e convênios normalmente exigem solicitação médica para o morfológico; no SUS, é obrigatório via regulação.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id':
      'https://www.drmassuca.com.br/faq/precisa-de-pedido-medico-para-fazer-ultrassom-morfologico',
    url: 'https://www.drmassuca.com.br/faq/precisa-de-pedido-medico-para-fazer-ultrassom-morfologico',
    name: 'Precisa de pedido médico para fazer ultrassom morfológico?',
    mainEntity: {
      '@type': 'Question',
      name: 'Precisa de pedido médico para fazer ultrassom morfológico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Normalmente, sim. O morfológico costuma exigir pedido médico (privado e planos). No SUS, é feito mediante solicitação e regulação.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Precisa de pedido medico para fazer ultrassom morfologico?"
        description="Normalmente, sim. O morfológico costuma exigir pedido médico (privado e planos). No SUS, é feito mediante solicitação e regulação."
        canonical="https://drmassuca.com.br/faq/precisa-de-pedido-medico-para-fazer-ultrassom-morfologico"
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
          Precisa de pedido médico para fazer ultrassom morfológico?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Normalmente, sim. O morfológico costuma exigir pedido médico (privado e planos). No SUS, é
          feito mediante solicitação e regulação.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Por quê?
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Definição da janela correta, indicação e interpretação junto ao obstetra.
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
                  to={`/faq/quando-fazer-a-primeira-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quando fazer a primeira ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-ultrassom-indica-gravidez`}
                  textDecoration="underline"
                >
                  Qual ultrassom indica gravidez?
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
