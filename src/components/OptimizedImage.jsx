import { useState, useRef, useEffect } from 'react';
import { Image, Box } from '@chakra-ui/react';
import PropTypes from 'prop-types';

/**
 * Componente de imagem otimizada com lazy loading inteligente
 * Inclui fallback, preload condicional e intersection observer
 */
const OptimizedImage = ({
  src,
  alt,
  fallbackSrc = '/icons/favicon-512.png',
  priority = false,
  quality = 85,
  sizes = '100vw',
  className,
  style = {},
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Se priority=true, carrega imediatamente
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef();

  // Intersection Observer para lazy loading
  useEffect(() => {
    if (priority || isInView) return; // Não observar se já deve carregar

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        // Carregar quando estiver 200px antes de aparecer
        rootMargin: '200px 0px',
        threshold: 0.01,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Preload de imagens críticas
  useEffect(() => {
    if (priority && src) {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);

      return () => {
        try {
          document.head.removeChild(link);
        } catch (e) {
          // Link já removido
        }
      };
    }
  }, [priority, src]);

  const handleLoad = e => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = e => {
    setHasError(true);
    if (onError) onError(e);
  };

  // Otimizar src com parâmetros de qualidade (se suportado)
  const optimizedSrc =
    src && src.includes('.webp') ? `${src}${src.includes('?') ? '&' : '?'}q=${quality}` : src;

  return (
    <Box
      ref={imgRef}
      position="relative"
      overflow="hidden"
      className={className}
      style={style}
      {...props}
    >
      {(isInView || priority) && (
        <Image
          src={hasError ? fallbackSrc : optimizedSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          onLoad={handleLoad}
          onError={handleError}
          transition="opacity 0.3s ease"
          opacity={isLoaded ? 1 : 0}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            ...style,
          }}
        />
      )}

      {/* Placeholder enquanto carrega */}
      {!isLoaded && (isInView || priority) && (
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bg="gray.200"
          display="flex"
          alignItems="center"
          justifyContent="center"
          zIndex={1}
        >
          <Box
            width="40px"
            height="40px"
            border="3px solid"
            borderColor="gray.300"
            borderTopColor="green.500"
            borderRadius="50%"
            animation="spin 1s linear infinite"
          />
        </Box>
      )}

      {/* Skeleton placeholder antes de entrar na view */}
      {!isInView && !priority && (
        <Box width="100%" height="100%" bg="gray.200" animation="pulse 2s ease-in-out infinite" />
      )}
    </Box>
  );
};

OptimizedImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  fallbackSrc: PropTypes.string,
  priority: PropTypes.bool,
  quality: PropTypes.number,
  sizes: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  onLoad: PropTypes.func,
  onError: PropTypes.func,
};

export default OptimizedImage;
