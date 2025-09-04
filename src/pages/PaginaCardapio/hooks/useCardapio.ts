import { useState, useEffect, useCallback } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { cardapioService } from '../services/cardapioService';
import { CardapioData } from '../types';

export function useCardapio() {
  const [data, setData] = useState<CardapioData>({
    produtos: [],
    categorias: [],
    loading: true,
    error: null
  });

  const { showError } = useNotificationContext();

  const carregarProdutos = useCallback(async () => {
    try {
      const produtos = await cardapioService.obterProdutos();
      setData(prev => ({ ...prev, produtos }));
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      showError('Erro ao carregar produtos do cardápio');
    }
  }, [showError]);

  const carregarCategorias = useCallback(async () => {
    try {
      const categorias = await cardapioService.obterCategorias();
      setData(prev => ({ ...prev, categorias }));
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
      showError('Erro ao carregar categorias do cardápio');
    }
  }, [showError]);

  const refreshDados = useCallback(() => {
    setData(prev => ({ ...prev, loading: true, error: null }));
    carregarProdutos();
    carregarCategorias();
  }, [carregarProdutos, carregarCategorias]);

  const handleRetry = useCallback(() => {
    refreshDados();
  }, [refreshDados]);

  useEffect(() => {
    const carregarDados = async () => {
      try {
        setData(prev => ({ ...prev, loading: true, error: null }));
        
        await Promise.all([
          carregarProdutos(),
          carregarCategorias()
        ]);
        
        setData(prev => ({ ...prev, loading: false }));
      } catch (error) {
        setData(prev => ({
          ...prev,
          loading: false,
          error: 'Erro ao carregar dados do cardápio'
        }));
      }
    };

    carregarDados();
  }, [carregarProdutos, carregarCategorias]);

  return {
    data,
    carregarProdutos,
    carregarCategorias,
    refreshDados,
    handleRetry
  };
}
