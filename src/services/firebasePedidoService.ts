import { 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  writeBatch,
  serverTimestamp,
  collection,
  onSnapshot
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
      console.error('❌ Erro ao obter lojaId do BaseFirestoreService:', error);
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

  buscarPedidosTempoReal(filtros: {
    status?: string | string[];
    dataInicio?: Date;
    dataFim?: Date;
    limit?: number;
  } = {}, callback: (pedidos: Pedido[]) => void): () => void {
    try {
      const lojaId = this.getLojaId();
      
      console.log('🔍 FirebasePedidoService - lojaId:', lojaId);
      
      if (!lojaId) {
        console.error('❌ lojaId é null - usuário não autenticado');
        callback([]);
        return () => {};
      }
      
      // Determinar status para buscar
      let statusParaBuscar: string[];
      if (filtros.status) {
        if (Array.isArray(filtros.status)) {
          statusParaBuscar = filtros.status;
        } else {
          statusParaBuscar = [filtros.status];
        }
      } else {
        // Status padrão para pedidos em andamento
        statusParaBuscar = ['pendente', 'confirmado', 'pronto'];
      }

      // Construir query base - buscar pedidos com status específicos
      let q = query(
        this.pedidosCollection,
        where('lojaId', '==', lojaId),
        where('status', 'in', statusParaBuscar)
      );

      // Aplicar outros filtros
      const constraints: any[] = [];
      
      if (filtros.dataInicio) {
        constraints.push(where('dataHora', '>=', filtros.dataInicio));
      }
      
      if (filtros.dataFim) {
        constraints.push(where('dataHora', '<=', filtros.dataFim));
      }
      
      if (filtros.limit) {
        constraints.push(limit(filtros.limit));
      }

      // Aplicar constraints se houver
      if (constraints.length > 0) {
        q = query(q, ...constraints);
      }

      // Teste: buscar todos os pedidos primeiro (sem await)
      console.log('🧪 Teste: buscando todos os pedidos...');
      const testQuery = query(this.pedidosCollection);
      getDocs(testQuery).then(testSnapshot => {
        console.log('🧪 Teste - Total de pedidos no Firebase:', testSnapshot.size);
        testSnapshot.docs.forEach(doc => {
          const data = doc.data();
          console.log('🧪 Teste - Pedido encontrado:', doc.id, 'lojaId:', data.lojaId, 'status:', data.status);
        });
      }).catch(error => {
        console.error('🧪 Erro no teste:', error);
      });

      // Configurar listener em tempo real
      console.log('🔧 Configurando onSnapshot com query:', q);
      console.log('🔧 Query path:', this.pedidosCollection.path);
      console.log('🔧 LojaId na query:', lojaId);
      
      const unsubscribe = onSnapshot(q, (snapshot) => {
        console.log('📡 Listener ativo - snapshot size:', snapshot.size);
        console.log('📡 Listener ativo - snapshot empty:', snapshot.empty);
        console.log('📡 Listener ativo - snapshot metadata:', snapshot.metadata);
        console.log('📡 Listener ativo - snapshot docs:', snapshot.docs.length);
        
        if (snapshot.empty) {
          console.log('⚠️ Snapshot vazio - nenhum pedido encontrado');
          callback([]);
          return;
        }
        
        const pedidos = snapshot.docs.map(doc => {
          const data = doc.data();
          console.log('📄 Documento encontrado:', doc.id, data);
          console.log('📄 dataHora original:', data.dataHora, 'tipo:', typeof data.dataHora);
          
          // Converter dataHora corretamente
          let dataHora: Date;
          if (data.dataHora?.toDate) {
            dataHora = data.dataHora.toDate();
          } else if (data.dataHora instanceof Date) {
            dataHora = data.dataHora;
          } else if (data.dataHora) {
            dataHora = new Date(data.dataHora);
          } else {
            dataHora = new Date(); // Fallback para data atual
          }
          
          // Converter dataAtualizacao corretamente
          let dataAtualizacao: Date;
          if (data.dataAtualizacao?.toDate) {
            dataAtualizacao = data.dataAtualizacao.toDate();
          } else if (data.dataAtualizacao instanceof Date) {
            dataAtualizacao = data.dataAtualizacao;
          } else if (data.dataAtualizacao) {
            dataAtualizacao = new Date(data.dataAtualizacao);
          } else {
            dataAtualizacao = new Date(); // Fallback para data atual
          }
          
          console.log('📄 dataHora convertida:', dataHora);
          
          return {
            id: doc.id,
            ...data,
            dataHora,
            dataAtualizacao
          } as Pedido;
        });
        
        console.log('✅ Pedidos atualizados em tempo real:', pedidos.length);
        callback(pedidos);
      }, (error) => {
        console.error('❌ Erro no listener em tempo real:', error);
        console.error('❌ Código do erro:', error.code);
        console.error('❌ Mensagem do erro:', error.message);
      });

      return unsubscribe;
    } catch (error) {
      console.error('Erro ao configurar listener em tempo real:', error);
      throw new Error('Falha ao configurar listener em tempo real');
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
      
      console.log('🔍 FirebasePedidoService - Status recebido:', pedido.status);
      
      const pedidoData = {
        ...pedido,
        lojaId, // Adicionar ID da loja
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      console.log('🔍 FirebasePedidoService - Dados a serem salvos:', pedidoData);
      
      const docRef = await addDoc(this.pedidosCollection, pedidoData);
      console.log('✅ FirebasePedidoService - Pedido criado com ID:', docRef.id);
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

  async moverParaHistorico(pedido: Pedido): Promise<void> {
    try {
      console.log('🔄 FirebasePedidoService - Movendo pedido para histórico:', pedido.id);
      
      // Criar documento no histórico
      const historicoData = {
        ...pedido,
        status: 'entregue' as StatusPedido,
        dataFinalizacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };
      
      // Salvar no histórico
      const historicoRef = collection(db, 'historicoPedidos');
      await addDoc(historicoRef, historicoData);
      
      // Excluir da coleção de pedidos ativos
      const pedidoRef = doc(this.pedidosCollection, pedido.id);
      await deleteDoc(pedidoRef);
      
      console.log('✅ FirebasePedidoService - Pedido movido para histórico com sucesso');
    } catch (error) {
      console.error('❌ FirebasePedidoService - Erro ao mover para histórico:', error);
      throw new Error('Falha ao mover pedido para histórico');
    }
  }
}

// ✅ EXPORTAR instância do serviço
export const firebasePedidoService = new FirebasePedidoService(); 