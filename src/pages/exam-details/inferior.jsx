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

function Inferior() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/inferior';

  /* ➜ SEO */
  const title = 'Abdome Inferior / Pelve – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom de abdome inferior e pelve avalia útero, ovários, bexiga e vias urinárias com precisão. Exame em Itaberaí-GO, Dr. Massuca.';

  const avaliacoes = [
    'Bexiga: volume, espessura da parede, cálculos ou inflamações',
    'Útero: forma, volume, espessura endometrial e miométrio',
    'Ovários: tamanho, folículos, cistos ou massas',
    'Região anexial e fundo de saco pélvico',
    'Presença de líquidos livres',
    'Avaliação prostática (em homens, se via abdominal)',
    'Vias urinárias baixas e ureteres (quando visíveis)',
  ];

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
            name: 'Ultrassom Abdome Inferior / Pelve',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/pelvicofeminino.webp',
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
            Ultrassom de Abdome Inferior / Pelve
          </Heading>

          <Image
            src="/img-exams-webp/pelvicofeminino.webp"
            alt="Ultrassom Abdome Inferior"
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
                Avaliar órgãos pélvicos — útero, ovários, bexiga e vias urinárias baixas — para
                investigar dor, sangramentos, alterações urinárias ou controle ginecológico de
                rotina.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Ingestão de <strong>1 litro de água</strong> uma hora antes do exame e não urinar.
                Bexiga cheia é essencial para uma boa janela acústica.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Entre <strong>15 e 25 minutos</strong>, em média.
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

export default Inferior;
