import React from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { PageHeader } from '../ui';
import { PedidosSearchBar } from './PedidosSearchBar';

interface PedidosHeaderProps {
  searchTerm: string;
  isCreating: boolean;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onSearchSubmit: (e: React.FormEvent) => void;
  onCreatePedido: () => Promise<void>;
}

export const PedidosHeader: React.FC<PedidosHeaderProps> = ({
  searchTerm,
  isCreating,
  onSearchChange,
  onClearSearch,
  onSearchSubmit,
  onCreatePedido
}) => {
  return (
    <PageHeader
      title="Pedidos"
      leftContent={
        <PedidosSearchBar
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onClearSearch={onClearSearch}
          onSubmit={onSearchSubmit}
        />
      }
      rightContent={
        <div className="flex items-center gap-4">
          {/* Botão Novo Pedido */}
          <button
            onClick={onCreatePedido}
            disabled={isCreating}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isCreating ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
            Novo Pedido
          </button>
        </div>
      }
    />
  );
};
