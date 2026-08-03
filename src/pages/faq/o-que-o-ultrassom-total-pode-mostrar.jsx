import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_o_ultrassom_total_pode_mostrar() {
  const title = 'O que o ultrassom total pode mostrar? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Entenda o que costuma ser chamado de “ultrassom total”: avaliações amplas por regiões (como abdome total), com limites e indicações bem definidos.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': 'https://www.drmassuca.com.br/faq/o-que-o-ultrassom-total-pode-mostrar',
    url: 'https://www.drmassuca.com.br/faq/o-que-o-ultrassom-total-pode-mostrar',
    name: 'O que o ultrassom total pode mostrar?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que o ultrassom total pode mostrar?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '“Ultrassom total” não é termo técnico padronizado; normalmente refere-se a avaliações amplas por região (ex.: abdome total). Cada protocolo tem limites e indicações; não substitui exames específicos.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que o ultrassom total pode mostrar?"
        description="“Ultrassom total” não é termo técnico padronizado; normalmente refere-se a avaliações amplas por região (ex.: abdome total). Cada protocolo tem limites e ind..."
        canonical="https://drmassuca.com.br/faq/o-que-o-ultrassom-total-pode-mostrar"
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
          O que o ultrassom total pode mostrar?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          “Ultrassom total” não é termo técnico padronizado; normalmente refere-se a avaliações
          amplas por região (ex.: abdome total). Cada protocolo tem limites e indicações; não
          substitui exames específicos.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              O que costuma incluir
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Abdome “total”: fígado, vias biliares, vesícula, pâncreas, baço, rins, aorta, bexiga
                (varia).
              </ListItem>
              <ListItem>Complementos dependem da indicação clínica.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Limitações
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Não “vê tudo do corpo”; detalhes de mamas, tireoide, pelve, vasos e articulações
                exigem exames próprios.
              </ListItem>
              <ListItem>Biotipo, gases e preparo impactam a visualização.</ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/o-que-o-ultrassom-avalia`}
                  textDecoration="underline"
                >
                  O que o ultrassom avalia?
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
