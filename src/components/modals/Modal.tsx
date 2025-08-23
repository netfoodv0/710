import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export type ModalSize = 'sm' | 'lg' | 'xl';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: ModalSize;
  showCloseButton?: boolean;
  className?: string;
  contentClassName?: string;
}

const sizeClasses: Record<ModalSize, string> = {
  sm: 'max-w-md',
  lg: 'max-w-4xl',
  xl: 'max-w-7xl'
};

export function Modal({
  isOpen,
  onClose,
  title,
  children,
  size = 'lg',
  showCloseButton = true,
  className,
  contentClassName
}: ModalProps) {
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
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div 
          className={cn(
            'bg-white rounded-lg shadow-xl w-full max-h-[90vh] overflow-hidden m-4',
            sizeClasses[size],
            className
          )}
          style={{ backgroundColor: 'white !important' }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header automático apenas quando há título */}
          {title && (
            <div className="border-b border-gray-200">
              <div className="flex items-center justify-between px-6 py-6">
                <h2 id="modal-title" className="text-lg font-semibold text-gray-900">
                  {title}
                </h2>
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Fechar modal"
                  >
                    <X size={20} />
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Content */}
          <div className={cn('px-6 py-6 overflow-y-auto', contentClassName)}>
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

// Componentes auxiliares para facilitar o uso
export function ModalHeader({ children, className, showCloseButton, onClose }: { 
  children: React.ReactNode; 
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className={cn('border-b border-gray-200', className)}>
      <div className="flex items-center justify-between px-6 py-6">
        <div className="flex-1">
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fechar modal"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}

export function ModalBody({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

export function ModalFooter({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn('border-t border-gray-200', className)}>
      <div className="flex items-center justify-end gap-3 px-6 pt-4">
        {children}
      </div>
    </div>
  );
}
