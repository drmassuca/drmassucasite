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
  Spinner,
  useToast,
} from '@chakra-ui/react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';
import { GoogleGenerativeAI } from '@google/generative-ai';

// Configuração da API do Gemini
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY || 'AIzaSyCU4iqRmMfF3n36SbTt6loieQWDDgZm1W8';
const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_PROMPT = `Você é o assistente virtual do Dr. Massuca (Antonio Massucatti Neto - CRM-GO 17475), médico ultrassonografista e especialista em ecocardiografia fetal em Itaberaí-GO.

INFORMAÇÕES DA CLÍNICA:
- Especialidades: Ultrassonografia geral, Ecocardiografia fetal, Ultrassom obstétrico
- Mais de 20 anos de experiência
- Horários: Segunda a Sexta: 08:00-18:00 | Sábado: 08:00-12:00
- WhatsApp: (62) 99660-2117
- Localização: Itaberaí-GO

PRINCIPAIS EXAMES:
- Ultrassom Obstétrico de Rotina
- Morfológico de 1º e 2º Trimestre
- Doppler Obstétrico
- Ecocardiografia Fetal
- Ultrassom Endovaginal
- Ultrassom de Mamas
- Ultrassom Pélvico
- Pesquisa de Endometriose
- Ultrassom de Tireoide
- Ultrassom Total/Abdômen
- Entre outros

REGRAS IMPORTANTES:
1. Seja sempre educado, profissional e empático
2. NÃO forneça diagnósticos médicos
3. NÃO informe valores de exames (direcione ao WhatsApp)
4. Responda de forma clara e concisa
5. Na 5ª interação, sugira gentilmente continuar pelo WhatsApp para agendamentos
6. Para urgências, sempre oriente procurar atendimento médico imediato

Mantenha respostas curtas e objetivas (máximo 3-4 linhas).`;

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content: 'Olá! Sou o assistente virtual do Dr. Massuca. Como posso ajudar você hoje?',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0);
  const messagesEndRef = useRef(null);
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);
    setInteractionCount(prev => prev + 1);

    try {
      // Verificar se a API key está presente
      if (!API_KEY || API_KEY === 'YOUR_API_KEY_HERE') {
        throw new Error('API Key não configurada');
      }

      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

      // Prepara o contexto da conversa
      const conversationContext = messages
        .map(msg => `${msg.role === 'user' ? 'Usuário' : 'Assistente'}: ${msg.content}`)
        .join('\n');

      // Adiciona sugestão de WhatsApp na 5ª interação
      const currentInteraction = interactionCount + 1;
      const additionalPrompt =
        currentInteraction >= 5
          ? '\n\nLEMBRETE: Esta é a 5ª interação ou mais. Sugira gentilmente que o usuário continue a conversa pelo WhatsApp para agendamentos ou informações mais detalhadas.'
          : '';

      const prompt = `${SYSTEM_PROMPT}${additionalPrompt}\n\nHistórico da conversa:\n${conversationContext}\n\nUsuário: ${userMessage}\n\nAssistente:`;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', content: text }]);
    } catch (error) {
      console.error('Erro detalhado:', error);
      console.error('API Key presente?', !!API_KEY);
      console.error('Mensagem de erro:', error.message);

      // Mensagem de erro mais específica
      let errorMessage = 'Desculpe, ocorreu um erro. ';

      if (error.message?.includes('API_KEY')) {
        errorMessage += 'Problema com a configuração da API. ';
      } else if (error.message?.includes('quota')) {
        errorMessage += 'Limite de uso da API atingido. ';
      } else if (error.message?.includes('network')) {
        errorMessage += 'Erro de conexão. ';
      }

      errorMessage += 'Por favor, entre em contato pelo WhatsApp: (62) 99660-2117';

      toast({
        title: 'Erro na comunicação',
        description: error.message || 'Por favor, tente novamente.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });

      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content: errorMessage,
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
    <>
      {/* Botão flutuante */}
      <ScaleFade in={!isOpen} unmountOnExit>
        <Button
          position="fixed"
          bottom="20px"
          right="20px"
          w="70px"
          h="70px"
          borderRadius="full"
          bg="#0f3d2e"
          _hover={{ bg: '#0a2d22', transform: 'scale(1.05)' }}
          _active={{ transform: 'scale(0.95)' }}
          boxShadow="lg"
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
            size="md"
            bg="transparent"
            mb={1}
            name="Dr. Massuca"
            showBorder={false}
            objectFit="cover"
          />
          <Text fontSize="9px" color="white" fontWeight="bold">
            CHAT
          </Text>
        </Button>
      </ScaleFade>

      {/* Janela do Chat */}
      <Fade in={isOpen}>
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          w={{ base: '95%', sm: '380px', md: '400px' }}
          maxW="400px"
          h="500px"
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
                  Dr. Massuca
                </Text>
                <Text color="whiteAlpha.800" fontSize="xs">
                  Assistente Virtual
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

          {/* Área de mensagens */}
          <VStack
            flex={1}
            overflowY="auto"
            p={3}
            spacing={3}
            bg="gray.50"
            css={{
              '&::-webkit-scrollbar': {
                width: '6px',
              },
              '&::-webkit-scrollbar-track': {
                bg: 'gray.100',
              },
              '&::-webkit-scrollbar-thumb': {
                bg: 'gray.400',
                borderRadius: '3px',
              },
            }}
          >
            {messages.map((message, index) => (
              <Box
                key={index}
                alignSelf={message.role === 'user' ? 'flex-end' : 'flex-start'}
                maxW="85%"
              >
                <Box
                  bg={message.role === 'user' ? '#0f3d2e' : 'white'}
                  color={message.role === 'user' ? 'white' : 'gray.800'}
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  borderBottomLeftRadius={message.role === 'bot' ? '0' : 'lg'}
                  borderBottomRightRadius={message.role === 'user' ? '0' : 'lg'}
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">
                    {message.content}
                  </Text>
                </Box>
              </Box>
            ))}
            {isTyping && (
              <Box alignSelf="flex-start" maxW="85%">
                <Box bg="white" p={3} borderRadius="lg" boxShadow="sm" borderBottomLeftRadius="0">
                  <HStack spacing={1}>
                    <Spinner size="xs" color="#0f3d2e" />
                    <Text fontSize="sm" color="gray.500">
                      Digitando...
                    </Text>
                  </HStack>
                </Box>
              </Box>
            )}
            <div ref={messagesEndRef} />
          </VStack>

          {/* Área de input */}
          <HStack p={3} borderTop="1px" borderColor="gray.200" bg="white">
            <Input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Digite sua mensagem..."
              size="sm"
              borderRadius="full"
              focusBorderColor="#0f3d2e"
              disabled={isTyping}
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
              disabled={!inputMessage.trim() || isTyping}
              aria-label="Enviar mensagem"
            />
          </HStack>

          {/* Link para WhatsApp */}
          <Box p={2} bg="green.50" borderTop="1px" borderColor="green.200" textAlign="center">
            <Text fontSize="xs" color="green.700">
              Para agendamentos:{' '}
              <Button
                as="a"
                href="https://wa.me/5562996602117?text=Olá,%20quero%20agendar%20um%20ultrassom."
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
