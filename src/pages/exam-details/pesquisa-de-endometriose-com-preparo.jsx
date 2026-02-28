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

const SLUG = 'pesquisa-de-endometriose-com-preparo';

const PesquisaEndometrioseComPreparo = () => {
  const canonical = '/exames/pesquisa-de-endometriose-com-preparo';
  const title = 'Pesquisa de Endometriose (com preparo) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom transvaginal com preparo intestinal para mapeamento de endometriose profunda em Itaberaí-GO com o Dr. Massuca.';

  const avaliacoes = [
    'Ovários, útero, trompas e endométrio',
    'Lesões intestinais (reto-sigmoide), retrocervicais e pélvicas',
    'Bexiga, aderências e corpo lúteo',
    'Avaliação da profundidade e vascularização das lesões',
  ];
  const preparoItens = [
    'Dieta pobre em resíduos no dia anterior',
    'Jejum de 4–6 h no dia do exame',
    'Uso de laxativo na véspera',
    'Entre em contato para protocolo individualizado',
    'Bexiga cheia em protocolos específicos',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom – Pesquisa de Endometriose com Preparo',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/endometriose.webp',
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
            Pesquisa de Endometriose (com preparo)
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/endometriose.webp"
            alt="Pesquisa de Endometriose"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Ultrassom transvaginal com preparo intestinal para mapear focos de endometriose
                profunda em intestino, bexiga, trompas e ovários, avaliando extensão e
                vascularização das lesões.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo para o exame
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {preparoItens.map((item, idx) => (
                  <ListItem key={idx}>• {item}</ListItem>
                ))}
              </List>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                O exame leva em média <strong>40–60 minutos</strong>, podendo chegar a 2 h conforme
                a complexidade dos achados.
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

export default PesquisaEndometrioseComPreparo;
