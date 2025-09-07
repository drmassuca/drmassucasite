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

function BolsaEscrotalETesticulos() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/bolsa-escrotal-e-testiculos';

  /* ➜ SEO */
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
      {/* SEO base */}
      <SEO title={title} description={description} canonical={canonical} />

      {/* Schema.org – MedicalTest */}
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

      {/* Conteúdo -------------------------------------------------------------- */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
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

          <Image
            src="/img-exams-webp/testiculos.webp"
            alt="Ultrassom Bolsa Escrotal e Testículos"
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
            {/* Objetivo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar estruturas escrotais para investigação de dor, inchaço, trauma,
                infertilidade ou suspeita de torção, com ou sem Doppler conforme indicação clínica.
              </Text>
            </Box>

            {/* Preparo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não há preparo específico. Recomenda-se higiene íntima adequada no dia do exame.
              </Text>
            </Box>

            {/* Duração */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 30 minutos</strong>, podendo variar com inclusão de
                Doppler.
              </Text>
            </Box>

            {/* Avaliado */}
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

          {/* Botões -------------------------------------------------------------- */}
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

export default BolsaEscrotalETesticulos;
