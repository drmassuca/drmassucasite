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

function MorfologicoSegundoTrimestre() {
  const whatsappLink = 'https://wa.me/5562996602117';
  const canonical = '/exames/morfologico-segundo-trimestre';

  /* ➜ SEO */
  const title = 'Morfológico 2º Trimestre – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom morfológico do segundo trimestre avalia anatomia fetal e crescimento entre 20–24 semanas em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'Crânio e encéfalo: formato, suturas, plexos, cerebelo',
    'Face fetal: nariz, lábios, perfil',
    'Coração: quatro câmaras, grandes vasos, ritmo e Doppler (quando necessário)',
    'Coluna vertebral e diafragma',
    'Estômago, rins, bexiga e parede abdominal',
    'Cordão umbilical e sua inserção',
    'Placenta, líquido amniótico e localização',
    'Membros: braços, pernas, mãos e pés — contagem, forma e movimento',
    'Biometrias: BPD, CC, CA, FL e DL',
  ];

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
            name: 'Ultrassom Morfológico do Segundo Trimestre',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/morfologico.webp',
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
            Ultrassom Morfológico – 2º Trimestre
          </Heading>

          <Image
            src="/img-exams-webp/morfologico.webp"
            alt="Ultrassom Morfológico do Segundo Trimestre"
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
                Objetivo do exame
              </Heading>
              <Text fontSize="lg">
                Avaliar minuciosamente a formação anatômica do bebê, identificar malformações,
                monitorar o crescimento fetal, posição placentária e volume de líquido amniótico.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Período ideal
              </Heading>
              <Text fontSize="lg">
                Entre <strong>20 e 24 semanas</strong>, preferencialmente na 22ª ou 23ª semana.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">
                Não exige preparo especial. Pode ser realizado com bexiga vazia. Venha com roupas
                confortáveis e alimentada.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração média
              </Heading>
              <Text fontSize="lg">
                Cerca de <strong>30 a 50 minutos</strong>, podendo ser maior caso o bebê esteja em
                posição desfavorável ou haja necessidade de Doppler.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é avaliado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                {avaliacoes.map((item, idx) => (
                  <ListItem key={idx}>• {item}</ListItem>
                ))}
              </List>
            </Box>
          </VStack>

          {/* ── Orientações e diferenciais ────────────────────────── */}
          <Box mt={8}>
            <Heading as="h2" fontSize="2xl" mb={3}>
              Como funciona o exame com o Dr. Massuca
            </Heading>
            <Text fontSize="lg" mb={4}>
              O morfológico é um dos exames mais importantes da gestação. Seguimos o protocolo da
              ISUOG (International Society of Ultrasound in Obstetrics and Gynecology), que define
              quais estruturas devem ser avaliadas em cada fase. Isso não significa que seja
              possível visualizar absolutamente tudo — significa que o exame segue os critérios
              internacionais de rastreamento. Para garantir a máxima precisão, a clínica segue um
              protocolo rigoroso. Entenda o porquê de cada orientação:
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              🎥 Filmagem e registro de imagens
            </Heading>
            <Text fontSize="lg">
              Durante o exame, o Dr. Massuca precisa de concentração total para identificar detalhes
              milimétricos. Por isso, não é permitido filmar com celular durante a avaliação. Se
              você deseja imagens 3D (baby face) ou vídeos do bebê, avise a secretária na recepção e
              solicite ao médico durante o exame. Quando as condições técnicas permitem, o Dr.
              Massuca registra pelo próprio sistema do aparelho — com qualidade muito superior à de
              um celular.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              👶 Acompanhantes e crianças
            </Heading>
            <Text fontSize="lg">
              Para manter o ambiente silencioso e focado no diagnóstico, não é permitida a entrada
              de crianças na sala de exame. Caso precise trazer seu filho(a), peça para um
              acompanhante aguardar com ele na recepção. Essa orientação existe para proteger a
              qualidade da avaliação do seu bebê.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              ⏰ Pontualidade
            </Heading>
            <Text fontSize="lg">
              Cada morfológico pode durar de 30 a 50 minutos e pode se prolongar dependendo das
              condições encontradas. A agenda é organizada para que cada gestante receba atenção
              exclusiva — por isso, não há tolerância para atrasos. Pedimos que chegue no horário
              agendado. Caso precise reagendar, entre em contato pelo WhatsApp com pelo menos um dia
              de antecedência; remarcações no mesmo dia não são possíveis.
            </Text>
          </Box>

          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              🖼️ Ultrassom 3D — um bônus, não um produto
            </Heading>
            <Text fontSize="lg">
              O objetivo do morfológico é avaliar a saúde do bebê. As imagens 3D (baby face) e
              vídeos são uma cortesia — sem custo adicional — mas dependem de diversos fatores
              técnicos: posição fetal, posição da placenta, qualidade da janela acústica, atenuação
              do feixe sonoro, cirurgias abdominais anteriores e idade gestacional. Nem sempre é
              possível obtê-las, mesmo com o bebê em boa posição.
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

          <Box
            bg="green.50"
            p={5}
            borderRadius="md"
            borderLeft="4px solid"
            borderColor="green.600"
            mt={4}
          >
            <Text fontSize="lg" fontWeight="medium" textAlign="center">
              Todas essas orientações existem por um único motivo: garantir que, ao final do exame,
              você saia com a certeza de que a saúde do seu bebê foi avaliada com o máximo de
              precisão. É esse compromisso que faz do Dr. Massuca referência em ultrassonografia há
              mais de 20 anos.
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
}

export default MorfologicoSegundoTrimestre;
