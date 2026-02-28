import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { Box, Heading, Text, VStack, List, ListItem } from '@chakra-ui/react';
import {
  ExamBreadcrumb,
  ExamImage,
  ExamFAQ,
  ExamRelated,
  ExamCTA,
  ExamCredentialBadge,
} from '../../components/exam';

const SLUG = 'morfologico-primeiro-trimestre';

const MorfologicoPrimeiroTrimestre = () => {
  const canonical = '/exames/morfologico-primeiro-trimestre';

  const title = 'Morfológico 1º Trimestre – Ultrassom – Dr. Massuca';
  const description =
    'Ultrassom morfológico do primeiro trimestre avalia anatomia fetal, translucência nucal e riscos genéticos precoces. Exame em Itaberaí-GO com Dr. Massuca.';

  const avaliacoes = [
    'CRL (Comprimento cabeça-nádega) para estimar a idade gestacional',
    'Crânio, cérebro, face e coluna vertebral',
    'Coração, estômago, rins, bexiga e cordão umbilical',
    'Membros superiores e inferiores — contagem e forma',
    'Translucência nucal, osso nasal e ducto venoso (rastreio genético)',
    'Doppler das artérias uterinas — risco de pré-eclâmpsia',
    'Placenta e líquido amniótico',
  ];

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Ultrassom Morfológico do Primeiro Trimestre',
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

      <Box maxW="900px" mx="auto" px={4} py={10}>
        <ExamBreadcrumb slug={SLUG} />
        <Box bg="white" borderRadius="xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            fontSize={{ base: '2xl', md: '4xl' }}
            textAlign="center"
            mb={6}
            textShadow="1px 1px 2px rgba(0,0,0,0.2)"
          >
            Ultrassom Morfológico – 1º Trimestre
          </Heading>

          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/morfologico.webp"
            alt="Ultrassom Morfológico do Primeiro Trimestre"
          />

          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é / Objetivo
              </Heading>
              <Text fontSize="lg">
                Exame realizado entre <strong>11 e 14 semanas</strong>, idealmente entre 12 e 13
                semanas, para avaliar a anatomia fetal inicial, medir a{' '}
                <strong>translucência nucal</strong> e rastrear precocemente síndromes genéticas e
                risco de <strong>pré-eclâmpsia</strong>.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Preparo
              </Heading>
              <Text fontSize="lg">Bexiga moderadamente cheia; jejum não é necessário.</Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Período ideal
              </Heading>
              <Text fontSize="lg">
                Entre <strong>11 + 0</strong> e <strong>13 + 6 semanas</strong> de gestação.
              </Text>
            </Box>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Duração estimada
              </Heading>
              <Text fontSize="lg">
                Aproximadamente <strong>20 a 40 minutos</strong>, podendo chegar a 1 h para análise
                Doppler detalhada.
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

          {/* ── Orientações ────────────────────────── */}
          <Box mt={8}>
            <Heading as="h2" fontSize="2xl" mb={3}>
              Como funciona o exame com o Dr. Massuca
            </Heading>
            <Text fontSize="lg" mb={4}>
              O morfológico do primeiro trimestre é uma avaliação precoce e delicada. Seguimos o
              protocolo da ISUOG (International Society of Ultrasound in Obstetrics and Gynecology),
              que define os marcadores de cromossomopatias e riscos a serem rastreados nesta fase —
              como a translucência nucal e o osso nasal. Isso não significa que seja possível
              visualizar absolutamente tudo, mas que o exame segue os critérios internacionais de
              rastreamento. Para garantir a precisão, a clínica segue um protocolo rigoroso. Entenda
              o porquê de cada orientação:
            </Text>
          </Box>
          <Box>
            <Heading as="h3" fontSize="xl" mb={2}>
              🎥 Filmagem e registro de imagens
            </Heading>
            <Text fontSize="lg">
              As medidas deste exame são milimétricas e qualquer distração pode comprometer o
              resultado. Por isso, não é permitido filmar com celular durante a avaliação. Se você
              deseja imagens ou vídeos do bebê, avise a secretária na recepção e solicite ao médico
              durante o exame. Quando as condições técnicas permitem, o Dr. Massuca registra pelo
              próprio sistema do aparelho — com qualidade superior à de um celular.
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
              Este exame pode durar de 20 a 40 minutos e pode se prolongar dependendo das condições
              encontradas. A agenda é organizada para que cada gestante receba atenção exclusiva —
              por isso, não há tolerância para atrasos. Pedimos que chegue no horário agendado. Caso
              precise reagendar, entre em contato pelo WhatsApp com pelo menos um dia de
              antecedência; remarcações no mesmo dia não são possíveis.
            </Text>
          </Box>

          <ExamCredentialBadge variant="obstetric" />
          <ExamFAQ slug={SLUG} />
          <ExamCTA slug={SLUG} />
          <ExamRelated slug={SLUG} />
        </Box>
      </Box>
    </>
  );
};

export default MorfologicoPrimeiroTrimestre;
