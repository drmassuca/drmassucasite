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

const Mamas = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/mamas';

  /* ➜ SEO */
  const title = 'Mamas – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de mamas oferece avaliação detalhada de nódulos, cistos e tecido mamário. Exame em Itaberaí-GO com o Dr. Massuca.';

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
            name: 'Ultrassom de Mamas',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/mama.webp',
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
            Ultrassom de Mamas
          </Heading>

          <Image
            src="/img-exams-webp/mama.webp"
            alt="Ultrassom de Mamas"
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
                Avaliar tecidos mamários para identificar cistos, nódulos sólidos, alterações
                estruturais, assimetrias e possíveis sinais de inflamação ou lesões suspeitas.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Indicações
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Dor ou sensibilidade mamária</ListItem>
                <ListItem>• Presença de nódulo ou massa palpável</ListItem>
                <ListItem>• Seguimento de lesões já identificadas</ListItem>
                <ListItem>• Acompanhamento em casos assintomáticos</ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Cistos:</strong> confirmação de conteúdo líquido.
                </ListItem>
                <ListItem>
                  <strong>Nódulos sólidos:</strong> características de borda, vascularização e
                  ecogenicidade.
                </ListItem>
                <ListItem>
                  <strong>Rede ductal:</strong> presença de dilatações ou alterações.
                </ListItem>
                <ListItem>
                  <strong>Assimetria glandular:</strong> comparação entre as mamas.
                </ListItem>
                <ListItem>
                  <strong>Pele e tecidos adjacentes:</strong> espessura, retrações ou linfonodos.
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Benefícios
              </Heading>
              <Text fontSize="lg">
                • Detecção precoce de alterações benignas ou suspeitas;
                <br />
                • Método seguro, sem radiação, complementar à mamografia;
                <br />• Orientação clínica e seguimento individualizado.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não exige preparo; recomenda-se pele limpa, sem cremes ou desodorantes no dia do
                exame.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração aproximada
              </Heading>
              <Text fontSize="lg">Geralmente de 15 a 30 minutos, conforme a complexidade.</Text>
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

export default Mamas;
