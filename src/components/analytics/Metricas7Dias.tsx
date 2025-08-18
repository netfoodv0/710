import React from 'react';
import { Calendar, DollarSign } from 'lucide-react';

interface Metricas7DiasProps {
  pedidos7Dias?: number;
  receita7Dias?: number;
}

export const Metricas7Dias: React.FC<Metricas7DiasProps> = ({ 
  pedidos7Dias = 0, 
  receita7Dias = 0 
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-blue-600">Pedidos - 7 dias</p>
            <p className="text-lg font-bold text-blue-900">{pedidos7Dias}</p>
          </div>
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <Calendar className="w-5 h-5 text-blue-600" />
          </div>
        </div>
      </div>
      
      <div className="bg-green-50 p-3 rounded-lg border border-green-200">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium text-green-600">Receita - 7 dias</p>
            <p className="text-lg font-bold text-green-900">
              R$ {receita7Dias.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
        </div>
      </div>
    </div>
  );
};
