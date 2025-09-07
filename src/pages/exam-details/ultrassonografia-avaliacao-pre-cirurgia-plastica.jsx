import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function AvaliacaoPreCirurgiaPlastica() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/avaliacao-pre-cirurgia-plastica';

  /* ➜ SEO */
  const title = 'Avaliação Pré Cirurgia Plástica – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom para avaliação pré-cirurgia plástica mapeia gordura, músculos e hérnias, garantindo planejamento seguro em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Mapeamento da espessura da gordura subcutânea',
    'Análise da musculatura da parede abdominal (retos, transverso, oblíquos)',
    'Detecção de hérnias ou alterações anatômicas relevantes',
    'Identificação de lipomas ou massas subcutâneas ocultas',
    'Documentação de assimetrias ou condições pré-existentes',
    'Avaliação de seromas, hematomas ou fibroses em pós-operatório',
  ];

  const importante = [
    'Exame personalizado conforme solicitação do cirurgião plástico.',
    'Podem ser avaliadas diversas regiões corporais.',
    'Entre em contato antecipadamente para alinhamento e orçamento.',
  ];

  return (
    <>
      {/* SEO base */}
      <SEO title={title} description={description} canonical={canonical} />

      {/* Schema.org – MedicalTest */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Avaliação Pré Cirurgia Plástica',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/cirurgiaplastica.webp',
            about: {
              '@type': 'Person',
              name: 'Dr. Antonio Massucatti Neto',
              medicalSpecialty: 'Ultrassom',
            },
          })}
        </script>
      </Helmet>

      {/* Conteúdo -------------------------------------------------------------- */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl' }}
            textAlign="center"
            mb={6}
            textShadow="1px 1px 2px rgba(0,0,0,0.2)"
          >
            Ultrassom para Avaliação Pré-Cirurgia Plástica
          </Heading>

          <Image
            src="/img-exams-webp/cirurgiaplastica.webp"
            alt="Ultrassom Avaliação Pré Cirurgia Plástica"
            borderRadius="md"
            objectFit="contain"
            objectPosition="center"
            w="100%"
            h={{ base: '200px', md: '300px' }}
            mb={8}
            bg="white"
            loading="lazy"
          />

          <VStack align="start" spacing={6}>
            {/* Objetivo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Fornecer ao cirurgião plástico informações detalhadas sobre estruturas subcutâneas,
                musculares e possíveis hérnias, aumentando a segurança e previsibilidade do
                procedimento estético.
              </Text>
            </Box>

            {/* Importante */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Importante saber
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {importante.map((item, idx) => (
                  <ListItem key={idx}>• {item}</ListItem>
                ))}
              </List>
            </Box>

            {/* Preparo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Geralmente sem preparo. Caso o cirurgião solicite algo específico, orientaremos
                previamente.
              </Text>
            </Box>

            {/* Duração */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>20 e 40 minutos</strong>, variando conforme a extensão das áreas
                avaliadas.
              </Text>
            </Box>

            {/* Avaliado */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {avaliacoes.map((item, idx) => (
                  <ListItem key={idx}>• {item}</ListItem>
                ))}
              </List>
            </Box>
          </VStack>

          {/* Botões -------------------------------------------------------------- */}
          <HStack justify="center" spacing={4} mt={10}>
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="green"
            >
              Falar com a equipe
            </Button>
            <Button as={RouterLink} to="/exames" variant="outline" colorScheme="gray">
              Voltar aos exames
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default AvaliacaoPreCirurgiaPlastica;
