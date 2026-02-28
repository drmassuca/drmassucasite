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

const SLUG = 'ultrassonografia-bolsa-escrotal-e-testiculos';

function BolsaEscrotalETesticulos() {
  const canonical = '/exames/bolsa-escrotal-e-testiculos';
  const title = 'Bolsa Escrotal e Testículos – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom da bolsa escrotal avalia testículos, epidídimos, varicocele e torção com precisão. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Testículos: tamanho, ecotextura e presença de nódulos',
    'Epidídimos: alterações inflamatórias ou cistos',
    'Hidrocele: líquido na bolsa escrotal',
    'Varicocele: dilatação venosa (com Doppler)',
    'Torção testicular: fluxo e morfologia',
    'Hematomas, tumores ou lesões pós-trauma',
    'Aspectos anatômicos da bolsa escrotal',
    'Fluxo sanguíneo testicular (Doppler, se solicitado)',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Bolsa Escrotal e Testículos',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/testiculos.webp',
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
            Ultrassom da Bolsa Escrotal e Testículos
          </Heading>
          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/testiculos.webp"
            alt="Ultrassom Bolsa Escrotal e Testículos"
          />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar estruturas escrotais para investigação de dor, inchaço, trauma,
                infertilidade ou suspeita de torção, com ou sem Doppler conforme indicação clínica.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não há preparo específico. Recomenda-se higiene íntima adequada no dia do exame.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 30 minutos</strong>, podendo variar com inclusão de
                Doppler.
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

export default BolsaEscrotalETesticulos;
