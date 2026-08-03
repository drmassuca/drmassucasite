import { Heading, Text, Stack, List, ListItem, Link as CLink, Button, Box } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWhatsapp } from 'react-icons/fa';
import Seo from '../../components/SEO';

import SEO from '../../components/SEO';
export default function Faq_o_que_e_necessario_para_se_preparar_para_um_ultrassom_abdominal() {
  const title =
    'O que é necessário para se preparar para um ultrassom abdominal? | FAQ Ultrassom – Dr. Massuca';
  const description =
    'Preparo habitual inclui jejum e controle de gases; alguns serviços pedem bexiga cheia. Confirme as orientações no agendamento.';
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id':
      'https://www.drmassuca.com.br/faq/o-que-e-necessario-para-se-preparar-para-um-ultrassom-abdominal',
    url: 'https://www.drmassuca.com.br/faq/o-que-e-necessario-para-se-preparar-para-um-ultrassom-abdominal',
    name: 'O que é necessário para se preparar para um ultrassom abdominal?',
    mainEntity: {
      '@type': 'Question',
      name: 'O que é necessário para se preparar para um ultrassom abdominal?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Em geral, jejum de 6–8 horas e evitar alimentos que causem gases. Para algumas avaliações, pede-se bexiga cheia. Siga as orientações do serviço.',
      },
    },
    inLanguage: 'pt-BR',
    dateModified: '2025-08-02',
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO
        title="O que e necessario para se preparar para um ultrassom abdominal?"
        description="Em geral, jejum de 6–8 horas e evitar alimentos que causem gases. Para algumas avaliações, pede-se bexiga cheia. Siga as orientações do serviço."
        canonical="https://drmassuca.com.br/faq/o-que-e-necessario-para-se-preparar-para-um-ultrassom-abdominal"
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
          O que é necessário para se preparar para um ultrassom abdominal?
        </Heading>
        <Text fontWeight="medium" mb={6}>
          Em geral, jejum de 6–8 horas e evitar alimentos que causem gases. Para algumas avaliações,
          pede-se bexiga cheia. Siga as orientações do serviço.
        </Text>
        <Stack spacing={6}>
          <Stack spacing={2}>
            <Heading as="h2" size="md">
              Checklist rápido
            </Heading>
            <List styleType="disc" pl={6}>
              <ListItem>
                Jejum conforme pedido; hidratação/bexiga se indicado; levar exames anteriores e
                lista de remédios.
              </ListItem>
            </List>
          </Stack>
          <Stack spacing={2}>
            <Text fontWeight="semibold">Veja também:</Text>
            <List styleType="disc" pl={6}>
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
                  to={`/faq/precisa-de-jejum-para-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Precisa de jejum para fazer ultrassonografia?
                </CLink>
              </ListItem>
              <ListItem>
                <CLink
                  as={RouterLink}
                  to={`/faq/pode-ter-relacao-antes-de-fazer-ultrassonografia`}
                  textDecoration="underline"
                >
                  Pode ter relação antes de fazer ultrassonografia?
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
