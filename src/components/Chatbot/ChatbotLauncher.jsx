import { useState, lazy, Suspense } from 'react';
import { Avatar, Button, Text, ScaleFade } from '@chakra-ui/react';

// Carrega o ChatbotGrok dinamicamente apenas quando o usuario abrir o chat.
// Reduz JS inicial em ~30-50KB para visitantes que nao usam o chat.
const ChatbotGrok = lazy(() => import('./ChatbotGrok'));

export default function ChatbotLauncher() {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <ScaleFade in={!opened} unmountOnExit>
        <Button
          position="fixed"
          bottom={{ base: '15px', sm: '20px' }}
          right={{ base: '10px', sm: '20px' }}
          w={{ base: '60px', sm: '70px' }}
          h={{ base: '60px', sm: '70px' }}
          borderRadius="full"
          bg="#0f3d2e"
          _hover={{ bg: '#0a2d22', transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
          boxShadow="lg"
          onClick={() => setOpened(true)}
          zIndex={999}
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          aria-label="Abrir chat com assistente virtual"
        >
          <Avatar
            src="/assets/face.webp"
            size={{ base: 'sm', sm: 'md' }}
            bg="transparent"
            mb={1}
            name="Dr. Massuca"
            showBorder={false}
            objectFit="cover"
          />
          <Text fontSize={{ base: '8px', sm: '9px' }} color="white" fontWeight="bold">
            CHAT
          </Text>
        </Button>
      </ScaleFade>

      {opened && (
        <Suspense fallback={null}>
          <ChatbotGrok onClose={() => setOpened(false)} />
        </Suspense>
      )}
    </>
  );
}
