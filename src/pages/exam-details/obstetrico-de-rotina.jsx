import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import {
  Box,
  Heading,
  Text,
  Button,
  VStack,
  HStack,
  Image,
  List,
  ListItem,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const ObstetricoDeRotina = () => {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/obstetrico-de-rotina';

  /* ➜ SEO */
  const title = 'Obstétrico de Rotina – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom obstétrico de rotina avalia crescimento fetal, bem-estar e posição da placenta. Exame em Itaberaí-GO com o Dr. Massuca.';

  return (
    <>
      {/* SEO base */}
      <SEO title={title} description={description} canonical={canonical} />

      {/* Schema.org – MedicalTest */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Obstétrico de Rotina',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/obstetrico.webp',
            about: {
              '@type': 'Person',
              name: 'Dr. Antonio Massucatti Neto',
              medicalSpecialty: 'Ultrassom',
            },
          })}
        </script>
      </Helmet>

      {/* Conteúdo -------------------------------------------------------------- */}
      <Box maxW="900px" mx="auto" px={4} py={10}>
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl' }}
            textAlign="center"
            mb={6}
            textShadow="1px 1px 2px rgba(0,0,0,0.2)"
          >
            Obstétrico de Rotina
          </Heading>

          <Image
            src="/img-exams-webp/obstetrico.webp"
            alt="Ultrassom Obstétrico de Rotina"
            borderRadius="md"
            objectFit="contain"
            objectPosition="center"
            w="100%"
            h={{ base: '200px', md: '300px' }}
            mb={8}
            bg="white"
            loading="lazy"
          />

          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Objetivos do exame
              </Heading>
              <Text fontSize="lg">
                • Avaliar crescimento fetal (biometrias CC, CA, CF) e estimar peso.
                <br />
                • Monitorar bem-estar: batimentos cardíacos, movimentação e posição fetal.
                <br />
                • Avaliar localização e maturidade da placenta, além do volume de líquido amniótico.
                <br />• Verificar inserção e número de vasos do cordão umbilical.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Períodos recomendados
              </Heading>
              <Text fontSize="lg">
                Ideal entre <strong>15 – 19 semanas</strong> e novamente entre{' '}
                <strong>26 – 40 semanas</strong>, conforme orientação pré-natal.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Biometria fetal:</strong> cabeça, abdome e fêmur.
                </ListItem>
                <ListItem>
                  <strong>Morfologia básica:</strong> crânio, coluna, tórax, abdome, membros e face.
                </ListItem>
                <ListItem>
                  <strong>Placenta:</strong> posição, maturidade, inserção do cordão.
                </ListItem>
                <ListItem>
                  <strong>Líquido amniótico:</strong> avaliação de oligo ou polidrâmnio.
                </ListItem>
                <ListItem>
                  <strong>Cordão umbilical:</strong> número de vasos e fluxo quando indicado.
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">Não exige preparo específico.</Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração aproximada
              </Heading>
              <Text fontSize="lg">
                Geralmente entre <strong>20 – 40 minutos</strong>.
              </Text>
            </Box>
          </VStack>

          {/* ── Orientações e diferenciais ────────────────────────── */}
          <Box mt={8}>
            <Heading as="h2" fontSize="2xl" mb={3}>
              Como funciona o exame com o Dr. Massuca
            </Heading>
            <Text fontSize="lg" mb={4}>
              Mesmo sendo um exame de acompanhamento, o obstétrico de rotina exige atenção a
              detalhes importantes como crescimento fetal, placenta e líquido amniótico. Para
              garantir a melhor avaliação, a clínica segue algumas orientações:
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              🎥 Filmagem e registro de imagens
            </Heading>
            <Text fontSize="lg">
              Não é permitido filmar com celular durante a avaliação para não interferir na
              concentração do médico. Se você deseja imagens 3D (baby face) ou vídeos do bebê, avise
              a secretária na recepção e solicite ao médico durante o exame. Quando as condições
              técnicas permitem, o Dr. Massuca registra pelo próprio sistema do aparelho — com
              qualidade muito superior à de um celular.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              👶 Acompanhantes e crianças
            </Heading>
            <Text fontSize="lg">
              Para manter o ambiente silencioso e focado no diagnóstico, não é permitida a entrada
              de crianças na sala de exame. Caso precise trazer seu filho(a), peça para um
              acompanhante aguardar com ele na recepção.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              ⏰ Pontualidade
            </Heading>
            <Text fontSize="lg">
              A agenda é organizada para que cada gestante receba atenção exclusiva — por isso, não
              há tolerância para atrasos. Pedimos que chegue no horário agendado. Caso precise
              reagendar, entre em contato pelo WhatsApp com pelo menos um dia de antecedência;
              remarcações no mesmo dia não são possíveis.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              🎉 Revelação de sexo
            </Heading>
            <Text fontSize="lg">
              Planejando um chá revelação? Avise a secretária na recepção antes do exame. Durante a
              avaliação, o Dr. Massuca toma todos os cuidados para não revelar o sexo. A informação
              do sexo constará no resultado do exame, para que você mostre apenas a quem desejar e
              mantenha a surpresa intacta para a sua festa.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              🖼️ Imagens 3D — um bônus, não um produto
            </Heading>
            <Text fontSize="lg">
              As imagens 3D (baby face) e vídeos são uma cortesia — sem custo adicional — mas
              dependem de diversos fatores técnicos: posição fetal, posição da placenta, qualidade
              da janela acústica, atenuação do feixe sonoro, cirurgias abdominais anteriores e idade
              gestacional. Nem sempre é possível obtê-las, mesmo com o bebê em boa posição.
            </Text>
          </Box>

          <Box
            bg="green.50"
            p={5}
            borderRadius="md"
            borderLeft="4px solid"
            borderColor="green.600"
            mt={4}
          >
            <Text fontSize="lg" fontWeight="medium" textAlign="center">
              Todas essas orientações existem por um único motivo: garantir que o acompanhamento do
              seu bebê seja feito com o máximo de precisão. É esse compromisso que faz do Dr.
              Massuca referência em ultrassonografia há mais de 20 anos.
            </Text>
          </Box>

          {/* Botões -------------------------------------------------------------- */}
          <HStack justify="center" spacing={4} mt={10}>
            <Button
              as="a"
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              colorScheme="green"
            >
              Agendar exame
            </Button>
            <Button as={RouterLink} to="/exames" variant="outline" colorScheme="gray">
              Voltar aos exames
            </Button>
          </HStack>
        </Box>
      </Box>
    </>
  );
};

export default ObstetricoDeRotina;
