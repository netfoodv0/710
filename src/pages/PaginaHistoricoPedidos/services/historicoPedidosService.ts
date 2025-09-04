// Service para gerenciar histórico de pedidos
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  Timestamp,
  startAt,
  endAt
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Pedido, StatusPedido } from '../../../types';
import { ClientePedido, ItemPedido, PagamentoPedido, EnderecoEntrega, Extra } from '../../../types/global/produtos';
import { mockHistoricoPedidos } from './mockHistoricoPedidos';

export interface FiltrosHistorico {
  status?: StatusPedido;
  dataInicio?: Date;
  dataFim?: Date;
  formaPagamento?: string;
  cliente?: string;
  valorMinimo?: number;
  valorMaximo?: number;
}

export interface EstatisticasHistorico {
  totalPedidos: number;
  entregues: number;
  cancelados: number;
  valorTotal: number;
  ticketMedio: number;
  clientesUnicos: number;
  pedidosPorDia: {
    data: string;
    quantidade: number;
    valor: number;
  }[];
  topClientes: {
    cliente: string;
    quantidade: number;
    valor: number;
  }[];
}

class HistoricoPedidosService {
  private readonly COLLECTION_PEDIDOS = 'pedidos';

  private getLojaId(): string {
    // Por enquanto, retornar um ID fixo para testes
    // Em produção, isso deve vir do contexto de loja
    return 'loja-teste';
  }

  async obterHistoricoPedidos(filtros?: FiltrosHistorico): Promise<Pedido[]> {
    try {
      // Simular delay de rede
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Por enquanto, retornar dados mockados
      let pedidos = [...mockHistoricoPedidos];

      // Aplicar filtros se fornecidos
      if (filtros?.status && filtros.status !== 'todos') {
        pedidos = pedidos.filter(p => p.status === filtros.status);
      }

      if (filtros?.dataInicio) {
        pedidos = pedidos.filter(p => p.dataHora >= filtros.dataInicio!);
      }

      if (filtros?.dataFim) {
        pedidos = pedidos.filter(p => p.dataHora <= filtros.dataFim!);
      }

      if (filtros?.formaPagamento && filtros.formaPagamento !== 'todos') {
        pedidos = pedidos.filter(p => p.formaPagamento === filtros.formaPagamento);
      }

      // Ordenar por data mais recente
      pedidos.sort((a, b) => b.dataHora.getTime() - a.dataHora.getTime());

      return pedidos;
    } catch (error) {
      console.error('Erro ao obter histórico de pedidos:', error);
      throw error;
    }
  }

  async obterEstatisticasHistorico(filtros?: FiltrosHistorico): Promise<EstatisticasHistorico> {
    try {
      const pedidos = await this.obterHistoricoPedidos(filtros);
      
      const totalPedidos = pedidos.length;
      const entregues = pedidos.filter(p => p.status === 'entregue').length;
      const cancelados = pedidos.filter(p => p.status === 'cancelado').length;
      const valorTotal = pedidos.reduce((sum, p) => sum + p.total, 0);
      const ticketMedio = totalPedidos > 0 ? valorTotal / totalPedidos : 0;
      
      const clientesUnicos = new Set(pedidos.map(p => p.cliente.telefone)).size;
      
      // Agrupar pedidos por dia
      const pedidosPorDia = pedidos.reduce((acc, pedido) => {
        const data = pedido.dataHora.toISOString().split('T')[0];
        if (!acc[data]) {
          acc[data] = { quantidade: 0, valor: 0 };
        }
        acc[data].quantidade++;
        acc[data].valor += pedido.total;
        return acc;
      }, {} as Record<string, { quantidade: number; valor: number }>);

      const pedidosPorDiaArray = Object.entries(pedidosPorDia).map(([data, stats]) => ({
        data,
        quantidade: stats.quantidade,
        valor: stats.valor
      }));

      // Top clientes
      const clientesMap = pedidos.reduce((acc, pedido) => {
        const telefone = pedido.cliente.telefone;
        if (!acc[telefone]) {
          acc[telefone] = { cliente: pedido.cliente.nome, quantidade: 0, valor: 0 };
        }
        acc[telefone].quantidade++;
        acc[telefone].valor += pedido.total;
        return acc;
      }, {} as Record<string, { cliente: string; quantidade: number; valor: number }>);

      const topClientes = Object.values(clientesMap)
        .sort((a, b) => b.valor - a.valor)
        .slice(0, 10);

      return {
        totalPedidos,
        entregues,
        cancelados,
        valorTotal,
        ticketMedio,
        clientesUnicos,
        pedidosPorDia: pedidosPorDiaArray,
        topClientes
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas do histórico:', error);
      throw error;
    }
  }

  async exportarHistorico(filtros?: FiltrosHistorico): Promise<void> {
    try {
      const pedidos = await this.obterHistoricoPedidos(filtros);
      
      // Simular exportação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Histórico exportado:', pedidos.length, 'pedidos');
    } catch (error) {
      console.error('Erro ao exportar histórico:', error);
      throw error;
    }
  }
}

export const historicoPedidosService = new HistoricoPedidosService();
