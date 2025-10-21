import { 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  getDoc,
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  QueryConstraint,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
  CollectionReference,
  QueryDocumentSnapshot,
  startAfter,
  Timestamp
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { auth } from '../../lib/firebase';
import { FirebaseErrorHandler } from '../../lib/firebaseErrorHandler';
import { FirebaseCache } from '../../lib/firebaseCache';
import { FirebaseRetry } from '../../lib/firebaseRetry';

/**
 * Opções para execução de queries
 */
export interface QueryOptions {
  useCache?: boolean;
  cacheTTL?: number;
  enableRetry?: boolean;
}

/**
 * Classe base escalável para serviços Firebase
 * Suporta subcoleções por loja para isolamento completo
 */
export abstract class BaseFirestoreServiceEscalavel {
  
  /**
   * Obtém o ID da loja do usuário autenticado
   * @returns ID da loja
   */
  protected async getLojaId(): Promise<string> {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return user.uid; // UID do usuário = ID da loja
  }

  /**
   * Obtém uma referência para uma subcoleção da loja
   * @param subcollection Nome da subcoleção
   * @param lojaId ID da loja (opcional, usa loja do usuário se não fornecido)
   * @returns Referência da subcoleção
   */
  protected async getSubcollection(
    subcollection: string, 
    lojaId?: string
  ): Promise<CollectionReference<DocumentData>> {
    const loja = lojaId || await this.getLojaId();
    return collection(db, 'lojas', loja, subcollection);
  }

  /**
   * Obtém uma referência para um documento em subcoleção
   * @param subcollection Nome da subcoleção
   * @param docId ID do documento
   * @param lojaId ID da loja (opcional)
   * @returns Referência do documento
   */
  protected async getDocument(
    subcollection: string, 
    docId: string, 
    lojaId?: string
  ) {
    const loja = lojaId || await this.getLojaId();
    return doc(db, 'lojas', loja, subcollection, docId);
  }

  /**
   * Executa uma query em subcoleção com cache e retry
   * @param subcollection Nome da subcoleção
   * @param constraints Constraints da query
   * @param options Opções de execução
   * @param lojaId ID da loja (opcional)
   * @returns Resultado da query
   */
  protected async executeQuery<T>(
    subcollection: string,
    constraints: QueryConstraint[],
    options: QueryOptions = {},
    lojaId?: string
  ): Promise<T[]> {
    const { useCache = true, cacheTTL = 300000, enableRetry = true } = options;
    
    try {
      const loja = lojaId || await this.getLojaId();
      const collectionRef = await this.getSubcollection(subcollection, loja);
      const q = query(collectionRef, ...constraints);
      
      // Gerar chave de cache
      const cacheKey = this.generateCacheKey(subcollection, 'query', { 
        constraints: constraints.map(c => c.toString()),
        lojaId: loja 
      });
      
      // Tentar obter do cache
      if (useCache) {
        const cached = FirebaseCache.get(cacheKey);
        if (cached) {
          return cached;
        }
      }
      
      // Executar query com retry se habilitado
      const executeQuery = enableRetry 
        ? () => FirebaseRetry.execute(() => getDocs(q))
        : () => getDocs(q);
      
      const querySnapshot = await executeQuery();
      const results = querySnapshot.docs.map(doc => this.mapDocument<T>(doc));
      
      // Armazenar no cache
      if (useCache) {
        FirebaseCache.set(cacheKey, results, cacheTTL);
      }
      
      return results;
    } catch (error) {
      throw FirebaseErrorHandler.handle(error);
    }
  }

  /**
   * Busca um documento específico em subcoleção
   * @param subcollection Nome da subcoleção
   * @param docId ID do documento
   * @param options Opções de execução
   * @param lojaId ID da loja (opcional)
   * @returns Documento encontrado ou null
   */
  protected async getDocumentById<T>(
    subcollection: string,
    docId: string,
    options: QueryOptions = {},
    lojaId?: string
  ): Promise<T | null> {
    const { useCache = true, cacheTTL = 300000, enableRetry = true } = options;
    
    try {
      const loja = lojaId || await this.getLojaId();
      const docRef = await this.getDocument(subcollection, docId, loja);
      
      // Gerar chave de cache
      const cacheKey = this.generateCacheKey(subcollection, 'document', { 
        docId, 
        lojaId: loja 
      });
      
      // Tentar obter do cache
      if (useCache) {
        const cached = FirebaseCache.get(cacheKey);
        if (cached) {
          return cached;
        }
      }
      
      // Executar query com retry se habilitado
      const executeQuery = enableRetry 
        ? () => FirebaseRetry.execute(() => getDoc(docRef))
        : () => getDoc(docRef);
      
      const docSnap = await executeQuery();
      
      if (!docSnap.exists()) {
        return null;
      }
      
      const result = this.mapDocument<T>(docSnap as QueryDocumentSnapshot<DocumentData>);
      
      // Armazenar no cache
      if (useCache) {
        FirebaseCache.set(cacheKey, result, cacheTTL);
      }
      
      return result;
    } catch (error) {
      throw FirebaseErrorHandler.handle(error);
    }
  }

  /**
   * Cria um novo documento em subcoleção
   * @param subcollection Nome da subcoleção
   * @param data Dados do documento
   * @param lojaId ID da loja (opcional)
   * @returns ID do documento criado
   */
  protected async createDocument(
    subcollection: string,
    data: any,
    lojaId?: string
  ): Promise<string> {
    try {
      const loja = lojaId || await this.getLojaId();
      const collectionRef = await this.getSubcollection(subcollection, loja);
      
      // Adicionar metadados padrão
      const documentData = {
        ...data,
        dataCriacao: Timestamp.now(),
        dataAtualizacao: Timestamp.now()
      };
      
      const docRef = await addDoc(collectionRef, documentData);
      
      // Limpar cache relacionado
      this.clearCacheBySubcollection(subcollection, loja);
      
      return docRef.id;
    } catch (error) {
      throw FirebaseErrorHandler.handle(error);
    }
  }

  /**
   * Atualiza um documento em subcoleção
   * @param subcollection Nome da subcoleção
   * @param docId ID do documento
   * @param data Dados para atualizar
   * @param lojaId ID da loja (opcional)
   */
  protected async updateDocument(
    subcollection: string,
    docId: string,
    data: any,
    lojaId?: string
  ): Promise<void> {
    try {
      const loja = lojaId || await this.getLojaId();
      const docRef = await this.getDocument(subcollection, docId, loja);
      
      // Adicionar metadados de atualização
      const updateData = {
        ...data,
        dataAtualizacao: Timestamp.now()
      };
      
      await updateDoc(docRef, updateData);
      
      // Limpar cache relacionado
      this.clearCacheBySubcollection(subcollection, loja);
    } catch (error) {
      throw FirebaseErrorHandler.handle(error);
    }
  }

  /**
   * Remove um documento de subcoleção
   * @param subcollection Nome da subcoleção
   * @param docId ID do documento
   * @param lojaId ID da loja (opcional)
   */
  protected async deleteDocument(
    subcollection: string,
    docId: string,
    lojaId?: string
  ): Promise<void> {
    try {
      const loja = lojaId || await this.getLojaId();
      const docRef = await this.getDocument(subcollection, docId, loja);
      
      await deleteDoc(docRef);
      
      // Limpar cache relacionado
      this.clearCacheBySubcollection(subcollection, loja);
    } catch (error) {
      throw FirebaseErrorHandler.handle(error);
    }
  }

  /**
   * Busca com paginação em subcoleção
   * @param subcollection Nome da subcoleção
   * @param constraints Constraints da query
   * @param pageSize Tamanho da página
   * @param lastDoc Último documento da página anterior
   * @param lojaId ID da loja (opcional)
   * @returns Resultado paginado
   */
  protected async getPaginatedData<T>(
    subcollection: string,
    constraints: QueryConstraint[],
    pageSize: number = 20,
    lastDoc?: QueryDocumentSnapshot<DocumentData>,
    lojaId?: string
  ): Promise<{
    data: T[];
    lastDoc?: QueryDocumentSnapshot<DocumentData>;
    hasMore: boolean;
  }> {
    try {
      const loja = lojaId || await this.getLojaId();
      const collectionRef = await this.getSubcollection(subcollection, loja);
      
      // Adicionar paginação às constraints
      const paginationConstraints = [
        ...constraints,
        limit(pageSize + 1) // +1 para verificar se há mais dados
      ];
      
      if (lastDoc) {
        paginationConstraints.push(startAfter(lastDoc));
      }
      
      const q = query(collectionRef, ...paginationConstraints);
      const querySnapshot = await getDocs(q);
      
      const docs = querySnapshot.docs;
      const hasMore = docs.length > pageSize;
      
      // Remover o último documento se houver mais dados
      const data = docs.slice(0, pageSize).map(doc => this.mapDocument<T>(doc));
      const newLastDoc = hasMore ? docs[pageSize - 1] : undefined;
      
      return {
        data,
        lastDoc: newLastDoc,
        hasMore
      };
    } catch (error) {
      throw FirebaseErrorHandler.handle(error);
    }
  }

  /**
   * Mapeia um documento do Firestore para o tipo desejado
   * @param doc Documento do Firestore
   * @returns Documento mapeado
   */
  protected mapDocument<T>(doc: QueryDocumentSnapshot<DocumentData>): T {
    const data = doc.data();
    
    // Converter timestamps para Date
    const convertTimestamp = (timestamp: any): Date => {
      if (timestamp && timestamp.toDate) {
        return timestamp.toDate();
      }
      return new Date();
    };
    
    return {
      id: doc.id,
      ...data,
      dataCriacao: data.dataCriacao ? convertTimestamp(data.dataCriacao) : new Date(),
      dataAtualizacao: data.dataAtualizacao ? convertTimestamp(data.dataAtualizacao) : new Date()
    } as T;
  }

  /**
   * Cria constraints comuns para queries
   */
  protected createConstraints() {
    return {
      where: (field: string, operator: any, value: any) => where(field, operator, value),
      orderBy: (field: string, direction?: 'asc' | 'desc') => orderBy(field, direction),
      limit: (count: number) => limit(count)
    };
  }

  /**
   * Gera chave de cache baseada em parâmetros
   */
  private generateCacheKey(subcollection: string, operation: string, params: any = {}): string {
    const sortedParams = Object.keys(params)
      .sort()
      .map(key => `${key}:${JSON.stringify(params[key])}`)
      .join('|');
    
    return `loja:${subcollection}:${operation}:${sortedParams}`;
  }

  /**
   * Limpa cache relacionado a uma subcoleção
   */
  private clearCacheBySubcollection(subcollection: string, lojaId: string): void {
    // Implementar limpeza seletiva do cache baseada em padrões
    const pattern = `loja:${subcollection}:`;
    // FirebaseCache.clearByPattern(pattern); // Implementar se necessário
  }
}




