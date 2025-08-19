import { 
  orderBy, 
  Timestamp,
  startAt,
  endAt,
  onSnapshot,
  query,
  collection
} from 'firebase/firestore';
import { Pedido, StatusPedido } from '../types';
import { firebasePedidoService } from './firebasePedidoService';
import { BaseFirestoreService } from './firebase/BaseFirestoreService';
import { db } from '../lib/firebase';

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

class HistoricoPedidoService extends BaseFirestoreService {
  private readonly COLLECTION_PEDIDOS = 'pedidos';

  // Obter histórico de pedidos com filtros otimizado
  async obterHistoricoComFiltros(filtros: FiltrosHistorico): Promise<Pedido[]> {
    try {
      // Primeiro, buscar todos os pedidos entregues
      const pedidosEntregues = await this.buscarPedidosPorStatus('entregue');
      
      // Depois, buscar todos os pedidos cancelados
      const pedidosCancelados = await this.buscarPedidosPorStatus('cancelado');
      
      // Combinar os resultados e remover duplicatas baseado no ID
      let todosPedidos = [...pedidosEntregues, ...pedidosCancelados];
      
      // Remover duplicatas baseado no ID
      const pedidosUnicos = new Map<string, Pedido>();
      todosPedidos.forEach(pedido => {
        if (pedido.id && !pedidosUnicos.has(pedido.id)) {
          pedidosUnicos.set(pedido.id, pedido);
        }
      });
      todosPedidos = Array.from(pedidosUnicos.values());

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

      // Debug: verificar IDs únicos
      const ids = todosPedidos.map(p => p.id);
      const idsUnicos = new Set(ids);
      console.log('🔍 HistoricoPedidoService: Verificação de IDs:', {
        total: todosPedidos.length,
        idsUnicos: idsUnicos.size,
        temDuplicatas: ids.length !== idsUnicos.size
      });

      // Validar que todos os pedidos têm IDs válidos
      const pedidosValidos = todosPedidos.filter(pedido => {
        if (!pedido.id || typeof pedido.id !== 'string') {
          console.warn('⚠️ Pedido sem ID válido:', pedido);
          return false;
        }
        return true;
      });

      if (pedidosValidos.length !== todosPedidos.length) {
        console.warn('⚠️ HistoricoPedidoService: Alguns pedidos foram filtrados por ID inválido');
      }

      return pedidosValidos;
    } catch (error) {
      console.error('Erro ao obter histórico com filtros:', error);
      return [];
    }
  }

  // Buscar pedidos por status individualmente - usando dataHora
  private async buscarPedidosPorStatus(status: StatusPedido): Promise<Pedido[]> {
    try {
      // Obter lojaId do usuário autenticado
      const lojaId = firebasePedidoService.getLojaId();
      
      const snapshot = await this.executeQuery(
        this.COLLECTION_PEDIDOS,
        this.createConstraints().where('status', '==', status),
        this.createConstraints().orderByDesc('dataHora')
      );
      
      return this.mapDocuments<Pedido>(snapshot);
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

  // Listener em tempo real para histórico de pedidos
  onHistoricoChange(callback: (pedidos: Pedido[]) => void, filtros?: FiltrosHistorico) {
    try {
      const lojaId = firebasePedidoService.getLojaId();
      if (!lojaId) {
        console.warn('⚠️ LojaId não disponível para listener');
        return () => {};
      }

      // Criar query base para pedidos entregues e cancelados
      const q = query(
        collection(db, this.COLLECTION_PEDIDOS),
        orderBy('dataHora', 'desc')
      );

      return onSnapshot(q, async (querySnapshot) => {
        try {
          // Filtrar apenas pedidos entregues e cancelados
          const pedidos = querySnapshot.docs
            .map(doc => this.converterDocumentoParaPedido(doc))
            .filter(pedido => 
              pedido.status === 'entregue' || pedido.status === 'cancelado'
            );

          // Aplicar filtros se fornecidos
          let pedidosFiltrados = pedidos;
          if (filtros) {
            pedidosFiltrados = await this.aplicarFiltros(pedidos, filtros);
          }

          // Remover duplicatas e validar IDs
          const pedidosUnicos = new Map<string, Pedido>();
          pedidosFiltrados.forEach(pedido => {
            if (pedido.id && typeof pedido.id === 'string') {
              pedidosUnicos.set(pedido.id, pedido);
            }
          });

          const resultado = Array.from(pedidosUnicos.values());
          
          // Ordenar por data (mais recentes primeiro)
          resultado.sort((a, b) => new Date(b.dataHora).getTime() - new Date(a.dataHora).getTime());

          console.log('🔄 Listener histórico: Dados atualizados em tempo real:', {
            total: resultado.length,
            filtros: filtros || 'nenhum'
          });

          callback(resultado);
        } catch (error) {
          console.error('❌ Erro no listener do histórico:', error);
        }
      });
    } catch (error) {
      console.error('❌ Erro ao configurar listener do histórico:', error);
      return () => {};
    }
  }

  // Método auxiliar para aplicar filtros
  private async aplicarFiltros(pedidos: Pedido[], filtros: FiltrosHistorico): Promise<Pedido[]> {
    let resultado = [...pedidos];

    // Aplicar filtros de data
    if (filtros.dataInicio && filtros.dataFim) {
      resultado = resultado.filter(pedido => {
        const dataPedido = new Date(pedido.dataHora);
        return dataPedido >= filtros.dataInicio! && dataPedido <= filtros.dataFim!;
      });
    }

    // Aplicar filtro por forma de pagamento
    if (filtros.formaPagamento && filtros.formaPagamento !== 'todos') {
      resultado = resultado.filter(pedido => 
        pedido.formaPagamento === filtros.formaPagamento
      );
    }

    // Aplicar filtro por cliente
    if (filtros.cliente) {
      resultado = resultado.filter(pedido => 
        pedido.cliente?.nome?.toLowerCase().includes(filtros.cliente!.toLowerCase()) ||
        pedido.cliente?.telefone?.includes(filtros.cliente!)
      );
    }

    // Aplicar filtros de valor
    if (filtros.valorMinimo) {
      resultado = resultado.filter(pedido => pedido.total >= filtros.valorMinimo!);
    }

    if (filtros.valorMaximo) {
      resultado = resultado.filter(pedido => pedido.total <= filtros.valorMaximo!);
    }

    return resultado;
  }
}

export const historicoPedidoService = new HistoricoPedidoService(); 