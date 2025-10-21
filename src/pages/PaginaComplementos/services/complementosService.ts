import { 
  collection, 
  doc, 
  getDocs, 
  getDoc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where, 
  orderBy,
  writeBatch,
  serverTimestamp 
} from 'firebase/firestore';
import { db } from '../../../lib/firebase';
import { Complemento, CategoriaComplemento, ComplementoFormData } from '../types';

const COMPLEMENTOS_COLLECTION = 'complementos';
const CATEGORIAS_COMPLEMENTOS_COLLECTION = 'categoriasComplementos';

/**
 * Serviço para gerenciar complementos e categorias de complementos
 * Implementa padrões de tratamento de erro robustos e cache inteligente
 */
export class ComplementosService {
  // ===== CONSTANTES =====
  private static readonly COMPLEMENTOS_COLLECTION = 'complementos';
  private static readonly CATEGORIAS_COMPLEMENTOS_COLLECTION = 'categoriasComplementos';
  
  // ===== CACHE E CONTROLE DE ERROS =====
  private static readonly permissionCache = new Map<string, boolean>();
  private static readonly ERROR_CODES = {
    PERMISSION_DENIED: 'permission-denied',
    NOT_FOUND: 'not-found',
    UNAVAILABLE: 'unavailable'
  } as const;


  // ===== COMPLEMENTOS =====
  
