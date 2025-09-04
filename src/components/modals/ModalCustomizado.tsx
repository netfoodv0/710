import React, { useState, useEffect, ReactNode } from 'react';
import { Modal, ModalBody, ModalFooter, useModalClose } from './Modal';

// Componente interno para o footer do modal
function ModalFooterContent({ 
  isSubmitting, 
  onClose, 
  submitButtonText, 
  cancelButtonText,
  showSubmitButton = true,
  showCancelButton = true,
  submitButtonVariant = "primary"
}: { 
  isSubmitting: boolean; 
  onClose: () => void; 
  submitButtonText: string;
  cancelButtonText: string;
  showSubmitButton?: boolean;
  showCancelButton?: boolean;
  submitButtonVariant?: "primary" | "secondary" | "danger";
}) {
  const closeWithAnimation = useModalClose();
  
  const getSubmitButtonClasses = () => {
    const baseClasses = "px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed";
    
    switch (submitButtonVariant) {
      case "danger":
        return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
      case "secondary":
        return `${baseClasses} bg-gray-600 text-white hover:bg-gray-700`;
      default:
        return `${baseClasses} bg-purple-600 text-white hover:bg-purple-700`;
    }
  };
  
  return (
    <>
      {showCancelButton && (
        <button
          type="button"
          onClick={closeWithAnimation}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          disabled={isSubmitting}
        >
          {cancelButtonText}
        </button>
      )}
      {showSubmitButton && (
        <button
          type="submit"
          form="modal-form"
          className={getSubmitButtonClasses()}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Processando...' : submitButtonText}
        </button>
      )}
    </>
  );
}

interface ModalCustomizadoProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (formData?: any) => void | Promise<void>;
  title: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  children: ReactNode;
  submitButtonText?: string;
  cancelButtonText?: string;
  showSubmitButton?: boolean;
  showCancelButton?: boolean;
  submitButtonVariant?: "primary" | "secondary" | "danger";
  maxHeight?: string;
  formId?: string;
}

export function ModalCustomizado({ 
  isOpen, 
  onClose, 
  onSubmit, 
  title, 
  size = "md",
  className = "",
  children,
  submitButtonText = "Confirmar",
  cancelButtonText = "Cancelar",
  showSubmitButton = true,
  showCancelButton = true,
  submitButtonVariant = "primary",
  maxHeight = "32rem",
  formId = "modal-form"
}: ModalCustomizadoProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (onSubmit) {
      setIsSubmitting(true);
      try {
        await onSubmit();
        handleClose();
      } catch (error) {
        console.error('Erro ao submeter formulário:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title={title}
      size={size}
      className={className}
    >
      <ModalBody className={`max-h-[${maxHeight}] overflow-y-auto`}>
        {onSubmit ? (
          <form id={formId} onSubmit={handleSubmit} className="space-y-4">
            {children}
          </form>
        ) : (
          <div className="space-y-4">
            {children}
          </div>
        )}
      </ModalBody>
      
      {(showSubmitButton || showCancelButton) && (
        <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
          <ModalFooterContent 
            isSubmitting={isSubmitting} 
            onClose={onClose}
            submitButtonText={submitButtonText}
            cancelButtonText={cancelButtonText}
            showSubmitButton={showSubmitButton}
            showCancelButton={showCancelButton}
            submitButtonVariant={submitButtonVariant}
          />
        </ModalFooter>
      )}
    </Modal>
  );
}

