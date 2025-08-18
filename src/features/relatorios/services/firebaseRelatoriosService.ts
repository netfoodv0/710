import { 
  collection, 
  query, 
  where, 
  orderBy, 
  getDocs,
  getCountFromServer,
  Timestamp,
  startAt,
  endAt
} from 'firebase/firestore';
import { auth, db } from '../../../lib/firebase';
import { 
  DadosRelatorios, 
  RelatoriosKPIs, 
  VendasPorCategoria, 
  PerformanceTemporal,
  FormaPagamentoRelatorio,
  TopProduto,
  HorarioPico,
  SatisfacaoCliente,
  DadosCrescimento
} from '../types/relatorios.types';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';
import { Pedido, StatusPedido } from '../../../types/pedidos';

export class FirebaseRelatoriosService {
  private pedidosCollection = collection(db, 'pedidos');
  private historicoPedidosCollection = collection(db, 'historicoPedidos');

  // Método auxiliar para obter o ID da loja do usuário autenticado
  private getLojaId(): string {
    const user = auth.currentUser;
    console.log('👤 Usuário atual:', user?.uid, 'Email:', user?.email);
    
    if (!user) {
      console.error('❌ Usuário não autenticado');
      throw new Error('Usuário não autenticado');
    }
    
    console.log('✅ LojaId obtido:', user.uid);
    return user.uid;
  }

  // Calcular intervalo de datas baseado no período
  private calcularIntervaloDatas(period: PeriodType): { inicio: Date; fim: Date; periodoAnterior: { inicio: Date; fim: Date } } {
    const agora = new Date();
    const fim = new Date(agora);
    let inicio: Date;
    let periodoAnteriorInicio: Date;
    let periodoAnteriorFim: Date;

    switch (period) {
      case 'daily':
        inicio = new Date(agora.getFullYear(), agora.getMonth(), agora.getDate());
        periodoAnteriorFim = new Date(inicio);
        periodoAnteriorFim.setDate(periodoAnteriorFim.getDate() - 1);
        periodoAnteriorInicio = new Date(periodoAnteriorFim.getFullYear(), periodoAnteriorFim.getMonth(), periodoAnteriorFim.getDate());
        break;
      case 'weekly':
        const diasSemana = agora.getDay();
        inicio = new Date(agora);
        inicio.setDate(agora.getDate() - diasSemana);
        inicio.setHours(0, 0, 0, 0);
        periodoAnteriorFim = new Date(inicio);
        periodoAnteriorInicio = new Date(periodoAnteriorFim);
        periodoAnteriorInicio.setDate(periodoAnteriorInicio.getDate() - 7);
        break;
      case 'monthly':
      default:
        inicio = new Date(agora.getFullYear(), agora.getMonth(), 1);
        periodoAnteriorFim = new Date(inicio);
        periodoAnteriorInicio = new Date(agora.getFullYear(), agora.getMonth() - 1, 1);
        break;
    }

    return {
      inicio,
      fim,
      periodoAnterior: {
        inicio: periodoAnteriorInicio,
        fim: periodoAnteriorFim
      }
    };
  }

