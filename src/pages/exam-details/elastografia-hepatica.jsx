import { Helmet } from 'react-helmet-async';
import SEO from '../../components/SEO';
import { Box, Heading, Text, VStack, List, ListItem, Image } from '@chakra-ui/react';
import {
  ExamBreadcrumb,
  ExamImage,
  ExamFAQ,
  ExamRelated,
  ExamCTA,
  ExamCredentialBadge,
} from '../../components/exam';

const SLUG = 'elastografia-hepatica';

const ElastografiaHepatica = () => {
  const canonical = '/exames/elastografia-hepatica';
  const title = 'Elastografia Hepática e Quantificação de Esteatose – Dr. Massuca';
  const description =
    'Avaliação não invasiva da rigidez hepática e da quantidade de gordura no fígado, com resultados objetivos e quantitativos. Itaberaí-GO.';

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Elastografia Hepática e Quantificação de Esteatose',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/elastografia-hepatica.webp',
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
            mb={3}

          >
            Elastografia Hepática e Quantificação de Esteatose
          </Heading>

          <Text
            textAlign="center"
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            mb={6}
            fontStyle="italic"
          >
            Avaliação não invasiva da rigidez hepática e da quantidade de gordura no fígado, com
            resultados objetivos e quantitativos.
          </Text>

          <ExamImage slug={SLUG} src="/img-exams-webp/elastografia-hepatica.webp" alt="Elastografia Hepática" />

          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é
              </Heading>
              <Text fontSize="lg">
                Exame de ultrassonografia avançada que combina duas medidas quantitativas do fígado:
                a rigidez hepática (que reflete a presença e o grau de fibrose) e a quantidade de
                gordura armazenada no parênquima hepático (esteatose). Os resultados saem em números
                objetivos, comparáveis ao longo do tempo, sem necessidade de biópsia.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Quando é indicado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  • Estadiamento de fibrose hepática em pacientes com diagnóstico etiológico já
                  definido (MASLD, hepatite C, hepatite B, doença hepática alcoólica, doenças
                  autoimunes, hemocromatose)
                </ListItem>
                <ListItem>
                  • Monitoramento de resposta ao tratamento (após cura da hepatite C, abstinência
                  alcoólica, perda de peso, terapia farmacológica para MASH como resmetirom ou
                  semaglutida)
                </ListItem>
                <ListItem>
                  • Avaliação inicial de paciente com alteração de transaminases ou achado
                  ultrassonográfico de esteatose
                </ListItem>
                <ListItem>
                  • Acompanhamento de pacientes em programa de obesidade ou diabetes com fator de
                  risco hepático
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que o exame fornece
              </Heading>
              <Text fontSize="lg" mb={3}>
                Resultados objetivos quantitativos:
              </Text>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  <strong>Rigidez hepática em kPa</strong>, classificada conforme a Regra dos 4 da
                  Society of Radiologists in Ultrasound (SRU): probabilidade de normalidade,
                  exclusão ou suspeita de doença hepática crônica avançada compensada (cACLD),
                  suspeita de hipertensão portal clinicamente significativa
                </ListItem>
                <ListItem>
                  <strong>Estágio histológico estimado METAVIR</strong> (F0 a F4), por
                  correspondência baseada em estudos de validação contra biópsia hepática
                </ListItem>
                <ListItem>
                  <strong>Quantificação de gordura hepática</strong> em percentual estimado (Fat
                  Fraction), validado contra ressonância magnética PDFF como padrão-ouro
                </ListItem>
                <ListItem>
                  <strong>Classificação de esteatose</strong> em graus S0, S1, S2 ou S3
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Como se preparar
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Jejum mínimo de 4 horas (água permitida)</ListItem>
                <ListItem>• Não consumir álcool nas 24 horas anteriores ao exame</ListItem>
                <ListItem>
                  • Trazer exames laboratoriais recentes (hemograma com plaquetas, AST, ALT, GGT,
                  fosfatase alcalina, bilirrubinas, INR, albumina)
                </ListItem>
                <ListItem>
                  • Trazer exames de imagem prévios do abdome ou fígado, se houver
                </ListItem>
                <ListItem>• Informar todas as medicações em uso</ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Como é feito
              </Heading>
              <Text fontSize="lg">
                Exame não invasivo, indolor, realizado em decúbito dorsal, com duração aproximada de
                20 a 30 minutos. Não há uso de contraste, radiação ou agulhas. Realizado por médico
                ultrassonografista com formação específica em elastografia.
              </Text>
            </Box>

            <Box w="full">
              <Heading as="h2" fontSize="2xl" mb={3}>
                Equipamento
              </Heading>
              <Box
                bg="rgba(212, 175, 55, 0.1)"
                border="1px solid rgba(212, 175, 55, 0.3)"
                borderRadius="lg"
                p={6}
                textAlign="center"
              >
                <Text
                  fontSize="xs"
                  color="brand.800"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  fontWeight="semibold"
                  mb={2}
                >
                  Aparelho premium
                </Text>
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="brand.900"
                  fontWeight="bold"
                  lineHeight="1"
                  mb={3}
                >
                  HERA Z20
                </Text>
                <Box display="flex" justifyContent="center" mb={4}>
                  <Image
                    src="/assets/samsung-wordmark.svg"
                    alt="Samsung"
                    height={{ base: '22px', md: '28px' }}
                    width="auto"
                    loading="lazy"
                  />
                </Box>
                <Text fontSize="md" color="gray.700">
                  Plataforma top de linha da Samsung para ultrassonografia hepática, com tecnologia
                  dedicada de elastografia ponto a ponto e quantificação de gordura (Fat Fraction)
                  no mesmo equipamento.
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Resultado e laudo
              </Heading>
              <Text fontSize="lg">
                Laudo entregue em até 3 dias úteis, com interpretação clínica e referências
                bibliográficas atualizadas. Disponível em formato digital (PDF) e impresso.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Para o médico solicitante
              </Heading>
              <Text fontSize="lg" mb={3}>
                Para que o laudo tenha máxima utilidade clínica, solicito que ao encaminhar o
                paciente sejam enviadas:
              </Text>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  • Hipótese diagnóstica e contexto clínico (etiologia presumida, comorbidades,
                  medicações em uso)
                </ListItem>
                <ListItem>• Exames laboratoriais recentes</ListItem>
                <ListItem>• Exames de imagem prévios, se houver</ListItem>
              </List>
            </Box>
          </VStack>

          <ExamCredentialBadge />
          <ExamFAQ slug={SLUG} />
          <ExamCTA slug={SLUG} ctaLabel="Agendar exame" />
          <ExamRelated slug={SLUG} />
        </Box>
      </Box>
    </>
  );
};

export default ElastografiaHepatica;
