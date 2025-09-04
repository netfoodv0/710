import React, { useState } from 'react';
import { FormInput } from '../forms/FormInput';
import { Modal, ModalBody, ModalFooter, useModalClose } from './Modal';

interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  vehicle: string;
  available: boolean;
}

interface ModalSelecaoMotoboyProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (motoboy: DeliveryPerson) => void;
  motoboys: DeliveryPerson[];
  selectedMotoboy: DeliveryPerson | null;
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
        Fechar
      </button>
    </>
  );
}

export function ModalSelecaoMotoboy({ isOpen, onClose, onSelect, motoboys, selectedMotoboy }: ModalSelecaoMotoboyProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filtrar motoboys com base no termo de pesquisa
  const filteredMotoboys = motoboys.filter(motoboy => 
    motoboy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    motoboy.phone.includes(searchTerm)
  );

  const handleMotoboySelect = (motoboy: DeliveryPerson) => {
    onSelect(motoboy);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Selecionar Motoboy"
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
            {filteredMotoboys.length > 0 ? (
              filteredMotoboys.map(motoboy => (
                <div
                  key={motoboy.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedMotoboy?.id === motoboy.id
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                  onClick={() => handleMotoboySelect(motoboy)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-gray-900">{motoboy.name}</span>
                    <span className="text-sm text-gray-500">{motoboy.vehicle}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    {motoboy.phone}
                  </div>
                  <div className="mt-2">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      motoboy.available 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {motoboy.available ? 'Disponível' : 'Indisponível'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Nenhum motoboy encontrado
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