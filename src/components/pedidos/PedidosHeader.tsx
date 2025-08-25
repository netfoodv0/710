import React from 'react';
import { Plus } from 'lucide-react';
import { PageHeader, ActionButton } from '../ui';
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
          <ActionButton
            label="Novo Pedido"
            onClick={onCreatePedido}
            loading={isCreating}
            disabled={isCreating}
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
          />
        </div>
      }
    />
  );
};
