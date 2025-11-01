import React, { useMemo } from 'react';
import { EstatisticasCustom } from '../../../pages/PaginaDashboard/components/EstatisticasCustom';
import { BagIcon } from '../../../components/ui';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { AcompanhamentosStatsProps } from '../types';
import { useTrendData } from '../../../hooks/useTrendData';

export function AcompanhamentosStats({ produtos }: AcompanhamentosStatsProps) {
  // Calcular estatísticas
  const totalProdutos = produtos.length;
  const baixoEstoque = produtos.filter(p => p.status === 'baixo_estoque').length;
  const semEstoque = produtos.filter(p => p.status === 'sem_estoque').length;
  const valorTotal = produtos.reduce((total, produto) => total + produto.custoEstoque, 0);

  // Gerar dados de tendência usando hook reutilizável
  const trendDataTotal = useTrendData(totalProdutos, 0);
  const trendDataBaixoEstoque = useTrendData(baixoEstoque, 1);
  const trendDataSemEstoque = useTrendData(semEstoque, 2);
  const trendDataValorTotal = useTrendData(Math.round(valorTotal / 100), 3);

  const estatisticas = useMemo(() => [
    {
      label: 'Total de Acompanhamentos',
      valor: totalProdutos,
      icon: BagIcon,
      iconColor: '#6b7280',
      trendData: trendDataTotal
    },
    {
      label: 'Baixo Estoque',
      valor: baixoEstoque,
      icon: AlertTriangle,
      iconColor: '#f59e0b',
      trendData: trendDataBaixoEstoque
    },
    {
      label: 'Sem Estoque',
      valor: semEstoque,
      icon: Package,
      iconColor: '#ef4444',
      trendData: trendDataSemEstoque
    },
    {
      label: 'Valor Total',
      valor: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valorTotal),
      icon: TrendingUp,
      iconColor: '#10b981',
      trendData: trendDataValorTotal
    }
  ], [totalProdutos, baixoEstoque, semEstoque, valorTotal, trendDataTotal, trendDataBaixoEstoque, trendDataSemEstoque, trendDataValorTotal]);

  return <EstatisticasCustom estatisticas={estatisticas} />;
}
