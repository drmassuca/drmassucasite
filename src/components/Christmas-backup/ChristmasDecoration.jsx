import { Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const ChristmasDecoration = ({ isActive = true }) => {
  if (!isActive) return null;

  return (
    <Box position="absolute" top="0" left="0" right="0" bottom="0" pointerEvents="none" zIndex="1">
      {/* Sino em cima do logo - mais baixo */}
      <Box
        position="absolute"
        top="5px"
        left="55px"
        fontSize="22px"
        animation="swing 2s ease-in-out infinite"
        sx={{
          '@keyframes swing': {
            '0%, 100%': { transform: 'rotate(-15deg) scale(1)' },
            '50%': { transform: 'rotate(15deg) scale(1.1)' },
          },
        }}
      >
        🔔
      </Box>

      {/* Múltiplas estrelas espalhadas */}
      <Box
        position="absolute"
        top="8px"
        left="140px"
        fontSize="18px"
        animation="twinkle 1.5s ease-in-out infinite"
      >
        ⭐
      </Box>
      <Box
        position="absolute"
        top="35px"
        left="170px"
        fontSize="14px"
        animation="twinkle 2s ease-in-out infinite"
        animationDelay="0.3s"
      >
        ✨
      </Box>
      <Box
        position="absolute"
        top="15px"
        left="220px"
        fontSize="16px"
        animation="twinkle 1.8s ease-in-out infinite"
        animationDelay="0.6s"
      >
        ⭐
      </Box>
      <Box
        position="absolute"
        top="40px"
        left="250px"
        fontSize="12px"
        animation="twinkle 2.2s ease-in-out infinite"
        animationDelay="0.9s"
      >
        ✨
      </Box>
      <Box
        position="absolute"
        top="10px"
        left="320px"
        fontSize="15px"
        animation="twinkle 1.6s ease-in-out infinite"
        animationDelay="1.2s"
      >
        ⭐
      </Box>

      {/* Árvores de Natal */}
      <Box
        position="absolute"
        top="50%"
        right="20px"
        fontSize="32px"
        transform="translateY(-50%)"
        animation="pulse 3s ease-in-out infinite"
      >
        🎄
      </Box>
      <Box
        position="absolute"
        top="15px"
        right="120px"
        fontSize="20px"
        animation="pulse 3.5s ease-in-out infinite"
        animationDelay="0.5s"
      >
        🎄
      </Box>

      {/* Múltiplos bonecos de neve */}
      <Box
        position="absolute"
        top="50%"
        left="38%"
        fontSize="24px"
        transform="translateY(-50%)"
        animation="wobble 4s ease-in-out infinite"
      >
        ⛄
      </Box>
      <Box
        position="absolute"
        top="35px"
        left="48%"
        fontSize="18px"
        animation="wobble 3.5s ease-in-out infinite"
        animationDelay="1s"
      >
        ☃️
      </Box>
      <Box
        position="absolute"
        top="10px"
        left="55%"
        fontSize="20px"
        animation="wobble 4.5s ease-in-out infinite"
        animationDelay="2s"
      >
        ⛄
      </Box>

      {/* Vários presentes espalhados */}
      <Box
        position="absolute"
        bottom="8px"
        right="100px"
        fontSize="20px"
        animation="bounce 2s ease-in-out infinite"
      >
        🎁
      </Box>
      <Box
        position="absolute"
        bottom="5px"
        right="180px"
        fontSize="18px"
        animation="bounce 2.3s ease-in-out infinite"
        animationDelay="0.5s"
      >
        🎁
      </Box>
      <Box
        position="absolute"
        top="38px"
        right="60px"
        fontSize="16px"
        animation="bounce 1.8s ease-in-out infinite"
        animationDelay="1s"
      >
        🎁
      </Box>

      {/* Papai Noel e Renas */}
      <Box
        position="absolute"
        top="12px"
        left="28%"
        fontSize="22px"
        animation="wave 2s ease-in-out infinite"
      >
        🎅
      </Box>
      <Box
        position="absolute"
        top="38px"
        left="35%"
        fontSize="20px"
        animation="wave 2.5s ease-in-out infinite"
        animationDelay="0.5s"
      >
        🦌
      </Box>

      {/* Meias de Natal */}
      <Box
        position="absolute"
        top="40px"
        left="60%"
        fontSize="18px"
        animation="swing 2.5s ease-in-out infinite"
      >
        🧦
      </Box>
      <Box
        position="absolute"
        top="10px"
        right="200px"
        fontSize="16px"
        animation="swing 2s ease-in-out infinite"
        animationDelay="0.8s"
      >
        🧦
      </Box>

      {/* Velas */}
      <Box
        position="absolute"
        bottom="10px"
        left="25%"
        fontSize="18px"
        animation="flicker 1s ease-in-out infinite"
      >
        🕯️
      </Box>
      <Box
        position="absolute"
        bottom="8px"
        left="65%"
        fontSize="16px"
        animation="flicker 1.2s ease-in-out infinite"
        animationDelay="0.5s"
      >
        🕯️
      </Box>

      {/* Flocos de neve decorativos */}
      <Box
        position="absolute"
        top="8px"
        left="400px"
        fontSize="20px"
        animation="spin 3s linear infinite"
      >
        ❄️
      </Box>
      <Box
        position="absolute"
        top="35px"
        left="450px"
        fontSize="16px"
        animation="spin 4s linear infinite"
        animationDelay="1s"
      >
        ❄️
      </Box>
      <Box
        position="absolute"
        top="15px"
        right="250px"
        fontSize="18px"
        animation="spin 3.5s linear infinite"
        animationDelay="0.5s"
      >
        ❄️
      </Box>

      {/* Doces e guloseimas */}
      <Box
        position="absolute"
        bottom="12px"
        left="45%"
        fontSize="18px"
        animation="bounce 1.5s ease-in-out infinite"
      >
        🍪
      </Box>
      <Box
        position="absolute"
        top="35px"
        right="300px"
        fontSize="16px"
        animation="bounce 1.8s ease-in-out infinite"
        animationDelay="0.5s"
      >
        🍬
      </Box>

      {/* Luzes piscando na borda inferior */}
      <Box
        position="absolute"
        bottom="0"
        left="0"
        right="0"
        height="3px"
        background="linear-gradient(90deg, #ff0000 0%, #00ff00 20%, #ffd700 40%, #ff0000 60%, #00ff00 80%, #ffd700 100%)"
        backgroundSize="200% 100%"
        animation="lights 2s linear infinite"
        sx={{
          '@keyframes lights': {
            '0%': { backgroundPosition: '0% 50%' },
            '100%': { backgroundPosition: '200% 50%' },
          },
        }}
      />

      {/* Animações CSS */}
      <style>
        {`
          @keyframes twinkle {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.8); }
          }
          @keyframes pulse {
            0%, 100% { transform: translateY(-50%) scale(1); }
            50% { transform: translateY(-50%) scale(1.05); }
          }
          @keyframes wobble {
            0%, 100% { transform: translateY(-50%) rotate(0deg); }
            25% { transform: translateY(-50%) rotate(-5deg); }
            75% { transform: translateY(-50%) rotate(5deg); }
          }
          @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-5px); }
          }
          @keyframes wave {
            0%, 100% { transform: rotate(-10deg); }
            50% { transform: rotate(10deg); }
          }
          @keyframes swing {
            0%, 100% { transform: rotate(-15deg); }
            50% { transform: rotate(15deg); }
          }
          @keyframes flicker {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.7; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </Box>
  );
};

ChristmasDecoration.propTypes = {
  isActive: PropTypes.bool,
};

export default ChristmasDecoration;
