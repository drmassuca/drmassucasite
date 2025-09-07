import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

function UltrassomCervicalComOuSemDoppler() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/ultrassonografia-cervical-com-ou-sem-doppler';

  /* ➜ SEO */
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
      {/* SEO base */}
      <SEO title={title} description={description} canonical={canonical} />

      {/* Schema.org – MedicalTest */}
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

      {/* Conteúdo ---------------------------------------------------------------- */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
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

          <Image
            src="/img-exams-webp/cervical.webp"
            alt="Ultrassom Cervical"
            borderRadius="md"
            objectFit="contain"
            objectPosition="center"
            w="100%"
            h={{ base: '200px', md: '300px' }}
            mb={8}
            bg="white"
            loading="lazy"
          />

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

          {/* Botões ---------------------------------------------------------------- */}
          <HStack justify="center" spacing={4} mt={10}>
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="green"
            >
              Agendar exame
            </Button>
            <Button as={RouterLink} to="/exames" variant="outline" colorScheme="gray">
              Voltar aos exames
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
}

export default UltrassomCervicalComOuSemDoppler;
