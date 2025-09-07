import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { Box, Heading, Text, VStack, SimpleGrid, Icon, Button } from '@chakra-ui/react';
import { FaHeart, FaBullseye, FaFileAlt, FaComments, FaWhatsapp } from 'react-icons/fa';

/**
 * Página "Sobre o Dr. Antonio Massucatti Neto"
 * ➡️ Ajustada para o novo padrão SEO / Schema.
 */
function About() {
  return (
    <>
      {/* SEO base */}
      <SEO
        title="Sobre Dr. Antonio Massucatti Neto | Ultrassom Itaberaí | CRM-GO 17475"
        description="Conheça Dr. Massuca: médico com mais de 20 anos de experiência, pós-graduado em ultrassonografia geral e ecocardiografia fetal em Itaberaí-GO."
        canonical="/sobre"
        keywords="Dr Massuca, Antonio Massucatti Neto, CRM-GO 17475, ultrassonografista Itaberaí, médico ultrassom Goiás, pós-graduação ultrassonografia"
        type="profile"
      />

      {/* Schema.org – WebPage (Sobre) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Sobre o Dr. Massuca – Ultrassom em Itaberaí',
            url: 'https://drmassuca.com.br/sobre',
            description:
              'Conheça a história e experiência do Dr. Massuca em ultrassom de alta precisão.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://drmassuca.com.br/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Sobre',
                  item: 'https://drmassuca.com.br/sobre',
                },
              ],
            },
          })}
        </script>
      </Helmet>

      {/* Conteúdo */}
      <Box maxW="1200px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          {/* Título */}
          <Heading
            as="h1"
            size="lg"
            mb={6}
            textAlign="center"
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            Sobre o Dr. Antonio Massucatti Neto
          </Heading>

          {/* Formação & Experiência */}
          <VStack align="start" spacing={6} mb={10} color="gray.800">
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={1}
                color="green.700"
                textShadow="1px 1px 1px rgba(0,0,0,0.4)"
              >
                Formação
              </Heading>
              <Text>
                Graduado em Medicina, com pós-graduação em Ultrassonografia Geral e Ecocardiografia
                Fetal.
              </Text>
            </Box>

            <Box>
              <Heading
                as="h2"
                size="md"
                mb={1}
                color="green.700"
                textShadow="1px 1px 1px rgba(0,0,0,0.4)"
              >
                Experiência
              </Heading>
              <Text>
                Com mais de 20 anos de atuação na medicina e no ultrassom, desenvolveu uma abordagem
                que une precisão diagnóstica, responsabilidade ética e escuta atenta. Sua vivência
                em diferentes contextos, urbanos e rurais, moldou uma prática focada na excelência
                técnica e no cuidado humano.
              </Text>
            </Box>
          </VStack>

          {/* Valores */}
          <Box mb={10}>
            <Heading
              as="h2"
              size="md"
              mb={6}
              color="green.700"
              textAlign={{ base: 'center', md: 'start' }}
              textShadow="1px 1px 1px rgba(0,0,0,0.4)"
            >
              Valores e Filosofia
            </Heading>

            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
              {[
                {
                  icon: FaHeart,
                  title: 'Ética',
                  text: 'Agir sempre com responsabilidade, empatia e profissionalismo.',
                },
                {
                  icon: FaBullseye,
                  title: 'Precisão',
                  text: 'Diagnóstico preciso para apoiar decisões seguras e corretas.',
                },
                {
                  icon: FaFileAlt,
                  title: 'Verdade',
                  text: 'Entregar informações claras, verdadeiras e seguras.',
                },
                {
                  icon: FaComments,
                  title: 'Escuta',
                  text: 'Ouvir com atenção, respeito e sensibilidade cada paciente.',
                },
              ].map(({ icon, title, text }) => (
                <Box
                  key={title}
                  bg="white"
                  borderRadius="lg"
                  p={6}
                  boxShadow="md"
                  textAlign="center"
                >
                  <Icon as={icon} boxSize={8} color="green.700" mb={2} />
                  <Heading as="h3" size="sm" mb={2}>
                    {title}
                  </Heading>
                  <Text fontSize="sm" color="gray.700">
                    {text}
                  </Text>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Frase */}
          <Text fontStyle="italic" fontSize="sm" textAlign="center" color="gray.700" mb={8}>
            &quot;Minha missão é entregar diagnósticos precisos, humanos e responsáveis, oferecendo
            segurança e tranquilidade para meus pacientes e para os colegas médicos que confiam no
            meu trabalho.&quot;
          </Text>

          {/* Botão WhatsApp */}
          <Box textAlign="center">
            <Button
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              bg="green.700"
              color="white"
              _hover={{ bg: 'green.800' }}
              px={{ base: 6, md: 8 }}
              py={{ base: 4, md: 5 }}
              fontSize={{ base: 'sm', md: 'md' }}
              borderRadius="lg"
            >
              Entre em Contato
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default About;
