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

const SLUG = 'total';

function Total() {
  const canonical = '/exames/total';
  const title = 'Abdome Total – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de abdome total avalia fígado, vesícula, rins, pâncreas e pelve em um único exame. Atendimento em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Fígado, vias biliares e vesícula biliar',
    'Pâncreas e baço',
    'Rins, bexiga e vias urinárias',
    'Aorta abdominal e veia cava inferior',
    'Paredes e musculatura abdominal',
    'Pesquisa de líquidos livres ou massas',
    'Volume de líquido urinário',
    'Pelve: útero e ovários (se necessário)',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Abdome Total',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/abdometotal.webp',
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
            Ultrassom de Abdome Total
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/abdometotal.webp"
            alt="Ultrassom de Abdome Total"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar todos os órgãos do abdome superior e inferior em um único estudo, permitindo
                rastreio de cálculos, tumores, inflamações e controle de doenças crônicas.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Jejum de <strong>6 – 8 horas</strong>. Se houver avaliação de pelve, beber
                aproximadamente 1 litro de água uma hora antes e não urinar.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>20 e 30 minutos</strong>, variando conforme a complexidade de cada
                paciente.
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

export default Total;
