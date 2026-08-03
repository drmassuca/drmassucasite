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

const SLUG = 'ultrassonografia-cervical-com-ou-sem-doppler';

function UltrassomCervicalComOuSemDoppler() {
  const canonical = '/exames/ultrassonografia-cervical-com-ou-sem-doppler';
  const title = 'Cervical (com ou sem Doppler) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom cervical com ou sem Doppler avalia linfonodos, glândulas salivares e massas do pescoço. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Presença de linfonodos cervicais aumentados ou alterados',
    'Diferenciação entre linfonodos inflamatórios e suspeitos',
    'Glândulas salivares (parótida e submandibular)',
    'Músculos cervicais e estruturas adjacentes',
    'Pesquisas de massas ou lesões cervicais palpáveis',
    'Estudo do fluxo sanguíneo (com Doppler) em inflamações ou massas',
    'Documentação de alterações pós-operatórias ou pós-radioterapia',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Cervical (com ou sem Doppler)',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/cervical.webp',
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
            Ultrassom Cervical (com ou sem Doppler)
          </Heading>
          <ExamImage slug={SLUG} src="/img-exams-webp/cervical.webp" alt="Ultrassom Cervical" />
          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar estruturas cervicais superficiais — linfonodos, glândulas salivares e massas
                — podendo incluir Doppler para estudo de vascularização quando necessário.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Com ou sem Doppler?
              </Heading>
              <Text fontSize="lg">
                O Doppler é indicado em inflamações, linfonodos suspeitos ou para caracterizar o
                fluxo sanguíneo de massas. A decisão pode ser prévia ou tomada durante o exame.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não há preparo específico. Traga exames anteriores da região para comparação, se
                disponíveis.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Cerca de <strong>15 – 25 minutos</strong>, variando com laudos Doppler e
                complexidade dos achados.
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

export default UltrassomCervicalComOuSemDoppler;
