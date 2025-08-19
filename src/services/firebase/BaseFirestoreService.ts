import { 
  query, 
  where, 
  orderBy, 
  limit, 
  getDocs,
  getDoc,
  doc,
  collection,
  QueryConstraint,
  DocumentData,
  QuerySnapshot,
  DocumentSnapshot,
  CollectionReference,
  QueryDocumentSnapshot
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
 * Classe base para serviços Firebase que fornece operações comuns
 * para reduzir duplicação de código entre serviços
 */
export abstract class BaseFirestoreService {
  /**
   * Obtém o ID da loja do usuário autenticado
   * @returns ID da loja
   */
  protected getLojaId(): string {
    const user = auth.currentUser;
    if (!user) {
      throw new Error('Usuário não autenticado');
    }
    return user.uid;
  }

  /**
   * Executa uma consulta no Firestore com filtro automático por loja
   * @param collectionName Nome da coleção
   * @param constraints Restrições adicionais da query
   * @param options Opções para cache e retry
   * @returns QuerySnapshot com os resultados
   */
  protected async executeQuery<T>(
    collectionName: string,
    options: QueryOptions = {},
    ...constraints: QueryConstraint[]
  ): Promise<QuerySnapshot<DocumentData>> {
    const { useCache = true, cacheTTL = 5 * 60 * 1000, enableRetry = true } = options;
    
    // Gerar chave de cache
    const cacheKey = FirebaseCache.generateKey(collectionName, 'query', {
      constraints: constraints.map(c => c.toString()),
      lojaId: this.getLojaId()
    });

    // Tentar obter do cache se habilitado
    if (useCache) {
      const cached = FirebaseCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Função de execução da query
    const executeQueryOperation = async (): Promise<QuerySnapshot<DocumentData>> => {
      try {
        // Adicionar filtro automático por loja
        const lojaFilter = where('lojaId', '==', this.getLojaId());
        const allConstraints = [lojaFilter, ...constraints];
        
        // Criar a query com todas as constraints
        const collectionRef = this.getCollection(collectionName);
        const q = query(collectionRef, ...allConstraints);
        
        const result = await getDocs(q);
        
        // Salvar no cache se habilitado
        if (useCache) {
          FirebaseCache.set(cacheKey, result, cacheTTL);
        }
        
        return result;
      } catch (error) {
        FirebaseErrorHandler.logError(error, `BaseFirestoreService.executeQuery.${collectionName}`);
        throw error;
      }
    };

    // Executar com retry se habilitado
    if (enableRetry) {
      return FirebaseRetry.withRetry(executeQueryOperation, {
        maxRetries: 3,
        baseDelay: 1000,
        shouldRetry: (error) => error?.code === 'unavailable' || error?.code === 'deadline-exceeded'
      });
    }

    return executeQueryOperation();
  }

  /**
   * Busca um documento específico pelo ID
   * @param collectionName Nome da coleção
   * @param id ID do documento
   * @param options Opções para cache e retry
   * @returns DocumentSnapshot ou null se não encontrado
   */
  protected async fetchDocument(
    collectionName: string,
    id: string,
    options: QueryOptions = {}
  ): Promise<DocumentSnapshot<DocumentData> | null> {
    const { useCache = true, cacheTTL = 10 * 60 * 1000, enableRetry = true } = options;
    
    // Gerar chave de cache
    const cacheKey = FirebaseCache.generateKey(collectionName, 'document', { id, lojaId: this.getLojaId() });

    // Tentar obter do cache se habilitado
    if (useCache) {
      const cached = FirebaseCache.get(cacheKey);
      if (cached) {
        return cached;
      }
    }

    // Função de busca do documento
    const fetchDocumentOperation = async (): Promise<DocumentSnapshot<DocumentData> | null> => {
      try {
        const collectionRef = this.getCollection(collectionName);
        const docRef = doc(collectionRef, id);
        const documentSnapshot = await getDoc(docRef);
        
        // Verificar se o documento pertence à loja
        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data();
          if (data && data.lojaId === this.getLojaId()) {
            // Salvar no cache se habilitado
            if (useCache) {
              FirebaseCache.set(cacheKey, documentSnapshot, cacheTTL);
            }
            return documentSnapshot;
          }
        }
        
        return null;
      } catch (error) {
        FirebaseErrorHandler.logError(error, `BaseFirestoreService.fetchDocument.${collectionName}.${id}`);
        throw error;
      }
    };

    // Executar com retry se habilitado
    if (enableRetry) {
      return FirebaseRetry.withRetry(fetchDocumentOperation, {
        maxRetries: 2,
        baseDelay: 500,
        shouldRetry: (error) => error?.code === 'unavailable' || error?.code === 'deadline-exceeded'
      });
    }

    return fetchDocumentOperation();
  }

  /**
   * Mapeia documentos do Firestore para objetos tipados
   * @param snapshot QuerySnapshot com os documentos
   * @returns Array de objetos tipados
   */
  protected mapDocuments<T>(snapshot: QuerySnapshot<DocumentData>): T[] {
    return snapshot.docs.map(doc => this.mapDocument<T>(doc));
  }

  /**
   * Mapeia um documento do Firestore para objeto tipado
   * @param doc DocumentSnapshot
   * @returns Objeto tipado
   */
  protected mapDocument<T>(doc: QueryDocumentSnapshot<DocumentData>): T {
    const data = doc.data();
    
    // Função auxiliar para converter timestamps com segurança
    const convertTimestamp = (timestamp: any): Date => {
      if (timestamp?.toDate) {
        return timestamp.toDate();
      }
      return new Date();
    };
    
    return {
      ...data,
      id: doc.id,
      dataHora: data?.dataHora ? convertTimestamp(data.dataHora) : new Date(),
      dataCriacao: data?.dataCriacao ? convertTimestamp(data.dataCriacao) : new Date(),
      dataAtualizacao: data?.dataAtualizacao ? convertTimestamp(data.dataAtualizacao) : new Date()
    } as T;
  }

  /**
   * Obtém uma referência para uma coleção
   * @param collectionName Nome da coleção
   * @returns Referência da coleção
   */
  private getCollection(collectionName: string): CollectionReference<DocumentData> {
    return collection(db, collectionName);
  }

  /**
   * Cria constraints comuns para queries
   */
  protected createConstraints() {
    return {
      orderByDesc: (field: string) => orderBy(field, 'desc'),
      orderByAsc: (field: string) => orderBy(field, 'asc'),
      limit: (count: number) => limit(count),
      where: <T>(field: string, operator: any, value: T) => where(field, operator, value)
    };
  }
}