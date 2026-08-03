import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_o_nome_do_ultrassonografista_para_ver_o_bebe() {
  const title = 'Qual o nome do ultrassonografista para ver o bebê? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'O ultrassom obstétrico é realizado por médico ultrassonografista, frequentemente gineco-obstetra com formação em imagem fetal.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-o-nome-do-ultrassonografista-para-ver-o-bebe',
    url: 'https://www.drmassuca.com.br/faq/qual-o-nome-do-ultrassonografista-para-ver-o-bebe',
    name: 'Qual o nome do ultrassonografista para ver o bebê?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o nome do ultrassonografista para ver o bebê?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É o médico ultrassonografista; muitas vezes um gineco-obstetra com treinamento em obstetrícia/feto-materna. Ele realiza o exame e lauda.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual o nome do ultrassonografista para ver o bebe?"
        description="É o médico ultrassonografista; muitas vezes um gineco-obstetra com treinamento em obstetrícia/feto-materna. Ele realiza o exame e lauda."
        canonical="https://drmassuca.com.br/faq/qual-o-nome-do-ultrassonografista-para-ver-o-bebe"
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
          Qual o nome do ultrassonografista para ver o bebê?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          É o médico ultrassonografista; muitas vezes um gineco-obstetra com treinamento em
          obstetrícia/feto-materna. Ele realiza o exame e lauda.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Diferenciais
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Experiência em datação, morfologia fetal e Doppler obstétrico.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-e-um-ultrassom-obstetrico-normal`}
                  textDecoration="underline"
                >
                  O que é um ultrassom obstétrico normal?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-a-melhor-semana-para-fazer-ultrassonografia-3d`}
                  textDecoration="underline"
                >
                  Qual a melhor semana para fazer ultrassonografia 3D?
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
