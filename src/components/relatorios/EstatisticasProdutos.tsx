import React from 'react';

interface EstatisticasProdutosProps {
  estatisticas: {
    totalProdutos: number;
    novosProdutos: number;
    produtosDestaque: number;
    taxaVendas: number;
  };
}

export const EstatisticasProdutos: React.FC<EstatisticasProdutosProps> = ({ estatisticas }) => {
  const estatisticasItems = [
    {
      label: 'Total de Produtos',
      value: estatisticas.totalProdutos,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
        </svg>
      )
    },
    {
      label: 'Novos Produtos',
      value: estatisticas.novosProdutos,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      label: 'Produtos em Destaque',
      value: estatisticas.produtosDestaque,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.118 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
        </svg>
      )
    },
    {
      label: 'Taxa de Vendas',
      value: `${estatisticas.taxaVendas.toFixed(1)}%`,
      icon: (
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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
