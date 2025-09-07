import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { Box, Heading, Text, Button, VStack, HStack, Image } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const DopplerObstetrico = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/doppler-obstetrico';

  /* ➜ SEO */
  const title = 'Doppler Obstétrico – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom Doppler Obstétrico avalia o fluxo sanguíneo entre mãe, placenta e bebê. Exame em Itaberaí-GO com Dr. Massuca.';

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
            name: 'Ultrassom Doppler Obstétrico',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/dopplerobstetrico.webp',
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
            Doppler Obstétrico
          </Heading>

          <Box mb={8} display="flex" justifyContent="center">
            <Box w={['90%', '70%', '50%']}>
              <Image
                src="/img-exams-webp/dopplerobstetrico.webp"
                alt="Doppler Obstétrico"
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

          <VStack align="start" spacing={5}>
            <Text fontSize="lg">
              O <strong>Doppler Obstétrico</strong> é um exame de ultrassom que avalia o fluxo
              sanguíneo entre mãe, placenta e bebê. Ele analisa a circulação nas artérias uterinas,
              no cordão umbilical e em vasos fetais, como a artéria cerebral média e a aorta.
            </Text>

            <Text fontSize="lg">
              Essas informações mostram a oxigenação e a nutrição do bebê, ajudando a detectar
              precocemente situações como <strong>insuficiência placentária</strong>,{' '}
              <strong>restrição de crescimento intrauterino (RCIU)</strong> e risco para{' '}
              <strong>pré-eclâmpsia</strong>.
            </Text>

            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Indicações
              </Heading>
              <ul style={{ paddingLeft: '20px' }}>
                <li>Gestantes com hipertensão, diabetes ou gemelaridade.</li>
                <li>História de pré-eclâmpsia ou RCIU.</li>
                <li>Suspeita de alterações do líquido amniótico.</li>
                <li>Acompanhamento de condições clínicas específicas.</li>
              </ul>
            </Box>

            <Box>
              <Heading as="h2" fontSize="xl" mb={2}>
                Informações rápidas
              </Heading>
              <ul style={{ paddingLeft: '20px' }}>
                <li>
                  <strong>Duração:</strong> 15 – 30 min
                </li>
                <li>
                  <strong>Preparo:</strong> Não há
                </li>
              </ul>
            </Box>
          </VStack>

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

export default DopplerObstetrico;
