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

function MorfologicoSegundoTrimestre() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/morfologico-segundo-trimestre';

  /* ➜ SEO */
  const title = 'Morfológico 2º Trimestre – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom morfológico do segundo trimestre avalia anatomia fetal e crescimento entre 20–24 semanas em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Crânio e encéfalo: formato, suturas, plexos, cerebelo',
    'Face fetal: nariz, lábios, perfil',
    'Coração: quatro câmaras, grandes vasos, ritmo e Doppler (quando necessário)',
    'Coluna vertebral e diafragma',
    'Estômago, rins, bexiga e parede abdominal',
    'Cordão umbilical e sua inserção',
    'Placenta, líquido amniótico e localização',
    'Membros: braços, pernas, mãos e pés — contagem, forma e movimento',
    'Biometrias: BPD, CC, CA, FL e DL',
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
            name: 'Ultrassom Morfológico do Segundo Trimestre',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/morfologico.webp',
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
            Ultrassom Morfológico – 2º Trimestre
          </Heading>

          <Image
            src="/img-exams-webp/morfologico.webp"
            alt="Ultrassom Morfológico do Segundo Trimestre"
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
                Avaliar minuciosamente a formação anatômica do bebê, identificar malformações,
                monitorar o crescimento fetal, posição placentária e volume de líquido amniótico.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Período ideal
              </Heading>
              <Text fontSize="lg">
                Entre <strong>20 e 24 semanas</strong>, preferencialmente na 22ª ou 23ª semana.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não exige preparo especial. Pode ser realizado com bexiga vazia. Venha com roupas
                confortáveis e alimentada.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração média
              </Heading>
              <Text fontSize="lg">
                Cerca de <strong>30 a 50 minutos</strong>, podendo ser maior caso o bebê esteja em
                posição desfavorável ou haja necessidade de Doppler.
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

export default MorfologicoSegundoTrimestre;
