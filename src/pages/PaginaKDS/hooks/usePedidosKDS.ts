import { useState, useEffect } from 'react';
import { PedidoComColuna, ItemStatus, UsePedidosKDSReturn } from '../types';
import { mockPedidos } from '../../../data/mockPedidos';

export function usePedidosKDS(maxColumns: number): UsePedidosKDSReturn {
  const [pedidos, setPedidos] = useState<PedidoComColuna[]>(mockPedidos);

  // Reorganiza automaticamente os pedidos quando o número de colunas mudar
  useEffect(() => {
    const reorganizarPedidos = () => {
      setPedidos(prev => {
        const pedidosAtualizados = [...prev];
        
        // Redistribui os pedidos baseado no número atual de colunas
        pedidosAtualizados.forEach((pedido, index) => {
          const colunaDestino = (index % maxColumns) + 1;
          pedido.coluna = `coluna-${colunaDestino}`;
        });
        
        return pedidosAtualizados;
      });
    };

    reorganizarPedidos();
  }, [maxColumns]);

  // Função para mover um pedido para uma nova coluna
  const moverPedido = (pedidoId: string, novaColuna: string) => {
    setPedidos(prev => prev.map(pedido => 
      pedido.id === pedidoId 
        ? { ...pedido, coluna: novaColuna }
        : pedido
    ));
  };

  // Função para atualizar o status de um item
  const atualizarStatusItem = (pedidoId: string, itemNome: string, novoStatus: ItemStatus) => {
    setPedidos(prev => prev.map(pedido => {
      if (pedido.id === pedidoId) {
        return {
          ...pedido,
          itensDetalhados: pedido.itensDetalhados?.map(item => 
            item.nome === itemNome 
              ? { ...item, status: novoStatus }
              : item
          )
        };
      }
      return pedido;
    }));
  };

  // Função para preparar todos os itens de um pedido
  const prepararTodosItens = (pedidoId: string) => {
    setPedidos(prev => prev.map(pedido => {
      if (pedido.id === pedidoId) {
        return {
          ...pedido,
          itensDetalhados: pedido.itensDetalhados?.map(item => ({
            ...item,
            status: 'preparando' as const
          }))
        };
      }
      return pedido;
    }));
  };

  // Função para finalizar todos os itens de um pedido
  const finalizarTodosItens = (pedidoId: string) => {
    setPedidos(prev => prev.map(pedido => {
      if (pedido.id === pedidoId) {
        return {
          ...pedido,
          itensDetalhados: pedido.itensDetalhados?.map(item => ({
            ...item,
            status: 'pronto' as const
          }))
        };
      }
      return pedido;
    }));
  };

  return {
    pedidos,
    moverPedido,
    atualizarStatusItem,
    prepararTodosItens,
    finalizarTodosItens
  };
}
