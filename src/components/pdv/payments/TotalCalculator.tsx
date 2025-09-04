import React from 'react';
import { Calculator } from 'lucide-react';
import { usePDVContext } from '../../../context/PDVContext';

export const TotalCalculator: React.FC = () => {
  const { selectedProducts } = usePDVContext();

  if (selectedProducts.length === 0) {
    return (
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="text-center text-gray-500">
          <Calculator size={48} className="mx-auto mb-3 text-gray-300" />
          <p className="text-sm">Adicione produtos para ver o resumo dos valores</p>
        </div>
      </div>
    );
  }

  // Retorna null quando há produtos selecionados (card removido)
  return null;
};
