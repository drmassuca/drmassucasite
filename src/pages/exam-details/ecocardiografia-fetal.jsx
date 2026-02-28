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

const SLUG = 'ecocardiografia-fetal';

const EcocardiografiaFetal = () => {
  const canonical = '/exames/ecocardiografia-fetal';
  const title = 'Ecocardiografia Fetal – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom Ecocardiografia Fetal avalia a estrutura e circulação do coração do bebê com alta precisão. Exame em Itaberaí-GO, Dr. Massuca.';

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Ecocardiografia Fetal',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/ecocardiografia_fetal.webp',
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
            Ecocardiografia Fetal
          </Heading>

          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/ecocardiografia_fetal.webp"
            alt="Ecocardiografia Fetal"
          />

          <VStack align="start" spacing={5}>
            <Text fontSize="lg">
              A <strong>Ecocardiografia Fetal</strong> é um exame de ultrassom especializado que
              avalia, de forma detalhada, a estrutura, função e circulação do coração do bebê,
              utilizando imagens bidimensionais e Doppler colorido.
            </Text>
            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Quando é realizado
              </Heading>
              <Text fontSize="lg">
                Recomendado entre a <strong>20ª e a 30ª semanas</strong> de gestação, podendo ser
                solicitado em outras fases conforme indicação médica.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Indicações
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Suspeita de cardiopatia fetal ou malformação cardíaca.</ListItem>
                <ListItem>• Histórico familiar de cardiopatias congênitas.</ListItem>
                <ListItem>
                  • Alterações no ritmo fetal ou condições maternas específicas (diabetes, lúpus,
                  uso de medicação, etc.).
                </ListItem>
                <ListItem>
                  • Parte complementar do pré-natal, inclusive em gestações de baixo risco.
                </ListItem>
              </List>
            </Box>
            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Informações rápidas
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Duração:</strong> 30 – 60 min
                </ListItem>
                <ListItem>
                  <strong>Preparo:</strong> Não há
                </ListItem>
              </List>
            </Box>
          </VStack>

          <ExamCredentialBadge variant="obstetric" />
          <ExamFAQ slug={SLUG} />
          <ExamCTA slug={SLUG} />
          <ExamRelated slug={SLUG} />
        </Box>
      </Box>
    </>
  );
};

export default EcocardiografiaFetal;
