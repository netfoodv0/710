import React from 'react';

export type CustomModalSize = 'small' | 'medium' | 'large';

interface CustomModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  size?: CustomModalSize;
  showCloseButton?: boolean;
  showFooter?: boolean;
  footerContent?: React.ReactNode;
  className?: string;
  contentClassName?: string;
}

const sizeClasses: Record<CustomModalSize, string> = {
  small: 'w-[95%] max-w-[500px]',
  medium: 'w-[95%] max-w-[900px]',
  large: 'w-[95%] max-w-[1200px]'
};

export function CustomModal({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium',
  showCloseButton = true,
  showFooter = true,
  footerContent,
  className = '',
  contentClassName = ''
}: CustomModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-60 opacity-100 backdrop-blur-sm transition-opacity duration-300">
      {/* Backdrop clicável */}
      <div 
        className="absolute inset-0 cursor-pointer"
        onClick={onClose}
      />
      <div 
        className={`relative m-0 p-0 ${sizeClasses[size]} ${className} bg-white shadow-sm pointer-events-auto`}
        style={{ border: '1px solid rgb(207 209 211)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {title && (
          <div className="px-6 py-4 border-b" style={{ borderColor: 'rgb(207 209 211)' }}>
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-slate-800">
                {title}
              </h3>
              {showCloseButton && (
                <button
                  onClick={onClose}
                  className="text-slate-400 hover:text-slate-600 transition-all duration-300 p-2 rounded-full hover:bg-slate-100 flex items-center justify-center group"
                  style={{ border: '1px solid rgb(207 209 211)' }}
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 transform-gpu" style={{ transformOrigin: 'center' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}
        
        {/* Body */}
        <div className={`px-6 py-4 ${contentClassName}`}>
          {children}
        </div>
        

      </div>
    </div>
  );
}

// Componentes auxiliares para facilitar o uso
export function CustomModalHeader({ 
  children, 
  className = '', 
  showCloseButton = true, 
  onClose 
}: { 
  children: React.ReactNode; 
  className?: string;
  showCloseButton?: boolean;
  onClose?: () => void;
}) {
  return (
    <div className={`px-6 py-4 border-b ${className}`} style={{ borderColor: 'rgb(207 209 211)' }}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          {children}
        </div>
        {showCloseButton && onClose && (
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-all duration-300 p-2 rounded-full hover:bg-slate-100 flex items-center justify-center group"
            style={{ border: '1px solid rgb(207 209 211)' }}
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:rotate-90 transform-gpu" style={{ transformOrigin: 'center' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function CustomModalBody({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`px-6 py-4 ${className}`}>
      {children}
    </div>
  );
}

export function CustomModalFooter({ 
  children, 
  className = '' 
}: { 
  children: React.ReactNode; 
  className?: string;
}) {
  return (
    <div className={`px-6 py-4 border-t bg-slate-50 ${className}`} style={{ borderColor: 'rgb(207 209 211)' }}>
      {children}
    </div>
  );
}


