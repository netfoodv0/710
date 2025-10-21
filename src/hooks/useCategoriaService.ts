import { useState, useCallback } from 'react';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  where, 
  orderBy, 
  getDocs, 
  getDoc,
  Timestamp 
} from 'firebase/firestore';
import { db } from '../lib/firebase';
import { auth } from '../lib/firebase';
import { DadosNovaCategoria, CategoriaModal } from '../types/cardapio/categoriaModal';

interface UseCategoriaServiceReturn {
  criarCategoria: (dados: DadosNovaCategoria) => Promise<string>;
  atualizarCategoria: (id: string, dados: Partial<DadosNovaCategoria>) => Promise<void>;
  excluirCategoria: (id: string) => Promise<void>;
  duplicarCategoria: (id: string) => Promise<string>;
  reordenarCategorias: (categorias: CategoriaModal[]) => Promise<void>;
  buscarCategorias: (lojaId: string) => Promise<CategoriaModal[]>;
  isLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export function useCategoriaService(): UseCategoriaServiceReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const criarCategoria = useCallback(async (dados: DadosNovaCategoria): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Obter lojaId do usuário autenticado
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      const lojaId = user.uid;

      // Buscar próxima posição disponível
      const categoriasRef = collection(db, 'categoriasProdutos');
      const q = query(
        categoriasRef,
        where('lojaId', '==', lojaId)
      );

      const snapshot = await getDocs(q);
      let proximaPosicao = 1;
      let nomeExiste = false;

      if (!snapshot.empty) {
        // Verificar se o nome já existe e encontrar a maior posição
        let maxPosicao = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const posicao = data.posicao || 0;
          if (posicao > maxPosicao) {
            maxPosicao = posicao;
          }
          
          // Verificar se o nome já existe
          if (data.nome.toLowerCase() === dados.nome.trim().toLowerCase()) {
            nomeExiste = true;
          }
        });
        proximaPosicao = maxPosicao + 1;
      }

      // Verificar se o nome já existe
      if (nomeExiste) {
        throw new Error('Já existe uma categoria com este nome');
      }

      const agora = Timestamp.now();

      const novaCategoria = {
        nome: dados.nome.trim(),
        status: dados.status,
        agendamentoPrevio: dados.agendamentoPrevio,
        posicao: proximaPosicao,
        lojaId,
        dataCriacao: agora,
        dataAtualizacao: agora
      };

      const docRef = await addDoc(categoriasRef, novaCategoria);
      
      return docRef.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const atualizarCategoria = useCallback(async (
    id: string, 
    dados: Partial<DadosNovaCategoria>
  ): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const categoriaRef = doc(db, 'categoriasProdutos', id);
      
      const dadosAtualizacao: any = {
        dataAtualizacao: Timestamp.now()
      };

      if (dados.nome !== undefined) {
        // Verificar se o nome já existe em outras categorias
        const user = auth.currentUser;
        if (!user) {
          throw new Error('Usuário não autenticado');
        }
        
        const categoriasRef = collection(db, 'categoriasProdutos');
        const q = query(
          categoriasRef,
          where('lojaId', '==', user.uid)
        );
        
        const snapshot = await getDocs(q);
        let nomeExiste = false;
        
        snapshot.forEach((doc) => {
          if (doc.id !== id) { // Excluir a categoria atual da verificação
            const data = doc.data();
            if (data.nome.toLowerCase() === dados.nome!.trim().toLowerCase()) {
              nomeExiste = true;
            }
          }
        });
        
        if (nomeExiste) {
          throw new Error('Já existe uma categoria com este nome');
        }
        
        dadosAtualizacao.nome = dados.nome.trim();
      }
      
      if (dados.status !== undefined) {
        dadosAtualizacao.status = dados.status;
      }
      
      if (dados.agendamentoPrevio !== undefined) {
        dadosAtualizacao.agendamentoPrevio = dados.agendamentoPrevio;
      }

      await updateDoc(categoriaRef, dadosAtualizacao);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const excluirCategoria = useCallback(async (id: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const categoriaRef = doc(db, 'categoriasProdutos', id);
      await deleteDoc(categoriaRef);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao excluir categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const duplicarCategoria = useCallback(async (id: string): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      // Buscar a categoria original
      const categoriaRef = doc(db, 'categoriasProdutos', id);
      const categoriaSnap = await getDoc(categoriaRef);
      
      if (!categoriaSnap.exists()) {
        throw new Error('Categoria não encontrada');
      }

      const categoriaOriginal = categoriaSnap.data();
      
      // Obter lojaId do usuário autenticado
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }
      const lojaId = user.uid;

      // Buscar próxima posição disponível
      const categoriasRef = collection(db, 'categoriasProdutos');
      const q = query(
        categoriasRef,
        where('lojaId', '==', lojaId)
      );

      const snapshot = await getDocs(q);
      let proximaPosicao = 1;

      if (!snapshot.empty) {
        let maxPosicao = 0;
        snapshot.forEach((doc) => {
          const data = doc.data();
          const posicao = data.posicao || 0;
          if (posicao > maxPosicao) {
            maxPosicao = posicao;
          }
        });
        proximaPosicao = maxPosicao + 1;
      }

      const agora = Timestamp.now();

      // Criar categoria duplicada com nome modificado
      const categoriaDuplicada = {
        nome: `${categoriaOriginal.nome} (Cópia)`,
        status: categoriaOriginal.status,
        agendamentoPrevio: categoriaOriginal.agendamentoPrevio,
        posicao: proximaPosicao,
        lojaId,
        dataCriacao: agora,
        dataAtualizacao: agora
      };

      const docRef = await addDoc(categoriasRef, categoriaDuplicada);
      
      return docRef.id;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao duplicar categoria';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reordenarCategorias = useCallback(async (categorias: CategoriaModal[]): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const agora = Timestamp.now();
      
      // Atualizar posições de todas as categorias
      const promises = categorias.map((categoria, index) => {
        const categoriaRef = doc(db, 'categoriasProdutos', categoria.id);
        return updateDoc(categoriaRef, {
          posicao: index + 1,
          dataAtualizacao: agora
        });
      });

      await Promise.all(promises);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao reordenar categorias';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const buscarCategorias = useCallback(async (lojaId: string): Promise<CategoriaModal[]> => {
    if (!lojaId || lojaId.trim() === '') {
      throw new Error('lojaId é obrigatório');
    }

    setIsLoading(true);
    setError(null);

    try {
      const categoriasRef = collection(db, 'categoriasProdutos');
      const q = query(
        categoriasRef,
        where('lojaId', '==', lojaId)
      );

      const snapshot = await getDocs(q);
      const categorias: CategoriaModal[] = [];

      snapshot.forEach((doc) => {
        const data = doc.data();
        categorias.push({
          id: doc.id,
          nome: data.nome,
          status: data.status,
          agendamentoPrevio: data.agendamentoPrevio,
          posicao: data.posicao,
          lojaId: data.lojaId,
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        });
      });

      // Ordenar por posição client-side
      categorias.sort((a, b) => (a.posicao || 0) - (b.posicao || 0));

      return categorias;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar categorias';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    criarCategoria,
    atualizarCategoria,
    excluirCategoria,
    duplicarCategoria,
    reordenarCategorias,
    buscarCategorias,
    isLoading,
    error,
    clearError
  };
}