  /**
   * Busca todos os complementos de uma loja
   * @param lojaId - ID da loja
   * @returns Promise<Complemento[]> - Lista de complementos ou array vazio em caso de erro
   */
  static async buscarComplementos(lojaId: string): Promise<Complemento[]> {
    // Validação de entrada
    if (!lojaId || typeof lojaId !== 'string') {
      console.warn('ComplementosService: lojaId inválido fornecido');
      return [];
    }

    try {
      const q = query(
        collection(db, this.COMPLEMENTOS_COLLECTION),
        where('lojaId', '==', lojaId),
        orderBy('dataCriacao', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      
      const complementos = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          ...data,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date(),
        } as Complemento;
      });
      
      return complementos;
      
    } catch (error: unknown) {
      return this.handleError(error, lojaId, 'complementos');
    }
  }

  /**
   * Tratamento centralizado de erros com cache inteligente
   * @param error - Erro capturado
   * @param identifier - Identificador único para cache
   * @param operation - Tipo de operação para logs específicos
   * @returns Array vazio para operações de busca
   */
  private static handleError(error: unknown, identifier: string, operation: string): Complemento[] {
    const firebaseError = error as { code?: string; message?: string };
    
    // Verificar se é erro de permissão específico
    if (firebaseError?.code === this.ERROR_CODES.PERMISSION_DENIED || 
        firebaseError?.message?.includes('permissions')) {
      
      const cacheKey = `${operation}_${identifier}`;
      
      // Log apenas uma vez por sessão para evitar spam
      if (!this.permissionCache.has(cacheKey)) {
        console.warn(`Permissões insuficientes para buscar ${operation}. Usando dados padrão.`);
        this.permissionCache.set(cacheKey, true);
      }
      
      return [];
    }
    
    // Log de outros erros apenas em desenvolvimento
    if (process.env.NODE_ENV === 'development') {
      console.error(`Erro ao buscar ${operation}:`, error);
    }
    
    return [];
  }

  /**
   * Busca um complemento específico por ID
   * @param id - ID do complemento
   * @returns Promise<Complemento | null> - Complemento encontrado ou null
   */
  static async buscarComplementoPorId(id: string): Promise<Complemento | null> {
    // Validação de entrada
    if (!id || typeof id !== 'string') {
      console.warn('ComplementosService: ID inválido fornecido');
      return null;
    }

    try {
      const docRef = doc(db, this.COMPLEMENTOS_COLLECTION, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          ...data,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date(),
        } as Complemento;
      }
      
      return null;
    } catch (error: unknown) {
      const firebaseError = error as { code?: string };
      
      if (firebaseError?.code === this.ERROR_CODES.PERMISSION_DENIED) {
        console.warn('Permissões insuficientes para buscar complemento por ID');
        return null;
      }
      
      if (process.env.NODE_ENV === 'development') {
        console.error('Erro ao buscar complemento por ID:', error);
      }
      
      return null;
    }
  }

  static async criarComplemento(lojaId: string, data: ComplementoFormData): Promise<string> {
    try {
      // Filtrar campos undefined antes de enviar para o Firebase
      const dadosLimpos = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
      
      const docRef = await addDoc(collection(db, COMPLEMENTOS_COLLECTION), {
        ...dadosLimpos,
        lojaId,
        dataCriacao: serverTimestamp(),
        dataAtualizacao: serverTimestamp(),
      });
      
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar complemento:', error);
      throw new Error('Erro ao criar complemento');
    }
  }

  static async atualizarComplemento(id: string, data: Partial<ComplementoFormData>): Promise<void> {
    try {
      // Filtrar campos undefined antes de enviar para o Firebase
      const dadosLimpos = Object.fromEntries(
        Object.entries(data).filter(([_, value]) => value !== undefined)
      );
      
      const docRef = doc(db, COMPLEMENTOS_COLLECTION, id);
      await updateDoc(docRef, {
        ...dadosLimpos,
        dataAtualizacao: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erro ao atualizar complemento:', error);
      throw new Error('Erro ao atualizar complemento');
    }
  }

  static async excluirComplemento(id: string): Promise<void> {
    try {
      const docRef = doc(db, COMPLEMENTOS_COLLECTION, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir complemento:', error);
      throw new Error('Erro ao excluir complemento');
    }
  }

  /**
   * Exclui todos os complementos de uma categoria específica
   * @param nomeCategoria - Nome da categoria de complemento
   * @returns Promise<number> - Número de complementos excluídos
   */
  static async excluirComplementosPorCategoria(nomeCategoria: string): Promise<number> {
    try {
      // Buscar todos os complementos da categoria pelo nome
      const q = query(
        collection(db, this.COMPLEMENTOS_COLLECTION),
        where('categoria', '==', nomeCategoria)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (querySnapshot.empty) {
        return 0; // Nenhum complemento encontrado
      }
      
      // Usar batch para excluir todos os complementos de uma vez
      const batch = writeBatch(db);
      
      querySnapshot.docs.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      
      await batch.commit();
      
      return querySnapshot.size;
    } catch (error) {
      console.error('Erro ao excluir complementos por categoria:', error);
      throw new Error('Erro ao excluir complementos da categoria');
    }
  }

  static async alternarStatusComplemento(id: string): Promise<void> {
    try {
      const complemento = await this.buscarComplementoPorId(id);
      if (!complemento) {
        throw new Error('Complemento não encontrado');
      }

      const novoStatus = complemento.status === 'ativo' ? 'inativo' : 'ativo';
      await this.atualizarComplemento(id, { status: novoStatus });
    } catch (error) {
      console.error('Erro ao alternar status do complemento:', error);
      throw new Error('Erro ao alterar status do complemento');
    }
  }

  static async duplicarComplemento(id: string): Promise<string> {
    try {
      const complemento = await this.buscarComplementoPorId(id);
      if (!complemento) {
        throw new Error('Complemento não encontrado');
      }

      const { id: _, dataCriacao, dataAtualizacao, ...dadosComplemento } = complemento;
      const novoNome = `${complemento.nome} (Cópia)`;
      
      return await this.criarComplemento(complemento.lojaId, {
        ...dadosComplemento,
        nome: novoNome,
      });
    } catch (error) {
      console.error('Erro ao duplicar complemento:', error);
      throw new Error('Erro ao duplicar complemento');
    }
  }

  // ===== CATEGORIAS DE COMPLEMENTOS =====
  
  /**
   * Busca todas as categorias de complementos de uma loja
   * @param lojaId - ID da loja
   * @returns Promise<CategoriaComplemento[]> - Lista de categorias ou array vazio em caso de erro
   */
  static async buscarCategoriasComplementos(lojaId: string): Promise<CategoriaComplemento[]> {
    // Validação de entrada
    if (!lojaId || typeof lojaId !== 'string') {
      console.warn('ComplementosService: lojaId inválido fornecido para categorias');
      return [];
    }

    try {
      const categoriasRef = collection(db, this.CATEGORIAS_COMPLEMENTOS_COLLECTION);
      const q = query(
        categoriasRef,
        where('lojaId', '==', lojaId),
        where('tipo', '==', 'complemento')
      );

      const snapshot = await getDocs(q);
      const categorias: CategoriaComplemento[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        categorias.push({
          id: doc.id,
          nome: data.nome,
          tipo: data.tipo,
          status: data.status,
          ordem: data.ordem,
          lojaId: data.lojaId,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date(),
        });
      });

      // Ordenar por ordem
      categorias.sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
      
      return categorias;
      
    } catch (error: unknown) {
      return this.handleError(error, lojaId, 'categorias de complementos') as CategoriaComplemento[];
    }
  }

  static async criarCategoriaComplemento(lojaId: string, nome: string): Promise<string> {
    try {
      // Buscar próxima posição disponível (seguindo padrão do useCategoriaService)
      const categoriasRef = collection(db, this.CATEGORIAS_COMPLEMENTOS_COLLECTION);
      const q = query(
        categoriasRef,
        where('lojaId', '==', lojaId),
        where('tipo', '==', 'complemento')
      );

      const snapshot = await getDocs(q);
      let proximaOrdem = 1;
      let nomeExiste = false;

      if (!snapshot.empty) {
        // Verificar se o nome já existe e encontrar a maior ordem
        let maxOrdem = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const ordem = data.ordem || 0;
          if (ordem > maxOrdem) {
            maxOrdem = ordem;
          }
          
          // Verificar se o nome já existe
          if (data.nome.toLowerCase() === nome.trim().toLowerCase()) {
            nomeExiste = true;
          }
        });
        proximaOrdem = maxOrdem + 1;
      }

      // Verificar se o nome já existe
      if (nomeExiste) {
        throw new Error('Já existe uma categoria com este nome');
      }

      const agora = serverTimestamp();

      const novaCategoria = {
        nome: nome.trim(),
        tipo: 'complemento',
        status: 'ativo',
        ordem: proximaOrdem,
        lojaId,
        dataCriacao: agora,
        dataAtualizacao: agora
      };

      const docRef = await addDoc(categoriasRef, novaCategoria);
      
      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar categoria de complemento:', error);
      throw new Error('Erro ao criar categoria de complemento');
    }
  }

  static async atualizarCategoriaComplemento(id: string, data: Partial<CategoriaComplemento>): Promise<void> {
    try {
      const docRef = doc(db, CATEGORIAS_COMPLEMENTOS_COLLECTION, id);
      await updateDoc(docRef, {
        ...data,
        dataAtualizacao: serverTimestamp(),
      });
    } catch (error) {
      console.error('Erro ao atualizar categoria de complemento:', error);
      throw new Error('Erro ao atualizar categoria de complemento');
    }
  }

  static async excluirCategoriaComplemento(id: string): Promise<{ complementosExcluidos: number }> {
    try {
      // Primeiro, buscar a categoria para obter o nome
      const categoriaRef = doc(db, CATEGORIAS_COMPLEMENTOS_COLLECTION, id);
      const categoriaSnap = await getDoc(categoriaRef);
      
      if (!categoriaSnap.exists()) {
        throw new Error('Categoria não encontrada');
      }
      
      const nomeCategoria = categoriaSnap.data().nome;
      
      // Excluir todos os complementos da categoria pelo nome
      const complementosExcluidos = await this.excluirComplementosPorCategoria(nomeCategoria);
      
      // Depois, excluir a categoria
      await deleteDoc(categoriaRef);
      
      return { complementosExcluidos };
    } catch (error) {
      console.error('Erro ao excluir categoria de complemento:', error);
      throw new Error('Erro ao excluir categoria de complemento');
    }
  }

  static async reordenarCategoriasComplementos(lojaId: string, categorias: CategoriaComplemento[]): Promise<void> {
    try {
      const batch = writeBatch(db);
      
      categorias.forEach((categoria, index) => {
        const docRef = doc(db, CATEGORIAS_COMPLEMENTOS_COLLECTION, categoria.id);
        batch.update(docRef, {
          ordem: index + 1,
          dataAtualizacao: serverTimestamp(),
        });
      });
      
      await batch.commit();
    } catch (error) {
      console.error('Erro ao reordenar categorias de complementos:', error);
      throw new Error('Erro ao reordenar categorias de complementos');
    }
  }

  /**
   * Limpa complementos órfãos (que referenciam categorias que não existem mais)
   * @param lojaId - ID da loja
   * @returns Promise<number> - Número de complementos órfãos removidos
   */
  static async limparComplementosOrfaos(lojaId: string): Promise<number> {
    try {
      // Buscar todas as categorias de complementos da loja
      const categoriasRef = collection(db, this.CATEGORIAS_COMPLEMENTOS_COLLECTION);
      const qCategorias = query(
        categoriasRef,
        where('lojaId', '==', lojaId),
        where('tipo', '==', 'complemento')
      );
      
      const categoriasSnapshot = await getDocs(qCategorias);
      const nomesCategoriasExistentes = new Set<string>();
      
      categoriasSnapshot.forEach((doc) => {
        const data = doc.data();
        nomesCategoriasExistentes.add(data.nome);
      });
      
      // Buscar todos os complementos da loja
      const complementosRef = collection(db, this.COMPLEMENTOS_COLLECTION);
      const qComplementos = query(
        complementosRef,
        where('lojaId', '==', lojaId)
      );
      
      const complementosSnapshot = await getDocs(qComplementos);
      const complementosOrfaos: any[] = [];
      
      complementosSnapshot.forEach((doc) => {
        const data = doc.data();
        if (!nomesCategoriasExistentes.has(data.categoria)) {
          complementosOrfaos.push(doc);
        }
      });
      
      if (complementosOrfaos.length === 0) {
        return 0; // Nenhum complemento órfão encontrado
      }
      
      // Excluir complementos órfãos usando batch
      const batch = writeBatch(db);
      
      complementosOrfaos.forEach((docSnapshot) => {
        batch.delete(docSnapshot.ref);
      });
      
      await batch.commit();
      
      return complementosOrfaos.length;
    } catch (error) {
      console.error('Erro ao limpar complementos órfãos:', error);
      throw new Error('Erro ao limpar complementos órfãos');
    }
  }
}





