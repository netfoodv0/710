import React, { useState, useEffect } from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { useNotificationContext } from '../context/notificationContextUtils';
import { NotificationToast } from '../components/NotificationToast';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageHeader } from '../components/ui';
import { usePeriod } from '../context/periodContext';
import { useSkeletonDelay } from '../hooks/useSkeletonDelay';
import { useResponsiveColumns } from '../hooks/useResponsiveColumns';
import { usePedidosKDS } from '../hooks/usePedidosKDS';
import { DragEndEvent } from '@dnd-kit/core';
import { KDSContent } from '../components/kds';

export default function KDSPage() {
  // Hook para calcular colunas responsivas
  const maxColumns = useResponsiveColumns();
  
  // Hook para gerenciar pedidos
  const { pedidos, moverPedido } = usePedidosKDS(maxColumns);

  // Função para lidar com o fim do drag and drop
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const pedidoId = active.id.toString().replace('pedido-', '');
      const novaColuna = over.id.toString();
      
      // Encontra a coluna mais próxima se não for uma coluna válida
      let colunaFinal = novaColuna;
      if (!novaColuna.startsWith('coluna-')) {
        // Se não for uma coluna, encontra a mais próxima baseada na posição
        const colunas = Array.from({ length: maxColumns }, (_, i) => `coluna-${i + 1}`);
        colunaFinal = colunas[0]; // Por padrão, vai para a primeira coluna
      }
      
      moverPedido(pedidoId, colunaFinal);
      console.log('Card movido:', pedidoId, 'para coluna:', colunaFinal);
    }
  };

  return (
    <ErrorBoundary>
      <main className="h-screen flex flex-col overflow-hidden dashboard-container" role="main">
        {/* Cabeçalho da página */}
        <PageHeader
          title="KDS"
          subtitle="Kitchen Display System"
        />

        {/* Conteúdo com cards de pedidos */}
        <KDSContent 
          maxColumns={maxColumns}
          pedidos={pedidos}
          onDragEnd={handleDragEnd}
        />
      </main>
    </ErrorBoundary>
  );
}
