import { Box, Image, Text } from '@chakra-ui/react';
import { imageCaptions } from './examData';

/**
 * Imagem do exame com legenda (caption) para SEO e autenticidade.
 * @param {{ slug: string, src: string, alt: string }} props
 */
export default function ExamImage({ slug, src, alt }) {
  const caption = imageCaptions[slug] || `Imagem ilustrativa — ${alt}`;

  return (
    <Box as="figure" mb={8}>
      <Box display="flex" justifyContent="center">
        <Box w={['90%', '70%', '50%']}>
          <Image
            src={src}
            alt={alt}
            borderRadius="md"
            objectFit="contain"
            w="100%"
            h={{ base: '200px', md: '300px' }}
            bg="white"
            loading="lazy"
          />
        </Box>
      </Box>
      <Text
        as="figcaption"
        fontSize="xs"
        color="gray.500"
        textAlign="center"
        mt={2}
        fontStyle="italic"
      >
        {caption}
      </Text>
    </Box>
  );
}
