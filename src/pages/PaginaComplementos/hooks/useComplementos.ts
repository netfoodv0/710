import { useState, useEffect, useCallback } from 'react';
import { auth } from '../../../lib/firebase';
import { ComplementosService } from '../services';
import { 
  Complemento, 
  CategoriaComplemento, 
  ComplementoFilters, 
  ComplementoStats,
  UseComplementosReturn 
} from '../types';

export function useComplementos(): UseComplementosReturn {
  const [complementos, setComplementos] = useState<Complemento[]>([]);
  const [categorias, setCategorias] = useState<CategoriaComplemento[]>([]);
  const [filtros, setFiltros] = useState<ComplementoFilters>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const user = auth.currentUser;
      if (!user) {
        throw new Error('Usuário não autenticado');
      }

      const [complementosData, categoriasData] = await Promise.all([
        ComplementosService.buscarComplementos(user.uid),
        ComplementosService.buscarCategoriasComplementos(user.uid)
      ]);

      setComplementos(complementosData);
      setCategorias(categoriasData);
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const refreshData = useCallback(async () => {
    await carregarDados();
  }, [carregarDados]);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  // Calcular estatísticas
  const stats: ComplementoStats = {
    total: complementos.length,
    ativos: complementos.filter(c => c.status === 'ativo').length,
    inativos: complementos.filter(c => c.status === 'inativo').length,
    porCategoria: categorias.map(categoria => ({
      categoria: categoria.nome,
      quantidade: complementos.filter(c => c.categoria === categoria.nome).length
    })),
    porTipo: [
      {
        tipo: 'Obrigatório',
        quantidade: complementos.filter(c => c.tipo === 'obrigatorio').length
      },
      {
        tipo: 'Opcional',
        quantidade: complementos.filter(c => c.tipo === 'opcional').length
      }
    ]
  };

  return {
    complementos,
    categorias,
    filtros,
    stats,
    isLoading,
    error,
    setFiltros,
    refreshData
  };
}









