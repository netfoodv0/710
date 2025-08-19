import { 
  getCountFromServer,
  Timestamp
} from 'firebase/firestore';
import { BaseFirestoreService } from './firebase/BaseFirestoreService';

export interface ClienteCategoria {
  telefone: string;
  nome: string;
  totalPedidos: number;
  valorTotal: number;
  primeiroPedido: Date;
  ultimoPedido: Date;
  categoria: 'curiosos' | 'novatos' | 'fieis' | 'super_clientes';
  // Categorização baseada APENAS no número de pedidos:
  // - curiosos: 0 pedidos (nunca fizeram pedido)
  // - novatos: 1 pedido
  // - fieis: 2-5 pedidos  
  // - super_clientes: >5 pedidos
}

export interface EstatisticasClientes {
  curiosos: number;
  novatos: number;
  fieis: number;
  super_clientes: number;
  totalClientes: number;
  novosClientes?: number;
  taxaRetencao?: number;
}

export class FirebaseClientesService extends BaseFirestoreService {

  // Método auxiliar para obter o ID da loja do usuário autenticado
  private getLojaId(): string {
    return super.getLojaId();
  }

  /**
   * Busca todos os clientes únicos baseado nos pedidos
   * Categorização:
   * - Curiosos: 0 pedidos (nunca fizeram pedido)
   * - Novatos: 1 pedido
   * - Fiéis: 2-5 pedidos
   * - Super Clientes: >5 pedidos
   */
  async buscarClientesUnicos(): Promise<ClienteCategoria[]> {
    try {
      const lojaId = this.getLojaId();
      
      // Buscar pedidos ativos
      const pedidosSnapshot = await this.executeQuery('pedidos');
      
      // Buscar histórico de pedidos
      const historicoSnapshot = await this.executeQuery('historicoPedidos');
      
      // Mapear clientes únicos
      const clientesMap = new Map<string, ClienteCategoria>();
      
      // Processar pedidos ativos
      pedidosSnapshot.forEach(doc => {
        const pedido = doc.data();
        const telefone = pedido.cliente?.telefone;
        const nome = pedido.cliente?.nome || 'Cliente';
        
        if (telefone) {
          if (clientesMap.has(telefone)) {
            const cliente = clientesMap.get(telefone)!;
            cliente.totalPedidos++;
            cliente.valorTotal += pedido.total || 0;
            if (pedido.dataHora) {
              const dataPedido = pedido.dataHora.toDate ? pedido.dataHora.toDate() : new Date(pedido.dataHora);
              if (dataPedido > cliente.ultimoPedido) {
                cliente.ultimoPedido = dataPedido;
              }
            }
          } else {
            const dataPedido = pedido.dataHora?.toDate ? pedido.dataHora.toDate() : new Date(pedido.dataHora);
            clientesMap.set(telefone, {
              telefone,
              nome,
              totalPedidos: 1,
              valorTotal: pedido.total || 0,
              primeiroPedido: dataPedido,
              ultimoPedido: dataPedido,
              categoria: 'curiosos' // Será categorizado depois
            });
          }
        }
      });
      
      // Processar histórico de pedidos
      historicoSnapshot.forEach(doc => {
        const pedido = doc.data();
        const telefone = pedido.cliente?.telefone;
        const nome = pedido.cliente?.nome || 'Cliente';
        
        if (telefone) {
          if (clientesMap.has(telefone)) {
            const cliente = clientesMap.get(telefone)!;
            cliente.totalPedidos++;
            cliente.valorTotal += pedido.total || 0;
            if (pedido.dataHora) {
              const dataPedido = pedido.dataHora.toDate ? pedido.dataHora.toDate() : new Date(pedido.dataHora);
              if (dataPedido < cliente.primeiroPedido) {
                cliente.primeiroPedido = dataPedido;
              }
              if (dataPedido > cliente.ultimoPedido) {
                cliente.ultimoPedido = dataPedido;
              }
            }
          } else {
            const dataPedido = pedido.dataHora?.toDate ? pedido.dataHora.toDate() : new Date(pedido.dataHora);
            clientesMap.set(telefone, {
              telefone,
              nome,
              totalPedidos: 1,
              valorTotal: pedido.total || 0,
              primeiroPedido: dataPedido,
              ultimoPedido: dataPedido,
              categoria: 'curiosos' // Será categorizado depois
            });
          }
        }
      });
      
      // Categorizar clientes
      const clientes = Array.from(clientesMap.values());
      const clientesCategorizados = this.categorizarClientes(clientes);
      
      return clientesCategorizados;
    } catch (error) {
      console.error('Erro ao buscar clientes:', error);
      throw error;
    }
  }

  /**
   * Categoriza os clientes baseado APENAS no número de pedidos
   */
  private categorizarClientes(clientes: ClienteCategoria[]): ClienteCategoria[] {
    return clientes.map(cliente => {
      // Categorização baseada APENAS no total de pedidos
      if (cliente.totalPedidos > 5) {
        cliente.categoria = 'super_clientes';
      }
      else if (cliente.totalPedidos >= 2 && cliente.totalPedidos <= 5) {
        cliente.categoria = 'fieis';
      }
      else if (cliente.totalPedidos === 1) {
        cliente.categoria = 'novatos';
      }
      else {
        // Cliente sem pedidos (não deveria acontecer, mas por segurança)
        cliente.categoria = 'curiosos';
      }
      
      return cliente;
    });
  }

  /**
   * Obtém estatísticas resumidas dos clientes por categoria
   */
  async calcularEstatisticas(): Promise<EstatisticasClientes> {
    try {
      const clientes = await this.buscarClientesUnicos();
      
      const estatisticas: EstatisticasClientes = {
        curiosos: 0,
        novatos: 0,
        fieis: 0,
        super_clientes: 0,
        totalClientes: clientes.length,
        novosClientes: 0,
        taxaRetencao: 0
      };
      
      clientes.forEach(cliente => {
        switch (cliente.categoria) {
          case 'curiosos':
            estatisticas.curiosos++;
            break;
          case 'novatos':
            estatisticas.novatos++;
            break;
          case 'fieis':
            estatisticas.fieis++;
            break;
          case 'super_clientes':
            estatisticas.super_clientes++;
            break;
        }
      });
      
      // Calcular novos clientes (últimos 30 dias)
      const trintaDiasAtras = new Date();
      trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
      
      const novosClientes = clientes.filter(cliente => 
        cliente.primeiroPedido >= trintaDiasAtras
      ).length;
      
      estatisticas.novosClientes = novosClientes;
      
      // Calcular taxa de retenção (clientes que fizeram mais de 1 pedido)
      const clientesRecorrentes = clientes.filter(cliente => 
        cliente.totalPedidos > 1
      ).length;
      
      estatisticas.taxaRetencao = clientes.length > 0 
        ? Math.round((clientesRecorrentes / clientes.length) * 100)
        : 0;
        
      return estatisticas;
    } catch (error) {
      console.error('Erro ao calcular estatísticas de clientes:', error);
      throw error;
    }
  }

  /**
   * Busca clientes de uma categoria específica
   */
  async buscarClientesPorCategoria(categoria: ClienteCategoria['categoria']): Promise<ClienteCategoria[]> {
    try {
      const clientes = await this.buscarClientesUnicos();
      return clientes.filter(cliente => cliente.categoria === categoria);
    } catch (error) {
      console.error(`Erro ao buscar clientes da categoria ${categoria}:`, error);
      throw error;
    }
  }
}

// Exportar instância singleton
export const firebaseClientesService = new FirebaseClientesService();
