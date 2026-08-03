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

const SLUG = 'ultrassonografia-de-tireoide-com-ou-sem-doppler';

function UltrassomTireoideComOuSemDoppler() {
  const canonical = '/exames/ultrassonografia-de-tireoide-com-ou-sem-doppler';
  const title = 'Tireoide (com ou sem Doppler) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom da tireoide com ou sem Doppler avalia nódulos, fluxo e linfonodos cervicais com precisão em Itaberaí-GO, Dr. Massuca.';

  const avaliacoes = [
    'Tamanho e volume da tireoide (lobos e istmo)',
    'Caracterização de nódulos: forma, margens, calcificações',
    'Vascularização de nódulos e parênquima (Doppler)',
    'Cistos, áreas hipoecogênicas e padrão inflamatório',
    'Linfonodos cervicais suspeitos',
    'Acompanhamento pós-cirurgia ou tratamentos',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom da Tireoide (com ou sem Doppler)',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/tireoide.webp',
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
            Ultrassom da Tireoide (com ou sem Doppler)
          </Heading>
          <ExamImage slug={SLUG} src="/img-exams-webp/tireoide.webp" alt="Ultrassom da Tireoide" />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar a glândula tireoide e estruturas cervicais adjacentes, identificando
                nódulos, doenças inflamatórias e alterações vasculares para auxiliar no diagnóstico
                e no acompanhamento clínico.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Com ou sem Doppler?
              </Heading>
              <Text fontSize="lg">
                O Doppler é utilizado em nódulos suspeitos, tireoidites ou para diferenciar padrões
                benignos e malignos, sendo definido pelo médico solicitante ou durante o exame.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não há preparo específico. Traga exames prévios da região, se houver, para
                comparação.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 25 minutos</strong>, podendo estender-se se incluir
                estudo Doppler detalhado.
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

export default UltrassomTireoideComOuSemDoppler;
