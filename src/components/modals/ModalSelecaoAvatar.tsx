import React from 'react';
import { Modal, ModalBody, ModalFooter } from './Modal';
import { AvatarList } from './AvatarList';
import { Avatar, avataresDisponiveis } from './avatarData';

interface ModalSelecaoAvatarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: Avatar) => void;
}

export function ModalSelecaoAvatar({ isOpen, onClose, onSelect }: ModalSelecaoAvatarProps) {
  const handleAvatarSelect = (avatar: Avatar) => {
    onSelect(avatar);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecionar Avatar"
      size="sm"
      className="modal-selecao-avatar !max-w-[700px] !z-[9999]"
    >
      <ModalBody className="max-h-[60vh] overflow-y-auto p-4">
        <AvatarList 
          avatares={avataresDisponiveis}
          onSelect={handleAvatarSelect}
        />
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200 p-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        >
          Cancelar
        </button>
      </ModalFooter>
    </Modal>
  );
}
