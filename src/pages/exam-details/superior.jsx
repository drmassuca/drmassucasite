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

const SLUG = 'superior';

function Superior() {
  const canonical = '/exames/superior';
  const title = 'Abdome Superior – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de abdome superior avalia fígado, vesícula, pâncreas, baço e grandes vasos com precisão em Itaberaí-GO.';

  const avaliacoes = [
    'Fígado: textura, contornos, lesões e esteatose',
    'Vesícula biliar e vias biliares: cálculos e espessamentos',
    'Pâncreas: inflamações, massas e alterações de textura',
    'Baço: tamanho e alterações estruturais',
    'Rins: avaliação anatômica inicial',
    'Aorta abdominal e veia cava inferior',
    'Paredes e musculatura abdominal',
    'Pesquisa de líquidos livres ou massas',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Abdome Superior',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/abdomesup.webp',
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
            Ultrassom de Abdome Superior
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/abdomesup.webp"
            alt="Ultrassom Abdome Superior"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar os principais órgãos do abdome superior para investigação de dor abdominal,
                alterações hepáticas, pancreáticas, vesiculares ou esplênicas, além de rastrear
                massas e líquidos livres.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Jejum de <strong>6 a 8 horas</strong>. Evitar alimentos gordurosos e bebidas
                gaseificadas na véspera. Pequenas quantidades de água são permitidas.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Em média <strong>15 a 25 minutos</strong>.
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

export default Superior;
