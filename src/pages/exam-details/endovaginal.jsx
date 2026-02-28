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

const SLUG = 'endovaginal';

const Endovaginal = () => {
  const canonical = '/exames/endovaginal';
  const title = 'Endovaginal – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom endovaginal detalha útero, ovários e endométrio, auxiliando diagnósticos precisos em Itaberaí-GO com o Dr. Massuca.';

  const indicacoes = [
    'Miomas, pólipos e alterações uterinas',
    'Cistos, folículos ovarianos',
    'Suspeita de endometriose ou infertilidade',
    'Investigar sangramentos ou gestação inicial',
    'Posicionamento de DIU',
  ];
  const avaliacoes = [
    'Útero: cavidade, miométrio, pólipos',
    'Endométrio: espessura e textura',
    'Ovários: tamanho, cistos, folículos',
    'Colo do útero e trompas (se visualizadas)',
    'Fluxo vascular via Doppler (opcional)',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Endovaginal',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/pelvicofeminino.webp',
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
            Ultrassom Ginecológico – Endovaginal
          </Heading>

          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/pelvicofeminino.webp"
            alt="Ultrassom Endovaginal"
          />

          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Avaliação interna detalhada de útero, ovários, endométrio e colo por meio de sonda
                vaginal, com opção de Doppler para análise de lesões e fluxo sanguíneo.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Indicações
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {indicacoes.map((item, idx) => (
                  <ListItem key={idx}>• {item}</ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Geralmente não exige preparo; recomenda-se bexiga vazia. Para endometriose, pode ser
                necessário preparo intestinal.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>10 e 30 minutos</strong>, em média 15 min.
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

export default Endovaginal;
