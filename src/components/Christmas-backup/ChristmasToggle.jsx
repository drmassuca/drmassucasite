import { useState, useEffect } from 'react';
import { Box, IconButton, Tooltip } from '@chakra-ui/react';
import { FaSnowflake } from 'react-icons/fa';
import PropTypes from 'prop-types';

const ChristmasToggle = ({ onToggle }) => {
  const [isChristmasActive, setIsChristmasActive] = useState(() => {
    // Recuperar estado salvo no localStorage
    const saved = localStorage.getItem('christmasTheme');
    return saved === null ? true : saved === 'true';
  });

  useEffect(() => {
    // Salvar estado no localStorage
    localStorage.setItem('christmasTheme', isChristmasActive);
    onToggle(isChristmasActive);
  }, [isChristmasActive, onToggle]);

  return (
    <Box position="fixed" bottom="80px" right="20px" zIndex="1000">
      <Tooltip
        label={isChristmasActive ? 'Desativar tema de Natal' : 'Ativar tema de Natal'}
        placement="left"
      >
        <IconButton
          icon={<FaSnowflake />}
          onClick={() => setIsChristmasActive(!isChristmasActive)}
          colorScheme={isChristmasActive ? 'red' : 'green'}
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          _hover={{
            transform: 'scale(1.1)',
            boxShadow: 'xl',
          }}
          animation={isChristmasActive ? 'pulse 2s infinite' : 'none'}
          sx={{
            '@keyframes pulse': {
              '0%': { boxShadow: '0 0 0 0 rgba(255, 0, 0, 0.7)' },
              '70%': { boxShadow: '0 0 0 10px rgba(255, 0, 0, 0)' },
              '100%': { boxShadow: '0 0 0 0 rgba(255, 0, 0, 0)' },
            },
          }}
        />
      </Tooltip>
    </Box>
  );
};

ChristmasToggle.propTypes = {
  onToggle: PropTypes.func.isRequired,
};

export default ChristmasToggle;
