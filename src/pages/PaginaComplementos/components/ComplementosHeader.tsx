import React from 'react';
import { Package, Plus } from 'lucide-react';
import { ActionButton } from '../../../components/ui';

interface ComplementosHeaderProps {
  onCreateComplemento?: () => void;
  onCreateCategoria?: () => void;
}

export function ComplementosHeader({ 
  onCreateComplemento, 
  onCreateCategoria 
}: ComplementosHeaderProps) {
  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <Package className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Complementos</h1>
            <p className="text-sm text-gray-600">Gerencie os complementos dos seus produtos</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          {onCreateCategoria && (
            <ActionButton
              label="Nova Categoria"
              onClick={onCreateCategoria}
              variant="secondary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
            />
          )}
          {onCreateComplemento && (
            <ActionButton
              label="Novo Complemento"
              onClick={onCreateComplemento}
              variant="primary"
              size="sm"
              icon={<Plus className="w-4 h-4" />}
            />
          )}
        </div>
      </div>
    </div>
  );
}









