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

const SLUG = 'parede-abdominal';

function ParedeAbdominal() {
  const canonical = '/exames/parede-abdominal';
  const title = 'Parede Abdominal – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom da parede abdominal avalia hérnias, músculos e fáscias, auxiliando diagnósticos precisos em Itaberaí-GO com o Dr. Massuca.';

  const avaliacoes = [
    'Hérnias abdominais (umbilicais, inguinais, incisionais, etc.)',
    'Espessura e integridade dos músculos da parede abdominal',
    'Presença de hematomas, massas, cistos ou coleções líquidas',
    'Avaliação de processos inflamatórios localizados',
    'Controle de pós-operatórios e dor localizada',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Parede Abdominal',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/parede.webp',
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
            Ultrassom da Parede Abdominal
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/parede.webp"
            alt="Ultrassom Parede Abdominal"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar músculos, fáscias e camadas superficiais para investigação de dor, nódulos,
                hérnias ou acompanhamento pós-operatório.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não há preparo específico. Use roupas que facilitem a exposição do abdome.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>10 e 20 minutos</strong>.
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
          <ExamCTA slug={SLUG} />
          <ExamRelated slug={SLUG} />
        </Box>
      </Box>
    </>
  );
}

export default ParedeAbdominal;
