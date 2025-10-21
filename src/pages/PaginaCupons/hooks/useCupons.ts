import { useState, useCallback, useMemo, useEffect } from 'react';
import { useNotificationContext } from '../../../context/notificationContextUtils';
import { useAnimacaoCards } from '../../../hooks/useAnimacaoCards';
import { useConfiguracaoTabelaCupons } from '../../../components/relatorios';
// Usando apenas dados reais do Firebase
import { UseCuponsReturn, CuponsData, Cupom, PeriodType } from '../types';
import { FirebaseCuponsService } from '../../../services/firebase/cuponsService';

export function useCupons(): UseCuponsReturn {
  const [selectedPeriod, setSelectedPeriod] = useState<PeriodType>('weekly');
  const [loading, setLoading] = useState(true); // Inicia como true para mostrar loading
  const [error, setError] = useState<string | null>(null);
  const [cupons, setCupons] = useState<Cupom[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const { showSuccess, showError } = useNotificationContext();
  const cuponsService = useMemo(() => new FirebaseCuponsService(), []);

  // Carregar cupons do Firebase
  useEffect(() => {
    const loadCupons = async () => {
      try {
        setLoading(true);
        setError(null);
        const cuponsData = await cuponsService.buscarCupons();
        setCupons(cuponsData);
      } catch (err) {
        setError('Erro ao carregar cupons');
        console.error('Erro ao carregar cupons:', err);
      } finally {
        setLoading(false);
      }
    };

    loadCupons();
  }, [cuponsService]);
  
  // Hook para animações dos cards - só executa quando não está carregando
  const percentuais = useMemo(() => 
    loading ? [] : [], 
    [loading]
  );
  
  const { carregamentoCompleto, mostrarAnimacoes, alturasAnimadas } = useAnimacaoCards({
    percentuais
  });
  
  // Configuração da tabela
  const { columns } = useConfiguracaoTabelaCupons();

  // Categorias únicas para filtros baseadas nos dados reais
  const categoriasFiltros = useMemo(() => {
    const categoriasUnicas = [...new Set(cupons.map(c => c.categoria))];
    return categoriasUnicas.map(cat => ({ value: cat, label: cat }));
  }, [cupons]);

  // Status únicos para filtros baseados nos dados reais
  const statusOptions = useMemo(() => {
    const status = [...new Set(cupons.map(c => c.status))];
    return status.map(st => ({ value: st, label: st === 'ativo' ? 'Ativo' : 'Inativo' }));
  }, [cupons]);

  // Tipo únicos para filtros baseados nos dados reais
  const tipoOptions = useMemo(() => {
    const tipos = [...new Set(cupons.map(c => c.tipo))];
    return tipos.map(t => ({ value: t, label: t === 'percentual' ? 'Percentual' : 'Valor Fixo' }));
  }, [cupons]);

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
    setIsModalOpen(true);
  }, []);

  const handleCupomCriado = useCallback((novoCupom: Cupom) => {
    setCupons(prev => [novoCupom, ...prev]);
    setIsModalOpen(false);
    showSuccess('Cupom criado com sucesso!');
  }, [showSuccess]);

  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  // Dados consolidados
  const data: CuponsData = {
    cupons,
    estatisticas: {
      totalCupons: cupons.length,
      cuponsAtivos: cupons.filter(c => c.status === 'ativo').length,
      cuponsInativos: cupons.filter(c => c.status === 'inativo').length,
      totalUsos: cupons.reduce((acc, c) => acc + (c.usosAtuais || 0), 0)
    },
    categorias: [...new Set(cupons.map(c => c.categoria))],
    cardPercentages: [], // Sem dados mocados
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
    alturasAnimadas,
    isModalOpen,
    handleCupomCriado,
    handleCloseModal
  };
}
