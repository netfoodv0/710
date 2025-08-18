import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RelatoriosErrorStateProps {
  error: string;
  onRetry: () => void;
}

export const RelatoriosErrorState = ({ error, onRetry }: RelatoriosErrorStateProps) => {
  return (
    <div className="bg-white border rounded-lg p-6 max-w-md w-full" style={{ borderColor: '#cfd1d3' }}>
      <div className="flex items-center mb-4">
        <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
        <h3 className="text-lg font-medium text-red-800">Erro ao carregar relatórios</h3>
      </div>
      <p className="text-red-700 mb-4">{error}</p>
      <button
        onClick={onRetry}
        className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
      >
        Tentar Novamente
      </button>
    </div>
  );
};