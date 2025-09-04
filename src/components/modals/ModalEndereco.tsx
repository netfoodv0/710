import React, { useState, useEffect } from 'react';
import { FormInput } from '../forms/FormInput';
import { Modal, ModalBody, ModalFooter, useModalClose } from './Modal';

interface EnderecoData {
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  zipCode: string;
}

interface ModalEnderecoProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (endereco: string) => void;
  initialData?: EnderecoData;
}

function ModalFooterContent({ isSubmitting, onClose, onSave }: { isSubmitting: boolean; onClose: () => void; onSave: () => void }) {
  const closeWithAnimation = useModalClose();
  
  return (
    <>
      <button
        type="button"
        onClick={closeWithAnimation}
        className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
        disabled={isSubmitting}
      >
        Cancelar
      </button>
      <button
        type="button"
        onClick={onSave}
        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Salvando...' : 'Confirmar'}
      </button>
    </>
  );
}

export function ModalEndereco({ isOpen, onClose, onSave, initialData }: ModalEnderecoProps) {
  const [formData, setFormData] = useState<EnderecoData>({
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    zipCode: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Preencher formulário quando houver dados iniciais
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } else {
      setFormData({
        street: '',
        number: '',
        complement: '',
        neighborhood: '',
        city: '',
        state: '',
        zipCode: ''
      });
    }
  }, [initialData, isOpen]);

  const handleInputChange = (field: keyof EnderecoData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSubmitting(true);
    try {
      const fullAddress = `${formData.street}, ${formData.number}${formData.complement ? ', ' + formData.complement : ''} - ${formData.neighborhood}, ${formData.city} - ${formData.state}, ${formData.zipCode}`;
      onSave(fullAddress);
      handleClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      street: '',
      number: '',
      complement: '',
      neighborhood: '',
      city: '',
      state: '',
      zipCode: ''
    });
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Endereço de Entrega"
      size="sm"
    >
      <ModalBody className="max-h-[32rem] overflow-y-auto">
        <div className="space-y-4">
          <FormInput
            label="Rua"
            type="text"
            value={formData.street}
            onChange={(value) => handleInputChange('street', value as string)}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Número"
              type="text"
              value={formData.number}
              onChange={(value) => handleInputChange('number', value as string)}
              required
            />
            
            <FormInput
              label="Complemento"
              type="text"
              value={formData.complement}
              onChange={(value) => handleInputChange('complement', value as string)}
            />
          </div>
          
          <FormInput
            label="Bairro"
            type="text"
            value={formData.neighborhood}
            onChange={(value) => handleInputChange('neighborhood', value as string)}
            required
          />
          
          <div className="grid grid-cols-2 gap-4">
            <FormInput
              label="Cidade"
              type="text"
              value={formData.city}
              onChange={(value) => handleInputChange('city', value as string)}
              required
            />
            
            <FormInput
              label="Estado"
              type="text"
              value={formData.state}
              onChange={(value) => handleInputChange('state', value as string)}
              required
            />
          </div>
          
          <FormInput
            label="CEP"
            type="text"
            value={formData.zipCode}
            onChange={(value) => handleInputChange('zipCode', value as string)}
            required
          />
        </div>
      </ModalBody>
      
      <ModalFooter className="sticky bottom-0 bg-white border-t border-gray-200">
        <ModalFooterContent 
          isSubmitting={isSubmitting} 
          onClose={onClose}
          onSave={handleSave}
        />
      </ModalFooter>
    </Modal>
  );
}