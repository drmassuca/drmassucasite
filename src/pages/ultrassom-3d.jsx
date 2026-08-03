import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  SimpleGrid,
  Card,
  CardBody,
  Badge,
  Icon,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Alert,
  AlertIcon,
  Image,
} from '@chakra-ui/react';
import { FaHeartbeat, FaCamera, FaWhatsapp, FaInstagram, FaCheckCircle } from 'react-icons/fa';

function Ultrassom3D() {
  return (
    <>
      <SEO
        title="Ultrassom 3D/4D em Itaberaí-GO | Dr. Massuca | Imagens 3D do Bebê"
        description="Ultrassom 3D/4D em Itaberaí-GO com Dr. Massuca. Veja seu bebê em detalhes únicos! Quando possível, oferecemos imagens 3D durante exames obstétricos. Agende já!"
        canonical="/ultrassom-3d"
        keywords="ultrassom 3D Itaberaí, ultrassom 4D, imagens 3D bebê, Dr Massuca 3D, ultrassom obstétrico 3D, babyface 3D"
        image="https://drmassuca.com.br/foto-home.webp"
        type="webpage"
      />

      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom 3D/4D',
            description:
              'Exame de ultrassom com tecnologia 3D/4D para visualização detalhada do feto',
            url: 'https://drmassuca.com.br/ultrassom-3d',
            provider: {
              '@type': 'MedicalBusiness',
              name: 'Dr. Massuca',
              telephone: '+55-62-99660-2117',
              address: {
                '@type': 'PostalAddress',
                addressLocality: 'Itaberaí',
                addressRegion: 'GO',
                addressCountry: 'BR',
              },
            },
            medicalSpecialty: 'Ultrassom 3D/4D',
            availability: 'Dependendo das condições técnicas',
          })}
        </script>
      </Helmet>

      <Box maxW="1200px" mx="auto" px={4} py={10}>
        <Box bg="whiteAlpha.900" borderRadius="2xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          {/* Hero Section */}
          <VStack spacing={6} textAlign="center" mb={12}>
            <Badge colorScheme="yellow" fontSize="sm" px={3} py={1} borderRadius="full">
              ✨ Diferencial Exclusivo
            </Badge>

            <Heading as="h1" size="2xl" color="green.700" textAlign="center" lineHeight="1.2">
              Ultrassom 3D/4D:
              <br />
              <Text as="span" color="#d4af37" fontWeight="800">
                Veja seu bebê antes mesmo de nascer
              </Text>
            </Heading>

            <Text fontSize="xl" color="gray.700" maxW="800px" lineHeight="1.6">
              Tecnologia avançada que permite visualizar o rostinho e movimentos do seu bebê em
              detalhes únicos, criando memórias inesquecíveis para toda a família.
            </Text>

            <Button
              as="a"
              href="https://wa.me/5562996602117?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20sobre%20ultrassom%203D"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              bg="green.700"
              color="white"
              size="lg"
              rounded="full"
              px={8}
              py={6}
              fontSize="lg"
              fontWeight="700"
              _hover={{ bg: 'green.800', transform: 'translateY(-2px)' }}
              boxShadow="xl"
              transition="all 0.3s"
            >
              Agendar Ultrassom 3D
            </Button>
          </VStack>

          {/* Galeria Evolutiva - Imagens 3D por Semanas */}
          <Box mb={12}>
            <VStack spacing={6} mb={10}>
              <Heading size="xl" color="green.700" textAlign="center">
                👶 Evolução do Bebê em Imagens 3D
              </Heading>
              <Text fontSize="lg" color="gray.600" textAlign="center" maxW="700px">
                Veja como seu bebê se desenvolve semana a semana através das nossas imagens 3D reais
              </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, sm: 2, lg: 5 }} spacing={6}>
              {[
                {
                  semana: '8',
                  imagem: '/imagens-3d/ultrassom-3d-1.webp',
                  descricao: 'Embrião com estruturas básicas formadas',
                },
                {
                  semana: '11',
                  imagem: '/imagens-3d/ultrassom-3d-2.webp',
                  descricao: 'Feto com membros mais definidos',
                },
                {
                  semana: '15',
                  imagem: '/imagens-3d/ultrassom-3d-3.webp',
                  descricao: 'Traços faciais começam a aparecer',
                },
                {
                  semana: '24',
                  imagem: '/imagens-3d/ultrassom-3d-4.webp',
                  descricao: 'Período ideal para 3D - rosto nítido',
                },
                {
                  semana: '36',
                  imagem: '/imagens-3d/ultrassom-3d-5.webp',
                  descricao: 'Bebê quase pronto para nascer',
                },
              ].map((item, index) => (
                <Card
                  key={index}
                  boxShadow="xl"
                  rounded="2xl"
                  overflow="hidden"
                  transition="all 0.3s"
                  _hover={{ transform: 'translateY(-5px)', boxShadow: '2xl' }}
                >
                  <Box position="relative">
                    <Image
                      src={item.imagem}
                      alt={`Ultrassom 3D - ${item.semana} semanas`}
                      w="100%"
                      h="200px"
                      objectFit="cover"
                      loading="lazy"
                    />
                    <Badge
                      position="absolute"
                      top={3}
                      right={3}
                      bg="#d4af37"
                      color="white"
                      fontSize="sm"
                      fontWeight="700"
                      px={3}
                      py={1}
                      borderRadius="full"
                    >
                      {item.semana} sem
                    </Badge>
                  </Box>
                  <CardBody p={4}>
                    <Heading size="sm" color="green.700" mb={2}>
                      {item.semana} Semanas
                    </Heading>
                    <Text fontSize="sm" color="gray.600" lineHeight="1.4">
                      {item.descricao}
                    </Text>
                  </CardBody>
                </Card>
              ))}
            </SimpleGrid>

            <Box textAlign="center" mt={8}>
              <Alert status="info" borderRadius="xl" maxW="600px" mx="auto">
                <AlertIcon />
                <Box>
                  <Text fontSize="sm" lineHeight="1.6">
                    <strong>Período ideal para 3D:</strong> Entre 26-32 semanas o rosto do bebê é
                    mais nítido, pois já tem gordurinha mas ainda há espaço suficiente no útero.
                  </Text>
                </Box>
              </Alert>
            </Box>
          </Box>

          {/* Reel do Instagram */}
          <Box mb={12}>
            <VStack spacing={4} mb={8}>
              <Heading size="lg" color="green.700" textAlign="center">
                <Icon as={FaInstagram} mr={2} color="#E4405F" />
                Evolução do Bebê em 3D
              </Heading>
              <Text color="gray.600" textAlign="center" maxW="600px">
                Veja neste reel (300+ curtidas, 2500+ visualizações) a evolução incrível do
                embrião/feto capturada através da tecnologia 3D
              </Text>
            </VStack>

            {/* Embed do Instagram - versão mais simples para evitar erros */}
            <Box
              display="flex"
              justifyContent="center"
              bg="gray.50"
              p={6}
              borderRadius="2xl"
              border="2px solid"
              borderColor="gray.200"
            >
              <VStack spacing={4} textAlign="center" maxW="400px">
                <Icon as={FaInstagram} boxSize={12} color="#E4405F" />
                <Heading size="md" color="gray.700">
                  Evolução do Bebê em 3D
                </Heading>
                <Text color="gray.600" lineHeight="1.6">
                  Confira no nosso Instagram (@drmassuca) o reel viral sobre a evolução incrível do
                  embrião/feto capturada através da tecnologia 3D.
                </Text>
                <Text fontSize="sm" color="gray.500" fontWeight="600">
                  ✨ 300+ curtidas • 2500+ visualizações
                </Text>
                <Button
                  as="a"
                  href="https://www.instagram.com/reel/C2VONcOO5AG/"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaInstagram />}
                  colorScheme="pink"
                  size="lg"
                  fontWeight="600"
                >
                  Ver no Instagram
                </Button>
              </VStack>
            </Box>
          </Box>

          {/* Conteúdo principal */}
          <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} mb={12}>
            {/* Quando é possível ter 3D */}
            <Card boxShadow="xl" rounded="2xl">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Icon as={FaHeartbeat} boxSize={8} color="green.700" />
                  <Heading size="lg" color="green.700">
                    Quando é possível ter imagens 3D?
                  </Heading>
                  <Text lineHeight="1.7">
                    O Ultrassom 3D/4D é <strong>mais nítido entre 26-32 semanas</strong> de
                    gestação, quando o bebê já tem gordurinha mas ainda tem espaço para se
                    movimentar.
                  </Text>

                  <Alert status="info" borderRadius="lg">
                    <AlertIcon />
                    <Box>
                      <Text fontSize="sm">
                        <strong>Importante:</strong> A qualidade das imagens 3D depende de fatores
                        como posição do bebê, quantidade de líquido amniótico e qualidade da janela
                        acústica.
                      </Text>
                    </Box>
                  </Alert>
                </VStack>
              </CardBody>
            </Card>

            {/* Diferencial tecnológico */}
            <Card boxShadow="xl" rounded="2xl">
              <CardBody>
                <VStack align="start" spacing={4}>
                  <Icon as={FaCamera} boxSize={8} color="#d4af37" />
                  <Heading size="lg" color="green.700">
                    Tecnologia Avançada
                  </Heading>
                  <Text lineHeight="1.7">
                    Utilizamos equipamentos de última geração que permitem:
                  </Text>

                  <VStack align="start" spacing={2}>
                    <Text>
                      <Icon as={FaCheckCircle} color="green.600" mr={2} />
                      Imagens 3D nítidas do rostinho
                    </Text>
                    <Text>
                      <Icon as={FaCheckCircle} color="green.600" mr={2} />
                      Visualização em tempo real (4D)
                    </Text>
                    <Text>
                      <Icon as={FaCheckCircle} color="green.600" mr={2} />
                      Detalhes anatômicos precisos
                    </Text>
                    <Text>
                      <Icon as={FaCheckCircle} color="green.600" mr={2} />
                      Memórias inesquecíveis para a família
                    </Text>
                  </VStack>
                </VStack>
              </CardBody>
            </Card>
          </SimpleGrid>

          {/* FAQ Simples */}
          <Box mb={12}>
            <Heading size="lg" color="green.700" mb={6} textAlign="center">
              Perguntas Frequentes
            </Heading>

            <Accordion allowToggle>
              <AccordionItem border="none" mb={3}>
                <AccordionButton
                  bg="green.50"
                  borderRadius="xl"
                  _hover={{ bg: 'green.100' }}
                  py={4}
                >
                  <Box flex="1" textAlign="left" fontWeight="600">
                    📅 Qual a melhor idade gestacional para 3D?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel bg="white" borderRadius="xl" mt={2} p={6}>
                  <Text lineHeight="1.7">
                    Entre <strong>26 e 32 semanas</strong> é o período ideal. Antes disso, o bebê
                    ainda é muito pequeno. Depois, pode estar muito grande e com menos espaço,
                    dificultando a visualização do rostinho.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={3}>
                <AccordionButton
                  bg="green.50"
                  borderRadius="xl"
                  _hover={{ bg: 'green.100' }}
                  py={4}
                >
                  <Box flex="1" textAlign="left" fontWeight="600">
                    💰 Tem custo adicional?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel bg="white" borderRadius="xl" mt={2} p={6}>
                  <Text lineHeight="1.7">
                    Não! As imagens 3D são oferecidas como <strong>diferencial exclusivo</strong>
                    sem custo adicional, quando as condições técnicas permitem, durante seus exames
                    obstétricos conosco.
                  </Text>
                </AccordionPanel>
              </AccordionItem>

              <AccordionItem border="none" mb={3}>
                <AccordionButton
                  bg="green.50"
                  borderRadius="xl"
                  _hover={{ bg: 'green.100' }}
                  py={4}
                >
                  <Box flex="1" textAlign="left" fontWeight="600">
                    ⚠️ Sempre é possível ter imagens 3D?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
                <AccordionPanel bg="white" borderRadius="xl" mt={2} p={6}>
                  <Text lineHeight="1.7">
                    Nem sempre. A qualidade depende da posição do bebê, quantidade de líquido
                    amniótico e outros fatores técnicos. Por isso oferecemos como cortesia quando
                    possível.
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          </Box>

          {/* Alert importante */}
          <Alert
            status="warning"
            borderRadius="xl"
            mb={8}
            bg="orange.50"
            border="2px solid"
            borderColor="orange.200"
          >
            <AlertIcon color="orange.500" />
            <Box>
              <Text fontWeight="600" color="orange.800" mb={2}>
                🚨 Importante saber:
              </Text>
              <Text color="orange.700" lineHeight="1.6">
                O ultrassom 3D é oferecido como cortesia quando possível, mas não é garantido em
                todos os exames. A prioridade sempre será a avaliação médica detalhada da saúde do
                bebê e da gestação.
              </Text>
            </Box>
          </Alert>

          {/* CTA final */}
          <Box textAlign="center">
            <VStack spacing={4}>
              <Heading size="lg" color="green.700">
                Agende seu exame e ganhe imagens 3D quando possível!
              </Heading>
              <Text fontSize="lg" color="gray.600" maxW="600px">
                Entre em contato para agendar seu ultrassom obstétrico e, quando as condições
                permitirem, receba lindas imagens 3D do seu bebê.
              </Text>
              <Button
                as="a"
                href="https://wa.me/5562996602117?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20ultrassom%20obst%C3%A9trico"
                target="_blank"
                rel="noopener noreferrer"
                leftIcon={<FaWhatsapp />}
                bg="green.700"
                color="white"
                size="xl"
                rounded="full"
                px={10}
                py={8}
                fontSize="xl"
                fontWeight="700"
                _hover={{
                  bg: 'green.800',
                  transform: 'translateY(-3px)',
                  boxShadow: '2xl',
                }}
                boxShadow="xl"
                transition="all 0.3s"
              >
                Agendar Agora
              </Button>
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Ultrassom3D;
