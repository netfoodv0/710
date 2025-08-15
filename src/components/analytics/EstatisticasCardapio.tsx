import React from 'react';
import { Package, TrendingUp, DollarSign, AlertCircle, CheckCircle } from 'lucide-react';

interface EstatisticasCardapioProps {
  estatisticas: {
    total: number;
    ativos: number;
    inativos: number;
    emFalta: number;
    valorTotal: number;
    precoMedio: number;
  };
}

export function EstatisticasCardapio({ estatisticas }: EstatisticasCardapioProps) {
  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarPercentual = (valor: number, total: number) => {
    if (total === 0) return '0%';
    return `${Math.round((valor / total) * 100)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total de Produtos */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Total de Produtos</p>
            <p className="text-2xl font-bold text-gray-900">{estatisticas.total}</p>
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <Package className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-gray-500">
            {estatisticas.ativos} ativos • {estatisticas.inativos} inativos
          </span>
        </div>
      </div>

      {/* Produtos Ativos */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Produtos Ativos</p>
            <p className="text-2xl font-bold text-gray-900">{estatisticas.ativos}</p>
          </div>
          <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-gray-500">
            {formatarPercentual(estatisticas.ativos, estatisticas.total)} do total
          </span>
        </div>
      </div>

      {/* Valor Total */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Valor Total</p>
            <p className="text-2xl font-bold text-gray-900">{formatarValor(estatisticas.valorTotal)}</p>
          </div>
          <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-4 h-4 text-gray-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-gray-500">
            Preço médio: {formatarValor(estatisticas.precoMedio)}
          </span>
        </div>
      </div>

      {/* Produtos em Falta */}
      <div className="bg-white border border-slate-200 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Em Falta</p>
            <p className="text-2xl font-bold text-gray-900">{estatisticas.emFalta}</p>
          </div>
          <div className="w-8 h-8 bg-red-100 rounded flex items-center justify-center">
            <AlertCircle className="w-4 h-4 text-red-600" />
          </div>
        </div>
        <div className="mt-2 flex items-center text-xs">
          <span className="text-gray-500">
            {formatarPercentual(estatisticas.emFalta, estatisticas.total)} do total
          </span>
        </div>
      </div>
    </div>
  );
} 