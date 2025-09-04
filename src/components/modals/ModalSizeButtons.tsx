import React from 'react';
import { ModalSize } from '../../types/global/modal';

interface ModalSizeButtonsProps {
  modalSize: ModalSize;
  onSizeChange: (size: ModalSize) => void;
}

export const ModalSizeButtons: React.FC<ModalSizeButtonsProps> = ({
  modalSize,
  onSizeChange
}) => {
  const sizes: ModalSize[] = ['sm', 'md', 'lg', 'xl', 'full'];

  return (
    <div className="flex gap-2">
      {sizes.map((size) => (
        <button
          key={size}
          onClick={() => onSizeChange(size)}
          className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
            modalSize === size
              ? 'bg-purple-600 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          {size.toUpperCase()}
        </button>
      ))}
    </div>
  );
};




