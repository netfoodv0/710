import React from 'react';
import { FixedPageHeader } from '../../components/ui';
import { useNavigate, useLocation } from 'react-router-dom';

interface HeaderEstoqueCompartilhadoProps {
  actionButton?: {
    label: string;
    onClick: () => void;
    loading?: boolean;
    disabled?: boolean;
    variant?: string;
    size?: string;
  };
}

export const HeaderEstoqueCompartilhado: React.FC<HeaderEstoqueCompartilhadoProps> = ({
  actionButton
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Determinar qual opção está ativa baseado na rota atual
  const isAcompanhamentos = location.pathname.includes('/acompanhamentos');

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  // Conteúdo dos botões à direita
  const rightContent = (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleNavigate('/estoque')}
        className={`px-3 text-sm rounded transition-colors text-gray-700 hover:bg-gray-100 ${
          !isAcompanhamentos
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : ''
        }`}
        style={{ 
          borderRadius: '100px', 
          backgroundColor: !isAcompanhamentos ? undefined : '#f5f5f5',
          border: !isAcompanhamentos ? '1px solid rgb(139, 92, 246)' : '1px solid rgb(209, 213, 219)',
          height: '32px'
        }}
      >
        Produtos
      </button>
      <button
        onClick={() => handleNavigate('/estoque/acompanhamentos')}
        className={`px-3 text-sm rounded transition-colors text-gray-700 hover:bg-gray-100 ${
          isAcompanhamentos
            ? 'bg-purple-600 text-white hover:bg-purple-700'
            : ''
        }`}
        style={{ 
          borderRadius: '100px', 
          backgroundColor: isAcompanhamentos ? undefined : '#f5f5f5',
          border: isAcompanhamentos ? '1px solid rgb(139, 92, 246)' : '1px solid rgb(209, 213, 219)',
          height: '32px'
        }}
      >
        Acompanhamentos
      </button>
    </div>
  );

  return (
    <>
      <FixedPageHeader
        title={isAcompanhamentos ? "Acompanhamentos" : "Produtos"}
        rightContent={rightContent}
      />
      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-[50px]" />
    </>
  );
};
