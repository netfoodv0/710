import React from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { useSkeletonDelay } from '../../PaginaDashboard/hooks';
import { PedidosContent } from '../../../components/pedidos';
import { CabecalhoCustom } from '../../../components/ui';
import { PedidosSessaoSkeleton } from '../../../components/skeletons/PedidosSkeleton';
import { ShoppingCart } from 'lucide-react';
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
  onSearchSubmit,
  onOpenPDV
}: PedidosLayoutProps) {
  const { pedidos, loading, searchTerm, isCreating } = data;
  const showSkeleton = useSkeletonDelay({ delay: 600 });

  // Botões para o cabeçalho
  const headerButtons = (
    <div className="flex gap-2">
      <CaixaButton 
        className="h-10"
        size="md"
        variant="primary"
      />
      <button
        onClick={onOpenPDV}
        className="inline-flex items-center gap-2 px-4 bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium text-sm"
        style={{ height: '40px', borderRadius: '4px' }}
        title="Abrir PDV - Sistema de Ponto de Venda"
      >
        <ShoppingCart className="w-4 h-4" />
        Novo Pedido
      </button>
    </div>
  );

  return (
    <ErrorBoundary>
      <CaixaModalsProvider>
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
            showActionButton={false}
            rightContent={headerButtons}
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
          
          {/* Modais de Caixa */}
          <CaixaModals />
        </div>
      </CaixaModalsProvider>
    </ErrorBoundary>
  );
}
