import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  VStack,
  List,
  ListItem,
  ListIcon,
  Button,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from '@chakra-ui/react';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';
import { useScrollToTop } from '../utils/useScrollToTop';

/**
 * Página "Área do Paciente"
 * ➜ Padronizada para Ultrassom + SEO + FAQPage schema + links seguros.
 */
function PatientArea() {
  // Hook para garantir scroll to top
  useScrollToTop();

  /* FAQ para gerar JSON-LD --------------------------- */
  const faqs = [
    {
      q: 'O exame de ultrassom dói?',
      a: 'Não. É um exame indolor, seguro e não invasivo.',
    },
    {
      q: 'Quanto tempo dura o exame?',
      a: 'De 10 minutos a 1 hora, dependendo do tipo, da complexidade e da colaboração do paciente.',
    },
    {
      q: 'Posso fazer ultrassom grávida?',
      a: 'Sim. Ultrassom é 100 % seguro durante toda a gestação.',
    },
    {
      q: 'Quando fica pronto o resultado?',
      a: 'Na maioria dos casos, o laudo é entregue logo após o exame, salvo raras exceções que exigem análise complementar.',
    },
    {
      q: 'Posso confiar no que vai aparecer no ultrassom?',
      a: 'O ultrassom revela o que está presente e acessível à tecnologia. É um exame altamente confiável quando bem executado.',
    },
    {
      q: 'Se eu beber menos água, dá certo?',
      a: 'Não. Bexiga vazia prejudica a imagem e pode exigir repetição do exame.',
    },
    {
      q: 'Doutor, dá pra ver tudo no ultrassom?',
      a: 'O ultrassom mostra com precisão estruturas acessíveis às ondas sonoras, mas nem sempre substitui outros métodos de imagem.',
    },
    {
      q: 'E se eu esquecer o preparo?',
      a: 'O exame pode ser remarcado. O preparo adequado é fundamental para bons resultados.',
    },
  ];

  return (
    <>
      {/* ➜ SEO base */}
      <SEO
        title="Área do Paciente – Ultrassom | Dr. Massuca"
        description="Preparo, retirada de resultados e dúvidas frequentes sobre ultrassom em Itaberaí-GO."
        canonical="/area-do-paciente"
      />

      {/* ➜ Schema.org – FAQPage */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map(({ q, a }) => ({
              '@type': 'Question',
              name: q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: a,
              },
            })),
          })}
        </script>
      </Helmet>

      {/* Conteúdo ------------------------------------- */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box
          className="ed-materia"
          bg="white"
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          boxShadow="2xl"
        >
          {/* Título */}
          <Heading
            as="h1"
            size="lg"
            mb={6}
            textAlign="center"
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            👩‍⚕️ Área do Paciente
          </Heading>

          {/* Introdução */}
          <Text textAlign="center" mb={8} color="gray.700">
            Informações de preparo, retirada de resultados e respostas às dúvidas mais frequentes
            sobre seus exames de ultrassom — tudo de forma simples e objetiva.
          </Text>

          {/* Orientações Pré-Exame */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            🗒️ Orientações Pré-Exame
          </Heading>
          <List spacing={4} mb={10}>
            {[
              {
                name: 'Ultrassom Abdominal',
                info: 'Jejum de 8 h. Beber 1 L de água uma hora antes e não urinar.',
              },
              {
                name: 'Ultrassom Pélvico / Ginecológico',
                info: 'Bexiga cheia: beber 1 L de água uma hora antes e não urinar.',
              },
              {
                name: 'Ultrassom Obstétrico',
                info: 'Sem preparo específico; bexiga moderadamente cheia ajuda na fase inicial.',
              },
              {
                name: 'Ultrassom de Próstata (Via Abdominal)',
                info: 'Bexiga cheia: beber 1 L de água uma hora antes e não urinar.',
              },
              {
                name: 'Pesquisa de Endometriose Profunda',
                info: 'Preparo especial. Contate a clínica para instruções detalhadas.',
              },
              { name: 'Ecocardiografia Fetal', info: 'Sem preparo.' },
              { name: 'Ultrassom de Tireoide', info: 'Sem preparo.' },
              { name: 'Ultrassom de Mama', info: 'Sem preparo.' },
              { name: 'Ultrassom de Partes Moles', info: 'Sem preparo.' },
              {
                name: 'Ultrassom Transvaginal',
                info: 'Bexiga vazia durante o exame. Pode ser complementado com exame pélvico (bexiga cheia).',
              },
            ].map(({ name, info }) => (
              <ListItem key={name}>
                <ListIcon as={FaCheckCircle} color="green.600" />
                <Text as="span" fontWeight="bold">
                  {name}
                </Text>{' '}
                — {info}
              </ListItem>
            ))}
          </List>

          {/* Retirada dos Resultados */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            📄 Retirada dos Resultados
          </Heading>
          <VStack align="start" spacing={3} mb={10} color="gray.700">
            <Text>O laudo costuma ser entregue imediatamente após o exame.</Text>
            <Text>
              Em casos complexos ou achados incomuns, pode ser necessária análise complementar.
            </Text>
            <Text>Retirada presencial mediante documento de identidade.</Text>
            <Text>Terceiros podem retirar com autorização por escrito e documento oficial.</Text>
            <Text>
              Horário: <strong>Segunda – Sexta, 8h – 18h</strong>.
            </Text>
          </VStack>

          {/* Dúvidas Frequentes */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            ❓ Dúvidas Frequentes
          </Heading>
          <Accordion allowToggle mb={8}>
            {faqs.map(({ q, a }) => (
              <AccordionItem key={q} border="none">
                <h2>
                  <AccordionButton _expanded={{ bg: 'green.50' }}>
                    <Box flex="1" textAlign="left" fontWeight="medium">
                      {q}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4} fontSize="sm" color="gray.700">
                  {a}
                </AccordionPanel>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Canal Direto */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            📲 Fale Conosco
          </Heading>
          <Text mb={6} color="gray.700">
            Precisa remarcar ou esclarecer algo? Fale conosco pelo WhatsApp:
          </Text>
          <Box textAlign="center">
            <Button
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              bg="green.700"
              color="white"
              _hover={{ bg: 'green.800' }}
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 4 }}
              fontSize={{ base: 'sm', md: 'md' }}
              borderRadius="lg"
              minW={{ base: '220px', md: 'auto' }}
            >
              WhatsApp da Clínica
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default PatientArea;
