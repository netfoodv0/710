import React, { useState, useEffect } from 'react';
import { FormInput } from '../forms/FormInput';
import { Modal, ModalBody, ModalFooter, useModalClose } from './Modal';

interface Cliente {
  id: number;
  name: string;
  phone: string;
  address: string;
}

interface ModalSelecaoClienteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (cliente: Cliente) => void;
  clientes: Cliente[];
}

function ModalFooterContent({ onClose }: { onClose: () => void }) {
  const closeWithAnimation = useModalClose();
  
  return (
    <>
      <button
        type="button"
        onClick={closeWithAnimation}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        Cancelar
      </button>
    </>
  );
}

export function ModalSelecaoCliente({ isOpen, onClose, onSelect, clientes }: ModalSelecaoClienteProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar clientes com base no termo de pesquisa
  const filteredClientes = clientes.filter(cliente => 
    cliente.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    cliente.phone.includes(searchTerm)
  );

  const handleClienteSelect = (cliente: Cliente) => {
    onSelect(cliente);
    onClose();
  };

  // Resetar o termo de busca quando o modal é fechado
  useEffect(() => {
    if (!isOpen) {
      setSearchTerm('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecionar Cliente"
      size="sm"
    >
      <ModalBody className="max-h-[32rem] overflow-y-auto">
        <div className="space-y-4">
          <FormInput
            label="Pesquisar"
            type="search"
            placeholder="Pesquisar por nome ou telefone..."
            value={searchTerm}
            onChange={(value) => setSearchTerm(value as string)}
          />
          
          <div className="space-y-2">
            {filteredClientes.length > 0 ? (
              filteredClientes.map(cliente => (
                <div
                  key={cliente.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                  onClick={() => handleClienteSelect(cliente)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{cliente.name}</span>
                    <span className="text-sm text-gray-500">{cliente.phone}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1 truncate">
                    {cliente.address}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhum cliente encontrado
              </div>
            )}
          </div>
        </div>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <ModalFooterContent onClose={onClose} />
      </ModalFooter>
    </Modal>
  );
}