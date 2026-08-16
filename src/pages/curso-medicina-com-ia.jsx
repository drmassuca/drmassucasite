import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { Box, Heading, Text, Button, SimpleGrid, HStack, VStack, Tag } from '@chakra-ui/react';
import { FaExternalLinkAlt, FaCheck } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Página do curso Medicina com IA, em parceria com a ICS Academy.
 * Nome oficial do curso conforme definido na família Xdiag/ICS:
 * "Medicina com IA: O Método Prático para o Médico Moderno".
 */

const PILARES = [
  {
    titulo: 'Fundamento antes de ferramenta',
    texto:
      'Você aprende como a IA funciona de verdade (modelos, limites, alucinação, privacidade) antes de aplicar qualquer ferramenta na rotina.',
  },
  {
    titulo: 'Prática real de consultório',
    texto:
      'Casos de uso que eu aplico no meu próprio atendimento: laudos, comunicação com paciente, organização da agenda, estudo e atualização.',
  },
  {
    titulo: 'Presença digital que funciona',
    texto:
      'SEO e GEO aplicados à medicina: como ser encontrado por pacientes no Google e por assistentes de IA. Este site é a prova viva do método.',
  },
  {
    titulo: 'Ética e segurança',
    texto:
      'LGPD, dados de paciente, responsabilidade médica e os limites do que a IA pode e não pode fazer na prática clínica.',
  },
];

const PARA_QUEM = [
  'Médicos de qualquer especialidade que querem usar IA com critério',
  'Residentes e recém-formados construindo carreira e presença digital',
  'Donos de clínica e consultório que querem eficiência sem perder qualidade',
  'Médicos céticos que querem entender o assunto antes de aderir',
];

