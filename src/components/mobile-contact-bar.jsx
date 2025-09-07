import { Box, Button, HStack, Show } from '@chakra-ui/react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';

export default function MobileContactBar() {
  return (
    <Show below="md">
      <Box
        position="fixed"
        bottom="0"
        left="0"
        right="0"
        bg="white"
        borderTop="1px solid"
        borderColor="gray.200"
        py={2}
        px={3}
        zIndex={1000}
      >
        <HStack spacing={3} justify="space-between" w="100%">
          <Button
            as="a"
            href="https://wa.me/5562996602117"
            target="_blank"
            leftIcon={<FaWhatsapp />}
            variant="brandSolid"
            flex="1"
          >
            WhatsApp
          </Button>
          <Button
            as="a"
            href="https://instagram.com/drmassuca"
            target="_blank"
            leftIcon={<FaInstagram />}
            variant="brandOutline"
            flex="1"
          >
            Instagram
          </Button>
        </HStack>
      </Box>
    </Show>
  );
}
