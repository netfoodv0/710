import React from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { usePedidosActions } from '../hooks/usePedidosActions';
import { PedidosHeader, PedidosContent } from '../components/pedidos';
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
      <div className="min-h-screen bg-dashboard">
        {/* Cabeçalho da página */}
        <PedidosHeader
          searchTerm={searchTerm}
          isCreating={isCreating}
          onSearchChange={handleSearchChange}
          onClearSearch={handleClearSearch}
          onSearchSubmit={handleSearchSubmit}
          onCreatePedido={handleCriarPedidoFicticio}
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