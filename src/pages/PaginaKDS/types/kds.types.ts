import { Pedido } from '../../../types';

// Tipo para pedido com coluna (usado no KDS)
export type PedidoComColuna = Pedido & { 
  coluna: string;
};

// Status dos itens no KDS
export type ItemStatus = 'pendente' | 'preparando' | 'pronto';

// Interface para item detalhado com status
export interface ItemDetalhadoComStatus {
  nome: string;
  quantidade: number;
  preco: number;
  status?: ItemStatus;
  adicionais?: {
    nome: string;
    quantidade: number;
    preco: number;
  }[];
}

// Interface para pedido KDS com itens detalhados
export interface PedidoKDS extends Omit<Pedido, 'itensDetalhados'> {
  itensDetalhados?: ItemDetalhadoComStatus[];
  coluna: string;
}

// Props para componentes KDS
export interface KDSContentProps {
  maxColumns: number;
  pedidos: PedidoComColuna[];
  onDragEnd: (event: any) => void;
}

export interface KDSGridProps {
  maxColumns: number;
  pedidos: PedidoComColuna[];
  onDragEnd: (event: any) => void;
}

// Hook return types
export interface UsePedidosKDSReturn {
  pedidos: PedidoComColuna[];
  moverPedido: (pedidoId: string, novaColuna: string) => void;
  atualizarStatusItem: (pedidoId: string, itemNome: string, novoStatus: ItemStatus) => void;
  prepararTodosItens: (pedidoId: string) => void;
  finalizarTodosItens: (pedidoId: string) => void;
}
