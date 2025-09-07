import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Box, Heading, Image, Text, VStack } from '@chakra-ui/react';
import data from '../data/exams-data.json';
import SEO from '../components/SEO';

export default function ExamTemplate() {
  const { slug } = useParams();
  const exam = data.find(e => e.slug === slug);

  if (!exam) {
    return (
      <Box p={8}>
        <Heading>Exame não encontrado</Heading>
      </Box>
    );
  }

  /* Canonical relativo (sem www) */
  const canonicalPath = `/exames/${slug}`;

  /* Meta description (máx. ~160 c) */
  const description =
    exam.paragraphs && exam.paragraphs.length > 0
      ? `${exam.paragraphs[0].replace(/<[^>]+>/g, '').slice(0, 155)}…`
      : `Informações detalhadas sobre o exame ${exam.title} em Itaberaí-GO.`;

  return (
    <>
      {/* ➜ SEO base */}
      <SEO
        title={`${exam.title} – Dr. Massuca`}
        description={description}
        canonical={canonicalPath}
        image={exam.image}
      />

      {/* ➜ Schema.org – MedicalTest */}
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MedicalTest',
            name: exam.title,
            description,
            url: `https://drmassuca.com.br${canonicalPath}`,
            image: exam.image,
            about: {
              '@type': 'Person',
              name: 'Dr. Antonio Massucatti Neto',
              medicalSpecialty: 'Ultrassom',
              alumniOf: 'Universidade Federal de Goiás',
            },
          })}
        </script>
      </Helmet>

      {/* Conteúdo ---------------------------------------------------------------- */}
      <VStack spacing={6} p={8} maxW="800px" mx="auto">
        <Heading as="h1" size="xl" textAlign="center" color="green.700">
          {exam.title}
        </Heading>

        {exam.image && (
          <Image src={exam.image} alt={exam.title} loading="lazy" borderRadius="md" shadow="md" />
        )}

        {exam.paragraphs.map((p, idx) => (
          <Text key={idx} fontSize="lg" textAlign="justify">
            {p}
          </Text>
        ))}
      </VStack>
    </>
  );
}
