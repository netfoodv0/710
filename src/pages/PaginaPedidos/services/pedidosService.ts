// Service para gerenciar dados dos pedidos
// Conectado ao Firebase para dados reais

import { firebasePedidoService } from '../../../services/firebasePedidoService';
import { Pedido } from '../../../types/global/pedidos';

export interface PedidosServiceData {
  pedidos: Pedido[];
}

class PedidosService {
  async obterPedidos(): Promise<Pedido[]> {
    try {
      // Buscar todos os pedidos ativos (sem filtro de status para mostrar todos)
      const pedidos = await firebasePedidoService.buscarPedidos({
        limit: 50
      });
      
      console.log('Pedidos carregados do Firebase:', pedidos.length);
      return pedidos;
    } catch (error) {
      console.error('Erro ao obter pedidos:', error);
      throw error;
    }
  }

  obterPedidosTempoReal(lojaId: string, callback: (pedidos: Pedido[]) => void): () => void {
    try {
      console.log('🔧 PedidosService - lojaId recebido:', lojaId);
      
      if (!lojaId) {
        console.error('❌ PedidosService - lojaId é null/undefined');
        callback([]);
        return () => {};
      }
      
      // Configurar listener em tempo real
      const unsubscribe = firebasePedidoService.buscarPedidosTempoReal({
        limit: 50
      }, callback);
      
      console.log('✅ Listener em tempo real configurado para pedidos');
      return unsubscribe;
    } catch (error) {
      console.error('❌ Erro ao configurar listener em tempo real:', error);
      throw error;
    }
  }

  async aceitarPedido(id: string): Promise<void> {
    try {
      await firebasePedidoService.atualizarStatusPedido(id, 'confirmado');
      console.log('Pedido aceito:', id);
    } catch (error) {
      console.error('Erro ao aceitar pedido:', error);
      throw error;
    }
  }

  async avancarPedido(id: string): Promise<void> {
    try {
      console.log('🔄 PedidosService - Avançando pedido:', id, 'para status: pronto');
      await firebasePedidoService.atualizarStatusPedido(id, 'pronto');
      console.log('✅ PedidosService - Pedido avançado com sucesso:', id);
    } catch (error) {
      console.error('❌ PedidosService - Erro ao avançar pedido:', error);
      throw error;
    }
  }

  async finalizarPedido(id: string): Promise<void> {
    try {
      console.log('🔄 PedidosService - Finalizando pedido:', id, 'movendo para histórico');
      
      // Buscar o pedido completo
      const pedido = await firebasePedidoService.buscarPedido(id);
      if (!pedido) {
        throw new Error('Pedido não encontrado');
      }
      
      // Mover para histórico
      await firebasePedidoService.moverParaHistorico(pedido);
      
      console.log('✅ PedidosService - Pedido movido para histórico com sucesso:', id);
    } catch (error) {
      console.error('❌ PedidosService - Erro ao finalizar pedido:', error);
      throw error;
    }
  }

  async recusarPedido(id: string): Promise<void> {
    try {
      await firebasePedidoService.atualizarStatusPedido(id, 'cancelado');
      console.log('Pedido recusado:', id);
    } catch (error) {
      console.error('Erro ao recusar pedido:', error);
      throw error;
    }
  }

  async criarPedidoFicticio(): Promise<void> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Por enquanto, apenas log
      console.log('Pedido fictício criado');
    } catch (error) {
      console.error('Erro ao criar pedido fictício:', error);
      throw error;
    }
  }
}

export const pedidosService = new PedidosService();


