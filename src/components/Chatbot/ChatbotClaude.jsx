import { useState, useRef, useEffect } from 'react';
import {
  Box,
  Button,
  VStack,
  HStack,
  Input,
  Text,
  IconButton,
  Fade,
  ScaleFade,
  Avatar,
  useToast,
} from '@chakra-ui/react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    toast({
      title: 'Sistema Claude',
      description: 'Este é o componente Claude (backup - não está sendo usado atualmente)',
      status: 'info',
      duration: 3000,
      isClosable: true,
    });

    setInputMessage('');
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Botão flutuante */}
      <ScaleFade in={!isOpen} unmountOnExit>
        <Button
          position="fixed"
          bottom={{ base: '15px', sm: '20px' }}
          right={{ base: '10px', sm: '20px' }}
          w={{ base: '60px', sm: '70px' }}
          h={{ base: '60px', sm: '70px' }}
          borderRadius="full"
          bg="#0f3d2e"
          onClick={() => setIsOpen(true)}
          zIndex={999}
          p={0}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
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

      {/* Janela do Chat */}
      <Fade in={isOpen}>
        <Box
          position="fixed"
          bottom={{ base: '10px', sm: '20px' }}
          right={{ base: '10px', sm: '20px' }}
          left={{ base: '10px', sm: 'auto' }}
          w={{ base: 'calc(100% - 20px)', sm: '380px', md: '400px' }}
          maxW={{ base: '100%', sm: '400px' }}
          h={{ base: '85vh', sm: '500px' }}
          maxH="500px"
          bg="white"
          borderRadius="lg"
          boxShadow="2xl"
          zIndex={1000}
          display={isOpen ? 'flex' : 'none'}
          flexDirection="column"
          overflow="hidden"
        >
          {/* Header */}
          <HStack bg="#0f3d2e" p={3} justify="space-between" borderTopRadius="lg">
            <HStack>
              <Avatar
                src="/assets/face.webp"
                size="sm"
                bg="transparent"
                name="Dr. Massuca"
                showBorder={false}
                objectFit="cover"
              />
              <Box>
                <Text color="white" fontWeight="bold" fontSize="sm">
                  Dr. Massuca (Claude)
                </Text>
                <Text color="whiteAlpha.800" fontSize="xs">
                  Backup - Não em uso
                </Text>
              </Box>
            </HStack>
            <IconButton
              icon={<FaTimes />}
              size="sm"
              variant="ghost"
              color="white"
              _hover={{ bg: 'whiteAlpha.200' }}
              onClick={() => setIsOpen(false)}
              aria-label="Fechar chat"
            />
          </HStack>

          {/* Mensagens */}
          <VStack
            flex={1}
            overflowY="auto"
            p={3}
            spacing={3}
            bg="gray.50"
            justify="center"
            align="center"
          >
            <Text fontSize="sm" color="gray.600" textAlign="center">
              Este é o componente Claude (backup).
              <br />O sistema atual usa o Gemini.
            </Text>
          </VStack>

          {/* Input */}
          <HStack p={3} borderTop="1px" borderColor="gray.200" bg="white">
            <Input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Componente de backup..."
              size="sm"
              borderRadius="full"
              focusBorderColor="#0f3d2e"
              _placeholder={{ fontSize: 'sm' }}
            />
            <IconButton
              icon={<FaPaperPlane />}
              size="sm"
              borderRadius="full"
              bg="#d4af37"
              color="white"
              _hover={{ bg: '#b8941f' }}
              _active={{ transform: 'scale(0.95)' }}
              onClick={sendMessage}
              aria-label="Enviar mensagem"
            />
          </HStack>

          {/* WhatsApp */}
          <Box p={2} bg="green.50" borderTop="1px" borderColor="green.200" textAlign="center">
            <Text fontSize="xs" color="green.700">
              Para agendamentos:{' '}
              <Button
                as="a"
                href="https://wa.me/5562996602117"
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="link"
                color="green.600"
                fontWeight="bold"
              >
                WhatsApp (62) 99660-2117
              </Button>
            </Text>
          </Box>
        </Box>
      </Fade>
    </>
  );
}

export default Chatbot;
