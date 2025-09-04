import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { useAnimacaoCards } from '../../../hooks/useAnimacaoCards';
import { useConfiguracaoTabelaCupons } from '../../../components/relatorios';
import { 
  cuponsFicticios, 
  estatisticasCupons, 
  categorias, 
  cardPercentages 
} from '../../../data/cuponsMock';
import { UseCuponsReturn, CuponsData, Cupom, PeriodType } from '../types';

export function useCupons(): UseCuponsReturn {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [loading, setLoading] = useState(true); // Inicia como true para mostrar loading
  const [error, setError] = useState<string | null>(null);
  
  const { showSuccess, showError } = useNotificationContext();

  // Simular carregamento inicial
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // 1 segundo de loading

    return () => clearTimeout(timer);
  }, []);
  
  // Hook para animações dos cards - só executa quando não está carregando
  const percentuais = useMemo(() => 
    loading ? [] : cardPercentages.map(card => card.percentual), 
    [cardPercentages, loading]
  );
  
  const { carregamentoCompleto, mostrarAnimacoes, alturasAnimadas } = useAnimacaoCards({
    percentuais
  });
  
  // Configuração da tabela
  const { columns } = useConfiguracaoTabelaCupons();

  // Categorias únicas para filtros
  const categoriasFiltros = useMemo(() => {
    return categorias.map(cat => ({ value: cat, label: cat }));
  }, []);

  // Status únicos para filtros
  const statusOptions = useMemo(() => {
    const status = [...new Set(cuponsFicticios.map(c => c.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, []);

  // Tipo únicos para filtros
  const tipoOptions = useMemo(() => {
    const tipos = [...new Set(cuponsFicticios.map(c => c.tipo))];
    return tipos.map(t => ({ value: t, label: t === 'percentual' ? 'Percentual' : 'Valor Fixo' }));
  }, []);

  const handlePeriodChange = useCallback((period: PeriodType) => {
    setSelectedPeriod(period);
  }, []);

  const handleExport = useCallback(async () => {
    try {
      setLoading(true);
      // Implementar exportação específica para cupons
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simular delay
      showSuccess('Relatório de cupons exportado com sucesso!');
    } catch (err) {
      showError('Erro ao exportar relatório de cupons');
    } finally {
      setLoading(false);
    }
  }, [showSuccess, showError]);

  const handleView = useCallback((cupom: Cupom) => {
    console.log('Visualizar:', cupom);
  }, []);

  const handleEdit = useCallback((cupom: Cupom) => {
    console.log('Editar:', cupom);
  }, []);

  const handleDelete = useCallback((cupom: Cupom) => {
    console.log('Excluir:', cupom);
  }, []);

  const handleAdd = useCallback(() => {
    console.log('Adicionar novo cupom');
  }, []);

  // Dados consolidados
  const data: CuponsData = {
    cupons: cuponsFicticios,
    estatisticas: estatisticasCupons,
    categorias,
    cardPercentages,
    selectedPeriod,
    loading,
    error
  };

  return {
    data,
    handlePeriodChange,
    handleExport,
    handleView,
    handleEdit,
    handleDelete,
    handleAdd,
    categoriasFiltros,
    statusOptions,
    tipoOptions,
    columns,
    carregamentoCompleto,
    mostrarAnimacoes,
    alturasAnimadas
  };
}
