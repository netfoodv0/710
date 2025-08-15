import React from 'react';
import { useLoading } from '../context/loadingContext';

export const LoadingTest: React.FC = () => {
  const { showLoading, hideLoading, isLoading } = useLoading();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Teste do Sistema de Carregamento</h2>
      
      <div className="space-y-2">
        <p>Status atual: <span className="font-medium">{isLoading ? 'Carregando...' : 'Não carregando'}</span></p>
        
        <div className="flex gap-2">
          <button
            onClick={showLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Mostrar Carregamento
          </button>
          
          <button
            onClick={hideLoading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Esconder Carregamento
          </button>
        </div>
      </div>
    </div>
  );
};

