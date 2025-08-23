import React from 'react';
import { Search, X } from 'lucide-react';

interface PedidosSearchBarProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearSearch: () => void;
  onSubmit: (e: React.FormEvent) => void;
}

export const PedidosSearchBar: React.FC<PedidosSearchBarProps> = ({
  searchTerm,
  onSearchChange,
  onClearSearch,
  onSubmit
}) => {
  return (
    <div className="flex items-center gap-4">
      <div className="space-y-1 min-w-0">
        <h1 className="text-lg font-bold text-gray-800 leading-tight drop-shadow-sm">Pedidos</h1>
      </div>
      
      {/* Barra de pesquisa */}
      <form onSubmit={onSubmit} className="search-bar-container">
        <div className="relative">
          <Search className="search-icon w-4 h-4" />
          <input
            type="text"
            placeholder="Buscar (nome, telefone ou id do pedido)"
            value={searchTerm}
            onChange={onSearchChange}
            className="search-input"
          />
          {searchTerm && (
            <button
              type="button"
              onClick={onClearSearch}
              className="clear-button"
              title="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
