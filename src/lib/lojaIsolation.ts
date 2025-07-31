import { auth, db } from './firebase';
import type { Loja } from '../types/auth';

/**
 * Middleware para garantir isolamento de dados por loja
 * Todas as operações devem passar por este middleware
 */
export class LojaIsolation {
  private static instance: LojaIsolation;
  private currentLojaId: string | null = null;

  private constructor() {}

  static getInstance(): LojaIsolation {
    if (!LojaIsolation.instance) {
      LojaIsolation.instance = new LojaIsolation();
    }
    return LojaIsolation.instance;
  }

  /**
   * Obtém o ID da loja atual do usuário autenticado
   */
  getLojaId(): string {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    
    this.currentLojaId = user.uid;
    return this.currentLojaId;
  }

  /**
   * Verifica se o documento pertence à loja atual
   */
  validateLojaOwnership(documentData: any, documentId: string): boolean {
    const lojaId = this.getLojaId();
    
    if (!documentData.lojaId) {
      console.warn(`Documento ${documentId} não possui lojaId`);
      return false;
    }

    if (documentData.lojaId !== lojaId) {
      console.warn(`Tentativa de acesso a documento de outra loja: ${documentId}`);
      return false;
    }

    return true;
  }

  /**
   * Adiciona o lojaId aos dados antes de salvar
   */
  addLojaId<T extends Record<string, any>>(data: T): T & { lojaId: string } {
    const lojaId = this.getLojaId();
    return {
      ...data,
      lojaId
    };
  }

  /**
   * Cria um filtro de consulta para a loja atual
   */
  createLojaFilter() {
    const lojaId = this.getLojaId();
    return { lojaId };
  }

  /**
   * Valida se a loja está ativa
   */
  async validateLojaStatus(): Promise<boolean> {
    try {
      const { doc, getDoc } = await import('firebase/firestore');
      const lojaId = this.getLojaId();
      
      const lojaDoc = await getDoc(doc(db, 'lojas', lojaId));
      
      if (!lojaDoc.exists()) {
        throw new Error('Loja não encontrada');
      }

      const lojaData = lojaDoc.data() as Loja;
      return lojaData.ativa;
    } catch (error) {
      console.error('Erro ao validar status da loja:', error);
      return false;
    }
  }

  /**
   * Middleware para operações de leitura
   */
  async withReadIsolation<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'Operação não autorizada'
  ): Promise<T> {
    try {
      // Validar se a loja está ativa
      const isLojaAtiva = await this.validateLojaStatus();
      if (!isLojaAtiva) {
        throw new Error('Loja inativa');
      }

      return await operation();
    } catch (error: any) {
      console.error('Erro no isolamento de leitura:', error);
      throw new Error(errorMessage);
    }
  }

  /**
   * Middleware para operações de escrita
   */
  async withWriteIsolation<T>(
    operation: () => Promise<T>,
    errorMessage: string = 'Operação não autorizada'
  ): Promise<T> {
    try {
      // Validar se a loja está ativa
      const isLojaAtiva = await this.validateLojaStatus();
      if (!isLojaAtiva) {
        throw new Error('Loja inativa');
      }

      return await operation();
    } catch (error: any) {
      console.error('Erro no isolamento de escrita:', error);
      throw new Error(errorMessage);
    }
  }
}

// Exportar instância singleton
export const lojaIsolation = LojaIsolation.getInstance(); 