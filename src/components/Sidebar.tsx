import React, { memo } from 'react';
import './Sidebar.css';
import { 
  ChevronLeft,
  ChevronRight,
  Store
} from 'lucide-react';
import { SettingsIcon, ClockIcon, ReportIcon, CouponIcon, HistoryIcon, OrderIcon, DashboardIcon, MenuIcon, SupportIcon, MapIcon, TableIcon, TestIcon, UsersIcon, BagIcon } from './ui';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useOptimizedNavigation } from '@/hooks/useOptimizedNavigation';

interface MenuItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string; color?: string }>;
  subItems?: MenuItem[];
}

interface SidebarProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
}

const menuItems = [
  {
    path: '/',
    label: 'Dashboard',
    icon: DashboardIcon
  },
  {
    path: '/pedidos',
    label: 'Pedidos',
    icon: OrderIcon
  },
  {
    path: '/historico',
    label: 'Histórico',
    icon: HistoryIcon
  },
  {
    path: '/cardapio',
    label: 'Cardápio',
    icon: MenuIcon
  },
  {
    path: '/cupons',
    label: 'Cupons',
    icon: CouponIcon
  },
  {
    path: '/atendimento',
    label: 'Atendimento',
    icon: SupportIcon
  },
  {
    path: '/configuracoes',
    label: 'Configurações',
    icon: SettingsIcon
  },
  {
    path: '/horarios',
    label: 'Horários',
    icon: ClockIcon
  },
  {
    path: '/mapa',
    label: 'Mapa',
    icon: MapIcon
  },
  {
    path: '/relatorios',
    label: 'Relatórios',
    icon: ReportIcon,
    subItems: [
      {
        path: '/relatorios',
        label: 'Geral',
        icon: ReportIcon
      },
      {
        path: '/relatorios/clientes',
        label: 'Clientes',
        icon: UsersIcon
      },
      {
        path: '/relatorios/produtos',
        label: 'Produtos',
        icon: BagIcon
      }
    ]
  },
  {
    path: '/tabelas',
    label: 'Tabelas',
    icon: TableIcon
  },
  {
    path: '/teste',
    label: 'Teste',
    icon: TestIcon
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
                <ChevronRight className="w-3.5 h-3.5 text-[#747e91]" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5 text-[#747e91]" />
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
            const isActive = location.pathname === item.path || 
                           (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path));
            const hasSubItems = item.subItems && item.subItems.length > 0;
            
            return (
              <li key={item.path}>
                <button
                  onClick={() => handleNavigation(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-[#8217d5] sidebar-item-active'
                      : 'text-[#525866] hover:text-[#525866] hover:bg-slate-50 sidebar-item-inactive'
                  }`}
                >
                  <Icon className="w-6 h-6 flex-shrink-0" color={isActive ? "#8217d5" : "#525866"} />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
                
                {/* Sublinks */}
                {!isCollapsed && hasSubItems && isActive && (
                  <ul className="ml-6 space-y-0">
                    {item.subItems.map((subItem) => {
                      const SubIcon = subItem.icon;
                      const isSubActive = location.pathname === subItem.path;
                      
                      return (
                        <li key={subItem.path}>
                          <button
                            onClick={() => handleNavigation(subItem.path)}
                            className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors ${
                              isSubActive
                                ? 'text-[#8217d5] bg-purple-50 border-l-2 border-[#8217d5]'
                                : 'text-[#525866] hover:text-[#525866] hover:bg-slate-50'
                            }`}
                          >
                            <SubIcon className="w-4 h-4 flex-shrink-0" color={isSubActive ? "#8217d5" : "#525866"} />
                            <span>{subItem.label}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}
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
              <span className="text-xs font-medium text-[#525866]">Sistema Online</span>
            </div>
                          <p className="text-xs text-[#525866] mb-3">Última sincronização: agora</p>
            <button
              onClick={logout}
              className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-200 px-3 py-2 text-sm font-medium text-[#525866] hover:bg-slate-100 transition-colors"
            >
              <LogOut className="w-6 h-6 text-[#525866]" />
              Sair
            </button>
          </div>
        </div>
      )}
    </aside>
  );
});