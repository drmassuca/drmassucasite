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

const SLUG = 'monitorizacao-da-ovulacao';

const MonitoracaoOvulacao = () => {
  const canonical = '/exames/monitorizacao-da-ovulacao';
  const title = 'Monitorização da Ovulação – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom para monitorização da ovulação acompanha folículos e endométrio ao longo do ciclo. Exame em Itaberaí-GO com o Dr. Massuca.';

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom – Monitorização da Ovulação',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/monitorizacao.webp',
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
            Monitorização da Ovulação
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/monitorizacao.webp"
            alt="Monitorização da Ovulação"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Série de ultrassons transvaginais realizadas ao longo do ciclo para acompanhar o
                crescimento folicular, identificar o folículo dominante e sua ruptura (ovulação),
                além de avaliar endométrio e formação do corpo lúteo.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Quando realizar
              </Heading>
              <Text fontSize="lg">
                Geralmente inicia entre o <strong>10º e 12º dia</strong> do ciclo menstrual, com{' '}
                <strong>3 a 4 exames</strong> em dias alternados durante o mesmo ciclo.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Indicações
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Indução da ovulação (medicações hormonais)</ListItem>
                <ListItem>• Investigação de infertilidade e ciclos irregulares</ListItem>
                <ListItem>• Planejamento reprodutivo: inseminação ou FIV</ListItem>
              </List>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Folículos ovarianos:</strong> crescimento de ~2 mm/dia até ruptura (±18 –
                  27 mm)
                </ListItem>
                <ListItem>
                  <strong>Endométrio:</strong> espessura ideal entre 7 – 15 mm
                </ListItem>
                <ListItem>
                  <strong>Corpo lúteo:</strong> detectável após o rompimento folicular
                </ListItem>
              </List>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo para o exame
              </Heading>
              <Text fontSize="lg">
                Sem preparo especial. Recomenda-se vir com a bexiga vazia para maior conforto e
                melhor visualização.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração aproximada
              </Heading>
              <Text fontSize="lg">
                De 10 a 15 minutos por sessão, repetidas conforme necessidade clínica.
              </Text>
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

export default MonitoracaoOvulacao;
