import { useState, useEffect } from 'react';
import { usePaginaEmBrancoActions } from './usePaginaEmBrancoActions';
import { usePaginaEmBrancoTranslation } from './usePaginaEmBrancoTranslation';
import { PaginaEmBrancoData } from '../../types/paginaEmBrancoTypes';

export function usePaginaEmBranco() {
  const [data, setData] = useState<PaginaEmBrancoData>({
    // Adicione aqui os dados específicos da página em branco
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { fetchPaginaEmBrancoData, updatePaginaEmBrancoData } = usePaginaEmBrancoActions();
  const { t } = usePaginaEmBrancoTranslation();

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        const result = await fetchPaginaEmBrancoData();
        setData(result);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [fetchPaginaEmBrancoData]);

  const handleUpdateData = async (newData: Partial<PaginaEmBrancoData>) => {
    try {
      const result = await updatePaginaEmBrancoData(newData);
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erro ao atualizar dados');
    }
  };

  return {
    data,
    isLoading,
    error,
    handleUpdateData,
    t
  };
}