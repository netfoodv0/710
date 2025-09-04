import React from 'react';
import { EstatisticasCustom } from '../../../components/EstatisticasCustom';
import { BagIcon } from '../../../components/ui';
import { AlertTriangle, Package, TrendingUp } from 'lucide-react';
import { EstoqueStatsProps } from '../types';

export function EstoqueStats({ produtos }: EstoqueStatsProps) {
  // Calcular estatísticas
  const totalProdutos = produtos.length;
  const baixoEstoque = produtos.filter(p => p.status === 'baixo_estoque').length;
  const semEstoque = produtos.filter(p => p.status === 'sem_estoque').length;
  const valorTotal = produtos.reduce((total, produto) => total + produto.custoEstoque, 0);

  const estatisticas = [
    {
      label: 'Total de Produtos',
      valor: totalProdutos,
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
