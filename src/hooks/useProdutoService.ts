import { useState } from 'react';
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
import { ProdutoModal, DadosNovoProduto } from '../types/cardapio/produtoModal';

export function useProdutoService() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = () => setError(null);

  // Criar novo produto
  const criarProduto = async (dados: DadosNovoProduto): Promise<string> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const lojaId = user.uid;

      // Removida validação de nome duplicado para permitir produtos com mesmo nome
      const produtosRef = collection(db, 'produtos');

      // Verificar se já existe produto com mesmo SKU na loja (se fornecido)
      if (dados.codigoSku) {
        const qSku = query(
          produtosRef,
          where('lojaId', '==', lojaId),
          where('codigoSku', '==', dados.codigoSku.trim())
        );

        const skuSnapshot = await getDocs(qSku);
        if (!skuSnapshot.empty) {
          throw new Error('Já existe um produto com este código SKU');
        }
      }

      // Criar documento do produto
      const produtoData = {
        lojaId,
        nome: dados.nome.trim(),
        categoria: dados.categoria.trim(),
        descricao: dados.descricao.trim(),
        precoVenda: dados.precoVenda,
        precoCusto: dados.precoCusto,
        estoqueAtual: dados.estoqueAtual,
        estoqueMinimo: dados.estoqueMinimo,
        controleEstoque: dados.controleEstoque,
        status: dados.status,
        codigoBarras: dados.codigoBarras?.trim() || null,
        codigoSku: dados.codigoSku?.trim() || null,
        unidadeMedida: dados.unidadeMedida,
        imagem: dados.imagem?.trim() || null,
        horariosDisponibilidade: dados.horariosDisponibilidade,
        dataCriacao: Timestamp.now(),
        dataAtualizacao: Timestamp.now()
      };

      const docRef = await addDoc(produtosRef, produtoData);
      return docRef.id;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao criar produto';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Buscar produtos da loja
  const buscarProdutos = async (lojaId?: string): Promise<ProdutoModal[]> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user || !user.uid) {
        throw new Error('Usuário não autenticado ou UID inválido');
      }

      const lojaIdToUse = lojaId || user.uid;
      if (!lojaIdToUse || lojaIdToUse.trim() === '') {
        throw new Error('lojaId é obrigatório');
      }
      const produtosRef = collection(db, 'produtos');
      
      const q = query(
        produtosRef,
        where('lojaId', '==', lojaIdToUse)
      );

      const querySnapshot = await getDocs(q);
      const produtos: ProdutoModal[] = [];

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtos.push({
          id: doc.id,
          lojaId: data.lojaId,
          nome: data.nome,
          categoria: data.categoria,
          descricao: data.descricao,
          precoVenda: data.precoVenda,
          precoCusto: data.precoCusto,
          estoqueAtual: data.estoqueAtual,
          estoqueMinimo: data.estoqueMinimo || 0,
          controleEstoque: data.controleEstoque || false,
          status: data.status,
          codigoBarras: data.codigoBarras,
          codigoSku: data.codigoSku,
          unidadeMedida: data.unidadeMedida,
          imagem: data.imagem,
          horariosDisponibilidade: data.horariosDisponibilidade || [],
          dataCriacao: data.dataCriacao?.toDate() || new Date(),
          dataAtualizacao: data.dataAtualizacao?.toDate() || new Date()
        });
      });

      // Ordenar por data de criação (mais recente primeiro)
      produtos.sort((a, b) => b.dataCriacao.getTime() - a.dataCriacao.getTime());

      return produtos;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao buscar produtos';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Atualizar produto
  const atualizarProduto = async (produtoId: string, dados: Partial<DadosNovoProduto>): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const lojaId = user.uid;

      // Verificar se o produto existe e pertence à loja
      const produtoRef = doc(db, 'produtos', produtoId);
      const produtoSnap = await getDoc(produtoRef);

      if (!produtoSnap.exists()) {
        throw new Error('Produto não encontrado');
      }

      const produtoData = produtoSnap.data();
      if (produtoData.lojaId !== lojaId) {
        throw new Error('Produto não pertence à sua loja');
      }

      // Verificar duplicatas se nome ou SKU foram alterados
      if (dados.nome && dados.nome.trim() !== produtoData.nome) {
        const produtosRef = collection(db, 'produtos');
        const q = query(
          produtosRef,
          where('lojaId', '==', lojaId),
          where('nome', '==', dados.nome.trim())
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          throw new Error('Já existe um produto com este nome');
        }
      }

      if (dados.codigoSku && dados.codigoSku.trim() !== produtoData.codigoSku) {
        const produtosRef = collection(db, 'produtos');
        const q = query(
          produtosRef,
          where('lojaId', '==', lojaId),
          where('codigoSku', '==', dados.codigoSku.trim())
        );

        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
          throw new Error('Já existe um produto com este código SKU');
        }
      }

      // Preparar dados para atualização
      const updateData: any = {
        dataAtualizacao: Timestamp.now()
      };

      if (dados.nome) updateData.nome = dados.nome.trim();
      if (dados.categoria) updateData.categoria = dados.categoria.trim();
      if (dados.descricao) updateData.descricao = dados.descricao.trim();
      if (dados.precoVenda !== undefined) updateData.precoVenda = dados.precoVenda;
      if (dados.precoCusto !== undefined) updateData.precoCusto = dados.precoCusto;
      if (dados.estoqueAtual !== undefined) updateData.estoqueAtual = dados.estoqueAtual;
      if (dados.estoqueMinimo !== undefined) updateData.estoqueMinimo = dados.estoqueMinimo;
      if (dados.controleEstoque !== undefined) updateData.controleEstoque = dados.controleEstoque;
      if (dados.status) updateData.status = dados.status;
      if (dados.codigoBarras !== undefined) updateData.codigoBarras = dados.codigoBarras?.trim() || null;
      if (dados.codigoSku !== undefined) updateData.codigoSku = dados.codigoSku?.trim() || null;
      if (dados.unidadeMedida) updateData.unidadeMedida = dados.unidadeMedida;
      if (dados.imagem !== undefined) updateData.imagem = dados.imagem?.trim() || null;
      if (dados.horariosDisponibilidade) updateData.horariosDisponibilidade = dados.horariosDisponibilidade;


      await updateDoc(produtoRef, updateData);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao atualizar produto';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Excluir produto
  const excluirProduto = async (produtoId: string): Promise<void> => {
    setIsLoading(true);
    setError(null);

    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const lojaId = user.uid;

      // Verificar se o produto existe e pertence à loja
      const produtoRef = doc(db, 'produtos', produtoId);
      const produtoSnap = await getDoc(produtoRef);

      if (!produtoSnap.exists()) {
        throw new Error('Produto não encontrado');
      }

      const produtoData = produtoSnap.data();
      if (produtoData.lojaId !== lojaId) {
        throw new Error('Produto não pertence à sua loja');
      }

      await deleteDoc(produtoRef);

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Erro ao excluir produto';
      setError(errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    clearError,
    criarProduto,
    buscarProdutos,
    atualizarProduto,
    excluirProduto
  };
}
