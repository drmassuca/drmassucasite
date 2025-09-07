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

const PesquisaEndometrioseComPreparo = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/pesquisa-de-endometriose-com-preparo';

  /* ➜ SEO */
  const title = 'Pesquisa de Endometriose (com preparo) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom transvaginal com preparo intestinal para mapeamento de endometriose profunda em Itaberaí-GO com o Dr. Massuca.';

  /* Listas de conteúdo */
  const avaliacoes = [
    'Ovários, útero, trompas e endométrio',
    'Lesões intestinais (reto-sigmoide), retrocervicais e pélvicas',
    'Bexiga, aderências e corpo lúteo',
    'Avaliação da profundidade e vascularização das lesões',
  ];

  const preparoItens = [
    'Dieta pobre em resíduos no dia anterior',
    'Jejum de 4–6 h no dia do exame',
    'Uso de laxativo na véspera',
    'Entre em contato para protocolo individualizado',
    'Bexiga cheia em protocolos específicos',
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
            name: 'Ultrassom – Pesquisa de Endometriose com Preparo',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/endometriose.webp',
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
            Pesquisa de Endometriose (com preparo)
          </Heading>

          <Image
            src="/img-exams-webp/endometriose.webp"
            alt="Pesquisa de Endometriose"
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
                Ultrassom transvaginal com preparo intestinal para mapear focos de endometriose
                profunda em intestino, bexiga, trompas e ovários, avaliando extensão e
                vascularização das lesões.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo para o exame
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {preparoItens.map((item, idx) => (
                  <ListItem key={idx}>• {item}</ListItem>
                ))}
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                O exame leva em média <strong>40–60 minutos</strong>, podendo chegar a 2 h conforme
                a complexidade dos achados.
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

export default PesquisaEndometrioseComPreparo;
