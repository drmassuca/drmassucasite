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

function ViaAbdominal() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/via-abdominal';

  /* ➜ SEO */
  const title = 'Próstata (Via Abdominal) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom da próstata por via abdominal avalia volume, contornos e resíduo urinário em Itaberaí-GO, com o Dr. Massuca.';

  const avaliacoes = [
    'Tamanho e volume da próstata (cm³)',
    'Presença de nódulos, calcificações ou áreas heterogêneas',
    'Resíduo pós-miccional (urina após esvaziar a bexiga)',
    'Espessura e aspecto da bexiga',
    'Avaliação das vesículas seminais (quando visíveis)',
    'Monitoramento da hiperplasia prostática benigna (HPB)',
  ];

  return (
    <>
      {/* ➜ SEO base */}
      <SEO title={title} description={description} canonical={canonical} />

      {/* ➜ Schema.org – MedicalTest */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom da Próstata por Via Abdominal',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/prostata.webp',
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
            Ultrassom da Próstata por Via Abdominal
          </Heading>

          <Image
            src="/img-exams-webp/prostata.webp"
            alt="Ultrassom Próstata Via Abdominal"
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
                Avaliar a próstata por meio da bexiga cheia, observando volume, contornos e
                possíveis alterações estruturais. Método não invasivo indicado para triagem e
                acompanhamento de pacientes.
              </Text>
            </Box>

            {/* Preparo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Beber <strong>≈ 1 litro de água</strong> cerca de uma hora antes do exame e não
                urinar até a realização. A bexiga cheia garante melhor visualização.
              </Text>
            </Box>

            {/* Duração */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>10 – 20 minutos</strong>.
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

export default ViaAbdominal;
