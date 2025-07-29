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
import { db } from '../lib/firebase';
import { Pedido, StatusPedido } from '../types';
import { firebasePedidoService } from './firebasePedidoService';

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

class HistoricoPedidoService {
  private readonly COLLECTION_PEDIDOS = 'pedidos';

  // Obter histórico de pedidos com filtros otimizado
  async obterHistoricoComFiltros(filtros: FiltrosHistorico): Promise<Pedido[]> {
    try {
      // Primeiro, buscar todos os pedidos entregues
      const pedidosEntregues = await this.buscarPedidosPorStatus('entregue');
      
      // Depois, buscar todos os pedidos cancelados
      const pedidosCancelados = await this.buscarPedidosPorStatus('cancelado');
      
      // Combinar os resultados
      let todosPedidos = [...pedidosEntregues, ...pedidosCancelados];

      // Aplicar filtros de data no cliente
      if (filtros.dataInicio && filtros.dataFim) {
        todosPedidos = todosPedidos.filter(pedido => {
          const dataPedido = new Date(pedido.dataHora);
          return dataPedido >= filtros.dataInicio! && dataPedido <= filtros.dataFim!;
        });
      }

      // Aplicar filtro por forma de pagamento
      if (filtros.formaPagamento && filtros.formaPagamento !== 'todos') {
        todosPedidos = todosPedidos.filter(pedido => 
          pedido.formaPagamento === filtros.formaPagamento
        );
      }

      // Aplicar filtro por cliente
      if (filtros.cliente) {
        todosPedidos = todosPedidos.filter(pedido => 
          pedido.cliente?.nome?.toLowerCase().includes(filtros.cliente!.toLowerCase()) ||
          pedido.cliente?.telefone?.includes(filtros.cliente!)
        );
      }

      // Aplicar filtros de valor
      if (filtros.valorMinimo) {
        todosPedidos = todosPedidos.filter(pedido => pedido.total >= filtros.valorMinimo!);
      }

      if (filtros.valorMaximo) {
        todosPedidos = todosPedidos.filter(pedido => pedido.total <= filtros.valorMaximo!);
      }

      // Ordenar por data (mais recentes primeiro)
      todosPedidos.sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());

      return todosPedidos;
    } catch (error) {
      console.error('Erro ao obter histórico com filtros:', error);
      return [];
    }
  }

  // Buscar pedidos por status individualmente - usando createdAt
  private async buscarPedidosPorStatus(status: StatusPedido): Promise<Pedido[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_PEDIDOS),
        where('status', '==', status),
        orderBy('createdAt', 'desc') // Usando createdAt que é o campo que existe
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.converterDocumentoParaPedido(doc));
    } catch (error) {
      console.error(`Erro ao buscar pedidos ${status}:`, error);
      return [];
    }
  }

  // Converter documento Firebase para Pedido
  private converterDocumentoParaPedido(doc: any): Pedido {
    const data = doc.data();
    
    // Converter dataHora com segurança - priorizar dataHora, fallback para createdAt
    let dataHora: Date;
    try {
      if (data.dataHora) {
        dataHora = data.dataHora.toDate();
      } else if (data.createdAt) {
        dataHora = data.createdAt.toDate();
      } else {
        dataHora = new Date();
      }
    } catch (error) {
      console.warn('Erro ao converter dataHora, usando data atual:', error);
      dataHora = new Date();
    }
    
    return {
      id: doc.id,
      numero: data.numero || '',
      status: data.status || 'novo',
      dataHora,
      cliente: data.cliente || null,
      itens: data.itens || [],
      total: data.total || 0,
      formaPagamento: data.formaPagamento || 'pix',
      formaEntrega: data.formaEntrega || 'delivery',
      origemPedido: data.origemPedido || 'pdv',
      pagamento: data.pagamento || {
        valorPago: 0,
        statusPagamento: 'pendente'
      },
      clienteNovo: data.clienteNovo || false,
      tempoEstimado: data.tempoEstimado || '15 min',
      enderecoEntrega: data.enderecoEntrega || null,
      observacoes: data.observacoes || ''
    };
  }

  // Obter estatísticas do histórico
  async obterEstatisticas(filtros?: FiltrosHistorico): Promise<EstatisticasHistorico> {
    try {
      const pedidos = await this.obterHistoricoComFiltros(filtros || {});

      const totalPedidos = pedidos.length;
      const entregues = pedidos.filter(p => p.status === 'entregue').length;
      const cancelados = pedidos.filter(p => p.status === 'cancelado').length;
      const valorTotal = pedidos
        .filter(p => p.status === 'entregue')
        .reduce((acc, p) => acc + p.total, 0);
      const ticketMedio = entregues > 0 ? valorTotal / entregues : 0;

      // Pedidos por dia
      const pedidosPorDia = this.agruparPedidosPorDia(pedidos);

      // Top clientes
      const topClientes = this.obterTopClientes(pedidos);

      return {
        totalPedidos,
        entregues,
        cancelados,
        valorTotal,
        ticketMedio,
        pedidosPorDia,
        topClientes
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      return {
        totalPedidos: 0,
        entregues: 0,
        cancelados: 0,
        valorTotal: 0,
        ticketMedio: 0,
        pedidosPorDia: [],
        topClientes: []
      };
    }
  }

  // Agrupar pedidos por dia
  private agruparPedidosPorDia(pedidos: Pedido[]) {
    const agrupamento: Record<string, { quantidade: number; valor: number }> = {};

    pedidos.forEach(pedido => {
      const data = pedido.dataHora.toISOString().split('T')[0];
      if (!agrupamento[data]) {
        agrupamento[data] = { quantidade: 0, valor: 0 };
      }
      agrupamento[data].quantidade++;
      if (pedido.status === 'entregue') {
        agrupamento[data].valor += pedido.total;
      }
    });

    return Object.entries(agrupamento)
      .map(([data, stats]) => ({
        data,
        quantidade: stats.quantidade,
        valor: stats.valor
      }))
      .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
  }

  // Obter top clientes
  private obterTopClientes(pedidos: Pedido[]) {
    const clientes: Record<string, { quantidade: number; valor: number }> = {};

    pedidos.forEach(pedido => {
      if (pedido.cliente?.nome) {
        const nomeCliente = pedido.cliente.nome;
        if (!clientes[nomeCliente]) {
          clientes[nomeCliente] = { quantidade: 0, valor: 0 };
        }
        clientes[nomeCliente].quantidade++;
        if (pedido.status === 'entregue') {
          clientes[nomeCliente].valor += pedido.total;
        }
      }
    });

    return Object.entries(clientes)
      .map(([cliente, stats]) => ({
        cliente,
        quantidade: stats.quantidade,
        valor: stats.valor
      }))
      .sort((a, b) => b.valor - a.valor)
      .slice(0, 10);
  }

  // Exportar histórico para CSV
  async exportarHistoricoCSV(filtros: FiltrosHistorico): Promise<string> {
    try {
      const pedidos = await this.obterHistoricoComFiltros(filtros);

      const headers = [
        'Número do Pedido',
        'Cliente',
        'Telefone',
        'Status',
        'Data/Hora',
        'Total',
        'Forma de Pagamento',
        'Status do Pagamento',
        'Forma de Entrega',
        'Itens',
        'Observações'
      ];

      const rows = pedidos.map(pedido => [
        pedido.numero,
        pedido.cliente?.nome || 'N/A',
        pedido.cliente?.telefone || 'N/A',
        pedido.status,
        pedido.dataHora.toLocaleString('pt-BR'),
        `R$ ${pedido.total.toFixed(2)}`,
        pedido.formaPagamento,
        pedido.pagamento.statusPagamento,
        pedido.formaEntrega,
        pedido.itens.map(item => `${item.quantidade}x ${item.nome}`).join(', '),
        pedido.observacoes || ''
      ]);

      const csvContent = [
        headers.join(','),
        ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
      ].join('\n');

      return csvContent;
    } catch (error) {
      console.error('Erro ao exportar histórico:', error);
      throw new Error('Erro ao exportar histórico');
    }
  }

  // Obter pedidos por período
  async obterPedidosPorPeriodo(dataInicio: Date, dataFim: Date): Promise<Pedido[]> {
    return this.obterHistoricoComFiltros({
      dataInicio,
      dataFim
    });
  }

  // Obter pedidos por cliente
  async obterPedidosPorCliente(nomeCliente: string): Promise<Pedido[]> {
    return this.obterHistoricoComFiltros({
      cliente: nomeCliente
    });
  }
}

export const historicoPedidoService = new HistoricoPedidoService(); 