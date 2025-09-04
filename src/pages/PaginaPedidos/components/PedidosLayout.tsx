import React from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useSkeletonDelay } from '../../PaginaDashboard/hooks';
import { PedidosContent } from '../../../components/pedidos';
import { CabecalhoCustom } from '../../../components/ui';
import { PedidosSessaoSkeleton } from '../../../components/skeletons/PedidosSkeleton';
import { ShoppingCart } from 'lucide-react';
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
  onSearchSubmit,
  onCriarPedidoFicticio,
  onOpenPDV
}: PedidosLayoutProps) {
  const { pedidos, loading, searchTerm, isCreating } = data;
  const showSkeleton = useSkeletonDelay({ delay: 600 });

  // Botão do PDV para o cabeçalho
  const pdvButton = (
    <button
      onClick={onOpenPDV}
      className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium text-sm"
      title="Abrir PDV - Sistema de Ponto de Venda"
    >
      <ShoppingCart className="w-4 h-4" />
      PDV
    </button>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Cabeçalho da página */}
        <CabecalhoCustom
          title="Pedidos"
          showSearch={true}
          searchTerm={searchTerm}
          searchPlaceholder="Buscar (nome, telefone ou id do pedido)"
          onSearchChange={onSearchChange}
          onClearSearch={onClearSearch}
          onSearchSubmit={onSearchSubmit}
          showActionButton={true}
          actionButtonLabel="Novo Pedido"
          actionButtonVariant="primary"
          actionButtonSize="md"
          onActionButtonClick={onCriarPedidoFicticio}
          actionButtonLoading={isCreating}
          actionButtonDisabled={isCreating}
          rightContent={pdvButton}
        />
        
        {/* Conteúdo da página */}
        <div className="pt-4">
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
      </div>
    </ErrorBoundary>
  );
}
