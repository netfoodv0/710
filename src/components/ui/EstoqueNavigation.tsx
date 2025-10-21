import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/navigationContext';

interface EstoqueNavigationProps {
  currentPage: string;
}

export function EstoqueNavigation({ currentPage }: EstoqueNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useNavigation();

  // Atualiza o contexto de navegação quando a URL muda
  useEffect(() => {
    if (location.pathname.startsWith('/estoque')) {
      if (location.pathname === '/estoque/produtos') {
        setCurrentPage('produto');
      } else if (location.pathname.includes('/estoque/acompanhamentos')) {
        setCurrentPage('acompanhamento');
      }
    }
  }, [location.pathname, setCurrentPage]);

  const handleNavigation = (path: string) => {
    // Navegação instantânea sem loading
    navigate(path);
  };

  const getButtonStyle = (page: string) => {
    const isActive = currentPage === page;
    return `inline-flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
      isActive
        ? 'text-blue-700 bg-blue-50 border border-blue-300 shadow-sm'
        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
    }`;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleNavigation('/estoque/produtos')}
        className={getButtonStyle('produto')}
      >
        Produto
      </button>
      <button
        onClick={() => handleNavigation('/estoque/acompanhamentos')}
        className={getButtonStyle('acompanhamento')}
      >
        Acompanhamento
      </button>
    </div>
  );
}
