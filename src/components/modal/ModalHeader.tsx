import React from 'react';
import { ModalIcon } from '../ui/ModalIcon';

export const ModalHeader: React.FC = () => {
  return (
    <div className="flex items-center gap-3">
      <ModalIcon size={32} color="#8217d5" />
      <h1 className="text-3xl font-bold text-slate-900">Modal</h1>
    </div>
  );
};
