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
  limit,
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Categoria, CriarCategoriaData, PeriodoDisponibilidade } from '../types/categoria';

export interface FiltrosCategoria {
  status?: 'ativo' | 'inativo' | 'em_falta';
  agendamentoPrevio?: boolean;
  tempoExtraProducao?: boolean;
  nome?: string;
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
}

export class FirebaseCategoriaService {
  private categoriasCollection = collection(db, 'categoriasProdutos');
  private disponibilidadeCollection = collection(db, 'disponibilidadeCategorias');

  // ===== CATEGORIAS =====
  
  async buscarCategorias(lojaId: string, filtros: FiltrosCategoria = {}): Promise<Categoria[]> {
    try {
      console.log('🔍 Buscando categorias com filtros:', { lojaId, filtros });
      
      let q = query(this.categoriasCollection);
      const constraints = [];

      // Filtro obrigatório por loja
      constraints.push(where('lojaId', '==', lojaId));

      // Filtros opcionais
      if (filtros.status) {
        constraints.push(where('status', '==', filtros.status));
      }
      
      if (filtros.agendamentoPrevio !== undefined) {
        constraints.push(where('agendamentoPrevio', '==', filtros.agendamentoPrevio));
      }

      if (filtros.tempoExtraProducao !== undefined) {
        constraints.push(where('tempoExtraProducao', '==', filtros.tempoExtraProducao));
      }

      // Ordenação padrão
      constraints.push(orderBy('dataAtualizacao', 'desc'));

      // Paginação
      if (filtros.limit) {
        constraints.push(limit(filtros.limit));
      }

      if (filtros.startAfter) {
        constraints.push(startAfter(filtros.startAfter));
      }

      // Aplicar constraints
      constraints.forEach(constraint => {
        q = query(q, constraint);
      });

      console.log('🔍 Query aplicada com constraints:', constraints);

      const snapshot = await getDocs(q);
      const categorias: Categoria[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        categorias.push({
          ...data,
          id: doc.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Categoria);
      });

      console.log('🔍 Categorias encontradas (antes do filtro de texto):', categorias);

      // Filtro de texto (client-side para flexibilidade)
      if (filtros.nome) {
        const nomeFilter = filtros.nome.toLowerCase();
        const categoriasFiltradas = categorias.filter(categoria => 
          categoria.nome.toLowerCase().includes(nomeFilter)
        );
        console.log('🔍 Categorias após filtro de texto:', categoriasFiltradas);
        return categoriasFiltradas;
      }

      console.log('🔍 Retornando todas as categorias:', categorias);
      return categorias;
    } catch (error) {
      console.error('❌ Erro ao buscar categorias:', error);
      throw new Error('Falha ao carregar categorias');
    }
  }

  async buscarCategoriaPorId(id: string): Promise<Categoria | null> {
    try {
      const docRef = doc(this.categoriasCollection, id);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          ...data,
          id: docSnap.id,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        } as Categoria;
      }
      
