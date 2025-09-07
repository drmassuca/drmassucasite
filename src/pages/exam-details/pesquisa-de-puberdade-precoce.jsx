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

const PesquisaPuberdadePrecoce = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/pesquisa-de-puberdade-precoce';

  /* ➜ SEO */
  const title = 'Pesquisa de Puberdade Precoce – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom para pesquisa de puberdade precoce avalia útero, ovários e fluxo uterino em meninas. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Comprimento uterino e relação corpo/colo',
    'Volume ovariano e número de folículos',
    'Espessura do endométrio',
    'Avaliação Doppler das artérias uterinas',
  ];

  const preparoItens = [
    'Ingerir 500 ml – 1 L de água 1–2 h antes',
    'Não urinar até a realização do exame',
    'Roupas confortáveis facilitam o procedimento',
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
            name: 'Ultrassom Pesquisa de Puberdade Precoce',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/puberdade.webp',
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
            Pesquisa de Puberdade Precoce (Meninas)
          </Heading>

          <Image
            src="/img-exams-webp/puberdade.webp"
            alt="Pesquisa de Puberdade Precoce"
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
                Objetivo
              </Heading>
              <Text fontSize="lg">
                Avaliar sinais de ativação hormonal precoce em meninas por meio de ultrassom pélvico
                abdominal, medindo tamanho uterino, volume ovariano, espessura endometrial e fluxo
                uterino.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
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
                O exame costuma durar <strong>15 – 40 minutos</strong>, dependendo da quantidade de
                medidas e da cooperação da paciente.
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

export default PesquisaPuberdadePrecoce;
