import { 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  startAfter,
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { Produto } from '../../types';
import { FiltrosProduto } from '../firebaseCardapioService';
import { BaseFirestoreService } from './BaseFirestoreService';

export class FirebaseProdutosService extends BaseFirestoreService {

  // Método auxiliar para obter o ID da loja do usuário autenticado
  public getLojaId(): string {
    return super.getLojaId();
  }

  async buscarProdutos(filtros: FiltrosProduto = {}): Promise<Produto[]> {
    try {
      // Criar constraints base
      const constraints: any[] = [];
      
      // Filtros básicos (usando índices compostos)
      if (filtros.status) {
        constraints.push(this.createConstraints().where('status', '==', filtros.status));
      }
      
      if (filtros.destacado !== undefined) {
        constraints.push(this.createConstraints().where('destacado', '==', filtros.destacado));
      }

      if (filtros.categoriaId) {
        constraints.push(this.createConstraints().where('categoriaId', '==', filtros.categoriaId));
      }

      if (filtros.precoMin !== undefined) {
        constraints.push(this.createConstraints().where('preco', '>=', filtros.precoMin));
      }

      if (filtros.precoMax !== undefined) {
        constraints.push(this.createConstraints().where('preco', '<=', filtros.precoMax));
      }

      // Paginação
      if (filtros.limit) {
        constraints.push(this.createConstraints().limit(filtros.limit));
      }

      if (filtros.startAfter) {
        constraints.push(startAfter(filtros.startAfter));
      }

      const snapshot = await this.executeQuery('produtos', ...constraints);

      const produtos: Produto[] = this.mapDocuments<Produto>(snapshot);

      // Ordenação client-side por posição (produtos sem posição vão para o final)
      produtos.sort((a, b) => {
        const posicaoA = a.posicao || 9999;
        const posicaoB = b.posicao || 9999;
        
        if (posicaoA !== posicaoB) {
          return posicaoA - posicaoB;
        }
        
        // Fallback para data de criação se posições forem iguais
        return a.dataCriacao.getTime() - b.dataCriacao.getTime();
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
      const documentSnapshot = await this.fetchDocument<Produto>('produtos', id);

      if (documentSnapshot && documentSnapshot.exists()) {
        return this.mapDocument<Produto>(documentSnapshot);
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
      
      // Se não foi especificada posição, buscar a próxima posição disponível
      let posicao = produto.posicao;
      if (posicao === undefined) {
        // Buscar a maior posição atual para esta loja com query simples
        const q = query(
          this.produtosCollection,
          where('lojaId', '==', lojaId)
        );
        
        const snapshot = await getDocs(q);
        let maxPosicao = 0;
        
        snapshot.forEach(doc => {
          const data = doc.data();
          const pos = data.posicao || 0;
          if (pos > maxPosicao) {
            maxPosicao = pos;
          }
        });
        
        posicao = maxPosicao + 1;
      }
      
      const produtoData = {
        ...produto,
        posicao,
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

  async atualizarPosicoesProdutos(lojaId: string, produtosOrdenados: string[]): Promise<void> {
    try {
      // Buscar todos os produtos com query simples
      const q = query(
        this.produtosCollection,
        where('lojaId', '==', lojaId)
      );
      
      const snapshot = await getDocs(q);
      const produtosPorNome = new Map<string, string>(); // nome -> id
      
      snapshot.forEach(doc => {
        const data = doc.data();
        produtosPorNome.set(data.nome, doc.id);
      });
      
      // Criar batch de atualizações
      const updates = produtosOrdenados.map((nome, index) => {
        const produtoId = produtosPorNome.get(nome);
        if (produtoId) {
          const docRef = doc(this.produtosCollection, produtoId);
          return updateDoc(docRef, { 
            posicao: index + 1,
            dataAtualizacao: serverTimestamp()
          });
        }
        return null;
      }).filter(Boolean);

      // Executar todas as atualizações
      await Promise.all(updates);
    } catch (error) {
      console.error('Erro ao atualizar posições dos produtos:', error);
      throw new Error('Falha ao atualizar posições dos produtos');
    }
  }

  async migrarProdutosParaPosicao(lojaId: string): Promise<void> {
    try {
      // Buscar produtos com query simples para evitar erro de índice
      const q = query(
        this.produtosCollection,
        where('lojaId', '==', lojaId)
      );
      
      const snapshot = await getDocs(q);
      const produtosSemPosicao: {id: string, posicao?: number}[] = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.posicao === undefined || data.posicao === null) {
          produtosSemPosicao.push({
            id: doc.id,
            posicao: data.posicao
          });
        }
      });
      
      if (produtosSemPosicao.length === 0) {
        return; // Já migraram
      }

      // Atualizar produtos sem posição
      const updates = produtosSemPosicao.map((produto, index) => {
        const docRef = doc(this.produtosCollection, produto.id);
        return updateDoc(docRef, { 
          posicao: index + 1,
          dataAtualizacao: serverTimestamp()
        });
      });

      await Promise.all(updates);
    } catch (error) {
      console.error('Erro ao migrar produtos para posição:', error);
      throw new Error('Falha ao migrar produtos');
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