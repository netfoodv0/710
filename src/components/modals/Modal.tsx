import React, { useEffect, useState, createContext, useContext } from 'react';
import { X } from 'lucide-react';
import { ModalProps, ModalHeaderProps, ModalBodyProps, ModalFooterProps } from '../../types/global/modal';
import { cn } from '@/lib/utils';
import '../../styles/modal.css';

// Contexto para compartilhar a função de fechamento
const ModalContext = createContext<(() => void) | null>(null);

// Hook para usar o contexto
export const useModalClose = () => {
  const closeFunction = useContext(ModalContext);
  if (!closeFunction) {
    throw new Error('useModalClose deve ser usado dentro de um Modal');
  }
  return closeFunction;
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'md',
  showCloseButton = true,
  className = ''
}: ModalProps) {
  const [isClosing, setIsClosing] = useState(false);

  // Função para fechar com animação - MESMA FUNÇÃO PARA TODOS
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 200); // Duração da animação de saída (sincronizado com CSS)
  };

  // Efeito para controlar o scroll do body
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Efeito para fechar modal com ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, handleClose]);

  if (!isOpen && !isClosing) return null;

  // Separar o footer dos outros children
  const modalChildren = React.Children.toArray(children);
  const footer = modalChildren.find(child => 
    React.isValidElement(child) && child.type === ModalFooter
  );
  const otherChildren = modalChildren.filter(child => 
    !React.isValidElement(child) || child.type !== ModalFooter
  );

  return (
    <ModalContext.Provider value={handleClose}>
      {/* Backdrop */}
      <div className={`modal-backdrop ${isClosing ? 'backdrop-exit' : 'backdrop-enter'}`} onClick={handleClose} />
      
      {/* Container do modal */}
      <div className="modal-container">
        <div 
          className={`modal modal-${size} ${className} ${isClosing ? 'modal-exit' : 'modal-enter'}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          {title && (
            <div className="modal-header">
              <div className="modal-header-content">
                <h2 className="modal-title">{title}</h2>
                {showCloseButton && (
                  <button
                    onClick={handleClose}
                    className="modal-close-button"
                    aria-label="Fechar modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          )}
          
          {/* Conteúdo principal (scrollável) */}
          <div className="modal-content">
            {otherChildren}
          </div>
          
          {/* Footer fixo */}
          {footer}
        </div>
      </div>
    </ModalContext.Provider>
  );
}

// Componentes auxiliares
export function ModalHeader({ 
  children, 
  className = '', 
  showCloseButton = true, 
  onClose 
}: ModalHeaderProps) {
  return (
    <div className={`modal-header ${className}`}>
      <div className="modal-header-content">
        <div className="flex-1">
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="modal-close-button"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export function ModalBody({ children, className = '' }: ModalBodyProps) {
  return (
    <div className={`modal-body ${className}`}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className = '', align = 'right' }: ModalFooterProps) {
  const alignClasses = {
    left: 'justify-start',
    center: 'justify-center',
    right: 'justify-end',
    between: 'justify-between'
  };

  return (
    <div className={cn('modal-footer', className)}>
      <div className={cn('flex items-center gap-3', alignClasses[align])}>
        {children}
      </div>
    </div>
  );
}
