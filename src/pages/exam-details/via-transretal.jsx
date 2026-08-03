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

const SLUG = 'via-transretal';

function ViaTransretal() {
  const canonical = '/exames/via-transretal';
  const title = 'Próstata (Via Transretal) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom transretal da próstata avalia nódulos e guia biópsias com alta precisão. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Volume e morfologia da próstata com alta resolução',
    'Avaliação das zonas periférica, central e transicional',
    'Detecção de nódulos suspeitos ou lesões focais',
    'Planejamento e guia para biópsia prostática',
    'Aspecto das vesículas seminais e sua simetria',
    'Diferenciação entre HPB e neoplasia',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom da Próstata por Via Transretal',
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
            Ultrassom da Próstata por Via Transretal
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/prostata.webp"
            alt="Ultrassom Próstata Transretal"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar a próstata com alta precisão através do reto, identificando alterações
                estruturais, nódulos suspeitos e fornecendo suporte à realização de biópsias
                direcionadas.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Realizar <strong>lavagem intestinal</strong> (enema) no dia do exame, conforme
                orientação médica. Evitar evacuação após o preparo.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                De <strong>15 a 30 minutos</strong>, podendo se estender em casos de biópsia.
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

export default ViaTransretal;
