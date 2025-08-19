import { 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  startAfter,
  writeBatch,
  serverTimestamp,
  collection
} from 'firebase/firestore';
import { Pedido } from '../types';
import { BaseFirestoreService } from './firebase/BaseFirestoreService';
import { db } from '../lib/firebase';

export class FirebasePedidoService extends BaseFirestoreService {
  // Referência para a coleção de pedidos
  private pedidosCollection = collection(db, 'pedidos');

  // Método auxiliar para obter o ID da loja do usuário autenticado
  public getLojaId(): string | null {
    try {
      return super.getLojaId();
    } catch (error) {
      return null;
    }
  }

  async buscarPedidos(filtros: {
    status?: string;
    dataInicio?: Date;
    dataFim?: Date;
    limit?: number;
    startAfter?: any;
  } = {}): Promise<Pedido[]> {
    try {
      const lojaId = this.getLojaId();
      
      // Criar constraints base
      const constraints: any[] = [this.createConstraints().orderByDesc('dataHora')];
      
      // Filtros básicos
      if (filtros.status) {
        constraints.push(this.createConstraints().where('status', '==', filtros.status));
      }

      if (filtros.dataInicio) {
        constraints.push(this.createConstraints().where('dataHora', '>=', filtros.dataInicio));
      }

      if (filtros.dataFim) {
        constraints.push(this.createConstraints().where('dataHora', '<=', filtros.dataFim));
      }

      // Paginação
      if (filtros.limit) {
        constraints.push(this.createConstraints().limit(filtros.limit));
      }

      if (filtros.startAfter) {
        constraints.push(startAfter(filtros.startAfter));
      }

      const snapshot = await this.executeQuery('pedidos', ...constraints);

      const pedidos: Pedido[] = this.mapDocuments<Pedido>(snapshot);

      return pedidos;
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
      throw new Error('Falha ao carregar pedidos');
    }
  }

  async buscarPedido(id: string): Promise<Pedido | null> {
    try {
      const documentSnapshot = await this.fetchDocument<Pedido>('pedidos', id);

      if (documentSnapshot && documentSnapshot.exists()) {
        return this.mapDocument<Pedido>(documentSnapshot);
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar pedido:', error);
      throw new Error('Falha ao carregar pedido');
    }
  }

  async criarPedido(pedido: Omit<Pedido, 'id' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    try {
      const lojaId = this.getLojaId();
      
      const pedidoData = {
        ...pedido,
        lojaId, // Adicionar ID da loja
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.pedidosCollection, pedidoData);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
      throw new Error('Falha ao criar pedido');
    }
  }

  async atualizarStatusPedido(id: string, status: string): Promise<void> {
    try {
      const lojaId = this.getLojaId();
      const docRef = doc(this.pedidosCollection, id);
      
      // Verificar se o pedido pertence à loja antes de atualizar
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Pedido não encontrado');
      }
      
      await updateDoc(docRef, {
        status,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      throw new Error('Falha ao atualizar status do pedido');
    }
  }

  async excluirPedido(id: string): Promise<void> {
    try {
      const lojaId = this.getLojaId();
      const docRef = doc(this.pedidosCollection, id);
      
      // Verificar se o pedido pertence à loja antes de excluir
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists() || docSnap.data()?.lojaId !== lojaId) {
        throw new Error('Pedido não encontrado');
      }
      
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir pedido:', error);
      throw new Error('Falha ao excluir pedido');
    }
  }

  async buscarHistoricoPedidos(filtros: {
    status?: string;
    dataInicio?: Date;
    dataFim?: Date;
    limit?: number;
  } = {}): Promise<Pedido[]> {
    try {
      const lojaId = this.getLojaId();
      
      // Buscar no histórico (coleção separada)
      const historicoCollection = collection(db, 'historicoPedidos');
      
      let q = query(
        historicoCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataHora', 'desc')
      );
      
      const constraints = [];

      if (filtros.status) {
        constraints.push(where('status', '==', filtros.status));
      }

      if (filtros.dataInicio) {
        constraints.push(where('dataHora', '>=', filtros.dataInicio));
      }

      if (filtros.dataFim) {
        constraints.push(where('dataHora', '<=', filtros.dataFim));
      }

      if (filtros.limit) {
        constraints.push(limit(filtros.limit));
      }

      constraints.forEach(constraint => {
        q = query(q, constraint);
      });

      const snapshot = await getDocs(q);
      const pedidos: Pedido[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        pedidos.push({
          ...data,
          id: doc.id,
          dataHora: data.dataHora?.toDate() || new Date(),
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Pedido);
      });

      return pedidos;
    } catch (error) {
      console.error('Erro ao buscar histórico de pedidos:', error);
      throw new Error('Falha ao carregar histórico de pedidos');
    }
  }
}

// ✅ EXPORTAR instância do serviço
export const firebasePedidoService = new FirebasePedidoService(); 