import React from 'react';
import { Menu, Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../hooks';

interface MobileHeaderProps {
  onMenuToggle: () => void;
  currentPath: string;
}

const getPageTitle = (path: string): string => {
  const titles: Record<string, string> = {
    '/': 'Dashboard',
    '/pedidos': 'Pedidos',
    '/historico': 'Histórico',
    '/cardapio': 'Cardápio',
    '/avaliacoes': 'Avaliações',
    '/promocoes': 'Promoções',
    '/relatorios': 'Relatórios',
    '/configuracoes': 'Configurações',
  };
  return titles[path] || 'NetFood';
};

export function MobileHeader({ onMenuToggle, currentPath }: MobileHeaderProps) {
  const { user, loja } = useAuth();
  const pageTitle = getPageTitle(currentPath);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 shadow-sm">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left Section */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Abrir menu"
          >
            <Menu className="w-5 h-5 text-gray-700" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white text-sm font-bold">N</span>
            </div>
            <div>
              <h1 className="font-semibold text-gray-900 text-base">{pageTitle}</h1>
              {loja && (
                <p className="text-xs text-gray-500">{loja.nome}</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Buscar"
          >
            <Search className="w-5 h-5 text-gray-700" />
          </button>
          
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            aria-label="Notificações"
          >
            <Bell className="w-5 h-5 text-gray-700" />
            <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>
          
          <button
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            aria-label="Perfil"
          >
            <User className="w-5 h-5 text-gray-700" />
          </button>
        </div>
      </div>
    </header>
  );
} 