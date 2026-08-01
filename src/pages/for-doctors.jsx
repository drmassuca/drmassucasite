import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { Box, Heading, Text, VStack, List, ListItem, ListIcon, Button } from '@chakra-ui/react';
import { FaCheckCircle, FaWhatsapp } from 'react-icons/fa';

function ForDoctors() {
  return (
    <>
      {/* ➜ SEO base */}
      <SEO
        title="Para Médicos – Ultrassom | Dr. Massuca"
        description="Canal direto para médicos encaminharem pacientes para exames de ultrassom com laudos rápidos e precisos em Itaberaí-GO."
        canonical="/para-medicos"
      />

      {/* ➜ Schema.org – WebPage (Para Médicos) */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Para Médicos – Ultrassom | Dr. Massuca',
            url: 'https://drmassuca.com.br/para-medicos',
            description:
              'Canal direto para médicos encaminharem pacientes para exames de ultrassom com laudos rápidos e precisos em Itaberaí-GO.',
            breadcrumb: {
              '@type': 'BreadcrumbList',
              itemListElement: [
                {
                  '@type': 'ListItem',
                  position: 1,
                  name: 'Home',
                  item: 'https://drmassuca.com.br/',
                },
                {
                  '@type': 'ListItem',
                  position: 2,
                  name: 'Para Médicos',
                  item: 'https://drmassuca.com.br/para-medicos',
                },
              ],
            },
          })}
        </script>
      </Helmet>

      {/* Conteúdo */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box
          className="ed-materia"
          bg="white"
          borderRadius="xl"
          p={{ base: 6, md: 10 }}
          boxShadow="2xl"
        >
          <Heading
            as="h1"
            size="lg"
            mb={6}
            textAlign="center"
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            🤝 Para Médicos e Parceiros
          </Heading>

          <Text textAlign="center" mb={8} color="gray.700">
            Se você é médico(a) ou gestor(a) de clínica, aqui encontra um canal direto e sem
            burocracia para encaminhar pacientes para exames de <strong>ultrassom</strong>.
          </Text>

          <Text textAlign="center" mb={8} color="gray.700">
            Meu compromisso é entregar laudos claros, objetivos e tecnicamente precisos — exames que
            realmente fazem diferença na condução dos seus pacientes.
          </Text>

          {/* Como Encaminhar */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            🚩 Como Encaminhar Pacientes
          </Heading>
          <List spacing={3} mb={8}>
            {[
              'Entre em contato diretamente pelo WhatsApp da clínica.',
              'No início da conversa, apresente-se como médico(a).',
              'Informe o exame solicitado e, se desejar, a indicação clínica.',
              'A equipe faz o agendamento rapidamente — normalmente em até 2 horas.',
              'O laudo é entregue, na maioria dos casos, logo após o exame.',
            ].map(item => (
              <ListItem key={item}>
                <ListIcon as={FaCheckCircle} color="green.600" />
                {item}
              </ListItem>
            ))}
          </List>

          {/* Por que encaminhar */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            🎯 Por que encaminhar para mim
          </Heading>

          <VStack align="start" spacing={4} mb={8}>
            {[
              {
                title: '✅ Laudos rápidos e precisos',
                text: 'Tempo é fundamental para você e para seu paciente. Entrego laudos de alta qualidade, muitas vezes no mesmo dia.',
              },
              {
                title: '✅ Comunicação direta',
                text: 'Caso exista dúvida sobre achados ou conduta, você fala diretamente comigo — sem secretárias ou intermediários.',
              },
              {
                title: '✅ Ética acima de tudo',
                text: 'Compromisso absoluto com a verdade, a responsabilidade diagnóstica e o respeito à confiança de quem encaminha e de quem realiza o exame.',
              },
            ].map(({ title, text }) => (
              <Box key={title}>
                <Heading as="h3" size="sm" mb={1}>
                  {title}
                </Heading>
                <Text fontSize="sm">{text}</Text>
              </Box>
            ))}
          </VStack>

          {/* Canal Direto */}
          <Heading
            as="h2"
            size="md"
            mb={4}
            color="green.700"
            textShadow="1px 1px 1px rgba(0,0,0,0.4)"
          >
            📲 Canal Direto
          </Heading>
          <Text mb={6} color="gray.700">
            ✅ WhatsApp da Clínica
            <br />
            (Ao iniciar a conversa, identifique-se como médico(a).)
          </Text>

          <Box textAlign="center">
            <Button
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              display="inline-flex"
              bg="green.700"
              color="white"
              _hover={{ bg: 'green.800' }}
              px={{ base: 4, md: 6 }}
              py={{ base: 3, md: 4 }}
              fontSize={{ base: 'sm', md: 'md' }}
              borderRadius="lg"
              minW={{ base: '220px', md: 'auto' }}
            >
              Falar no WhatsApp da Clínica
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default ForDoctors;
