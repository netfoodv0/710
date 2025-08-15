import { 
  DadosRelatorios, 
  RelatoriosKPIs, 
  VendasPorCategoria, 
  PerformanceTemporal,
  FormaPagamentoRelatorio,
  TopProduto,
  HorarioPico,
  SatisfacaoCliente,
  DadosCrescimento,
  ExportOptions
} from '../types/relatorios.types';
import { firebaseRelatoriosService } from './firebaseRelatoriosService';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';
import { historicoPedidoService } from '../../../services/historicoPedidoService';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';

class RelatoriosService {
  async obterDadosCompletos(period: PeriodType): Promise<DadosRelatorios> {
    try {
      // Usar o novo serviço Firebase para relatórios
      return await firebaseRelatoriosService.obterDadosCompletos(period);
    } catch (error) {
      console.error('Erro ao obter dados completos dos relatórios:', error);
      
      // Fallback para dados simulados em caso de erro
      console.warn('Usando dados simulados como fallback');
      return await this.obterDadosSimulados(period);
    }
  }

  // Método de fallback com dados simulados
  private async obterDadosSimulados(period: PeriodType): Promise<DadosRelatorios> {
    try {
      // Buscar dados em paralelo para melhor performance
      const [kpis, vendasCategoria, performance, formasPagamento, topProdutos] = await Promise.all([
        this.obterKPIs(period),
        this.obterVendasPorCategoria(period),
        this.obterPerformanceTemporal(period),
        this.obterFormasPagamento(period),
        this.obterTopProdutos(period)
      ]);

      const [horariosPico, satisfacao, crescimento, metricas] = await Promise.all([
        this.obterHorariosPico(period),
        this.obterSatisfacaoCliente(period),
        this.obterDadosCrescimento(period),
        this.obterMetricasComparativas(period)
      ]);

      return {
        kpis,
        vendasPorCategoria: vendasCategoria,
        performanceTemporal: performance,
        formasPagamento,
        topProdutos,
        horariosPico,
        satisfacaoCliente: satisfacao,
        dadosCrescimento: crescimento,
        metricasComparativas: metricas
      };
    } catch (error) {
      console.error('Erro ao obter dados simulados dos relatórios:', error);
      throw new Error('Falha ao carregar dados dos relatórios');
    }
  }

  private async obterKPIs(period: PeriodType): Promise<RelatoriosKPIs> {
    try {
      const kpisBasicos = await firebaseDashboardService.calcularKPIs(period);
      const estatisticas = await firebaseDashboardService.calcularEstatisticasGerais();
      
      // Calcular métricas adicionais específicas para relatórios
      const taxaCancelamento = await this.calcularTaxaCancelamento(period);
      const clientesAtivos = await this.calcularClientesAtivos(period);
      
      return {
        receitaTotal: estatisticas.receitaTotal,
        receitaVariacao: estatisticas.crescimentoReceita,
        pedidosTotal: estatisticas.totalPedidos,
        pedidosVariacao: estatisticas.crescimentoPedidos,
        ticketMedio: estatisticas.ticketMedio,
        ticketMedioVariacao: estatisticas.crescimentoTicketMedio,
        tempoMedioEntrega: estatisticas.tempoMedioEntrega,
        tempoEntregaVariacao: 0, // Calcular baseado no período anterior
        avaliacaoMedia: estatisticas.avaliacaoMedia,
        avaliacaoVariacao: 0, // Calcular baseado no período anterior
        taxaCancelamento: taxaCancelamento.atual,
        taxaCancelamentoVariacao: taxaCancelamento.variacao,
        produtosMaisVendidos: estatisticas.produtosAtivos,
        clientesAtivos: clientesAtivos.atual,
        clientesAtivosVariacao: clientesAtivos.variacao
      };
    } catch (error) {
      console.error('Erro ao obter KPIs:', error);
      throw error;
    }
  }

  private async obterVendasPorCategoria(period: PeriodType): Promise<VendasPorCategoria[]> {
    try {
      const dados = await firebaseDashboardService.calcularVendasPorCategoria(period);
      const cores = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
      
      return dados.map((item, index) => ({
        categoria: item.categoria,
        valor: item.valor,
        quantidade: item.quantidade,
        percentual: item.percentual,
        cor: cores[index % cores.length]
      }));
    } catch (error) {
      console.error('Erro ao obter vendas por categoria:', error);
      return [];
    }
  }

