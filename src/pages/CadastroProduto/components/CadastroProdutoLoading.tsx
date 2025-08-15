import React from 'react';

interface CadastroProdutoLoadingProps {
  message?: string;
}

export const CadastroProdutoLoading: React.FC<CadastroProdutoLoadingProps> = ({ 
  message = "" 
}) => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="text-center">

        <p className="text-gray-600">{message}</p>
      </div>
    </div>
  );
};
