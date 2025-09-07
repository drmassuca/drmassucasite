import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  const title = 'Página não encontrada | Dr. Massuca';
  const description = 'A página que você tentou acessar não existe. Volte para a página inicial.';
  const canonical = 'https://drmassuca.com.br/404';

  return (
    <Box as="main" maxW="960px" mx="auto" px={6} py={16} textAlign="center">
      <SEO title={title} description={description} canonical={canonical} />
      <Heading as="h1" size="xl" mb={4}>
        Página não encontrada
      </Heading>
      <Text mb={8}>Talvez o link tenha mudado ou nunca existiu.</Text>
      <Button as={RouterLink} to="/" size="lg">
        Voltar para a Home
      </Button>
    </Box>
  );
}
