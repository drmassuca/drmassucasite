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

function Superior() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/superior';

  /* ➜ SEO */
  const title = 'Abdome Superior – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de abdome superior avalia fígado, vesícula, pâncreas, baço e grandes vasos com precisão em Itaberaí-GO.';

  const avaliacoes = [
    'Fígado: textura, contornos, lesões e esteatose',
    'Vesícula biliar e vias biliares: cálculos e espessamentos',
    'Pâncreas: inflamações, massas e alterações de textura',
    'Baço: tamanho e alterações estruturais',
    'Rins: avaliação anatômica inicial',
    'Aorta abdominal e veia cava inferior',
    'Paredes e musculatura abdominal',
    'Pesquisa de líquidos livres ou massas',
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
            name: 'Ultrassom Abdome Superior',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/abdomesup.webp',
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
            Ultrassom de Abdome Superior
          </Heading>

          <Image
            src="/img-exams-webp/abdomesup.webp"
            alt="Ultrassom Abdome Superior"
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
                Avaliar os principais órgãos do abdome superior para investigação de dor abdominal,
                alterações hepáticas, pancreáticas, vesiculares ou esplênicas, além de rastrear
                massas e líquidos livres.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Jejum de <strong>6 a 8 horas</strong>. Evitar alimentos gordurosos e bebidas
                gaseificadas na véspera. Pequenas quantidades de água são permitidas.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Em média <strong>15 a 25 minutos</strong>.
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
}

export default Superior;
