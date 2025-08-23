import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface AnimatedDropdownProps {
  isOpen: boolean;
  children: React.ReactNode;
  className?: string;
}

export const AnimatedDropdown: React.FC<AnimatedDropdownProps> = ({
  isOpen,
  children,
  className = ''
}) => {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
            height: 0,
            y: -8
          }}
          animate={{
            opacity: 1,
            height: 'auto',
            y: 0
          }}
          exit={{
            opacity: 0,
            height: 0,
            y: -8
          }}
          transition={{
            duration: 0.3,
            ease: [0.25, 0.46, 0.45, 0.94]
          }}
          className={`overflow-hidden ${className}`}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

interface AnimatedChevronProps {
  isOpen: boolean;
  className?: string;
  color?: string;
}

export const AnimatedChevron: React.FC<AnimatedChevronProps> = ({
  isOpen,
  className = '',
  color = '#525866'
}) => {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={isOpen ? 'open' : 'closed'}
        initial={{ scale: 0.9, rotate: isOpen ? 0 : 180 }}
        animate={{ scale: 1, rotate: isOpen ? 180 : 0 }}
        exit={{ scale: 0.9 }}
        transition={{ 
          duration: 0.3,
          ease: [0.25, 0.46, 0.45, 0.94]
        }}
        className={className}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="6,9 12,15 18,9" />
        </svg>
      </motion.div>
    </AnimatePresence>
  );
};
