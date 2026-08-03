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

const SLUG = 'pelvico-via-abdominal';

function PelvicoViaAbdominal() {
  const canonical = '/exames/pelvico-via-abdominal';
  const title = 'Pélvico Via Abdominal – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom pélvico via abdominal avalia útero, ovários e bexiga com clareza e segurança. Exame em Itaberaí-GO com o Dr. Massuca.';

  const avaliacoes = [
    'Útero: tamanho, forma e miométrio',
    'Ovários: cistos, folículos, textura',
    'Bexiga: volume, espessura e posição',
    'Presença de DIU, pólipos ou massas',
    'Fluxo uterino via Doppler (quando indicado)',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Pélvico Via Abdominal',
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
            Ultrassom Pélvico – Via Abdominal
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/pelvicofeminino.webp"
            alt="Ultrassom Pélvico Via Abdominal"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Exame não invasivo que avalia, pela via abdominal, as estruturas pélvicas femininas
                — útero, ovários e bexiga — auxiliando no diagnóstico de miomas, cistos, pólipos,
                endometriose, posicionamento de DIU, entre outros.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Ingerir <strong>500 ml a 1 L de água</strong> 1–2 h antes e evitar urinar, a fim de
                manter a bexiga cheia e melhorar a qualidade das imagens.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>15 e 30 minutos</strong>; pode se estender a até 60 min se incluir
                avaliação Doppler.
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

export default PelvicoViaAbdominal;
