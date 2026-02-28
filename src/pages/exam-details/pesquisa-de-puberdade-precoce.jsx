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

const SLUG = 'pesquisa-de-puberdade-precoce';

const PesquisaPuberdadePrecoce = () => {
  const canonical = '/exames/pesquisa-de-puberdade-precoce';
  const title = 'Pesquisa de Puberdade Precoce – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom para pesquisa de puberdade precoce avalia útero, ovários e fluxo uterino em meninas. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Comprimento uterino e relação corpo/colo',
    'Volume ovariano e número de folículos',
    'Espessura do endométrio',
    'Avaliação Doppler das artérias uterinas',
  ];
  const preparoItens = [
    'Ingerir 500 ml – 1 L de água 1–2 h antes',
    'Não urinar até a realização do exame',
    'Roupas confortáveis facilitam o procedimento',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Pesquisa de Puberdade Precoce',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/puberdade.webp',
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
            Pesquisa de Puberdade Precoce (Meninas)
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/puberdade.webp"
            alt="Pesquisa de Puberdade Precoce"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo
              </Heading>
              <Text fontSize="lg">
                Avaliar sinais de ativação hormonal precoce em meninas por meio de ultrassom pélvico
                abdominal, medindo tamanho uterino, volume ovariano, espessura endometrial e fluxo
                uterino.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
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
                O exame costuma durar <strong>15 – 40 minutos</strong>, dependendo da quantidade de
                medidas e da cooperação da paciente.
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

export default PesquisaPuberdadePrecoce;
