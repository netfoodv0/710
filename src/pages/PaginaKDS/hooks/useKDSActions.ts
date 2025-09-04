import { useCallback } from 'react';
import { DragEndEvent } from '@dnd-kit/core';

interface UseKDSActionsProps {
  maxColumns: number;
  moverPedido: (pedidoId: string, novaColuna: string) => void;
}

export function useKDSActions({ maxColumns, moverPedido }: UseKDSActionsProps) {
  // Função para lidar com o fim do drag and drop
  const handleDragEnd = useCallback((event: DragEndEvent) => {
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
  }, [maxColumns, moverPedido]);

  return {
    handleDragEnd
  };
}
