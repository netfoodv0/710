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
import { db } from '../../lib/firebase';
import { lojaIsolation } from '../../lib/lojaIsolation';
import { Categoria } from '../../types';

export class FirebaseCategoriasService {
  private categoriasCollection = collection(db, 'categorias');

  async buscarCategorias(): Promise<Categoria[]> {
    return lojaIsolation.withReadIsolation(async () => {
      const lojaId = lojaIsolation.getLojaId();
      
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
    }, 'Falha ao carregar categorias');
  }

  async buscarCategoria(id: string): Promise<Categoria | null> {
    return lojaIsolation.withReadIsolation(async () => {
      const lojaId = lojaIsolation.getLojaId();
      const docRef = doc(this.categoriasCollection, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = docSnap.data();
        
        // Verificar se a categoria pertence à loja do usuário
        if (!lojaIsolation.validateLojaOwnership(data, id)) {
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
    }, 'Falha ao carregar categoria');
  }

  async criarCategoria(categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    return lojaIsolation.withWriteIsolation(async () => {
      const categoriaData = lojaIsolation.addLojaId({
        ...categoria,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      });

      const docRef = await addDoc(this.categoriasCollection, categoriaData);
      return docRef.id;
    }, 'Falha ao criar categoria');
  }

  async editarCategoria(id: string, dados: Partial<Categoria>): Promise<void> {
    return lojaIsolation.withWriteIsolation(async () => {
      const docRef = doc(this.categoriasCollection, id);
      
      // Verificar se a categoria pertence à loja antes de editar
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || !lojaIsolation.validateLojaOwnership(docSnap.data(), id)) {
        throw new Error('Categoria não encontrada');
      }
      
      await updateDoc(docRef, {
        ...dados,
        dataAtualizacao: serverTimestamp()
      });
    }, 'Falha ao atualizar categoria');
  }

  async excluirCategoria(id: string): Promise<void> {
    return lojaIsolation.withWriteIsolation(async () => {
      const docRef = doc(this.categoriasCollection, id);
      
      // Verificar se a categoria pertence à loja antes de excluir
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || !lojaIsolation.validateLojaOwnership(docSnap.data(), id)) {
        throw new Error('Categoria não encontrada');
      }
      
      await deleteDoc(docRef);
    }, 'Falha ao excluir categoria');
  }

  async atualizarOrdemCategorias(categorias: { id: string; ordem: number }[]): Promise<void> {
    return lojaIsolation.withWriteIsolation(async () => {
      const batch = writeBatch(db);

      // Verificar se todas as categorias pertencem à loja
      for (const categoria of categorias) {
        const docRef = doc(this.categoriasCollection, categoria.id);
        const docSnap = await getDoc(docRef);
        
        if (!docSnap.exists() || !lojaIsolation.validateLojaOwnership(docSnap.data(), categoria.id)) {
          throw new Error(`Categoria ${categoria.id} não encontrada`);
        }
        
        batch.update(docRef, {
          ordem: categoria.ordem,
          dataAtualizacao: serverTimestamp()
        });
      }

      await batch.commit();
    }, 'Falha ao atualizar ordem das categorias');
  }
} 