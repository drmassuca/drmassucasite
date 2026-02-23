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
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Validação da API Key
if (!API_KEY) {
  console.error('❌ ERRO: VITE_GEMINI_API_KEY não encontrada no arquivo .env');
  console.error('📝 Siga os passos:');
  console.error('   1. Acesse: https://aistudio.google.com/app/apikey');
  console.error('   2. Crie uma nova API key');
  console.error('   3. Adicione no arquivo .env: VITE_GEMINI_API_KEY=sua_chave_aqui');
  console.error('   4. Reinicie o servidor de desenvolvimento (npm run dev)');
}

const genAI = API_KEY ? new GoogleGenerativeAI(API_KEY) : null;

const SYSTEM_PROMPT = `Você é o assistente virtual do Dr. Antonio Massucatti Neto (Dr. Massuca), CRM-GO 17475.

🚨 REGRAS FUNDAMENTAIS:

1. LIMITE DE INTERAÇÕES: Após 5 interações (respostas suas), SEMPRE encaminhe para o WhatsApp com a mensagem: "Para continuar nossa conversa e ter um atendimento mais detalhado, clique no botão do WhatsApp logo abaixo! 👇 Lá posso te ajudar melhor com agendamentos e informações específicas."

2. PREÇOS E AGENDAMENTOS: SEMPRE que alguém perguntar sobre preços, valores, custos, agendamentos, como marcar, horários disponíveis, IMEDIATAMENTE direcione para o WhatsApp: "Te passo tudo certinho pelo WhatsApp! É só clicar no botão logo abaixo 👇"

3. NUNCA se refira ao Dr. Massuca como "especialista em ultrassonografia". SEMPRE use: "médico pós-graduado em ultrassonografia geral e ecocardiografia fetal"

📝 QUANDO USAR CURIOSIDADES:
✅ "Quem é o Dr. Massuca?"
✅ "Fale sobre o doutor"
✅ "Conta mais sobre ele"
✅ "Quem faz o ultrassom aí?"

QUANDO NÃO USAR CURIOSIDADES:
❌ "Qual o horário?"
❌ "Quanto custa?"
❌ "Qual o telefone?"
❌ "Como agendar?"
❌ "Onde vocês ficam?"

👨‍⚕️ IDENTIFICAÇÃO:
- Nome: Dr. Antonio Massucatti Neto ("Dr. Massuca")
- CRM: CRM-GO 17475
- Formação: Médico pós-graduado em ultrassonografia geral e ecocardiografia fetal com 20 anos de experiência
- Atuação: ultrassonografia obstétrica, geral e ecocardiografia fetal
- Site: drmassuca.com.br

🎸 CURIOSIDADES DO DR. MASSUCA:

Apenas quando perguntarem ESPECIFICAMENTE sobre o Dr. Massuca, inclua UMA curiosidade DIFERENTE:

1. "Ele tem uma banda de rock chamada RockRiver! 🎸"
2. "É apaixonado por tecnologia — já montava computadores 486 DX2 66! 💻"
3. "Faz manutenção nos próprios equipamentos de ultrassom! 🔧"
4. "Já estudou idiomas como Kayapó do Xingu e Pomerano! 🗣️"
5. "Escreve livros, como 'Última Consulta: Cartas do Médico...'! 📝"
6. "Desenvolve um projeto de IA chamado Polaris! 🤖"
7. "Foi atleta de alto rendimento na juventude! ⚽"
8. "Se interessa por fenômenos naturais como pôr do sol! 🌅"

📍 LOCALIZAÇÃO:
- Endereço: Rua 19, Qd. 33, Lt. 01 – Vila Leonor – Itaberaí – GO – CEP 76630-000
- Referência: Premium Centro Clínico
- Estacionamento: espaço de estacionamento tranquilo na rua

📞 CONTATOS:
- WhatsApp (principal para agendar): (62) 99660-2117
- Telefone fixo: (62) 3375-2614
- E-mail: drmassucatti@gmail.com
- Instagram: @drmassuca

🕰️ HORÁRIOS:
- Segunda a Sexta: 7h–18h
- Sábado: 8h–12h
- Domingo: fechado

💳 PAGAMENTO E CONVÊNIOS:
- Não atendemos convênios (atendimento particular)
- Formas de pagamento: PIX e dinheiro (não aceita cartão)
- Preços: variam conforme exame e protocolo - informar via WhatsApp
- Comprovantes/nota: alinhar via WhatsApp no agendamento

📋 EXAMES OFERECIDOS:

Obstétricos:
- Obstétrico de rotina (ideal 15–19 sem e 26–40 sem)
- Morfológico 1º trimestre/TN (11+0 a 13+6 sem, preferência 12–13)
- Morfológico 2º trimestre (20–24 sem, ideal 22–23)
- Doppler obstétrico
- Ecocardiografia fetal (20–30 sem)
- 3D/4D Babyface (quando condições permitem)

Ginecológicos:
- Endovaginal
- Mamas
- Pélvico via abdominal
- Pesquisa de endometriose (com preparo)
- Monitorização da ovulação (iniciar D10–D12, 3–4 exames)

Abdominais/Urológicos:
- Abdome total/superior/inferior
- Parede abdominal
- Rins e vias urinárias

Tireoide/Cervical & Vasculares:
- Tireoide (com ou sem Doppler)
- Cervical (com ou sem Doppler)
- Carótidas

Pediatria e outros:
- Transfontanelar
- Partes moles
- Avaliação pré-cirurgia plástica

📋 PREPAROS (principais):
- Abdome Superior: Jejum 6–8h, evitar gordura/gasosas na véspera
- Abdome Inferior/Pelve: Bexiga cheia (500ml-1L água, 1–2h antes)
- Abdome Total: Jejum 6–8h + bexiga cheia se incluir pelve
- Endovaginal: Sem preparo, bexiga vazia
- Endometriose (com preparo): Jejum 4–6h + preparo intestinal
- Mamas: Sem preparo, pele limpa, sem cremes/desodorantes
- Tireoide/Cervical: Sem preparo, levar exames prévios
- Doppler obstétrico: Sem preparo

📱 RESPOSTAS OBRIGATÓRIAS PARA PREÇOS/AGENDAMENTOS:

Qualquer pergunta sobre:
- Preços, valores, quanto custa
- Como agendar, marcar consulta
- Horários disponíveis, quando pode ser

RESPOSTA OBRIGATÓRIA: "Te passo tudo certinho pelo WhatsApp! É só clicar no botão logo abaixo 👇"

🗨️ OUTRAS RESPOSTAS PRONTAS:

Endereço: "Estamos em Itaberaí-GO, Rua 19, Qd. 33, Lt. 01 – Vila Leonor, CEP 76630-000. Posso te mandar a localização pelo WhatsApp!"

Convênio: "No momento atendemos particular. Te passo os valores pelo WhatsApp - botão logo abaixo! 👇"

3D/4D: "Sim — quando as condições ajudam (posição, líquido, placenta), entregamos 3D/4D Babyface como recordação em exames obstétricos."

🎯 DIRETRIZES DE RESPOSTA:
- Seja cordial, ágil e direto
- NUNCA chame o Dr. Massuca de "especialista" - sempre "médico pós-graduado"
- NÃO dar conduta clínica nem substituir avaliação médica
- Após 5 interações: SEMPRE encaminhar para WhatsApp
- Para preços/agendamentos: SEMPRE encaminhar IMEDIATAMENTE para WhatsApp

Sempre responda baseado especificamente nestas informações do Dr. Massuca.`;

