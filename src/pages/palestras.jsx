import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  SimpleGrid,
  VStack,
  HStack,
  Input,
  Textarea,
  FormControl,
  FormLabel,
  Tag,
} from '@chakra-ui/react';
import { FaWhatsapp, FaMicrophone } from 'react-icons/fa';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Página de palestras: temas, formato e formulário de convite.
 * O formulário monta uma mensagem estruturada e abre o WhatsApp,
 * sem backend novo (mesmo canal usado para agendamento).
 *
 * O histórico de eventos é uma lista curada: adicionar novos itens
 * em EVENTOS conforme forem acontecendo.
 */

const TEMAS = [
  {
    titulo: 'IA na medicina, sem hype',
    texto:
      'O panorama real: o que a IA já faz bem na prática clínica, onde falha e por que o fundamento médico importa mais do que nunca.',
  },
  {
    titulo: 'O médico encontrável: SEO e GEO na saúde',
    texto:
      'Como pacientes e assistentes de IA encontram (ou não encontram) um médico. Método aplicado, com este site como estudo de caso ao vivo.',
  },
  {
    titulo: 'IA no ultrassom: da imagem ao laudo',
    texto:
      'O que muda no fluxo de trabalho do ultrassonografista com as ferramentas atuais de IA embarcada e de apoio ao laudo.',
  },
  {
    titulo: 'Construindo produtos de IA sendo médico',
    texto:
      'A trajetória da Xdiag: como transformar problemas reais de consultório em software, sem abandonar a medicina.',
  },
];

const EVENTOS = [
  {
    ano: '2026',
    nome: 'This Is Us 2026, Escola NEXUS',
    local: 'Brasília, DF',
    detalhe: 'Cobertura técnica e análise de equipamentos premium de ultrassom.',
  },
];

