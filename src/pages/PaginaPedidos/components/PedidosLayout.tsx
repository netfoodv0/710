import React from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useSkeletonDelay } from '../../PaginaDashboard/hooks';
import { PedidosContent } from '../../../components/pedidos';
import { FixedPageHeader } from '../../../components/ui';
import { PedidosSessaoSkeleton } from '../../../components/skeletons/PedidosSkeleton';
import { Search, X } from 'lucide-react';
import { CaixaButton, CaixaModals, CaixaModalsProvider } from '../../PaginaCaixa';
import { PedidosLayoutProps } from '../types';
import '../Pedidos.css';

export function PedidosLayout({ 
  data, 
  onAceitar,
  onAvançar,
  onFinalizar,
  onRecusar,
  onSearchChange,
  onClearSearch,
  onSearchSubmit
}: PedidosLayoutProps) {
  const { pedidos, loading, searchTerm, isCreating } = data;
  const showSkeleton = useSkeletonDelay({ delay: 600 });

  // Conteúdo da esquerda: Título e busca
  const leftContent = (
    <div className="flex items-center gap-4">
      <h1 className="text-sm text-gray-900">Pedidos</h1>
      
      {/* Barra de pesquisa */}
      <form onSubmit={onSearchSubmit} className="search-bar-container">
        <div className="relative">
          <Search className="search-icon w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar (nome, telefone ou id do pedido)"
            value={searchTerm}
            onChange={onSearchChange}
            className="search-input pl-10 pr-10 py-1 w-64 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors text-sm"
          />
          {searchTerm && onClearSearch && (
            <button
              type="button"
              onClick={onClearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 transition-colors"
              title="Limpar pesquisa"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </form>
    </div>
  );

  // Botões para o cabeçalho - Altura reduzida
  const rightContent = (
    <div className="flex gap-2">
      <CaixaButton 
        size="sm"
        variant="primary"
      />
    </div>
  );

  return (
    <ErrorBoundary>
      <CaixaModalsProvider>
        <div className="min-h-screen">
          {/* Cabeçalho fixo */}
          <FixedPageHeader
            leftContent={leftContent}
            rightContent={rightContent}
            height={50}
          />
          
          {/* Espaço para não sobrepor o conteúdo */}
          <div className="h-[50px]" />
          
          {/* Conteúdo da página */}
          <div>
            {/* Loading otimizado para pedidos */}
            {loading || showSkeleton ? (
              <PedidosSessaoSkeleton />
            ) : (
              <PedidosContent
                pedidos={pedidos}
                loading={loading}
                onAceitar={onAceitar}
                onAvançar={onAvançar}
                onFinalizar={onFinalizar}
                onRecusar={onRecusar}
              />
            )}
          </div>
          
          {/* Modais de Caixa */}
          <CaixaModals />
        </div>
      </CaixaModalsProvider>
    </ErrorBoundary>
  );
}
