import {
  Flex,
  Box,
  Link,
  IconButton,
  HStack,
  Spacer,
  Text,
  useDisclosure,
  Stack,
  Drawer,
  DrawerBody,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  Image,
} from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram, FaBars } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const menuItems = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  { name: 'Ultrassonografias', path: '/exames' },
  { name: 'Área do Paciente', path: '/area-do-paciente' },
  { name: 'IA Médica', path: '/ia-medica' },
  { name: 'Depoimentos', path: '/depoimentos' },
  // >>> NOVO item do menu
  { name: 'FAQ', path: '/faq' },
  { name: 'Contato', path: '/contato' },
];

const Header = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentIALogo, setCurrentIALogo] = useState(1);

  // Destaca o item ativo inclusive em rotas filhas (/faq/slug, /exames/algum-exame)
  const isActive = path => location.pathname === path || location.pathname.startsWith(`${path}/`);

  // Detecta se está na seção IA Médica
  const isIAMedicaSection = location.pathname.startsWith('/ia-medica');

  // Define cores do header baseado na seção
  const textColor = 'white'; // Sempre branco para contraste

  // Rotação automática dos logos IA a cada 5 segundos
  useEffect(() => {
    if (isIAMedicaSection) {
      const interval = setInterval(() => {
        setCurrentIALogo(prev => (prev % 3) + 1);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isIAMedicaSection]);

  // Seleciona o logo baseado na seção
  const logoSrc = isIAMedicaSection ? `/logo-ia-${currentIALogo}.webp` : '/logo.webp';

  return (
    <Flex
      as="header"
      bg={isIAMedicaSection ? undefined : 'green.900'}
      bgGradient={isIAMedicaSection ? 'linear(135deg, #4c1d95 0%, #3730a3 100%)' : undefined}
      color={textColor}
      p={4}
      align="center"
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="md"
      transition="all 0.3s ease"
    >
      {/* Logo e Nome */}
      <Link as={RouterLink} to="/" _hover={{ textDecoration: 'none' }}>
        <HStack spacing={4}>
          <Image
            src={logoSrc}
            alt={isIAMedicaSection ? 'Logo IA Médica' : 'Logo Dr. Massuca'}
            // Dimensões explícitas e fixas para zero CLS
            width="70"
            height="70"
            w="70px"
            h="70px"
            minW="70px"
            minH="70px"
            borderRadius="full"
            objectFit="cover"
            loading="eager"
            decoding="sync"
            transition="all 0.5s ease"
            // CSS inline para garantir zero layout shift
            style={{
              aspectRatio: '1 / 1',
              flexShrink: 0,
            }}
          />
          <Box minW="160px" minH="72px">
            <Text
              fontWeight="bold"
              fontSize="3xl"
              lineHeight="1.2"
              textShadow="2px 2px 4px rgba(0,0,0,0.6)"
              minH="36px"
            >
              Dr. Massuca
            </Text>
            <Text
              fontSize="md"
              lineHeight="1.2"
              textShadow="1px 1px 3px rgba(0,0,0,0.6)"
              minH="36px"
            >
              Antonio Massucatti Neto - CRM GO 17475
            </Text>
          </Box>
        </HStack>
      </Link>

      {/* Menu desktop */}
      <HStack spacing={6} ml={10} display={{ base: 'none', md: 'flex' }}>
        {menuItems.map(item => (
          <Link
            key={item.name}
            as={RouterLink}
            to={item.path}
            _hover={{ color: 'yellow.300' }}
            fontWeight={isActive(item.path) ? 'bold' : 'semibold'}
            fontSize="lg"
            textShadow="1px 1px 2px rgba(0,0,0,0.6)"
            aria-current={isActive(item.path) ? 'page' : undefined}
          >
            {item.name}
          </Link>
        ))}
      </HStack>

      <Spacer />

      {/* Ícones sociais desktop */}
      <HStack spacing={2} display={{ base: 'none', md: 'flex' }}>
        <IconButton
          as="a"
          href="https://wa.me/5562996602117"
          target="_blank"
          icon={<FaWhatsapp />}
          aria-label="WhatsApp"
          colorScheme="whatsapp"
        />
        <IconButton
          as="a"
          href="https://instagram.com/drmassuca"
          target="_blank"
          icon={<FaInstagram />}
          aria-label="Instagram"
          bgGradient="linear(to-r, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)"
          color="white"
          _hover={{ opacity: 0.8 }}
        />
      </HStack>

      {/* Botão hamburguer mobile */}
      <IconButton
        aria-label="Abrir menu"
        icon={<FaBars />}
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        ml={2}
      />

      {/* Drawer mobile */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent
          bg={isIAMedicaSection ? undefined : 'green.900'}
          bgGradient={isIAMedicaSection ? 'linear(135deg, #4c1d95 0%, #3730a3 100%)' : undefined}
          color={textColor}
        >
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={4} mt={10}>
              {menuItems.map(item => (
                <Button
                  key={item.name}
                  as={RouterLink}
                  to={item.path}
                  variant="solid"
                  bg="white"
                  color="green.800"
                  _hover={{ bg: 'yellow.300', color: 'black' }}
                  onClick={onClose}
                  fontWeight={isActive(item.path) ? 'bold' : 'normal'}
                  width="100%"
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.name}
                </Button>
              ))}
              <HStack pt={4}>
                <IconButton
                  as="a"
                  href="https://wa.me/5562996602117"
                  target="_blank"
                  icon={<FaWhatsapp />}
                  aria-label="WhatsApp"
                  colorScheme="whatsapp"
                />
                <IconButton
                  as="a"
                  href="https://instagram.com/drmassuca"
                  target="_blank"
                  icon={<FaInstagram />}
                  aria-label="Instagram"
                  bgGradient="linear(to-r, #feda75, #fa7e1e, #d62976, #962fbf, #4f5bd5)"
                  color="white"
                  _hover={{ opacity: 0.8 }}
                />
              </HStack>
            </Stack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Flex>
  );
};

export default Header;