function Palestras() {
  useScrollToTop();

  const [form, setForm] = useState({
    nome: '',
    instituicao: '',
    cidade: '',
    data: '',
    tema: '',
    detalhes: '',
  });

  const atualizar = campo => e => setForm(prev => ({ ...prev, [campo]: e.target.value }));

  const enviarConvite = () => {
    const linhas = [
      'Olá, quero convidar o Dr. Massuca para uma palestra.',
      form.nome && `Nome: ${form.nome}`,
      form.instituicao && `Instituição/Evento: ${form.instituicao}`,
      form.cidade && `Cidade: ${form.cidade}`,
      form.data && `Data pretendida: ${form.data}`,
      form.tema && `Tema de interesse: ${form.tema}`,
      form.detalhes && `Detalhes: ${form.detalhes}`,
    ].filter(Boolean);
    const url = `https://wa.me/5562996602117?text=${encodeURIComponent(linhas.join('\n'))}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <SEO
        title="Palestras sobre IA na Medicina | Dr. Massuca | Convites para Eventos"
        description="Convide o Dr. Massuca para palestras sobre inteligência artificial na medicina: IA sem hype, SEO e GEO para médicos, IA no ultrassom e a trajetória da Xdiag. Congressos, faculdades e sociedades médicas."
        canonical="/palestras"
        keywords="palestrante IA medicina, palestra inteligência artificial médicos, palestrante médico IA, convite palestra medicina, Dr Massuca palestras"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            '@id': 'https://drmassuca.com.br/palestras#page',
            name: 'Palestras do Dr. Massuca sobre IA na medicina',
            about: { '@id': 'https://drmassuca.com.br/#person' },
            description:
              'Temas de palestras, histórico de eventos e formulário de convite para palestras do Dr. Antonio Massucatti Neto sobre inteligência artificial aplicada à medicina.',
          })}
        </script>
      </Helmet>

      <Box maxW="1200px" mx="auto" px={0} py={{ base: 6, md: 10 }}>
        {/* Cabeçalho */}
        <Box mb={12} maxW="720px">
          <Heading as="h1" fontSize={{ base: '3xl', md: '4xl' }} mb={4}>
            Palestras
          </Heading>
          <Text color="var(--brand-text-soft)" fontSize="lg" mb={3}>
            Falo sobre inteligência artificial na medicina do jeito que pratico: com demonstração ao
            vivo, casos reais de consultório e zero promessa mágica.
          </Text>
          <Text color="var(--brand-muted)">
            Formatos para congressos, faculdades de medicina, sociedades de especialidade, hospitais
            e eventos corporativos de saúde, presencial ou online.
          </Text>
        </Box>

        {/* Temas */}
        <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={6}>
          Temas
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={5} mb={14}>
          {TEMAS.map(tema => (
            <Box
              key={tema.titulo}
              bg="var(--brand-surface)"
              border="1px solid"
              borderColor="var(--brand-border)"
              borderRadius="16px"
              p={7}
            >
              <Box
                bg="var(--brand-accent-soft)"
                color="accent.600"
                w="40px"
                h="40px"
                borderRadius="10px"
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={4}
              >
                <FaMicrophone size={16} />
              </Box>
              <Heading as="h3" fontSize="lg" mb={2}>
                {tema.titulo}
              </Heading>
              <Text fontSize="sm" color="var(--brand-text-soft)">
                {tema.texto}
              </Text>
            </Box>
          ))}
        </SimpleGrid>

        {/* Histórico */}
        <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={6}>
          Participações recentes
        </Heading>
        <VStack align="stretch" spacing={4} mb={14}>
          {EVENTOS.map(evento => (
            <HStack
              key={evento.nome}
              bg="white"
              border="1px solid"
              borderColor="var(--brand-border)"
              borderRadius="12px"
              p={5}
              spacing={5}
              align="start"
            >
              <Tag bg="var(--brand-accent-soft)" color="accent.600" fontWeight={700} mt={1}>
                {evento.ano}
              </Tag>
              <Box>
                <Text fontWeight={600}>{evento.nome}</Text>
                <Text fontSize="sm" color="var(--brand-muted)">
                  {evento.local} · {evento.detalhe}
                </Text>
              </Box>
            </HStack>
          ))}
        </VStack>

        {/* Formulário de convite */}
        <Box
          bg="var(--brand-surface)"
          border="1px solid"
          borderColor="var(--brand-border)"
          borderRadius="20px"
          p={{ base: 6, md: 10 }}
          maxW="760px"
          mx="auto"
        >
          <Heading as="h2" fontSize={{ base: 'xl', md: '2xl' }} mb={2}>
            Convidar para palestra
          </Heading>
          <Text color="var(--brand-muted)" fontSize="sm" mb={8}>
            Preencha os dados e a mensagem chega direto no meu WhatsApp, já organizada.
          </Text>

          <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5} mb={5}>
            <FormControl isRequired>
              <FormLabel fontSize="sm">Seu nome</FormLabel>
              <Input bg="white" value={form.nome} onChange={atualizar('nome')} />
            </FormControl>
            <FormControl isRequired>
              <FormLabel fontSize="sm">Instituição ou evento</FormLabel>
              <Input bg="white" value={form.instituicao} onChange={atualizar('instituicao')} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Cidade</FormLabel>
              <Input bg="white" value={form.cidade} onChange={atualizar('cidade')} />
            </FormControl>
            <FormControl>
              <FormLabel fontSize="sm">Data pretendida</FormLabel>
              <Input
                bg="white"
                value={form.data}
                onChange={atualizar('data')}
                placeholder="Ex.: março de 2027"
              />
            </FormControl>
          </SimpleGrid>
          <FormControl mb={5}>
            <FormLabel fontSize="sm">Tema de interesse</FormLabel>
            <Input
              bg="white"
              value={form.tema}
              onChange={atualizar('tema')}
              placeholder="Um dos temas acima ou uma proposta sua"
            />
          </FormControl>
          <FormControl mb={8}>
            <FormLabel fontSize="sm">Detalhes (formato, público, duração)</FormLabel>
            <Textarea bg="white" rows={4} value={form.detalhes} onChange={atualizar('detalhes')} />
          </FormControl>

          <Button
            onClick={enviarConvite}
            leftIcon={<FaWhatsapp />}
            size="lg"
            w={{ base: '100%', sm: 'auto' }}
            bg="accent.500"
            color="white"
            _hover={{ bg: 'accent.600' }}
            isDisabled={!form.nome || !form.instituicao}
          >
            Enviar convite pelo WhatsApp
          </Button>
        </Box>
      </Box>
    </>
  );
}

export default Palestras;
