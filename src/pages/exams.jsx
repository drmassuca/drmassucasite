import { Helmet } from 'react-helmet-async';
import SEO from '../components/SEO';
import {
  Box,
  Heading,
  Text,
  VStack,
  SimpleGrid,
  Card,
  CardBody,
  Icon,
  List,
  ListItem,
  ListIcon,
  Button,
  Link,
} from '@chakra-ui/react';
import {
  FaHeartbeat,
  FaFemale,
  FaStethoscope,
  FaMicroscope,
  FaChild,
  FaNotesMedical,
  FaUserNurse,
  FaCheckCircle,
  FaWhatsapp,
} from 'react-icons/fa';
import { Link as RouterLink } from 'react-router-dom';

/* --- URLs de cada exame (usadas no schema) ------------------------------ */
const examUrls = [
  '/exames/obstetrico-de-rotina',
  '/exames/morfologico-primeiro-trimestre',
  '/exames/morfologico-segundo-trimestre',
  '/exames/doppler-obstetrico',
  '/exames/ecocardiografia-fetal',
  '/exames/endovaginal',
  '/exames/mamas',
  '/exames/pelvico-via-abdominal',
  '/exames/pesquisa-de-endometriose-com-preparo',
  '/exames/monitorizacao-da-ovulacao',
  '/exames/total',
  '/exames/superior',
  '/exames/inferior',
  '/exames/parede-abdominal',
  '/exames/via-abdominal',
  '/exames/via-transretal',
  '/exames/bolsa-escrotal-e-testiculos',
  '/exames/rins-e-vias-urinarias',
  '/exames/pesquisa-de-puberdade-precoce',
  '/exames/transfontanela',
  '/exames/partes-moles',
  '/exames/avaliacao-pre-cirurgia-plastica',
  '/exames/ultrassonografia-de-tireoide-com-ou-sem-doppler',
  '/exames/ultrassonografia-cervical-com-ou-sem-doppler',
];

