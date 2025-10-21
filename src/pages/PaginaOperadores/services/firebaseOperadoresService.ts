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
import { Operador } from '../types';

export class FirebaseOperadoresService {
  private operadoresCollection = collection(db, 'operadores');

  /**
   * Obtém o ID da loja do usuário autenticado
   */
  private getLojaId(): string {
    // Por enquanto, retorna um ID fixo para teste
    // Em produção, isso deve vir do contexto de autenticação
    return 'loja-teste-123';
  }

  /**
   * Busca todos os operadores da loja
   */
  async getOperadores(): Promise<Operador[]> {
    try {
      const lojaId = this.getLojaId();
      const q = query(
        this.operadoresCollection,
        where('lojaId', '==', lojaId),
        orderBy('dataCriacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const operadores: Operador[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        operadores.push({
          id: doc.id,
          lojaId: data.lojaId,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cargo: data.cargo,
          status: data.status,
          dataAdmissao: data.dataAdmissao,
          ultimoAcesso: data.ultimoAcesso,
          permissoes: data.permissoes || [],
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        });
      });
      
      return operadores;
    } catch (error) {
      console.error('Erro ao buscar operadores:', error);
      throw new Error('Falha ao carregar operadores');
    }
  }

  /**
   * Busca um operador específico pelo ID
   */
  async getOperador(id: string): Promise<Operador | null> {
    try {
      const docRef = doc(this.operadoresCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          lojaId: data.lojaId,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cargo: data.cargo,
          status: data.status,
          dataAdmissao: data.dataAdmissao,
          ultimoAcesso: data.ultimoAcesso,
          permissoes: data.permissoes || [],
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar operador:', error);
      throw new Error('Falha ao carregar operador');
    }
  }

  /**
   * Cria um novo operador
   */
  async criarOperador(operador: Partial<Operador>): Promise<Operador> {
    try {
      const lojaId = this.getLojaId();
      
      const operadorData = {
        lojaId,
        nome: operador.nome || '',
        email: operador.email || '',
        telefone: operador.telefone || '',
        cargo: operador.cargo || '',
        status: operador.status || 'ativo',
        dataAdmissao: operador.dataAdmissao || new Date().toISOString().split('T')[0],
        ultimoAcesso: new Date().toISOString().split('T')[0],
        permissoes: operador.permissoes || [],
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp()
      };

      const docRef = await addDoc(this.operadoresCollection, operadorData);
      
      return {
        id: docRef.id,
        lojaId,
        nome: operadorData.nome,
        email: operadorData.email,
        telefone: operadorData.telefone,
        cargo: operadorData.cargo,
        status: operadorData.status,
        dataAdmissao: operadorData.dataAdmissao,
        ultimoAcesso: operadorData.ultimoAcesso,
        permissoes: operadorData.permissoes,
        dataCriacao: new Date(),
        dataAtualizacao: new Date()
      };
    } catch (error) {
      console.error('Erro ao criar operador:', error);
      throw new Error('Falha ao criar operador');
    }
  }

  /**
   * Atualiza um operador existente
   */
  async editarOperador(id: string, operador: Partial<Operador>): Promise<void> {
    try {
      const docRef = doc(this.operadoresCollection, id);
      const updateData = {
        ...operador,
        dataAtualizacao: serverTimestamp()
      };
      
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error('Erro ao editar operador:', error);
      throw new Error('Falha ao editar operador');
    }
  }

  /**
   * Exclui um operador
   */
  async excluirOperador(id: string): Promise<void> {
    try {
      const docRef = doc(this.operadoresCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir operador:', error);
      throw new Error('Falha ao excluir operador');
    }
  }

  /**
   * Busca operadores por status
   */
  async getOperadoresPorStatus(status: 'ativo' | 'inativo'): Promise<Operador[]> {
    try {
      const lojaId = this.getLojaId();
      const q = query(
        this.operadoresCollection,
        where('lojaId', '==', lojaId),
        where('status', '==', status),
        orderBy('dataCriacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const operadores: Operador[] = [];
      
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        operadores.push({
          id: doc.id,
          lojaId: data.lojaId,
          nome: data.nome,
          email: data.email,
          telefone: data.telefone,
          cargo: data.cargo,
          status: data.status,
          dataAdmissao: data.dataAdmissao,
          ultimoAcesso: data.ultimoAcesso,
          permissoes: data.permissoes || [],
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        });
      });
      
      return operadores;
    } catch (error) {
      console.error('Erro ao buscar operadores por status:', error);
      throw new Error('Falha ao carregar operadores');
    }
  }
}