      return null;
    } catch (error) {
      console.error('Erro ao buscar categoria por ID:', error);
      throw new Error('Falha ao carregar categoria');
    }
  }

  async criarCategoria(lojaId: string, dados: CriarCategoriaData): Promise<string> {
    try {
      console.log('🚀 Criando categoria no Firebase:', { lojaId, dados });
      
      const agora = Timestamp.now();
      
      const novaCategoria = {
        nome: dados.nome.trim(),
        status: dados.status,
        agendamentoPrevio: dados.agendamentoPrevio,
        tempoExtraProducao: dados.tempoExtraProducao,
        lojaId,
        dataCriacao: agora,
        dataAtualizacao: agora
      };

      console.log('🚀 Dados da nova categoria:', novaCategoria);

      const docRef = await addDoc(this.categoriasCollection, novaCategoria);
      
      console.log('✅ Categoria criada no Firebase com ID:', docRef.id);
      
      // Salvar períodos de disponibilidade se houver
      if (dados.disponibilidade && dados.disponibilidade.length > 0) {
        console.log('🚀 Salvando disponibilidade para categoria:', docRef.id);
        await this.salvarDisponibilidade(docRef.id, dados.disponibilidade);
        console.log('✅ Disponibilidade salva com sucesso');
      }

      return docRef.id;
    } catch (error) {
      console.error('❌ Erro ao criar categoria:', error);
      throw new Error('Falha ao criar categoria');
    }
  }

  async atualizarCategoria(id: string, dados: Partial<CriarCategoriaData>): Promise<void> {
    try {
      const docRef = doc(this.categoriasCollection, id);
      
      const dadosAtualizacao: any = {
        dataAtualizacao: Timestamp.now()
      };

      if (dados.nome !== undefined) {
        dadosAtualizacao.nome = dados.nome.trim();
      }
      
      if (dados.status !== undefined) {
        dadosAtualizacao.status = dados.status;
      }
      
      if (dados.agendamentoPrevio !== undefined) {
        dadosAtualizacao.agendamentoPrevio = dados.agendamentoPrevio;
      }
      
      if (dados.tempoExtraProducao !== undefined) {
        dadosAtualizacao.tempoExtraProducao = dados.tempoExtraProducao;
      }

      await updateDoc(docRef, dadosAtualizacao);

      // Atualizar disponibilidade se fornecida
      if (dados.disponibilidade !== undefined) {
        await this.atualizarDisponibilidade(id, dados.disponibilidade);
      }
    } catch (error) {
      console.error('Erro ao atualizar categoria:', error);
      throw new Error('Falha ao atualizar categoria');
    }
  }

  async excluirCategoria(id: string): Promise<void> {
    try {
      // Excluir períodos de disponibilidade primeiro
      await this.excluirDisponibilidade(id);
      
      // Excluir categoria
      const docRef = doc(this.categoriasCollection, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
      throw new Error('Falha ao excluir categoria');
    }
  }

  async duplicarCategoria(id: string, novoNome?: string): Promise<string> {
    try {
      const categoriaOriginal = await this.buscarCategoriaPorId(id);
      if (!categoriaOriginal) {
        throw new Error('Categoria não encontrada');
      }

      const dadosDuplicacao: CriarCategoriaData = {
        nome: novoNome || `${categoriaOriginal.nome} (Cópia)`,
        status: categoriaOriginal.status,
        agendamentoPrevio: categoriaOriginal.agendamentoPrevio,
        tempoExtraProducao: categoriaOriginal.tempoExtraProducao,
        disponibilidade: categoriaOriginal.disponibilidade
      };

      return await this.criarCategoria(categoriaOriginal.lojaId, dadosDuplicacao);
    } catch (error) {
      console.error('Erro ao duplicar categoria:', error);
      throw new Error('Falha ao duplicar categoria');
    }
  }

  // ===== DISPONIBILIDADE =====

  private async salvarDisponibilidade(categoriaId: string, periodos: PeriodoDisponibilidade[]): Promise<void> {
    try {
      const promises = periodos.map(periodo => {
        const dados = {
          categoriaId,
          diaSemana: periodo.diaSemana,
          horarioInicio: periodo.horarioInicio,
          horarioFim: periodo.horarioFim,
          ativo: periodo.ativo
        };
        
        return addDoc(this.disponibilidadeCollection, dados);
      });

      await Promise.all(promises);
    } catch (error) {
      console.error('Erro ao salvar disponibilidade:', error);
      throw new Error('Falha ao salvar disponibilidade');
    }
  }

  private async atualizarDisponibilidade(categoriaId: string, periodos: PeriodoDisponibilidade[]): Promise<void> {
    try {
      // Excluir disponibilidade existente
      await this.excluirDisponibilidade(categoriaId);
      
      // Criar nova disponibilidade
      if (periodos.length > 0) {
        await this.salvarDisponibilidade(categoriaId, periodos);
      }
    } catch (error) {
      console.error('Erro ao atualizar disponibilidade:', error);
      throw new Error('Falha ao atualizar disponibilidade');
    }
  }

  private async excluirDisponibilidade(categoriaId: string): Promise<void> {
    try {
      const q = query(
        this.disponibilidadeCollection,
        where('categoriaId', '==', categoriaId)
      );
      
      const snapshot = await getDocs(q);
      const promises = snapshot.docs.map(doc => deleteDoc(doc.ref));
      
      await Promise.all(promises);
    } catch (error) {
      console.error('Erro ao excluir disponibilidade:', error);
      throw new Error('Falha ao excluir disponibilidade');
    }
  }

  async buscarDisponibilidade(categoriaId: string): Promise<PeriodoDisponibilidade[]> {
    try {
      const q = query(
        this.disponibilidadeCollection,
        where('categoriaId', '==', categoriaId),
        where('ativo', '==', true),
        orderBy('diaSemana.id', 'asc'),
        orderBy('horarioInicio', 'asc')
      );
      
      const snapshot = await getDocs(q);
      const periodos: PeriodoDisponibilidade[] = [];

      snapshot.forEach(doc => {
        const data = doc.data();
        periodos.push({
          id: doc.id,
          diaSemana: data.diaSemana,
          horarioInicio: data.horarioInicio,
          horarioFim: data.horarioFim,
          ativo: data.ativo
        });
      });

      return periodos;
    } catch (error) {
      console.error('Erro ao buscar disponibilidade:', error);
      throw new Error('Falha ao carregar disponibilidade');
    }
  }

  // ===== ESTATÍSTICAS =====

  async obterEstatisticasCategorias(lojaId: string) {
    try {
      const categorias = await this.buscarCategorias(lojaId);
      
      const total = categorias.length;
      const ativas = categorias.filter(c => c.status === 'ativo').length;
      const inativas = categorias.filter(c => c.status === 'inativo').length;
      const emFalta = categorias.filter(c => c.status === 'em_falta').length;
      const comAgendamento = categorias.filter(c => c.agendamentoPrevio).length;
      const comTempoExtra = categorias.filter(c => c.tempoExtraProducao).length;

      return {
        total,
        ativas,
        inativas,
        emFalta,
        comAgendamento,
        comTempoExtra,
        percentualAtivas: total > 0 ? (ativas / total) * 100 : 0
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas:', error);
      throw new Error('Falha ao carregar estatísticas');
    }
  }
}

// Instância singleton
export const firebaseCategoriaService = new FirebaseCategoriaService();
