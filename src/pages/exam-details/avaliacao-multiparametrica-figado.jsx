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

const SLUG = 'avaliacao-multiparametrica-figado';

const AvaliacaoMultiparametricaFigado = () => {
  const canonical = '/exames/avaliacao-multiparametrica-figado';
  const title = 'Avaliação Multiparamétrica do Fígado – Dr. Massuca';
  const description =
    'Exame hepático integrado e sofisticado, combinando múltiplas técnicas de ultrassonografia avançada com interpretação clínica direcionada. Itaberaí-GO.';

  return (
    <>
      <SEO title={title} description={description} canonical={canonical} />
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: 'Avaliação Multiparamétrica do Fígado',
            description,
            url: `https://drmassuca.com.br${canonical}`,
            image: 'https://drmassuca.com.br/img-exams-webp/superior.webp',
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
            textShadow="1px 1px 2px rgba(0,0,0,0.2)"
          >
            Avaliação Multiparamétrica do Fígado
          </Heading>

          <Text
            textAlign="center"
            fontSize={{ base: 'md', md: 'lg' }}
            color="gray.600"
            mb={6}
            fontStyle="italic"
          >
            Exame hepático integrado e sofisticado, combinando múltiplas técnicas de
            ultrassonografia avançada com interpretação clínica direcionada.
          </Text>

          <ExamImage
            slug={SLUG}
            src="/img-exams-webp/superior.webp"
            alt="Avaliação Multiparamétrica do Fígado"
          />

          <VStack align="start" spacing={6}>
            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que é
              </Heading>
              <Text fontSize="lg">
                Exame de ultrassonografia hepática de alta complexidade, baseado no padrão atual da
                Society of Radiologists in Ultrasound (SRU), das Diretrizes EASL e do Consenso
                Baveno VII. Integra múltiplas medidas quantitativas e qualitativas do fígado, do
                baço e da circulação portal em uma única sessão, com interpretação clínica
                integrada. Indicado quando o caso exige avaliação completa, não apenas estadiamento
                isolado de fibrose ou esteatose.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                O que está incluso
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>
                  • Modo B completo do fígado (morfologia, contornos, calibre da veia porta,
                  esplenomegalia)
                </ListItem>
                <ListItem>
                  • Doppler portal completo (veia porta, veia esplênica, eixo da veia cava inferior,
                  artéria hepática, índice de resistividade da artéria esplênica)
                </ListItem>
                <ListItem>• Elastografia hepática (LSM) com classificação SRU Regra dos 4</ListItem>
                <ListItem>• Quantificação de esteatose hepática (Fat Fraction em %)</ListItem>
                <ListItem>
                  • Elastografia esplênica (SSM) nos casos de hipertensão portal cirrótica ou não
                  cirrótica, conforme indicação clínica
                </ListItem>
                <ListItem>• Índice Hepato-Renal (IHR)</ListItem>
                <ListItem>
                  • Interpretação clínica integrada, com revisão dos exames laboratoriais e da
                  história clínica do paciente
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Quando é indicado
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Suspeita de doença hepática crônica de qualquer etiologia</ListItem>
                <ListItem>
                  • Cirrose hepática compensada (cACLD), para estratificação de risco de varizes
                  esofágicas e hipertensão portal clinicamente significativa
                </ListItem>
                <ListItem>
                  • Investigação de hipertensão portal (cirrótica ou não cirrótica, como
                  esquistossomose)
                </ListItem>
                <ListItem>
                  • Monitoramento longitudinal após cura da hepatite C, abstinência alcoólica, perda
                  de peso ou terapia farmacológica
                </ListItem>
                <ListItem>• Avaliação pré-cirúrgica ou pré-transplante hepático</ListItem>
                <ListItem>
                  • Casos complexos em que o solicitante deseja uma avaliação ultrassonográfica
                  integrada com interpretação clínica
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Diferencial em relação à elastografia simples
              </Heading>
              <Text fontSize="lg">
                Este exame não se limita a entregar números isolados. Inclui interpretação clínica
                direcionada ao caso, com revisão integrada dos exames laboratoriais e da história do
                paciente. Para casos em que envolve raciocínio clínico mais complexo (paciente com
                múltiplas etiologias, suspeita de hipertensão portal não cirrótica, monitoramento
                sob terapia hepatológica específica), o médico solicitante pode entrar em contato
                para discutirmos juntos a interpretação do resultado.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Como se preparar
              </Heading>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Jejum mínimo de 4 a 6 horas (água permitida)</ListItem>
                <ListItem>• Não consumir álcool nas 24 horas anteriores ao exame</ListItem>
                <ListItem>
                  • Trazer exames laboratoriais recentes (hemograma com plaquetas, AST, ALT, GGT,
                  fosfatase alcalina, bilirrubinas, INR, albumina)
                </ListItem>
                <ListItem>
                  • Trazer exames de imagem prévios do abdome ou fígado, se houver
                </ListItem>
                <ListItem>
                  • Informar todas as medicações em uso, especialmente betabloqueador (carvedilol,
                  propranolol, nadolol), com dose e tempo de uso
                </ListItem>
              </List>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Como é feito
              </Heading>
              <Text fontSize="lg">
                Exame não invasivo, indolor, realizado em decúbito dorsal e lateral conforme cada
                etapa, com duração aproximada de 40 a 60 minutos. Não há uso de contraste, radiação
                ou agulhas. Realizado por médico ultrassonografista com formação específica em
                elastografia e em avaliação hepatológica.
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
                  color="green.700"
                  letterSpacing="0.2em"
                  textTransform="uppercase"
                  fontWeight="semibold"
                  mb={2}
                >
                  Aparelho premium
                </Text>
                <Text
                  fontSize={{ base: '3xl', md: '4xl' }}
                  color="green.800"
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
                  Plataforma top de linha da Samsung para ultrassonografia hepática, integrando
                  elastografia hepática, elastografia esplênica, quantificação de gordura, Doppler
                  portal completo e índice hepato-renal em um único aparelho.
                </Text>
              </Box>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Resultado e laudo
              </Heading>
              <Text fontSize="lg">
                Laudo entregue em até 5 dias úteis, com interpretação clínica integrada, comentários
                direcionados ao contexto do paciente e referências bibliográficas atualizadas.
                Disponível em formato digital (PDF) e impresso. Em casos complexos, o resultado pode
                incluir discussão conjunta com o médico solicitante.
              </Text>
            </Box>

            <Box>
              <Heading as="h2" fontSize="2xl" mb={3}>
                Para o médico solicitante
              </Heading>
              <Text fontSize="lg" mb={3}>
                Para que o laudo tenha máxima utilidade clínica, é essencial enviar:
              </Text>
              <List spacing={2} pl={4} fontSize="lg" as="ul">
                <ListItem>• Hipótese diagnóstica e contexto clínico detalhado</ListItem>
                <ListItem>• Etiologia presumida e comorbidades</ListItem>
                <ListItem>
                  • Medicações em uso, especialmente betabloqueador, drogas hepatotóxicas, terapias
                  específicas para doença hepática
                </ListItem>
                <ListItem>• Exames laboratoriais recentes</ListItem>
                <ListItem>• Exames de imagem prévios, se houver</ListItem>
              </List>
              <Text fontSize="lg" mt={3}>
                Quanto mais informação clínica chegar no momento do exame, mais relevante e
                direcionado fica o laudo. Para casos selecionados, o médico solicitante pode entrar
                em contato direto para discussão conjunta do caso.
              </Text>
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

export default AvaliacaoMultiparametricaFigado;
