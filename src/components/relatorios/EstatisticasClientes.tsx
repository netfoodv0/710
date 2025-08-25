import React from 'react';

interface EstatisticasClientesProps {
  estatisticas: {
    totalClientes: number;
    novosClientes: number;
    clientesAtivos: number;
    taxaRetencao: number;
  };
}

export const EstatisticasClientes: React.FC<EstatisticasClientesProps> = ({ estatisticas }) => {
  const estatisticasItems = [
    {
      label: 'Total de Clientes',
      value: estatisticas.totalClientes,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      label: 'Novos Clientes',
      value: estatisticas.novosClientes,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
        </svg>
      )
    },
    {
      label: 'Clientes Ativos',
      value: estatisticas.clientesAtivos,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'Taxa de Retenção',
      value: `${estatisticas.taxaRetencao.toFixed(1)}%`,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 mb-6" style={{ border: '1px solid #cfd1d3' }}>
      <div className="flex flex-wrap gap-6">
        {estatisticasItems.map((item, index) => (
          <div
            key={index}
            className="flex-1 bg-white rounded-lg p-4 relative"
            style={{ border: '1px solid #cfd1d3', height: '71px' }}
          >
            <div className="text-left h-full flex flex-col justify-between">
              <p className="text-xs font-normal text-gray-600">{item.label}</p>
              <p className="text-lg font-bold text-gray-900">{item.value}</p>
            </div>
            
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <div className="p-2 bg-gray-100 rounded-full">
                <div className="w-6 h-6 text-gray-600">
                  {item.icon}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
