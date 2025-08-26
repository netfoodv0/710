import React, { useState } from 'react';
import { CouponIcon, BagIcon, UsersIcon, RevenueIcon } from '../ui';

interface EstatisticasCuponsProps {
  estatisticas: {
    totalCupons: number;
    cuponsAtivos: number;
    cuponsInativos: number;
    totalUsos: number;
    cuponsExpirados: number;
    cuponsExpiramEm30Dias: number;
    valorTotalDescontos: number;
    cupomMaisUsado: string;
    categoriaMaisPopular: string;
  };
}

export function EstatisticasCupons({ estatisticas }: EstatisticasCuponsProps) {
  const [tooltipVisible, setTooltipVisible] = useState<number | null>(null);

  const estatisticasItems = [
    {
      label: 'Total de Cupons',
      value: estatisticas.totalCupons,
      icon: <CouponIcon size={24} color="#6b7280" />,
      tooltip: 'Número total de cupons cadastrados no sistema',
      detail: `${estatisticas.cuponsInativos} inativos • ${estatisticas.cuponsExpirados} expirados`
    },
    {
      label: 'Cupons Ativos',
      value: estatisticas.cuponsAtivos,
      icon: <BagIcon size={24} color="#6b7280" />,
      tooltip: 'Cupons disponíveis para uso pelos clientes',
      detail: `${estatisticas.cuponsExpiramEm30Dias} expiram em 30 dias`
    },
    {
      label: 'Total de Usos',
      value: estatisticas.totalUsos,
      icon: <UsersIcon size={24} color="#6b7280" />,
      tooltip: 'Quantidade total de vezes que os cupons foram utilizados',
      detail: `Média de ${Math.round(estatisticas.totalUsos / estatisticas.totalCupons)} usos por cupom`
    },
    {
      label: 'Descontos Gerados',
      value: `R$ ${estatisticas.valorTotalDescontos.toFixed(2)}`,
      icon: <RevenueIcon size={24} color="#6b7280" />,
      tooltip: 'Valor total economizado pelos clientes através dos cupons',
      detail: `Cupom mais usado: ${estatisticas.cupomMaisUsado}`
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 mb-6 cupons-stats-wrapper" style={{ border: '1px solid #cfd1d3' }}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        {estatisticasItems.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-white rounded-lg p-3 sm:p-4 relative cursor-help cupons-stat-card"
            style={{ border: '1px solid #cfd1d3', minHeight: '71px' }}
            onMouseEnter={() => setTooltipVisible(index)}
            onMouseLeave={() => setTooltipVisible(null)}
          >
            <div className="text-left h-full flex flex-col justify-between">
              <p className="text-xs font-normal text-gray-600">{item.label}</p>
              <p className="text-base sm:text-lg font-bold text-gray-900">{item.value}</p>
            </div>
            
            <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2">
              <div className="p-1.5 sm:p-2 bg-gray-100 rounded-full">
                <div className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600">
                  {item.icon}
                </div>
              </div>
            </div>

            {/* Tooltip */}
            {tooltipVisible === index && (
              <div className="absolute z-50 bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 text-sm bg-gray-800 text-white rounded-lg shadow-lg whitespace-nowrap max-w-xs">
                <div className="text-center">
                  <div className="font-medium mb-1">{item.tooltip}</div>
                  <div className="text-xs text-gray-300">{item.detail}</div>
                </div>
                {/* Seta do tooltip */}
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
