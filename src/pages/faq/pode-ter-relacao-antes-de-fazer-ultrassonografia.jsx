import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_pode_ter_relacao_antes_de_fazer_ultrassonografia() {
  const title = 'Pode ter relação antes de fazer ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Em geral, pode. Alguns exames pélvicos/prostáticos pedem orientações específicas; siga o preparo informado pelo serviço.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/pode-ter-relacao-antes-de-fazer-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/pode-ter-relacao-antes-de-fazer-ultrassonografia',
    name: 'Pode ter relação antes de fazer ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Pode ter relação antes de fazer ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Na maioria dos exames, pode sim. Em pélvico/prostático, pode haver orientações específicas (ex.: evitar ejaculação por 24–48h, conforme o serviço). Siga o preparo.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Pode ter relacao antes de fazer ultrassonografia?"
        description="Na maioria dos exames, pode sim. Em pélvico/prostático, pode haver orientações específicas (ex.: evitar ejaculação por 24–48h, conforme o serviço). Siga o pr..."
        canonical="https://drmassuca.com.br/faq/pode-ter-relacao-antes-de-fazer-ultrassonografia"
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
          Pode ter relação antes de fazer ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Na maioria dos exames, pode sim. Em pélvico/prostático, pode haver orientações específicas
          (ex.: evitar ejaculação por 24–48h, conforme o serviço). Siga o preparo.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Dicas
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Para pélvico feminino, manter bexiga cheia se solicitado e evitar cremes/duchas
                próximos ao exame.
              </ListItem>
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
                  to={`/faq/qual-o-preparo-para-fazer-ultrassonografia-abdominal-total`}
                  textDecoration="underline"
                >
                  Qual o preparo para fazer ultrassonografia abdominal total?
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
