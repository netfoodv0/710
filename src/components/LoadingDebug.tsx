import React from 'react';
import { useLoading } from '../context/loadingContext';
import { useLocation } from 'react-router-dom';

export const LoadingDebug: React.FC = () => {
  const { isLoading } = useLoading();
  const location = useLocation();

  // Apenas mostrar em desenvolvimento
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-black bg-opacity-75 text-white p-3 rounded-lg text-xs z-50">
      <div>Loading: {isLoading ? 'SIM' : 'NÃO'}</div>
      <div>Rota: {location.pathname}</div>
    </div>
  );
};
