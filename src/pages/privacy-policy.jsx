import SEO from '../components/SEO';
import { Box, Heading, Text, VStack } from '@chakra-ui/react';

const PrivacyPolicy = () => {
  return (
    <>
      <SEO
        title="Política de Privacidade – Dr. Massuca"
        description="Saiba como tratamos seus dados pessoais e cookies em conformidade com a LGPD no site drmassuca.com.br."
        canonical="https://www.drmassuca.com.br/politica-de-privacidade"
      />
      <Box maxW="900px" mx="auto" px={4} py={{ base: 8, md: 12 }}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <VStack spacing={6} align="start">
            <Heading as="h1" size="xl" textShadow="1px 1px 2px rgba(0, 0, 0, 0.2)">
              Política de Privacidade e LGPD
            </Heading>

            <Text>
              Esta Política de Privacidade descreve como as informações pessoais são tratadas no
              site drmassuca.com.br, de responsabilidade do Dr. Antonio Massucatti Neto – CRM GO
              17475.
            </Text>

            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              1. Coleta e uso de cookies
            </Heading>
            <Text>
              Utilizamos cookies analíticos do Google Analytics para coletar informações anônimas de
              navegação, ajudando-nos a entender como os visitantes usam o site e a melhorar a
              experiência do usuário. Esses cookies não rastreiam dados pessoais e só são ativados
              após o seu consentimento explícito por meio do banner exibido na primeira visita.
            </Text>

            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              2. Dados pessoais e contato
            </Heading>
            <Text>
              Este site não armazena dados pessoais automaticamente. Caso algum dado pessoal seja
              compartilhado voluntariamente durante o atendimento via WhatsApp, ele será tratado com
              confidencialidade e segurança.
            </Text>

            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              3. Responsável pelo tratamento de dados
            </Heading>
            <Text>
              Em conformidade com a Lei Geral de Proteção de Dados (Lei 13.709/2018), o responsável
              pelo tratamento de quaisquer dados eventualmente coletados ou recebidos por meio de
              contato é:
              <br />
              <strong>Dr. Antonio Massucatti Neto – CRM GO 17475</strong>
            </Text>

            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              4. Direitos do titular
            </Heading>
            <Text>
              O titular tem direito de solicitar a exclusão, correção ou acesso aos seus dados
              pessoais, conforme previsto na LGPD, especialmente em comunicações realizadas via
              WhatsApp.
            </Text>

            <Heading as="h2" size="md" textShadow="1px 1px 1px rgba(0, 0, 0, 0.1)">
              5. Alterações nesta política
            </Heading>
            <Text>
              Esta política poderá ser atualizada a qualquer momento, visando o aprimoramento das
              práticas de privacidade. Recomendamos que o usuário consulte esta página
              periodicamente.
            </Text>

            <Text>Última atualização: Julho de 2025.</Text>
          </VStack>
        </Box>
      </Box>
    </>
  );
};

export default PrivacyPolicy;
