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

function Total() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/total';

  /* ➜ SEO */
  const title = 'Abdome Total – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de abdome total avalia fígado, vesícula, rins, pâncreas e pelve em um único exame. Atendimento em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Fígado, vias biliares e vesícula biliar',
    'Pâncreas e baço',
    'Rins, bexiga e vias urinárias',
    'Aorta abdominal e veia cava inferior',
    'Paredes e musculatura abdominal',
    'Pesquisa de líquidos livres ou massas',
    'Volume de líquido urinário',
    'Pelve: útero e ovários (se necessário)',
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
            name: 'Ultrassom Abdome Total',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/abdometotal.webp',
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
            Ultrassom de Abdome Total
          </Heading>

          <Image
            src="/img-exams-webp/abdometotal.webp"
            alt="Ultrassom de Abdome Total"
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
                Avaliar todos os órgãos do abdome superior e inferior em um único estudo, permitindo
                rastreio de cálculos, tumores, inflamações e controle de doenças crônicas.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Jejum de <strong>6 – 8 horas</strong>. Se houver avaliação de pelve, beber
                aproximadamente 1 litro de água uma hora antes e não urinar.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>20 e 30 minutos</strong>, variando conforme a complexidade de cada
                paciente.
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

export default Total;