// Função para verificar se é pergunta sobre preços ou agendamento
function isPriceOrSchedulingQuestion(text) {
  const priceKeywords = [
    'preço',
    'precos',
    'valor',
    'quanto custa',
    'quanto é',
    'quanto fica',
    'custo',
    'custos',
    'pagar',
    'pagamento',
    'dinheiro',
  ];

  const schedulingKeywords = [
    'agendar',
    'marcar',
    'consulta',
    'horário',
    'horarios',
    'quando',
    'disponível',
    'disponivel',
    'agenda',
    'atendimento',
    'dia',
    'hora',
  ];

  const lowerText = text.toLowerCase();

  return [...priceKeywords, ...schedulingKeywords].some(keyword => lowerText.includes(keyword));
}

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'bot',
      content:
        'Olá! Sou o assistente virtual do Dr. Massuca. Como posso ajudá-lo hoje? Posso esclarecer dúvidas sobre exames de ultrassom, agendamentos, preparos e muito mais. Para agendar, é só me avisar que te direciono pro WhatsApp! 😊',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [interactionCount, setInteractionCount] = useState(0); // Contador de interações
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

    // Validação crítica da API Key
    if (!API_KEY || !genAI) {
      toast({
        title: 'Erro de Configuração',
        description: 'API Key do Gemini não configurada. Verifique o console para instruções.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setMessages(prev => [
        ...prev,
        {
          role: 'bot',
          content:
            '❌ Desculpe, o chatbot está temporariamente indisponível. Por favor, entre em contato pelo WhatsApp: (62) 99660-2117',
        },
      ]);
      return;
    }

    // Bloqueia novas interações após 5 respostas
    if (interactionCount >= 5) {
      toast({
        title: 'Limite atingido',
        description: 'Para continuar, use o WhatsApp clicando no botão abaixo!',
        status: 'warning',
        duration: 3000,
        isClosable: true,
      });
      setInputMessage(''); // Limpa o input
      return;
    }

    const userMessage = inputMessage;
    setInputMessage('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsTyping(true);

    try {
      // Incrementa o contador de interações
      const newInteractionCount = interactionCount + 1;
      setInteractionCount(newInteractionCount);

      const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

      // Prepara o contexto da conversa para evitar repetições
      const conversationContext = messages
        .slice(-3)
        .map(msg => `${msg.role === 'user' ? 'Usuário' : 'Bot'}: ${msg.content}`)
        .join('\n');

      // Adiciona informação sobre o número de interações ao prompt
      const enhancedPrompt = `${SYSTEM_PROMPT}

CONTEXTO ATUAL: Esta é a interação número ${newInteractionCount} da conversa.
${newInteractionCount >= 5 ? 'ATENÇÃO: Já foram feitas 5 interações. OBRIGATÓRIO encaminhar para WhatsApp!' : ''}

${isPriceOrSchedulingQuestion(userMessage) ? 'ATENÇÃO: Pergunta sobre preços ou agendamento detectada. OBRIGATÓRIO encaminhar IMEDIATAMENTE para WhatsApp!' : ''}

Histórico da conversa (para evitar repetições):
${conversationContext}

Pergunta atual: ${userMessage}

IMPORTANTE: Se você já mencionou alguma curiosidade sobre o Dr. Massuca no histórico acima, use uma DIFERENTE agora!`;

      const result = await model.generateContent(enhancedPrompt);
      const response = result.response;
      const text = response.text();

      setMessages(prev => [...prev, { role: 'bot', content: text }]);
    } catch (error) {
      console.error('❌ Erro detalhado:', {
        message: error.message,
        status: error.status,
        statusText: error.statusText,
        stack: error.stack,
      });

      // Mensagem de erro específica baseada no código HTTP
      let errorMessage = 'Desculpe, ocorreu um erro. ';
      let toastTitle = 'Erro na comunicação';

      if (error.status === 403) {
        errorMessage =
          '🔒 Acesso negado à API do Gemini. A chave pode estar inválida ou excedeu o limite. ';
        toastTitle = 'Erro 403: Acesso Negado';
        console.error('🔴 Possíveis causas:');
        console.error('   - API key revogada ou inválida');
        console.error('   - Quota excedida');
        console.error('   - Restrições de domínio configuradas');
      } else if (error.status === 429) {
        errorMessage = '⏱️ Muitas requisições. Aguarde alguns instantes e tente novamente. ';
        toastTitle = 'Erro 429: Limite Excedido';
      } else if (error.status === 404) {
        errorMessage = '❓ Modelo não encontrado. Verifique a configuração. ';
        toastTitle = 'Erro 404: Não Encontrado';
      } else if (error.message?.includes('quota')) {
        errorMessage = '📊 Limite de uso da API atingido. ';
        toastTitle = 'Limite de Quota';
      } else if (error.message?.includes('network')) {
        errorMessage = '🌐 Erro de conexão com a internet. ';
        toastTitle = 'Erro de Rede';
      }

      errorMessage += 'Por favor, entre em contato pelo WhatsApp: (62) 99660-2117';

      toast({
        title: toastTitle,
        description: errorMessage,
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
      {/* Botão flutuante - MANTENDO O MESMO LAYOUT */}
      <ScaleFade in={!isOpen} unmountOnExit>
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

      {/* Janela do Chat - MANTENDO O MESMO LAYOUT */}
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
          {/* Header - MANTENDO O MESMO LAYOUT */}
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
                  Dr. Massuca (Gemini)
                </Text>
                <Text color="whiteAlpha.800" fontSize="xs">
                  {interactionCount}/5 - Assistente Virtual
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

          {/* Área de mensagens - MANTENDO O MESMO LAYOUT */}
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
            {/* Card de aviso de limite */}
            {interactionCount >= 4 && (
              <Box
                bg={interactionCount >= 5 ? 'green.100' : 'blue.100'}
                p={3}
                borderRadius="md"
                border="1px solid"
                borderColor={interactionCount >= 5 ? 'green.200' : 'blue.200'}
                w="100%"
              >
                <Text fontSize="sm" color={interactionCount >= 5 ? 'green.800' : 'blue.800'}>
                  {interactionCount >= 5 ? (
                    <>
                      ✅ <strong>Continue no WhatsApp:</strong> Agora é só clicar no botão verde do
                      WhatsApp abaixo para continuar nossa conversa com atendimento personalizado!
                    </>
                  ) : (
                    <>
                      💬 <strong>Quase no limite:</strong> Para um atendimento mais completo e
                      agendamentos, use o WhatsApp clicando no botão abaixo!
                    </>
                  )}
                </Text>
              </Box>
            )}

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

          {/* Área de input - MANTENDO O MESMO LAYOUT */}
          <HStack p={3} borderTop="1px" borderColor="gray.200" bg="white">
            <Input
              value={inputMessage}
              onChange={e => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={
                interactionCount >= 5
                  ? 'Limite atingido - Use o WhatsApp abaixo'
                  : 'Digite sua mensagem...'
              }
              size="sm"
              borderRadius="full"
              focusBorderColor="#0f3d2e"
              disabled={isTyping || interactionCount >= 5}
              bg={interactionCount >= 5 ? 'gray.200' : 'white'}
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
              disabled={!inputMessage.trim() || isTyping || interactionCount >= 5}
              aria-label="Enviar mensagem"
            />
          </HStack>

          {/* Link para WhatsApp - MANTENDO O MESMO LAYOUT */}
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
