import { useState, useEffect, useCallback } from 'react';
import { Caixa, DadosAberturaCaixa, DadosFechamentoCaixa } from '../types';
import { caixaService } from '../services';
import { useAuth } from '../../../hooks/useAuth';

interface UseCaixaReturn {
  caixaAtual: Caixa | null;
  loading: boolean;
  error: string | null;
  abrirCaixa: (dados: DadosAberturaCaixa) => Promise<string>;
  fecharCaixa: (dados: DadosFechamentoCaixa) => Promise<void>;
  adicionarMovimentacao: (tipo: 'entrada' | 'saida', valor: number, descricao: string) => Promise<void>;
  refreshCaixa: () => void;
  clearError: () => void;
}

export function useCaixa(): UseCaixaReturn {
  const { user, lojaId } = useAuth();
  const [caixaAtual, setCaixaAtual] = useState<Caixa | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const buscarCaixaAtual = useCallback(async () => {
    if (!lojaId) {
      setCaixaAtual(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const caixa = await caixaService.buscarCaixaAtual(lojaId);
      setCaixaAtual(caixa);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao buscar caixa atual';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [lojaId]);

  const abrirCaixa = useCallback(async (dados: DadosAberturaCaixa): Promise<string> => {
    if (!lojaId || !user?.uid) {
      throw new Error('Usuário ou loja não identificados');
    }

    setLoading(true);
    setError(null);

    try {
      const caixaId = await caixaService.abrirCaixa(dados, lojaId, user.uid);
      
      // Atualizar o caixa atual após abrir
      await buscarCaixaAtual();
      
      return caixaId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao abrir caixa';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [lojaId, user?.uid, buscarCaixaAtual]);

  const fecharCaixa = useCallback(async (dados: DadosFechamentoCaixa): Promise<void> => {
    if (!caixaAtual) {
      throw new Error('Nenhum caixa aberto para fechar');
    }

    setLoading(true);
    setError(null);

    try {
      await caixaService.fecharCaixa(caixaAtual.id, dados);
      
      // Atualizar o caixa atual após fechar
      await buscarCaixaAtual();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fechar caixa';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [caixaAtual, buscarCaixaAtual]);

  const adicionarMovimentacao = useCallback(async (tipo: 'entrada' | 'saida', valor: number, descricao: string): Promise<void> => {
    if (!caixaAtual) {
      throw new Error('Nenhum caixa aberto');
    }

    setLoading(true);
    setError(null);

    try {
      await caixaService.adicionarMovimentacao(caixaAtual.id, tipo, valor, descricao);
      
      // Atualizar o caixa atual após adicionar movimentação
      await buscarCaixaAtual();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao adicionar movimentação';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [caixaAtual, buscarCaixaAtual]);

  const refreshCaixa = useCallback(() => {
    buscarCaixaAtual();
  }, [buscarCaixaAtual]);

  useEffect(() => {
    buscarCaixaAtual();
  }, [buscarCaixaAtual]);

  return {
    caixaAtual,
    loading,
    error,
    abrirCaixa,
    fecharCaixa,
    adicionarMovimentacao,
    refreshCaixa,
    clearError
  };
}
