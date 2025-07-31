import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  getCountFromServer,
  Timestamp
} from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { 
  KPI, 
  DadosFormaPagamento, 
  Pedido,
  EstatisticasGerais 
} from '../types';

export class FirebaseDashboardService {
  private pedidosCollection = collection(db, 'pedidos');

  // Método auxiliar para obter o ID da loja do usuário autenticado
  private getLojaId(): string {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return user.uid;
  }

  // Dados de fallback quando não há pedidos
  private getDadosFallback(): {
    kpis: KPI[];
    formasPagamento: DadosFormaPagamento[];
    estatisticas: EstatisticasGerais;
  } {
    return {
      kpis: [
        {
          titulo: 'Faturamento Total',
          valor: 'R$ 0,00',
          variacao: 0,
          icone: 'DollarSign',
          cor: 'green'
        },
        {
          titulo: 'Ticket Médio',
          valor: 'R$ 0,00',
          variacao: 0,
          icone: 'TrendingUp',
          cor: 'purple'
        },
        {
          titulo: 'Total de Pedidos',
          valor: '0',
          variacao: 0,
          icone: 'ShoppingBag',
          cor: 'blue'
        },
        {
          titulo: 'Total de Clientes',
          valor: '0',
          variacao: 0,
          icone: 'Users',
          cor: 'indigo'
        }
      ],
      formasPagamento: [
        {
          name: 'PIX',
          value: 45,
          color: '#10B981'
        },
        {
          name: 'Cartão de Crédito',
          value: 30,
          color: '#3B82F6'
        },
        {
          name: 'Cartão de Débito',
          value: 15,
          color: '#8B5CF6'
        },
        {
          name: 'Dinheiro',
          value: 10,
          color: '#F59E0B'
        }
      ],
      estatisticas: {
        faturamentoTotal: 0,
        ticketMedio: 0,
        totalPedidos: 0,
        totalClientes: 0,
        receita7Dias: 0,
        pedidos7Dias: 0,
        tempoMedioEntrega: 0,
        avaliacaoMedia: 0
      }
    };
  }

