import { Pedido, StatusPedido } from '../types';
import { firebasePedidoService } from '../../../services/firebasePedidoService';

export interface PedidoHistorico extends Pedido {
  dataAlteracao: Date;
  statusAnterior?: StatusPedido;
  observacao?: string;
}

class PedidoService {
  // Obter todos os pedidos
  async obterTodosPedidos(): Promise<Pedido[]> {
    try {
      return await firebasePedidoService.buscarPedidos();
    } catch (error) {
      console.error('Erro ao obter pedidos:', error);
      throw new Error('Falha ao carregar pedidos');
    }
  }

  // Obter pedidos por status
  async obterPedidosPorStatus(status: StatusPedido): Promise<Pedido[]> {
    try {
      return await firebasePedidoService.buscarPedidos({ status });
    } catch (error) {
      console.error('Erro ao obter pedidos por status:', error);
      throw new Error('Falha ao carregar pedidos');
    }
  }

  // Obter pedido por ID
  async obterPedidoPorId(id: string): Promise<Pedido | null> {
    try {
      return await firebasePedidoService.buscarPedido(id);
    } catch (error) {
      console.error('Erro ao obter pedido por ID:', error);
      throw new Error('Falha ao carregar pedido');
    }
  }

  // Atualizar status do pedido
  async atualizarStatus(pedidoId: string, novoStatus: StatusPedido, observacao?: string): Promise<Pedido | null> {
    try {
      await firebasePedidoService.atualizarStatusPedido(pedidoId, novoStatus);
      
      // Buscar pedido atualizado
      const pedidoAtualizado = await this.obterPedidoPorId(pedidoId);
      return pedidoAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      throw new Error('Falha ao atualizar status do pedido');
    }
  }

  // Cancelar pedido
  async cancelarPedido(pedidoId: string, motivo?: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'cancelado', motivo || 'Pedido cancelado');
  }

  // Aceitar pedido (novo -> preparando)
  async aceitarPedido(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'preparando', 'Pedido aceito e em preparo');
  }

  // Recusar pedido (qualquer status -> cancelado)
  async recusarPedido(pedidoId: string, motivo?: string): Promise<Pedido | null> {
    return this.cancelarPedido(pedidoId, motivo || 'Pedido recusado');
  }

  // Avançar pedido (confirmado -> preparando)
  async avancarParaPreparo(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'preparando', 'Pedido em preparo');
  }

  // Avançar pedido (preparando -> saiu_entrega)
  async avancarParaEntrega(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'saiu_entrega', 'Pedido saiu para entrega');
  }

  // Finalizar pedido (saiu_entrega -> entregue)
  async finalizarPedido(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'entregue', 'Pedido entregue');
  }

  // Obter pedidos entregues (histórico)
  async obterPedidosEntregues(): Promise<Pedido[]> {
    try {
      return await firebasePedidoService.buscarHistoricoPedidos({ status: 'entregue' });
    } catch (error) {
      console.error('Erro ao obter pedidos entregues:', error);
      throw new Error('Falha ao carregar histórico de pedidos');
    }
  }

  // Estatísticas
  async obterEstatisticas() {
    try {
      const todosPedidos = await this.obterTodosPedidos();
      const total = todosPedidos.length;
      const porStatus = {
        novo: todosPedidos.filter(p => p.status === 'novo').length,
        confirmado: todosPedidos.filter(p => p.status === 'confirmado').length,
        preparando: todosPedidos.filter(p => p.status === 'preparando').length,
        saiu_entrega: todosPedidos.filter(p => p.status === 'saiu_entrega').length,
        entregue: todosPedidos.filter(p => p.status === 'entregue').length,
        cancelado: todosPedidos.filter(p => p.status === 'cancelado').length
      };

      return { total, porStatus };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }
}

export const pedidoService = new PedidoService(); 