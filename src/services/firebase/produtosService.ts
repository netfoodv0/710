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
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Produto } from '../../types';
import { FiltrosProduto } from '../firebaseCardapioService';

export class FirebaseProdutosService {
  private produtosCollection = collection(db, 'produtos');

  // Método auxiliar para obter o ID da loja do usuário autenticado
  public getLojaId(): string {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return user.uid;
  }

  async buscarProdutos(filtros: FiltrosProduto = {}): Promise<Produto[]> {
    try {
      const lojaId = this.getLojaId();
      
      // Sempre filtrar por loja do usuário
      let q = query(
        this.produtosCollection,
        where('lojaId', '==', lojaId)
      );
      
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
      const lojaId = this.getLojaId();
      const docRef = doc(this.produtosCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Verificar se o produto pertence à loja do usuário
        if (data.lojaId !== lojaId) {
          throw new Error('Produto não encontrado');
        }
        
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
      const lojaId = this.getLojaId();
      
      const produtoData = {
        ...produto,
        lojaId, // Adicionar ID da loja
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
      const lojaId = this.getLojaId();
      const docRef = doc(this.produtosCollection, id);
      
      // Verificar se o produto pertence à loja antes de editar
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Produto não encontrado');
      }
      
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
      const lojaId = this.getLojaId();
      const docRef = doc(this.produtosCollection, id);
      
      // Verificar se o produto pertence à loja antes de excluir
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Produto não encontrado');
      }
      
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

  async atualizarStatusProdutos(ids: string[], status: 'ativo' | 'inativo' | 'em_falta'): Promise<void> {
    try {
      const lojaId = this.getLojaId();
      const batch = writeBatch(db);

      // Verificar se todos os produtos pertencem à loja
      for (const id of ids) {
        const docRef = doc(this.produtosCollection, id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
          throw new Error(`Produto ${id} não encontrado`);
        }
        
        batch.update(docRef, {
          status,
          dataAtualizacao: serverTimestamp()
        });
      }

      await batch.commit();
    } catch (error) {
      console.error('Erro ao atualizar status dos produtos:', error);
      throw new Error('Falha ao atualizar status dos produtos');
    }
  }
} 