  // Calcular KPIs baseados em dados reais
  async calcularKPIs(periodo: 'daily' | 'weekly' | 'monthly' = 'weekly'): Promise<KPI[]> {
    try {
      const lojaId = this.getLojaId();
      
      // Buscar todos os pedidos da loja e filtrar no código
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc')
      );

      const snapshot = await getDocs(q);
      const todosPedidos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido;
      });

      // Se não há pedidos, retornar dados de fallback
      if (todosPedidos.length === 0) {
        return this.getDadosFallback().kpis;
      }

      // Filtrar por período no código
      const agora = new Date();
      let pedidosFiltrados = todosPedidos;
      
      switch (periodo) {
        case 'daily':
          const hoje = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
          pedidosFiltrados = todosPedidos.filter(p => p.dataHora >= hoje);
          break;
        case 'weekly':
          const inicioSemana = new Date(agora);
          inicioSemana.setDate(agora.getDate() - agora.getDay());
          const dataInicio = new Date(inicioSemana.getFullYear(), inicioSemana.getMonth(), inicioSemana.getDate());
          pedidosFiltrados = todosPedidos.filter(p => p.dataHora >= dataInicio);
          break;
        case 'monthly':
          const dataInicioMes = new Date(agora.getFullYear(), agora.getMonth(), 1);
          pedidosFiltrados = todosPedidos.filter(p => p.dataHora >= dataInicioMes);
          break;
      }

      // Se não há pedidos no período, usar todos os pedidos (sem filtro de período)
      if (pedidosFiltrados.length === 0) {
        pedidosFiltrados = todosPedidos;
      }

      // Filtrar apenas pedidos entregues/finalizados para estatísticas específicas
      const pedidos = pedidosFiltrados.filter(p => ['entregue', 'finalizado'].includes(p.status));
      
      // Calcular métricas - usar todos os pedidos do período, não apenas entregues
      const faturamentoTotal = pedidosFiltrados.reduce((total, pedido) => total + pedido.total, 0);
      const totalPedidos = pedidosFiltrados.length;
      const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;
      
      // Contar clientes únicos
      const clientesUnicos = new Set(pedidosFiltrados.map(p => p.cliente.nome)).size;

      // Calcular variação (simulado - em produção seria baseado em período anterior)
      const variacaoFaturamento = 12.5; // Simulado
      const variacaoTicket = -2.1; // Simulado
      const variacaoPedidos = 8.3; // Simulado
      const variacaoClientes = 15.7; // Simulado

      return [
        {
          titulo: 'Faturamento Total',
          valor: `R$ ${faturamentoTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          variacao: variacaoFaturamento,
          icone: 'DollarSign',
          cor: 'green'
        },
        {
          titulo: 'Ticket Médio',
          valor: `R$ ${ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
          variacao: variacaoTicket,
          icone: 'TrendingUp',
          cor: 'purple'
        },
        {
          titulo: 'Total de Pedidos',
          valor: totalPedidos.toString(),
          variacao: variacaoPedidos,
          icone: 'ShoppingBag',
          cor: 'blue'
        },
        {
          titulo: 'Total de Clientes',
          valor: clientesUnicos.toString(),
          variacao: variacaoClientes,
          icone: 'Users',
          cor: 'indigo'
        }
      ];
    } catch (error) {
      console.error('❌ Erro ao calcular KPIs:', error);
      // Retornar dados de fallback em caso de erro
      return this.getDadosFallback().kpis;
    }
  }

  // Calcular formas de pagamento baseadas em dados reais
  async calcularFormasPagamento(): Promise<DadosFormaPagamento[]> {
    try {
      const lojaId = this.getLojaId();
      
      // Buscar todos os pedidos da loja e filtrar no código
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc')
      );

      const snapshot = await getDocs(q);
      const todosPedidos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido;
      });

      // Se não há pedidos, retornar dados de fallback
      if (todosPedidos.length === 0) {
        return this.getDadosFallback().formasPagamento;
      }

      // Filtrar últimos 30 dias - usar todos os pedidos, não apenas entregues
      const agora = new Date();
      const dataInicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate() - 30);
      const pedidos = todosPedidos.filter(p => p.dataHora >= dataInicio);

      // Contar formas de pagamento
      const formasPagamento: { [key: string]: number } = {};
      pedidos.forEach(pedido => {
        const forma = pedido.formaPagamento;
        formasPagamento[forma] = (formasPagamento[forma] || 0) + 1;
      });

      const total = Object.values(formasPagamento).reduce((sum, count) => sum + count, 0);

      // Se não há formas de pagamento, retornar dados de fallback
      if (total === 0) {
        const fallbackData = this.getDadosFallback().formasPagamento;
        return fallbackData;
      }

      // Mapear cores para formas de pagamento
      const coresMap: { [key: string]: string } = {
        'PIX': '#10B981',
        'pix': '#10B981',
        'Cartão de Crédito': '#3B82F6',
        'cartao_credito': '#3B82F6',
        'Cartão de Débito': '#8B5CF6',
        'cartao_debito': '#8B5CF6',
        'Dinheiro': '#F59E0B',
        'dinheiro': '#F59E0B'
      };

      const resultado = Object.entries(formasPagamento).map(([forma, count]) => {
        const percentual = Math.round((count / total) * 100);
        
        // Normalizar o nome da forma de pagamento
        const formaNormalizada = forma.toLowerCase().replace(/[^a-z]/g, '');
        
        // Tentar encontrar a cor
        let cor = coresMap[forma] || coresMap[formaNormalizada] || '#6B7280';
        
        return {
          name: forma,
          value: percentual,
          color: cor
        };
      });

      return resultado;
    } catch (error) {
      console.error('Erro ao calcular formas de pagamento:', error);
      // Retornar dados de fallback em caso de erro
      return this.getDadosFallback().formasPagamento;
    }
  }

  // Buscar pedidos recentes
  async buscarPedidosRecentes(limite: number = 5): Promise<Pedido[]> {
    try {
      const lojaId = this.getLojaId();
      
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc'),
        limit(limite)
      );

      const snapshot = await getDocs(q);
      const pedidos: Pedido[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        pedidos.push({
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido);
      });

      return pedidos;
    } catch (error) {
      console.error('Erro ao buscar pedidos recentes:', error);
      // Retornar array vazio em caso de erro
      return [];
    }
  }

  // Calcular estatísticas gerais
  async calcularEstatisticasGerais(): Promise<EstatisticasGerais> {
    try {
      const lojaId = this.getLojaId();
      
      // Buscar todos os pedidos da loja e filtrar no código
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc')
      );

      const snapshot = await getDocs(q);
      const todosPedidos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido;
      });

      // Se não há pedidos, retornar dados de fallback
      if (todosPedidos.length === 0) {
        return this.getDadosFallback().estatisticas;
      }

      // Filtrar últimos 7 dias - usar todos os pedidos, não apenas entregues
      const agora = new Date();
      const dataInicio7Dias = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);
      const pedidos7Dias = todosPedidos.filter(p => p.dataHora >= dataInicio7Dias);

      // Calcular métricas
      const faturamentoTotal = pedidos7Dias.reduce((total, pedido) => total + pedido.total, 0);
      const totalPedidos = pedidos7Dias.length;
      const ticketMedio = totalPedidos > 0 ? faturamentoTotal / totalPedidos : 0;
      const totalClientes = new Set(pedidos7Dias.map(p => p.cliente.nome)).size;
      const receita7Dias = faturamentoTotal;
      const pedidos7DiasCount = totalPedidos;
      
      // Tempo médio de entrega (simulado)
      const tempoMedioEntrega = 25; // minutos
      
      // Avaliação média (simulado)
      const avaliacaoMedia = 4.5;

      return {
        faturamentoTotal,
        ticketMedio,
        totalPedidos,
        totalClientes,
        receita7Dias,
        pedidos7Dias: pedidos7DiasCount,
        tempoMedioEntrega,
        avaliacaoMedia
      };
    } catch (error) {
      console.error('Erro ao calcular estatísticas gerais:', error);
      // Retornar dados de fallback em caso de erro
      return this.getDadosFallback().estatisticas;
    }
  }

  // Método para verificar dados e debug
  async verificarDados(): Promise<void> {
    try {
      const lojaId = this.getLojaId();
      
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc')
      );

      const snapshot = await getDocs(q);
      const todosPedidos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido;
      });

      if (todosPedidos.length > 0) {
        const statusCount = todosPedidos.reduce((acc, p) => {
          acc[p.status] = (acc[p.status] || 0) + 1;
          return acc;
        }, {} as Record<string, number>);

      }
    } catch (error) {
      console.error('❌ Erro ao verificar dados:', error);
    }
  }

  // Buscar dados completos do dashboard
  async buscarDadosDashboard(periodo: 'daily' | 'weekly' | 'monthly' = 'weekly') {
    try {
      // Verificar dados primeiro
      await this.verificarDados();

      const [kpis, formasPagamento, pedidosRecentes, estatisticas] = await Promise.all([
        this.calcularKPIs(periodo),
        this.calcularFormasPagamento(),
        this.buscarPedidosRecentes(5),
        this.calcularEstatisticasGerais()
      ]);

      return {
        kpis,
        formasPagamento,
        pedidosRecentes,
        estatisticas
      };
    } catch (error) {
      console.error('Erro ao buscar dados do dashboard:', error);
      // Retornar dados de fallback em caso de erro
      const fallback = this.getDadosFallback();
      return {
        ...fallback,
        pedidosRecentes: []
      };
    }
  }

  // Calcular dados de performance para gráfico de área
  async calcularDadosPerformance(periodo: 'weekly' | 'monthly' = 'weekly'): Promise<{
    receitaAtual: number[];
    receitaAnterior: number[];
    categorias: string[];
  }> {
    try {
      const lojaId = this.getLojaId();
      
      // Buscar todos os pedidos da loja
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc')
      );

      const snapshot = await getDocs(q);
      const todosPedidos = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido;
      });

      if (todosPedidos.length === 0) {
        // Retornar dados de fallback
        return this.getDadosPerformanceFallback(periodo);
      }

      const agora = new Date();
      let receitaAtual: number[] = [];
      let receitaAnterior: number[] = [];
      let categorias: string[] = [];

      if (periodo === 'weekly') {
        // Dados da semana atual (últimos 7 dias)
        const inicioSemana = new Date(agora);
        inicioSemana.setDate(agora.getDate() - 6);
        
        // Dados da semana anterior
        const inicioSemanaAnterior = new Date(inicioSemana);
        inicioSemanaAnterior.setDate(inicioSemanaAnterior.getDate() - 7);
        const fimSemanaAnterior = new Date(inicioSemanaAnterior);
        fimSemanaAnterior.setDate(inicioSemanaAnterior.getDate() + 6);

        // Gerar categorias (7 dias)
        categorias = [];
        for (let i = 0; i < 7; i++) {
          const data = new Date(inicioSemana);
          data.setDate(inicioSemana.getDate() + i);
          categorias.push(data.toISOString());
        }

        // Calcular receita por dia
        receitaAtual = [];
        receitaAnterior = [];
        
        for (let i = 0; i < 7; i++) {
          const dataAtual = new Date(inicioSemana);
          dataAtual.setDate(inicioSemana.getDate() + i);
          const dataInicio = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
          const dataFim = new Date(dataInicio);
          dataFim.setDate(dataFim.getDate() + 1);

          // Pedidos do dia atual
          const pedidosDia = todosPedidos.filter(p => 
            p.dataHora >= dataInicio && p.dataHora < dataFim
          );
          const receitaDia = pedidosDia.reduce((total, p) => total + p.total, 0);
          receitaAtual.push(receitaDia);

          // Pedidos do dia anterior (semana anterior)
          const dataAnterior = new Date(dataAtual);
          dataAnterior.setDate(dataAnterior.getDate() - 7);
          const dataInicioAnterior = new Date(dataAnterior.getFullYear(), dataAnterior.getMonth(), dataAnterior.getDate());
          const dataFimAnterior = new Date(dataInicioAnterior);
          dataFimAnterior.setDate(dataFimAnterior.getDate() + 1);

          const pedidosDiaAnterior = todosPedidos.filter(p => 
            p.dataHora >= dataInicioAnterior && p.dataHora < dataFimAnterior
          );
          const receitaDiaAnterior = pedidosDiaAnterior.reduce((total, p) => total + p.total, 0);
          receitaAnterior.push(receitaDiaAnterior);
        }
      } else {
        // Dados do mês atual (últimos 28 dias)
        const inicioMes = new Date(agora);
        inicioMes.setDate(agora.getDate() - 27);
        
        // Dados do mês anterior
        const inicioMesAnterior = new Date(inicioMes);
        inicioMesAnterior.setDate(inicioMesAnterior.getDate() - 28);
        const fimMesAnterior = new Date(inicioMesAnterior);
        fimMesAnterior.setDate(inicioMesAnterior.getDate() + 27);

        // Gerar categorias (28 dias)
        categorias = [];
        for (let i = 0; i < 28; i++) {
          const data = new Date(inicioMes);
          data.setDate(inicioMes.getDate() + i);
          categorias.push(data.toISOString());
        }

        // Calcular receita por dia
        receitaAtual = [];
        receitaAnterior = [];
        
        for (let i = 0; i < 28; i++) {
          const dataAtual = new Date(inicioMes);
          dataAtual.setDate(inicioMes.getDate() + i);
          const dataInicio = new Date(dataAtual.getFullYear(), dataAtual.getMonth(), dataAtual.getDate());
          const dataFim = new Date(dataInicio);
          dataFim.setDate(dataFim.getDate() + 1);

          // Pedidos do dia atual
          const pedidosDia = todosPedidos.filter(p => 
            p.dataHora >= dataInicio && p.dataHora < dataFim
          );
          const receitaDia = pedidosDia.reduce((total, p) => total + p.total, 0);
          receitaAtual.push(receitaDia);

          // Pedidos do dia anterior (mês anterior)
          const dataAnterior = new Date(dataAtual);
          dataAnterior.setDate(dataAnterior.getDate() - 28);
          const dataInicioAnterior = new Date(dataAnterior.getFullYear(), dataAnterior.getMonth(), dataAnterior.getDate());
          const dataFimAnterior = new Date(dataInicioAnterior);
          dataFimAnterior.setDate(dataFimAnterior.getDate() + 1);

          const pedidosDiaAnterior = todosPedidos.filter(p => 
            p.dataHora >= dataInicioAnterior && p.dataHora < dataFimAnterior
          );
          const receitaDiaAnterior = pedidosDiaAnterior.reduce((total, p) => total + p.total, 0);
          receitaAnterior.push(receitaDiaAnterior);
        }
      }

      return {
        receitaAtual,
        receitaAnterior,
        categorias
      };
    } catch (error) {
      console.error('Erro ao calcular dados de performance:', error);
      return this.getDadosPerformanceFallback(periodo);
    }
  }

  // Dados de fallback para performance
  private getDadosPerformanceFallback(periodo: 'weekly' | 'monthly'): {
    receitaAtual: number[];
    receitaAnterior: number[];
    categorias: string[];
  } {
    if (periodo === 'weekly') {
      return {
        receitaAtual: [1150.30, 1280.45, 1420.80, 1350.20, 1680.90, 1890.45, 1750.10],
        receitaAnterior: [980.50, 1120.30, 1250.80, 1180.40, 1450.20, 1620.80, 1480.50],
        categorias: [
          '2024-01-08T00:00:00.000Z',
          '2024-01-09T00:00:00.000Z',
          '2024-01-10T00:00:00.000Z',
          '2024-01-11T00:00:00.000Z',
          '2024-01-12T00:00:00.000Z',
          '2024-01-13T00:00:00.000Z',
          '2024-01-14T00:00:00.000Z'
        ]
      };
    } else {
      return {
        receitaAtual: [
          1150.30, 1280.45, 1420.80, 1350.20, 1680.90, 1890.45, 1750.10,
          1250.40, 1380.55, 1520.90, 1450.30, 1780.95, 1990.55, 1850.20,
          1350.50, 1480.65, 1620.95, 1550.40, 1880.98, 2090.65, 1950.30,
          1450.60, 1580.75, 1720.98, 1650.50, 1980.99, 2190.75, 2050.40
        ],
        receitaAnterior: [
          980.50, 1120.30, 1250.80, 1180.40, 1450.20, 1620.80, 1480.50,
          1080.60, 1220.40, 1350.85, 1280.50, 1550.25, 1720.85, 1580.55,
          1180.70, 1320.50, 1450.90, 1380.60, 1650.30, 1820.90, 1680.60,
          1280.80, 1420.60, 1550.95, 1480.70, 1750.35, 1920.95, 1780.65
        ],
        categorias: (() => {
          const categories = [];
          const startDate = new Date('2024-01-01');
          for (let i = 0; i < 28; i++) {
            const date = new Date(startDate);
            date.setDate(startDate.getDate() + i);
            categories.push(date.toISOString());
          }
          return categories;
        })()
      };
    }
  }
}

// ✅ EXPORTAR instância do serviço
export const firebaseDashboardService = new FirebaseDashboardService(); 