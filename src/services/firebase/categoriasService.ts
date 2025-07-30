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
  writeBatch,
  serverTimestamp
} from 'firebase/firestore';
import { auth, db } from '../../lib/firebase';
import { Categoria } from '../../types';

export class FirebaseCategoriasService {
  private categoriasCollection = collection(db, 'categorias');

  // Método auxiliar para obter o ID da loja do usuário autenticado
  public getLojaId(): string {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return user.uid;
  }

  async buscarCategorias(): Promise<Categoria[]> {
    try {
      const lojaId = this.getLojaId();
      
      const q = query(
        this.categoriasCollection,
        where('lojaId', '==', lojaId),
        orderBy('ordem', 'asc')
      );

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

  async buscarCategoria(id: string): Promise<Categoria | null> {
    try {
      const lojaId = this.getLojaId();
      const docRef = doc(this.categoriasCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Verificar se a categoria pertence à loja do usuário
        if (data.lojaId !== lojaId) {
          throw new Error('Categoria não encontrada');
        }
        
        return {
          ...data,
          id: docSnap.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Categoria;
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar categoria:', error);
      throw new Error('Falha ao carregar categoria');
    }
  }

  async criarCategoria(categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    try {
      const lojaId = this.getLojaId();
      
      const categoriaData = {
        ...categoria,
        lojaId, // Adicionar ID da loja
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
      const lojaId = this.getLojaId();
      const docRef = doc(this.categoriasCollection, id);
      
      // Verificar se a categoria pertence à loja antes de editar
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Categoria não encontrada');
      }
      
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
      const lojaId = this.getLojaId();
      const docRef = doc(this.categoriasCollection, id);
      
      // Verificar se a categoria pertence à loja antes de excluir
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Categoria não encontrada');
      }
      
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      throw new Error('Falha ao excluir categoria');
    }
  }

  async atualizarOrdemCategorias(categorias: { id: string; ordem: number }[]): Promise<void> {
    try {
      const lojaId = this.getLojaId();
      const batch = writeBatch(db);

      // Verificar se todas as categorias pertencem à loja
      for (const categoria of categorias) {
        const docRef = doc(this.categoriasCollection, categoria.id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
          throw new Error(`Categoria ${categoria.id} não encontrada`);
        }
        
        batch.update(docRef, {
          ordem: categoria.ordem,
          dataAtualizacao: serverTimestamp()
        });
      }

      await batch.commit();
    } catch (error) {
      console.error('Erro ao atualizar ordem das categorias:', error);
      throw new Error('Falha ao atualizar ordem das categorias');
    }
  }
} 