function Exams() {
  return (
    <>
      {/* ➜ SEO base */}
      <SEO
        title="Exames de Ultrassom Itaberaí-GO | Dr. Massuca | 24+ Tipos de Exames"
        description="Exames de ultrassom em Itaberaí-GO: obstétrico, ginecológico, abdominal, próstata, tireoides e mais. Dr. Massuca com equipamentos modernos. Agende já!"
        canonical="/exames"
        keywords="exames ultrassom Itaberaí, ultrassom obstétrico, ultrassom ginecológico, ultrassom abdominal, ecocardiografia fetal, Dr Massuca exames"
        type="webpage"
      />

      {/* ➜ Schema.org – CollectionPage */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Exames de Ultrassom – Dr. Massuca',
            url: 'https://drmassuca.com.br/exames',
            description:
              'Lista de todos os exames de ultrassom oferecidos pelo Dr. Massuca em Itaberaí-GO.',
            hasPart: examUrls.map(url => ({
              '@type': 'MedicalTest',
              url: `https://drmassuca.com.br${url}`,
            })),
          })}
        </script>
      </Helmet>

      {/* Conteúdo ----------------------------------------------------------------- */}
      <Box maxW="1200px" mx="auto" px={4} py={10}>
        <Box bg="whiteAlpha.900" borderRadius="2xl" p={{ base: 6, md: 10 }} boxShadow="2xl">
          <Heading
            as="h1"
            size="xl"
            mb={10}
            textAlign="center"
            color="green.700"
            textShadow="1px 1px #c3e3d6"
          >
            Exames de Ultrassom Realizados
          </Heading>

          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mb={10}>
            {/* Categorias de exames ------------------------------------------------ */}
            {[
              {
                icon: FaHeartbeat,
                title: 'Ultrassom Obstétrico',
                items: [
                  ['Obstétrico de Rotina', '/exames/obstetrico-de-rotina'],
                  ['Morfológico 1º trimestre', '/exames/morfologico-primeiro-trimestre'],
                  ['Morfológico 2º trimestre', '/exames/morfologico-segundo-trimestre'],
                  ['Doppler Obstétrico', '/exames/doppler-obstetrico'],
                  ['Ecocardiografia Fetal', '/exames/ecocardiografia-fetal'],
                ],
                hasSpecialBox: true,
              },
              {
                icon: FaFemale,
                title: 'Ultrassom Ginecológico',
                items: [
                  ['Endovaginal', '/exames/endovaginal'],
                  ['Mamas', '/exames/mamas'],
                  ['Pélvico via abdominal', '/exames/pelvico-via-abdominal'],
                  [
                    'Pesquisa de Endometriose (com preparo)',
                    '/exames/pesquisa-de-endometriose-com-preparo',
                  ],
                  ['Monitorização da Ovulação', '/exames/monitorizacao-da-ovulacao'],
                ],
              },
              {
                icon: FaStethoscope,
                title: 'Ultrassom Abdominal',
                items: [
                  ['Total', '/exames/total'],
                  ['Superior', '/exames/superior'],
                  ['Inferior', '/exames/inferior'],
                  ['Parede Abdominal', '/exames/parede-abdominal'],
                ],
              },
              {
                icon: FaMicroscope,
                title: 'Ultrassom de Próstata',
                items: [
                  ['Via Abdominal', '/exames/via-abdominal'],
                  ['Via Transretal', '/exames/via-transretal'],
                ],
              },
              {
                icon: FaNotesMedical,
                title: 'Ultrassom Bolsa Escrotal e Testículos',
                items: [],
                link: '/exames/bolsa-escrotal-e-testiculos',
              },
              {
                icon: FaStethoscope,
                title: 'Ultrassom Rins e Vias Urinárias',
                items: [],
                link: '/exames/rins-e-vias-urinarias',
              },
              {
                icon: FaChild,
                title: 'Ultrassom Pediátrico',
                items: [
                  ['Pesquisa de Puberdade Precoce', '/exames/pesquisa-de-puberdade-precoce'],
                  ['Transfontanela', '/exames/transfontanela'],
                ],
              },
              {
                icon: FaUserNurse,
                title: 'Ultrassom de Partes Moles',
                items: [],
                link: '/exames/partes-moles',
              },
              {
                icon: FaNotesMedical,
                title: 'Ultrassom Avaliação Pré Cirurgia Plástica',
                items: [],
                link: '/exames/avaliacao-pre-cirurgia-plastica',
              },
              {
                icon: FaStethoscope,
                title: 'Ultrassom de Tireoide e Cervical',
                items: [
                  [
                    'Tireoide (com ou sem Doppler)',
                    '/exames/ultrassonografia-de-tireoide-com-ou-sem-doppler',
                  ],
                  [
                    'Cervical (com ou sem Doppler)',
                    '/exames/ultrassonografia-cervical-com-ou-sem-doppler',
                  ],
                ],
              },
            ].map((section, idx) => (
              <Card key={idx} boxShadow="xl" rounded="2xl">
                <CardBody>
                  <VStack align="start" spacing={3}>
                    <Icon as={section.icon} boxSize={6} color="green.700" />
                    {section.link ? (
                      <Link as={RouterLink} to={section.link}>
                        <Heading size="sm" color="green.800">
                          {section.title}
                        </Heading>
                      </Link>
                    ) : (
                      <Heading size="sm" color="green.800">
                        {section.title}
                      </Heading>
                    )}

                    {section.items?.length > 0 && (
                      <List spacing={1}>
                        {section.items.map(([label, path], i) => (
                          <ListItem key={i}>
                            <ListIcon as={FaCheckCircle} color="green.600" />
                            <Link as={RouterLink} to={path} color="green.800" fontWeight="semibold">
                              {label}
                            </Link>
                          </ListItem>
                        ))}
                      </List>
                    )}

                    {section.obs && (
                      <Text fontSize="sm" fontStyle="italic" color="gray.700" pt={2}>
                        {section.obs}
                      </Text>
                    )}

                    {/* Box especial para Ultrassom 3D */}
                    {section.hasSpecialBox && (
                      <Box
                        bg="rgba(212, 175, 55, 0.1)"
                        p={4}
                        borderRadius="lg"
                        border="1px solid rgba(212, 175, 55, 0.3)"
                        mt={3}
                        w="full"
                      >
                        <Text fontSize="sm" color="green.800" mb={2} fontWeight="semibold">
                          ✨ <strong>Diferencial exclusivo:</strong>
                        </Text>
                        <Text fontSize="sm" color="green.700" mb={3} lineHeight="1.4">
                          Oferecemos <strong>imagens 3D/4D</strong> durante os exames obstétricos
                          quando as condições técnicas permitem.
                        </Text>
                        <Button
                          as={RouterLink}
                          to="/ultrassom-3d"
                          size="sm"
                          bg="#d4af37"
                          color="white"
                          _hover={{ bg: '#b8941f' }}
                          fontSize="xs"
                          fontWeight="600"
                          borderRadius="md"
                        >
                          Saiba tudo sobre Ultrassom 3D →
                        </Button>
                      </Box>
                    )}
                  </VStack>
                </CardBody>
              </Card>
            ))}
          </SimpleGrid>

          <VStack spacing={3} mb={8}>
            <Text textAlign="center" fontSize="md" color="gray.700">
              Todos os exames são realizados com equipamentos modernos e laudos precisos.
            </Text>
          </VStack>

          {/* CTA WhatsApp ---------------------------------------------------------- */}
          <Box textAlign="center">
            <Button
              as="a"
              href="https://wa.me/5562996602117"
              target="_blank"
              rel="noopener noreferrer"
              leftIcon={<FaWhatsapp />}
              bg="green.700"
              color="white"
              size="lg"
              rounded="full"
              px={8}
              py={6}
              _hover={{ bg: 'green.800' }}
              boxShadow="md"
            >
              Agendar Exame
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Exams;
