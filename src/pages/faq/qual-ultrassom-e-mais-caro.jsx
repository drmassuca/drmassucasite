import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_ultrassom_e_mais_caro() {
  const title = 'Qual ultrassom é mais caro? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Entenda por que exames com protocolos longos e recursos avançados (morfológico, Doppler, 3D/4D) tendem a custar mais; valores variam por região e serviço.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-ultrassom-e-mais-caro',
    url: 'https://www.drmassuca.com.br/faq/qual-ultrassom-e-mais-caro',
    name: 'Qual ultrassom é mais caro?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual ultrassom é mais caro?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Tendem a ser mais caros os exames com protocolo detalhado ou tecnologia adicional: obstétrico morfológico, Doppler vascular/obstétrico e 3D/4D. O preço varia por região, equipamento e equipe.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual ultrassom e mais caro?"
        description="Tendem a ser mais caros os exames com protocolo detalhado ou tecnologia adicional: obstétrico morfológico, Doppler vascular/obstétrico e 3D/4D. O preço varia..."
        canonical="https://drmassuca.com.br/faq/qual-ultrassom-e-mais-caro"
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
          Qual ultrassom é mais caro?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Tendem a ser mais caros os exames com protocolo detalhado ou tecnologia adicional:
          obstétrico morfológico, Doppler vascular/obstétrico e 3D/4D. O preço varia por região,
          equipamento e equipe.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              O que influencia o preço
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Tempo de sala, complexidade, necessidade de Doppler e volume 3D/4D.
              </ListItem>
              <ListItem>Experiência do médico e suporte (laudo, imagens, vídeo).</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/ultrassom-mais-completo`}
                  textDecoration="underline"
                >
                  Qual o ultrassom mais completo?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-os-tipos-de-aparelhos-de-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são os tipos de aparelhos de ultrassom?
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
