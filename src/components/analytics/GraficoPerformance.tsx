import React, { useState } from 'react';
import { Card } from '../Card';
import { BarChart3 } from 'lucide-react';

interface GraficoPerformanceProps {
  className?: string;
}

export function GraficoPerformance({ className }: GraficoPerformanceProps) {
  const [periodoSelecionado, setPeriodoSelecionado] = useState('7d');

  const periodos = [
    { key: '7d', label: '7 dias' },
    { key: '30d', label: '30 dias' },
    { key: '90d', label: '90 dias' },
    { key: '1y', label: '1 ano' }
  ];

  return (
    <Card className={className}>
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-semibold text-gray-900">
            Performance de Vendas
          </h3>
          <div className="flex gap-2">
            {periodos.map((periodo) => (
              <button
                key={periodo.key}
                onClick={() => setPeriodoSelecionado(periodo.key)}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  periodoSelecionado === periodo.key
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {periodo.label}
              </button>
            ))}
          </div>
        </div>
        
        {/* Placeholder para gráfico */}
        <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-500">Gráfico de Performance</p>
            <p className="text-sm text-gray-400 mt-1">
              Período: {periodos.find(p => p.key === periodoSelecionado)?.label}
            </p>
            <p className="text-xs text-gray-400 mt-2">
              Integrar com Recharts ou ApexCharts
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
