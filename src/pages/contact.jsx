import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  Icon,
  List,
  ListItem,
  ListIcon,
  Button,
} from '@chakra-ui/react';
import {
  FaPhone,
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaClock,
} from 'react-icons/fa';
import { useScrollToTop } from '../utils/useScrollToTop';

function Contact() {
  // Hook para garantir scroll to top
  useScrollToTop();

  return (
    <>
      {/* ➜ SEO base */}
      <SEO
        title="Contato Dr. Massuca | Agendar Ultrassom Itaberaí-GO | WhatsApp (62) 99660-2117"
        description="Agende seu ultrassom em Itaberaí-GO com Dr. Massuca. WhatsApp: (62) 99660-2117. Atendimento de segunda a sábado. Localização: Rua 19, Vila Leonor."
        canonical="/contato"
        keywords="agendar ultrassom Itaberaí, Dr Massuca contato, WhatsApp ultrassom, telefone ultrassom Itaberaí, endereço Dr Massuca, Vila Leonor"
        type="ContactPage"
      />

      {/* ➜ Schema.org – WebPage */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Contato – Dr. Massuca Ultrassom',
            url: 'https://drmassuca.com.br/contato',
            description:
              'Fale conosco e agende seu exame de ultrassom em Itaberaí-GO. Atendimento ágil e humano.',
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
                  name: 'Contato',
                  item: 'https://drmassuca.com.br/contato',
                },
              ],
            },
          })}
        </script>
      </Helmet>

      {/* Conteúdo */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            size="lg"
            mb={6}
            textAlign="center"
            color="brand.800"

          >
            Informações de Contato
          </Heading>

          <VStack align="start" spacing={8}>
            {/* Telefone */}
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={2}
                color="brand.800"
              >
                Telefone Fixo
              </Heading>
              <Text fontSize="lg">
                <Icon as={FaPhone} mr={2} color="accent.500" />
                <Link href="tel:+556233752614" color="brand.800" fontWeight="bold">
                  (62) 3375-2614
                </Link>
              </Text>
            </Box>

            {/* WhatsApp */}
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={2}
                color="brand.800"
              >
                WhatsApp
              </Heading>
              <Text fontSize="lg">
                <Icon as={FaWhatsapp} mr={2} color="accent.500" />
                <Link
                  href="https://wa.me/5562996602117"
                  target="_blank"
                  rel="noopener noreferrer"
                  color="brand.800"
                  fontWeight="bold"
                >
                  (62) 99660-2117
                </Link>
              </Text>
            </Box>

            {/* E-mail */}
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={2}
                color="brand.800"
              >
                E-mail
              </Heading>
              <Text fontSize="lg">
                <Icon as={FaEnvelope} mr={2} color="accent.500" />
                <Link href="mailto:drmassucatti@gmail.com" color="brand.800" fontWeight="bold">
                  drmassucatti@gmail.com
                </Link>
              </Text>
            </Box>

            {/* Localização */}
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={2}
                color="brand.800"
              >
                Localização
              </Heading>
              <Link
                href="https://maps.app.goo.gl/yERHkLaxiicVrKH27"
                isExternal
                color="brand.800"
                fontWeight="bold"
                display="flex"
                alignItems="center"
                fontSize="lg"
              >
                <Icon as={FaMapMarkerAlt} mr={2} color="accent.500" />
                Rua 19, Qd. 33, Lt. 01 – Vila Leonor – Itaberaí – GO
              </Link>
            </Box>

            {/* Instagram */}
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={2}
                color="brand.800"
              >
                Instagram
              </Heading>
              <Text fontSize="lg">
                <Icon as={FaInstagram} mr={2} color="accent.500" />
                <Link
                  href="https://instagram.com/drmassuca"
                  target="_blank"
                  rel="noopener noreferrer"
                  fontWeight="bold"
                  bgGradient="linear(to-r, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)"
                  bgClip="text"
                >
                  @drmassuca
                </Link>
              </Text>
            </Box>

            {/* Horário */}
            <Box>
              <Heading
                as="h2"
                size="md"
                mb={2}
                color="brand.800"
              >
                Horário de Funcionamento
              </Heading>
              <List spacing={1}>
                <ListItem>
                  <ListIcon as={FaClock} color="accent.500" />
                  Segunda a Sexta: 7h – 18h
                </ListItem>
                <ListItem>
                  <ListIcon as={FaClock} color="accent.500" />
                  Sábado: 8h – 12h
                </ListItem>
                <ListItem>
                  <ListIcon as={FaClock} color="accent.500" />
                  Domingo: Fechado
                </ListItem>
              </List>
            </Box>
          </VStack>

          {/* CTAs */}
          <VStack spacing={6} mt={10} textAlign="center">
            <Button
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              bg="accent.500"
              color="white"
              px={{ base: 6, md: 8 }}
              py={{ base: 4, md: 5 }}
              borderRadius="full"
              _hover={{ bg: 'accent.600', transform: 'scale(1.05)' }}
              boxShadow="lg"
              fontSize="lg"
              fontWeight="bold"
            >
              Fale Agora pelo WhatsApp
            </Button>

            {/* Link para Médicos */}
            <Box>
              <Text fontSize="md" color="gray.600" mb={2}>
                🩺 Você é médico?
              </Text>
              <Button
                as="a"
                href="/para-medicos"
                variant="outline"
                borderColor="#0693e3"
                color="#0693e3"
                _hover={{ bg: '#0693e3', color: 'white', transform: 'scale(1.05)' }}
                borderRadius="full"
                px={6}
                py={3}
                fontWeight="bold"
              >
                Contato para Médicos
              </Button>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Contact;
