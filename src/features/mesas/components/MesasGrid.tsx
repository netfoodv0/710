import React from 'react';
import { useMesasContext } from '../../../context/MesasContext';
import { MesaCard } from './MesaCard';
import { Mesa } from '../../../types/mesas';

export function MesasGrid() {
  const { mesas, loading } = useMesasContext();

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  // Verificar se mesas é um array válido
  if (!Array.isArray(mesas)) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma mesa encontrada</p>
      </div>
    );
  }

  // Agrupar mesas por status
  const mesasPorStatus: Record<string, Mesa[]> = mesas.reduce((acc, mesa) => {
    // Verificar se mesa e mesa.status são válidos
    if (mesa && mesa.status) {
      if (!acc[mesa.status]) {
        acc[mesa.status] = [];
      }
      acc[mesa.status].push(mesa);
    }
    return acc;
  }, {} as Record<string, Mesa[]>);

  // Ordenar mesas por número
  Object.keys(mesasPorStatus).forEach(status => {
    if (Array.isArray(mesasPorStatus[status])) {
      mesasPorStatus[status].sort((a, b) => {
        // Verificar se a e b são válidos
        if (!a || !b) return 0;
        return (a.numero || 0) - (b.numero || 0);
      });
    }
  });

  // Verificar se há mesas para exibir
  const hasMesas = Object.keys(mesasPorStatus).length > 0;

  if (!hasMesas) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Nenhuma mesa cadastrada</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(mesasPorStatus).map(([status, mesas]) => (
        <div key={status}>
          <h3 className="text-lg font-semibold mb-3 capitalize">
            {getStatusDisplay(status)}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {mesas.map(mesa => (
              <MesaCard key={mesa.id} mesa={mesa} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function getStatusDisplay(status: string): string {
  switch (status) {
    case 'livre':
      return 'Mesas Livres';
    case 'ocupada':
      return 'Mesas Ocupadas';
    case 'reservada':
      return 'Mesas Reservadas';
    case 'manutencao':
      return 'Mesas em Manutenção';
    default:
      return status;
  }
}