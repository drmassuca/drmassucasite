// components/ui/Section.jsx
// Container responsivo padrão para seções

import { Box, Container } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Section = ({ children, bg, py = { base: 12, md: 16, lg: 20 }, ...props }) => {
  return (
    <Box bg={bg} py={py} {...props}>
      <Container maxW="container.xl" px={{ base: 4, md: 6, lg: 8 }}>
        {children}
      </Container>
    </Box>
  );
};

Section.propTypes = {
  children: PropTypes.node.isRequired,
  bg: PropTypes.string,
  py: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
};

export default Section;
