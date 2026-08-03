import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_e_possivel_fazer_ultrassom_sem_pedido_medico() {
  const title = 'É possível fazer um ultrassom sem pedido médico? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'No privado, alguns exames podem ser feitos sem pedido, mas é recomendável avaliação médica. Planos de saúde e SUS exigem solicitação.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/e-possivel-fazer-ultrassom-sem-pedido-medico',
    url: 'https://www.drmassuca.com.br/faq/e-possivel-fazer-ultrassom-sem-pedido-medico',
    name: 'É possível fazer um ultrassom sem pedido médico?',
    mainEntity: {
      '@type': 'Question',
      name: 'É possível fazer um ultrassom sem pedido médico?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No setor privado, alguns serviços realizam ultrassons sem pedido, porém é recomendável avaliação médica. Planos e SUS normalmente exigem solicitação formal.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="E possivel fazer ultrassom sem pedido medico?"
        description="No setor privado, alguns serviços realizam ultrassons sem pedido, porém é recomendável avaliação médica. Planos e SUS normalmente exigem solicitação formal."
        canonical="https://drmassuca.com.br/faq/e-possivel-fazer-ultrassom-sem-pedido-medico"
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
          É possível fazer um ultrassom sem pedido médico?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          No setor privado, alguns serviços realizam ultrassons sem pedido, porém é recomendável
          avaliação médica. Planos e SUS normalmente exigem solicitação formal.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Boas práticas
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Evite autodiagnóstico; alinhe com seu médico o exame certo no tempo certo.
              </ListItem>
              <ListItem>Exames morfológicos e Doppler geralmente pedem pedido.</ListItem>
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
                  to={`/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total`}
                  textDecoration="underline"
                >
                  Qual o preparo para fazer ultrassonografia abdominal total?
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
