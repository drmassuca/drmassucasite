import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import { Box, Heading, Text, VStack, Link, List, ListItem } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Política de Privacidade – Dr. Massuca"
        description="Política de Privacidade e LGPD do site drmassuca.com.br — saiba como tratamos seus dados pessoais, cookies e tecnologias utilizadas."
        canonical="/privacy-policy"
      />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Política de Privacidade',
            url: 'https://drmassuca.com.br/privacy-policy',
            description:
              'Política de Privacidade e LGPD do site drmassuca.com.br.',
            publisher: {
              '@type': 'Organization',
              name: 'Xdiag Tecnologias Ltda.',
              url: 'https://xdiag.com.br',
            },
          })}
        </script>
      </Helmet>

      <Box maxW="900px" mx="auto" px={4} py={{ base: 8, md: 12 }}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <VStack spacing={6} align="start">
            <Heading as="h1" size="xl" textShadow="1px 1px 2px rgba(0, 0, 0, 0.2)">
              Política de Privacidade e LGPD
            </Heading>

            <Text>
              Esta Política de Privacidade descreve como as informações pessoais são coletadas,
              utilizadas, armazenadas e protegidas no site{' '}
              <Link href="https://drmassuca.com.br" color="green.600" fontWeight="bold">
                drmassuca.com.br
              </Link>
              , em conformidade com a Lei Geral de Proteção de Dados Pessoais (Lei nº 13.709/2018 —
              LGPD) e demais normas aplicáveis.
            </Text>

            {/* ── 1. Controlador ──────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              1. Controlador dos dados
            </Heading>
            <Text>
              O controlador dos dados pessoais tratados por meio deste site é:
            </Text>
            <Box pl={4} borderLeft="3px solid" borderColor="green.400">
              <Text><strong>Dr. Antonio Massucatti Neto</strong></Text>
              <Text>CRM-GO 17475</Text>
              <Text>Rua 19, Qd. 33, Lt. 01 – Vila Leonor, Itaberaí – GO, CEP 76630-000</Text>
              <Text>
                E-mail:{' '}
                <Link href="mailto:drmassucatti@gmail.com" color="green.600">
                  drmassucatti@gmail.com
                </Link>
              </Text>
              <Text>
                WhatsApp:{' '}
                <Link href="https://wa.me/5562996602117" isExternal color="green.600">
                  (62) 99660-2117
                </Link>
              </Text>
            </Box>
            <Text>
              O desenvolvimento e a manutenção tecnológica do site são realizados pela{' '}
              <Link href="https://xdiag.com.br" isExternal color="green.600" fontWeight="bold">
                Xdiag Tecnologias Ltda.
              </Link>
              , que atua como operadora de dados nos termos da LGPD.
            </Text>

            {/* ── 2. Dados coletados ──────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              2. Dados coletados e finalidades
            </Heading>
            <Text>
              O site não exige cadastro nem coleta dados pessoais de forma automática. As informações
              tratadas se limitam a:
            </Text>
            <List spacing={2} pl={6} as="ul">
              <ListItem>
                <strong>Dados de navegação anônimos:</strong> páginas visitadas, tempo de permanência,
                cliques e rolagem de tela, coletados via cookies analíticos exclusivamente para melhoria
                da experiência do usuário.
              </ListItem>
              <ListItem>
                <strong>Mensagens no assistente virtual (chatbot):</strong> as perguntas digitadas no
                chatbot do site são enviadas à API do Google Gemini para geração de respostas. Essas
                mensagens não são armazenadas pelo site, porém são processadas nos servidores do Google
                conforme a{' '}
                <Link
                  href="https://policies.google.com/privacy"
                  isExternal
                  color="green.600"
                >
                  Política de Privacidade do Google
                </Link>
                . Recomendamos que você não insira dados pessoais sensíveis no chatbot.
              </ListItem>
              <ListItem>
                <strong>Contato via WhatsApp:</strong> dados compartilhados voluntariamente durante
                conversas pelo WhatsApp (nome, telefone, informações clínicas) são tratados com
                confidencialidade e utilizados exclusivamente para fins de agendamento e atendimento
                médico.
              </ListItem>
            </List>

            {/* ── 3. Cookies ──────────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              3. Cookies e tecnologias de rastreamento
            </Heading>
            <Text>
              Na primeira visita, um banner solicita seu consentimento para ativação de cookies. Você
              pode aceitar ou recusar. Caso recuse, nenhum cookie analítico será ativado.
            </Text>
            <List spacing={2} pl={6} as="ul">
              <ListItem>
                <strong>Google Analytics (GA4):</strong> coleta dados anônimos de navegação (páginas
                visitadas, origem do acesso, dispositivo utilizado). Não identifica pessoalmente o
                visitante.
              </ListItem>
              <ListItem>
                <strong>Google Tag Manager (GTM):</strong> gerencia a ativação dos scripts de
                analytics. Não coleta dados por si só.
              </ListItem>
              <ListItem>
                <strong>Métricas de engajamento:</strong> o site registra anonimamente eventos como
                profundidade de rolagem, cliques em botões e tempo de permanência para otimização de
                conteúdo. Esses dados não identificam o visitante.
              </ListItem>
              <ListItem>
                <strong>Cookie de consentimento:</strong> armazena sua escolha (aceitar/recusar) por
                180 dias para não exibir o banner novamente.
              </ListItem>
            </List>

            {/* ── 4. Compartilhamento ─────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              4. Compartilhamento de dados com terceiros
            </Heading>
            <Text>
              Os dados de navegação anônimos podem ser compartilhados com os seguintes prestadores de
              serviço, exclusivamente para as finalidades descritas:
            </Text>
            <List spacing={2} pl={6} as="ul">
              <ListItem>
                <strong>Google LLC</strong> — analytics (GA4, GTM) e processamento de linguagem natural
                (Gemini AI no chatbot).
              </ListItem>
              <ListItem>
                <strong>Xdiag Tecnologias Ltda.</strong> — desenvolvimento, hospedagem e manutenção
                técnica do site.
              </ListItem>
            </List>
            <Text>
              Não comercializamos, alugamos ou compartilhamos dados pessoais com terceiros para fins
              de marketing ou publicidade. Este site não exibe anúncios.
            </Text>

            {/* ── 5. Armazenamento ────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              5. Armazenamento e segurança
            </Heading>
            <Text>
              O site não mantém banco de dados com informações pessoais de visitantes. Os dados de
              analytics são processados e armazenados pelo Google em seus servidores, conforme suas
              políticas de retenção. Dados de atendimento via WhatsApp são mantidos pelo tempo
              necessário à finalidade clínica e em conformidade com a legislação vigente.
            </Text>
            <Text>
              Adotamos medidas técnicas e organizacionais para proteger as informações contra acesso
              não autorizado, incluindo: conexão criptografada via HTTPS, controle de acesso ao painel
              administrativo e boas práticas de desenvolvimento seguro.
            </Text>

            {/* ── 6. Direitos do titular ──────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              6. Seus direitos como titular de dados
            </Heading>
            <Text>
              Em conformidade com os artigos 17 a 22 da LGPD, você tem direito a:
            </Text>
            <List spacing={2} pl={6} as="ul">
              <ListItem>Confirmação da existência de tratamento de seus dados;</ListItem>
              <ListItem>Acesso aos dados pessoais que possuímos sobre você;</ListItem>
              <ListItem>Correção de dados incompletos, inexatos ou desatualizados;</ListItem>
              <ListItem>Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;</ListItem>
              <ListItem>Portabilidade dos dados a outro prestador de serviço;</ListItem>
              <ListItem>Eliminação dos dados pessoais tratados com seu consentimento;</ListItem>
              <ListItem>Informação sobre entidades com as quais seus dados foram compartilhados;</ListItem>
              <ListItem>Revogação do consentimento a qualquer momento.</ListItem>
            </List>
            <Text>
              Para exercer qualquer desses direitos, entre em contato pelo e-mail{' '}
              <Link href="mailto:drmassucatti@gmail.com" color="green.600">
                drmassucatti@gmail.com
              </Link>{' '}
              ou pelo WhatsApp{' '}
              <Link href="https://wa.me/5562996602117" isExternal color="green.600">
                (62) 99660-2117
              </Link>
              . Responderemos em até 15 dias úteis.
            </Text>

            {/* ── 7. Menores ──────────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              7. Crianças e adolescentes
            </Heading>
            <Text>
              Este site não coleta intencionalmente dados de menores de 18 anos. Caso um responsável
              legal identifique que dados de um menor foram compartilhados sem consentimento, deve
              entrar em contato para que sejam eliminados.
            </Text>

            {/* ── 8. Alterações ───────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              8. Alterações nesta política
            </Heading>
            <Text>
              Esta política poderá ser atualizada a qualquer momento para refletir melhorias nas
              práticas de privacidade ou adequações legais. Recomendamos que o usuário consulte esta
              página periodicamente. A data da última atualização estará sempre indicada abaixo.
            </Text>

            {/* ── Data ────────────────────────────────────── */}
            <Box
              w="100%"
              pt={4}
              mt={2}
              borderTop="1px solid"
              borderColor="gray.200"
            >
              <Text fontSize="sm" color="gray.500">
                Última atualização: Fevereiro de 2026.
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
