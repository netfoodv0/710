import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { usePedidosActions } from '../hooks/usePedidosActions';
import { PedidosContent } from '../components/pedidos';
import { CabecalhoCustom } from '../components/ui';
import { PedidosSessaoSkeleton } from '../components/skeletons/PedidosSkeleton';
import './Pedidos.css';

export default function Pedidos() {
  const [state, actions] = usePedidosActions();
  const { pedidos, loading, searchTerm, isCreating } = state;
  const {
    handleAceitar,
    handleAvançar,
    handleFinalizar,
    handleRecusar,
    handleSearchChange,
    handleClearSearch,
    handleSearchSubmit,
    handleCriarPedidoFicticio
  } = actions;
  
  const showSkeleton = useSkeletonDelay({ delay: 600 });

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Cabeçalho da página */}
        <CabecalhoCustom
          title="Pedidos"
          showSearch={true}
          searchTerm={searchTerm}
          searchPlaceholder="Buscar (nome, telefone ou id do pedido)"
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          onSearchSubmit={handleSearchSubmit}
          showActionButton={true}
          actionButtonLabel="Novo Pedido"
          actionButtonVariant="primary"
          actionButtonSize="md"
          onActionButtonClick={handleCriarPedidoFicticio}
          actionButtonLoading={isCreating}
          actionButtonDisabled={isCreating}
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
              onAceitar={handleAceitar}
              onAvançar={handleAvançar}
              onFinalizar={handleFinalizar}
              onRecusar={handleRecusar}
            />
          )}
        </div>
      </div>
    </ErrorBoundary>
  );
}