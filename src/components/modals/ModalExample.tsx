import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalSize } from './Modal';

export function ModalExample() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalSize, setModalSize] = useState<ModalSize>('lg');

  const openModal = (size: ModalSize) => {
    setModalSize(size);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-6 space-y-4">
      <h2 className="text-2xl font-bold mb-6">Exemplos de Modal</h2>
      
      {/* Botões para abrir modais */}
      <div className="flex flex-wrap gap-4">
        <button
          onClick={() => openModal('sm')}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Modal Pequeno
        </button>
        
        <button
          onClick={() => openModal('lg')}
          className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
        >
          Modal Grande
        </button>
        
        <button
          onClick={() => openModal('xl')}
          className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
        >
          Modal Extra Grande
        </button>
      </div>

      {/* Modal */}
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        title={`Modal ${modalSize.toUpperCase()}`}
        size={modalSize}
      >
        <ModalBody>
          <p className="text-gray-600 mb-4">
            Este é um exemplo de modal {modalSize === 'sm' ? 'pequeno' : modalSize === 'lg' ? 'grande' : 'extra grande'}.
          </p>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-semibold mb-2">Conteúdo do Modal</h4>
            <p className="text-sm text-gray-600">
              Você pode usar os componentes auxiliares ModalHeader, ModalBody e ModalFooter 
              para organizar melhor o conteúdo do seu modal.
            </p>
          </div>
          
          {modalSize === 'xl' && (
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h5 className="font-medium text-blue-800">Seção 1</h5>
                <p className="text-sm text-blue-600">Conteúdo adicional para modais extra grandes</p>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-800">Seção 2</h5>
                <p className="text-sm text-green-600">Mais espaço para organizar informações</p>
              </div>
            </div>
          )}
        </ModalBody>
        
        <ModalFooter>
          <button
            onClick={closeModal}
            className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={closeModal}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Confirmar
          </button>
        </ModalFooter>
      </Modal>
    </div>
  );
}
