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

const Transfontanela = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/transfontanela';

  /* ➜ SEO */
  const title = 'Transfontanela – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom transfontanelar avalia cérebro de recém-nascidos, detectando hemorragias e hidrocefalia. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Parênquima cerebral e hemisférios',
    'Sistema ventricular e coleções',
    'Cerebelo e fossa posterior',
    'Fluxo vascular via Doppler (quando indicado)',
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
            name: 'Ultrassom Transfontanelar',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/transfontanela.webp',
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
            Ultrassom Transfontanelar
          </Heading>

          <Image
            src="/img-exams-webp/transfontanela.webp"
            alt="Ultrassom Transfontanelar"
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
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Avaliar o cérebro de recém-nascidos através da fontanela anterior, identificando
                hemorragias, malformações, hidrocefalia e condições que exigem seguimento
                neurológico.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não necessita preparo. O bebê pode estar acordado, dormindo ou amamentando. Chegue
                com 10 minutos de antecedência.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 40 minutos</strong>, conforme colaboração do paciente e
                necessidade de Doppler.
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
};

export default Transfontanela;
