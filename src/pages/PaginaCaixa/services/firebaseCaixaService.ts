import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Caixa, DadosAberturaCaixa, DadosFechamentoCaixa, CaixaResumo } from '../types';

class FirebaseCaixaService {
  private collectionName = 'caixas';

  async abrirCaixa(lojaId: string, usuarioId: string, dados: DadosAberturaCaixa): Promise<string> {
    try {
      const caixaData = {
        lojaId,
        usuarioId,
        dataAbertura: serverTimestamp(),
        dataFechamento: null,
        saldoInicial: dados.saldoInicial,
        saldoFinal: null,
        status: 'aberto',
        observacoes: dados.observacoes || '',
        totalVendas: 0,
        totalEntradas: 0,
        totalSaidas: 0,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp()
      };

      const docRef = await addDoc(collection(db, this.collectionName), caixaData);
      
      console.log('✅ Caixa aberto no Firebase:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('❌ Erro ao abrir caixa no Firebase:', error);
      throw new Error('Erro ao abrir caixa no Firebase');
    }
  }

  async fecharCaixa(caixaId: string, dados: DadosFechamentoCaixa): Promise<void> {
    try {
      const caixaRef = doc(db, this.collectionName, caixaId);
      
      await updateDoc(caixaRef, {
        dataFechamento: serverTimestamp(),
        saldoFinal: dados.saldoFinal,
        status: 'fechado',
        observacoes: dados.observacoes || '',
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Caixa fechado no Firebase:', caixaId);
    } catch (error) {
      console.error('❌ Erro ao fechar caixa no Firebase:', error);
      throw new Error('Erro ao fechar caixa no Firebase');
    }
  }

  async buscarCaixaAtual(lojaId: string): Promise<Caixa | null> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('lojaId', '==', lojaId),
        where('status', '==', 'aberto'),
        orderBy('dataAbertura', 'desc'),
        limit(1)
      );

      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        console.log('📭 Nenhum caixa aberto encontrado');
        return null;
      }

      const doc = querySnapshot.docs[0];
      const data = doc.data();
      
      const caixa: Caixa = {
        id: doc.id,
        lojaId: data.lojaId,
        usuarioId: data.usuarioId,
        dataAbertura: data.dataAbertura?.toDate() || new Date(),
        dataFechamento: data.dataFechamento?.toDate() || undefined,
        saldoInicial: data.saldoInicial || 0,
        saldoFinal: data.saldoFinal || undefined,
        status: data.status || 'fechado',
        observacoes: data.observacoes || '',
        totalVendas: data.totalVendas || 0,
        totalEntradas: data.totalEntradas || 0,
        totalSaidas: data.totalSaidas || 0
      };

      console.log('✅ Caixa atual encontrado:', caixa.id);
      return caixa;
    } catch (error) {
      console.error('❌ Erro ao buscar caixa atual:', error);
      return null;
    }
  }

  async buscarHistoricoCaixas(lojaId: string, limite: number = 50): Promise<CaixaResumo[]> {
    try {
      const q = query(
        collection(db, this.collectionName),
        where('lojaId', '==', lojaId),
        orderBy('dataAbertura', 'desc'),
        limit(limite)
      );

      const querySnapshot = await getDocs(q);
      
      const caixas: CaixaResumo[] = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          dataAbertura: data.dataAbertura?.toDate().toLocaleDateString('pt-BR') || '',
          dataFechamento: data.dataFechamento?.toDate().toLocaleDateString('pt-BR') || undefined,
          saldoInicial: data.saldoInicial || 0,
          saldoFinal: data.saldoFinal || undefined,
          totalVendas: data.totalVendas || 0,
          status: data.status || 'fechado'
        };
      });

      console.log('✅ Histórico de caixas carregado:', caixas.length, 'caixas');
      return caixas;
    } catch (error) {
      console.error('❌ Erro ao buscar histórico de caixas:', error);
      return [];
    }
  }

  async atualizarTotaisCaixa(caixaId: string, totais: {
    totalVendas?: number;
    totalEntradas?: number;
    totalSaidas?: number;
  }): Promise<void> {
    try {
      const caixaRef = doc(db, this.collectionName, caixaId);
      
      await updateDoc(caixaRef, {
        ...totais,
        updatedAt: serverTimestamp()
      });
      
      console.log('✅ Totais do caixa atualizados:', caixaId);
    } catch (error) {
      console.error('❌ Erro ao atualizar totais do caixa:', error);
      throw new Error('Erro ao atualizar totais do caixa');
    }
  }
}

export const firebaseCaixaService = new FirebaseCaixaService();


