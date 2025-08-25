import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Configurações de animação padronizadas
export const animacoesPadrao = {
  // Animação de entrada
  entrada: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  },

  // Animação de entrada escalonada
  entradaEscalonada: {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: i * 0.1,
        ease: 'easeOut'
      }
    })
  },

  // Animação de fade
  fade: {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: 'easeInOut'
      }
    }
  },

  // Animação de slide
  slide: {
    hidden: { x: -100, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  },

  // Animação de escala
  escala: {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut'
      }
    }
  },

  // Animação de rotação
  rotacao: {
    hidden: { rotate: -180, opacity: 0 },
    visible: { 
      rotate: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  },

  // Animação de bounce
  bounce: {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        duration: 0.6,
        type: 'spring',
        stiffness: 200
      }
    }
  }
};

// Props para o container animado
interface AnimatedContainerProps {
  children: React.ReactNode;
  tipo?: keyof typeof animacoesPadrao;
  delay?: number;
  duracao?: number;
  className?: string;
  mostrar?: boolean;
  onAnimationComplete?: () => void;
  custom?: number; // Para animações escalonadas
  hover?: boolean; // Se deve animar no hover
  click?: boolean; // Se deve animar no click
}

// Container animado principal
export const AnimatedContainer: React.FC<AnimatedContainerProps> = React.memo(({
  children,
  tipo = 'entrada',
  delay = 0,
  duracao,
  className = '',
  mostrar = true,
  onAnimationComplete,
  custom,
  hover = false,
  click = false
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Configuração da animação
  const configuracaoAnimacao = {
    ...animacoesPadrao[tipo],
    visible: {
      ...animacoesPadrao[tipo].visible,
      transition: {
        ...animacoesPadrao[tipo].visible.transition,
        delay: delay,
        duration: duracao || animacoesPadrao[tipo].visible.transition.duration
      }
    }
  };

  // Animação de hover
  const hoverAnimation = hover ? {
    scale: 1.02,
    transition: { duration: 0.2 }
  } : {};

  // Animação de click
  const clickAnimation = click ? {
    scale: 0.98,
    transition: { duration: 0.1 }
  } : {};

  if (!mostrar) return null;

  return (
    <motion.div
      className={className}
      variants={configuracaoAnimacao}
      initial="hidden"
      animate="visible"
      custom={custom}
      whileHover={hover ? hoverAnimation : undefined}
      whileTap={click ? clickAnimation : undefined}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsClicked(true)}
      onTapEnd={() => setIsClicked(false)}
      onAnimationComplete={onAnimationComplete}
    >
      {children}
    </motion.div>
  );
});

AnimatedContainer.displayName = 'AnimatedContainer';

// Container para listas com animação escalonada
interface AnimatedListProps {
  items: React.ReactNode[];
  tipo?: keyof typeof animacoesPadrao;
  delay?: number;
  className?: string;
  itemClassName?: string;
}

export const AnimatedList: React.FC<AnimatedListProps> = React.memo(({
  items,
  tipo = 'entradaEscalonada',
  delay = 0,
  className = '',
  itemClassName = ''
}) => {
  return (
    <div className={className}>
      {items.map((item, index) => (
        <AnimatedContainer
          key={index}
          tipo={tipo}
          delay={delay + (index * 0.1)}
          custom={index}
          className={itemClassName}
        >
          {item}
        </AnimatedContainer>
      ))}
    </div>
  );
});

AnimatedList.displayName = 'AnimatedList';

// Container para entrada/saída com AnimatePresence
interface AnimatedPresenceProps {
  children: React.ReactNode;
  mostrar: boolean;
  tipo?: keyof typeof animacoesPadrao;
  delay?: number;
  className?: string;
  mode?: 'wait' | 'sync';
}

export const AnimatedPresence: React.FC<AnimatedPresenceProps> = React.memo(({
  children,
  mostrar,
  tipo = 'fade',
  delay = 0,
  className = '',
  mode = 'wait'
}) => {
  return (
    <AnimatePresence mode={mode}>
      {mostrar && (
        <motion.div
          className={className}
          variants={animacoesPadrao[tipo]}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{
            delay,
            duration: animacoesPadrao[tipo].visible.transition.duration
          }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
});

AnimatedPresence.displayName = 'AnimatedPresence';

// Hook para controlar animações
export const useAnimacao = (delay: number = 0) => {
  const [mostrar, setMostrar] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrar(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  const toggle = () => setMostrar(!mostrar);
  const esconder = () => setMostrar(false);
  const mostrarFuncao = () => setMostrar(true);

  return {
    mostrar,
    toggle,
    esconder,
    mostrarFuncao
  };
};

// Componente de loading animado
interface LoadingAnimadoProps {
  texto?: string;
  tamanho?: 'sm' | 'md' | 'lg';
  cor?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
}

export const LoadingAnimado: React.FC<LoadingAnimadoProps> = React.memo(({
  texto = 'Carregando...',
  tamanho = 'md',
  cor = 'primary'
}) => {
  const tamanhos = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12'
  };

  const cores = {
    primary: 'border-purple-600',
    secondary: 'border-gray-600',
    success: 'border-green-600',
    warning: 'border-yellow-600',
    error: 'border-red-600'
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <motion.div
        className={`${tamanhos[tamanho]} border-4 border-gray-200 rounded-full ${cores[cor]}`}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear'
        }}
      />
      {texto && (
        <motion.p
          className="text-gray-600 text-sm"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          {texto}
        </motion.p>
      )}
    </div>
  );
});

LoadingAnimado.displayName = 'LoadingAnimado';
