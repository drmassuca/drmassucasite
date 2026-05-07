import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  VStack,
  Link,
  List,
  ListItem,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react';

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
            description: 'Política de Privacidade e LGPD do site drmassuca.com.br.',
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
            <Text>O controlador dos dados pessoais tratados por meio deste site é:</Text>
            <Box pl={4} borderLeft="3px solid" borderColor="green.400">
              <Text>
                <strong>Dr. Antonio Massucatti Neto</strong>
              </Text>
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
              2. Camadas do serviço e dados coletados
            </Heading>
            <Text>O site oferece diferentes camadas de serviço, com tratamentos distintos:</Text>
            <List spacing={3} pl={6} as="ul">
              <ListItem>
                <strong>Site público</strong> (informações sobre a clínica, exames, FAQ, IA Médica):
                não exige cadastro. Coletamos apenas dados de navegação anônimos via cookies
                analíticos e mensagens trocadas voluntariamente em chatbot ou WhatsApp.
              </ListItem>
              <ListItem>
                <strong>Memo3D</strong> (galeria privada da gestante): exige login e tem{' '}
                <strong>termo de uso e consentimento próprio</strong>, apresentado à paciente no
                primeiro acesso ou sempre que o termo for atualizado. Esse termo cobre detalhes
                específicos sobre armazenamento de mídias, recursos de inteligência artificial e
                subprocessadores envolvidos.
              </ListItem>
              <ListItem>
                <strong>Assistente virtual (chatbot)</strong>: as perguntas digitadas são enviadas à
                API do Google Gemini para geração de respostas. Não são armazenadas pelo site, mas
                são processadas nos servidores do Google conforme a{' '}
                <Link href="https://policies.google.com/privacy" isExternal color="green.600">
                  Política de Privacidade do Google
                </Link>
                . Recomendamos não inserir dados pessoais sensíveis no chatbot.
              </ListItem>
              <ListItem>
                <strong>Contato via WhatsApp</strong>: dados clínicos compartilhados voluntariamente
                (nome, telefone, informações médicas) são tratados com confidencialidade e
                utilizados exclusivamente para fins de agendamento e atendimento médico.
              </ListItem>
            </List>

            {/* ── 3. Cookies ──────────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              3. Cookies e tecnologias de rastreamento
            </Heading>
            <Text>
              Na primeira visita, um banner solicita seu consentimento para ativação de cookies.
              Você pode aceitar ou recusar. Caso recuse, nenhum cookie analítico será ativado.
            </Text>
            <List spacing={2} pl={6} as="ul">
              <ListItem>
                <strong>Google Analytics 4 (GA4):</strong> coleta dados anônimos de navegação
                (páginas visitadas, origem do tráfego, dispositivo, profundidade de rolagem) e{' '}
                <strong>eventos de conversão</strong> (cliques em WhatsApp, envios de formulário,
                interações com áreas-chave). Não identifica pessoalmente o visitante.
              </ListItem>
              <ListItem>
                <strong>Google Tag Manager (GTM):</strong> orquestra a execução das tags de GA4 e
                eventos de conversão. Não coleta dados por si só.
              </ListItem>
              <ListItem>
                <strong>Cookie de consentimento:</strong> armazena sua escolha (aceitar/recusar) por
                180 dias para não exibir o banner novamente.
              </ListItem>
            </List>

            {/* ── 4. Subprocessadores ─────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              4. Subprocessadores e infraestrutura
            </Heading>
            <Text>
              Para entregar os serviços do site público e do Memo3D, utilizamos os seguintes
              prestadores. Transferências internacionais ocorrem sob garantias contratuais (Standard
              Contractual Clauses ou equivalente):
            </Text>
            <TableContainer w="100%">
              <Table variant="simple" size="sm">
                <Thead>
                  <Tr>
                    <Th>Subprocessador</Th>
                    <Th>Finalidade</Th>
                    <Th>Localização</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>
                      <strong>Google LLC</strong>
                    </Td>
                    <Td>Analytics (GA4, GTM) e IA conversacional (Gemini no chatbot)</Td>
                    <Td>EUA</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <strong>Cloudflare, Inc.</strong>
                    </Td>
                    <Td>Armazenamento e streaming de mídias do Memo3D (R2 e Stream)</Td>
                    <Td>EUA</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <strong>xAI Corp.</strong>
                    </Td>
                    <Td>Processamento de imagens por inteligência artificial (Memo3D)</Td>
                    <Td>EUA</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <strong>Supabase Inc.</strong>
                    </Td>
                    <Td>Banco de dados e autenticação (Memo3D)</Td>
                    <Td>São Paulo, Brasil</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <strong>Vercel Inc.</strong>
                    </Td>
                    <Td>Hospedagem e execução do site</Td>
                    <Td>EUA</Td>
                  </Tr>
                  <Tr>
                    <Td>
                      <strong>Xdiag Tecnologias Ltda.</strong>
                    </Td>
                    <Td>Desenvolvimento, manutenção e operação técnica</Td>
                    <Td>Brasil</Td>
                  </Tr>
                </Tbody>
              </Table>
            </TableContainer>
            <Text>
              Não comercializamos, alugamos ou cedemos dados pessoais para fins publicitários ou de
              marketing. Este site não exibe anúncios.
            </Text>

            {/* ── 5. Armazenamento ────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              5. Armazenamento e segurança
            </Heading>
            <Text>
              Os dados de navegação anônimos do site público (analytics) são processados e
              armazenados pelo Google em seus servidores, conforme suas políticas de retenção. As
              mídias e dados de autenticação do Memo3D ficam em servidores Cloudflare e Supabase,
              com criptografia em trânsito (TLS) e em repouso. Dados de atendimento via WhatsApp são
              mantidos pelo tempo necessário à finalidade clínica e em conformidade com a legislação
              vigente.
            </Text>
            <Text>
              Adotamos medidas técnicas e organizacionais para proteger as informações contra acesso
              não autorizado: conexão criptografada via HTTPS, autenticação por senha forte na área
              da paciente, controle de acesso ao painel administrativo, registro de auditoria de
              eventos relevantes e boas práticas de desenvolvimento seguro.
            </Text>

            {/* ── 6. Direitos do titular ──────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              6. Seus direitos como titular de dados
            </Heading>
            <Text>Em conformidade com os artigos 17 a 22 da LGPD, você tem direito a:</Text>
            <List spacing={2} pl={6} as="ul">
              <ListItem>Confirmação da existência de tratamento de seus dados;</ListItem>
              <ListItem>Acesso aos dados pessoais que possuímos sobre você;</ListItem>
              <ListItem>Correção de dados incompletos, inexatos ou desatualizados;</ListItem>
              <ListItem>
                Anonimização, bloqueio ou eliminação de dados desnecessários ou excessivos;
              </ListItem>
              <ListItem>Portabilidade dos dados a outro prestador de serviço;</ListItem>
              <ListItem>Eliminação dos dados pessoais tratados com seu consentimento;</ListItem>
              <ListItem>
                Informação sobre entidades com as quais seus dados foram compartilhados;
              </ListItem>
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
              Este site não coleta intencionalmente dados de menores de 18 anos. O Memo3D é
              utilizado pela gestante adulta titular dos exames; eventuais imagens fetais ali
              hospedadas são tratadas conforme o termo de consentimento específico. Caso um
              responsável legal identifique que dados de um menor foram compartilhados sem
              consentimento, deve entrar em contato para que sejam eliminados.
            </Text>

            {/* ── 8. Alterações ───────────────────────────── */}
            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              8. Alterações nesta política
            </Heading>
            <Text>
              Esta política poderá ser atualizada a qualquer momento para refletir melhorias nas
              práticas de privacidade ou adequações legais. Recomendamos consulta periódica. A data
              da última atualização estará sempre indicada abaixo.
            </Text>

            {/* ── Data ────────────────────────────────────── */}
            <Box w="100%" pt={4} mt={2} borderTop="1px solid" borderColor="gray.200">
              <Text fontSize="sm" color="gray.500">
                Última atualização: <strong>7 de maio de 2026.</strong>
              </Text>
            </Box>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
