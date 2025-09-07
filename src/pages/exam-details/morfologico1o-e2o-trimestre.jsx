import SEO from '../../components/SEO';
import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

function Morfologico1oE2oTrimestre() {
  return (
    <>
      <SEO
        title="Morfologico1O E2O Trimestre – Dr. Massuca"
        description="Morfologico1O E2O Trimestre com explicações claras e avaliação detalhada, auxiliando diagnóstico preciso e seguro em Itaberaí-GO."
        canonical="https://www.drmassuca.com.br/exames/morfologico1o-e2o-trimestre"
      />
      <Box maxW="1200px" mx="auto" px={4} py={10}>
        <Box bg="whiteAlpha.900" borderRadius="lg" p={{ base: 6, md: 10 }} boxShadow="lg">
          <Heading as="h1" size="lg" mb={4} color="green.700">
            Morfológico 1º e 2º trimestre
          </Heading>

          <VStack align="start" spacing={4}>
            <Text>
              <strong>Para que serve:</strong> Este exame segue as boas práticas médicas para
              avaliação detalhada conforme indicação clínica.
            </Text>
            <Text>
              <strong>Órgãos / regiões avaliadas:</strong> [preencher]
            </Text>
            <Text>
              <strong>Duração média:</strong> 15–30&nbsp;min
            </Text>
            <Text>
              <strong>Preparo:</strong> [preparo específico conforme orientação]
            </Text>

            <Button
              as="a"
              href="https://wa.me/5562996602117"
              leftIcon={<FaWhatsapp />}
              bg="green.700"
              color="white"
              _hover={{ bg: 'green.800' }}
              size="md"
            >
              Agendar pelo WhatsApp
            </Button>

            <Button as={RouterLink} to="/exames" variant="outline" size="sm">
              ← Voltar para lista de exames
            </Button>

            <Box
              w="100%"
              h="200px"
              bg="gray.200"
              borderRadius="md"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text color="gray.500">Imagem em construção</Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
}

export default Morfologico1oE2oTrimestre;
