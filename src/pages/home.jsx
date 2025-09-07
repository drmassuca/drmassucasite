import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { Box, Heading, Text, Button, Image, VStack, Stack } from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Chatbot from '../components/Chatbot'; // Agora usando Claude

function Home() {
  return (
    <>
      {/* ➜ SEO base */}
      <SEO
        title="Dr. Massuca | Ultrassom em Itaberaí-GO | CRM-GO 17475"
        description="Ultrassom em Itaberaí-GO com Dr. Massuca. Mais de 20 anos de experiência, pós-graduado em ultrassonografia geral e ecocardiografia fetal. Agende já!"
        canonical="/"
        keywords="ultrassom Itaberaí, ultrassonografia Itaberaí, Dr Massuca, exame ultrassom GO, ultrassom obstétrico, ecocardiografia fetal, CRM-GO 17475"
        image="https://drmassuca.com.br/foto-home.webp"
        type="website"
      />

      {/* ➜ Schema.org otimizado (WebSite + MedicalBusiness) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://drmassuca.com.br/#website',
                name: 'Dr. Massuca | Ultrassom',
                url: 'https://drmassuca.com.br/',
                description:
                  'Clínica de ultrassom com mais de 20 anos de experiência em Itaberaí-GO',
                potentialAction: {
                  '@type': 'SearchAction',
                  target: 'https://drmassuca.com.br/search?q={search_term_string}',
                  'query-input': 'required name=search_term_string',
                },
              },
              {
                '@type': 'MedicalBusiness',
                '@id': 'https://drmassuca.com.br/#medicalbusiness',
                name: 'Dr. Massuca Ultrassom',
                alternateName: 'Clínica Dr. Massuca',
                url: 'https://drmassuca.com.br/',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://drmassuca.com.br/icons/icon-512.png',
                  width: 512,
                  height: 512,
                },
                image: {
                  '@type': 'ImageObject',
                  url: 'https://drmassuca.com.br/foto-home.webp',
                  width: 479,
                  height: 672,
                  caption: 'Dr. Massuca realizando exame de ultrassom',
                },
                telephone: '+55-62-99660-2117',
                medicalSpecialty: ['Ultrassom', 'Medicina Fetal', 'Ecocardiografia Fetal'],
                address: {
                  '@type': 'PostalAddress',
                  addressLocality: 'Itaberaí',
                  addressRegion: 'GO',
                  addressCountry: 'BR',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: -15.95,
                  longitude: -49.95,
                },
                founder: {
                  '@type': 'Person',
                  name: 'Dr. Antonio Massucatti Neto',
                  jobTitle: 'Médico com pós-graduação em Ultrassom',
                  identifier: 'CRM-GO 17475',
                  medicalSpecialty: ['Ultrassom Geral', 'Ecocardiografia Fetal'],
                  gender: 'Male',
                },
                priceRange: '$$',
                paymentAccepted: ['Cash', 'Credit Card', 'Health Insurance'],
                currenciesAccepted: 'BRL',
                openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
                serviceType: 'Medicina Diagnóstica',
                hasOfferCatalog: {
                  '@type': 'OfferCatalog',
                  name: 'Exames de Ultrassom',
                  itemListElement: [
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'MedicalTest',
                        name: 'Ultrassom Obstétrico',
                      },
                    },
                    {
                      '@type': 'Offer',
                      itemOffered: {
                        '@type': 'MedicalTest',
                        name: 'Ecocardiografia Fetal',
                      },
                    },
                  ],
                },
                aggregateRating: {
                  '@type': 'AggregateRating',
                  ratingValue: '4.9',
                  reviewCount: '120',
                  bestRating: '5',
                  worstRating: '1',
                },
              },
              {
                '@type': 'WebPage',
                '@id': 'https://drmassuca.com.br/#homepage',
                url: 'https://drmassuca.com.br/',
                name: 'Início - Dr. Massuca Ultrassom',
                isPartOf: {
                  '@id': 'https://drmassuca.com.br/#website',
                },
                about: {
                  '@id': 'https://drmassuca.com.br/#medicalbusiness',
                },
                description: 'Ultrassom com precisão, propósito e alma médica em Itaberaí-GO',
                breadcrumb: {
                  '@type': 'BreadcrumbList',
                  itemListElement: [
                    {
                      '@type': 'ListItem',
                      position: 1,
                      name: 'Início',
                      item: 'https://drmassuca.com.br/',
                    },
                  ],
                },
              },
            ],
          })}
        </script>

        {/* Resource hints já estão no index.html */}
      </Helmet>

      <Box>
        {/* Hero Section */}
        <Box
          maxW="1200px"
          mx="auto"
          display="flex"
          flexDirection={{ base: 'column', md: 'row' }}
          alignItems="center"
          justifyContent="space-between"
          gap={8}
          py={{ base: 10, md: 20 }}
          px={4}
          minH={{ base: 'auto', md: '600px' }}
        >
          {/* Text Section */}
          <Box flex="1" display="flex" flexDirection="column" justifyContent="center">
            <Heading
              as="h1"
              fontSize={{ base: '4xl', md: '5xl' }}
              color="white"
              mb={4}
              lineHeight="1.2"
              maxW="600px"
              minH="110px"
              fontWeight="semibold"
              textAlign={{ base: 'center', md: 'left' }}
            >
              Ultrassom com precisão, propósito e alma médica.
            </Heading>

            {/* Container com altura mínima para evitar CLS no texto */}
            <Box minH="120px">
              <Text color="gray.200" fontSize={{ base: 'lg', md: 'md' }} mb={2}>
                Dr. Massuca
              </Text>
              <Text color="gray.200" fontSize={{ base: 'lg', md: 'md' }} mb={4}>
                Antonio Massucatti Neto – CRM-GO 17475
              </Text>
              <Text color="gray.200" fontSize={{ base: 'lg', md: 'md' }} mb={6} maxW="600px">
                Mais de 20 anos de atuação na medicina, com pós-graduação em ultrassonografia geral
                e ecocardiografia fetal. Trabalho guiado por ética, precisão diagnóstica e
                compromisso com uma escuta atenta e humanizada. Minha missão é oferecer exames de
                ultrassom de alta qualidade, apoiando médicos, famílias e pacientes em decisões
                seguras e conscientes.
              </Text>
            </Box>

            {/* Botões otimizados (mobile-first) */}
            <Stack
              direction={{ base: 'column', md: 'row' }}
              spacing={{ base: 3, md: 4 }}
              w="full"
              align="stretch"
              maxW="640px"
            >
              <Button
                as="a"
                href="https://wa.me/5562996602117?text=Ol%C3%A1%2C%20quero%20agendar%20um%20ultrassom."
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaWhatsapp size={20} />}
                w={{ base: '100%', md: 'auto' }}
                h={{ base: '48px', md: '56px' }}
                px={{ base: 6, md: 8 }}
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight="700"
                rounded="full"
                color="white"
                bg="#0f3d2e"
                border="2px solid #0f3d2e"
                boxShadow="lg"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  bg: 'transparent',
                  color: '#0f3d2e',
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }}
                _active={{ transform: 'translateY(0)' }}
                flexShrink={0}
                aria-label="Agendar ultrassom pelo WhatsApp com Dr. Massuca"
              >
                Agendar pelo WhatsApp
              </Button>

              <Button
                as="a"
                href="https://instagram.com/drmassuca"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaInstagram size={20} />}
                w={{ base: '100%', md: 'auto' }}
                h={{ base: '48px', md: '56px' }}
                px={{ base: 6, md: 8 }}
                fontSize={{ base: 'md', md: 'lg' }}
                fontWeight="700"
                rounded="full"
                color="white"
                bgGradient="linear(to-r, #F58529, #DD2A7B, #8134AF, #515BD4)"
                boxShadow="lg"
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                _hover={{
                  opacity: 0.9,
                  transform: 'translateY(-2px)',
                  boxShadow: 'xl',
                }}
                _active={{ transform: 'translateY(0)' }}
                flexShrink={0}
                aria-label="Seguir Dr. Massuca no Instagram"
              >
                Instagram
              </Button>
            </Stack>
          </Box>

          {/* Image Section - Solução definitiva para CLS */}
          <Box
            flex="1"
            display="flex"
            justifyContent="center"
            // Reserva espaço fixo para evitar qualquer CLS
            minH={{ base: '400px', md: '672px' }}
            w={{ base: '100%', md: '480px' }}
            maxW={{ base: '360px', sm: '420px', md: '480px' }}
            mx="auto"
          >
            {/* Container com dimensões absolutas para zero CLS */}
            <Box
              position="relative"
              w="100%"
              h={{ base: '400px', md: '672px' }}
              // Força o aspect ratio exato da imagem
              style={{
                aspectRatio: '479 / 672',
              }}
            >
              <Image
                src="/foto-home.webp"
                alt="Dr. Massuca realizando exame"
                // Dimensões HTML explícitas obrigatórias
                width="479"
                height="672"
                // CSS para posicionamento absoluto (zero CLS)
                position="absolute"
                top="0"
                left="0"
                w="100%"
                h="100%"
                objectFit="cover"
                objectPosition="center"
                loading="eager"
                decoding="sync"
                borderRadius="lg"
                boxShadow="lg"
              />
            </Box>
          </Box>
        </Box>

        {/* Conheça o Dr. Massuca */}
        <VStack spacing={2} mb={8}>
          <Heading size="md" color="white">
            Conheça o Dr. Massuca
          </Heading>
          <Text fontSize="sm" color="gray.200">
            Antonio Massucatti Neto – CRM-GO 17.475
          </Text>
        </VStack>

        {/* Botão para Sobre - Estilo aprimorado */}
        <Box textAlign="center" mb={12}>
          <Button
            as={RouterLink}
            to="/sobre"
            bg="white"
            color="#0f3d2e"
            border="3px solid transparent"
            borderRadius="full"
            px={10}
            py={6}
            h="56px"
            fontSize="lg"
            fontWeight="700"
            boxShadow="xl"
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            _hover={{
              bg: 'transparent',
              color: 'white',
              borderColor: 'white',
              transform: 'translateY(-3px)',
              boxShadow: '2xl',
            }}
            _active={{ transform: 'translateY(-1px)' }}
            aria-label="Conhecer mais sobre o Dr. Massuca"
          >
            Por trás do ultrassom, existe uma história
          </Button>
        </Box>
      </Box>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}

export default Home;
