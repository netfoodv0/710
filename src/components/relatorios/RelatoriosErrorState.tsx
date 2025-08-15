import React from 'react';
import { AlertCircle } from 'lucide-react';

interface RelatoriosErrorStateProps {
  error: string;
  onRetry: () => void;
}

export function RelatoriosErrorState({ error, onRetry }: RelatoriosErrorStateProps) {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
      <div className="flex items-center justify-center p-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6 max-w-md w-full">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar dados</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={onRetry}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-lg hover:bg-red-700 transition-colors"
            >
  
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}