import { useState } from 'react';
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
  Image,
  Grid,
  GridItem,
  Badge,
  Button,
  Icon,
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  AspectRatio,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FaEye, FaExpandArrowsAlt, FaQuestionCircle } from 'react-icons/fa';

const ExamplesPage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedImage, setSelectedImage] = useState(null);

  const examples = [
    {
      id: 1,
      title: 'Caso 1 - Face Fetal 3D',
      before: '/imagens-3d/antesedepois1.png',
      after: '/imagens-3d/antesedepois1.2.png',
      description: 'Enhancement de face fetal com preservação anatômica completa',
      quality: 5,
    },
    {
      id: 2,
      title: 'Caso 2 - Face Fetal 3D',
      before: '/imagens-3d/antesedepois2.png',
      after: '/imagens-3d/antesedepois2.2.png',
      description: 'Melhoria de textura e iluminação mantendo características faciais',
      quality: 5,
    },
    {
      id: 3,
      title: 'Caso 3 - Face Fetal 3D',
      before: '/imagens-3d/antesedepois3.png',
      after: '/imagens-3d/antesedepois3.2.png',
      description: 'Transformação visual dramática com precisão anatômica',
      quality: 5,
    },
    {
      id: 4,
      title: 'Caso 4 - Face Fetal 3D',
      before: '/imagens-3d/antesedepois4.png',
      after: '/imagens-3d/antesedepois4.2.png',
      description: 'Resultado cinematográfico para apresentação aos pais',
      quality: 5,
    },
  ];

  const openImageModal = (image, title) => {
    setSelectedImage({ src: image, title });
    onOpen();
  };

  const renderStars = count => {
    return '⭐'.repeat(count);
  };

  return (
    <Container maxW="7xl" py={8}>
      <VStack spacing={8} align="stretch">
        <Card>
          <CardBody>
            <VStack spacing={4} align="start">
              <Heading size="xl" color="#667eea">
                Exemplos de Resultados
              </Heading>
              <Text fontSize="lg" color="gray.600">
                Veja os resultados reais obtidos com a configuração Golden Standard
              </Text>
              <Badge colorScheme="green" fontSize="md" p={2}>
                100% de Sucesso - 4 casos validados
              </Badge>
            </VStack>
          </CardBody>
        </Card>

        {/* Success Alert */}
        <Alert status="success">
          <AlertIcon />
          <VStack align="start" spacing={1} flex="1">
            <Text fontWeight="semibold">Resultados Comprovados</Text>
            <Text fontSize="sm">
              Todos os casos apresentaram qualidade ⭐⭐⭐⭐⭐ em: preservação anatômica,
              naturalidade, textura realística e utilidade clínica para apresentação aos pais.
            </Text>
          </VStack>
        </Alert>

        {/* Examples Grid */}
        <Grid templateColumns={{ base: '1fr', lg: 'repeat(2, 1fr)' }} gap={8}>
          {examples.map(example => (
            <GridItem key={example.id}>
              <Card>
                <CardHeader>
                  <HStack justify="space-between" align="start">
                    <VStack align="start" spacing={1}>
                      <Heading size="md">{example.title}</Heading>
                      <Text fontSize="sm" color="gray.600">
                        {example.description}
                      </Text>
                      <HStack>
                        <Text fontSize="sm">Qualidade:</Text>
                        <Text fontSize="sm">{renderStars(example.quality)}</Text>
                      </HStack>
                    </VStack>
                  </HStack>
                </CardHeader>
                <CardBody pt={0}>
                  <VStack spacing={4}>
                    {/* Before Image */}
                    <Box w="full">
                      <Text fontWeight="semibold" mb={2} color="red.600">
                        ❌ ANTES (Imagem Original)
                      </Text>
                      <AspectRatio ratio={1} w="full">
                        <Box
                          borderRadius="md"
                          overflow="hidden"
                          border="2px solid"
                          borderColor="red.200"
                          cursor="pointer"
                          _hover={{ borderColor: 'red.400' }}
                          onClick={() => openImageModal(example.before, `${example.title} - Antes`)}
                        >
                          <Image
                            src={example.before}
                            alt={`${example.title} - Antes`}
                            objectFit="cover"
                            w="full"
                            h="full"
                            fallback={
                              <Box
                                w="full"
                                h="full"
                                bg="gray.100"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Text color="gray.500">Imagem Original</Text>
                              </Box>
                            }
                          />
                          <Box
                            position="absolute"
                            top={2}
                            right={2}
                            bg="blackAlpha.700"
                            color="white"
                            p={1}
                            borderRadius="sm"
                          >
                            <Icon as={FaExpandArrowsAlt} boxSize={3} />
                          </Box>
                        </Box>
                      </AspectRatio>
                    </Box>

                    {/* After Image */}
                    <Box w="full">
                      <Text fontWeight="semibold" mb={2} color="green.600">
                        ✅ DEPOIS (Com Enhancement)
                      </Text>
                      <AspectRatio ratio={1} w="full">
                        <Box
                          borderRadius="md"
                          overflow="hidden"
                          border="2px solid"
                          borderColor="green.200"
                          cursor="pointer"
                          _hover={{ borderColor: 'green.400' }}
                          onClick={() => openImageModal(example.after, `${example.title} - Depois`)}
                        >
                          <Image
                            src={example.after}
                            alt={`${example.title} - Depois`}
                            objectFit="cover"
                            w="full"
                            h="full"
                            fallback={
                              <Box
                                w="full"
                                h="full"
                                bg="gray.100"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                              >
                                <Text color="gray.500">Imagem Aprimorada</Text>
                              </Box>
                            }
                          />
                          <Box
                            position="absolute"
                            top={2}
                            right={2}
                            bg="blackAlpha.700"
                            color="white"
                            p={1}
                            borderRadius="sm"
                          >
                            <Icon as={FaExpandArrowsAlt} boxSize={3} />
                          </Box>
                        </Box>
                      </AspectRatio>
                    </Box>

                    <Button
                      variant="outline"
                      size="sm"
                      leftIcon={<Icon as={FaEye} />}
                      w="full"
                      onClick={() => openImageModal(example.after, example.title)}
                    >
                      Visualizar em Tela Cheia
                    </Button>
                  </VStack>
                </CardBody>
              </Card>
            </GridItem>
          ))}
        </Grid>

        {/* Analysis Summary */}
        <Card>
          <CardHeader>
            <Heading size="lg">Análise dos Resultados</Heading>
          </CardHeader>
          <CardBody>
            <Grid templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }} gap={6}>
              <Box>
                <Heading size="md" mb={3} color="#667eea">
                  Melhorias Observadas
                </Heading>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm">
                    • <strong>Textura da Pele:</strong> +150% de realismo
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Profundidade 3D:</strong> +150% de volume
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Definição Facial:</strong> +100% de clareza
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Iluminação:</strong> Cinematográfica e suave
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Naturalidade:</strong> Transformação dramática
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" mb={3} color="green.600">
                  Preservação Anatômica
                </Heading>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm">
                    • <strong>Características Faciais:</strong> 100% preservadas
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Proporções:</strong> Mantidas com precisão
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Estrutura:</strong> Anatomicamente correta
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Informação Médica:</strong> Totalmente preservada
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Utilidade Clínica:</strong> Aprimorada
                  </Text>
                </VStack>
              </Box>

              <Box>
                <Heading size="md" mb={3} color="blue.600">
                  Benefícios Clínicos
                </Heading>
                <VStack align="start" spacing={2}>
                  <Text fontSize="sm">
                    • <strong>Apresentação aos Pais:</strong> Qualidade superior
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Engajamento:</strong> Maior conexão emocional
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Compreensão:</strong> Melhor visualização
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Satisfação:</strong> Experiência aprimorada
                  </Text>
                  <Text fontSize="sm">
                    • <strong>Diferencial:</strong> Tecnologia de ponta
                  </Text>
                </VStack>
              </Box>
            </Grid>
          </CardBody>
        </Card>

        {/* Configuration Used */}
        <Alert status="info">
          <AlertIcon />
          <VStack align="start" spacing={1} flex="1">
            <Text fontWeight="semibold">Configuração Utilizada</Text>
            <Text fontSize="sm">
              Todos os exemplos foram gerados usando a configuração Golden Standard: RealisticVision
              V5.1 + Dual-ControlNet (depth_zoe + depth_midas) + parâmetros otimizados.
            </Text>
          </VStack>
        </Alert>

        {/* Modal for Image Viewing */}
        <Modal isOpen={isOpen} onClose={onClose} size="6xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{selectedImage?.title}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Image
                src={selectedImage?.src}
                alt={selectedImage?.title}
                w="full"
                objectFit="contain"
                maxH="70vh"
              />
            </ModalBody>
            <ModalFooter>
              <Button
                bg="#667eea"
                color="white"
                _hover={{ bg: '#764ba2' }}
                mr={3}
                onClick={onClose}
              >
                Fechar
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Navigation */}
        <HStack justify="space-between">
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/configuracao"
            variant="outline"
          >
            ← Configuração
          </Button>
          <Button
            as={RouterLink}
            to="/ia-medica/stable-diffusion-3d-fetal/problemas"
            bg="#0f3d2e"
            color="white"
            _hover={{ bg: '#1a5c42' }}
            rightIcon={<Icon as={FaQuestionCircle} />}
          >
            Problemas Comuns →
          </Button>
        </HStack>
      </VStack>
    </Container>
  );
};

export default ExamplesPage;
