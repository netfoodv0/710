import React, { ReactNode } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';

interface ModalGlobalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  maxHeight?: string;
  showCloseButton?: boolean;
}

export function ModalGlobal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  className = '',
  maxHeight = '32rem',
  showCloseButton = true
}: ModalGlobalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size={size}
      className={`modal-global ${className}`}
    >
      <ModalBody className={`max-h-[${maxHeight}] overflow-y-auto`}>
        {children}
      </ModalBody>
      
      {footer && (
        <ModalFooter>
          {footer}
        </ModalFooter>
      )}
    </Modal>
  );
}
