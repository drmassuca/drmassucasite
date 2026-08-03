import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import {
  ExamBreadcrumb,
  ExamImage,
  ExamFAQ,
  ExamRelated,
  ExamCTA,
  ExamCredentialBadge,
} from '../../components/exam';

const SLUG = 'ultrassonografia-avaliacao-pre-cirurgia-plastica';

function AvaliacaoPreCirurgiaPlastica() {
  const canonical = '/exames/avaliacao-pre-cirurgia-plastica';
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
      <SEO title={title} description={description} canonical={canonical} />
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

      <Box maxW="900px" mx="auto" px={4} py={10}>
        <ExamBreadcrumb slug={SLUG} />
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
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/cirurgiaplastica.webp"
            alt="Ultrassom Avaliação Pré Cirurgia Plástica"
          />
          <VStack align="start" spacing={6}>
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
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Geralmente sem preparo. Caso o cirurgião solicite algo específico, orientaremos
                previamente.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>20 e 40 minutos</strong>, variando conforme a extensão das áreas
                avaliadas.
              </Text>
            </Box>
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
          <ExamCredentialBadge />
          <ExamFAQ slug={SLUG} />
          <ExamCTA slug={SLUG} ctaLabel="Falar com a equipe" />
          <ExamRelated slug={SLUG} />
        </Box>
      </Box>
    </>
  );
}

export default AvaliacaoPreCirurgiaPlastica;
