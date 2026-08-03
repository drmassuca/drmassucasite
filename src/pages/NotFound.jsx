import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  const title = 'Página não encontrada | Dr. Massuca';
  const description = 'A página que você tentou acessar não existe. Volte para a página inicial.';
  const canonical = 'https://drmassuca.com.br/404';

  return (
    <Box as="main" maxW="960px" mx="auto" px={4} py={10}>
      {/* noindex: o Vercel reescreve toda URL desconhecida para index.html
          (HTTP 200), então sem isso o Google indexaria soft-404s. */}
      <SEO title={title} description={description} canonical={canonical} noindex />

      {/* Card branco: mesmo padrão das demais páginas — sem ele o texto fica
          escuro sobre a textura verde escura do layout, ilegível. */}
      <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl" textAlign="center">
        <Heading
          as="h1"
          size="xl"
          mb={4}
          color="green.700"
          textShadow="1px 1px 1px rgba(0,0,0,0.4)"
        >
          Página não encontrada
        </Heading>
        <Text mb={8} color="gray.700">
          Talvez o link tenha mudado ou nunca existiu.
        </Text>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} justify="center">
          <Button as={RouterLink} to="/" size="lg" colorScheme="green">
            Voltar para a Home
          </Button>
          <Button as={RouterLink} to="/exames" size="lg" variant="outline" colorScheme="green">
            Ver os exames
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
