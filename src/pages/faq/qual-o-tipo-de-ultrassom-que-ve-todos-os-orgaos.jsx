import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_o_tipo_de_ultrassom_que_ve_todos_os_orgaos() {
  const title = 'Qual o tipo de ultrassom que vê todos os órgãos? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Não existe ultrassom único que avalie todos os órgãos com detalhe; usam-se exames por região (abdome, pelve, mamas, tireoide, doppler, etc.).';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos',
    url: 'https://www.drmassuca.com.br/faq/qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos',
    name: 'Qual o tipo de ultrassom que vê todos os órgãos?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o tipo de ultrassom que vê todos os órgãos?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não existe um ultrassom único que veja “todos os órgãos” com detalhe. O ideal é por região/indicação (abdome total, pélvico, mamas, tireoide, doppler), conforme a pergunta clínica.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual o tipo de ultrassom que ve todos os orgaos?"
        description="Não existe um ultrassom único que veja “todos os órgãos” com detalhe. O ideal é por região/indicação (abdome total, pélvico, mamas, tireoide, doppler), confo..."
        canonical="https://drmassuca.com.br/faq/qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos"
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
          Qual o tipo de ultrassom que vê todos os órgãos?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Não existe um ultrassom único que veja “todos os órgãos” com detalhe. O ideal é por
          região/indicação (abdome total, pélvico, mamas, tireoide, doppler), conforme a pergunta
          clínica.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Por que não existe “total de corpo”
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Limitações físicas (ar, osso), diferenças de preparo e tempo de exame.
              </ListItem>
              <ListItem>Protocolos específicos aumentam acurácia.</ListItem>
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
                  to={`/faq/o-que-o-ultrassom-abdominal-total-detecta`}
                  textDecoration="underline"
                >
                  O que o ultrassom abdominal total detecta?
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
