import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_ultrassom_mais_completo() {
  const title = 'Qual o ultrassom mais completo? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Entenda por que não existe um “ultrassom mais completo” para tudo e como a escolha depende da indicação clínica, região estudada e modos usados.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/ultrassom-mais-completo',
    url: 'https://www.drmassuca.com.br/faq/ultrassom-mais-completo',
    name: 'Qual o ultrassom mais completo?',
    mainEntity: {
      '@type': 'Question',
      name: 'Qual o ultrassom mais completo?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Não há um exame único “mais completo” para tudo. O melhor é o indicado para a sua queixa/região, combinando modos (B, Doppler, etc.) e protocolo adequado (ex.: abdome total para vísceras abdominais; obstétrico para gestação).',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="Ultrassom mais completo?"
        description="Não há um exame único “mais completo” para tudo. O melhor é o indicado para a sua queixa/região, combinando modos (B, Doppler, etc.) e protocolo adequado (ex..."
        canonical="https://drmassuca.com.br/faq/ultrassom-mais-completo"
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
          Qual o ultrassom mais completo?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Não há um exame único “mais completo” para tudo. O melhor é o indicado para a sua
          queixa/região, combinando modos (B, Doppler, etc.) e protocolo adequado (ex.: abdome total
          para vísceras abdominais; obstétrico para gestação).
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Quando cada um é “o mais completo”
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>Abdome total: panorama das vísceras abdominais.</ListItem>
              <ListItem>
                Obstétrico morfológico: avaliação detalhada fetal por idade gestacional.
              </ListItem>
              <ListItem>Doppler vascular: estudo de fluxo e estenoses.</ListItem>
              <ListItem>Mamas/tireoide: alta sensibilidade para nódulos e cistos.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Princípio
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                O exame “completo” é o que responde à pergunta clínica com técnica e preparo
                corretos.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/modos-ultrassom-b-m-doppler`}
                  textDecoration="underline"
                >
                  Quais são os modos do ultrassom?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/qual-o-tipo-de-ultrassom-que-ve-todos-os-orgaos`}
                  textDecoration="underline"
                >
                  Qual o tipo de ultrassom que vê todos os órgãos?
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
