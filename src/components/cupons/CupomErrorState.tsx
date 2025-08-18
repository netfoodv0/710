import React from 'react';
import { AlertCircle } from 'lucide-react';
import { Button } from '../ui/Button';

interface CupomErrorStateProps {
  error: string;
  onRetry: () => void;
  onClearError: () => void;
}

export const CupomErrorState = ({ onRetry }: CupomErrorStateProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 max-w-md w-full" style={{ borderColor: '#cfd1d3' }}>
      <div className="flex items-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
        <h3 className="text-lg font-medium text-red-800">Erro ao carregar cupons</h3>
      </div>
      <p className="text-red-700 mb-4">Ocorreu um erro ao carregar os cupons. Tente novamente.</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Tentar Novamente
      </button>
    </div>
  );
};