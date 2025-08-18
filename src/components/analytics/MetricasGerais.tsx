import React from 'react';
import { Users, DollarSign } from 'lucide-react';
import { BagIcon } from '../ui';

interface MetricasGeraisProps {
  totalPedidos?: number;
  totalClientes?: number;
  ticketMedio?: number;
}

export const MetricasGerais: React.FC<MetricasGeraisProps> = ({ 
  totalPedidos = 0, 
  totalClientes = 0, 
  ticketMedio = 0 
}) => {
  const metricas = [
    {
      titulo: 'Total de pedidos',
      valor: totalPedidos,
      icone: <BagIcon size={16} color="#2563eb" />,
      cor: 'bg-blue-100 text-blue-600',
      bgCor: 'bg-blue-50'
    },
    {
      titulo: 'Clientes totais',
      valor: totalClientes,
      icone: <Users className="w-4 h-4" />,
      cor: 'bg-green-100 text-green-600',
      bgCor: 'bg-green-50'
    },
    {
      titulo: 'Ticket médio',
      valor: `R$ ${ticketMedio.toFixed(2).replace('.', ',')}`,
      icone: <DollarSign className="w-4 h-4" />,
      cor: 'bg-purple-100 text-purple-600',
      bgCor: 'bg-purple-50'
    }
  ];

  return (
    <div className="bg-white border rounded-lg p-3 min-h-48" style={{ borderColor: '#cfd1d3' }}>
      <h3 className="text-sm font-semibold text-gray-900 mb-3">
        Métricas Gerais
      </h3>
      
      <div className="space-y-2">
        {metricas.map((metrica, index) => (
          <div key={index} className={`flex items-center justify-between p-2 ${metrica.bgCor} rounded-lg`}>
            <div className="flex items-center space-x-2">
              <div className={`w-6 h-6 rounded-lg flex items-center justify-center ${metrica.cor}`}>
                {metrica.icone}
              </div>
              <span className="font-medium text-gray-700 text-xs">{metrica.titulo}</span>
            </div>
            <span className="text-lg font-bold text-gray-900">{metrica.valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
