import React from 'react';
import { EstatisticasCard } from './';

interface EstatisticasContainerProps {
  estatisticasClientes: {
    totalClientes: number;
    novosClientes?: number;
    fieis: number;
    taxaRetencao?: number;
  } | null;
}

const EstatisticasContainer: React.FC<EstatisticasContainerProps> = ({ 
  estatisticasClientes 
}) => {
  if (!estatisticasClientes) {
    return null;
  }

  return (
    <div className="bg-white rounded-lg p-4" style={{ border: '1px solid #cfd1d3' }}>
      <div className="flex flex-wrap gap-6">
        <EstatisticasCard
          titulo="Total de Clientes"
          valor={estatisticasClientes.totalClientes || 0}
          icone={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          }
        />

        <EstatisticasCard
          titulo="Novos Clientes"
          valor={estatisticasClientes.novosClientes || 0}
          icone={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          }
        />

        <EstatisticasCard
          titulo="Clientes Fiéis"
          valor={estatisticasClientes.fieis || 0}
          icone={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.118 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
          }
        />

        <EstatisticasCard
          titulo="Taxa de Retenção"
          valor={estatisticasClientes.taxaRetencao ? `${estatisticasClientes.taxaRetencao.toFixed(1)}%` : '0%'}
          icone={
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default EstatisticasContainer;
