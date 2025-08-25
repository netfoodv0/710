import { useMemo, useCallback } from 'react';
import { useEstatisticas } from '../context/estatisticasContext';
import { DadosRelatorioGeral, DadosRelatorioClientes } from '../types/relatorios';

export const useEstatisticasOptimized = () => {
  const { 
    estatisticasGerais, 
    estatisticasClientes, 
    loading, 
    error, 
    recarregarEstatisticas 
  } = useEstatisticas();

  // Memoizar estatísticas formatadas para evitar recálculos
  const estatisticasFormatadas = useMemo(() => ({
    gerais: {
      totalPedidos: estatisticasGerais.totalPedidos.toLocaleString('pt-BR'),
      faturamentoTotal: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(estatisticasGerais.faturamentoTotal),
      clientesAtivos: estatisticasGerais.clientesAtivos.toLocaleString('pt-BR'),
      ticketMedio: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(estatisticasGerais.ticketMedio)
    },
    clientes: {
      totalClientes: estatisticasClientes.totalClientes.toLocaleString('pt-BR'),
      novosClientes: estatisticasClientes.novosClientes.toLocaleString('pt-BR'),
      clientesAtivos: estatisticasClientes.clientesAtivos.toLocaleString('pt-BR'),
      taxaRetencao: `${estatisticasClientes.taxaRetencao.toFixed(1)}%`
    }
  }), [estatisticasGerais, estatisticasClientes]);

  // Memoizar função de recarregamento
  const recarregar = useCallback(async () => {
    try {
      await recarregarEstatisticas();
    } catch (err) {
      console.error('Erro ao recarregar estatísticas:', err);
    }
  }, [recarregarEstatisticas]);

  // Memoizar se há dados válidos
  const hasData = useMemo(() => {
    return estatisticasGerais.totalPedidos > 0 || estatisticasClientes.totalClientes > 0;
  }, [estatisticasGerais.totalPedidos, estatisticasClientes.totalClientes]);

  return {
    estatisticasGerais,
    estatisticasClientes,
    estatisticasFormatadas,
    loading,
    error,
    hasData,
    recarregar
  };
};
