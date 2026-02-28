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

const SLUG = 'transfontanela';

const Transfontanela = () => {
  const canonical = '/exames/transfontanela';
  const title = 'Transfontanela – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom transfontanelar avalia cérebro de recém-nascidos, detectando hemorragias e hidrocefalia. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Parênquima cerebral e hemisférios',
    'Sistema ventricular e coleções',
    'Cerebelo e fossa posterior',
    'Fluxo vascular via Doppler (quando indicado)',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Transfontanelar',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/transfontanela.webp',
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
            Ultrassom Transfontanelar
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/transfontanela.webp"
            alt="Ultrassom Transfontanelar"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Avaliar o cérebro de recém-nascidos através da fontanela anterior, identificando
                hemorragias, malformações, hidrocefalia e condições que exigem seguimento
                neurológico.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não necessita preparo. O bebê pode estar acordado, dormindo ou amamentando. Chegue
                com 10 minutos de antecedência.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 40 minutos</strong>, conforme colaboração do paciente e
                necessidade de Doppler.
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
};

export default Transfontanela;
