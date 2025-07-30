import { 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  getDocs, 
  getDoc, 
  query, 
  where, 
  orderBy, 
  onSnapshot,
  Timestamp,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Pedido, StatusPedido } from '../types';

export interface PedidoFirebase extends Omit<Pedido, 'dataHora'> {
  dataHora: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export interface PedidoHistoricoFirebase extends PedidoFirebase {
  statusAnterior?: StatusPedido;
  observacao?: string;
}

class FirebasePedidoService {
  private readonly COLLECTION_PEDIDOS = 'pedidos';
  private readonly COLLECTION_HISTORICO = 'historico_pedidos';

  // Converter Pedido para formato Firebase
  private converterParaFirebase(pedido: Omit<Pedido, 'id'>): Omit<PedidoFirebase, 'id'> {
    // Remover campos undefined/null antes de enviar para Firebase
    const pedidoLimpo = this.removerCamposVazios(pedido);
    
    return {
      ...pedidoLimpo,
      dataHora: Timestamp.fromDate(pedido.dataHora),
      createdAt: serverTimestamp() as Timestamp,
      updatedAt: serverTimestamp() as Timestamp
    };
  }

  // Remover campos undefined/null
  private removerCamposVazios(obj: any): any {
    const novoObj: any = {};
    
    for (const [key, value] of Object.entries(obj)) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'object' && !Array.isArray(value)) {
          novoObj[key] = this.removerCamposVazios(value);
        } else {
          novoObj[key] = value;
        }
      }
    }
    
    return novoObj;
  }

  // Converter documento Firebase para Pedido
  private converterParaPedido(doc: any): Pedido {
    const data = doc.data();
    
    // Converter dataHora com segurança
    let dataHora: Date;
    try {
      dataHora = data.dataHora ? data.dataHora.toDate() : new Date();
    } catch (error) {
      console.warn('Erro ao converter dataHora, usando data atual:', error);
      dataHora = new Date();
    }
    
    return {
      id: doc.id,
      numero: data.numero || '',
      status: data.status || 'novo',
      dataHora,
      cliente: data.cliente || null,
      itens: data.itens || [],
      total: data.total || 0,
      formaPagamento: data.formaPagamento || 'PIX',
      formaEntrega: data.formaEntrega || 'delivery',
      origemPedido: data.origemPedido || 'ifood',
      pagamento: data.pagamento || {
        valorPago: 0,
        statusPagamento: 'pendente'
      },
      clienteNovo: data.clienteNovo || false,
      tempoEstimado: data.tempoEstimado || '15 min',
      enderecoEntrega: data.enderecoEntrega || null
    };
  }

  // Adicionar novo pedido
  async adicionarPedido(pedido: Omit<Pedido, 'id'>): Promise<Pedido | null> {
    try {
      const pedidoFirebase = this.converterParaFirebase(pedido);
      const docRef = await addDoc(collection(db, this.COLLECTION_PEDIDOS), pedidoFirebase);
      
      const novoPedido: Pedido = {
        id: docRef.id,
        ...pedido
      };

      // Adicionar ao histórico
      await this.adicionarAoHistorico(novoPedido, pedido.status, 'Pedido criado');
      
      return novoPedido;
    } catch (error) {
      console.error('Erro ao adicionar pedido:', error);
      return null;
    }
  }

  // Atualizar status do pedido
  async atualizarStatus(pedidoId: string, novoStatus: StatusPedido, observacao?: string): Promise<Pedido | null> {
    try {
      const pedidoRef = doc(db, this.COLLECTION_PEDIDOS, pedidoId);
      const pedidoDoc = await getDoc(pedidoRef);
      
      if (!pedidoDoc.exists()) {
        throw new Error('Pedido não encontrado');
      }

      const pedidoAtual = this.converterParaPedido(pedidoDoc);
      const statusAnterior = pedidoAtual.status;

      // Validar transição de status
      if (!this.validarTransicaoStatus(statusAnterior, novoStatus)) {
        throw new Error(`Transição inválida de ${statusAnterior} para ${novoStatus}`);
      }

      // Atualizar pedido
      await updateDoc(pedidoRef, {
        status: novoStatus,
        dataHora: serverTimestamp(),
        updatedAt: serverTimestamp()
      });

      const pedidoAtualizado: Pedido = {
        ...pedidoAtual,
        status: novoStatus,
        dataHora: new Date()
      };

      // Adicionar ao histórico
      await this.adicionarAoHistorico(pedidoAtualizado, novoStatus, observacao);

      return pedidoAtualizado;
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
      return null;
    }
  }

  // Obter todos os pedidos
  async obterTodosPedidos(): Promise<Pedido[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_PEDIDOS),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.converterParaPedido(doc));
    } catch (error) {
      console.error('Erro ao obter pedidos:', error);
      return [];
    }
  }

  // Obter pedidos por status
  async obterPedidosPorStatus(status: StatusPedido): Promise<Pedido[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_PEDIDOS),
        where('status', '==', status),
        orderBy('createdAt', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => this.converterParaPedido(doc));
    } catch (error) {
      console.error('Erro ao obter pedidos por status:', error);
      return [];
    }
  }

  // Obter pedido por ID
  async obterPedidoPorId(id: string): Promise<Pedido | null> {
    try {
      const docRef = doc(db, this.COLLECTION_PEDIDOS, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return this.converterParaPedido(docSnap);
      }
      return null;
    } catch (error) {
      console.error('Erro ao obter pedido por ID:', error);
      return null;
    }
  }

  // Obter histórico de pedido
  async obterHistoricoPedido(pedidoId: string): Promise<PedidoHistoricoFirebase[]> {
    try {
      const q = query(
        collection(db, this.COLLECTION_HISTORICO),
        where('id', '==', pedidoId),
        orderBy('dataAlteracao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          ...data,
          dataHora: data.dataHora ? data.dataHora.toDate() : new Date()
        } as PedidoHistoricoFirebase;
      });
    } catch (error) {
      console.error('Erro ao obter histórico:', error);
      return [];
    }
  }

  // Obter pedidos entregues
  async obterPedidosEntregues(): Promise<Pedido[]> {
    return this.obterPedidosPorStatus('entregue');
  }

  // Cancelar pedido
  async cancelarPedido(pedidoId: string, motivo?: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'cancelado', motivo || 'Pedido cancelado');
  }

  // Aceitar pedido
  async aceitarPedido(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'preparando', 'Pedido aceito e em preparo');
  }

  // Recusar pedido
  async recusarPedido(pedidoId: string, motivo?: string): Promise<Pedido | null> {
    return this.cancelarPedido(pedidoId, motivo || 'Pedido recusado');
  }

  // Avançar para preparo
  async avancarParaPreparo(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'preparando', 'Pedido em preparo');
  }

  // Avançar para entrega
  async avancarParaEntrega(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'saiu_entrega', 'Pedido saiu para entrega');
  }

  // Finalizar pedido
  async finalizarPedido(pedidoId: string): Promise<Pedido | null> {
    return this.atualizarStatus(pedidoId, 'entregue', 'Pedido entregue');
  }

  // Validar transição de status
  private validarTransicaoStatus(statusAtual: StatusPedido, novoStatus: StatusPedido): boolean {
    const transicoesValidas: Record<StatusPedido, StatusPedido[]> = {
      'novo': ['preparando', 'cancelado'],
      'confirmado': ['preparando', 'cancelado'],
      'preparando': ['saiu_entrega', 'cancelado'],
      'saiu_entrega': ['entregue', 'cancelado'],
      'entregue': [], // Status final
      'cancelado': [] // Status final
    };

    return transicoesValidas[statusAtual]?.includes(novoStatus) || false;
  }

  // Adicionar ao histórico
  private async adicionarAoHistorico(pedido: Pedido, status: StatusPedido, observacao?: string) {
    try {
      const historicoEntry: Omit<PedidoHistoricoFirebase, 'id'> = {
        ...pedido,
        dataHora: Timestamp.fromDate(pedido.dataHora),
        createdAt: serverTimestamp() as Timestamp,
        updatedAt: serverTimestamp() as Timestamp,
        observacao
      };

      await addDoc(collection(db, this.COLLECTION_HISTORICO), historicoEntry);
    } catch (error) {
      console.error('Erro ao adicionar ao histórico:', error);
    }
  }

  // Estatísticas
  async obterEstatisticas() {
    try {
      const todosPedidos = await this.obterTodosPedidos();
      const total = todosPedidos.length;
      const porStatus = {
        novo: todosPedidos.filter(p => p.status === 'novo').length,
        confirmado: todosPedidos.filter(p => p.status === 'confirmado').length,
        preparando: todosPedidos.filter(p => p.status === 'preparando').length,
        saiu_entrega: todosPedidos.filter(p => p.status === 'saiu_entrega').length,
        entregue: todosPedidos.filter(p => p.status === 'entregue').length,
        cancelado: todosPedidos.filter(p => p.status === 'cancelado').length
      };

      return { total, porStatus };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      return { total: 0, porStatus: { novo: 0, confirmado: 0, preparando: 0, saiu_entrega: 0, entregue: 0, cancelado: 0 } };
    }
  }

  // Listener em tempo real para pedidos
  onPedidosChange(callback: (pedidos: Pedido[]) => void) {
    const q = query(
      collection(db, this.COLLECTION_PEDIDOS),
      orderBy('createdAt', 'desc')
    );

    return onSnapshot(q, (querySnapshot) => {
      const pedidos = querySnapshot.docs.map(doc => this.converterParaPedido(doc));
      callback(pedidos);
    });
  }
}

export const firebasePedidoService = new FirebasePedidoService(); 