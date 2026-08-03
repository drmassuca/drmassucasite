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

const SLUG = 'doppler-obstetrico';

const DopplerObstetrico = () => {
  const canonical = '/exames/doppler-obstetrico';
  const title = 'Doppler Obstétrico – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom Doppler Obstétrico avalia o fluxo sanguíneo entre mãe, placenta e bebê. Exame em Itaberaí-GO com Dr. Massuca.';

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Doppler Obstétrico',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/dopplerobstetrico.webp',
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
            Doppler Obstétrico
          </Heading>

          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/dopplerobstetrico.webp"
            alt="Doppler Obstétrico"
          />

          <VStack align="start" spacing={5}>
            <Text fontSize="lg">
              O <strong>Doppler Obstétrico</strong> é um exame de ultrassom que avalia o fluxo
              sanguíneo entre mãe, placenta e bebê. Ele analisa a circulação nas artérias uterinas,
              no cordão umbilical e em vasos fetais, como a artéria cerebral média e a aorta.
            </Text>
            <Text fontSize="lg">
              Essas informações mostram a oxigenação e a nutrição do bebê, ajudando a detectar
              precocemente situações como <strong>insuficiência placentária</strong>,{' '}
              <strong>restrição de crescimento intrauterino (RCIU)</strong> e risco para{' '}
              <strong>pré-eclâmpsia</strong>.
            </Text>
            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Indicações
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Gestantes com hipertensão, diabetes ou gemelaridade.</ListItem>
                <ListItem>• História de pré-eclâmpsia ou RCIU.</ListItem>
                <ListItem>• Suspeita de alterações do líquido amniótico.</ListItem>
                <ListItem>• Acompanhamento de condições clínicas específicas.</ListItem>
              </List>
            </Box>
            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Informações rápidas
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Duração:</strong> 15 – 30 min
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

export default DopplerObstetrico;
