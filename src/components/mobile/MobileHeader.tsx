import React from 'react';
import { Menu, Bell, Search, User, ChevronDown } from 'lucide-react';
import { useAuth } from '../../hooks';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  currentPath: string;
  isScrolled?: boolean;
}

const getPageTitle = (path: string): string => {
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/pedidos': 'Pedidos',
    '/historico': 'Histórico',
    '/cardapio': 'Cardápio',
    '/configuracoes': 'Configurações',
  };
  return titles[path] || 'NetFood';
};

export function MobileHeader({ onMenuToggle, currentPath, isScrolled = false }: MobileHeaderProps) {
  const { user, loja } = useAuth();
  const pageTitle = getPageTitle(currentPath);

  return (
    <header className={`sticky top-0 z-40 bg-white border-b transition-all duration-200 ${
      isScrolled ? 'border-gray-200 shadow-md' : 'border-gray-100'
    }`}>
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center flex-shrink-0">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="font-semibold text-gray-900 text-base truncate">{pageTitle}</h1>
              {loja && (
                <div className="flex items-center gap-1">
                  <p className="text-xs text-gray-500 truncate">{loja.nome}</p>
                  <ChevronDown className="w-3 h-3 text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-1">
          <button
            className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation relative"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          </button>
          
          <button
            className="p-2 rounded-xl hover:bg-gray-100 active:bg-gray-200 transition-colors touch-manipulation"
            aria-label="Perfil"
          >
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
} 