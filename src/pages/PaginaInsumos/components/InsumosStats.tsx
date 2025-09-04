import React from 'react';
import { EstatisticasCustom } from '../../../components/EstatisticasCustom';
import { BagIcon } from '../../../components/ui';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { InsumosStatsProps } from '../types';

export function InsumosStats({ insumos }: InsumosStatsProps) {
  // Calcular estatísticas
  const totalInsumos = insumos.length;
  const baixoEstoque = insumos.filter(i => i.status === 'baixo_estoque').length;
  const semEstoque = insumos.filter(i => i.status === 'sem_estoque').length;
  const valorTotal = insumos.reduce((total, insumo) => total + insumo.custoEstoque, 0);

  const estatisticas = [
    {
      label: 'Total de Insumos',
      valor: totalInsumos,
      icon: BagIcon,
      iconColor: '#6b7280'
    },
    {
      label: 'Baixo Estoque',
      valor: baixoEstoque,
      icon: AlertTriangle,
      iconColor: '#f59e0b'
    },
    {
      label: 'Sem Estoque',
      valor: semEstoque,
      icon: Package,
      iconColor: '#ef4444'
    },
    {
      label: 'Valor Total',
      valor: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(valorTotal),
      icon: TrendingUp,
      iconColor: '#10b981'
    }
  ];

  return <EstatisticasCustom estatisticas={estatisticas} />;
}
