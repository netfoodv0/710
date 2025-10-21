import { 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  serverTimestamp,
  QueryDocumentSnapshot,
  DocumentData,
  getDoc,
  where,
  limit,
  startAfter
} from 'firebase/firestore';
import { BaseFirestoreService } from './BaseFirestoreService';
import { Cupom } from '../../types/cupons';

export interface CupomFirebase extends Omit<Cupom, 'id'> {
  lojaId: string;
  dataCriacao: any;
  dataAtualizacao: any;
}

export interface FiltrosCupom {
  status?: 'ativo' | 'inativo';
  tipo?: 'percentual' | 'valor_fixo' | 'brinde' | 'frete_gratis';
  categoria?: string;
  termo?: string;
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
}

export class FirebaseCuponsService extends BaseFirestoreService {
  private readonly collectionName = 'cupons';

  /**
   * Cria um novo cupom
   */
  async criarCupom(cupomData: Omit<CupomFirebase, 'lojaId' | 'dataCriacao' | 'dataAtualizacao'>): Promise<string> {
    try {
      const lojaId = this.getLojaId();
      
      const cupom: CupomFirebase = {
        ...cupomData,
        lojaId,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.getCollection(this.collectionName), cupom);
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar cupom:', error);
      throw new Error('Erro ao criar cupom');
    }
  }

  /**
   * Atualiza um cupom existente
   */
  async atualizarCupom(cupomId: string, cupomData: Partial<Omit<CupomFirebase, 'lojaId' | 'dataCriacao'>>): Promise<void> {
    try {
      const lojaId = this.getLojaId();
      const docRef = doc(this.getCollection(this.collectionName), cupomId);
      
      await updateDoc(docRef, {
        ...cupomData,
        dataAtualizacao: serverTimestamp()
      });
    } catch (error) {
      console.error('Erro ao atualizar cupom:', error);
      throw new Error('Erro ao atualizar cupom');
    }
  }

  /**
   * Exclui um cupom
   */
  async excluirCupom(cupomId: string): Promise<void> {
    try {
      const docRef = doc(this.getCollection(this.collectionName), cupomId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir cupom:', error);
      throw new Error('Erro ao excluir cupom');
    }
  }

  /**
   * Busca cupons com filtros
   */
  async buscarCupons(filtros: FiltrosCupom = {}): Promise<Cupom[]> {
    try {
      const constraints: QueryConstraint[] = [];
      
      if (filtros.status) {
        constraints.push(where('status', '==', filtros.status));
      }
      
      if (filtros.tipo) {
        constraints.push(where('tipo', '==', filtros.tipo));
      }
      
      if (filtros.categoria) {
        constraints.push(where('categoria', '==', filtros.categoria));
      }

      if (filtros.limit) {
        constraints.push(limit(filtros.limit));
      }

      if (filtros.startAfter) {
        constraints.push(startAfter(filtros.startAfter));
      }

      const querySnapshot = await this.executeQuery(this.collectionName, {}, ...constraints);
      
      return querySnapshot.docs.map(doc => this.mapDocument<Cupom>(doc));
    } catch (error) {
      console.error('Erro ao buscar cupons:', error);
      throw new Error('Erro ao buscar cupons');
    }
  }

  /**
   * Busca cupom por ID
   */
  async buscarCupomPorId(cupomId: string): Promise<Cupom | null> {
    try {
      const lojaId = this.getLojaId();
      const docRef = doc(this.getCollection(this.collectionName), cupomId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as CupomFirebase;
        if (data.lojaId === lojaId) {
          return this.mapDocument<Cupom>(docSnap as QueryDocumentSnapshot<DocumentData>);
        }
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar cupom por ID:', error);
      throw new Error('Erro ao buscar cupom');
    }
  }

  /**
   * Verifica se um código de cupom já existe para a loja atual
   * @param codigo Código do cupom a verificar
   * @param cupomIdExcluir ID do cupom a excluir da verificação (útil ao editar)
   * @returns true se o código já existe, false caso contrário
   */
  async verificarCodigoExistente(codigo: string, cupomIdExcluir?: string): Promise<boolean> {
    try {
      const constraints = [
        where('codigo', '==', codigo.toUpperCase())
      ];

      const querySnapshot = await this.executeQuery(this.collectionName, {}, ...constraints);
      
      if (cupomIdExcluir) {
        // Se estiver editando, excluir o próprio cupom da verificação
        return querySnapshot.docs.some(doc => doc.id !== cupomIdExcluir);
      }
      
      return !querySnapshot.empty;
    } catch (error) {
      console.error('Erro ao verificar código do cupom:', error);
      throw new Error('Erro ao verificar código do cupom');
    }
  }

  /**
   * Busca estatísticas dos cupons
   */
  async buscarEstatisticasCupons(): Promise<{
    totalCupons: number;
    cuponsAtivos: number;
    cuponsInativos: number;
    totalUsos: number;
    cuponsExpirados: number;
    cuponsExpiramEm30Dias: number;
    valorTotalDescontos: number;
  }> {
    try {
      const cupons = await this.buscarCupons();
      const agora = new Date();
      const em30Dias = new Date(agora.getTime() + 30 * 24 * 60 * 60 * 1000);

      const estatisticas = {
        totalCupons: cupons.length,
        cuponsAtivos: cupons.filter(c => c.status === 'ativo').length,
        cuponsInativos: cupons.filter(c => c.status === 'inativo').length,
        totalUsos: cupons.reduce((total, c) => total + c.usosAtuais, 0),
        cuponsExpirados: cupons.filter(c => new Date(c.dataExpiracao) < agora).length,
        cuponsExpiramEm30Dias: cupons.filter(c => {
          const dataExp = new Date(c.dataExpiracao);
          return dataExp > agora && dataExp <= em30Dias;
        }).length,
        valorTotalDescontos: cupons.reduce((total, c) => {
          if (c.tipo === 'percentual') {
            return total + (c.usosAtuais * (c.valor / 100) * c.valorMinimo);
          } else if (c.tipo === 'valor_fixo') {
            return total + (c.usosAtuais * c.valor);
          }
          return total;
        }, 0)
      };

      return estatisticas;
    } catch (error) {
      console.error('Erro ao buscar estatísticas dos cupons:', error);
      throw new Error('Erro ao buscar estatísticas dos cupons');
    }
  }
}
