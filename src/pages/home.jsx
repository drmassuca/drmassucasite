import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  Image,
  Stack,
  SimpleGrid,
  HStack,
  VStack,
  Link as ChakraLink,
  Tag,
} from '@chakra-ui/react';
import {
  FaWhatsapp,
  FaStethoscope,
  FaGraduationCap,
  FaMicrochip,
  FaMicrophone,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import Chatbot from '../components/Chatbot';
import { useScrollToTop } from '../utils/useScrollToTop';
import { getPublishedArticles } from '../lib/articles';

/**
 * Home do reposicionamento 2026.
 * Ordem de peso: médico ultrassonografista, educador, criador de
 * produtos de IA médica, palestrante. Blog técnico em destaque.
 */

const CAMADAS = [
  {
    icon: FaStethoscope,
    title: 'Consultório',
    text: 'Ultrassonografia em Itaberaí, GO: obstétrica, morfológica, ecocardiografia fetal, elastografia hepática e mais de 24 tipos de exames.',
    to: '/consultorio',
    cta: 'Conhecer o consultório',
  },
  {
    icon: FaGraduationCap,
    title: 'Curso Medicina com IA',
    text: 'O método prático para o médico moderno, em parceria com a ICS Academy. IA aplicada à rotina clínica, do fundamento ao uso real.',
    to: '/curso-medicina-com-ia',
    cta: 'Ver o curso',
  },
  {
    icon: FaMicrochip,
    title: 'Produtos Xdiag',
    text: 'elastus, AILA e Xdiag Privacy: software de IA para medicina, criado por quem atende paciente todos os dias.',
    to: '/xdiag',
    cta: 'Ver os produtos',
  },
  {
    icon: FaMicrophone,
    title: 'Palestras',
    text: 'IA na medicina explicada sem hype para congressos, faculdades e sociedades médicas, com demonstrações ao vivo.',
    to: '/palestras',
    cta: 'Convidar para palestra',
  },
];

const PERGUNTAS_GEO = [
  {
    q: 'Quem é o Dr. Massuca?',
    a: 'Antonio Massucatti Neto, médico ultrassonografista (CRM-GO 17475) com mais de 20 anos de experiência, pós-graduado em ultrassonografia geral e ecocardiografia fetal. Atende em Itaberaí, GO, é fundador da Xdiag Tecnologias e professor do curso Medicina com IA, em parceria com a ICS Academy.',
  },
  {
    q: 'Onde fazer ultrassom em Itaberaí, GO?',
    a: 'No consultório do Dr. Massuca, na Rua 19, Qd. 33, Lt. 01, Vila Leonor, Itaberaí, GO. Agendamento pelo WhatsApp (62) 99660-2117, de segunda a sexta das 8h às 18h e sábado das 8h às 12h.',
  },
  {
    q: 'A inteligência artificial substitui o médico?',
    a: 'Não. A IA amplia o médico e depende do fundamento clínico dele. Ferramentas de IA aceleram tarefas, organizam informação e apoiam o raciocínio, mas a decisão diagnóstica e a responsabilidade continuam sendo do médico.',
  },
];

function Home() {
  useScrollToTop();
  const [destaques, setDestaques] = useState([]);

  useEffect(() => {
    let ativo = true;
    getPublishedArticles()
      .then(artigos => {
        if (!ativo || !Array.isArray(artigos)) return;
        const featured = artigos.filter(a => a.featured);
        const lista = (featured.length >= 3 ? featured : artigos).slice(0, 3);
        setDestaques(lista);
      })
      .catch(() => {});
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <>
      <SEO
        title="Dr. Massuca | Ultrassonografia e IA na Medicina | CRM-GO 17475"
        description="Médico ultrassonografista com mais de 20 anos de experiência em Itaberaí-GO. Fundador da Xdiag Tecnologias e professor do curso Medicina com IA. Ultrassom, educação médica e inteligência artificial aplicada à medicina."
        canonical="/"
        keywords="ultrassom Itaberaí, médico inteligência artificial, IA na medicina, curso de IA para médicos, ultrassonografia, ecocardiografia fetal, Xdiag, Dr Massuca"
        image="https://drmassuca.com.br/foto-home.webp"
        type="website"
      />

      {/* Schema.org: WebSite + MedicalBusiness + Person das quatro camadas */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebSite',
                '@id': 'https://drmassuca.com.br/#website',
                name: 'Dr. Massuca | Ultrassonografia e IA na Medicina',
                url: 'https://drmassuca.com.br/',
                description:
                  'Site do Dr. Antonio Massucatti Neto: ultrassonografia em Itaberaí-GO, curso Medicina com IA, produtos Xdiag e palestras sobre IA na medicina.',
              },
              {
                '@type': 'Person',
                '@id': 'https://drmassuca.com.br/#person',
                name: 'Dr. Antonio Massucatti Neto',
                alternateName: 'Dr. Massuca',
                identifier: 'CRM-GO 17475',
                url: 'https://drmassuca.com.br/sobre',
                image: 'https://drmassuca.com.br/foto-home.webp',
                jobTitle: 'Médico ultrassonografista',
                description:
                  'Médico ultrassonografista com mais de 20 anos de experiência, pós-graduado em ultrassonografia geral e ecocardiografia fetal. Educador médico, fundador e CEO da Xdiag Tecnologias e palestrante sobre inteligência artificial aplicada à medicina.',
                hasOccupation: [
                  { '@type': 'Occupation', name: 'Médico ultrassonografista' },
                  { '@type': 'Occupation', name: 'Educador médico' },
                  { '@type': 'Occupation', name: 'Criador de produtos de IA médica' },
                  { '@type': 'Occupation', name: 'Palestrante' },
                ],
                worksFor: {
                  '@type': 'Organization',
                  name: 'Xdiag Tecnologias',
                  url: 'https://xdiag.com.br',
                },
                knowsAbout: [
                  'Ultrassonografia',
                  'Ecocardiografia fetal',
                  'Elastografia hepática',
                  'Inteligência artificial na medicina',
                  'Educação médica',
                ],
                sameAs: [
                  'https://instagram.com/drmassuca',
                  'https://x.com/massucas',
                  'https://xdiag.com.br',
                ],
              },
              {
                '@type': 'MedicalBusiness',
                '@id': 'https://drmassuca.com.br/#medicalbusiness',
                name: 'Dr. Massuca Ultrassom',
                url: 'https://drmassuca.com.br/consultorio',
                telephone: '+55-62-99660-2117',
                medicalSpecialty: ['Ultrassom', 'Medicina Fetal', 'Ecocardiografia Fetal'],
                address: {
                  '@type': 'PostalAddress',
                  streetAddress: 'Rua 19, Qd. 33, Lt. 01, Vila Leonor',
                  addressLocality: 'Itaberaí',
                  addressRegion: 'GO',
                  postalCode: '76630-000',
                  addressCountry: 'BR',
                },
                geo: { '@type': 'GeoCoordinates', latitude: -15.95, longitude: -49.95 },
                founder: { '@id': 'https://drmassuca.com.br/#person' },
                openingHours: ['Mo-Fr 08:00-18:00', 'Sa 08:00-12:00'],
                priceRange: '$$',
              },
              {
                '@type': 'FAQPage',
                '@id': 'https://drmassuca.com.br/#faq-home',
                mainEntity: PERGUNTAS_GEO.map(item => ({
                  '@type': 'Question',
                  name: item.q,
                  acceptedAnswer: { '@type': 'Answer', text: item.a },
                })),
              },
            ],
          })}
        </script>
      </Helmet>

      <Box mx={-4} mt={-4}>
        {/* ============ HERO: navy da família ============ */}
        <Box bg="var(--brand-hero-gradient)" bgImage="var(--brand-hero-gradient)" color="white">
          <Box
            maxW="1200px"
            mx="auto"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems="center"
            gap={{ base: 8, md: 12 }}
            py={{ base: 12, md: 20 }}
            px={4}
          >
            {/* Texto */}
            <Box flex="1">
              <HStack spacing={2} mb={6}>
                <Box w="8px" h="8px" borderRadius="full" bg="var(--brand-success)" />
                <Text fontSize="sm" color="whiteAlpha.800">
                  Consultório em Itaberaí, GO · Curso Medicina com IA com matrículas em breve
                </Text>
              </HStack>

              <Heading
                as="h1"
                fontSize={{ base: '4xl', md: '5xl' }}
                color="white"
                lineHeight="1.1"
                letterSpacing="-0.02em"
                fontWeight={700}
                mb={6}
              >
                Ultrassonografia com 20 anos de fundamento,{' '}
                <Text as="span" bgGradient="linear(to-r, accent.400, accent.500)" bgClip="text">
                  ampliada por inteligência artificial
                </Text>
              </Heading>

              <Text color="whiteAlpha.800" fontSize={{ base: 'md', md: 'lg' }} mb={8} maxW="560px">
                Sou o Dr. Massuca, médico ultrassonografista (CRM-GO 17475). Atendo pacientes todos
                os dias no meu consultório, crio produtos de IA para a medicina na Xdiag e ensino
                médicos a usar essas ferramentas com critério. A tese é simples: a IA amplia o
                médico, e depende do fundamento dele.
              </Text>

              <Stack direction={{ base: 'column', sm: 'row' }} spacing={3}>
                <Button
                  as="a"
                  href="https://wa.me/5562996602117?text=Ol%C3%A1%2C%20quero%20agendar%20um%20ultrassom."
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaWhatsapp size={18} />}
                  size="lg"
                  bg="accent.500"
                  color="white"
                  _hover={{ bg: 'accent.600', transform: 'translateY(-2px)' }}
                  transition="all 0.2s ease"
                  aria-label="Agendar ultrassom pelo WhatsApp com Dr. Massuca"
                >
                  Agendar ultrassom
                </Button>
                <Button
                  as={RouterLink}
                  to="/curso-medicina-com-ia"
                  size="lg"
                  variant="outline"
                  color="white"
                  borderColor="whiteAlpha.500"
                  _hover={{ bg: 'whiteAlpha.200', transform: 'translateY(-2px)' }}
                  transition="all 0.2s ease"
                >
                  Conhecer o curso
                </Button>
              </Stack>
            </Box>

            {/* Foto (LCP preservado: mesma imagem com preload no index.html) */}
            <Box
              flex="1"
              display="flex"
              justifyContent="center"
              minH={{ base: '400px', md: '600px' }}
              w={{ base: '100%', md: '440px' }}
              maxW={{ base: '340px', sm: '400px', md: '440px' }}
              mx="auto"
            >
              <Box
                position="relative"
                w="100%"
                h={{ base: '400px', md: '600px' }}
                style={{ aspectRatio: '479 / 672' }}
              >
                <Image
                  src="/foto-home.webp"
                  alt="Dr. Massuca realizando exame de ultrassom"
                  width="479"
                  height="672"
                  position="absolute"
                  top="0"
                  left="0"
                  w="100%"
                  h="100%"
                  objectFit="cover"
                  objectPosition="center"
                  loading="eager"
                  decoding="sync"
                  borderRadius="16px"
                  boxShadow="0 20px 60px rgba(2, 12, 27, 0.5)"
                />
              </Box>
            </Box>
          </Box>
        </Box>

        {/* ============ AS QUATRO CAMADAS ============ */}
        <Box maxW="1200px" mx="auto" px={4} py={{ base: 12, md: 16 }}>
          <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={2}>
            Um médico, quatro frentes
          </Heading>
          <Text color="var(--brand-muted)" mb={8} maxW="640px">
            Tudo nasce do mesmo lugar: o encontro entre paciente, ultrassonografia e inteligência
            artificial.
          </Text>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
            {CAMADAS.map(camada => (
              <Box
                key={camada.title}
                bg="var(--brand-surface)"
                border="1px solid"
                borderColor="var(--brand-border)"
                borderRadius="16px"
                p={6}
                display="flex"
                flexDirection="column"
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
                  <camada.icon size={20} />
                </Box>
                <Heading as="h3" fontSize="lg" mb={2}>
                  {camada.title}
                </Heading>
                <Text fontSize="sm" color="var(--brand-muted)" flex="1" mb={4}>
                  {camada.text}
                </Text>
                <ChakraLink
                  as={RouterLink}
                  to={camada.to}
                  color="accent.500"
                  fontWeight={600}
                  fontSize="sm"
                  _hover={{ color: 'accent.600' }}
                >
                  {camada.cta} →
                </ChakraLink>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* ============ BLOG EM DESTAQUE ============ */}
        <Box bg="var(--brand-surface)" borderY="1px solid" borderColor="var(--brand-border)">
          <Box maxW="1200px" mx="auto" px={4} py={{ base: 12, md: 16 }}>
            <HStack justify="space-between" align="end" mb={8} flexWrap="wrap" gap={3}>
              <Box>
                <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={2}>
                  Blog: IA médica na prática
                </Heading>
                <Text color="var(--brand-muted)" maxW="560px">
                  Reviews de equipamentos, guias de hardware e análises técnicas escritas por quem
                  usa as ferramentas em consultório.
                </Text>
              </Box>
              <Button
                as={RouterLink}
                to="/ia-medica"
                variant="outline"
                colorScheme="blue"
                borderColor="accent.500"
                color="accent.600"
                _hover={{ bg: 'var(--brand-accent-soft)' }}
              >
                Ver todos os artigos
              </Button>
            </HStack>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={5} minH="200px">
              {destaques.map(artigo => (
                <ChakraLink
                  key={artigo.slug || artigo.id}
                  as={RouterLink}
                  to={`/ia-medica/artigo/${artigo.slug || artigo.id}`}
                  _hover={{ textDecoration: 'none' }}
                >
                  <Box
                    bg="white"
                    border="1px solid"
                    borderColor="var(--brand-border)"
                    borderRadius="16px"
                    p={6}
                    h="100%"
                    display="flex"
                    flexDirection="column"
                    transition="all 0.2s ease"
                    _hover={{
                      boxShadow: 'var(--brand-shadow-lifted)',
                      transform: 'translateY(-4px)',
                    }}
                  >
                    <HStack spacing={2} mb={3}>
                      {artigo.category && (
                        <Tag size="sm" bg="var(--brand-accent-soft)" color="accent.600">
                          {artigo.category}
                        </Tag>
                      )}
                      {artigo.readTime && (
                        <Text fontSize="xs" color="var(--brand-muted)">
                          {artigo.readTime}
                        </Text>
                      )}
                    </HStack>
                    <Heading as="h3" fontSize="md" mb={2} noOfLines={3}>
                      {artigo.title}
                    </Heading>
                    <Text fontSize="sm" color="var(--brand-muted)" noOfLines={3} flex="1">
                      {artigo.excerpt || artigo.subtitle}
                    </Text>
                  </Box>
                </ChakraLink>
              ))}
            </SimpleGrid>
          </Box>
        </Box>

        {/* ============ BANNER DO CURSO ============ */}
        <Box maxW="1200px" mx="auto" px={4} py={{ base: 12, md: 16 }}>
          <Box
            bgImage="var(--brand-hero-gradient)"
            borderRadius="20px"
            p={{ base: 8, md: 12 }}
            color="white"
            display="flex"
            flexDirection={{ base: 'column', md: 'row' }}
            alignItems={{ base: 'start', md: 'center' }}
            gap={6}
          >
            <Box flex="1">
              <Text
                fontSize="sm"
                fontWeight={600}
                color="accent.400"
                mb={2}
                textTransform="uppercase"
                letterSpacing="wider"
              >
                Curso em parceria com a ICS Academy
              </Text>
              <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} color="white" mb={3}>
                Medicina com IA: o método prático para o médico moderno
              </Heading>
              <Text color="whiteAlpha.800" maxW="640px">
                Este site é a prova viva do que o curso ensina: SEO, GEO, automação e IA aplicada à
                prática médica real, sem hype e sem promessa mágica.
              </Text>
            </Box>
            <Button
              as={RouterLink}
              to="/curso-medicina-com-ia"
              size="lg"
              bg="accent.500"
              color="white"
              _hover={{ bg: 'accent.600' }}
              flexShrink={0}
            >
              Conhecer o curso
            </Button>
          </Box>
        </Box>

        {/* ============ CONSULTÓRIO: INFORMAÇÃO PRÁTICA ============ */}
        <Box bg="var(--brand-surface)" borderY="1px solid" borderColor="var(--brand-border)">
          <Box maxW="1200px" mx="auto" px={4} py={{ base: 12, md: 16 }}>
            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} alignItems="center">
              <Box>
                <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={4}>
                  O consultório continua sendo o centro de tudo
                </Heading>
                <Text color="var(--brand-text-soft)" mb={6}>
                  Mais de 24 tipos de exames de ultrassom com equipamento premium Samsung HERA Z20,
                  laudos com interpretação clínica e mais de 20 anos de experiência. É dessa prática
                  diária que nascem o curso, os produtos e as palestras.
                </Text>
                <VStack align="start" spacing={2} mb={6}>
                  <Text fontSize="sm" color="var(--brand-muted)">
                    <strong>Endereço:</strong> Rua 19, Qd. 33, Lt. 01, Vila Leonor, Itaberaí, GO
                  </Text>
                  <Text fontSize="sm" color="var(--brand-muted)">
                    <strong>Horário:</strong> segunda a sexta, 8h às 18h; sábado, 8h às 12h
                  </Text>
                  <Text fontSize="sm" color="var(--brand-muted)">
                    <strong>WhatsApp:</strong> (62) 99660-2117
                  </Text>
                </VStack>
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
                    to="/exames"
                    variant="outline"
                    borderColor="accent.500"
                    color="accent.600"
                    _hover={{ bg: 'var(--brand-accent-soft)' }}
                  >
                    Ver todos os exames
                  </Button>
                </Stack>
              </Box>
              <Box>
                {/* Bloco pergunta-resposta: GEO em linguagem natural */}
                <VStack align="stretch" spacing={4}>
                  {PERGUNTAS_GEO.map(item => (
                    <Box
                      key={item.q}
                      bg="white"
                      border="1px solid"
                      borderColor="var(--brand-border)"
                      borderRadius="12px"
                      p={5}
                    >
                      <Heading as="h3" fontSize="md" mb={2}>
                        {item.q}
                      </Heading>
                      <Text fontSize="sm" color="var(--brand-text-soft)">
                        {item.a}
                      </Text>
                    </Box>
                  ))}
                </VStack>
              </Box>
            </SimpleGrid>
          </Box>
        </Box>
      </Box>

      {/* Chatbot */}
      <Chatbot />
    </>
  );
}

export default Home;
