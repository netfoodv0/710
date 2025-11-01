import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useNavigation } from '../../context/navigationContext';

interface ReportNavigationProps {
  currentPage: string;
}

export function ReportNavigation({ currentPage }: ReportNavigationProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { setCurrentPage } = useNavigation();

  // Atualiza o contexto de navegação quando a URL muda
  useEffect(() => {
    if (location.pathname.startsWith('/relatorios')) {
      if (location.pathname === '/relatorios/geral') {
        setCurrentPage('relatorios');
      } else if (location.pathname.includes('/relatorios/produtos')) {
        setCurrentPage('produtos');
      }
    } else if (location.pathname === '/cupons') {
      setCurrentPage('cupons');
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
        ? 'text-purple-700 bg-purple-50 border border-purple-300 shadow-sm'
        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 hover:border-gray-400'
    }`;
  };

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={() => handleNavigation('/relatorios/geral')}
        className={getButtonStyle('relatorios')}
      >
        Relatórios
      </button>
      <button
        onClick={() => handleNavigation('/relatorios/produtos')}
        className={getButtonStyle('produtos')}
      >
        Produtos
      </button>
      <button
        onClick={() => handleNavigation('/cupons')}
        className={getButtonStyle('cupons')}
      >
        Cupons
      </button>
    </div>
  );
}
