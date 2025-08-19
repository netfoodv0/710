import { 
  doc, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  startAfter,
  QueryDocumentSnapshot,
  DocumentData,
  Timestamp
} from 'firebase/firestore';
import { Categoria, CriarCategoriaData, PeriodoDisponibilidade } from '../types/categoria';
import { BaseFirestoreService } from './firebase/BaseFirestoreService';

export interface FiltrosCategoria {
  status?: 'ativo' | 'inativo' | 'em_falta';
  agendamentoPrevio?: boolean;
  tempoExtraProducao?: boolean;
  nome?: string;
  limit?: number;
  startAfter?: QueryDocumentSnapshot<DocumentData>;
}

export class FirebaseCategoriaService extends BaseFirestoreService {

  // ===== CATEGORIAS =====
  
  async buscarCategorias(lojaId: string, filtros: FiltrosCategoria = {}): Promise<Categoria[]> {
    try {
      // Criar constraints base
      const constraints: any[] = [];
      
      // Filtros opcionais
      if (filtros.status) {
        constraints.push(this.createConstraints().where('status', '==', filtros.status));
      }
      
      if (filtros.agendamentoPrevio !== undefined) {
        constraints.push(this.createConstraints().where('agendamentoPrevio', '==', filtros.agendamentoPrevio));
      }

      if (filtros.tempoExtraProducao !== undefined) {
        constraints.push(this.createConstraints().where('tempoExtraProducao', '==', filtros.tempoExtraProducao));
      }

      // Paginação
      if (filtros.limit) {
        constraints.push(this.createConstraints().limit(filtros.limit));
      }

      if (filtros.startAfter) {
        constraints.push(startAfter(filtros.startAfter));
      }

      const snapshot = await this.executeQuery('categoriasProdutos', ...constraints);

      const categorias: Categoria[] = this.mapDocuments<Categoria>(snapshot);

      // Ordenação client-side para garantir ordem correta (categorias sem posição vão para o final)
      categorias.sort((a, b) => {
        const posicaoA = a.posicao || 9999;
        const posicaoB = b.posicao || 9999;
        
        if (posicaoA !== posicaoB) {
          return posicaoA - posicaoB;
        }
        
        // Fallback para data de criação se posições forem iguais
        return (b.dataCriacao.getTime() || 0) - (a.dataCriacao.getTime() || 0);
      });

      // Filtro de texto (client-side para flexibilidade)
      if (filtros.nome) {
        const termo = filtros.nome.toLowerCase();
        return categorias.filter(categoria => 
          categoria.nome.toLowerCase().includes(termo)
        );
      }

      return categorias;
    } catch (error) {
      console.error('Erro ao buscar categorias:', error);
      throw new Error('Falha ao carregar categorias');
    }
  }

  async buscarCategoriaPorId(id: string): Promise<Categoria | null> {
    try {
      const documentSnapshot = await this.fetchDocument<Categoria>('categoriasProdutos', id);

      if (documentSnapshot && documentSnapshot.exists()) {
        return this.mapDocument<Categoria>(documentSnapshot);
      }

      return null;
    } catch (error) {
      console.error('Erro ao buscar categoria por ID:', error);
      throw new Error('Falha ao carregar categoria');
    }
  }

  async criarCategoria(lojaId: string, dados: CriarCategoriaData): Promise<string> {
    try {
      const agora = Timestamp.now();
      
      // Se não foi especificada posição, buscar a próxima posição disponível
      let posicao = dados.posicao;
      if (posicao === undefined) {
        // Buscar a maior posição atual para esta loja com query simples
        const q = query(
          this.categoriasCollection,
          where('lojaId', '==', lojaId)
        );
        
        const snapshot = await getDocs(q);
        let maxPosicao = 0;
        
        snapshot.forEach(doc => {
          const data = doc.data();
          const pos = data.posicao || 0;
          if (pos > maxPosicao) {
            maxPosicao = pos;
          }
        });
        
        posicao = maxPosicao + 1;
      }
      
      const novaCategoria = {
        nome: dados.nome.trim(),
        status: dados.status,
        agendamentoPrevio: dados.agendamentoPrevio,
        tempoExtraProducao: dados.tempoExtraProducao,
        posicao,
        lojaId,
        dataCriacao: agora,
        dataAtualizacao: agora
      };

      const docRef = await addDoc(this.categoriasCollection, novaCategoria);
      
      // Salvar períodos de disponibilidade se houver
      if (dados.disponibilidade && dados.disponibilidade.length > 0) {
        await this.salvarDisponibilidade(docRef.id, dados.disponibilidade);
      }

      return docRef.id;
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
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
      
      if (dados.posicao !== undefined) {
        dadosAtualizacao.posicao = dados.posicao;
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

  async atualizarPosicoesCategorias(lojaId: string, categoriasOrdenadas: string[]): Promise<void> {
    try {
      // Buscar todas as categorias com query simples
      const q = query(
        this.categoriasCollection,
        where('lojaId', '==', lojaId)
      );
      
      const snapshot = await getDocs(q);
      const categoriasPorNome = new Map<string, string>(); // nome -> id
      
      snapshot.forEach(doc => {
        const data = doc.data();
        categoriasPorNome.set(data.nome, doc.id);
      });
      
      // Criar batch de atualizações
      const updates = categoriasOrdenadas.map((nome, index) => {
        const categoriaId = categoriasPorNome.get(nome);
        if (categoriaId) {
          const docRef = doc(this.categoriasCollection, categoriaId);
          return updateDoc(docRef, { 
            posicao: index + 1,
            dataAtualizacao: Timestamp.now()
          });
        }
        return null;
      }).filter(Boolean);

      // Executar todas as atualizações
      await Promise.all(updates);
    } catch (error) {
      console.error('Erro ao atualizar posições das categorias:', error);
      throw new Error('Falha ao atualizar posições das categorias');
    }
  }

  async migrarCategoriasParaPosicao(lojaId: string): Promise<void> {
    try {
      // Buscar categorias com query simples para evitar erro de índice
      const q = query(
        this.categoriasCollection,
        where('lojaId', '==', lojaId)
      );
      
      const snapshot = await getDocs(q);
      const categoriasSemPosicao: {id: string, posicao?: number}[] = [];
      
      snapshot.forEach(doc => {
        const data = doc.data();
        if (data.posicao === undefined || data.posicao === null) {
          categoriasSemPosicao.push({
            id: doc.id,
            posicao: data.posicao
          });
        }
      });
      
      if (categoriasSemPosicao.length === 0) {
        return; // Já migraram
      }

      // Atualizar categorias sem posição
      const updates = categoriasSemPosicao.map((categoria, index) => {
        const docRef = doc(this.categoriasCollection, categoria.id);
        return updateDoc(docRef, { 
          posicao: index + 1,
          dataAtualizacao: Timestamp.now()
        });
      });

      await Promise.all(updates);
    } catch (error) {
      console.error('Erro ao migrar categorias para posição:', error);
      throw new Error('Falha ao migrar categorias');
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
