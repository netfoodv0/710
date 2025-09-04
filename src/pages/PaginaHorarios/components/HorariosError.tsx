import React from 'react';
import { AlertCircle } from 'lucide-react';

interface HorariosErrorProps {
  error: string;
  onRetry: () => void;
}

export function HorariosError({ error, onRetry }: HorariosErrorProps) {
  return (
    <div className="h-full p-4">
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <div className="flex items-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
          <h3 className="text-lg font-medium text-red-800">Erro ao carregar configurações</h3>
        </div>
        <p className="text-red-700 mb-4">{error}</p>
        <button
          onClick={onRetry}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors"
        >
          Tentar novamente
        </button>
      </div>
    </div>
  );
}
