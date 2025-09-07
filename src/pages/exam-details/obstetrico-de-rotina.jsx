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

const ObstetricoDeRotina = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/obstetrico-de-rotina';

  /* ➜ SEO */
  const title = 'Obstétrico de Rotina – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom obstétrico de rotina avalia crescimento fetal, bem-estar e posição da placenta. Exame em Itaberaí-GO com o Dr. Massuca.';

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
            name: 'Ultrassom Obstétrico de Rotina',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/obstetrico.webp',
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
            Obstétrico de Rotina
          </Heading>

          <Image
            src="/img-exams-webp/obstetrico.webp"
            alt="Ultrassom Obstétrico de Rotina"
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
                Objetivos do exame
              </Heading>
              <Text fontSize="lg">
                • Avaliar crescimento fetal (biometrias CC, CA, CF) e estimar peso.
                <br />
                • Monitorar bem-estar: batimentos cardíacos, movimentação e posição fetal.
                <br />
                • Avaliar localização e maturidade da placenta, além do volume de líquido amniótico.
                <br />• Verificar inserção e número de vasos do cordão umbilical.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Períodos recomendados
              </Heading>
              <Text fontSize="lg">
                Ideal entre <strong>15 – 19 semanas</strong> e novamente entre{' '}
                <strong>26 – 40 semanas</strong>, conforme orientação pré-natal.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Biometria fetal:</strong> cabeça, abdome e fêmur.
                </ListItem>
                <ListItem>
                  <strong>Morfologia básica:</strong> crânio, coluna, tórax, abdome, membros e face.
                </ListItem>
                <ListItem>
                  <strong>Placenta:</strong> posição, maturidade, inserção do cordão.
                </ListItem>
                <ListItem>
                  <strong>Líquido amniótico:</strong> avaliação de oligo ou polidrâmnio.
                </ListItem>
                <ListItem>
                  <strong>Cordão umbilical:</strong> número de vasos e fluxo quando indicado.
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">Não exige preparo específico.</Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração aproximada
              </Heading>
              <Text fontSize="lg">
                Geralmente entre <strong>20 – 40 minutos</strong>.
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

export default ObstetricoDeRotina;
