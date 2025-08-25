import { useCallback, useMemo } from 'react';

interface AnimationConfig {
  duration: number;
  delay: number;
  easing: string;
}

interface UseAnimationOptimizedProps {
  isVisible: boolean;
  config?: Partial<AnimationConfig>;
}

export const useAnimationOptimized = ({ isVisible, config }: UseAnimationOptimizedProps) => {
  // Memoizar configuração de animação para evitar recriação
  const animationConfig = useMemo(() => ({
    duration: 300,
    delay: 0,
    easing: 'ease-in-out',
    ...config
  }), [config]);

  // Memoizar estilos de animação
  const animationStyles = useMemo(() => ({
    visible: {
      opacity: 1,
      transform: 'translateY(0)',
      transition: `all ${animationConfig.duration}ms ${animationConfig.easing} ${animationConfig.delay}ms`
    },
    hidden: {
      opacity: 0,
      transform: 'translateY(20px)',
      transition: `all ${animationConfig.duration}ms ${animationConfig.easing}`
    }
  }), [animationConfig]);

  // Memoizar função de toggle
  const toggleAnimation = useCallback(() => {
    // Lógica de toggle otimizada
    return !isVisible;
  }, [isVisible]);

  // Memoizar se deve mostrar animação
  const shouldAnimate = useMemo(() => {
    return isVisible && animationConfig.duration > 0;
  }, [isVisible, animationConfig.duration]);

  return {
    animationStyles,
    shouldAnimate,
    toggleAnimation,
    config: animationConfig
  };
};

// Hook específico para animações de entrada/saída
export const useFadeAnimation = (isVisible: boolean, delay: number = 0) => {
  const { animationStyles, shouldAnimate } = useAnimationOptimized({
    isVisible,
    config: { delay }
  });

  const fadeStyles = useMemo(() => ({
    ...animationStyles,
    visible: {
      ...animationStyles.visible,
      opacity: 1,
      transform: 'scale(1)'
    },
    hidden: {
      ...animationStyles.hidden,
      opacity: 0,
      transform: 'scale(0.95)'
    }
  }), [animationStyles]);

  return {
    styles: fadeStyles,
    shouldAnimate,
    className: shouldAnimate ? 'animate-fade-in' : ''
  };
};

// Hook para animações de slide
export const useSlideAnimation = (isVisible: boolean, direction: 'left' | 'right' | 'up' | 'down' = 'up') => {
  const { animationStyles, shouldAnimate } = useAnimationOptimized({
    isVisible,
    config: { duration: 400 }
  });

  const slideStyles = useMemo(() => {
    const getTransform = () => {
      switch (direction) {
        case 'left': return 'translateX(-100%)';
        case 'right': return 'translateX(100%)';
        case 'up': return 'translateY(-100%)';
        case 'down': return 'translateY(100%)';
        default: return 'translateY(-100%)';
      }
    };

    return {
      ...animationStyles,
      visible: {
        ...animationStyles.visible,
        transform: 'translate(0, 0)'
      },
      hidden: {
        ...animationStyles.hidden,
        transform: getTransform()
      }
    };
  }, [animationStyles, direction]);

  return {
    styles: slideStyles,
    shouldAnimate,
    className: shouldAnimate ? `animate-slide-${direction}` : ''
  };
};
