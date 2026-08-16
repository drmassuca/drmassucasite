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
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram, FaBars, FaChevronDown } from 'react-icons/fa';
import { Link as RouterLink, useLocation } from 'react-router-dom';

/**
 * Navegação do reposicionamento 2026.
 * A parte clínica inteira vive sob "Consultório"; as camadas novas
 * (Xdiag, Curso, Palestras, Blog) ficam no nível de cima.
 */
const consultorioItems = [
  { name: 'Exames de Ultrassom', path: '/exames' },
  { name: 'Ultrassom 3D', path: '/ultrassom-3d' },
  { name: 'Memo3D', path: '/memo3d' },
  { name: 'Área do Paciente', path: '/area-do-paciente' },
  { name: 'Para Médicos', path: '/para-medicos' },
  { name: 'Depoimentos', path: '/depoimentos' },
  { name: 'FAQ', path: '/faq' },
  { name: 'Contato e Agendamento', path: '/contato' },
];

const topItems = [
  { name: 'Início', path: '/' },
  { name: 'Sobre', path: '/sobre' },
  // Consultório entra aqui como dropdown (renderizado à parte)
  { name: 'Xdiag', path: '/xdiag' },
  { name: 'Curso', path: '/curso-medicina-com-ia' },
  { name: 'Palestras', path: '/palestras' },
  { name: 'Blog', path: '/ia-medica' },
];

// Rotas que acendem o item "Consultório"
const CONSULTORIO_PREFIXES = [
  '/consultorio',
  '/exames',
  '/ultrassom-3d',
  '/memo3d',
  '/area-do-paciente',
  '/para-medicos',
  '/depoimentos',
  '/faq',
  '/contato',
];

