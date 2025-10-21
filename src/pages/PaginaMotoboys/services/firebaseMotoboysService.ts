import { 
  collection,
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDocs,
  getDoc,
  query,
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Motoboy } from '../types';

export class FirebaseMotoboysService {
  private motoboysCollection = collection(db, 'motoboys');

  /**
   * Obtém o ID da loja do usuário autenticado
   */
  private getLojaId(): string {
    // Por enquanto, retorna um ID fixo para teste
    // Em produção, isso deve vir do contexto de autenticação
    return 'loja-teste-123';
  }

  /**
   * Busca todos os motoboys da loja
   */
  async getMotoboys(): Promise<Motoboy[]> {
    try {
      const lojaId = this.getLojaId();
      const q = query(
        this.motoboysCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataCriacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const motoboys: Motoboy[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        motoboys.push({
          id: doc.id,
          lojaId: data.lojaId,
          nome: data.nome,
          telefone: data.telefone,
          status: data.status,
          dataContratacao: data.dataContratacao,
          ultimaEntrega: data.ultimaEntrega,
          avaliacao: data.avaliacao || 0,
          totalEntregas: data.totalEntregas || 0,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        });
      });
      
      return motoboys;
    } catch (error) {
      console.error('Erro ao buscar motoboys:', error);
      throw new Error('Falha ao carregar motoboys');
    }
  }

  /**
   * Busca um motoboy específico pelo ID
   */
  async getMotoboy(id: string): Promise<Motoboy | null> {
    try {
      const docRef = doc(this.motoboysCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          lojaId: data.lojaId,
          nome: data.nome,
          telefone: data.telefone,
          status: data.status,
          dataContratacao: data.dataContratacao,
          ultimaEntrega: data.ultimaEntrega,
          avaliacao: data.avaliacao || 0,
          totalEntregas: data.totalEntregas || 0,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar motoboy:', error);
      throw new Error('Falha ao carregar motoboy');
    }
  }

  /**
   * Cria um novo motoboy
   */
  async criarMotoboy(motoboy: Partial<Motoboy>): Promise<Motoboy> {
    try {
      const lojaId = this.getLojaId();
      
      const motoboyData = {
        lojaId,
        nome: motoboy.nome || '',
        telefone: motoboy.telefone || '',
        status: motoboy.status || 'ativo',
        dataContratacao: motoboy.dataContratacao || new Date().toISOString().split('T')[0],
        ultimaEntrega: '',
        avaliacao: 0,
        totalEntregas: 0,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.motoboysCollection, motoboyData);
      
      return {
        id: docRef.id,
        lojaId,
        nome: motoboyData.nome,
        telefone: motoboyData.telefone,
        status: motoboyData.status,
        dataContratacao: motoboyData.dataContratacao,
        ultimaEntrega: motoboyData.ultimaEntrega,
        avaliacao: motoboyData.avaliacao,
        totalEntregas: motoboyData.totalEntregas,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };
    } catch (error) {
      console.error('Erro ao criar motoboy:', error);
      throw new Error('Falha ao criar motoboy');
    }
  }

  /**
   * Atualiza um motoboy existente
   */
  async editarMotoboy(id: string, motoboy: Partial<Motoboy>): Promise<void> {
    try {
      const docRef = doc(this.motoboysCollection, id);
      const updateData = {
        ...motoboy,
        dataAtualizacao: serverTimestamp()
      };
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erro ao editar motoboy:', error);
      throw new Error('Falha ao editar motoboy');
    }
  }

  /**
   * Exclui um motoboy
   */
  async excluirMotoboy(id: string): Promise<void> {
    try {
      const docRef = doc(this.motoboysCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir motoboy:', error);
      throw new Error('Falha ao excluir motoboy');
    }
  }

  /**
   * Busca motoboys por status
   */
  async getMotoboysPorStatus(status: 'ativo' | 'inativo'): Promise<Motoboy[]> {
    try {
      const lojaId = this.getLojaId();
      const q = query(
        this.motoboysCollection,
        where('lojaId', '==', lojaId),
        where('status', '==', status),
        orderBy('dataCriacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const motoboys: Motoboy[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        motoboys.push({
          id: doc.id,
          lojaId: data.lojaId,
          nome: data.nome,
          telefone: data.telefone,
          status: data.status,
          dataContratacao: data.dataContratacao,
          ultimaEntrega: data.ultimaEntrega,
          avaliacao: data.avaliacao || 0,
          totalEntregas: data.totalEntregas || 0,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        });
      });
      
      return motoboys;
    } catch (error) {
      console.error('Erro ao buscar motoboys por status:', error);
      throw new Error('Falha ao carregar motoboys');
    }
  }

  /**
   * Atualiza a avaliação de um motoboy
   */
  async atualizarAvaliacao(id: string, avaliacao: number): Promise<void> {
    try {
      const docRef = doc(this.motoboysCollection, id);
      await updateDoc(docRef, {
        avaliacao,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao atualizar avaliação:', error);
      throw new Error('Falha ao atualizar avaliação');
    }
  }

  /**
   * Incrementa o total de entregas de um motoboy
   */
  async incrementarEntregas(id: string): Promise<void> {
    try {
      const motoboy = await this.getMotoboy(id);
      if (motoboy) {
        const docRef = doc(this.motoboysCollection, id);
        await updateDoc(docRef, {
          totalEntregas: motoboy.totalEntregas + 1,
          ultimaEntrega: new Date().toISOString().split('T')[0],
          dataAtualizacao: serverTimestamp()
        });
      }
    } catch (error) {
      console.error('Erro ao incrementar entregas:', error);
      throw new Error('Falha ao atualizar entregas');
    }
  }
}
