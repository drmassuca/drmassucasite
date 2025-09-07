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

const MonitoracaoOvulacao = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/monitorizacao-da-ovulacao';

  /* ➜ SEO */
  const title = 'Monitorização da Ovulação – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom para monitorização da ovulação acompanha folículos e endométrio ao longo do ciclo. Exame em Itaberaí-GO com o Dr. Massuca.';

  return (
    <>
      {/* SEO base */}
      <SEO title={title} description={description} canonical={canonical} />

      {/* Schema.org – MedicalTest (sem alumniOf) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom – Monitorização da Ovulação',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/monitorizacao.webp',
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
            Monitorização da Ovulação
          </Heading>

          <Image
            src="/img-exams-webp/monitorizacao.webp"
            alt="Monitorização da Ovulação"
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
                Série de ultrassons transvaginais realizadas ao longo do ciclo para acompanhar o
                crescimento folicular, identificar o folículo dominante e sua ruptura (ovulação),
                além de avaliar endométrio e formação do corpo lúteo.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Quando realizar
              </Heading>
              <Text fontSize="lg">
                Geralmente inicia entre o <strong>10º e 12º dia</strong> do ciclo menstrual, com{' '}
                <strong>3 a 4 exames</strong> em dias alternados durante o mesmo ciclo.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Indicações
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Indução da ovulação (medicações hormonais)</ListItem>
                <ListItem>• Investigação de infertilidade e ciclos irregulares</ListItem>
                <ListItem>• Planejamento reprodutivo: inseminação ou FIV</ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Folículos ovarianos:</strong> crescimento de ~2 mm/dia até ruptura (±18 –
                  27 mm)
                </ListItem>
                <ListItem>
                  <strong>Endométrio:</strong> espessura ideal entre 7 – 15 mm
                </ListItem>
                <ListItem>
                  <strong>Corpo lúteo:</strong> detectável após o rompimento folicular
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo para o exame
              </Heading>
              <Text fontSize="lg">
                Sem preparo especial. Recomenda-se vir com a bexiga vazia para maior conforto e
                melhor visualização.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração aproximada
              </Heading>
              <Text fontSize="lg">
                De 10 a 15 minutos por sessão, repetidas conforme necessidade clínica.
              </Text>
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

export default MonitoracaoOvulacao;