const Header = () => {
  const location = useLocation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const isActive = path =>
    path === '/'
      ? location.pathname === '/'
      : location.pathname === path || location.pathname.startsWith(`${path}/`);

  const isConsultorioActive = CONSULTORIO_PREFIXES.some(
    p => location.pathname === p || location.pathname.startsWith(`${p}/`)
  );

  const navLinkStyle = active => ({
    fontWeight: active ? 700 : 500,
    fontSize: 'md',
    color: active ? 'white' : 'whiteAlpha.800',
    borderBottom: active ? '2px solid' : '2px solid transparent',
    borderColor: active ? 'accent.400' : 'transparent',
    pb: '2px',
  });

  return (
    <Flex
      as="header"
      bg="brand.900"
      color="white"
      px={{ base: 4, lg: 6 }}
      py={3}
      align="center"
      position="sticky"
      top="0"
      zIndex="1000"
      boxShadow="0 2px 12px rgba(7, 26, 46, 0.35)"
    >
      {/* Logo e nome */}
      <Link
        as={RouterLink}
        to="/"
        _hover={{ textDecoration: 'none' }}
        zIndex="10"
        position="relative"
      >
        <HStack spacing={3}>
          <Image
            src="/logo.webp"
            alt="Logo Dr. Massuca"
            width="56"
            height="56"
            w="56px"
            h="56px"
            minW="56px"
            minH="56px"
            borderRadius="full"
            objectFit="cover"
            loading="eager"
            decoding="sync"
            style={{ aspectRatio: '1 / 1', flexShrink: 0 }}
          />
          <Box>
            <Text fontWeight={700} fontSize="xl" lineHeight="1.2" letterSpacing="-0.02em">
              Dr. Massuca
            </Text>
            <Text fontSize="xs" lineHeight="1.2" color="whiteAlpha.700">
              Ultrassonografia e IA na medicina · CRM-GO 17475
            </Text>
          </Box>
        </HStack>
      </Link>

      {/* Menu desktop */}
      <HStack spacing={5} ml={8} display={{ base: 'none', lg: 'flex' }}>
        <Link as={RouterLink} to="/" {...navLinkStyle(isActive('/'))}>
          Início
        </Link>
        <Link as={RouterLink} to="/sobre" {...navLinkStyle(isActive('/sobre'))}>
          Sobre
        </Link>

        {/* Dropdown Consultório: toda a parte clínica preservada */}
        <Menu isLazy>
          <MenuButton
            as={Button}
            variant="link"
            rightIcon={<FaChevronDown size={11} />}
            {...navLinkStyle(isConsultorioActive)}
            _hover={{ textDecoration: 'none', color: 'white' }}
            _active={{ color: 'white' }}
          >
            Consultório
          </MenuButton>
          <MenuList bg="brand.900" borderColor="whiteAlpha.300" py={2}>
            <MenuItem
              as={RouterLink}
              to="/consultorio"
              bg="transparent"
              fontWeight={600}
              _hover={{ bg: 'brand.800' }}
            >
              Visão geral do consultório
            </MenuItem>
            {consultorioItems.map(item => (
              <MenuItem
                key={item.path}
                as={RouterLink}
                to={item.path}
                bg="transparent"
                _hover={{ bg: 'brand.800' }}
              >
                {item.name}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>

        {topItems.slice(2).map(item => (
          <Link key={item.path} as={RouterLink} to={item.path} {...navLinkStyle(isActive(item.path))}>
            {item.name}
          </Link>
        ))}
      </HStack>

      <Spacer />

      {/* Ações desktop */}
      <HStack spacing={2} display={{ base: 'none', lg: 'flex' }}>
        <Button
          as="a"
          href="https://wa.me/5562996602117"
          target="_blank"
          rel="noopener noreferrer"
          leftIcon={<FaWhatsapp />}
          size="sm"
          bg="accent.500"
          color="white"
          _hover={{ bg: 'accent.600' }}
        >
          Agendar
        </Button>
        <IconButton
          as="a"
          href="https://instagram.com/drmassuca"
          target="_blank"
          rel="noopener noreferrer"
          icon={<FaInstagram />}
          aria-label="Instagram"
          size="sm"
          variant="ghost"
          color="whiteAlpha.800"
          _hover={{ bg: 'brand.800', color: 'white' }}
        />
      </HStack>

      {/* Botão hamburguer mobile */}
      <IconButton
        aria-label="Abrir menu"
        icon={<FaBars />}
        display={{ base: 'flex', lg: 'none' }}
        onClick={onOpen}
        ml={2}
        bg="brand.800"
        color="white"
        _hover={{ bg: 'brand.700' }}
      />

      {/* Drawer mobile */}
      <Drawer placement="right" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent bg="brand.900" color="white">
          <DrawerCloseButton />
          <DrawerBody>
            <Stack spacing={2} mt={10}>
              {topItems.slice(0, 2).map(item => (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  color="white"
                  justifyContent="flex-start"
                  _hover={{ bg: 'brand.800' }}
                  onClick={onClose}
                  fontWeight={isActive(item.path) ? 700 : 500}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.name}
                </Button>
              ))}

              {/* Grupo Consultório */}
              <Text
                fontSize="xs"
                fontWeight={700}
                textTransform="uppercase"
                letterSpacing="wider"
                color="accent.400"
                pt={3}
                pl={4}
              >
                Consultório
              </Text>
              <Button
                as={RouterLink}
                to="/consultorio"
                variant="ghost"
                color="white"
                justifyContent="flex-start"
                _hover={{ bg: 'brand.800' }}
                onClick={onClose}
                size="sm"
              >
                Visão geral
              </Button>
              {consultorioItems.map(item => (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  color="whiteAlpha.900"
                  justifyContent="flex-start"
                  _hover={{ bg: 'brand.800' }}
                  onClick={onClose}
                  size="sm"
                  fontWeight={isActive(item.path) ? 700 : 400}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.name}
                </Button>
              ))}

              {/* Camadas novas */}
              <Text
                fontSize="xs"
                fontWeight={700}
                textTransform="uppercase"
                letterSpacing="wider"
                color="accent.400"
                pt={3}
                pl={4}
              >
                IA na medicina
              </Text>
              {topItems.slice(2).map(item => (
                <Button
                  key={item.path}
                  as={RouterLink}
                  to={item.path}
                  variant="ghost"
                  color="white"
                  justifyContent="flex-start"
                  _hover={{ bg: 'brand.800' }}
                  onClick={onClose}
                  fontWeight={isActive(item.path) ? 700 : 500}
                  aria-current={isActive(item.path) ? 'page' : undefined}
                >
                  {item.name}
                </Button>
              ))}

              <HStack pt={4} pl={4}>
                <Button
                  as="a"
                  href="https://wa.me/5562996602117"
                  target="_blank"
                  rel="noopener noreferrer"
                  leftIcon={<FaWhatsapp />}
                  size="sm"
                  bg="accent.500"
                  color="white"
                  _hover={{ bg: 'accent.600' }}
                >
                  Agendar pelo WhatsApp
                </Button>
                <IconButton
                  as="a"
                  href="https://instagram.com/drmassuca"
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<FaInstagram />}
                  aria-label="Instagram"
                  size="sm"
                  variant="ghost"
                  color="whiteAlpha.800"
                  _hover={{ bg: 'brand.800' }}
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
