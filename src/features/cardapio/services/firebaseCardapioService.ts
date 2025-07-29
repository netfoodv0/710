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
  limit, 
  startAfter,
  writeBatch,
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Produto, Categoria, CategoriaAdicional } from '../types';

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

// Serviço de Produtos
export class FirebaseCardapioService {
  private produtosCollection = collection(db, 'produtos');
  private categoriasCollection = collection(db, 'categorias');
  private categoriasAdicionaisCollection = collection(db, 'categoriasAdicionais');

  // ===== PRODUTOS =====
  
  async buscarProdutos(filtros: FiltrosProduto = {}): Promise<Produto[]> {
    try {
      let q = query(this.produtosCollection);
      const constraints = [];

      // Filtros básicos (usando índices compostos)
      if (filtros.status) {
        constraints.push(where('status', '==', filtros.status));
      }
      
      if (filtros.destacado !== undefined) {
        constraints.push(where('destacado', '==', filtros.destacado));
      }

      if (filtros.categoriaId) {
        constraints.push(where('categoriaId', '==', filtros.categoriaId));
      }

      if (filtros.precoMin !== undefined) {
        constraints.push(where('preco', '>=', filtros.precoMin));
      }

      if (filtros.precoMax !== undefined) {
        constraints.push(where('preco', '<=', filtros.precoMax));
      }

      // Ordenação padrão (sempre incluída para usar índices)
      constraints.push(orderBy('dataAtualizacao', 'desc'));

      // Paginação
      if (filtros.limit) {
        constraints.push(limit(filtros.limit));
      }

      if (filtros.startAfter) {
        constraints.push(startAfter(filtros.startAfter));
      }

      // Aplicar constraints
      constraints.forEach(constraint => {
        q = query(q, constraint);
      });

      const snapshot = await getDocs(q);
      const produtos: Produto[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        produtos.push({
          ...data,
          id: doc.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Produto);
      });

      // Filtro de texto (client-side para flexibilidade)
      if (filtros.termo) {
        const termo = filtros.termo.toLowerCase();
        return produtos.filter(produto => 
          produto.nome.toLowerCase().includes(termo) ||
          produto.descricao.toLowerCase().includes(termo) ||
          produto.tags.some(tag => tag.toLowerCase().includes(termo))
        );
      }

      return produtos;
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      throw new Error('Falha ao carregar produtos');
    }
  }

  async buscarProduto(id: string): Promise<Produto | null> {
    try {
      const docRef = doc(this.produtosCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Produto;
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw new Error('Falha ao carregar produto');
    }
  }

  async criarProduto(produto: Omit<Produto, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    try {
      const produtoData = {
        ...produto,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.produtosCollection, produtoData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar produto:', error);
      throw new Error('Falha ao criar produto');
    }
  }

  async editarProduto(id: string, dados: Partial<Produto>): Promise<void> {
    try {
      const docRef = doc(this.produtosCollection, id);
      await updateDoc(docRef, {
        ...dados,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao editar produto:', error);
      throw new Error('Falha ao atualizar produto');
    }
  }

  async excluirProduto(id: string): Promise<void> {
    try {
      const docRef = doc(this.produtosCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
      throw new Error('Falha ao excluir produto');
    }
  }

  async duplicarProduto(id: string): Promise<string> {
    try {
      const produtoOriginal = await this.buscarProduto(id);
      if (!produtoOriginal) {
        throw new Error('Produto não encontrado');
      }

      const produtoDuplicado = {
        ...produtoOriginal,
        nome: `${produtoOriginal.nome} (Cópia)`,
        slug: `${produtoOriginal.slug}-copia`,
        vendasTotais: 0,
        avaliacaoMedia: 0,
        numeroAvaliacoes: 0,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };

      delete (produtoDuplicado as any).id;
      return await this.criarProduto(produtoDuplicado);
    } catch (error) {
      console.error('Erro ao duplicar produto:', error);
      throw new Error('Falha ao duplicar produto');
    }
  }

  // ===== CATEGORIAS =====

  async buscarCategorias(filtros: FiltrosCategoria = {}): Promise<Categoria[]> {
    try {
      let q = query(this.categoriasCollection);
      const constraints = [];

      if (filtros.ativa !== undefined) {
        constraints.push(where('ativa', '==', filtros.ativa));
      }

      if (filtros.tipo) {
        constraints.push(where('tipo', '==', filtros.tipo));
      }

      if (filtros.status) {
        constraints.push(where('status', '==', filtros.status));
      }

      constraints.push(orderBy('nome', 'asc'));

      constraints.forEach(constraint => {
        q = query(q, constraint);
      });

      const snapshot = await getDocs(q);
      const categorias: Categoria[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        categorias.push({
          ...data,
          id: doc.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Categoria);
      });

      return categorias;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new Error('Falha ao carregar categorias');
    }
  }

  async criarCategoria(categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    try {
      const categoriaData = {
        ...categoria,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.categoriasCollection, categoriaData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
      throw new Error('Falha ao criar categoria');
    }
  }

  async editarCategoria(id: string, dados: Partial<Categoria>): Promise<void> {
    try {
      const docRef = doc(this.categoriasCollection, id);
      await updateDoc(docRef, {
        ...dados,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
      throw new Error('Falha ao atualizar categoria');
    }
  }

  async excluirCategoria(id: string): Promise<void> {
    try {
      // Verificar se há produtos na categoria
      const produtos = await this.buscarProdutos({ categoriaId: id });
      if (produtos.length > 0) {
        throw new Error('Não é possível excluir categoria com produtos');
      }

      const docRef = doc(this.categoriasCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      throw new Error('Falha ao excluir categoria');
    }
  }

  // ===== CATEGORIAS ADICIONAIS =====

  async buscarCategoriasAdicionais(): Promise<CategoriaAdicional[]> {
    try {
      const q = query(
        this.categoriasAdicionaisCollection,
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
      const categoriaData = {
        ...categoria,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.categoriasAdicionaisCollection, categoriaData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar categoria adicional:', error);
      throw new Error('Falha ao criar categoria adicional');
    }
  }

  async editarCategoriaAdicional(id: string, dados: Partial<CategoriaAdicional>): Promise<void> {
    try {
      const docRef = doc(this.categoriasAdicionaisCollection, id);
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
      const docRef = doc(this.categoriasAdicionaisCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir categoria adicional:', error);
      throw new Error('Falha ao excluir categoria adicional');
    }
  }

  // ===== ESTATÍSTICAS =====

  async buscarEstatisticasCardapio(): Promise<{
    totalProdutos: number;
    produtosAtivos: number;
    produtosDestacados: number;
    produtosEmFalta: number;
    categoriasAtivas: number;
    receitaTotal: number;
  }> {
    try {
      const [produtos, categorias] = await Promise.all([
        this.buscarProdutos(),
        this.buscarCategorias({ ativa: true })
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

  // ===== OPERAÇÕES EM LOTE =====

  async atualizarStatusProdutos(ids: string[], status: 'ativo' | 'inativo' | 'em_falta'): Promise<void> {
    try {
      const batch = writeBatch(db);

      ids.forEach(id => {
        const docRef = doc(this.produtosCollection, id);
        batch.update(docRef, {
          status,
          dataAtualizacao: serverTimestamp()
        });
      });

      await batch.commit();
    } catch (error) {
      console.error('Erro ao atualizar status dos produtos:', error);
      throw new Error('Falha ao atualizar status dos produtos');
    }
  }
}

// Instância singleton
export const firebaseCardapioService = new FirebaseCardapioService(); 