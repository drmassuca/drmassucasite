import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  SimpleGrid,
  Card,
  CardBody,
  Button,
  Badge,
  Flex,
  Icon,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import {
  FaDownload,
  FaCog,
  FaImages,
  FaQuestionCircle,
  FaCheckCircle,
  FaPlay,
  FaBrain,
  FaHeart,
  FaRocket,
} from 'react-icons/fa';

export default function StableDiffusion3DFetal() {
  return (
    <Box minHeight="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <Container maxW="7xl" py={20}>
        {/* Header */}
        <VStack spacing={6} textAlign="center" mb={12}>
          <Badge
            colorScheme="yellow"
            fontSize="md"
            px={4}
            py={2}
            borderRadius="full"
            bg="#a855f7"
            color="white"
            fontWeight="bold"
          >
            🤖 IA Generativa para Medicina
          </Badge>

          <Heading as="h1" size="2xl" color="white" textAlign="center" fontWeight="bold">
            Stable Diffusion 3D Fetal
          </Heading>

          <Text fontSize="xl" color="gray.200" maxW="4xl" textAlign="center" lineHeight="tall">
            Revolucione seus exames de ultrassom 3D fetal com Inteligência Artificial. Gere imagens
            realistas e emocionantes para proporcionar uma experiência única aos pais.
          </Text>
        </VStack>

        {/* Vídeo Tutorial */}
        <Box mb={12}>
          <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" overflow="hidden" boxShadow="2xl">
            <CardBody p={0}>
              <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={0}>
                {/* Vídeo */}
                <Box position="relative" bg="black">
                  <iframe
                    width="100%"
                    height="300"
                    src="https://www.youtube-nocookie.com/embed/2YeoU3L_TjI?modestbranding=1&rel=0&showinfo=0&iv_load_policy=3"
                    title="Tutorial de Configuração Stable Diffusion"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    style={{ borderRadius: '8px' }}
                  />
                </Box>

                {/* Descrição do Vídeo */}
                <VStack align="stretch" spacing={4} p={8}>
                  <Heading size="lg" color="#667eea">
                    Tutorial Completo
                  </Heading>

                  <Text color="gray.600" lineHeight="tall">
                    Assista ao tutorial completo de como configurar e usar o Stable Diffusion para
                    gerar imagens realistas de ultrassom 3D fetal.
                  </Text>

                  <VStack align="stretch" spacing={2}>
                    <HStack>
                      <Icon as={FaCheckCircle} color="green.500" />
                      <Text fontSize="sm">Instalação passo a passo</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaCheckCircle} color="green.500" />
                      <Text fontSize="sm">Configuração de modelos</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaCheckCircle} color="green.500" />
                      <Text fontSize="sm">Geração de imagens</Text>
                    </HStack>
                    <HStack>
                      <Icon as={FaCheckCircle} color="green.500" />
                      <Text fontSize="sm">Dicas e truques</Text>
                    </HStack>
                  </VStack>

                  <Button
                    as={RouterLink}
                    to="/ia-medica/stable-diffusion-3d-fetal/configuracao"
                    bg="#a855f7"
                    color="white"
                    _hover={{ bg: '#9333ea' }}
                    size="lg"
                    borderRadius="xl"
                    fontWeight="bold"
                  >
                    Ver Tutorial Detalhado
                  </Button>
                </VStack>
              </SimpleGrid>
            </CardBody>
          </Card>
        </Box>

        {/* Benefícios */}
        <VStack spacing={8} mb={12}>
          <Heading size="lg" color="white" textAlign="center">
            Por que usar IA em Ultrassom 3D?
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            <Card bg="rgba(255,255,255,0.9)" borderRadius="xl" p={6}>
              <VStack spacing={4} textAlign="center">
                <Icon as={FaHeart} color="#a855f7" boxSize={12} />
                <Heading size="md" color="#667eea">
                  Experiência Emocional
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Proporciona momentos únicos e emocionantes para os pais com imagens mais realistas
                  e detalhadas.
                </Text>
              </VStack>
            </Card>

            <Card bg="rgba(255,255,255,0.9)" borderRadius="xl" p={6}>
              <VStack spacing={4} textAlign="center">
                <Icon as={FaBrain} color="#a855f7" boxSize={12} />
                <Heading size="md" color="#0f3d2e">
                  Tecnologia Avançada
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Utiliza algoritmos de IA de última geração para melhorar a qualidade das imagens
                  fetais.
                </Text>
              </VStack>
            </Card>

            <Card bg="rgba(255,255,255,0.9)" borderRadius="xl" p={6}>
              <VStack spacing={4} textAlign="center">
                <Icon as={FaRocket} color="#a855f7" boxSize={12} />
                <Heading size="md" color="#0f3d2e">
                  Diferencial Competitivo
                </Heading>
                <Text color="gray.600" fontSize="sm">
                  Destaque-se no mercado oferecendo um serviço inovador e tecnologicamente avançado.
                </Text>
              </VStack>
            </Card>
          </SimpleGrid>
        </VStack>

        {/* Navegação Rápida */}
        <VStack spacing={8}>
          <Heading size="lg" color="white" textAlign="center">
            Guia Completo
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6} w="100%">
            {/* Instalação */}
            <Card
              bg="rgba(255,255,255,0.9)"
              borderRadius="xl"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <CardBody>
                <VStack spacing={4} textAlign="center">
                  <Icon as={FaDownload} color="#667eea" boxSize={8} />
                  <Heading size="md" color="#667eea">
                    Instalação
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Guia passo a passo para instalar o Stable Diffusion e todas as dependências
                    necessárias.
                  </Text>
                  <Button
                    as={RouterLink}
                    to="/ia-medica/stable-diffusion-3d-fetal/instalacao"
                    bg="#667eea"
                    color="white"
                    _hover={{ bg: '#764ba2' }}
                    size="sm"
                    borderRadius="lg"
                    w="100%"
                  >
                    Ver Guia
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Configuração */}
            <Card
              bg="rgba(255,255,255,0.9)"
              borderRadius="xl"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <CardBody>
                <VStack spacing={4} textAlign="center">
                  <Icon as={FaCog} color="#667eea" boxSize={8} />
                  <Heading size="md" color="#0f3d2e">
                    Configuração
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Configure modelos, parâmetros e otimizações para obter os melhores resultados.
                  </Text>
                  <Button
                    as={RouterLink}
                    to="/ia-medica/stable-diffusion-3d-fetal/configuracao"
                    bg="#0f3d2e"
                    color="white"
                    _hover={{ bg: '#1a5c42' }}
                    size="sm"
                    borderRadius="lg"
                    w="100%"
                  >
                    Configurar
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Exemplos */}
            <Card
              bg="rgba(255,255,255,0.9)"
              borderRadius="xl"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <CardBody>
                <VStack spacing={4} textAlign="center">
                  <Icon as={FaImages} color="#667eea" boxSize={8} />
                  <Heading size="md" color="#0f3d2e">
                    Exemplos
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Veja exemplos práticos de prompts e imagens geradas para ultrassom 3D fetal.
                  </Text>
                  <Button
                    as={RouterLink}
                    to="/ia-medica/stable-diffusion-3d-fetal/exemplos"
                    bg="#0f3d2e"
                    color="white"
                    _hover={{ bg: '#1a5c42' }}
                    size="sm"
                    borderRadius="lg"
                    w="100%"
                  >
                    Ver Exemplos
                  </Button>
                </VStack>
              </CardBody>
            </Card>

            {/* Problemas */}
            <Card
              bg="rgba(255,255,255,0.9)"
              borderRadius="xl"
              _hover={{ transform: 'translateY(-4px)', boxShadow: 'xl' }}
              transition="all 0.3s"
            >
              <CardBody>
                <VStack spacing={4} textAlign="center">
                  <Icon as={FaQuestionCircle} color="#667eea" boxSize={8} />
                  <Heading size="md" color="#0f3d2e">
                    Problemas
                  </Heading>
                  <Text color="gray.600" fontSize="sm">
                    Soluções para problemas comuns e dicas de troubleshooting e otimização.
                  </Text>
                  <Button
                    as={RouterLink}
                    to="/ia-medica/stable-diffusion-3d-fetal/problemas"
                    bg="#0f3d2e"
                    color="white"
                    _hover={{ bg: '#1a5c42' }}
                    size="sm"
                    borderRadius="lg"
                    w="100%"
                  >
                    Resolver
                  </Button>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>
        </VStack>

        {/* Aviso Importante */}
        <Box mt={12}>
          <Alert
            status="warning"
            borderRadius="xl"
            bg="rgba(168, 85, 247, 0.1)"
            border="1px solid #a855f7"
          >
            <AlertIcon color="#a855f7" />
            <Box>
              <AlertTitle color="#a855f7">Importante!</AlertTitle>
              <AlertDescription color="white">
                Esta ferramenta é destinada apenas para fins educacionais e de demonstração. Sempre
                siga as diretrizes médicas apropriadas e use com responsabilidade.
              </AlertDescription>
            </Box>
          </Alert>
        </Box>

        {/* Voltar */}
        <Flex justify="center" mt={8}>
          <Button
            as={RouterLink}
            to="/ia-medica"
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            size="lg"
            borderRadius="xl"
          >
            ← Voltar para IA Médica
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
