import React from 'react';
import { ModalSize } from '../../types/modal';

interface ModalSizeButtonsProps {
  modalSize: ModalSize;
  onSizeChange: (size: ModalSize) => void;
}

export const ModalSizeButtons: React.FC<ModalSizeButtonsProps> = ({
  modalSize,
  onSizeChange
}) => {
  const sizes: { value: ModalSize; label: string }[] = [
    { value: 'small', label: 'Pequeno' },
    { value: 'medium', label: 'Médio' },
    { value: 'large', label: 'Grande' }
  ];

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size.value}
          onClick={() => onSizeChange(size.value)}
          className={`px-3 py-1 text-sm rounded border transition-colors ${
            modalSize === size.value 
              ? 'bg-purple-600 text-white border-purple-600' 
              : 'bg-white text-slate-600 border-slate-300 hover:bg-slate-50'
          }`}
        >
          {size.label}
        </button>
      ))}
    </div>
  );
};