  // Buscar pedidos por período
  private async buscarPedidosPorPeriodo(inicio: Date, fim: Date): Promise<Pedido[]> {
    try {
      const lojaId = this.getLojaId();
      console.log('🏪 Buscando pedidos para loja:', lojaId);
      
      const q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        where('dataHora', '>=', Timestamp.fromDate(inicio)),
        where('dataHora', '<=', Timestamp.fromDate(fim)),
        orderBy('dataHora', 'desc')
      );

      console.log('🔍 Query executada para período:', inicio.toISOString(), 'até', fim.toISOString());
      
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

      console.log(`📦 ${pedidos.length} pedidos encontrados para o período`);
      return pedidos;
    } catch (error) {
      console.error('❌ Erro ao buscar pedidos por período:', error);
      return [];
    }
  }

  // Obter dados completos dos relatórios
  async obterDadosCompletos(period: PeriodType): Promise<DadosRelatorios> {
    try {
      console.log('🔍 FirebaseRelatoriosService: Iniciando busca de dados para período:', period);
      
      const { inicio, fim, periodoAnterior } = this.calcularIntervaloDatas(period);
      console.log('📅 Período atual:', inicio.toISOString(), 'até', fim.toISOString());
      console.log('📅 Período anterior:', periodoAnterior.inicio.toISOString(), 'até', periodoAnterior.fim.toISOString());
      
      // Buscar dados do período atual e anterior em paralelo
      const [pedidosAtual, pedidosAnterior] = await Promise.all([
        this.buscarPedidosPorPeriodo(inicio, fim),
        this.buscarPedidosPorPeriodo(periodoAnterior.inicio, periodoAnterior.fim)
      ]);

      console.log('📊 Pedidos encontrados - Atual:', pedidosAtual.length, 'Anterior:', pedidosAnterior.length);

      // Calcular todos os dados em paralelo
      const [kpis, vendasCategoria, performance, formasPagamento, topProdutos] = await Promise.all([
        this.calcularKPIs(pedidosAtual, pedidosAnterior),
        this.calcularVendasPorCategoria(pedidosAtual),
        this.calcularPerformanceTemporal(pedidosAtual, period),
        this.calcularFormasPagamento(pedidosAtual),
        this.calcularTopProdutos(pedidosAtual)
      ]);

      console.log('📈 KPIs calculados:', kpis);

      const [horariosPico, satisfacao, crescimento, metricas] = await Promise.all([
        this.calcularHorariosPico(pedidosAtual),
        this.calcularSatisfacaoCliente(pedidosAtual),
        this.calcularDadosCrescimento(pedidosAtual, pedidosAnterior, period),
        this.calcularMetricasComparativas(pedidosAtual, pedidosAnterior)
      ]);

      const resultado = {
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

      console.log('✅ Dados completos dos relatórios obtidos com sucesso');
      return resultado;
    } catch (error) {
      console.error('❌ Erro ao obter dados completos dos relatórios:', error);
      throw new Error('Falha ao carregar dados dos relatórios');
    }
  }

  // Calcular KPIs
  private async calcularKPIs(pedidosAtual: Pedido[], pedidosAnterior: Pedido[]): Promise<RelatoriosKPIs> {
    const pedidosEntregues = pedidosAtual.filter(p => p.status === 'entregue');
    const pedidosEntreguesAnterior = pedidosAnterior.filter(p => p.status === 'entregue');
    
    const receitaTotal = pedidosEntregues.reduce((sum, p) => sum + p.total, 0);
    const receitaAnterior = pedidosEntreguesAnterior.reduce((sum, p) => sum + p.total, 0);
    
    const ticketMedio = pedidosEntregues.length > 0 ? receitaTotal / pedidosEntregues.length : 0;
    const ticketMedioAnterior = pedidosEntreguesAnterior.length > 0 ? receitaAnterior / pedidosEntreguesAnterior.length : 0;
    
    const pedidosCancelados = pedidosAtual.filter(p => p.status === 'cancelado').length;
    const taxaCancelamento = pedidosAtual.length > 0 ? (pedidosCancelados / pedidosAtual.length) * 100 : 0;
    
    const pedidosCanceladosAnterior = pedidosAnterior.filter(p => p.status === 'cancelado').length;
    const taxaCancelamentoAnterior = pedidosAnterior.length > 0 ? (pedidosCanceladosAnterior / pedidosAnterior.length) * 100 : 0;
    
    // Calcular clientes únicos
    const clientesUnicos = new Set(pedidosAtual.map(p => p.cliente.telefone)).size;
    const clientesUnicosAnterior = new Set(pedidosAnterior.map(p => p.cliente.telefone)).size;
    
    // Calcular tempo médio de entrega (simulado)
    const tempoMedioEntrega = 35; // Valor fixo por enquanto
    
    // Calcular avaliação média (simulado)
    const avaliacaoMedia = 4.6; // Valor fixo por enquanto
    
    return {
      receitaTotal,
      receitaVariacao: this.calcularVariacao(receitaTotal, receitaAnterior),
      pedidosTotal: pedidosAtual.length,
      pedidosVariacao: this.calcularVariacao(pedidosAtual.length, pedidosAnterior.length),
      ticketMedio,
      ticketMedioVariacao: this.calcularVariacao(ticketMedio, ticketMedioAnterior),
      tempoMedioEntrega,
      tempoEntregaVariacao: 0, // Implementar quando houver dados reais
      avaliacaoMedia,
      avaliacaoVariacao: 0, // Implementar quando houver dados reais
      taxaCancelamento,
      taxaCancelamentoVariacao: this.calcularVariacao(taxaCancelamento, taxaCancelamentoAnterior),
      produtosMaisVendidos: this.contarProdutosUnicos(pedidosAtual),
      clientesAtivos: clientesUnicos,
      clientesAtivosVariacao: this.calcularVariacao(clientesUnicos, clientesUnicosAnterior)
    };
  }

  // Calcular vendas por categoria
  private async calcularVendasPorCategoria(pedidos: Pedido[]): Promise<VendasPorCategoria[]> {
    const categorias = new Map<string, { valor: number; quantidade: number }>();
    
    pedidos.filter(p => p.status === 'entregue').forEach(pedido => {
      pedido.itens.forEach(item => {
        // Usar uma categoria padrão se não estiver definida
        const categoria = 'Geral'; // Pode ser expandido para usar dados reais de categoria
        const atual = categorias.get(categoria) || { valor: 0, quantidade: 0 };
        categorias.set(categoria, {
          valor: atual.valor + (item.preco * item.quantidade),
          quantidade: atual.quantidade + item.quantidade
        });
      });
    });
    
    const totalValor = Array.from(categorias.values()).reduce((sum, cat) => sum + cat.valor, 0);
    const cores = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4', '#84CC16', '#F97316'];
    
    return Array.from(categorias.entries()).map(([categoria, dados], index) => ({
      categoria,
      valor: dados.valor,
      quantidade: dados.quantidade,
      percentual: totalValor > 0 ? (dados.valor / totalValor) * 100 : 0,
      cor: cores[index % cores.length]
    }));
  }

  // Calcular performance temporal
  private async calcularPerformanceTemporal(pedidos: Pedido[], period: PeriodType): Promise<PerformanceTemporal[]> {
    const grupos = new Map<string, Pedido[]>();
    
    pedidos.forEach(pedido => {
      let chave: string;
      const data = pedido.dataHora;
      
      switch (period) {
        case 'daily':
          chave = `${data.getHours()}:00`;
          break;
        case 'weekly':
          const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
          chave = diasSemana[data.getDay()];
          break;
        case 'monthly':
        default:
          chave = `${data.getDate().toString().padStart(2, '0')}/${(data.getMonth() + 1).toString().padStart(2, '0')}`;
          break;
      }
      
      if (!grupos.has(chave)) {
        grupos.set(chave, []);
      }
      grupos.get(chave)!.push(pedido);
    });
    
    return Array.from(grupos.entries()).map(([periodo, pedidosPeriodo]) => {
      const pedidosEntregues = pedidosPeriodo.filter(p => p.status === 'entregue');
      const receita = pedidosEntregues.reduce((sum, p) => sum + p.total, 0);
      const ticketMedio = pedidosEntregues.length > 0 ? receita / pedidosEntregues.length : 0;
      
      return {
        periodo,
        receita,
        pedidos: pedidosPeriodo.length,
        ticketMedio,
        tempoEntrega: 35 + Math.random() * 10 // Simulado
      };
    }).sort((a, b) => a.periodo.localeCompare(b.periodo));
  }

  // Calcular formas de pagamento
  private async calcularFormasPagamento(pedidos: Pedido[]): Promise<FormaPagamentoRelatorio[]> {
    const formas = new Map<string, { valor: number; quantidade: number }>();
    const pedidosEntregues = pedidos.filter(p => p.status === 'entregue');
    
    pedidosEntregues.forEach(pedido => {
      const forma = this.normalizarFormaPagamento(pedido.formaPagamento);
      const atual = formas.get(forma) || { valor: 0, quantidade: 0 };
      formas.set(forma, {
        valor: atual.valor + pedido.total,
        quantidade: atual.quantidade + 1
      });
    });
    
    const totalValor = Array.from(formas.values()).reduce((sum, forma) => sum + forma.valor, 0);
    const cores = {
      'Dinheiro': '#10B981',
      'Cartão Débito': '#6366F1',
      'Cartão Crédito': '#8B5CF6',
      'PIX': '#00D4AA',
      'Outros': '#6B7280'
    };
    
    return Array.from(formas.entries()).map(([tipo, dados]) => ({
      tipo,
      valor: dados.valor,
      quantidade: dados.quantidade,
      percentual: totalValor > 0 ? (dados.valor / totalValor) * 100 : 0,
      cor: cores[tipo as keyof typeof cores] || cores['Outros']
    }));
  }

  // Calcular top produtos
  private async calcularTopProdutos(pedidos: Pedido[]): Promise<TopProduto[]> {
    const produtos = new Map<string, {
      nome: string;
      vendas: number;
      receita: number;
      avaliacoes: number[];
    }>();
    
    pedidos.filter(p => p.status === 'entregue').forEach(pedido => {
      pedido.itens.forEach(item => {
        const atual = produtos.get(item.nome) || {
          nome: item.nome,
          vendas: 0,
          receita: 0,
          avaliacoes: []
        };
        
        produtos.set(item.nome, {
          ...atual,
          vendas: atual.vendas + item.quantidade,
          receita: atual.receita + (item.preco * item.quantidade),
          avaliacoes: [...atual.avaliacoes, 4 + Math.random()] // Simulado
        });
      });
    });
    
    return Array.from(produtos.entries())
      .map(([nome, dados], index) => {
        const avaliacaoMedia = dados.avaliacoes.length > 0 
          ? dados.avaliacoes.reduce((sum, av) => sum + av, 0) / dados.avaliacoes.length 
          : 4.5;
        
        return {
          id: (index + 1).toString(),
          nome: dados.nome,
          categoria: 'Geral', // Pode ser expandido
          vendas: dados.vendas,
          receita: dados.receita,
          precoMedio: dados.vendas > 0 ? dados.receita / dados.vendas : 0,
          margem: 65 + Math.random() * 20, // Simulado
          avaliacaoMedia,
          crescimentoVendas: (Math.random() - 0.5) * 30, // Simulado
          totalAvaliacoes: dados.avaliacoes.length
        };
      })
      .sort((a, b) => b.vendas - a.vendas)
      .slice(0, 10);
  }

  // Calcular horários de pico
  private async calcularHorariosPico(pedidos: Pedido[]): Promise<HorarioPico[]> {
    const horarios = new Map<string, { pedidos: number; receita: number }>();
    
    pedidos.forEach(pedido => {
      const hora = `${pedido.dataHora.getHours().toString().padStart(2, '0')}:00`;
      const atual = horarios.get(hora) || { pedidos: 0, receita: 0 };
      horarios.set(hora, {
        pedidos: atual.pedidos + 1,
        receita: atual.receita + (pedido.status === 'entregue' ? pedido.total : 0)
      });
    });
    
    return Array.from(horarios.entries())
      .map(([hora, dados]) => ({
        hora,
        pedidos: dados.pedidos,
        receita: dados.receita,
        tempoMedioEntrega: 25 + Math.random() * 20 // Simulado
      }))
      .sort((a, b) => b.pedidos - a.pedidos)
      .slice(0, 10);
  }

  // Calcular satisfação do cliente
  private async calcularSatisfacaoCliente(pedidos: Pedido[]): Promise<SatisfacaoCliente[]> {
    // Dados simulados - implementar quando houver sistema de avaliação
    const totalAvaliacoes = pedidos.filter(p => p.status === 'entregue').length;
    
    return [{
      periodo: 'Período Atual',
      avaliacaoMedia: 4.6,
      totalAvaliacoes,
      distribuicaoNotas: [
        { nota: 5, quantidade: Math.floor(totalAvaliacoes * 0.67), percentual: 67 },
        { nota: 4, quantidade: Math.floor(totalAvaliacoes * 0.19), percentual: 19 },
        { nota: 3, quantidade: Math.floor(totalAvaliacoes * 0.10), percentual: 10 },
        { nota: 2, quantidade: Math.floor(totalAvaliacoes * 0.03), percentual: 3 },
        { nota: 1, quantidade: Math.floor(totalAvaliacoes * 0.01), percentual: 1 }
      ]
    }];
  }

  // Calcular dados de crescimento
  private async calcularDadosCrescimento(pedidosAtual: Pedido[], pedidosAnterior: Pedido[], period: PeriodType): Promise<DadosCrescimento[]> {
    const performanceAtual = await this.calcularPerformanceTemporal(pedidosAtual, period);
    const performanceAnterior = await this.calcularPerformanceTemporal(pedidosAnterior, period);
    
    return performanceAtual.map(atual => {
      const anterior = performanceAnterior.find(p => p.periodo === atual.periodo);
      
      return {
        periodo: atual.periodo,
        receitaAtual: atual.receita,
        receitaAnterior: anterior?.receita || 0,
        crescimentoPercentual: this.calcularVariacao(atual.receita, anterior?.receita || 0),
        pedidosAtual: atual.pedidos,
        pedidosAnterior: anterior?.pedidos || 0,
        crescimentoPedidos: this.calcularVariacao(atual.pedidos, anterior?.pedidos || 0)
      };
    });
  }

  // Calcular métricas comparativas
  private async calcularMetricasComparativas(pedidosAtual: Pedido[], pedidosAnterior: Pedido[]) {
    const receitaAtual = pedidosAtual
      .filter(p => p.status === 'entregue')
      .reduce((sum, p) => sum + p.total, 0);
    
    const receitaAnterior = pedidosAnterior
      .filter(p => p.status === 'entregue')
      .reduce((sum, p) => sum + p.total, 0);
    
    return {
      receitaAtual: [receitaAtual],
      receitaAnterior: [receitaAnterior],
      categorias: ['Período Atual']
    };
  }

  // Métodos auxiliares
  private calcularVariacao(atual: number, anterior: number): number {
    if (anterior === 0) return atual > 0 ? 100 : 0;
    return ((atual - anterior) / anterior) * 100;
  }

  private normalizarFormaPagamento(forma: string): string {
    const formaLower = forma.toLowerCase();
    if (formaLower.includes('dinheiro')) return 'Dinheiro';
    if (formaLower.includes('pix')) return 'PIX';
    if (formaLower.includes('credito')) return 'Cartão Crédito';
    if (formaLower.includes('debito')) return 'Cartão Débito';
    return 'Outros';
  }

  private contarProdutosUnicos(pedidos: Pedido[]): number {
    const produtosUnicos = new Set<string>();
    pedidos.forEach(pedido => {
      pedido.itens.forEach(item => {
        produtosUnicos.add(item.nome);
      });
    });
    return produtosUnicos.size;
  }
}

export const firebaseRelatoriosService = new FirebaseRelatoriosService();