  private async obterPerformanceTemporal(period: PeriodType): Promise<PerformanceTemporal[]> {
    try {
      const dados = await firebaseDashboardService.calcularDadosPerformance(period);
      
      return dados.categorias.map((categoria, index) => ({
        periodo: categoria,
        receita: dados.receitaAtual[index] || 0,
        pedidos: Math.floor((dados.receitaAtual[index] || 0) / 45), // Estimativa baseada no ticket médio
        ticketMedio: 45, // Valor médio estimado
        tempoEntrega: 35 + Math.random() * 10 // Simulação de tempo de entrega
      }));
    } catch (error) {
      console.error('Erro ao obter performance temporal:', error);
      return [];
    }
  }

  private async obterFormasPagamento(period: PeriodType): Promise<FormaPagamentoRelatorio[]> {
    try {
      // Dados específicos fornecidos pelo usuário
      const dadosEspecificos = [
        { tipo: 'Dinheiro', percentual: 64.0, valor: 6400, quantidade: 128 },
        { tipo: 'Cartão Débito', percentual: 18.0, valor: 1800, quantidade: 36 },
        { tipo: 'Cartão Crédito', percentual: 9.0, valor: 900, quantidade: 18 },
        { tipo: 'PIX', percentual: 9.0, valor: 900, quantidade: 18 }
      ];
      
      const cores = {
        'Dinheiro': '#10B981',
        'Cartão Débito': '#6366F1',
        'Cartão Crédito': '#8B5CF6',
        'PIX': '#00D4AA'
      };
      
      return dadosEspecificos.map(item => ({
        tipo: item.tipo,
        valor: item.valor,
        quantidade: item.quantidade,
        percentual: item.percentual,
        cor: cores[item.tipo as keyof typeof cores] || '#6B7280'
      }));
    } catch (error) {
      console.error('Erro ao obter formas de pagamento:', error);
      return [];
    }
  }

  private async obterTopProdutos(period: PeriodType): Promise<TopProduto[]> {
    try {
      // Simular dados de top produtos (integrar com serviço real)
      const produtosMock: TopProduto[] = [
        {
          id: '1',
          nome: 'Pizza Margherita',
          categoria: 'Pizzas',
          vendas: 156,
          receita: 4680,
          precoMedio: 30,
          margem: 65,
          avaliacaoMedia: 4.8,
          crescimentoVendas: 12.5,
          totalAvaliacoes: 89
        },
        {
          id: '2',
          nome: 'Hambúrguer Artesanal',
          categoria: 'Lanches',
          vendas: 134,
          receita: 4020,
          precoMedio: 25,
          margem: 70,
          avaliacaoMedia: 4.6,
          crescimentoVendas: 8.3,
          totalAvaliacoes: 76
        },
        {
          id: '3',
          nome: 'Açaí 500ml',
          categoria: 'Sobremesas',
          vendas: 98,
          receita: 1470,
          precoMedio: 15,
          margem: 80,
          avaliacaoMedia: 4.9,
          crescimentoVendas: 15.7,
          totalAvaliacoes: 54
        },
        {
          id: '4',
          nome: 'Sushi Combo',
          categoria: 'Japonesa',
          vendas: 67,
          receita: 3350,
          precoMedio: 50,
          margem: 60,
          avaliacaoMedia: 4.7,
          crescimentoVendas: -2.1,
          totalAvaliacoes: 43
        },
        {
          id: '5',
          nome: 'Salada Caesar',
          categoria: 'Saladas',
          vendas: 89,
          receita: 1780,
          precoMedio: 20,
          margem: 75,
          avaliacaoMedia: 4.5,
          crescimentoVendas: 6.9,
          totalAvaliacoes: 67
        }
      ];
      
      return produtosMock;
    } catch (error) {
      console.error('Erro ao obter top produtos:', error);
      return [];
    }
  }

