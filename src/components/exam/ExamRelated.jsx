import { Box, Heading, SimpleGrid, Text, LinkBox, LinkOverlay } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { relatedExams } from './examData';

/**
 * Grid de exames relacionados com 3 cards.
 * @param {{ slug: string }} props
 */
export default function ExamRelated({ slug }) {
  const items = relatedExams[slug];
  if (!items || items.length === 0) return null;

  return (
    <Box mt={10}>
      <Heading as="h2" fontSize="2xl" mb={4}>
        Exames relacionados
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
        {items.map(({ slug: s, icon, label, desc }) => (
          <LinkBox
            key={s}
            bg="gray.50"
            borderRadius="lg"
            p={5}
            border="1px solid"
            borderColor="gray.200"
            transition="all 0.2s"
            _hover={{ borderColor: 'green.400', shadow: 'md', transform: 'translateY(-2px)' }}
          >
            <Text fontSize="2xl" mb={2}>
              {icon}
            </Text>
            <LinkOverlay as={RouterLink} to={`/exames/${s}`}>
              <Text fontWeight="bold" fontSize="lg" color="green.700">
                {label}
              </Text>
            </LinkOverlay>
            <Text fontSize="sm" color="gray.600" mt={1}>
              {desc}
            </Text>
          </LinkBox>
        ))}
      </SimpleGrid>
    </Box>
  );
}
