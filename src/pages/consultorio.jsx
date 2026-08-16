import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  Stack,
  SimpleGrid,
  VStack,
  HStack,
  Link as ChakraLink,
} from '@chakra-ui/react';
import {
  FaWhatsapp,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaBaby,
  FaHeartbeat,
  FaUserMd,
  FaComments,
  FaQuestionCircle,
  FaCube,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Hub do consultório: a porta de entrada de toda a parte clínica.
 * Nada do conteúdo antigo se perde; esta página organiza e aponta.
 */

const ATALHOS = [
  {
    icon: FaBaby,
    title: 'Exames de ultrassom',
    text: 'Mais de 24 tipos: obstétrico, morfológico, abdominal, tireoide, mamas, elastografia hepática e mais.',
    to: '/exames',
  },
  {
    icon: FaHeartbeat,
    title: 'Ultrassom 3D',
    text: 'Ultrassom 3D e 4D da gestação com equipamento premium Samsung HERA Z20.',
    to: '/ultrassom-3d',
  },
  {
    icon: FaCube,
    title: 'Memo3D',
    text: 'Memórias da gestação em galeria digital: imagens e vídeos do bebê para guardar e compartilhar com a família.',
    to: '/memo3d',
  },
  {
    icon: FaUserMd,
    title: 'Para médicos',
    text: 'Como encaminhar pacientes e o que enviar junto com o pedido para um laudo mais útil clinicamente.',
    to: '/para-medicos',
  },
  {
    icon: FaComments,
    title: 'Depoimentos',
    text: 'O que pacientes e famílias dizem sobre o atendimento.',
    to: '/depoimentos',
  },
  {
    icon: FaQuestionCircle,
    title: 'Perguntas frequentes',
    text: 'Preparo de exames, prazos de resultado, pedidos médicos e mais de 40 dúvidas respondidas.',
    to: '/faq',
  },
];

function Consultorio() {
  useScrollToTop();

  return (
    <>
      <SEO
        title="Consultório de Ultrassonografia em Itaberaí-GO | Dr. Massuca | CRM-GO 17475"
        description="Consultório do Dr. Massuca em Itaberaí-GO: mais de 24 tipos de exames de ultrassom, equipamento Samsung HERA Z20, laudos com interpretação clínica. Rua 19, Vila Leonor. WhatsApp (62) 99660-2117."
        canonical="/consultorio"
        keywords="consultório ultrassom Itaberaí, clínica ultrassonografia Itaberaí GO, agendar ultrassom, Dr Massuca consultório"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalClinic',
            '@id': 'https://drmassuca.com.br/consultorio#clinic',
            name: 'Dr. Massuca Ultrassom',
            url: 'https://drmassuca.com.br/consultorio',
            telephone: '+55-62-99660-2117',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Rua 19, Qd. 33, Lt. 01, Vila Leonor',
              addressLocality: 'Itaberaí',
              addressRegion: 'GO',
              postalCode: '76630-000',
              addressCountry: 'BR',
            },
            geo: { '@type': 'GeoCoordinates', latitude: -15.95, longitude: -49.95 },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '18:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '08:00',
                closes: '12:00',
              },
            ],
            physician: { '@id': 'https://drmassuca.com.br/#person' },
          })}
        </script>
      </Helmet>

      <Box maxW="1200px" mx="auto" px={0} py={{ base: 6, md: 10 }}>
        {/* Cabeçalho */}
        <Box mb={10} maxW="720px">
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} mb={4}>
            O consultório
          </Heading>
          <Text color="var(--brand-text-soft)" fontSize="lg" mb={3}>
            Ultrassonografia em Itaberaí, GO, com mais de 20 anos de experiência, equipamento
            premium Samsung HERA Z20 e laudos com interpretação clínica, não apenas números.
          </Text>
          <Text color="var(--brand-muted)">
            É daqui que nasce todo o resto: o curso, os produtos e as palestras vêm da prática
            diária com pacientes reais.
          </Text>
        </Box>

        {/* Informação prática: o que não pode se perder */}
        <Box
          bg="var(--brand-surface)"
          border="1px solid"
          borderColor="var(--brand-border)"
          borderRadius="16px"
          p={{ base: 6, md: 8 }}
          mb={12}
        >
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} mb={6}>
            <HStack align="start" spacing={3}>
              <Box color="accent.500" pt={1}>
                <FaMapMarkerAlt size={18} />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight={600}>Endereço</Text>
                <ChakraLink
                  href="https://maps.app.goo.gl/yERHkLaxiicVrKH27"
                  isExternal
                  color="var(--brand-muted)"
                  fontSize="sm"
                  _hover={{ color: 'accent.600' }}
                >
                  Rua 19, Qd. 33, Lt. 01, Vila Leonor
                  <br />
                  Itaberaí, GO, CEP 76630-000
                </ChakraLink>
              </VStack>
            </HStack>
            <HStack align="start" spacing={3}>
              <Box color="accent.500" pt={1}>
                <FaClock size={18} />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight={600}>Horário</Text>
                <Text color="var(--brand-muted)" fontSize="sm">
                  Segunda a sexta: 8h às 18h
                  <br />
                  Sábado: 8h às 12h
                </Text>
              </VStack>
            </HStack>
            <HStack align="start" spacing={3}>
              <Box color="accent.500" pt={1}>
                <FaPhone size={18} />
              </Box>
              <VStack align="start" spacing={0}>
                <Text fontWeight={600}>Telefones</Text>
                <Text color="var(--brand-muted)" fontSize="sm">
                  Fixo: (62) 3375-2614
                  <br />
                  WhatsApp: (62) 99660-2117
                </Text>
              </VStack>
            </HStack>
          </SimpleGrid>
          <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
            <Button
              as="a"
              href="https://wa.me/5562996602117?text=Ol%C3%A1%2C%20quero%20agendar%20um%20ultrassom."
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              bg="accent.500"
              color="white"
              _hover={{ bg: 'accent.600' }}
            >
              Agendar pelo WhatsApp
            </Button>
            <Button
              as={RouterLink}
              to="/contato"
              variant="outline"
              borderColor="accent.500"
              color="accent.600"
              _hover={{ bg: 'var(--brand-accent-soft)' }}
            >
              Todas as formas de contato
            </Button>
          </Stack>
        </Box>

        {/* Atalhos para todo o conteúdo clínico */}
        <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={6}>
          Tudo sobre o atendimento
        </Heading>
        <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={5}>
          {ATALHOS.map(item => (
            <ChakraLink
              key={item.to}
              as={RouterLink}
              to={item.to}
              _hover={{ textDecoration: 'none' }}
            >
              <Box
                bg="white"
                border="1px solid"
                borderColor="var(--brand-border)"
                borderRadius="16px"
                p={6}
                h="100%"
                transition="all 0.2s ease"
                _hover={{ boxShadow: 'var(--brand-shadow-lifted)', transform: 'translateY(-4px)' }}
              >
                <Box
                  bg="var(--brand-accent-soft)"
                  color="accent.600"
                  w="44px"
                  h="44px"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  mb={4}
                >
                  <item.icon size={20} />
                </Box>
                <Heading as="h3" fontSize="lg" mb={2}>
                  {item.title}
                </Heading>
                <Text fontSize="sm" color="var(--brand-muted)">
                  {item.text}
                </Text>
              </Box>
            </ChakraLink>
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
}

export default Consultorio;
