import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Icon,
  Button,
  HStack,
  Tag,
  Link as ChakraLink,
} from '@chakra-ui/react';
import {
  FaHeart,
  FaBullseye,
  FaFileAlt,
  FaComments,
  FaWhatsapp,
  FaStethoscope,
  FaGraduationCap,
  FaMicrochip,
  FaMicrophone,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Sobre: reescrito no reposicionamento 2026.
 * Quatro camadas em ordem de peso: médico ultrassonografista,
 * educador, criador de produtos de IA médica, palestrante.
 * O que define o conjunto: o cruzamento entre paciente,
 * ultrassonografia e inteligência artificial.
 */

const CAMADAS = [
  {
    icon: FaStethoscope,
    titulo: 'Médico ultrassonografista',
    texto:
      'Mais de 20 anos de medicina, pós-graduado em ultrassonografia geral e ecocardiografia fetal. Atendo em consultório próprio em Itaberaí, GO, com equipamento premium Samsung HERA Z20 e laudos com interpretação clínica. A vivência em contextos urbanos e rurais moldou uma prática de precisão técnica e escuta atenta.',
    link: { to: '/consultorio', label: 'Conhecer o consultório' },
  },
  {
    icon: FaGraduationCap,
    titulo: 'Educador',
    texto:
      'Ensino médicos a usar inteligência artificial com critério no curso Medicina com IA, em parceria com a ICS Academy. O método parte do fundamento, não da ferramenta: primeiro entender como a IA funciona e onde falha, depois aplicar na rotina clínica.',
    link: { to: '/curso-medicina-com-ia', label: 'Ver o curso' },
  },
  {
    icon: FaMicrochip,
    titulo: 'Criador de produtos de IA médica',
    texto:
      'Fundador e CEO da Xdiag Tecnologias. Cada produto (AILA, Xdiag Privacy e a plataforma ICS Academy) nasce de um problema real que enfrento atendendo pacientes e ensinando médicos. Software de saúde desenhado por quem vive a rotina clínica, com LGPD como premissa.',
    link: { to: '/xdiag', label: 'Ver os produtos' },
  },
  {
    icon: FaMicrophone,
    titulo: 'Palestrante',
    texto:
      'Falo sobre IA na medicina para congressos, faculdades e sociedades médicas, sempre com demonstração ao vivo e casos reais. Sem hype e sem terrorismo: a tese é que a IA amplia o médico e depende do fundamento dele.',
    link: { to: '/palestras', label: 'Convidar para palestra' },
  },
];

const VALORES = [
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
];

function About() {
  useScrollToTop();

  return (
    <>
      <SEO
        title="Sobre Dr. Antonio Massucatti Neto | Ultrassonografista e Especialista em IA Médica"
        description="Dr. Massuca: médico ultrassonografista com mais de 20 anos de experiência (CRM-GO 17475), educador, fundador da Xdiag Tecnologias e palestrante sobre IA na medicina. O cruzamento entre paciente, ultrassonografia e inteligência artificial."
        canonical="/sobre"
        keywords="Dr Massuca, Antonio Massucatti Neto, CRM-GO 17475, ultrassonografista, médico inteligência artificial, fundador Xdiag, professor IA medicina"
        type="profile"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ProfilePage',
            name: 'Sobre o Dr. Antonio Massucatti Neto',
            url: 'https://drmassuca.com.br/sobre',
            mainEntity: {
              '@type': 'Person',
              '@id': 'https://drmassuca.com.br/#person',
              name: 'Dr. Antonio Massucatti Neto',
              alternateName: 'Dr. Massuca',
              identifier: 'CRM-GO 17475',
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
              sameAs: [
                'https://instagram.com/drmassuca',
                'https://x.com/massucas',
                'https://xdiag.com.br',
              ],
            },
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

      <Box maxW="1200px" mx="auto" px={0} py={{ base: 6, md: 10 }}>
        {/* Abertura */}
        <Box mb={12} maxW="760px">
          <Tag bg="var(--brand-accent-soft)" color="accent.600" fontWeight={600} mb={4}>
            Sobre
          </Tag>
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} mb={5}>
            Antonio Massucatti Neto
          </Heading>
          <Text color="var(--brand-text-soft)" fontSize="lg" mb={4}>
            Sou médico ultrassonografista (CRM-GO 17475) há mais de 20 anos. O que me define é um
            cruzamento pouco comum: passo os dias entre o paciente na maca, o transdutor na mão e
            ferramentas de inteligência artificial que eu mesmo ajudo a construir.
          </Text>
          <Text color="var(--brand-muted)">
            Dessa combinação nasceram quatro frentes de trabalho, sempre nesta ordem de importância:
            a medicina no consultório, o ensino, os produtos da Xdiag e as palestras. Tudo parte do
            mesmo princípio: a IA amplia o médico, e depende do fundamento dele.
          </Text>
        </Box>

        {/* As quatro camadas */}
        <VStack align="stretch" spacing={5} mb={14}>
          {CAMADAS.map((camada, i) => (
            <Box
              key={camada.titulo}
              bg="var(--brand-surface)"
              border="1px solid"
              borderColor="var(--brand-border)"
              borderRadius="16px"
              p={{ base: 6, md: 8 }}
            >
              <HStack align="start" spacing={5}>
                <Box
                  bg="var(--brand-accent-soft)"
                  color="accent.600"
                  w="48px"
                  h="48px"
                  minW="48px"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <camada.icon size={20} />
                </Box>
                <Box>
                  <Text fontSize="xs" fontWeight={700} color="accent.500" mb={1}>
                    {String(i + 1).padStart(2, '0')}
                  </Text>
                  <Heading as="h2" fontSize="xl" mb={2}>
                    {camada.titulo}
                  </Heading>
                  <Text color="var(--brand-text-soft)" fontSize="sm" mb={3}>
                    {camada.texto}
                  </Text>
                  <ChakraLink
                    as={RouterLink}
                    to={camada.link.to}
                    color="accent.500"
                    fontWeight={600}
                    fontSize="sm"
                    _hover={{ color: 'accent.600' }}
                  >
                    {camada.link.label} →
                  </ChakraLink>
                </Box>
              </HStack>
            </Box>
          ))}
        </VStack>

        {/* Valores (preservados do site anterior) */}
        <Box mb={12}>
          <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={6}>
            Valores e filosofia
          </Heading>
          <SimpleGrid columns={{ base: 1, sm: 2, lg: 4 }} spacing={5}>
            {VALORES.map(({ icon, title, text }) => (
              <Box
                key={title}
                bg="white"
                border="1px solid"
                borderColor="var(--brand-border)"
                borderRadius="16px"
                p={6}
                textAlign="center"
              >
                <Icon as={icon} boxSize={7} color="accent.500" mb={3} />
                <Heading as="h3" fontSize="md" mb={2}>
                  {title}
                </Heading>
                <Text fontSize="sm" color="var(--brand-muted)">
                  {text}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        {/* Missão */}
        <Box
          bgImage="var(--brand-hero-gradient)"
          borderRadius="20px"
          p={{ base: 8, md: 10 }}
          color="white"
          textAlign="center"
          mb={4}
        >
          <Text
            fontStyle="italic"
            fontSize={{ base: 'md', md: 'lg' }}
            maxW="720px"
            mx="auto"
            mb={6}
            color="whiteAlpha.900"
          >
            &quot;Minha missão é entregar diagnósticos precisos, humanos e responsáveis, e provar na
            prática que a tecnologia bem usada devolve ao médico o que ele tem de mais escasso:
            tempo e atenção para o paciente.&quot;
          </Text>
          <Button
            as="a"
            href="https://wa.me/5562996602117"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<FaWhatsapp />}
            bg="accent.500"
            color="white"
            _hover={{ bg: 'accent.600' }}
          >
            Entre em contato
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default About;
