import { Box, HStack, Text, Image, Link } from '@chakra-ui/react';

/**
 * Selo de credenciais.
 * - Exames obstétricos: mostra logo ISUOG + protocolo + CRM
 * - Demais exames: mostra CRM + experiência
 *
 * @param {{ variant?: 'obstetric' | 'general' }} props
 */
export default function ExamCredentialBadge({ variant = 'general' }) {
  if (variant === 'obstetric') {
    return (
      <Box mt={8} p={4} bg="green.50" borderRadius="lg" border="1px solid" borderColor="green.200">
        <HStack spacing={4} align="center" flexWrap="wrap" justify="center">
          <Link href="https://www.isuog.org" isExternal>
            <Box bg="white" borderRadius="lg" px={3} py={2} shadow="sm">
              <Image
                src="/assets/isuog-logo.png"
                alt="ISUOG – International Society of Ultrasound in Obstetrics and Gynecology"
                h="32px"
                objectFit="contain"
                loading="lazy"
              />
            </Box>
          </Link>
          <Text fontSize="sm" color="green.800" textAlign="center">
            <strong>Protocolo ISUOG</strong> · CRM-GO 17475 · Referência em ultrassonografia há mais
            de 20 anos
          </Text>
        </HStack>
      </Box>
    );
  }

  /* Variante genérica */
  return (
    <Box
      mt={8}
      p={4}
      bg="green.50"
      borderRadius="lg"
      border="1px solid"
      borderColor="green.200"
      textAlign="center"
    >
      <Text fontSize="sm" color="green.800">
        <strong>CRM-GO 17475</strong> · Referência em ultrassonografia há mais de 20 anos
      </Text>
    </Box>
  );
}
