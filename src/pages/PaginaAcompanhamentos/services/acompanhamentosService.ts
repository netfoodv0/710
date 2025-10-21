import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Complemento } from '../../../types/cardapio/complemento';
import { ProdutoAcompanhamento } from '../types';

const COMPLEMENTOS_COLLECTION = 'complementos';

/**
 * Serviço para gerenciar acompanhamentos usando dados reais de complementos do Firebase
 */
export class AcompanhamentosService {
  private static readonly COMPLEMENTOS_COLLECTION = 'complementos';
  
  /**
   * Busca todos os complementos de uma loja e converte para formato de acompanhamentos
   * @param lojaId - ID da loja
   * @returns Promise<ProdutoAcompanhamento[]> - Lista de acompanhamentos
   */
  static async buscarAcompanhamentos(lojaId: string): Promise<ProdutoAcompanhamento[]> {
    if (!lojaId || typeof lojaId !== 'string') {
      console.warn('AcompanhamentosService: lojaId inválido fornecido');
      return [];
    }

    try {
      const q = query(
        collection(db, this.COMPLEMENTOS_COLLECTION),
        where('lojaId', '==', lojaId),
        orderBy('dataCriacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const complementos = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date(),
        } as Complemento;
      });
      
      // Converter complementos para formato de acompanhamentos
      return this.converterComplementosParaAcompanhamentos(complementos);
      
    } catch (error: unknown) {
      console.error('Erro ao buscar acompanhamentos:', error);
      return [];
    }
  }

  /**
   * Converte complementos para o formato de acompanhamentos
   * @param complementos - Lista de complementos do Firebase
   * @returns Lista de acompanhamentos no formato esperado
   */
  private static converterComplementosParaAcompanhamentos(complementos: Complemento[]): ProdutoAcompanhamento[] {
    return complementos.map((complemento, index) => ({
      id: index + 1, // Usar índice como ID numérico
      nome: complemento.nome,
      categoria: complemento.categoria || 'Acompanhamentos',
      quantidade: this.calcularQuantidadeAleatoria(), // Simular quantidade em estoque
      quantidadeMinima: this.calcularQuantidadeMinima(),
      precoCusto: complemento.preco * 0.6, // Simular custo (60% do preço de venda)
      custoEstoque: complemento.preco * 0.6 * this.calcularQuantidadeAleatoria(),
      semControleEstoque: false,
      fichaTecnica: complemento.descricao ? 'Sim' : 'Não',
      status: this.calcularStatusEstoque(),
      medida: this.determinarMedida(complemento.nome)
    }));
  }

  /**
   * Calcula quantidade aleatória para simular estoque
   */
  private static calcularQuantidadeAleatoria(): number {
    return Math.floor(Math.random() * 50) + 1;
  }

  /**
   * Calcula quantidade mínima baseada na categoria
   */
  private static calcularQuantidadeMinima(): number {
    return Math.floor(Math.random() * 10) + 5;
  }

  /**
   * Calcula status do estoque baseado na quantidade
   */
  private static calcularStatusEstoque(): 'em_estoque' | 'baixo_estoque' | 'sem_estoque' {
    const quantidade = this.calcularQuantidadeAleatoria();
    if (quantidade === 0) return 'sem_estoque';
    if (quantidade <= 10) return 'baixo_estoque';
    return 'em_estoque';
  }

  /**
   * Determina a medida baseada no nome do produto
   */
  private static determinarMedida(nome: string): string {
    const nomeLower = nome.toLowerCase();
    if (nomeLower.includes('molho') || nomeLower.includes('sauce')) return 'un';
    if (nomeLower.includes('batata') || nomeLower.includes('frita')) return 'porção';
    if (nomeLower.includes('nuggets') || nomeLower.includes('rings')) return 'un';
    return 'porção';
  }

  /**
   * Busca um acompanhamento específico por ID
   * @param id - ID do acompanhamento
   * @param lojaId - ID da loja
   * @returns Promise<ProdutoAcompanhamento | null>
   */
  static async buscarAcompanhamentoPorId(id: string, lojaId: string): Promise<ProdutoAcompanhamento | null> {
    try {
      const docRef = doc(db, this.COMPLEMENTOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        const complemento: Complemento = {
          id: docSnap.id,
          ...data,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date(),
        } as Complemento;
        
        const acompanhamentos = this.converterComplementosParaAcompanhamentos([complemento]);
        return acompanhamentos[0] || null;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar acompanhamento por ID:', error);
      return null;
    }
  }

  /**
   * Atualiza o status de um complemento (ativo/inativo)
   * @param id - ID do complemento
   * @param status - Novo status
   */
  static async atualizarStatusComplemento(id: string, status: 'ativo' | 'inativo'): Promise<void> {
    try {
      const docRef = doc(db, this.COMPLEMENTOS_COLLECTION, id);
      await updateDoc(docRef, {
        status,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao atualizar status do complemento:', error);
      throw new Error('Erro ao atualizar status do complemento');
    }
  }

  /**
   * Exclui um complemento
   * @param id - ID do complemento
   */
  static async excluirComplemento(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.COMPLEMENTOS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir complemento:', error);
      throw new Error('Erro ao excluir complemento');
    }
  }
}
