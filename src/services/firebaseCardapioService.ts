import { QueryDocumentSnapshot, DocumentData, doc } from 'firebase/firestore';
import { FirebaseProdutosService } from './firebase/produtosService';
import { FirebaseCategoriasService } from './firebase/categoriasService';
import { FirebaseEstatisticasService } from './firebase/estatisticasService';
import { Produto, Categoria, CategoriaAdicional } from '../types';
import { collection, query, where, orderBy, getDocs, getDoc, addDoc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { lojaIsolation } from '../lib/lojaIsolation';

// Tipos para queries otimizadas
export interface FiltrosProduto {
  categoriaId?: string;
  status?: 'ativo' | 'inativo' | 'em_falta';
  destacado?: boolean;
  precoMin?: number;
  precoMax?: number;
  termo?: string;
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
}

export interface FiltrosCategoria {
  ativa?: boolean;
  tipo?: string;
  status?: 'ativo' | 'inativo';
}

export interface EstatisticasCardapio {
  totalProdutos: number;
  produtosAtivos: number;
  produtosDestacados: number;
  produtosEmFalta: number;
  categoriasAtivas: number;
  receitaTotal: number;
}

// Serviço principal que combina todos os serviços do Firebase
export class FirebaseCardapioService {
  private produtosService: FirebaseProdutosService;
  private categoriasService: FirebaseCategoriasService;
  private estatisticasService: FirebaseEstatisticasService;

  constructor() {
    this.produtosService = new FirebaseProdutosService();
    this.categoriasService = new FirebaseCategoriasService();
    this.estatisticasService = new FirebaseEstatisticasService();
  }

  // ===== PRODUTOS =====
  
  async buscarProdutos(filtros: FiltrosProduto = {}): Promise<Produto[]> {
    return this.produtosService.buscarProdutos(filtros);
  }

  async buscarProduto(id: string): Promise<Produto | null> {
    return this.produtosService.buscarProduto(id);
  }

  async criarProduto(produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    return this.produtosService.criarProduto(produto);
  }

  async editarProduto(id: string, dados: Partial<Produto>): Promise<void> {
    return this.produtosService.editarProduto(id, dados);
  }

  async excluirProduto(id: string): Promise<void> {
    return this.produtosService.excluirProduto(id);
  }

  async duplicarProduto(id: string): Promise<string> {
    return this.produtosService.duplicarProduto(id);
  }

  async atualizarStatusProdutos(ids: string[], status: 'ativo' | 'inativo' | 'em_falta'): Promise<void> {
    return this.produtosService.atualizarStatusProdutos(ids, status);
  }

  // ===== CATEGORIAS =====

  async buscarCategorias(filtros: FiltrosCategoria = {}): Promise<Categoria[]> {
    return this.categoriasService.buscarCategorias(filtros);
  }

  async criarCategoria(categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    return this.categoriasService.criarCategoria(categoria);
  }

  async editarCategoria(id: string, dados: Partial<Categoria>): Promise<void> {
    return this.categoriasService.editarCategoria(id, dados);
  }

  async excluirCategoria(id: string): Promise<void> {
    return this.categoriasService.excluirCategoria(id);
  }

  // ===== CATEGORIAS ADICIONAIS =====

  // ✅ IMPLEMENTAR métodos de categorias adicionais
  async buscarCategoriasAdicionais(): Promise<CategoriaAdicional[]> {
    try {
      const lojaId = lojaIsolation.getLojaId();
      
      const q = query(
        collection(db, 'categoriasAdicionais'),
        where('lojaId', '==', lojaId),
        orderBy('nome', 'asc')
      );

      const snapshot = await getDocs(q);
      const categorias: CategoriaAdicional[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        categorias.push({
          ...data,
          id: doc.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as CategoriaAdicional);
      });

      return categorias;
    } catch (error) {
      console.error('Erro ao buscar categorias adicionais:', error);
      throw new Error('Falha ao carregar categorias adicionais');
    }
  }

  async criarCategoriaAdicional(categoria: Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    try {
      const lojaId = lojaIsolation.getLojaId();
      
      const categoriaData = {
        ...categoria,
        lojaId, // Adicionar ID da loja
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, 'categoriasAdicionais'), categoriaData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar categoria adicional:', error);
      throw new Error('Falha ao criar categoria adicional');
    }
  }

  async editarCategoriaAdicional(id: string, dados: Partial<CategoriaAdicional>): Promise<void> {
    try {
      const lojaId = lojaIsolation.getLojaId();
      const docRef = doc(db, 'categoriasAdicionais', id);
      
      // Verificar se a categoria pertence à loja antes de editar
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Categoria adicional não encontrada');
      }
      
      await updateDoc(docRef, {
        ...dados,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao editar categoria adicional:', error);
      throw new Error('Falha ao atualizar categoria adicional');
    }
  }

  async excluirCategoriaAdicional(id: string): Promise<void> {
    try {
      const lojaId = lojaIsolation.getLojaId();
      const docRef = doc(db, 'categoriasAdicionais', id);
      
      // Verificar se a categoria pertence à loja antes de excluir
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Categoria adicional não encontrada');
      }
      
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir categoria adicional:', error);
      throw new Error('Falha ao excluir categoria adicional');
    }
  }

  // ===== ESTATÍSTICAS =====

  async buscarEstatisticasCardapio(): Promise<EstatisticasCardapio> {
    return this.estatisticasService.buscarEstatisticasCardapio();
  }
}

// Instância singleton
export const firebaseCardapioService = new FirebaseCardapioService(); 