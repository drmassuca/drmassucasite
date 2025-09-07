import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Image,
  Link,
  VStack,
  Button,
  useBreakpointValue,
  Text,
  Stack,
} from '@chakra-ui/react';
import { FaWhatsapp } from 'react-icons/fa';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const totalImages = 20;
const getImageArray = total => Array.from({ length: total }, (_, i) => i + 1);

function Testimonials() {
  const imageList = getImageArray(totalImages).sort(() => Math.random() - 0.5); // ordem aleatória
  const slidesToShow = useBreakpointValue({ base: 1, sm: 1, md: 2 });

  const settings = {
    dots: useBreakpointValue({ base: false, md: true }),
    infinite: true,
    speed: 500,
    slidesToShow: slidesToShow || 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 6000,
    pauseOnHover: true,
  };

  return (
    <>
      {/* SEO base */}
      <SEO
        title="Depoimentos de Pacientes – Dr. Massuca"
        description="Veja depoimentos reais de pacientes atendidos na clínica do Dr. Massuca em Itaberaí-GO."
        canonical="/depoimentos"
      />

      {/* Schema.org – WebPage */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Depoimentos de Pacientes – Dr. Massuca',
            url: 'https://drmassuca.com.br/depoimentos',
            description:
              'Veja depoimentos reais de pacientes atendidos na clínica do Dr. Massuca em Itaberaí-GO.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://drmassuca.com.br/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Depoimentos',
                  item: 'https://drmassuca.com.br/depoimentos',
                },
              ],
            },
          })}
        </script>
      </Helmet>

      <Box maxW="1200px" mx="auto" px={4} py={10}>
        <Box bg="whiteAlpha.900" borderRadius="lg" p={{ base: 6, md: 10 }} boxShadow="lg">
          <Heading as="h1" size="lg" mb={8} textAlign="center" color="green.700">
            Depoimentos dos nossos pacientes 💚
          </Heading>

          {/* Carrossel de Imagens */}
          <Slider {...settings}>
            {imageList.map(num => (
              <Box key={num} px={2}>
                <Image
                  src={`/img-depoimentos/depoimento${num}.webp`}
                  alt={`Depoimento ${num}`}
                  borderRadius="lg"
                  boxShadow="md"
                  loading="lazy"
                />
              </Box>
            ))}
          </Slider>

          {/* CTA principal */}
          <Box mt={10} p={4} bg="gray.50" borderRadius="md" boxShadow="md">
            <VStack spacing={6}>
              <Text fontSize="lg" fontWeight="medium" textAlign="center">
                Já foi atendido pelo Dr. Massuca? Deixe seu depoimento e ajude outras pessoas a nos
                conhecer!
              </Text>

              <Stack
                direction={{ base: 'column', md: 'row' }}
                align="center"
                spacing={10}
                justify="center"
                flexWrap="wrap"
              >
                <VStack spacing={4}>
                  <Button
                    as={Link}
                    href="https://g.page/r/Ce5Y3Gbo2y1qEAI/review"
                    isExternal
                    bg="#4285F4"
                    color="white"
                    fontSize="lg"
                    size="lg"
                    px={8}
                    py={6}
                    _hover={{ bg: '#357ae8' }}
                  >
                    Escrever no Google
                  </Button>

                  <Button
                    as={Link}
                    href="https://www.instagram.com/drmassuca"
                    isExternal
                    bg="#E1306C"
                    color="white"
                    fontSize="lg"
                    size="lg"
                    px={8}
                    py={6}
                    _hover={{ bg: '#c72a5c' }}
                  >
                    Ver mais no Instagram
                  </Button>
                </VStack>

                <Box>
                  <Image
                    src="/img-depoimentos/qrcode.png"
                    alt="QR Code para avaliação"
                    boxSize="120px"
                  />
                  <Text fontSize="xs" textAlign="center" color="gray.600">
                    Escaneie para avaliar
                  </Text>
                </Box>
              </Stack>

              {/* Botão final WhatsApp */}
              <Box pt={6}>
                <Button
                  as={Link}
                  href="https://wa.me/5562996602117"
                  isExternal
                  leftIcon={<FaWhatsapp />}
                  bg="green.700"
                  color="white"
                  fontWeight="bold"
                  _hover={{ bg: 'green.800' }}
                  size="lg"
                >
                  Entre em Contato
                </Button>
              </Box>
            </VStack>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Testimonials;
