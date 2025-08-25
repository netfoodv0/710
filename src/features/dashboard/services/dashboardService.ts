import { KPI, Pedido, DadosFormaPagamento, EstatisticasGerais } from '../types/dashboard.types';
import { firebaseDashboardService } from '../../../services/firebaseDashboardService';

class DashboardService {
  async obterKPIs(): Promise<KPI[]> {
    try {
      const dados = await firebaseDashboardService.calcularKPIs('weekly');
      return dados;
    } catch (error) {
      console.error('Erro ao obter KPIs:', error);
      throw new Error('Falha ao carregar KPIs');
    }
  }

  async obterFormasPagamento(): Promise<DadosFormaPagamento[]> {
    try {
      const dados = await firebaseDashboardService.calcularFormasPagamento();
      return dados;
    } catch (error) {
      console.error('Erro ao obter formas de pagamento:', error);
      throw new Error('Falha ao carregar formas de pagamento');
    }
  }

  async obterPedidosRecentes(): Promise<Pedido[]> {
    try {
      const dados = await firebaseDashboardService.buscarPedidosRecentes(5);
      return dados;
    } catch (error) {
      console.error('Erro ao obter pedidos recentes:', error);
      throw new Error('Falha ao carregar pedidos recentes');
    }
  }

  async obterDadosGraficoPizza(): Promise<Array<{ name: string; value: number; color: string }>> {
    try {
      // Buscar todos os pedidos da loja para calcular dados do gráfico
      const pedidos = await firebaseDashboardService.buscarPedidosRecentes(100);
      
      console.log('🍕 Debug gráfico pizza:', {
        totalPedidos: pedidos.length,
        pedidos: pedidos.map(p => ({
          id: p.id,
          itens: p.itens.map(i => i.nome)
        }))
      });
      
      // Contar itens por categoria
      const categorias: { [key: string]: number } = {};
      pedidos.forEach(pedido => {
        pedido.itens.forEach(item => {
          const categoria = this.extrairCategoria(item.nome);
          categorias[categoria] = (categorias[categoria] || 0) + item.quantidade;
        });
      });

      console.log('📊 Categorias encontradas:', categorias);

      // Mapear cores para categorias
      const coresMap: { [key: string]: string } = {
        'Pizza': '#8B5CF6',
        'Hambúrguer': '#6B7280',
        'Lasanha': '#7C3AED',
        'Salmão': '#8B5CF6',
        'Risotto': '#6B7280',
        'Bebida': '#7C3AED',
        'Sobremesa': '#8B5CF6',
        'Acompanhamento': '#6B7280',
        'Salada': '#7C3AED',
        'Sanduíche': '#8B5CF6',
        'Outros': '#6B7280'
      };

      const total = Object.values(categorias).reduce((sum, count) => sum + count, 0);

      if (total === 0) {
        console.log('⚠️ Nenhum item encontrado, retornando dados de fallback');
        return [
          { name: 'Pizza', value: 30, color: '#10B981' },
          { name: 'Hambúrguer', value: 25, color: '#F59E0B' },
          { name: 'Lasanha', value: 15, color: '#3B82F6' },
          { name: 'Bebida', value: 12, color: '#06B6D4' },
          { name: 'Sobremesa', value: 8, color: '#EC4899' },
          { name: 'Acompanhamento', value: 10, color: '#84CC16' }
        ];
      }

      const resultado = Object.entries(categorias).map(([categoria, quantidade]) => ({
        name: categoria,
        value: Math.round((quantidade / total) * 100),
        color: coresMap[categoria] || '#6B7280'
      }));

      console.log('🎨 Resultado gráfico pizza:', resultado);

      return resultado;
    } catch (error) {
      console.error('❌ Erro ao obter dados do gráfico:', error);
      // Retornar dados de fallback em caso de erro
      return [
        { name: 'Pizza', value: 30, color: '#10B981' },
        { name: 'Hambúrguer', value: 25, color: '#F59E0B' },
        { name: 'Lasanha', value: 15, color: '#3B82F6' },
        { name: 'Bebida', value: 12, color: '#06B6D4' },
        { name: 'Sobremesa', value: 8, color: '#EC4899' },
        { name: 'Acompanhamento', value: 10, color: '#84CC16' }
      ];
    }
  }

  async obterEstatisticas(): Promise<EstatisticasGerais> {
    try {
      const dados = await firebaseDashboardService.calcularEstatisticasGerais();
      return dados;
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }

  // Método auxiliar para extrair categoria do nome do item
  private extrairCategoria(nomeItem: string): string {
    const nomeLower = nomeItem.toLowerCase();
    
    // Pizzas
    if (nomeLower.includes('pizza')) return 'Pizza';
    
    // Hambúrgueres
    if (nomeLower.includes('hambúrguer') || nomeLower.includes('burger') || nomeLower.includes('burger')) return 'Hambúrguer';
    
    // Massas
    if (nomeLower.includes('lasanha') || nomeLower.includes('macarrão') || nomeLower.includes('macarrao') || nomeLower.includes('spaghetti')) return 'Lasanha';
    
    // Peixes
    if (nomeLower.includes('salmão') || nomeLower.includes('salmao') || nomeLower.includes('peixe') || nomeLower.includes('atum')) return 'Salmão';
    
    // Risottos
    if (nomeLower.includes('risotto') || nomeLower.includes('risoto')) return 'Risotto';
    
    // Bebidas
    if (nomeLower.includes('refrigerante') || nomeLower.includes('suco') || nomeLower.includes('água') || nomeLower.includes('agua') || nomeLower.includes('cerveja') || nomeLower.includes('bebida')) return 'Bebida';
    
    // Sobremesas
    if (nomeLower.includes('sobremesa') || nomeLower.includes('doce') || nomeLower.includes('pudim') || nomeLower.includes('sorvete') || nomeLower.includes('bolo')) return 'Sobremesa';
    
    // Batatas
    if (nomeLower.includes('batata') || nomeLower.includes('frita')) return 'Acompanhamento';
    
    // Saladas
    if (nomeLower.includes('salada') || nomeLower.includes('salad')) return 'Salada';
    
    // Sanduíches
    if (nomeLower.includes('sanduíche') || nomeLower.includes('sanduiche') || nomeLower.includes('sandwich')) return 'Sanduíche';
    
    return 'Outros';
  }
}

export const dashboardService = new DashboardService(); 