  private async obterHorariosPico(period: PeriodType): Promise<HorarioPico[]> {
    try {
      // Simular dados de horários de pico
      const horarios = [
        '11:00', '12:00', '13:00', '18:00', '19:00', '20:00', '21:00'
      ];
      
      return horarios.map(hora => ({
        hora,
        pedidos: Math.floor(Math.random() * 50) + 20,
        receita: Math.floor(Math.random() * 2000) + 800,
        tempoMedioEntrega: Math.floor(Math.random() * 15) + 25
      }));
    } catch (error) {
      console.error('Erro ao obter horários de pico:', error);
      return [];
    }
  }

  private async obterSatisfacaoCliente(period: PeriodType): Promise<SatisfacaoCliente[]> {
    try {
      // Simular dados de satisfação
      return [{
        periodo: period === 'weekly' ? 'Última Semana' : 'Último Mês',
        avaliacaoMedia: 4.6,
        totalAvaliacoes: 234,
        distribuicaoNotas: [
          { nota: 5, quantidade: 156, percentual: 66.7 },
          { nota: 4, quantidade: 45, percentual: 19.2 },
          { nota: 3, quantidade: 23, percentual: 9.8 },
          { nota: 2, quantidade: 7, percentual: 3.0 },
          { nota: 1, quantidade: 3, percentual: 1.3 }
        ]
      }];
    } catch (error) {
      console.error('Erro ao obter satisfação do cliente:', error);
      return [];
    }
  }

  private async obterDadosCrescimento(period: PeriodType): Promise<DadosCrescimento[]> {
    try {
      const dados = await firebaseDashboardService.calcularDadosPerformance(period);
      
      return dados.categorias.map((categoria, index) => ({
        periodo: categoria,
        receitaAtual: dados.receitaAtual[index] || 0,
        receitaAnterior: dados.receitaAnterior[index] || 0,
        crescimentoPercentual: this.calcularCrescimento(
          dados.receitaAtual[index] || 0,
          dados.receitaAnterior[index] || 0
        ),
        pedidosAtual: Math.floor((dados.receitaAtual[index] || 0) / 45),
        pedidosAnterior: Math.floor((dados.receitaAnterior[index] || 0) / 45),
        crescimentoPedidos: this.calcularCrescimento(
          Math.floor((dados.receitaAtual[index] || 0) / 45),
          Math.floor((dados.receitaAnterior[index] || 0) / 45)
        )
      }));
    } catch (error) {
      console.error('Erro ao obter dados de crescimento:', error);
      return [];
    }
  }

  private async obterMetricasComparativas(period: PeriodType) {
    try {
      return await firebaseDashboardService.calcularDadosPerformance(period);
    } catch (error) {
      console.error('Erro ao obter métricas comparativas:', error);
      return {
        receitaAtual: [],
        receitaAnterior: [],
        categorias: []
      };
    }
  }

  private async calcularTaxaCancelamento(period: PeriodType) {
    try {
      // Implementar cálculo real da taxa de cancelamento
      return {
        atual: 5.2,
        variacao: -0.8
      };
    } catch (error) {
      return { atual: 0, variacao: 0 };
    }
  }

  private async calcularClientesAtivos(period: PeriodType) {
    try {
      // Implementar cálculo real de clientes ativos
      return {
        atual: 1247,
        variacao: 12.5
      };
    } catch (error) {
      return { atual: 0, variacao: 0 };
    }
  }

  private calcularCrescimento(atual: number, anterior: number): number {
    if (anterior === 0) return atual > 0 ? 100 : 0;
    return ((atual - anterior) / anterior) * 100;
  }

  async exportarRelatorio(filtros: any, periodo: PeriodType, options: ExportOptions): Promise<void> {
    try {
      // Implementar exportação real
      console.log('Exportando relatório:', { filtros, periodo, options });
      
      // Simular delay de exportação
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Aqui seria implementada a lógica real de exportação
      // Por exemplo, gerar PDF, Excel ou CSV
    } catch (error) {
      console.error('Erro ao exportar relatório:', error);
      throw new Error('Falha ao exportar relatório');
    }
  }
}

export const relatoriosService = new RelatoriosService();