import { useState, useEffect, useCallback } from 'react';
import { DadosRelatorios, ExportOptions } from '../types/relatorios.types';
import { relatoriosService } from '../services/relatoriosService';
import { PeriodType } from '../../../components/filters/FiltroPeriodo';

interface UseRelatoriosReturn {
  dados: DadosRelatorios | null;
  loading: boolean;
  error: string | null;
  carregarDados: () => Promise<void>;
  exportarRelatorio: (filtros: any, periodo: PeriodType, options?: ExportOptions) => Promise<void>;
  limparErro: () => void;
}

export function useRelatorios(period: PeriodType): UseRelatoriosReturn {
  const [dados, setDados] = useState<DadosRelatorios | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const carregarDados = useCallback(async () => {
    try {
      console.log('🔄 useRelatorios: Iniciando carregamento de dados para período:', period);
      setLoading(true);
      setError(null);
      
      const dadosRelatorios = await relatoriosService.obterDadosCompletos(period);
      console.log('📊 useRelatorios: Dados obtidos:', dadosRelatorios);
      
      setDados(dadosRelatorios);
      console.log('✅ useRelatorios: Dados carregados com sucesso');
    } catch (err) {
      console.error('❌ useRelatorios: Erro ao carregar dados dos relatórios:', err);
      setError(err instanceof Error ? err.message : 'Erro ao carregar dados');
    } finally {
      setLoading(false);
    }
  }, [period]);

  const exportarRelatorio = useCallback(async (
    filtros: any, 
    periodo: PeriodType, 
    options: ExportOptions = {
      format: 'pdf',
      incluirGraficos: true,
      incluirDetalhes: true,
      periodo: periodo
    }
  ) => {
    try {
      setLoading(true);
      await relatoriosService.exportarRelatorio(filtros, periodo, options);
    } catch (err) {
      console.error('Erro ao exportar relatório:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const limparErro = useCallback(() => {
    setError(null);
  }, []);

  useEffect(() => {
    carregarDados();
  }, [carregarDados]);

  return {
    dados,
    loading,
    error,
    carregarDados,
    exportarRelatorio,
    limparErro
  };
}