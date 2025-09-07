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
  Badge,
  Divider,
  Icon,
  Flex,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FaQuestionCircle, 
  FaExclamationTriangle, 
  FaTools, 
  FaRocket,
  FaMemory,
  FaDesktop,
  FaCog,
  FaBug
} from 'react-icons/fa';

export default function Problemas() {
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
            🔧 Troubleshooting
          </Badge>
          
          <Heading 
            as="h1" 
            size="2xl" 
            color="white" 
            textAlign="center"
            fontWeight="bold"
          >
            Soluções de Problemas
          </Heading>
          
          <Text 
            fontSize="lg" 
            color="gray.200" 
            maxW="3xl" 
            textAlign="center"
            lineHeight="tall"
          >
            Encontre soluções rápidas para os problemas mais comuns ao usar o Stable Diffusion para geração de imagens fetais.
          </Text>
        </VStack>

        {/* Problemas Mais Comuns */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🚨 Problemas Mais Comuns
            </Heading>
          </CardHeader>
          <CardBody>
            <Accordion allowMultiple>
              {/* Problema 1 */}
              <AccordionItem>
                <AccordionButton>
                  <Icon as={FaMemory} color="red.500" mr={3} />
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    CUDA out of memory / Erro de VRAM
                  </Box>
                  <Badge colorScheme="red" mr={2}>Crítico</Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Alert status="error" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Sintoma:</AlertTitle>
                        <AlertDescription>
                          RuntimeError: CUDA out of memory / Torch not compiled with CUDA support
                        </AlertDescription>
                      </Box>
                    </Alert>
                    
                    <Box>
                      <Text fontWeight="bold" color="#0f3d2e" mb={2}>Soluções:</Text>
                      <VStack align="stretch" spacing={3} pl={4}>
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">1. Adicionar flag --medvram</Text>
                          <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm" w="100%">
                            set COMMANDLINE_ARGS=--medvram
                          </Code>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">2. Para GPUs com menos de 4GB</Text>
                          <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm" w="100%">
                            set COMMANDLINE_ARGS=--lowvram --opt-split-attention
                          </Code>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">3. Reduzir dimensões da imagem</Text>
                          <Text fontSize="sm" color="gray.600">
                            Use 512x512 em vez de resoluções maiores
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">4. Reduzir batch size</Text>
                          <Text fontSize="sm" color="gray.600">
                            Gere 1-2 imagens por vez em vez de 4-8
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              {/* Problema 2 */}
              <AccordionItem>
                <AccordionButton>
                  <Icon as={FaDesktop} color="orange.500" mr={3} />
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Interface web não carrega / Erro de conexão
                  </Box>
                  <Badge colorScheme="orange" mr={2}>Moderado</Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Alert status="warning" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Sintoma:</AlertTitle>
                        <AlertDescription>
                          http://localhost:7860 não abre ou demora muito para carregar
                        </AlertDescription>
                      </Box>
                    </Alert>
                    
                    <Box>
                      <Text fontWeight="bold" color="#0f3d2e" mb={2}>Soluções:</Text>
                      <VStack align="stretch" spacing={3} pl={4}>
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">1. Verificar se o processo está rodando</Text>
                          <Text fontSize="sm" color="gray.600">
                            Procure por "python.exe" no Gerenciador de Tarefas
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">2. Aguardar inicialização completa</Text>
                          <Text fontSize="sm" color="gray.600">
                            A primeira vez pode demorar 5-15 minutos
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">3. Verificar firewall/antivírus</Text>
                          <Text fontSize="sm" color="gray.600">
                            Libere a porta 7860 no firewall do Windows
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">4. Tentar outra porta</Text>
                          <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm" w="100%">
                            set COMMANDLINE_ARGS=--port 7861
                          </Code>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              {/* Problema 3 */}
              <AccordionItem>
                <AccordionButton>
                  <Icon as={FaBug} color="purple.500" mr={3} />
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Imagens borradas ou de baixa qualidade
                  </Box>
                  <Badge colorScheme="purple" mr={2}>Comum</Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Alert status="info" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Sintoma:</AlertTitle>
                        <AlertDescription>
                          Imagens saem com pouca definição, borradas ou com artifacts
                        </AlertDescription>
                      </Box>
                    </Alert>
                    
                    <Box>
                      <Text fontWeight="bold" color="#0f3d2e" mb={2}>Soluções:</Text>
                      <VStack align="stretch" spacing={3} pl={4}>
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">1. Aumentar steps de sampling</Text>
                          <Text fontSize="sm" color="gray.600">
                            Use 25-30 steps em vez de 15-20
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">2. Ajustar CFG Scale</Text>
                          <Text fontSize="sm" color="gray.600">
                            Tente valores entre 7-12 para melhor aderência ao prompt
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">3. Usar modelo de qualidade</Text>
                          <Text fontSize="sm" color="gray.600">
                            Modelos como "Realistic Vision" ou "Deliberate" geram melhor qualidade
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">4. Melhorar o prompt</Text>
                          <Text fontSize="sm" color="gray.600">
                            Adicione "high quality", "detailed", "sharp focus"
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">5. Negative prompt robusto</Text>
                          <Text fontSize="sm" color="gray.600">
                            Inclua "blurry", "low quality", "worst quality"
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              {/* Problema 4 */}
              <AccordionItem>
                <AccordionButton>
                  <Icon as={FaCog} color="blue.500" mr={3} />
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Geração muito lenta
                  </Box>
                  <Badge colorScheme="blue" mr={2}>Performance</Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Alert status="info" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Sintoma:</AlertTitle>
                        <AlertDescription>
                          Demora mais de 5 minutos para gerar uma imagem
                        </AlertDescription>
                      </Box>
                    </Alert>
                    
                    <Box>
                      <Text fontWeight="bold" color="#0f3d2e" mb={2}>Soluções:</Text>
                      <VStack align="stretch" spacing={3} pl={4}>
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">1. Habilitar xformers</Text>
                          <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm" w="100%">
                            set COMMANDLINE_ARGS=--xformers
                          </Code>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">2. Usar precision float16</Text>
                          <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm" w="100%">
                            set COMMANDLINE_ARGS=--precision full --no-half
                          </Code>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">3. Fechar outros programas</Text>
                          <Text fontSize="sm" color="gray.600">
                            Libere RAM e VRAM fechando navegadores, jogos, etc.
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">4. Atualizar drivers GPU</Text>
                          <Text fontSize="sm" color="gray.600">
                            Baixe os drivers mais recentes da NVIDIA/AMD
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              {/* Problema 5 */}
              <AccordionItem>
                <AccordionButton>
                  <Icon as={FaExclamationTriangle} color="red.500" mr={3} />
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    Python não encontrado / Erro de instalação
                  </Box>
                  <Badge colorScheme="red" mr={2}>Instalação</Badge>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={4}>
                    <Alert status="error" borderRadius="lg">
                      <AlertIcon />
                      <Box>
                        <AlertTitle>Sintoma:</AlertTitle>
                        <AlertDescription>
                          'python' is not recognized as an internal or external command
                        </AlertDescription>
                      </Box>
                    </Alert>
                    
                    <Box>
                      <Text fontWeight="bold" color="#0f3d2e" mb={2}>Soluções:</Text>
                      <VStack align="stretch" spacing={3} pl={4}>
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">1. Reinstalar Python marcando "Add to PATH"</Text>
                          <Text fontSize="sm" color="gray.600">
                            Download: python.org/downloads/release/python-3106/
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">2. Adicionar manualmente ao PATH</Text>
                          <Text fontSize="sm" color="gray.600">
                            Sistema → Configurações Avançadas → Variáveis de Ambiente
                          </Text>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">3. Usar Python Launcher</Text>
                          <Code p={2} borderRadius="md" bg="gray.100" fontSize="sm" w="100%">
                            py -3.10 --version
                          </Code>
                        </Box>
                        
                        <Box>
                          <Text fontWeight="bold" fontSize="sm">4. Reiniciar terminal/computador</Text>
                          <Text fontSize="sm" color="gray.600">
                            Após adicionar ao PATH, reinicie o prompt de comando
                          </Text>
                        </Box>
                      </VStack>
                    </Box>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Tabela de Especificações Mínimas */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              📊 Tabela de Performance por Hardware
            </Heading>
          </CardHeader>
          <CardBody>
            <Table variant="simple" size="sm">
              <Thead>
                <Tr>
                  <Th>Hardware</Th>
                  <Th>VRAM</Th>
                  <Th>Tempo/Imagem</Th>
                  <Th>Qualidade</Th>
                  <Th>Configuração</Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td fontWeight="bold">RTX 4090</Td>
                  <Td>24GB</Td>
                  <Td>30-60s</Td>
                  <Td><Badge colorScheme="green">Excelente</Badge></Td>
                  <Td>Padrão</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">RTX 3080</Td>
                  <Td>10GB</Td>
                  <Td>1-2min</Td>
                  <Td><Badge colorScheme="green">Excelente</Badge></Td>
                  <Td>Padrão</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">RTX 3060</Td>
                  <Td>6GB</Td>
                  <Td>2-4min</Td>
                  <Td><Badge colorScheme="blue">Boa</Badge></Td>
                  <Td>--medvram</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">GTX 1660</Td>
                  <Td>4GB</Td>
                  <Td>5-10min</Td>
                  <Td><Badge colorScheme="orange">Moderada</Badge></Td>
                  <Td>--lowvram</Td>
                </Tr>
                <Tr>
                  <Td fontWeight="bold">CPU Intel/AMD</Td>
                  <Td>0GB</Td>
                  <Td>20-40min</Td>
                  <Td><Badge colorScheme="red">Limitada</Badge></Td>
                  <Td>--use-cpu</Td>
                </Tr>
              </Tbody>
            </Table>
            
            <Text fontSize="sm" color="gray.600" mt={4}>
              * Tempos baseados em imagens 512x512, 25 steps, CFG 7
            </Text>
          </CardBody>
        </Card>

        {/* Links Úteis */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🔗 Links Úteis para Suporte
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack align="stretch" spacing={3}>
              <HStack>
                <Icon as={FaQuestionCircle} color="#0f3d2e" />
                <Text>
                  <strong>GitHub Oficial:</strong> github.com/AUTOMATIC1111/stable-diffusion-webui
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaQuestionCircle} color="#0f3d2e" />
                <Text>
                  <strong>Reddit Community:</strong> r/StableDiffusion
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaQuestionCircle} color="#0f3d2e" />
                <Text>
                  <strong>Discord Oficial:</strong> discord.gg/stablediffusion
                </Text>
              </HStack>
              <HStack>
                <Icon as={FaQuestionCircle} color="#0f3d2e" />
                <Text>
                  <strong>Modelos:</strong> civitai.com | huggingface.co
                </Text>
              </HStack>
            </VStack>
          </CardBody>
        </Card>

        {/* Aviso Final */}
        <Box mb={8}>
          <Alert 
            status="warning" 
            borderRadius="xl" 
            bg="rgba(255, 193, 7, 0.1)"
            border="1px solid #d4af37"
          >
            <AlertIcon color="#d4af37" />
            <Box>
              <AlertTitle color="#d4af37">Importante!</AlertTitle>
              <AlertDescription color="white">
                Se os problemas persistirem, considere buscar ajuda na comunidade ou 
                verificar se seu hardware atende aos requisitos mínimos. 
                Use sempre com responsabilidade e seguindo diretrizes médicas apropriadas.
              </AlertDescription>
            </Box>
          </Alert>
        </Box>

        {/* Navegação */}
        <Flex justify="space-between" flexWrap="wrap" gap={4}>
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/exemplos"
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
            size="lg"
            borderRadius="xl"
          >
            ← Exemplos
          </Button>
          
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal"
            bg="#d4af37"
            color="#0f3d2e"
            _hover={{ bg: "#b8941f" }}
            size="lg"
            borderRadius="xl"
            fontWeight="bold"
          >
            Voltar ao Início
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}