import React from 'react';
import { 
  Home, 
  ShoppingBag, 
  History,
  BookOpen, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Store
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

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
    path: '/configuracoes',
    label: 'Configurações',
    icon: Settings
  }
];

export function Sidebar({ isCollapsed = false, onToggle }: SidebarProps) {
  const location = useLocation();

  return (
    <aside className={`bg-white border-r border-slate-200 flex flex-col h-screen ${isCollapsed ? 'w-14' : 'w-[243px]'} transition-all duration-300 flex-shrink-0 shadow-sm`}>
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                <Store className="w-4.5 h-4.5 text-white" />
              </div>
              <div>
                <h1 className="font-semibold text-slate-900 text-base">NetFood</h1>
                <p className="text-xs text-slate-500">Gestão de Pedidos</p>
              </div>
            </div>
          )}
          
          {isCollapsed && (
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mx-auto shadow-lg">
              <Store className="w-4.5 h-4.5 text-white" />
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
        {!isCollapsed && (
          <div className="mb-5">
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mb-3">Menu Principal</p>
          </div>
        )}
        
        <ul className="space-y-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  {!isCollapsed && <span>{item.label}</span>}
                </Link>
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
            <p className="text-xs text-slate-500">Última sincronização: agora</p>
          </div>
        </div>
      )}
    </aside>
  );
}