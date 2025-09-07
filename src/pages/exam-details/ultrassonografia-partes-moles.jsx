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

function PartesMoles() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/ultrassonografia-partes-moles'; // rota já existente

  /* ➜ SEO */
  const title = 'Partes Moles – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de partes moles avalia nódulos, hérnias e glândulas superficiais com alta precisão em Itaberaí-GO, Dr. Massuca.';

  const avaliacoes = [
    'Nódulos superficiais (lipomas, cistos, abscessos)',
    'Hematomas ou coleções líquidas',
    'Glândulas (parótida, submandibular, axilares, inguinais)',
    'Avaliação de linfonodos suspeitos',
    'Lesões traumáticas ou inflamatórias',
    'Hérnias em parede abdominal, virilha ou cicatrizes',
    'Acompanhamento de massas de crescimento progressivo',
    'Controle de pós-operatório ou punções guiadas',
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
            name: 'Ultrassom de Partes Moles',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/partesmoles.webp',
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
            Ultrassom de Partes Moles
          </Heading>

          <Image
            src="/img-exams-webp/partesmoles.webp"
            alt="Ultrassom de Partes Moles"
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
                Avaliar tecidos moles como pele, subcutâneo, musculatura superficial, glândulas e
                linfonodos — ideal para investigação de caroços, dores localizadas, traumas ou
                infecções.
              </Text>
            </Box>

            {/* Preparo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Sem preparo específico. Leve encaminhamento médico com a descrição da região a ser
                examinada.
              </Text>
            </Box>

            {/* Duração */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 25 minutos</strong>, dependendo do número de regiões
                avaliadas.
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

export default PartesMoles;
