import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_qual_o_nome_do_medico_que_faz_ultrassonografia() {
  const title = 'Qual o nome do médico que faz ultrassonografia? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'O exame é realizado por médico ultrassonografista, frequentemente radiologista, gineco-obstetra ou outro especialista com formação em ultrassom.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/qual-o-nome-do-medico-que-faz-ultrassonografia',
    url: 'https://www.drmassuca.com.br/faq/qual-o-nome-do-medico-que-faz-ultrassonografia',
    name: 'Qual o nome do médico que faz ultrassonografia?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o nome do médico que faz ultrassonografia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'É o médico ultrassonografista (muitas vezes radiologista, gineco-obstetra ou especialista da área), responsável por executar o exame e emitir o laudo.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Qual o nome do medico que faz ultrassonografia?"
        description="É o médico ultrassonografista (muitas vezes radiologista, gineco-obstetra ou especialista da área), responsável por executar o exame e emitir o laudo."
        canonical="https://drmassuca.com.br/faq/qual-o-nome-do-medico-que-faz-ultrassonografia"
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
          Qual o nome do médico que faz ultrassonografia?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          É o médico ultrassonografista (muitas vezes radiologista, gineco-obstetra ou especialista
          da área), responsável por executar o exame e emitir o laudo.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Formação
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Graduação em medicina + treinamento específico em ultrassonografia.
              </ListItem>
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
                  to={`/faq/o-resultado-da-ultrassonografia-sai-na-hora`}
                  textDecoration="underline"
                >
                  O resultado da ultrassonografia sai na hora?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/ultrassom-mais-completo`}
                  textDecoration="underline"
                >
                  Qual o ultrassom mais completo?
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
