import React from 'react';
import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  HStack,
  OrderedList,
  ListItem,
  UnorderedList,
  Card,
  CardBody,
  CardHeader,
  Code,
  Alert,
  AlertIcon,
  Badge,
  Divider,
  Button,
  Icon,
  Grid,
  GridItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaCheckCircle, FaCog, FaStar, FaImages } from 'react-icons/fa';

const TutorialVideo = ({ showFullDescription = false }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="lg">Tutorial em Vídeo</Heading>
      </CardHeader>
      <CardBody>
        <VStack spacing={4}>
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
          
          {showFullDescription && (
            <Text color="gray.600" textAlign="center" maxW="500px">
              Assista ao tutorial completo de configuração e veja como otimizar 
              o Stable Diffusion para gerar as melhores imagens fetais.
            </Text>
          )}
        </VStack>
      </CardBody>
    </Card>
  );
};

const ConfigurationPage = () => {
  return (
    <Container maxW="6xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Box>
          <Heading size="xl" mb={4} color="#0f3d2e">
            Configuração Golden Standard
          </Heading>
          <Text fontSize="lg" color="gray.600">
            Configure o Stable Diffusion com os parâmetros validados para imagens obstétricas 3D
          </Text>
          <Badge colorScheme="green" mt={2} fontSize="sm">
            ⭐ 100% de Sucesso em Testes
          </Badge>
        </Box>

        {/* Quick Setup Alert */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1} flex="1">
            <Text fontWeight="semibold">Configuração Testada e Aprovada</Text>
            <Text fontSize="sm">
              Esta configuração foi validada em 3 casos reais com qualidade ⭐⭐⭐⭐⭐ 
              em todos os aspectos: preservação anatômica, naturalidade e utilidade clínica.
            </Text>
          </VStack>
        </Alert>

        {/* Tutorial Video */}
        <TutorialVideo showFullDescription={true} />

        {/* Main Configuration */}
        <Card>
          <CardHeader>
            <Heading size="lg">
              <Icon as={FaStar} color="yellow.500" mr={2} />
              Configuração Principal
            </Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <TableContainer>
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>Parâmetro</Th>
                      <Th>Valor</Th>
                      <Th>Importância</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td fontWeight="semibold">Modelo Base</Td>
                      <Td><Code>realisticVisionV51_v51VAE.safetensors</Code></Td>
                      <Td><Badge colorScheme="red">Crítico</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Sampling Method</Td>
                      <Td><Code>DPM++ 2M</Code></Td>
                      <Td><Badge colorScheme="red">Crítico</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Schedule Type</Td>
                      <Td><Code>Automatic</Code></Td>
                      <Td><Badge colorScheme="orange">Importante</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Sampling Steps</Td>
                      <Td><Code>30</Code></Td>
                      <Td><Badge colorScheme="red">Crítico</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">CFG Scale</Td>
                      <Td><Code>5.5</Code></Td>
                      <Td><Badge colorScheme="red">Crítico</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Denoising Strength</Td>
                      <Td><Code>0.38</Code></Td>
                      <Td><Badge colorScheme="red">Crítico</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Dimensões</Td>
                      <Td><Code>512 x 512</Code></Td>
                      <Td><Badge colorScheme="orange">Importante</Badge></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Seed</Td>
                      <Td><Code>-1 (Random)</Code></Td>
                      <Td><Badge colorScheme="green">Recomendado</Badge></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </CardBody>
        </Card>

        {/* ControlNet Configuration */}
        <Card>
          <CardHeader>
            <Heading size="lg">Configuração ControlNet Dual-Depth</Heading>
            <Badge colorScheme="blue" mt={2}>Inovação Técnica</Badge>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  O segredo da qualidade está na combinação de dois ControlNets de profundidade
                  com pesos e modos diferentes para controle otimizado.
                </Text>
              </Alert>

              <Grid templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} gap={6}>
                <Card variant="outline">
                  <CardHeader pb={2}>
                    <Heading size="md" color="#0f3d2e">ControlNet Unit 0</Heading>
                  </CardHeader>
                  <CardBody pt={2}>
                    <VStack align="start" spacing={2}>
                      <Text><strong>Preprocessor:</strong> <Code>depth_zoe</Code></Text>
                      <Text><strong>Model:</strong> <Code>control_v11f1p_sd15_depth</Code></Text>
                      <Text><strong>Weight:</strong> <Code>0.6</Code></Text>
                      <Text><strong>Control Mode:</strong> <Code>ControlNet is more important</Code></Text>
                      <Text><strong>Resize Mode:</strong> <Code>Crop and Resize</Code></Text>
                    </VStack>
                  </CardBody>
                </Card>

                <Card variant="outline">
                  <CardHeader pb={2}>
                    <Heading size="md" color="#0f3d2e">ControlNet Unit 1</Heading>
                  </CardHeader>
                  <CardBody pt={2}>
                    <VStack align="start" spacing={2}>
                      <Text><strong>Preprocessor:</strong> <Code>depth_midas</Code></Text>
                      <Text><strong>Model:</strong> <Code>control_v11f1p_sd15_depth</Code></Text>
                      <Text><strong>Weight:</strong> <Code>1.0</Code></Text>
                      <Text><strong>Control Mode:</strong> <Code>Balanced</Code></Text>
                      <Text><strong>Resize Mode:</strong> <Code>Crop and Resize</Code></Text>
                    </VStack>
                  </CardBody>
                </Card>
              </Grid>
            </VStack>
          </CardBody>
        </Card>

        {/* Prompts */}
        <Card>
          <CardHeader>
            <Heading size="lg">Prompts Otimizados</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={6} align="stretch">
              <Box>
                <Text fontWeight="semibold" mb={2} color="green.600">✅ Prompt Positivo (Copie exatamente)</Text>
                <Code display="block" p={4} bg="green.50" borderRadius="md" whiteSpace="pre-wrap">
                  Hyper-realistic 3D ultrasound baby face enhancement, preserve anatomical accuracy, soft natural skin texture, gentle warm lighting, cinematic depth, clean shading, realistic proportions
                </Code>
              </Box>

              <Box>
                <Text fontWeight="semibold" mb={2} color="red.600">❌ Prompt Negativo (Copie exatamente)</Text>
                <Code display="block" p={4} bg="red.50" borderRadius="md" whiteSpace="pre-wrap">
                  cartoon, anime, cgi, doll, plastic skin, wax, lowres, blurry, distorted, deformed, uncanny, hair, lines
                </Code>
              </Box>
            </VStack>
          </CardBody>
        </Card>

        {/* Upscaling */}
        <Card>
          <CardHeader>
            <Heading size="lg">Configuração de Upscaling</Heading>
          </CardHeader>
          <CardBody>
            <VStack spacing={4} align="stretch">
              <Alert status="info">
                <AlertIcon />
                <Text fontSize="sm">
                  Para ampliar de 512x512 para 1024x1024 mantendo a qualidade
                </Text>
              </Alert>

              <TableContainer>
                <Table variant="simple" size="sm">
                  <Tbody>
                    <Tr>
                      <Td fontWeight="semibold">Script</Td>
                      <Td><Code>SD upscale</Code></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Scale Factor</Td>
                      <Td><Code>2</Code></Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Upscaler</Td>
                      <Td><Code>None</Code> (usa o próprio modelo SD)</Td>
                    </Tr>
                    <Tr>
                      <Td fontWeight="semibold">Tile Overlap</Td>
                      <Td><Code>64</Code></Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </VStack>
          </CardBody>
        </Card>

        {/* Step by Step */}
        <Card>
          <CardHeader>
            <Heading size="lg">Passo a Passo</Heading>
          </CardHeader>
          <CardBody>
            <OrderedList spacing={4}>
              <ListItem>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="semibold">Preparar a Imagem</Text>
                  <UnorderedList spacing={1} pl={4}>
                    <ListItem>Use a ferramenta de recorte do Windows para remover o HUD do aparelho</ListItem>
                    <ListItem>Mantenha apenas a área da face fetal</ListItem>
                    <ListItem>Salve em formato PNG ou JPG</ListItem>
                  </UnorderedList>
                </VStack>
              </ListItem>

              <ListItem>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="semibold">Configurar o WebUI</Text>
                  <UnorderedList spacing={1} pl={4}>
                    <ListItem>Vá para a aba <Code>img2img</Code></ListItem>
                    <ListItem>Carregue sua imagem</ListItem>
                    <ListItem>Selecione o modelo <Code>realisticVisionV51_v51VAE</Code></ListItem>
                    <ListItem>Configure todos os parâmetros conforme a tabela acima</ListItem>
                  </UnorderedList>
                </VStack>
              </ListItem>

              <ListItem>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="semibold">Configurar ControlNet</Text>
                  <UnorderedList spacing={1} pl={4}>
                    <ListItem>Ative as duas unidades ControlNet</ListItem>
                    <ListItem>Configure conforme especificado na seção ControlNet</ListItem>
                    <ListItem>Certifique-se de que ambas estão habilitadas</ListItem>
                  </UnorderedList>
                </VStack>
              </ListItem>

              <ListItem>
                <VStack align="start" spacing={2}>
                  <Text fontWeight="semibold">Gerar e Upscalar</Text>
                  <UnorderedList spacing={1} pl={4}>
                    <ListItem>Clique em <Code>Generate</Code> para criar a versão 512x512</ListItem>
                    <ListItem>Se satisfeito, configure o SD upscale conforme especificado</ListItem>
                    <ListItem>Gere novamente para obter a versão 1024x1024</ListItem>
                  </UnorderedList>
                </VStack>
              </ListItem>
            </OrderedList>
          </CardBody>
        </Card>

        {/* Important Notes */}
        <Alert status="warning">
          <AlertIcon />
          <VStack align="start" spacing={2} flex="1">
            <Text fontWeight="semibold">Pontos Importantes</Text>
            <UnorderedList spacing={1}>
              <ListItem>NÃO altere os valores críticos sem necessidade</ListItem>
              <ListItem>Use sempre seed -1 (random) para variedade natural</ListItem>
              <ListItem>O denoising 0.38 preserva características anatômicas</ListItem>
              <ListItem>Os dois ControlNets trabalham em conjunto - não desative nenhum</ListItem>
            </UnorderedList>
          </VStack>
        </Alert>

        {/* Navigation */}
        <HStack justify="space-between">
          <Button as={RouterLink} to="/ia-medica/stable-diffusion-3d-fetal/instalacao" variant="outline">
            ← Instalação
          </Button>
          <Button as={RouterLink} to="/ia-medica/stable-diffusion-3d-fetal/exemplos" bg="#0f3d2e" color="white" _hover={{ bg: "#1a5c42" }} rightIcon={<Icon as={FaImages} />}>
            Ver Exemplos →
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default ConfigurationPage;