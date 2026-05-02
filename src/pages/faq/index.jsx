import { useEffect, useState, useRef } from 'react';
import {
  Box,
  Heading,
  Text,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Skeleton,
  VStack,
  Input,
  InputGroup,
  InputRightElement,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';

export default function FaqIndex() {
  const [faqItems, setFaqItems] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [question, setQuestion]     = useState('');
  const [generating, setGenerating] = useState(false);
  const [genResult, setGenResult]   = useState(null);
  const [genError, setGenError]     = useState(null);
  const resultRef = useRef(null);

  async function handleGenerate() {
    if (!question.trim() || generating) return;
    setGenerating(true);
    setGenResult(null);
    setGenError(null);
    try {
      const res = await fetch('/api/generate-faq', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: question.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao gerar resposta');
      setGenResult(data);
      setTimeout(() => resultRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
    } catch (err) {
      setGenError(err.message);
    }
    setGenerating(false);
  }

  useEffect(() => {
    async function load() {
      const res = await fetch(
        'https://auvyolzrjoyzsribmapa.supabase.co/rest/v1/faq_items?select=question,slug,section,short_answer&approved=eq.true&order=section.asc,created_at.asc',
        {
          headers: {
            apikey: import.meta.env.VITE_SUPABASE_ANON_KEY,
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );
      const data = await res.json();
      if (Array.isArray(data)) setFaqItems(data);
      else console.error('FAQ error:', data);
      setLoading(false);
    }
    load();
  }, []);

  const canonical = 'https://drmassuca.com.br/faq';
  const title = 'FAQ – Dúvidas Frequentes sobre Ultrassom | Dr. Massuca';
  const description =
    'FAQ sobre exames de ultrassom em Itaberaí-GO – respostas rápidas do Dr. Massuca.';

  // Agrupar por seção
  const sections = [...new Set(faqItems.map(i => i.section))];
  const itemsBySection = sections.map(sec => ({
    section: sec,
    items: faqItems.filter(i => i.section === sec),
  }));

  // Schema FAQPage
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    name: 'FAQ – Dúvidas Frequentes sobre Ultrassom',
    url: canonical,
    mainEntity: faqItems.map(q => ({
      '@type': 'Question',
      name: q.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: q.short_answer,
      },
    })),
  };

  return (
    <>
      <SEO
        title={title}
        description={description}
        canonical={canonical}
        image="https://drmassuca.com.br/icons/icon-512.png"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>

      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            size="lg"
            mb={6}
            textAlign="center"
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            FAQ – Dúvidas Frequentes
          </Heading>

          {/* Caixa de busca com geração por IA */}
          <Box mb={8}>
            <Text fontSize="sm" color="gray.500" mb={2} textAlign="center">
              Não encontrou sua dúvida? Pergunte à IA:
            </Text>
            <InputGroup size="lg">
              <Input
                placeholder="Ex: Preciso de jejum para ultrassom pélvico?"
                value={question}
                onChange={e => setQuestion(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleGenerate()}
                focusBorderColor="green.500"
                bg="gray.50"
                borderRadius="lg"
                pr="7rem"
                disabled={generating}
              />
              <InputRightElement width="6.5rem">
                <Button
                  h="1.9rem"
                  size="sm"
                  bg="green.700"
                  color="white"
                  _hover={{ bg: 'green.800' }}
                  borderRadius="md"
                  onClick={handleGenerate}
                  isLoading={generating}
                  loadingText="Buscando..."
                  disabled={!question.trim()}
                >
                  Perguntar
                </Button>
              </InputRightElement>
            </InputGroup>

            {genError && (
              <Alert status="error" mt={3} borderRadius="md" fontSize="sm">
                <AlertIcon />{genError}
              </Alert>
            )}

            {genResult && (
              <Box ref={resultRef} mt={4} p={4} bg="green.50" borderRadius="lg" border="1px solid" borderColor="green.200">
                <Text fontSize="xs" color="green.700" fontWeight="bold" mb={1}>✨ Resposta gerada pela IA — aguardando aprovação da clínica</Text>
                <Text fontWeight="semibold" mb={1}>{genResult.question}</Text>
                <Text fontSize="sm" color="gray.700" mb={3}>{genResult.short_answer}</Text>
                <Button
                  as={RouterLink}
                  to={`/faq/${genResult.slug}`}
                  size="sm"
                  bg="green.700"
                  color="white"
                  _hover={{ bg: 'green.800' }}
                  borderRadius="md"
                >
                  Ver resposta completa
                </Button>
              </Box>
            )}
          </Box>

          {loading ? (
            <VStack spacing={8} align="stretch">
              {[1, 2, 3, 4].map(s => (
                <Box key={s}>
                  <Skeleton height="28px" mb={4} width="60%" />
                  <VStack spacing={2} align="stretch">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Skeleton key={i} height="48px" width="100%" borderRadius="md" />
                    ))}
                  </VStack>
                </Box>
              ))}
            </VStack>
          ) : (
            itemsBySection.map(({ section, items }) => (
              <Box key={section} mb={8}>
                <Heading
                  as="h2"
                  size="md"
                  mb={4}
                  color="green.700"
                  textShadow="1px 1px 1px rgba(0,0,0,0.4)"
                  borderBottom="1px solid"
                  borderColor="green.200"
                  pb={2}
                >
                  {section}
                </Heading>

                <Accordion allowToggle>
                  {items.map(item => (
                    <AccordionItem key={item.slug} border="none" mb={2}>
                      <h3>
                        <AccordionButton
                          _expanded={{ bg: 'green.50', color: 'green.800' }}
                          px={4}
                          py={3}
                          borderRadius="md"
                          fontSize={{ base: 'md', md: 'lg' }}
                          fontWeight="medium"
                          textAlign="left"
                          boxShadow="sm"
                          _hover={{
                            bg: 'green.100',
                            transform: 'translateY(-2px)',
                            boxShadow: 'md',
                          }}
                          transition="all 0.2s"
                        >
                          <Box flex="1" textAlign="left">
                            {item.question}
                          </Box>
                          <AccordionIcon />
                        </AccordionButton>
                      </h3>

                      <AccordionPanel pb={4} fontSize="sm" color="gray.700">
                        <Text mb={3}>{item.short_answer}</Text>
                        <Button
                          as={RouterLink}
                          to={`/faq/${item.slug}`}
                          size="sm"
                          bg="green.700"
                          color="white"
                          _hover={{ bg: 'green.800' }}
                          borderRadius="md"
                        >
                          Saiba mais
                        </Button>
                      </AccordionPanel>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Box>
            ))
          )}
        </Box>
      </Box>
    </>
  );
}
