import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_quanto_tempo_o_ultrassom_faz_efeito() {
  const title = 'Quanto tempo o ultrassom faz efeito? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'O ultrassom diagnóstico não tem “efeito” farmacológico; é uma avaliação por imagem no momento do exame, sem ação residual no corpo.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/quanto-tempo-o-ultrassom-faz-efeito',
    url: 'https://www.drmassuca.com.br/faq/quanto-tempo-o-ultrassom-faz-efeito',
    name: 'Quanto tempo o ultrassom faz efeito?',
    mainEntity: {
      '@type': 'Question',
      name: 'Quanto tempo o ultrassom faz efeito?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'O ultrassom diagnóstico não “faz efeito” como um remédio. Ele apenas avalia estruturas no momento do exame, sem ação residual no organismo.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Quanto tempo o ultrassom faz efeito?"
        description="O ultrassom diagnóstico não “faz efeito” como um remédio. Ele apenas avalia estruturas no momento do exame, sem ação residual no organismo."
        canonical="https://drmassuca.com.br/faq/quanto-tempo-o-ultrassom-faz-efeito"
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
          Quanto tempo o ultrassom faz efeito?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          O ultrassom diagnóstico não “faz efeito” como um remédio. Ele apenas avalia estruturas no
          momento do exame, sem ação residual no organismo.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Observações
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Pode haver desconforto pela pressão do transdutor ou gel frio; isso passa logo após
                o exame.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-os-riscos-da-ultrassonografia`}
                  textDecoration="underline"
                >
                  Quais são os riscos da ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/quais-sao-as-contraindicacoes-do-ultrassom`}
                  textDecoration="underline"
                >
                  Quais são as contraindicações do ultrassom?
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
