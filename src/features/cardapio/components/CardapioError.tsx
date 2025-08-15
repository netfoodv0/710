import React from 'react';
import { AlertCircle } from 'lucide-react';

interface CardapioErrorProps {
  error: string;
  onRetry: () => void;
}

export function CardapioError({ error, onRetry }: CardapioErrorProps) {
  return (
    <div className="h-full p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-medium text-red-800">Erro ao carregar dados</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <div className="flex gap-3">
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
          >

          </button>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      </div>
    </div>
  );
}
