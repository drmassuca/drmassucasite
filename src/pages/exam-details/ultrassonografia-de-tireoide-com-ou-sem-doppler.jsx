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

function UltrassomTireoideComOuSemDoppler() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/ultrassonografia-de-tireoide-com-ou-sem-doppler';

  /* ➜ SEO */
  const title = 'Tireoide (com ou sem Doppler) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom da tireoide com ou sem Doppler avalia nódulos, fluxo e linfonodos cervicais com precisão em Itaberaí-GO, Dr. Massuca.';

  const avaliacoes = [
    'Tamanho e volume da tireoide (lobos e istmo)',
    'Caracterização de nódulos: forma, margens, calcificações',
    'Vascularização de nódulos e parênquima (Doppler)',
    'Cistos, áreas hipoecogênicas e padrão inflamatório',
    'Linfonodos cervicais suspeitos',
    'Acompanhamento pós-cirurgia ou tratamentos',
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
            name: 'Ultrassom da Tireoide (com ou sem Doppler)',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/tireoide.webp',
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
            Ultrassom da Tireoide (com ou sem Doppler)
          </Heading>

          <Image
            src="/img-exams-webp/tireoide.webp"
            alt="Ultrassom da Tireoide"
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
                Avaliar a glândula tireoide e estruturas cervicais adjacentes, identificando
                nódulos, doenças inflamatórias e alterações vasculares para auxiliar no diagnóstico
                e no acompanhamento clínico.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Com ou sem Doppler?
              </Heading>
              <Text fontSize="lg">
                O Doppler é utilizado em nódulos suspeitos, tireoidites ou para diferenciar padrões
                benignos e malignos, sendo definido pelo médico solicitante ou durante o exame.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não há preparo específico. Traga exames prévios da região, se houver, para
                comparação.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>15 – 25 minutos</strong>, podendo estender-se se incluir
                estudo Doppler detalhado.
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

export default UltrassomTireoideComOuSemDoppler;
