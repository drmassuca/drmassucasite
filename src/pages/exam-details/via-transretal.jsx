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

function ViaTransretal() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/via-transretal';

  /* ➜ SEO */
  const title = 'Próstata (Via Transretal) – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom transretal da próstata avalia nódulos e guia biópsias com alta precisão. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Volume e morfologia da próstata com alta resolução',
    'Avaliação das zonas periférica, central e transicional',
    'Detecção de nódulos suspeitos ou lesões focais',
    'Planejamento e guia para biópsia prostática',
    'Aspecto das vesículas seminais e sua simetria',
    'Diferenciação entre HPB e neoplasia',
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
            name: 'Ultrassom da Próstata por Via Transretal',
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
            Ultrassom da Próstata por Via Transretal
          </Heading>

          <Image
            src="/img-exams-webp/prostata.webp"
            alt="Ultrassom Próstata Transretal"
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
                Avaliar a próstata com alta precisão através do reto, identificando alterações
                estruturais, nódulos suspeitos e fornecendo suporte à realização de biópsias
                direcionadas.
              </Text>
            </Box>

            {/* Preparo */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Realizar <strong>lavagem intestinal</strong> (enema) no dia do exame, conforme
                orientação médica. Evitar evacuação após o preparo.
              </Text>
            </Box>

            {/* Duração */}
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                De <strong>15 a 30 minutos</strong>, podendo se estender em casos de biópsia.
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

export default ViaTransretal;
