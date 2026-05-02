import { useEffect, useState } from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Stack,
  List,
  ListItem,
  UnorderedList,
  OrderedList,
  Link as CLink,
  Button,
  Skeleton,
  SkeletonText,
} from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { Helmet } from 'react-helmet-async';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import SEO from '../../components/SEO';

// Mapeia elementos de markdown para componentes Chakra. Mantém visual coerente
// com as FAQs hardcoded em src/pages/faq/*.jsx (Heading verde, UnorderedList, etc).
const markdownComponents = {
  h1: ({ children }) => (
    <Heading as="h1" size="lg" color="green.700" mt={6} mb={3}>
      {children}
    </Heading>
  ),
  h2: ({ children }) => (
    <Heading as="h2" size="md" color="green.700" mt={6} mb={2}>
      {children}
    </Heading>
  ),
  h3: ({ children }) => (
    <Heading as="h3" size="sm" color="green.700" mt={4} mb={2}>
      {children}
    </Heading>
  ),
  p: ({ children }) => (
    <Text lineHeight="1.8" mb={3}>
      {children}
    </Text>
  ),
  ul: ({ children }) => (
    <UnorderedList pl={6} spacing={1} mb={3}>
      {children}
    </UnorderedList>
  ),
  ol: ({ children }) => (
    <OrderedList pl={6} spacing={1} mb={3}>
      {children}
    </OrderedList>
  ),
  li: ({ children }) => <ListItem>{children}</ListItem>,
  strong: ({ children }) => (
    <Text as="strong" fontWeight="semibold">
      {children}
    </Text>
  ),
  em: ({ children }) => (
    <Text as="em" fontStyle="italic">
      {children}
    </Text>
  ),
  a: ({ href, children }) => (
    <CLink href={href} color="green.700" textDecoration="underline" isExternal>
      {children}
    </CLink>
  ),
};

const SUPA_URL = 'https://auvyolzrjoyzsribmapa.supabase.co';
const SUPA_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

async function supaFetch(path) {
  const res = await fetch(`${SUPA_URL}/rest/v1/${path}`, {
    headers: { apikey: SUPA_KEY, Authorization: `Bearer ${SUPA_KEY}` },
  });
  return res.json();
}

export default function FaqDynamic() {
  const { slug } = useParams();
  const [item, setItem] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      setNotFound(false);

      const data = await supaFetch(
        `faq_items?slug=eq.${encodeURIComponent(slug)}&approved=eq.true&limit=1`
      );

      if (!Array.isArray(data) || data.length === 0) {
        setNotFound(true);
        setLoading(false);
        return;
      }

      const current = data[0];
      setItem(current);

      const rel = await supaFetch(
        `faq_items?select=question,slug&section=eq.${encodeURIComponent(current.section)}&approved=eq.true&slug=neq.${encodeURIComponent(slug)}&limit=3`
      );

      setRelated(Array.isArray(rel) ? rel : []);
      setLoading(false);
    }

    load();
  }, [slug]);

  if (loading) {
    return (
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Skeleton height="36px" mb={4} width="80%" />
          <Skeleton height="20px" mb={6} width="60%" />
          <SkeletonText noOfLines={8} spacing={3} skeletonHeight="16px" />
        </Box>
      </Box>
    );
  }

  if (notFound) {
    return (
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading size="lg" color="green.700" mb={4}>
            Pergunta não encontrada
          </Heading>
          <Text color="gray.600" mb={6}>
            Esta pergunta não está disponível ou ainda não foi aprovada.
          </Text>
          <Button as={RouterLink} to="/faq" size="sm" variant="ghost">
            ← Voltar ao FAQ
          </Button>
        </Box>
      </Box>
    );
  }

  const canonical = `https://drmassuca.com.br/faq/${item.slug}`;
  const title = `${item.question} | FAQ Ultrassom – Dr. Massuca`;
  const desc = item.short_answer || item.answer?.slice(0, 160) || '';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': canonical,
    url: canonical,
    name: item.question,
    mainEntity: {
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer || item.short_answer,
      },
    },
    inLanguage: 'pt-BR',
    dateModified: item.updated_at?.slice(0, 10) || item.created_at?.slice(0, 10),
  };

  return (
    <Box maxW="900px" mx="auto" px={4} py={10}>
      <SEO title={title} description={desc} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
        <Heading
          as="h1"
          size="lg"
          mb={4}
          color="green.700"
          textShadow="1px 1px 1px rgba(0,0,0,0.4)"
        >
          {item.question}
        </Heading>

        <Text fontWeight="medium" mb={6} color="gray.700">
          {item.short_answer}
        </Text>

        <Stack spacing={6} color="gray.700">
          {/* Resposta completa em markdown, mapeada para componentes Chakra */}
          {item.answer && item.answer !== item.short_answer && (
            <Box>
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
                {item.answer}
              </ReactMarkdown>
            </Box>
          )}

          {/* Veja também */}
          {related.length > 0 && (
            <Stack spacing={2}>
              <Text fontWeight="semibold">Veja também:</Text>
              <List pl={6} spacing={1}>
                {related.map(r => (
                  <ListItem key={r.slug}>
                    <CLink as={RouterLink} to={`/faq/${r.slug}`} textDecoration="underline">
                      {r.question}
                    </CLink>
                  </ListItem>
                ))}
              </List>
            </Stack>
          )}

          <Button as={RouterLink} to="/faq" size="sm" variant="ghost" mt={2}>
            ← Voltar ao FAQ
          </Button>
        </Stack>

        {/* Botão WhatsApp */}
        <Box textAlign="center" mt={6}>
          <Button
            as="a"
            href="https://wa.me/5562996602117"
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<FaWhatsapp />}
            bg="green.700"
            color="white"
            _hover={{ bg: 'green.800' }}
            px={{ base: 4, md: 6 }}
            py={{ base: 3, md: 4 }}
            fontSize={{ base: 'sm', md: 'md' }}
            borderRadius="lg"
            minW={{ base: '220px', md: 'auto' }}
          >
            Falar com a clínica pelo WhatsApp
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
