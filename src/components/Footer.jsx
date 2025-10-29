import { Box, Flex, Text, Link as ChakraLink, IconButton, HStack, VStack } from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram, FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { Link as RouterLink } from 'react-router-dom';

const Footer = () => {
  return (
    <Box bg="black" color="white" py={8}>
      <Flex
        direction={{ base: 'column', md: 'row' }}
        align="start"
        justify="space-around"
        maxW="1200px"
        mx="auto"
        px={4}
      >
        {/* Coluna 1 */}
        <VStack align="start" spacing={2} minW="240px" minH="96px">
          <Text fontWeight="bold" minH="24px">
            Dr. Antonio Massucatti Neto
          </Text>
          <Text minH="24px">CRM-GO 17475</Text>
          <Text minH="48px">Pós-graduação em Ultrassonografia Geral e Ecocardiografia Fetal</Text>
        </VStack>

        {/* Coluna 2 */}
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold">Contato</Text>

          {/* Telefone + WhatsApp */}
          <VStack align="start" spacing={0}>
            <HStack>
              <FaPhone />
              <ChakraLink href="https://wa.me/5562996602117" isExternal color="white">
                (62) 99660-2117
              </ChakraLink>
            </HStack>
            <Text fontSize="sm" color="gray.300" ml="22px">
              WhatsApp
            </Text>
          </VStack>

          {/* E-mail */}
          <HStack>
            <FaEnvelope />
            <ChakraLink href="mailto:drmassucatti@gmail.com" color="white">
              drmassucatti@gmail.com
            </ChakraLink>
          </HStack>

          {/* Endereço */}
          <VStack align="start" spacing={0}>
            <ChakraLink
              href="https://maps.app.goo.gl/yERHkLaxiicVrKH27"
              isExternal
              color="white"
              display="flex"
              alignItems="center"
            >
              <FaMapMarkerAlt style={{ marginRight: '5px' }} />
              Itaberaí - GO
            </ChakraLink>
            <Text fontSize="sm" color="gray.300" ml="22px">
              Rua 19, Qd. 33, Lt. 01 – Vila Leonor
              <br />
              CEP 76630-000
            </Text>
          </VStack>
        </VStack>

        {/* Coluna 3 */}
        <VStack align="start" spacing={2}>
          <Text fontWeight="bold">Redes Sociais</Text>
          <HStack spacing={4}>
            <ChakraLink href="https://instagram.com/drmassuca" isExternal>
              <IconButton
                icon={<FaInstagram />}
                aria-label="Instagram"
                variant="ghost"
                color="white"
                _hover={{ color: 'yellow.300' }}
              />
            </ChakraLink>
            <ChakraLink href="https://wa.me/5562996602117" isExternal>
              <IconButton
                icon={<FaWhatsapp />}
                aria-label="WhatsApp"
                variant="ghost"
                color="white"
                _hover={{ color: 'yellow.300' }}
              />
            </ChakraLink>
            <ChakraLink href="https://x.com/massucas" isExternal>
              <IconButton
                icon={<FaXTwitter />}
                aria-label="X (Twitter)"
                variant="ghost"
                color="white"
                _hover={{ color: 'yellow.300' }}
              />
            </ChakraLink>
          </HStack>

          <Box pt={2} w="100%" textAlign="right">
            <ChakraLink
              as={RouterLink}
              to="/privacy-policy"
              color="white"
              _hover={{ textDecoration: 'underline' }}
            >
              Política de Privacidade
            </ChakraLink>
          </Box>
        </VStack>
      </Flex>

      <Text textAlign="center" mt={4} fontSize="sm">
        © 2025 Dr. Antonio Massucatti Neto - CRM-GO 17475. Todos os direitos reservados.
      </Text>
    </Box>
  );
};

export default Footer;
