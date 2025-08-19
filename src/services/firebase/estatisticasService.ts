import { EstatisticasCardapio } from '../firebaseCardapioService';
import { FirebaseProdutosService } from './produtosService';
import { BaseFirestoreService } from './BaseFirestoreService';


export class FirebaseEstatisticasService extends BaseFirestoreService {
  private produtosService: FirebaseProdutosService;


  constructor() {
    super();
    this.produtosService = new FirebaseProdutosService();

  }

  async buscarEstatisticasCardapio(): Promise<EstatisticasCardapio> {
    try {
      const produtos = await this.produtosService.buscarProdutos();

      const produtosAtivos = produtos.filter(p => p.status === 'ativo');
      const produtosDestacados = produtos.filter(p => p.destacado);
      const produtosEmFalta = produtos.filter(p => p.status === 'em_falta');
      const receitaTotal = produtosAtivos.reduce((total, p) => total + p.preco, 0);

      return {
        totalProdutos: produtos.length,
        produtosAtivos: produtosAtivos.length,
        produtosDestacados: produtosDestacados.length,
        produtosEmFalta: produtosEmFalta.length,

        receitaTotal
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }
} 