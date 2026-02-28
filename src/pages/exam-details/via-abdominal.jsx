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

const SLUG = 'via-abdominal';

function ViaAbdominal() {
  const canonical = '/exames/via-abdominal';
  const title = 'Próstata (Via Abdominal) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom da próstata por via abdominal avalia volume, contornos e resíduo urinário em Itaberaí-GO, com o Dr. Massuca.';

  const avaliacoes = [
    'Tamanho e volume da próstata (cm³)',
    'Presença de nódulos, calcificações ou áreas heterogêneas',
    'Resíduo pós-miccional (urina após esvaziar a bexiga)',
    'Espessura e aspecto da bexiga',
    'Avaliação das vesículas seminais (quando visíveis)',
    'Monitoramento da hiperplasia prostática benigna (HPB)',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom da Próstata por Via Abdominal',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/prostata.webp',
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
            Ultrassom da Próstata por Via Abdominal
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/prostata.webp"
            alt="Ultrassom Próstata Via Abdominal"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar a próstata por meio da bexiga cheia, observando volume, contornos e
                possíveis alterações estruturais. Método não invasivo indicado para triagem e
                acompanhamento de pacientes.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Beber <strong>≈ 1 litro de água</strong> cerca de uma hora antes do exame e não
                urinar até a realização. A bexiga cheia garante melhor visualização.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>10 – 20 minutos</strong>.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {avaliacoes.map(item => (
                  <ListItem key={item}>• {item}</ListItem>
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

export default ViaAbdominal;
