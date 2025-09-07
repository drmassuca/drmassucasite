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
  Image,
  SimpleGrid,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaImages, FaCopy, FaHeart, FaUserMd, FaEye } from 'react-icons/fa';

export default function Exemplos() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
  };

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
            🎨 Exemplos Práticos
          </Badge>
          
          <Heading 
            as="h1" 
            size="2xl" 
            color="white" 
            textAlign="center"
            fontWeight="bold"
          >
            Exemplos de Prompts e Imagens
          </Heading>
          
          <Text 
            fontSize="lg" 
            color="gray.200" 
            maxW="3xl" 
            textAlign="center"
            lineHeight="tall"
          >
            Veja exemplos práticos de prompts e imagens geradas para ultrassom 3D fetal. 
            Use como inspiração para criar suas próprias imagens.
          </Text>
        </VStack>

        {/* Galeria de Exemplos */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              🖼️ Galeria de Imagens Geradas
            </Heading>
          </CardHeader>
          <CardBody>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {/* Exemplo 1 */}
              <Box border="2px solid" borderColor="gray.200" borderRadius="xl" overflow="hidden">
                <Image
                  src="/imagens-3d/exemplo-fetal-1.jpg"
                  alt="Exemplo 1 - Rosto fetal realista"
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Badge colorScheme="green" mb={2}>Rosto Fetal</Badge>
                  <Text fontSize="sm" color="gray.600">
                    Imagem realista de rosto fetal com expressão serena
                  </Text>
                </Box>
              </Box>

              {/* Exemplo 2 */}
              <Box border="2px solid" borderColor="gray.200" borderRadius="xl" overflow="hidden">
                <Image
                  src="/imagens-3d/exemplo-fetal-2.jpg"
                  alt="Exemplo 2 - Mãos fetais"
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Badge colorScheme="blue" mb={2}>Mãos Fetais</Badge>
                  <Text fontSize="sm" color="gray.600">
                    Detalhe artístico das mãozinhas do bebê
                  </Text>
                </Box>
              </Box>

              {/* Exemplo 3 */}
              <Box border="2px solid" borderColor="gray.200" borderRadius="xl" overflow="hidden">
                <Image
                  src="/imagens-3d/exemplo-fetal-3.jpg"
                  alt="Exemplo 3 - Perfil fetal"
                  h="200px"
                  w="100%"
                  objectFit="cover"
                />
                <Box p={4}>
                  <Badge colorScheme="purple" mb={2}>Perfil Fetal</Badge>
                  <Text fontSize="sm" color="gray.600">
                    Vista lateral do rosto com detalhes do nariz
                  </Text>
                </Box>
              </Box>
            </SimpleGrid>
          </CardBody>
        </Card>

        {/* Prompts por Categoria */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              📝 Prompts por Categoria
            </Heading>
          </CardHeader>
          <CardBody>
            <Tabs variant="enclosed" colorScheme="green">
              <TabList>
                <Tab>👶 Rosto Fetal</Tab>
                <Tab>🤲 Mãos e Pés</Tab>
                <Tab>📐 Perfil</Tab>
                <Tab>💫 Artístico</Tab>
              </TabList>

              <TabPanels>
                {/* Tab Rosto Fetal */}
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    {/* Prompt 1 */}
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="green">Básico - Rosto Sereno</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("3D ultrasound baby face, peaceful expression, soft lighting, realistic, medical imaging, high detail, tender moment")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`3D ultrasound baby face, peaceful expression, soft lighting, realistic, medical imaging, high detail, tender moment`}
                      </Code>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        ✨ Ideal para: Primeiro contato dos pais com o rosto do bebê
                      </Text>
                    </Box>

                    {/* Prompt 2 */}
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="blue">Avançado - Detalhes Faciais</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("Close-up 3D ultrasound fetal face, detailed features, closed eyes, small nose, tiny lips, soft skin texture, warm lighting, medical photography style, hyperrealistic")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`Close-up 3D ultrasound fetal face, detailed features, closed eyes, small nose, tiny lips, soft skin texture, warm lighting, medical photography style, hyperrealistic`}
                      </Code>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        ✨ Ideal para: Demonstrar características faciais detalhadas
                      </Text>
                    </Box>

                    {/* Prompt 3 */}
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="purple">Artístico - Momento Especial</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("Beautiful 3D ultrasound baby portrait, gentle smile, dreaming peacefully, golden hour lighting, professional medical imaging, emotional moment, family treasure")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`Beautiful 3D ultrasound baby portrait, gentle smile, dreaming peacefully, golden hour lighting, professional medical imaging, emotional moment, family treasure`}
                      </Code>
                      <Text fontSize="sm" color="gray.600" mt={2}>
                        ✨ Ideal para: Criação de memórias especiais para a família
                      </Text>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Tab Mãos e Pés */}
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="orange">Mãozinhas Delicadas</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("3D ultrasound baby hands, tiny fingers, delicate details, soft lighting, medical imaging quality, precious moment, detailed anatomy")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`3D ultrasound baby hands, tiny fingers, delicate details, soft lighting, medical imaging quality, precious moment, detailed anatomy`}
                      </Code>
                    </Box>

                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="teal">Pezinhos Adoráveis</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("3D ultrasound baby feet, small toes, perfect proportions, medical photography, warm lighting, family milestone, detailed texture")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`3D ultrasound baby feet, small toes, perfect proportions, medical photography, warm lighting, family milestone, detailed texture`}
                      </Code>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Tab Perfil */}
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="red">Perfil Clássico</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("3D ultrasound baby profile, side view, elegant silhouette, defined nose, peaceful expression, medical imaging, professional quality")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`3D ultrasound baby profile, side view, elegant silhouette, defined nose, peaceful expression, medical imaging, professional quality`}
                      </Code>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* Tab Artístico */}
                <TabPanel>
                  <VStack align="stretch" spacing={4}>
                    <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
                      <HStack justify="space-between" mb={2}>
                        <Badge colorScheme="pink">Momento Mágico</Badge>
                        <Button 
                          size="sm" 
                          leftIcon={<FaCopy />}
                          onClick={() => copyToClipboard("Artistic 3D ultrasound baby portrait, dreamy atmosphere, soft glow, emotional connection, family bond, tender moment, medical art photography")}
                        >
                          Copiar
                        </Button>
                      </HStack>
                      <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`Artistic 3D ultrasound baby portrait, dreamy atmosphere, soft glow, emotional connection, family bond, tender moment, medical art photography`}
                      </Code>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </CardBody>
        </Card>

        {/* Negative Prompts */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              ❌ Negative Prompts Essenciais
            </Heading>
          </CardHeader>
          <CardBody>
            <Alert status="info" borderRadius="lg" mb={4}>
              <AlertIcon />
              <Box>
                <AlertTitle>O que são Negative Prompts?</AlertTitle>
                <AlertDescription>
                  São termos que você NÃO quer que apareçam na imagem. Essenciais para evitar conteúdo inadequado ou de baixa qualidade.
                </AlertDescription>
              </Box>
            </Alert>

            <Box p={4} border="1px solid" borderColor="gray.200" borderRadius="lg">
              <HStack justify="space-between" mb={2}>
                <Text fontWeight="bold" color="#0f3d2e">Negative Prompt Padrão</Text>
                <Button 
                  size="sm" 
                  leftIcon={<FaCopy />}
                  onClick={() => copyToClipboard("lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, multiple people, crowd, adult features, scary, horror, disturbing, inappropriate")}
                >
                  Copiar
                </Button>
              </HStack>
              <Code p={3} borderRadius="md" bg="gray.50" w="100%" whiteSpace="pre-wrap">
{`lowres, bad anatomy, bad hands, text, error, missing fingers, extra digit, fewer digits, cropped, worst quality, low quality, normal quality, jpeg artifacts, signature, watermark, username, blurry, artist name, multiple people, crowd, adult features, scary, horror, disturbing, inappropriate`}
              </Code>
              <Text fontSize="sm" color="gray.600" mt={2">
                ⚠️ Use sempre este negative prompt para garantir qualidade e adequação das imagens
              </Text>
            </Box>
          </CardBody>
        </Card>

        {/* Dicas Importantes */}
        <Card bg="rgba(255,255,255,0.95)" borderRadius="2xl" mb={8} boxShadow="xl">
          <CardHeader>
            <Heading size="lg" color="#0f3d2e">
              💡 Dicas para Melhores Resultados
            </Heading>
          </CardHeader>
          <CardBody>
            <Accordion allowToggle>
              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    🎯 Como escrever prompts eficazes
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={2}>
                    <Text>• <strong>Seja específico:</strong> &ldquo;3D ultrasound&rdquo; em vez de apenas &ldquo;baby&rdquo;</Text>
                    <Text>• <strong>Use termos médicos:</strong> &ldquo;medical imaging&rdquo;, &ldquo;fetal&rdquo;</Text>
                    <Text>• <strong>Descreva a iluminação:</strong> &ldquo;soft lighting&rdquo;, &ldquo;warm glow&rdquo;</Text>
                    <Text>• <strong>Adicione emoção:</strong> &ldquo;peaceful&rdquo;, &ldquo;tender moment&rdquo;</Text>
                    <Text>• <strong>Especifique qualidade:</strong> &ldquo;high detail&rdquo;, &ldquo;realistic&rdquo;</Text>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    ⚙️ Configurações recomendadas
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={2}>
                    <Text>• <strong>Sampler:</strong> DPM++ 2M Karras</Text>
                    <Text>• <strong>Steps:</strong> 25-30 para qualidade ideal</Text>
                    <Text>• <strong>CFG Scale:</strong> 7-9 para seguir bem o prompt</Text>
                    <Text>• <strong>Dimensões:</strong> 512x512 ou 768x512</Text>
                    <Text>• <strong>Batch:</strong> 4-8 imagens para ter opções</Text>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem>
                <AccordionButton>
                  <Box flex="1" textAlign="left" fontWeight="bold">
                    🚫 O que evitar
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel pb={4}>
                  <VStack align="stretch" spacing={2}>
                    <Text>• <strong>Termos inadequados:</strong> Evite palavras que possam gerar conteúdo impróprio</Text>
                    <Text>• <strong>Muitos detalhes:</strong> Prompts muito longos podem confundir a IA</Text>
                    <Text>• <strong>Contradições:</strong> Não use termos opostos no mesmo prompt</Text>
                    <Text>• <strong>Nomes de pessoas:</strong> Evite nomes de celebridades ou pessoas reais</Text>
                    <Text>• <strong>Sem negative prompt:</strong> Sempre use para evitar resultados ruins</Text>
                  </VStack>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </CardBody>
        </Card>

        {/* Navegação */}
        <Flex justify="space-between" flexWrap="wrap" gap={4}>
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/configuracao"
            variant="outline"
            borderColor="white"
            color="white"
            _hover={{ bg: "rgba(255,255,255,0.1)" }}
            size="lg"
            borderRadius="xl"
          >
            ← Configuração
          </Button>
          
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/problemas"
            bg="#d4af37"
            color="#0f3d2e"
            _hover={{ bg: "#b8941f" }}
            size="lg"
            borderRadius="xl"
            fontWeight="bold"
          >
            Próximo: Problemas →
          </Button>
        </Flex>
      </Container>
    </Box>
  );
}