function CursoMedicinaComIA() {
  useScrollToTop();

  return (
    <>
      <SEO
        title="Curso Medicina com IA para Médicos | Dr. Massuca e ICS Academy"
        description="Medicina com IA: o método prático para o médico moderno. Curso do Dr. Massuca em parceria com a ICS Academy. IA aplicada à rotina clínica, sem hype: a IA amplia o médico e depende do fundamento dele."
        canonical="/curso-medicina-com-ia"
        keywords="curso IA para médicos, curso inteligência artificial medicina, Medicina com IA, ICS Academy, capacitação médica IA, curso Dr Massuca"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Course',
            '@id': 'https://drmassuca.com.br/curso-medicina-com-ia#course',
            name: 'Medicina com IA: O Método Prático para o Médico Moderno',
            description:
              'Curso de inteligência artificial aplicada à prática médica: fundamentos de IA, casos de uso reais de consultório, presença digital (SEO e GEO), ética e segurança de dados. A tese do curso: a IA amplia o médico e depende do fundamento dele.',
            provider: {
              '@type': 'Organization',
              name: 'ICS Academy',
              url: 'https://academy.icscursos.com.br',
            },
            instructor: { '@id': 'https://drmassuca.com.br/#person' },
            inLanguage: 'pt-BR',
            availableLanguage: 'pt-BR',
            teaches: [
              'Fundamentos de inteligência artificial para medicina',
              'IA aplicada à rotina de consultório',
              'SEO e GEO para médicos',
              'Ética, LGPD e segurança de dados em saúde',
            ],
          })}
        </script>
      </Helmet>

      <Box maxW="1200px" mx="auto" px={0} py={{ base: 6, md: 10 }}>
        {/* Hero do curso */}
        <Box
          bgImage="var(--brand-hero-gradient)"
          borderRadius="20px"
          p={{ base: 8, md: 14 }}
          color="white"
          mb={12}
        >
          <Tag bg="whiteAlpha.200" color="accent.400" fontWeight={600} mb={4}>
            Em parceria com a ICS Academy
          </Tag>
          <Heading
            as="h1"
            fontSize={{ base: '3xl', md: '5xl' }}
            color="white"
            lineHeight="1.1"
            letterSpacing="-0.02em"
            mb={5}
            maxW="800px"
          >
            Medicina com IA:{' '}
            <Text as="span" bgGradient="linear(to-r, accent.400, accent.500)" bgClip="text">
              o método prático
            </Text>{' '}
            para o médico moderno
          </Heading>
          <Text color="whiteAlpha.800" fontSize={{ base: 'md', md: 'lg' }} maxW="640px" mb={8}>
            Um curso de médico para médico. Sem promessa mágica, sem terrorismo de substituição: a
            IA amplia o médico, e este curso ensina o fundamento e a prática para usar isso a favor
            do seu paciente e da sua carreira.
          </Text>
          <HStack spacing={3} flexWrap="wrap">
            <Button
              as="a"
              href="https://academy.icscursos.com.br"
              target="_blank"
              rel="noopener noreferrer"
              size="lg"
              bg="accent.500"
              color="white"
              rightIcon={<FaExternalLinkAlt size={13} />}
              _hover={{ bg: 'accent.600' }}
            >
              Acessar a ICS Academy
            </Button>
            <Button
              as={RouterLink}
              to="/sobre"
              size="lg"
              variant="outline"
              color="white"
              borderColor="whiteAlpha.500"
              _hover={{ bg: 'whiteAlpha.200' }}
            >
              Quem ensina
            </Button>
          </HStack>
        </Box>

        {/* Pilares */}
        <Heading as="h2" fontSize={{ base: '2xl', md: '3xl' }} mb={2}>
          O que o método cobre
        </Heading>
        <Text color="var(--brand-muted)" mb={8} maxW="640px">
          Quatro pilares, sempre na mesma ordem: primeiro o fundamento, depois a ferramenta.
        </Text>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={14}>
          {PILARES.map((pilar, i) => (
            <Box
              key={pilar.titulo}
              bg="var(--brand-surface)"
              border="1px solid"
              borderColor="var(--brand-border)"
              borderRadius="16px"
              p={7}
            >
              <Text fontSize="sm" fontWeight={700} color="accent.500" mb={2}>
                {String(i + 1).padStart(2, '0')}
              </Text>
              <Heading as="h3" fontSize="lg" mb={2}>
                {pilar.titulo}
              </Heading>
              <Text fontSize="sm" color="var(--brand-text-soft)">
                {pilar.texto}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Para quem + prova viva */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10} mb={14} alignItems="start">
          <Box>
            <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={5}>
              Para quem é
            </Heading>
            <VStack align="start" spacing={3}>
              {PARA_QUEM.map(item => (
                <HStack key={item} align="start" spacing={3}>
                  <Box color="var(--brand-success)" pt={1}>
                    <FaCheck size={14} />
                  </Box>
                  <Text color="var(--brand-text-soft)">{item}</Text>
                </HStack>
              ))}
            </VStack>
          </Box>
          <Box
            bg="var(--brand-accent-soft)"
            border="1px solid"
            borderColor="accent.200"
            borderRadius="16px"
            p={7}
          >
            <Heading as="h2" fontSize="lg" mb={3}>
              Este site é a prova viva do método
            </Heading>
            <Text fontSize="sm" color="var(--brand-text-soft)" mb={3}>
              Tudo que o curso ensina sobre presença digital está aplicado aqui: HTML semântico,
              dados estruturados, conteúdo que responde perguntas em linguagem natural, chatbot com
              base de conhecimento própria e indexação para buscadores e assistentes de IA.
            </Text>
            <Text fontSize="sm" color="var(--brand-text-soft)">
              Pesquise por este site no Google ou pergunte sobre ele a um assistente de IA e veja o
              resultado. O método é auditável em produção.
            </Text>
          </Box>
        </SimpleGrid>

        {/* CTA final */}
        <Box textAlign="center" py={6}>
          <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={3}>
            As matrículas acontecem na plataforma da ICS Academy
          </Heading>
          <Text color="var(--brand-muted)" mb={6} maxW="560px" mx="auto">
            Turmas, datas e valores são publicados diretamente na plataforma do curso. A ICS Academy
            é desenvolvida pela Xdiag: até a infraestrutura de ensino pratica o que o curso prega.
          </Text>
          <Button
            as="a"
            href="https://academy.icscursos.com.br"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            bg="accent.500"
            color="white"
            rightIcon={<FaExternalLinkAlt size={13} />}
            _hover={{ bg: 'accent.600' }}
          >
            Ir para a ICS Academy
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default CursoMedicinaComIA;
