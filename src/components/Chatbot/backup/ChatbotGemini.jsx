import { useState, useRef, useEffect, useCallback } from 'react';
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
} from '@chakra-ui/react';
import { FaTimes, FaPaperPlane } from 'react-icons/fa';

/**
 * ChatbotSimple.jsx — versão enxuta + cordial
 * – Todo conhecimento embutido em constantes abaixo.
 * – Limite de 50 mensagens no histórico.
 * – Aria-live para leitores de tela.
 * – Sempre que mencionar WhatsApp, usar: “(link abaixo)”.
 * – Sem Markdown visível ao usuário.
 */

/* ---------- Utils ---------- */
const normalize = (s = '') =>
  s
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const stripMarkdown = (s = '') =>
  s
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/__(.*?)__/g, '$1')
    .replace(/_(.*?)_/g, '$1')
    .replace(/~~(.*?)~~/g, '$1')
    .replace(/`{1,3}([^`]*)`{1,3}/g, '$1');

const startsAny = (tok, arr) => arr.some(w => w.startsWith(tok));

/* ---------- Config ---------- */
const WHATS = 'https://wa.me/5562996602117?text=Olá,%20quero%20agendar%20um%20ultrassom.';
const WHATS_TXT = 'WhatsApp (62) 99660-2117';

/* ---------- Base de conhecimento ---------- */
const EXAMS = {
  abdome: {
    tokens: ['abdome', 'abdomen', 'abdomem'],
    info: 'Ultrassom de abdome total avalia fígado, vesícula/vias biliares, pâncreas, baço, rins e grandes vasos.',
    prep: 'Jejum de 6 a 8 h. Pequenos goles de água podem ser permitidos.',
  },
  rins: {
    tokens: ['rins', 'renal', 'urinario', 'urinaria', 'bexiga', 'vias urinarias'],
    info: 'Ultrassom de rins e vias urinárias pesquisa cálculos, dilatações, bexiga e alterações renais.',
    prep: 'Beber 750 mL–1 L de água 1 h antes e NÃO urinar (bexiga cheia).',
  },
  pelvico: {
    tokens: ['pelvico', 'útero', 'ovario', 'transvaginal', 'tvus'],
    info: 'Ultrassom pélvico avalia útero e ovários. Transabdominal dá visão global; transvaginal tem maior resolução.',
    prep: 'Transabdominal: bexiga cheia (700–1000 mL, 1 h antes). Transvaginal: bexiga vazia.',
  },
  morfologico: {
    tokens: ['morfologico', 'morfologica'],
    info: 'Ultrassom morfológico (18–22 semanas) avalia detalhadamente a anatomia fetal.',
    prep: 'Sem preparo específico, mas venha bem alimentada e hidratada.',
  },
  mamas: {
    tokens: ['mamas', 'mama'],
    info: 'Ultrassom de mamas complementa a mamografia, avalia nódulos/cistos e pode guiar biópsias.',
    prep: 'Sem preparo.',
  },
  tireoide: {
    tokens: ['tireoide', 'tiroide', 'tiroides'],
    info: 'Ultrassom de tireoide avalia tamanho, nódulos e vascularização. Seguimento conforme critérios clínicos.',
    prep: 'Sem preparo.',
  },
  carotidas: {
    tokens: ['carotida', 'carotidas'],
    info: 'Doppler de carótidas pesquisa placas, estenose e fluxo — útil em risco cardiovascular.',
    prep: 'Sem preparo.',
  },
  mmiiVenoso: {
    tokens: [
      'mmii',
      'venoso',
      'trombose',
      'dvt',
      'perna',
      'membros inferiores',
      'varizes',
      'edema',
    ],
    info: 'Doppler venoso de membros inferiores investiga trombose, refluxo e varizes.',
    prep: 'Sem preparo.',
  },
  testiculos: {
    tokens: ['testiculos', 'escroto', 'bolsa escrotal', 'varicocele'],
    info: 'Ultrassom de escroto/testículos é o método de escolha para dor, inchaço, nódulos, varicocele e torção.',
    prep: 'Sem preparo.',
  },
  prostata: {
    tokens: ['prostata', 'trus', 'transretal'],
    info: 'Ultrassom transretal (TRUS) avalia a próstata de perto. Em alguns casos pede-se enema leve (biópsia tem protocolo próprio).',
    prep: 'Geralmente sem jejum; siga orientações específicas se houver biópsia.',
  },
  aorta: {
    tokens: ['aorta', 'aneurisma', 'aaa'],
    info: 'Rastreamento de aneurisma de aorta abdominal costuma ser recomendado uma vez em homens de 65–75 anos que já fumaram.',
    prep: 'Sem preparo.',
  },
  hernia: {
    tokens: ['hernia', 'inguinal', 'umbilical', 'parede abdominal'],
    info: 'Ultrassom de parede abdominal/hernia ajuda quando a hérnia é pequena ou intermitente e diferencia outras causas de abaulamento.',
    prep: 'Sem preparo.',
  },
  msk: {
    tokens: ['ombro', 'joelho', 'tornozelo', 'punho', 'cotovelo', 'musculo', 'tendao'],
    info: 'Ultrassom musculoesquelético avalia tendões, músculos, bursas e coleções em dor/estalo/ruptura e pós-trauma.',
    prep: 'Sem preparo.',
  },
  ecofetal: {
    tokens: ['eco fetal', 'ecocardiografia fetal', 'eco do bebe', 'eco do bebê', 'ecofetal'],
    info: 'Ecocardiografia fetal é o ultrassom detalhado do coração do bebê (anatomia, função e fluxos). Em geral entre 18–22 semanas.',
    prep: 'Sem preparo. Venha alimentada e confortável.',
  },
};

const CATALOGO =
  'Principais exames:\n' +
  '• Obstétricos: inicial, translucência nucal (11–13+6 s), morfológico (18–22 s), crescimento e Dopplers; 3D/4D como recordação\n' +
  '• Abdome total | Rins/urinário | Pélvico/Transvaginal\n' +
  '• Mamas | Tireoide | Carótidas | MMII venoso\n' +
  '• Escroto/Testículos | Próstata (TRUS) | Aorta (AAA)\n' +
  '• Hérnias/parede abdominal | Partes moles/MSK | Glândulas salivares | Linfonodos';

const MSGS = {
  greet:
    'Olá! Sou o assistente virtual do Dr. Massuca. Posso ajudar com agendamento, valores, preparos, exames e gravidez. Em que posso lhe ajudar?',
  smallGreet: 'Oi! Como posso ajudar?',
  agendar:
    'Para agendar, chame no WhatsApp — o link está logo abaixo. Se preferir, deixe nome e telefone que retornamos.',
  horarios: 'Horários:\n• Seg–Sex: 07h–17h (podendo estender)\n• Sábado: manhã\n• Domingo: fechado',
  local:
    'Estamos em Itaberaí-GO. No site há mapas e rotas; se preferir, envio a localização pelo WhatsApp (link abaixo).',
  valores:
    'Valores variam conforme o exame. Diga o nome do exame que eu informo, ou conversamos no WhatsApp (link abaixo).',
  convenios: 'Atendimento particular. Emitimos recibo para reembolso quando aplicável.',
  resultados:
    'Resultados: na maioria dos exames, na hora. Entregamos impresso e enviamos PDF por e-mail ou WhatsApp.',
  seguranca:
    'Ultrassom não usa radiação ionizante e é considerado seguro quando realizado por equipe habilitada (seguimos ALARA).',
  doppler:
    'Doppler avalia fluxo sanguíneo (velocidade e direção). Em gestação, avaliamos placenta e cordão quando indicado.',
  obstetricIntro:
    'Gestação:\n• 1º exame: 6–8 semanas (confirmação)\n• Translucência nucal: 11–13+6 semanas\n• Morfológico: 18–22 semanas\n• 3D/4D recordação costuma ficar melhor em 24–28 semanas.',
  catalogo: CATALOGO,
  bio: 'Dr. Massuca é médico com mais de 20 anos de experiência, especialista em ultrassonografia geral e obstétrica, e atende em Itaberaí-GO desde 2010. Preza por atendimento humanizado, tecnologia atual e laudos rápidos.',
  pagamento:
    'Formas de pagamento: PIX, cartão de débito/crédito, dinheiro. Parcelamos em até 3 x no cartão, sem juros.',
  estacionamento:
    'Disponibilizamos estacionamento gratuito e rampa de acessibilidade em frente à clínica.',
  fallback:
    'Posso ajudar! Diga o nome do exame (ex.: abdome, rins, transvaginal, mamas, tireoide, carótidas, morfológico) ou pergunte sobre preparo, agendamento, valores ou local. Para falar direto, use o WhatsApp (link abaixo).',
};

/* ---------- Triggers (tokens sem acento) ---------- */
const TRIGGERS = {
  saudar: ['ola', 'oi', 'oie', 'opa', 'bom dia', 'boa tarde', 'boa noite'],
  agendar: [
    'agendar',
    'marcar',
    'agendamento',
    'marcacao',
    'whats',
    'zap',
    'whatsapp',
    'telefone',
    'contato',
  ],
  horarios: ['funcionamento', 'horarios', 'abre', 'fecha', 'sabado', 'domingo'],
  local: ['local', 'localiza', 'endereco', 'onde', 'mapa', 'chegar', 'clinica'],
  valores: ['valor', 'preco', 'custo', 'custa', 'tabela', 'orcamento'],
  convenios: ['convenio', 'plano', 'unimed', 'amil', 'bradesco', 'sulamerica'],
  resultados: ['resultado', 'laudo', 'quando fica', 'entrega'],
  seguranca: ['faz mal', 'perigoso', 'radiacao', 'seguro', 'cancer'],
  doppler: ['doppler', 'fluxo', 'arteria', 'veia', 'vascular'],
  preparo: ['preparo', 'jejum', 'bexiga cheia', 'bexiga vazia', 'preparar'],
  gestacao: ['gestacao', 'gravidez', 'grávida', 'pre natal', 'pre-natal'],
  bio: ['quem', 'dr', 'doutor', 'massuca', 'sobre'],
  pagamento: ['pagamento', 'pagar', 'pix', 'cartao', 'crédito', 'debito'],
  estacionamento: ['estacionamento', 'acesso', 'acessibilidade', 'rampa'],
};

/* ---------- NLU simples ---------- */
function hasAnyNormalized(clean, arr) {
  return arr.some(w => clean.includes(w));
}

function findExamKey(clean) {
  const tokens = clean.split(' ');
  for (const [key, cfg] of Object.entries(EXAMS)) {
    if (hasAnyNormalized(clean, cfg.tokens.map(normalize))) return key;
  }
  for (const [key, cfg] of Object.entries(EXAMS)) {
    const labels = cfg.tokens.map(t => normalize(t).replace(/\s+/g, ''));
    for (const tok of tokens) {
      const tt = tok.replace(/\s+/g, '');
      if (tt.length >= 4 && startsAny(tt, labels)) return key;
    }
  }
  return null;
}

function detectIntent(raw) {
  const clean = normalize(raw);
  if (!clean) return { type: 'fallback' };

  /* Ordem de prioridade */
  if (hasAnyNormalized(clean, TRIGGERS.agendar)) return { type: 'agendar' };
  if (hasAnyNormalized(clean, TRIGGERS.local)) return { type: 'local' };
  if (hasAnyNormalized(clean, TRIGGERS.valores)) return { type: 'valores' };
  if (hasAnyNormalized(clean, TRIGGERS.pagamento)) return { type: 'pagamento' };
  if (hasAnyNormalized(clean, TRIGGERS.convenios)) return { type: 'convenios' };
  if (hasAnyNormalized(clean, TRIGGERS.resultados)) return { type: 'resultados' };
  if (hasAnyNormalized(clean, TRIGGERS.horarios)) return { type: 'horarios' };
  if (hasAnyNormalized(clean, TRIGGERS.estacionamento)) return { type: 'estacionamento' };
  if (clean.includes('quais') && (clean.includes('exame') || clean.includes('exames')))
    return { type: 'catalogo' };
  if (hasAnyNormalized(clean, TRIGGERS.preparo)) {
    const k = findExamKey(clean);
    if (k) return { type: 'preparo', exam: k };
    return { type: 'preparoGenerico' };
  }
  const examKey = findExamKey(clean);
  if (examKey) return { type: 'exame', exam: examKey };

  if (hasAnyNormalized(clean, TRIGGERS.seguranca)) return { type: 'seguranca' };
  if (hasAnyNormalized(clean, TRIGGERS.doppler)) return { type: 'doppler' };
  if (hasAnyNormalized(clean, TRIGGERS.gestacao)) return { type: 'obstetricIntro' };
  if (hasAnyNormalized(clean, TRIGGERS.bio)) return { type: 'bio' };

  if (hasAnyNormalized(clean, TRIGGERS.saudar) && clean.split(' ').length <= 4)
    return { type: 'saudar' };

  return { type: 'fallback' };
}

function respond(intent) {
  switch (intent.type) {
    case 'saudar':
      return MSGS.smallGreet;
    case 'agendar':
      return MSGS.agendar;
    case 'local':
      return MSGS.local;
    case 'valores':
      return MSGS.valores;
    case 'pagamento':
      return MSGS.pagamento;
    case 'convenios':
      return MSGS.convenios;
    case 'resultados':
      return MSGS.resultados;
    case 'horarios':
      return MSGS.horarios;
    case 'seguranca':
      return MSGS.seguranca;
    case 'doppler':
      return MSGS.doppler;
    case 'catalogo':
      return MSGS.catalogo;
    case 'obstetricIntro':
      return MSGS.obstetricIntro;
    case 'preparo':
      return EXAMS[intent.exam].prep;
    case 'preparoGenerico':
      return 'Diga o nome do exame e eu lhe passo o preparo certinho (ex.: abdome, rins, transvaginal, mamas).';
    case 'exame': {
      const e = EXAMS[intent.exam];
      const prep = e.prep ? `\nPreparo: ${e.prep}` : '';
      return `${e.info}${prep}`;
    }
    case 'bio':
      return MSGS.bio;
    case 'estacionamento':
      return MSGS.estacionamento;
    default:
      return MSGS.fallback;
  }
}

/* ---------- UI ---------- */
export default function ChatbotSimple() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ role: 'bot', content: MSGS.greet }]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  /* Scroll automático */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  /* Enviar mensagem */
  const sendMessage = useCallback(() => {
    const raw = (input || '').trim();
    if (!raw) return;
    setInput('');
    setMessages(m => [...m.slice(-49), { role: 'user', content: raw }]);
    setTyping(true);

    setTimeout(
      () => {
        let answer = MSGS.fallback;
        try {
          const intent = detectIntent(raw);
          answer = respond(intent);
        } catch (e) {
          console.error('Chatbot error:', e);
          answer =
            'Ops, não consegui processar agora. Tente novamente ou fale direto no WhatsApp (link abaixo).';
        }
        setMessages(m => [...m.slice(-49), { role: 'bot', content: answer }]);
        setTyping(false);
      },
      400 + Math.random() * 300
    );
  }, [input]);

  const onKeyDown = e => {
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
          <Avatar src="/assets/face.webp" size="md" bg="transparent" mb={1} name="Dr. Massuca" />
          <Text fontSize="11px" color="white" fontWeight="bold">
            CHAT
          </Text>
        </Button>
      </ScaleFade>

      {/* Janela */}
      <Fade in={isOpen}>
        <Box
          position="fixed"
          bottom="20px"
          right="20px"
          w={{ base: '95%', sm: '380px', md: '400px' }}
          maxW="400px"
          h="540px"
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
              <Avatar src="/assets/face.webp" size="sm" bg="transparent" name="Dr. Massuca" />
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

          {/* Mensagens */}
          <VStack
            flex={1}
            overflowY="auto"
            p={3}
            spacing={3}
            bg="gray.50"
            aria-live="polite"
            css={{
              '&::-webkit-scrollbar': { width: '6px' },
              '&::-webkit-scrollbar-track': { bg: 'gray.100' },
              '&::-webkit-scrollbar-thumb': { bg: 'gray.400', borderRadius: '3px' },
            }}
          >
            {messages.map((m, i) => (
              <Box key={i} alignSelf={m.role === 'user' ? 'flex-end' : 'flex-start'} maxW="85%">
                <Box
                  bg={m.role === 'user' ? '#0f3d2e' : 'white'}
                  color={m.role === 'user' ? 'white' : 'gray.800'}
                  p={3}
                  borderRadius="lg"
                  boxShadow="sm"
                  borderBottomLeftRadius={m.role === 'bot' ? '0' : 'lg'}
                  borderBottomRightRadius={m.role === 'user' ? '0' : 'lg'}
                >
                  <Text fontSize="sm" whiteSpace="pre-wrap">
                    {stripMarkdown(m.content)}
                  </Text>
                </Box>
              </Box>
            ))}

            {typing && (
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
            <div ref={endRef} />
          </VStack>

          {/* Input */}
          <HStack p={3} borderTop="1px" borderColor="gray.200" bg="white">
            <Input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder="Digite sua mensagem..."
              size="sm"
              borderRadius="full"
              focusBorderColor="#0f3d2e"
              disabled={typing}
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
              isLoading={typing}
              disabled={!input.trim() || typing}
              aria-label="Enviar mensagem"
            />
          </HStack>

          {/* CTA WhatsApp */}
          <Box p={2} bg="green.50" borderTop="1px" borderColor="green.200" textAlign="center">
            <Text fontSize="xs" color="green.700">
              Atendimento pelo{' '}
              <Button
                as="a"
                href={WHATS}
                target="_blank"
                rel="noopener noreferrer"
                size="xs"
                variant="link"
                color="green.600"
                fontWeight="bold"
              >
                {WHATS_TXT}
              </Button>
            </Text>
          </Box>
        </Box>
      </Fade>
    </>
  );
}
