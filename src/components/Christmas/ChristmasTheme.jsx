import { useState, useEffect } from 'react';
import { IconButton, Tooltip, useToast } from '@chakra-ui/react';
import { FaSnowflake, FaGift } from 'react-icons/fa';
import PropTypes from 'prop-types';
import './ChristmasEffects.css';

const ChristmasTheme = ({ children }) => {
  const [isChristmasMode, setIsChristmasMode] = useState(() => {
    // Verifica se já tem preferência salva
    const saved = localStorage.getItem('christmasMode');
    if (saved !== null) return saved === 'true';

    // Auto-ativa entre 1 de dezembro e 6 de janeiro
    const today = new Date();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    return month === 12 || (month === 1 && day <= 6);
  });

  const toast = useToast();

  useEffect(() => {
    // Salva preferência
    localStorage.setItem('christmasMode', isChristmasMode);

    // Adiciona/remove classe no body
    if (isChristmasMode) {
      document.body.classList.add('christmas-mode');

      // Toca som sutil de sinos (apenas uma vez)
      if (!sessionStorage.getItem('christmasGreeting')) {
        sessionStorage.setItem('christmasGreeting', 'true');
        playChristmasSound();

        // Mensagem de boas-vindas
        toast({
          title: '🎄 Feliz Natal!',
          description: 'O espírito natalino chegou ao nosso site!',
          status: 'success',
          duration: 4000,
          isClosable: true,
          position: 'top',
        });
      }
    } else {
      document.body.classList.remove('christmas-mode');
    }
  }, [isChristmasMode, toast]);

  const playChristmasSound = () => {
    // Som opcional - implementar depois se necessário
    // const audio = new Audio('/sounds/bells.mp3');
    // audio.volume = 0.2;
    // audio.play().catch(() => {});
  };

  const toggleChristmas = () => {
    setIsChristmasMode(!isChristmasMode);

    toast({
      title: isChristmasMode ? 'Tema Normal Ativado' : '🎅 Tema Natalino Ativado!',
      status: isChristmasMode ? 'info' : 'success',
      duration: 2000,
      isClosable: true,
      position: 'top-right',
    });
  };

  return (
    <>
      {/* Botão Toggle Natal */}
      <Tooltip
        label={isChristmasMode ? 'Desativar Tema Natal' : 'Ativar Tema Natal'}
        placement="left"
      >
        <IconButton
          icon={isChristmasMode ? <FaGift /> : <FaSnowflake />}
          onClick={toggleChristmas}
          position="fixed"
          bottom="80px"
          right="20px"
          bg={isChristmasMode ? 'red.500' : 'green.500'}
          color="white"
          _hover={{
            bg: isChristmasMode ? 'red.600' : 'green.600',
            transform: 'rotate(20deg) scale(1.1)',
          }}
          size="lg"
          borderRadius="full"
          boxShadow="lg"
          zIndex={999}
          transition="all 0.3s"
          aria-label="Toggle Christmas Theme"
        />
      </Tooltip>

      {/* Efeito de Neve */}
      {isChristmasMode && (
        <>
          <div className="snowflakes" aria-hidden="true">
            <div className="snowflake">❄</div>
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
            <div className="snowflake">❄</div>
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
            <div className="snowflake">❄</div>
            <div className="snowflake">❅</div>
            <div className="snowflake">❆</div>
            <div className="snowflake">❄</div>
          </div>

          {/* Luzes de Natal no topo */}
          <div className="christmas-lights">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </>
      )}

      {/* Conteúdo do site */}
      {children}
    </>
  );
};

ChristmasTheme.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ChristmasTheme;
