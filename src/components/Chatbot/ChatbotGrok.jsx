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
  Avatar,
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FaTimes, FaPaperPlane, FaWhatsapp } from 'react-icons/fa';

const MAX_INTERACTIONS = 6;
const ENDPOINT = '/api/chat';

const initialBot = {
  role: 'assistant',
  content:
    'Ola! Sou o assistente virtual do Dr. Massuca. Posso esclarecer duvidas sobre exames, preparos, horarios e mais. Para agendar, te direciono pelo WhatsApp. Como posso ajudar?',
};

export default function ChatbotGrok({ onClose }) {
  const [messages, setMessages] = useState([initialBot]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const sendMessage = async () => {
    const text = inputMessage.trim();
    if (!text || isTyping) return;

    if (interactionCount >= MAX_INTERACTIONS) {
      toast({
        title: 'Limite atingido',
        description: 'Para continuar, use o WhatsApp clicando no botao abaixo.',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const newUserMessage = { role: 'user', content: text };
    const nextMessages = [...messages, newUserMessage];
    setMessages(nextMessages);
    setInputMessage('');
    setIsTyping(true);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || `Erro ${res.status}`);

      setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      setInteractionCount(prev => prev + 1);
    } catch (err) {
      toast({
        title: 'Erro no chat',
        description: err.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content:
            'Desculpe, estou com dificuldade de responder agora. Por favor, fale conosco pelo WhatsApp: (62) 99660-2117.',
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Fade in unmountOnExit>
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
        display="flex"
        flexDirection="column"
        overflow="hidden"
      >
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
                Dr. Massuca
              </Text>
              <Text color="whiteAlpha.800" fontSize="xs">
                {interactionCount}/{MAX_INTERACTIONS} - Assistente Virtual
              </Text>
            </Box>
          </HStack>
          <IconButton
            icon={<FaTimes />}
            size="sm"
            variant="ghost"
            color="white"
            _hover={{ bg: 'whiteAlpha.200' }}
            onClick={onClose}
            aria-label="Fechar chat"
          />
        </HStack>

        <VStack
          flex={1}
          overflowY="auto"
          p={3}
          spacing={3}
          bg="gray.50"
          align="stretch"
          css={{
            '&::-webkit-scrollbar': { width: '6px' },
            '&::-webkit-scrollbar-track': { background: '#f3f4f6' },
            '&::-webkit-scrollbar-thumb': { background: '#9ca3af', borderRadius: '3px' },
          }}
        >
          {interactionCount >= MAX_INTERACTIONS - 1 && (
            <Box
              bg={interactionCount >= MAX_INTERACTIONS ? 'green.100' : 'blue.100'}
              p={3}
              borderRadius="md"
              border="1px solid"
              borderColor={interactionCount >= MAX_INTERACTIONS ? 'green.200' : 'blue.200'}
            >
              <Text fontSize="sm" color={interactionCount >= MAX_INTERACTIONS ? 'green.800' : 'blue.800'}>
                {interactionCount >= MAX_INTERACTIONS ? (
                  <>
                    <strong>Continue no WhatsApp:</strong> chegamos ao limite. Clique no botao verde abaixo.
                  </>
                ) : (
                  <>
                    <strong>Quase no limite:</strong> para atendimento mais completo, use o WhatsApp.
                  </>
                )}
              </Text>
            </Box>
          )}

          {messages.map((msg, i) => (
            <Box key={i} alignSelf={msg.role === 'user' ? 'flex-end' : 'flex-start'} maxW="85%">
              <Box
                bg={msg.role === 'user' ? '#0f3d2e' : 'white'}
                color={msg.role === 'user' ? 'white' : 'gray.800'}
                p={3}
                borderRadius="lg"
                boxShadow="sm"
                borderBottomLeftRadius={msg.role === 'assistant' ? '0' : 'lg'}
                borderBottomRightRadius={msg.role === 'user' ? '0' : 'lg'}
              >
                <Text fontSize="sm" whiteSpace="pre-wrap">
                  {msg.content}
                </Text>
              </Box>
            </Box>
          ))}

          {isTyping && (
            <Box alignSelf="flex-start" maxW="85%">
              <Box bg="white" p={3} borderRadius="lg" boxShadow="sm" borderBottomLeftRadius="0">
                <HStack spacing={2}>
                  <Spinner size="xs" color="#0f3d2e" />
                  <Text fontSize="sm" color="gray.500">
                    Pensando...
                  </Text>
                </HStack>
              </Box>
            </Box>
          )}

          <div ref={messagesEndRef} />
        </VStack>

        <HStack p={3} borderTop="1px" borderColor="gray.200" bg="white">
          <Input
            value={inputMessage}
            onChange={e => setInputMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={
              interactionCount >= MAX_INTERACTIONS
                ? 'Limite atingido - use o WhatsApp'
                : 'Digite sua mensagem...'
            }
            size="sm"
            borderRadius="full"
            focusBorderColor="#0f3d2e"
            disabled={isTyping || interactionCount >= MAX_INTERACTIONS}
            bg={interactionCount >= MAX_INTERACTIONS ? 'gray.200' : 'white'}
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
            isLoading={isTyping}
            disabled={!inputMessage.trim() || isTyping || interactionCount >= MAX_INTERACTIONS}
            aria-label="Enviar mensagem"
          />
        </HStack>

        <Box p={2} bg="green.50" borderTop="1px" borderColor="green.200" textAlign="center">
          <Button
            as="a"
            href="https://wa.me/5562996602117?text=Ol%C3%A1%2C%20gostaria%20de%20agendar%20um%20ultrassom."
            target="_blank"
            rel="noopener noreferrer"
            leftIcon={<FaWhatsapp />}
            size="xs"
            variant="link"
            color="green.700"
            fontWeight="bold"
          >
            WhatsApp (62) 99660-2117
          </Button>
        </Box>
      </Box>
    </Fade>
  );
}
