import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  CardHeader,
  Button,
  Image,
  Badge,
  Flex,
  Icon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaBrain, FaStethoscope, FaRobot, FaChartLine } from 'react-icons/fa';

export default function IAMedica() {
  return (
    <Box minHeight="100vh" bg="linear-gradient(135deg, #0f3d2e 0%, #1a5c42 100%)">
      <Container maxW="7xl" py={20}>
        {/* Header da Seção */}
        <VStack spacing={6} textAlign="center" mb={16}>
          <Badge 
            colorScheme="yellow" 
            fontSize="md" 
            px={4} 
            py={2} 
            borderRadius="full"
            bg="#d4af37"
            color="#0f3d2e"
            fontWeight="bold"
          >
            🤖 Inteligência Artificial Médica
          </Badge>
          
          <Heading 
            as="h1" 
            size="2xl" 
            color="white" 
            textAlign="center"
            fontWeight="bold"
          >
            IA Médica
          </Heading>
          
          <Text 
            fontSize="xl" 
            color="gray.200" 
            maxW="3xl" 
            textAlign="center"
            lineHeight="tall"
          >
            Explore as mais recentes tecnologias de Inteligência Artificial aplicadas à medicina. 
            Ferramentas inovadoras para diagnóstico, análise de imagens e otimização de processos médicos.
          </Text>
        </VStack>

        {/* Card Principal - Stable Diffusion */}
        <Box mb={12}>
          <Card 
            bg="rgba(255,255,255,0.95)" 
            borderRadius="2xl" 
            overflow="hidden"
            boxShadow="2xl"
            border="3px solid"
            borderColor="#d4af37"
          >
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={0}>
              {/* Imagem */}
              <Box position="relative">
                <Image
                  src="/imagens-3d/ultrassom-3d-ia.jpg"
                  alt="Stable Diffusion para Ultrassom 3D Fetal"
                  h="300px"
                  w="100%"
                  objectFit="cover"
                />
                <Badge
                  position="absolute"
                  top={4}
                  left={4}
                  bg="#0f3d2e"
                  color="white"
                  px={3}
                  py={1}
                  borderRadius="full"
                  fontWeight="bold"
                >
                  🔥 Destaque
                </Badge>
              </Box>
              
              {/* Conteúdo */}
              <CardBody p={8}>
                <VStack align="stretch" spacing={4}>
                  <Heading size="lg" color="#0f3d2e">
                    Stable Diffusion 3D Fetal
                  </Heading>
                  
                  <Text color="gray.600" fontSize="md" lineHeight="tall">
                    Revolucione seus exames de ultrassom 3D fetal com Inteligência Artificial. 
                    Gere imagens realistas e melhore a experiência dos pais com tecnologia 
                    de ponta em Stable Diffusion.
                  </Text>
                  
                  <Flex wrap="wrap" gap={2}>
                    <Badge colorScheme="green" variant="subtle">Ultrassom 3D</Badge>
                    <Badge colorScheme="blue" variant="subtle">IA Generativa</Badge>
                    <Badge colorScheme="purple" variant="subtle">Stable Diffusion</Badge>
                    <Badge colorScheme="orange" variant="subtle">Medicina Fetal</Badge>
                  </Flex>
                  
                  <Button
                    as={RouterLink}
                    to="/ia-medica/stable-diffusion-3d-fetal"
                    bg="#0f3d2e"
                    color="white"
                    _hover={{ bg: "#1a5c42", transform: "translateY(-2px)" }}
                    size="lg"
                    borderRadius="xl"
                    rightIcon={<Icon as={FaBrain} />}
                    transition="all 0.3s"
                  >
                    Explorar Ferramenta
                  </Button>
                </VStack>
              </CardBody>
            </SimpleGrid>
          </Card>
        </Box>

        {/* Cards de Artigos Futuros */}
        <VStack spacing={8} align="stretch">
          <Heading size="lg" color="white" textAlign="center">
            Próximos Artigos e Ferramentas
          </Heading>
          
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
            {/* Card 1 */}
            <Card 
              bg="rgba(255,255,255,0.9)" 
              borderRadius="xl"
              _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
              transition="all 0.3s"
              cursor="pointer"
            >
              <CardHeader pb={2}>
                <Flex align="center" gap={3}>
                  <Icon as={FaStethoscope} color="#0f3d2e" boxSize={6} />
                  <Heading size="md" color="#0f3d2e">
                    Diagnóstico por IA
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <Text color="gray.600" fontSize="sm">
                  Sistemas de IA para análise automática de exames e 
                  auxílio no diagnóstico médico preciso.
                </Text>
                <Badge mt={3} colorScheme="blue" variant="outline">
                  Em Breve
                </Badge>
              </CardBody>
            </Card>

            {/* Card 2 */}
            <Card 
              bg="rgba(255,255,255,0.9)" 
              borderRadius="xl"
              _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
              transition="all 0.3s"
              cursor="pointer"
            >
              <CardHeader pb={2}>
                <Flex align="center" gap={3}>
                  <Icon as={FaRobot} color="#0f3d2e" boxSize={6} />
                  <Heading size="md" color="#0f3d2e">
                    Chatbots Médicos
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <Text color="gray.600" fontSize="sm">
                  Assistentes virtuais inteligentes para triagem inicial 
                  e orientação de pacientes.
                </Text>
                <Badge mt={3} colorScheme="purple" variant="outline">
                  Em Desenvolvimento
                </Badge>
              </CardBody>
            </Card>

            {/* Card 3 */}
            <Card 
              bg="rgba(255,255,255,0.9)" 
              borderRadius="xl"
              _hover={{ transform: "translateY(-4px)", boxShadow: "xl" }}
              transition="all 0.3s"
              cursor="pointer"
            >
              <CardHeader pb={2}>
                <Flex align="center" gap={3}>
                  <Icon as={FaChartLine} color="#0f3d2e" boxSize={6} />
                  <Heading size="md" color="#0f3d2e">
                    Analytics Médico
                  </Heading>
                </Flex>
              </CardHeader>
              <CardBody pt={0}>
                <Text color="gray.600" fontSize="sm">
                  Análise de dados médicos com IA para insights 
                  e otimização de processos clínicos.
                </Text>
                <Badge mt={3} colorScheme="orange" variant="outline">
                  Planejado
                </Badge>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>

        {/* Call to Action */}
        <Box 
          mt={16} 
          p={8} 
          bg="rgba(255,255,255,0.1)" 
          borderRadius="2xl"
          border="1px solid rgba(255,255,255,0.2)"
          textAlign="center"
        >
          <VStack spacing={4}>
            <Heading size="lg" color="white">
              Interessado em IA Médica?
            </Heading>
            <Text color="gray.200" maxW="2xl">
              Entre em contato para saber mais sobre como implementar 
              soluções de Inteligência Artificial em sua prática médica.
            </Text>
            <Button
              as={RouterLink}
              to="/contato"
              bg="#d4af37"
              color="#0f3d2e"
              _hover={{ bg: "#b8941f", transform: "translateY(-2px)" }}
              size="lg"
              borderRadius="xl"
              fontWeight="bold"
            >
              Falar Conosco
            </Button>
          </VStack>
        </Box>
      </Container>
    </Box>
  );
}