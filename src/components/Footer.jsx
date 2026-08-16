import {
  Box,
  Flex,
  Text,
  Link as ChakraLink,
  IconButton,
  HStack,
  VStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';

/**
 * Footer do reposicionamento 2026: navy da família ICS/Xdiag,
 * quatro colunas refletindo as quatro camadas do posicionamento.
 */
const Footer = () => {
  return (
    <Box bg="brand.900" color="white" pt={12} pb={6} borderTop="3px solid" borderColor="accent.500">
      <SimpleGrid
        columns={{ base: 1, sm: 2, lg: 4 }}
        spacing={8}
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Coluna 1: identidade */}
        <VStack align="start" spacing={2}>
          <Text fontWeight={700} fontSize="lg" letterSpacing="-0.02em">
            Dr. Antonio Massucatti Neto
          </Text>
          <Text color="var(--brand-on-navy)" fontSize="sm">
            CRM-GO 17475
          </Text>
          <Text color="var(--brand-on-navy)" fontSize="sm">
            Médico ultrassonografista, pós-graduado em Ultrassonografia Geral e Ecocardiografia
            Fetal. Educador e criador de produtos de IA para a medicina.
          </Text>
        </VStack>

        {/* Coluna 2: consultório */}
        <VStack align="start" spacing={2}>
          <Text fontWeight={700}>Consultório</Text>
          <ChakraLink as={RouterLink} to="/exames" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Exames de ultrassom
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/ultrassom-3d" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Ultrassom 3D
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/area-do-paciente" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Área do paciente
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/faq" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Perguntas frequentes
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/contato" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Contato e agendamento
          </ChakraLink>
        </VStack>

        {/* Coluna 3: IA na medicina */}
        <VStack align="start" spacing={2}>
          <Text fontWeight={700}>IA na medicina</Text>
          <ChakraLink as={RouterLink} to="/xdiag" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Produtos Xdiag
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/curso-medicina-com-ia" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Curso Medicina com IA
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/palestras" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Palestras
          </ChakraLink>
          <ChakraLink as={RouterLink} to="/ia-medica" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
            Blog de IA médica
          </ChakraLink>
        </VStack>

        {/* Coluna 4: contato */}
        <VStack align="start" spacing={3}>
          <Text fontWeight={700}>Contato</Text>
          <HStack spacing={2}>
            <FaPhone size={14} />
            <ChakraLink href="https://wa.me/5562996602117" isExternal color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
              (62) 99660-2117 (WhatsApp)
            </ChakraLink>
          </HStack>
          <HStack spacing={2}>
            <FaEnvelope size={14} />
            <ChakraLink href="mailto:drmassucatti@gmail.com" color="var(--brand-on-navy)" fontSize="sm" _hover={{ color: 'white' }}>
              drmassucatti@gmail.com
            </ChakraLink>
          </HStack>
          <HStack spacing={2} align="start">
            <Box pt="3px">
              <FaMapMarkerAlt size={14} />
            </Box>
            <ChakraLink
              href="https://maps.app.goo.gl/yERHkLaxiicVrKH27"
              isExternal
              color="var(--brand-on-navy)"
              fontSize="sm"
              _hover={{ color: 'white' }}
            >
              Rua 19, Qd. 33, Lt. 01, Vila Leonor
              <br />
              Itaberaí, GO, CEP 76630-000
            </ChakraLink>
          </HStack>
          <HStack spacing={1} pt={1}>
            <IconButton
              as="a"
              href="https://instagram.com/drmassuca"
              target="_blank"
              rel="noopener noreferrer"
              icon={<FaInstagram />}
              aria-label="Instagram"
              variant="ghost"
              size="sm"
              color="var(--brand-on-navy)"
              _hover={{ color: 'white', bg: 'brand.800' }}
            />
            <IconButton
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              icon={<FaWhatsapp />}
              aria-label="WhatsApp"
              variant="ghost"
              size="sm"
              color="var(--brand-on-navy)"
              _hover={{ color: 'white', bg: 'brand.800' }}
            />
            <IconButton
              as="a"
              href="https://x.com/massucas"
              target="_blank"
              rel="noopener noreferrer"
              icon={<FaXTwitter />}
              aria-label="X (Twitter)"
              variant="ghost"
              size="sm"
              color="var(--brand-on-navy)"
              _hover={{ color: 'white', bg: 'brand.800' }}
            />
          </HStack>
        </VStack>
      </SimpleGrid>

      <Flex
        maxW="1200px"
        mx="auto"
        px={4}
        mt={10}
        pt={4}
        borderTop="1px solid"
        borderColor="whiteAlpha.200"
        direction={{ base: 'column', md: 'row' }}
        align={{ base: 'start', md: 'center' }}
        justify="space-between"
        gap={2}
      >
        <Text fontSize="sm" color="var(--brand-on-navy)">
          © 2026{' '}
          <ChakraLink
            href="https://xdiag.com.br"
            isExternal
            color="var(--brand-on-navy)"
            textDecoration="underline"
            _hover={{ color: 'white' }}
          >
            Xdiag Tecnologias Ltda.
          </ChakraLink>{' '}
          Todos os direitos reservados.
        </Text>
        <ChakraLink
          as={RouterLink}
          to="/privacy-policy"
          fontSize="sm"
          color="var(--brand-on-navy)"
          _hover={{ color: 'white', textDecoration: 'underline' }}
        >
          Política de Privacidade
        </ChakraLink>
      </Flex>
    </Box>
  );
};

export default Footer;
