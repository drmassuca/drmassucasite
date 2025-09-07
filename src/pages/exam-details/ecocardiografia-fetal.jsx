import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { Box, Heading, Text, Button, VStack, HStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const EcocardiografiaFetal = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/ecocardiografia-fetal';

  /* ➜ SEO */
  const title = 'Ecocardiografia Fetal – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom Ecocardiografia Fetal avalia a estrutura e circulação do coração do bebê com alta precisão. Exame em Itaberaí-GO, Dr. Massuca.';

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
            name: 'Ultrassom Ecocardiografia Fetal',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/ecocardiografia_fetal.webp',
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
            Ecocardiografia Fetal
          </Heading>

          {/* Imagem */}
          <Box mb={8} display="flex" justifyContent="center">
            <Box w={['90%', '70%', '50%']}>
              <Image
                src="/img-exams-webp/ecocardiografia_fetal.webp"
                alt="Ecocardiografia Fetal"
                borderRadius="md"
                objectFit="contain"
                w="100%"
                h={{ base: '200px', md: '300px' }}
                mb={8}
                bg="white"
                loading="lazy"
              />
            </Box>
          </Box>

          {/* Descrição */}
          <VStack align="start" spacing={5}>
            <Text fontSize="lg">
              A <strong>Ecocardiografia Fetal</strong> é um exame de ultrassom especializado que
              avalia, de forma detalhada, a estrutura, função e circulação do coração do bebê,
              utilizando imagens bidimensionais e Doppler colorido.
            </Text>

            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Quando é realizado:
              </Heading>
              <Text fontSize="lg">
                Recomendado entre a <strong>20ª e a 30ª semanas</strong> de gestação, podendo ser
                solicitado em outras fases conforme indicação médica.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Indicações:
              </Heading>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Suspeita de cardiopatia fetal ou malformação cardíaca.</li>
                <li>Histórico familiar de cardiopatias congênitas.</li>
                <li>
                  Alterações no ritmo fetal ou condições maternas específicas (diabetes, lúpus, uso
                  de medicação, etc.).
                </li>
                <li>Parte complementar do pré-natal, inclusive em gestações de baixo risco.</li>
              </ul>
            </Box>

            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Informações rápidas:
              </Heading>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>Duração:</strong> 30 – 60 min
                </li>
                <li>
                  <strong>Preparo:</strong> Não há
                </li>
              </ul>
            </Box>
          </VStack>

          {/* Botões */}
          <HStack justify="center" spacing={4} mt={8}>
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

export default EcocardiografiaFetal;
