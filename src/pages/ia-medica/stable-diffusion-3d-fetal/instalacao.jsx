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
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaWindows, FaLinux, FaApple, FaCheckCircle, FaExclamationTriangle } from 'react-icons/fa';

export default function Instalacao() {
  return (
    <Box minHeight="100vh" bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)">
      <Container maxW="5xl" py={20}>
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
            📥 Guia de Instalação
          </Badge>

          <Heading as="h1" size="2xl" color="white" textAlign="center" fontWeight="bold">
            Instalação do Stable Diffusion
          </Heading>

          <Text fontSize="lg" color="gray.200" maxW="3xl" textAlign="center" lineHeight="tall">
            Guia completo para instalar e configurar o Stable Diffusion para geração de imagens de
            ultrassom 3D fetal.
          </Text>
        </VStack>

        {/* Requisitos do Sistema */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#667eea">
              📋 Requisitos do Sistema
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              {/* Windows */}
              <Box>
                <HStack mb={3}>
                  <Icon as={FaWindows} color="#0078d4" boxSize={6} />
                  <Heading size="md" color="#667eea">
                    Windows
                  </Heading>
                </HStack>
                <VStack align="stretch" spacing={2} pl={8}>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>Windows 10/11 (64-bit)</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>NVIDIA GPU com 6GB+ VRAM (recomendado: RTX 3060 ou superior)</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>16GB+ RAM (recomendado: 32GB)</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>50GB+ espaço livre em disco</Text>
                  </HStack>
                </VStack>
              </Box>

              <Divider />

              {/* Linux */}
              <Box>
                <HStack mb={3}>
                  <Icon as={FaLinux} color="#fcc624" boxSize={6} />
                  <Heading size="md" color="#0f3d2e">
                    Linux
                  </Heading>
                </HStack>
                <VStack align="stretch" spacing={2} pl={8}>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>Ubuntu 20.04+ ou distribuição compatível</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>NVIDIA GPU com drivers CUDA instalados</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>Python 3.8+ e pip instalados</Text>
                  </HStack>
                </VStack>
              </Box>

              <Divider />

              {/* macOS */}
              <Box>
                <HStack mb={3}>
                  <Icon as={FaApple} color="#000000" boxSize={6} />
                  <Heading size="md" color="#0f3d2e">
                    macOS
                  </Heading>
                </HStack>
                <VStack align="stretch" spacing={2} pl={8}>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>macOS 12.0+ com Apple Silicon (M1/M2)</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaCheckCircle} color="green.500" boxSize={4} />
                    <Text>16GB+ Unified Memory</Text>
                  </HStack>
                  <HStack>
                    <Icon as={FaExclamationTriangle} color="orange.500" boxSize={4} />
                    <Text>Performance limitada comparado a GPUs NVIDIA</Text>
                  </HStack>
                </VStack>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Instalação Passo a Passo */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🚀 Instalação Passo a Passo
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={6}>
              <Alert status="info" borderRadius="lg">
                <AlertIcon />
                <Box>
                  <AlertTitle>Método Recomendado</AlertTitle>
                  <AlertDescription>
                    Vamos usar o AUTOMATIC1111 WebUI, a interface mais popular e estável para Stable
                    Diffusion.
                  </AlertDescription>
                </Box>
              </Alert>

              <OrderedList spacing={4}>
                <ListItem>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold" color="#667eea">
                      1. Instalar Python 3.10.6
                    </Text>
                    <Text color="gray.600">
                      Baixe e instale o Python 3.10.6 (versão recomendada) do site oficial:
                    </Text>
                    <Code p={3} borderRadius="md" bg="gray.100">
                      https://www.python.org/downloads/release/python-3106/
                    </Code>
                    <Alert status="warning" size="sm">
                      <AlertIcon />
                      <Text fontSize="sm">
                        ⚠️ Marque a opção &ldquo;Add Python to PATH&rdquo; durante a instalação!
                      </Text>
                    </Alert>
                  </VStack>
                </ListItem>

                <ListItem>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold" color="#0f3d2e">
                      2. Instalar Git
                    </Text>
                    <Text color="gray.600">Download do Git para Windows:</Text>
                    <Code p={3} borderRadius="md" bg="gray.100">
                      https://git-scm.com/download/win
                    </Code>
                  </VStack>
                </ListItem>

                <ListItem>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold" color="#0f3d2e">
                      3. Baixar Stable Diffusion WebUI
                    </Text>
                    <Text color="gray.600">Abra o terminal/prompt de comando e execute:</Text>
                    <Code p={3} borderRadius="md" bg="gray.100" whiteSpace="pre-wrap">
                      {`git clone https://github.com/AUTOMATIC1111/stable-diffusion-webui.git
cd stable-diffusion-webui`}
                    </Code>
                  </VStack>
                </ListItem>

                <ListItem>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold" color="#0f3d2e">
                      4. Primeira Execução
                    </Text>
                    <Text color="gray.600">
                      Execute o script de instalação (pode demorar 15-30 minutos):
                    </Text>
                    <Code p={3} borderRadius="md" bg="gray.100">
                      # Windows webui-user.bat # Linux/macOS ./webui.sh
                    </Code>
                    <Alert status="info" size="sm">
                      <AlertIcon />
                      <Text fontSize="sm">
                        💡 Na primeira execução, o sistema baixará automaticamente todas as
                        dependências.
                      </Text>
                    </Alert>
                  </VStack>
                </ListItem>

                <ListItem>
                  <VStack align="stretch" spacing={3}>
                    <Text fontWeight="bold" color="#0f3d2e">
                      5. Acessar a Interface
                    </Text>
                    <Text color="gray.600">Após a instalação, abra seu navegador e acesse:</Text>
                    <Code p={3} borderRadius="md" bg="gray.100">
                      http://localhost:7860
                    </Code>
                    <HStack>
                      <Icon as={FaCheckCircle} color="green.500" />
                      <Text color="green.600" fontWeight="bold">
                        Se ver a interface web, a instalação foi bem-sucedida!
                      </Text>
                    </HStack>
                  </VStack>
                </ListItem>
              </OrderedList>
            </VStack>
          </CardBody>
        </Card>

        {/* Problemas Comuns */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              ⚠️ Problemas Comuns
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={4}>
              <Box>
                <Text fontWeight="bold" color="#667eea" mb={2}>
                  Erro: &ldquo;Python não encontrado&rdquo;
                </Text>
                <Text color="gray.600" mb={2}>
                  Solução: Reinstale o Python marcando &ldquo;Add to PATH&rdquo; ou adicione
                  manualmente.
                </Text>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={2}>
                  Erro: &ldquo;CUDA out of memory&rdquo;
                </Text>
                <Text color="gray.600" mb={2}>
                  Solução: Reduza as dimensões da imagem ou use --lowvram no arquivo webui-user.bat
                </Text>
                <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm">
                  set COMMANDLINE_ARGS=--lowvram
                </Code>
              </Box>

              <Divider />

              <Box>
                <Text fontWeight="bold" color="#0f3d2e" mb={2}>
                  Interface web não carrega
                </Text>
                <Text color="gray.600" mb={2}>
                  Solução: Verifique se o firewall/antivírus não está bloqueando a porta 7860.
                </Text>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Navegação */}
        <Flex justify="space-between" flexWrap="wrap" gap={4}>
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal"
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: 'rgba(255,255,255,0.1)' }}
            size="lg"
            borderRadius="xl"
          >
            ← Voltar
          </Button>

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
            Próximo: Configuração →
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}
