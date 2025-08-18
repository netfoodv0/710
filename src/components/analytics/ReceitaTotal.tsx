import React from 'react';
import { TrendingUp, Send } from 'lucide-react';

interface ReceitaTotalProps {
  receitaTotal?: number;
}

export const ReceitaTotal = ({ receita }: { receita: number }) => {
  return (
    <div className="bg-white border rounded-lg p-3" style={{ borderColor: '#cfd1d3' }}>
      <h3 className="text-sm font-semibold text-gray-900 mb-2">Receita Total</h3>
      <p className="text-2xl font-bold text-gray-900">
        R$ {receita.toFixed(2).replace('.', ',')}
      </p>
    </div>
  );
};
