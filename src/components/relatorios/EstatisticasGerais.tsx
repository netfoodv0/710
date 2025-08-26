import React, { useMemo } from 'react';

interface EstatisticasGeraisProps {
  estatisticas: {
    totalPedidos: number;
    faturamentoTotal: number;
    clientesAtivos: number;
    ticketMedio: number;
  };
}

// Componente de ícone memoizado para evitar re-renderizações desnecessárias
const IconeEstatistica = React.memo(({ children }: { children: React.ReactNode }) => (
  <div className="p-2 bg-gray-100 rounded-full">
    <div className="w-6 h-6 text-gray-600">
      {children}
    </div>
  </div>
));

IconeEstatistica.displayName = 'IconeEstatistica';

const EstatisticasGeraisComponent: React.FC<EstatisticasGeraisProps> = ({ estatisticas }) => {
  // Memoizar os dados formatados para evitar recálculos desnecessários
  const estatisticasItems = useMemo(() => [
    {
      label: 'Total de Pedidos',
      value: estatisticas.totalPedidos.toLocaleString('pt-BR'),
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      )
    },
    {
      label: 'Faturamento Total',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(estatisticas.faturamentoTotal),
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )
    },
    {
      label: 'Clientes Ativos',
      value: estatisticas.clientesAtivos.toLocaleString('pt-BR'),
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Ticket Médio',
      value: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(estatisticas.ticketMedio),
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    }
  ], [estatisticas]);

  return (
    <div className="bg-white rounded-lg p-3 sm:p-4 mb-4 sm:mb-6" style={{ border: '1px solid #cfd1d3' }}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {estatisticasItems.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-3 sm:p-4 relative"
            style={{ border: '1px solid #cfd1d3', minHeight: '71px' }}
          >
            <div className="text-left h-full flex flex-col justify-between">
              <p className="text-xs font-normal text-gray-600">{item.label}</p>
              <p className="text-sm sm:text-lg font-bold text-gray-900 break-words">{item.value}</p>
            </div>
            
            <div className="absolute top-1/2 right-3 sm:right-4 transform -translate-y-1/2">
              <IconeEstatistica>
                {item.icon}
              </IconeEstatistica>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Exportar componente memoizado para evitar re-renderizações desnecessárias
export const EstatisticasGerais = React.memo(EstatisticasGeraisComponent);
EstatisticasGerais.displayName = 'EstatisticasGerais';
