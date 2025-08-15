import React, { memo } from 'react';
import { 
  Home, 
  ShoppingBag, 
  History,
  BookOpen, 
  Tag,
  Settings,
  ChevronLeft,
  ChevronRight,
  Store,
  BarChart3,
  Map,
  MessageCircle
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOptimizedNavigation } from '@/hooks/useOptimizedNavigation';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: Home
  },
  {
    path: '/pedidos',
    label: 'Pedidos',
    icon: ShoppingBag
  },
  {
    path: '/historico',
    label: 'Histórico',
    icon: History
  },
  {
    path: '/cardapio',
    label: 'Cardápio',
    icon: BookOpen
  },
  {
    path: '/cupons',
    label: 'Cupons',
    icon: Tag
  },
  {
    path: '/atendimento',
    label: 'Atendimento',
    icon: MessageCircle
  },
  {
    path: '/configuracoes',
    label: 'Configurações',
    icon: Settings
  },
  {
    path: '/mapa',
    label: 'Mapa',
    icon: Map
  },
  {
    path: '/relatorios',
    label: 'Relatórios',
    icon: BarChart3
  }
];

export const Sidebar = memo(({ isCollapsed = false, onToggle }: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { navigateTo } = useOptimizedNavigation();

  const handleNavigation = (path: string) => {
    navigateTo(path);
  };

  return (
    <aside className={`bg-white border-r border-slate-200 flex flex-col h-screen ${isCollapsed ? 'w-14' : 'w-[243px]'} transition-all duration-300 flex-shrink-0 shadow-sm`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold italic text-slate-900">VAULT</h1>
            </div>
          )}
          
          {isCollapsed && (
            <div className="mx-auto">
              <h1 className="text-2xl font-bold italic text-slate-900">VAULT</h1>
            </div>
          )}
          
          {onToggle && (
            <button
              onClick={onToggle}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
            >
              {isCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        
        <ul className="space-y-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      {!isCollapsed && (
        <div className="p-3 border-t border-slate-100">
          <div className="bg-slate-50 rounded-xl p-3">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs font-medium text-slate-700">Sistema Online</span>
            </div>
            <p className="text-xs text-slate-500 mb-3">Última sincronização: agora</p>
            <button
              onClick={logout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Sair
            </button>
          </div>
        </div>
      )}
    </aside>
  );
});