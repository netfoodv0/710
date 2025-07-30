import { EstatisticasCardapio } from '../firebaseCardapioService';
import { FirebaseProdutosService } from './produtosService';
import { FirebaseCategoriasService } from './categoriasService';

export class FirebaseEstatisticasService {
  private produtosService: FirebaseProdutosService;
  private categoriasService: FirebaseCategoriasService;

  constructor() {
    this.produtosService = new FirebaseProdutosService();
    this.categoriasService = new FirebaseCategoriasService();
  }

  async buscarEstatisticasCardapio(): Promise<EstatisticasCardapio> {
    try {
      const [produtos, categorias] = await Promise.all([
        this.produtosService.buscarProdutos(),
        this.categoriasService.buscarCategorias({ ativa: true })
      ]);

      const produtosAtivos = produtos.filter(p => p.status === 'ativo');
      const produtosDestacados = produtos.filter(p => p.destacado);
      const produtosEmFalta = produtos.filter(p => p.status === 'em_falta');
      const receitaTotal = produtosAtivos.reduce((total, p) => total + p.preco, 0);

      return {
        totalProdutos: produtos.length,
        produtosAtivos: produtosAtivos.length,
        produtosDestacados: produtosDestacados.length,
        produtosEmFalta: produtosEmFalta.length,
        categoriasAtivas: categorias.length,
        receitaTotal
      };
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }
} 