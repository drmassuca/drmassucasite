import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

const SnowEffect = ({ isActive = true, intensity = 50 }) => {
  const [snowflakes, setSnowflakes] = useState([]);

  useEffect(() => {
    if (!isActive) return;

    // Criar flocos baseado na intensidade
    const flakes = Array.from({ length: intensity }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      animationDelay: Math.random() * 10,
      opacity: Math.random() * 0.6 + 0.4,
      size: Math.random() * 10 + 10,
      duration: Math.random() * 5 + 10,
    }));

    setSnowflakes(flakes);
  }, [isActive, intensity]);

  if (!isActive) return null;

  return (
    <>
      <style>
        {`
          @keyframes snowfall {
            0% {
              transform: translateY(-100vh);
            }
            100% {
              transform: translateY(100vh);
            }
          }

          .snowflake {
            position: fixed;
            color: #ffffff;
            user-select: none;
            pointer-events: none;
            animation-name: snowfall;
            animation-iteration-count: infinite;
            animation-timing-function: linear;
            z-index: 10000;
            text-shadow: 0 0 2px rgba(255, 255, 255, 0.9), 0 0 4px rgba(255, 255, 255, 0.5);
          }
        `}
      </style>

      {snowflakes.map(flake => (
        <div
          key={flake.id}
          className="snowflake"
          style={{
            left: `${flake.left}%`,
            opacity: flake.opacity,
            fontSize: `${flake.size}px`,
            animationDelay: `${flake.animationDelay}s`,
            animationDuration: `${flake.duration}s`,
            position: 'fixed',
            top: '-20px',
          }}
        >
          ❄
        </div>
      ))}
    </>
  );
};

SnowEffect.propTypes = {
  isActive: PropTypes.bool,
  intensity: PropTypes.number,
};

export default SnowEffect;
