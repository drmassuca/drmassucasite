import { HStack, Button } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { whatsappMessages } from './examData';

const WHATSAPP_NUMBER = '5562996602117';

/**
 * Botões de ação com mensagem pré-preenchida no WhatsApp.
 * @param {{ slug: string, ctaLabel?: string }} props
 */
export default function ExamCTA({ slug, ctaLabel = 'Agendar exame' }) {
  const message = whatsappMessages[slug] || 'Olá, gostaria de agendar um exame.';
  const whatsappLink = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

  return (
    <HStack justify="center" spacing={4} mt={8}>
      <Button
        as="a"
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        colorScheme="green"
        size="lg"
      >
        {ctaLabel}
      </Button>
      <Button as={RouterLink} to="/exames" variant="outline" colorScheme="gray" size="lg">
        Voltar aos exames
      </Button>
    </HStack>
  );
}
