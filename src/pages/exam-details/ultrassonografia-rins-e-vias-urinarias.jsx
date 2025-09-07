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

function RinsEViasUrinarias() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/rins-e-vias-urinarias'; // mesmo slug usado na página de listagem

  /* ➜ SEO */
  const title = 'Rins e Vias Urinárias – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de rins e vias urinárias avalia cálculos, hidronefrose e bexiga com precisão em Itaberaí-GO, Dr. Massuca.';

  const avaliacoes = [
    'Rins: formato, tamanho, espessura cortical e ecotextura',
    'Presença de cálculos (litíase renal)',
    'Dilatação das vias urinárias (hidronefrose)',
    'Cistos, massas ou alterações estruturais',
    'Ureter proximal (quando visível)',
    'Bexiga: volume, forma e esvaziamento (resíduo pós-miccional)',
    'Inflamações ou infecções renais/urinárias',
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
            name: 'Ultrassom Rins e Vias Urinárias',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/viasurinarias.webp',
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
            Ultrassom dos Rins e Vias Urinárias
          </Heading>

          <Image
            src="/img-exams-webp/viasurinarias.webp"
            alt="Ultrassom Rins e Vias Urinárias"
            borderRadius="md"
            objectFit="contain"
            w="100%"
            maxH={{ base: '250px', md: '400px' }}
            mb={8}
            loading="lazy"
          />

          <VStack align="start" spacing={6}>
            {/* Objetivo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Investigar dor lombar, infecções urinárias, hipertensão, alterações de creatinina e
                sintomas urinários avaliando detalhadamente rins, ureteres proximais e bexiga.
              </Text>
            </Box>

            {/* Preparo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Ingerir cerca de <strong>1 L de água</strong> uma hora antes do exame e não urinar.
                A bexiga cheia melhora a visualização das vias urinárias.
              </Text>
            </Box>

            {/* Duração */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>15 e 25 minutos</strong>, conforme complexidade.
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

export default RinsEViasUrinarias;
