import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  HStack,
  Tag,
  Link as ChakraLink,
} from '@chakra-ui/react';
import { FaExternalLinkAlt, FaLock, FaMobileAlt } from 'react-icons/fa';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Página dos produtos Xdiag.
 * Copy de AILA e Xdiag Privacy extraído do site oficial xdiag.com.br
 * (repositório drmassuca/xdiag). O elastus fica fora do site por
 * enquanto, por decisão do fundador; entra quando for lançado.
 */

const PRODUTOS = [
  {
    icon: FaMobileAlt,
    nome: 'AILA',
    tag: 'Para pacientes',
    resumo:
      'App de saúde com IA para Android e iPhone. Organiza sintomas, exames e histórico antes da consulta, com lembrete de medicamentos, mapa do SUS e ficha clínica em PDF. Grátis.',
    url: 'https://xdiag.com.br/aila',
    urlLabel: 'Ver o AILA',
  },
  {
    icon: FaLock,
    nome: 'Xdiag Privacy',
    tag: 'Open source',
    resumo:
      'Ferramenta gratuita e open source que anonimiza laudos, fichas, receitas e guias TISS direto no computador, sem enviar nenhum arquivo para a nuvem. Feita para o português do Brasil.',
    url: 'https://xdiag.com.br/xdiag-privacy',
    urlLabel: 'Ver o Xdiag Privacy',
  },
];

function XdiagPage() {
  useScrollToTop();

  return (
    <>
      <SEO
        title="Produtos Xdiag | Software de IA para Medicina | Dr. Massuca"
        description="Xdiag Tecnologias: AILA e Xdiag Privacy. Software de inteligência artificial para medicina criado pelo Dr. Massuca, médico ultrassonografista. IA que amplia o médico, feita por quem atende paciente todos os dias."
        canonical="/xdiag"
        keywords="Xdiag, software IA médica, AILA app saúde, Xdiag Privacy anonimização, IA para médicos Brasil"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            '@id': 'https://drmassuca.com.br/xdiag#org',
            name: 'Xdiag Tecnologias',
            url: 'https://xdiag.com.br',
            founder: { '@id': 'https://drmassuca.com.br/#person' },
            description:
              'Empresa de software de inteligência artificial para medicina, fundada pelo médico ultrassonografista Dr. Antonio Massucatti Neto.',
            makesOffer: PRODUTOS.map(p => ({
              '@type': 'Offer',
              itemOffered: {
                '@type': 'SoftwareApplication',
                name: p.nome,
                description: p.resumo,
                url: p.url,
              },
            })),
          })}
        </script>
      </Helmet>

      <Box maxW="1200px" mx="auto" px={0} py={{ base: 6, md: 10 }}>
        {/* Cabeçalho: contexto de produto pede o ciano da Xdiag */}
        <Box mb={12} maxW="720px">
          <HStack spacing={2} mb={4}>
            <Tag bg="cyan.50" color="cyan.700" fontWeight={600}>
              Xdiag Tecnologias
            </Tag>
          </HStack>
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} mb={4}>
            Software de IA para medicina, criado dentro do consultório
          </Heading>
          <Text color="var(--brand-text-soft)" fontSize="lg" mb={3}>
            A Xdiag nasceu de uma constatação simples: as melhores ferramentas para médicos são
            desenhadas por quem vive a rotina clínica. Sou fundador e CEO, e cada produto resolve um
            problema que eu mesmo enfrento atendendo pacientes.
          </Text>
          <Text color="var(--brand-muted)">
            Nenhum produto promete substituir o médico. Todos partem do princípio oposto: a IA
            amplia o médico e depende do fundamento dele.
          </Text>
        </Box>

        {/* Produtos */}
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} mb={12} maxW="820px">
          {PRODUTOS.map(produto => (
            <Box
              key={produto.nome}
              bg="white"
              border="1px solid"
              borderColor="var(--brand-border)"
              borderRadius="16px"
              p={7}
              display="flex"
              flexDirection="column"
              transition="all 0.2s ease"
              _hover={{ boxShadow: 'var(--brand-shadow-glow)', transform: 'translateY(-4px)' }}
            >
              <HStack justify="space-between" mb={4}>
                <Box
                  bgGradient="linear(135deg, cyan.500, cyan.400)"
                  color="white"
                  w="44px"
                  h="44px"
                  borderRadius="12px"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <produto.icon size={20} />
                </Box>
                <Tag size="sm" bg="var(--brand-surface)" color="var(--brand-muted)">
                  {produto.tag}
                </Tag>
              </HStack>
              <Heading as="h2" fontSize="xl" mb={3}>
                {produto.nome}
              </Heading>
              <Text fontSize="sm" color="var(--brand-text-soft)" flex="1" mb={5}>
                {produto.resumo}
              </Text>
              <ChakraLink
                href={produto.url}
                isExternal
                color="cyan.600"
                fontWeight={600}
                fontSize="sm"
                display="inline-flex"
                alignItems="center"
                gap="6px"
                _hover={{ color: 'cyan.700' }}
              >
                {produto.urlLabel} <FaExternalLinkAlt size={11} />
              </ChakraLink>
            </Box>
          ))}
        </SimpleGrid>

        {/* CTA institucional */}
        <Box
          bgImage="var(--brand-hero-gradient)"
          borderRadius="20px"
          p={{ base: 8, md: 10 }}
          color="white"
          textAlign="center"
        >
          <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} color="white" mb={3}>
            Quer conhecer a Xdiag por dentro?
          </Heading>
          <Text color="whiteAlpha.800" maxW="560px" mx="auto" mb={6}>
            Sites, SEO local, agentes de IA e sistemas sob medida para quem trabalha com saúde.
          </Text>
          <Button
            as="a"
            href="https://xdiag.com.br"
            target="_blank"
            rel="noopener noreferrer"
            size="lg"
            bg="cyan.500"
            color="white"
            rightIcon={<FaExternalLinkAlt size={13} />}
            _hover={{ bg: 'cyan.600' }}
          >
            Visitar xdiag.com.br
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default XdiagPage;
