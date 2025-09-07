import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  Card,
  CardBody,
  CardHeader,
  Button,
  Code,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  OrderedList,
  ListItem,
  Badge,
  Divider,
  Icon,
  Flex,
  Image,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaCog, FaDownload, FaBrain, FaPlay, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Configuracao() {
  return (
    <Box minHeight="100vh" bg="linear-gradient(135deg, #0f3d2e 0%, #1a5c42 100%)">
      <Container maxW="6xl" py={20}>
        {/* Header */}
        <VStack spacing={6} textAlign="center" mb={12}>
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
            ⚙️ Configuração Avançada
          </Badge>
          
          <Heading 
            as="h1" 
            size="2xl" 
            color="white" 
            textAlign="center"
            fontWeight="bold"
          >
            Configuração do Stable Diffusion
          </Heading>
          
          <Text 
            fontSize="lg" 
            color="gray.200" 
            maxW="3xl" 
            textAlign="center"
            lineHeight="tall"
          >
            Configure modelos, parâmetros e otimizações para obter os melhores resultados na geração de imagens fetais.
          </Text>
        </VStack>

        {/* Vídeo Tutorial */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardBody p={6}>
            <VStack spacing={4}>
              <Heading size="lg" color="#0f3d2e">
                📺 Tutorial em Vídeo
              </Heading>
              
              <Box position="relative" bg="black" borderRadius="xl" overflow="hidden" w="100%" maxW="600px">
                <video
                  width="100%"
                  height="300"
                  controls
                  style={{ objectFit: 'cover' }}
                >
                  <source src="/videos/tutorialsd.mp4" type="video/mp4" />
                  Seu navegador não suporta vídeos HTML5.
                </video>
              </Box>
              
              <Text color="gray.600" textAlign="center" maxW="500px">
                Assista ao tutorial completo de configuração e veja como otimizar 
                o Stable Diffusion para gerar as melhores imagens fetais.
              </Text>
            </VStack>
          </CardBody>
        </Card>

        {/* Download de Modelos */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              📥 Download de Modelos Recomendados
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>Modelos Especializados</AlertTitle>
                  <AlertDescription>
                    Para melhores resultados com imagens fetais, recomendamos modelos específicos treinados para conteúdo médico.
                  </AlertDescription>
                </Box>
              </Alert>

              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th color="#0f3d2e">Modelo</Th>
                    <Th color="#0f3d2e">Tamanho</Th>
                    <Th color="#0f3d2e">Descrição</Th>
                    <Th color="#0f3d2e">Link</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td fontWeight="bold">Realistic Vision v5.1</Td>
                    <Td>2.13 GB</Td>
                    <Td>Excelente para imagens realistas</Td>
                    <Td>
                      <Badge colorScheme="blue" variant="outline">Civitai</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">Deliberate v2</Td>
                    <Td>2.13 GB</Td>
                    <Td>Ótimo para controle de detalhes</Td>
                    <Td>
                      <Badge colorScheme="green" variant="outline">Civitai</Badge>
                    </Td>
                  </Tr>
                  <Tr>
                    <Td fontWeight="bold">ChilloutMix</Td>
                    <Td>2.13 GB</Td>
                    <Td>Especializado em rostos humanos</Td>
                    <Td>
                      <Badge colorScheme="purple" variant="outline">Civitai</Badge>
                    </Td>
                  </Tr>
                </Tbody>
              </Table>

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={2}>
                  Onde baixar:
                </Text>
                <VStack align="stretch" spacing={2} pl={4}>
                  <Text>• <strong>Civitai.com</strong> - Maior repositório de modelos</Text>
                  <Text>• <strong>Hugging Face</strong> - Modelos oficiais e comunitários</Text>
                  <Text>• <strong>Local:</strong> Coloque os arquivos .safetensors em:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm">
                    stable-diffusion-webui/models/Stable-diffusion/
                  </Code>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Configurações de Parâmetros */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🎛️ Configurações de Parâmetros
            </Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8}>
              {/* Parâmetros Básicos */}
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="#0f3d2e">Parâmetros Básicos</Heading>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>Dimensões da Imagem:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100">
                    Width: 512px | Height: 512px
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Para imagens fetais, formato quadrado funciona bem
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Steps de Sampling:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100">
                    20-30 steps
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Mais steps = maior qualidade, mais tempo
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>CFG Scale:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100">
                    7-12
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Controla o quanto a IA segue o prompt
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Sampler:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100">
                    DPM++ 2M Karras (recomendado)
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Boa qualidade com velocidade razoável
                  </Text>
                </Box>
              </VStack>

              {/* Parâmetros Avançados */}
              <VStack align="stretch" spacing={4}>
                <Heading size="md" color="#0f3d2e">Parâmetros Avançados</Heading>
                
                <Box>
                  <Text fontWeight="bold" mb={2}>Seed:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100">
                    -1 (aleatório)
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Use seeds fixos para reproduzir resultados
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Batch Count:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100">
                    4-8 imagens
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Gere várias opções para escolher a melhor
                  </Text>
                </Box>

                <Box>
                  <Text fontWeight="bold" mb={2}>Negative Prompt:</Text>
                  <Code p={2} borderRadius="md" bg="gray.100" whiteSpace="pre-wrap">
{`lowres, bad anatomy, bad hands, 
text, error, missing fingers, 
extra digit, fewer digits, 
cropped, worst quality, 
low quality, normal quality`}
                  </Code>
                  <Text fontSize="sm" color="gray.600" mt={1}>
                    Evita elementos indesejados na imagem
                  </Text>
                </Box>
              </VStack>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Otimizações de Performance */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🚀 Otimizações de Performance
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <Alert status="warning" borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>Importante</AlertTitle>
                  <AlertDescription>
                    Estas configurações devem ser adicionadas no arquivo webui-user.bat (Windows) ou webui-user.sh (Linux/Mac).
                  </AlertDescription>
                </Box>
              </Alert>

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={3}>
                  Para GPUs com menos de 8GB VRAM:
                </Text>
                <Code p={3} borderRadius="md" bg="gray.100" whiteSpace="pre-wrap">
{`set COMMANDLINE_ARGS=--medvram --opt-split-attention --opt-sub-quad-attention`}
                </Code>
              </Box>

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={3}>
                  Para GPUs com menos de 4GB VRAM:
                </Text>
                <Code p={3} borderRadius="md" bg="gray.100" whiteSpace="pre-wrap">
{`set COMMANDLINE_ARGS=--lowvram --opt-split-attention --always-batch-cond-uncond`}
                </Code>
              </Box>

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={3}>
                  Para CPUs (sem GPU dedicada):
                </Text>
                <Code p={3} borderRadius="md" bg="gray.100" whiteSpace="pre-wrap">
{`set COMMANDLINE_ARGS=--skip-torch-cuda-test --precision full --no-half --use-cpu all`}
                </Code>
                <Alert status="info" size="sm" mt={2}>
                  <AlertIcon />
                  <Text fontSize="sm">
                    ⚠️ CPU é muito lento! Espere 10-30 minutos por imagem.
                  </Text>
                </Alert>
              </Box>

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={3}>
                  Para acelerar o carregamento:
                </Text>
                <Code p={3} borderRadius="md" bg="gray.100" whiteSpace="pre-wrap">
{`set COMMANDLINE_ARGS=--xformers`}
                </Code>
                <Text fontSize="sm" color="gray.600" mt={1">
                  Reduz uso de VRAM e acelera a geração
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Configuração de Extensões */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🔌 Extensões Recomendadas
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Text color="gray.600">
                Acesse a aba "Extensions" na interface web e instale estas extensões úteis:
              </Text>

              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                  <Text fontWeight="bold" color="#0f3d2e" mb={2}>ControlNet</Text>
                  <Text fontSize="sm" color="gray.600">
                    Controle preciso da pose e composição das imagens
                  </Text>
                </Box>

                <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                  <Text fontWeight="bold" color="#0f3d2e" mb={2}>Ultimate SD Upscale</Text>
                  <Text fontSize="sm" color="gray.600">
                    Aumenta resolução sem perder qualidade
                  </Text>
                </Box>

                <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                  <Text fontWeight="bold" color="#0f3d2e" mb={2}>Additional Networks</Text>
                  <Text fontSize="sm" color="gray.600">
                    Suporte para LoRA e outros modelos pequenos
                  </Text>
                </Box>

                <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                  <Text fontWeight="bold" color="#0f3d2e" mb={2}>Dynamic Prompts</Text>
                  <Text fontSize="sm" color="gray.600">
                    Gera variações automáticas de prompts
                  </Text>
                </Box>
              </SimpleGrid>
            </VStack>
          </CardBody>
        </Card>

        {/* Navegação */}
        <Flex justify="space-between" flexWrap="wrap" gap={4}>
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/instalacao"
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
            size="lg"
            borderRadius="xl"
          >
            ← Instalação
          </Button>
          
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/exemplos"
            bg="#d4af37"
            color="#0f3d2e"
            _hover={{ bg: "#b8941f" }}
            size="lg"
            borderRadius="xl"
            fontWeight="bold"
          >
            Próximo: Exemplos →
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}