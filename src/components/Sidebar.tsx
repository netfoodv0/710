import React, { memo, useState, useEffect } from 'react';
import './Sidebar.css';
import { 
  Store,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { SettingsIcon, ClockIcon, ReportIcon, CouponIcon, HistoryIcon, OrderIcon, DashboardIcon, MenuIcon, SupportIcon, MapIcon, UsersIcon, BagIcon } from './ui';
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
    path: '/mapa',
    label: 'Mapa',
    icon: MapIcon
  },
];

export const Sidebar = memo(({}: SidebarProps) => {
  const location = useLocation();
  const { logout } = useAuth();
  const { navigateTo } = useOptimizedNavigation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Expandir automaticamente os subtítulos quando estiver em uma página de relatório
  useEffect(() => {
    if (location.pathname.startsWith('/relatorios')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/relatorios');
        return newSet;
      });
    }
  }, [location.pathname]);

  const handleNavigation = (path: string) => {
    navigateTo(path);
  };

  const toggleSubItems = (itemPath: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  };

  const isExpanded = (itemPath: string) => expandedItems.has(itemPath);

  return (
    <aside className="sidebar-container expanded bg-white border-r border-slate-200 flex flex-col h-screen w-[243px] flex-shrink-0">
      {/* Header */}
             <div className="sidebar-header expanded p-5 border-b border-slate-100">
        <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold italic text-slate-900">VAULT</h1>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-content flex-1 overflow-y-auto">
        
        <ul className="space-y-0">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path || 
                           (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path));
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const itemExpanded = isExpanded(item.path);
            
            return (
              <li key={item.path}>
                <div className="sidebar-item-container">
                  <button
                    onClick={() => {
                      if (hasSubItems) {
                        toggleSubItems(item.path);
                      } else {
                        handleNavigation(item.path);
                      }
                    }}
                    className={`sidebar-menu-item ${hasSubItems ? 'has-dropdown' : ''} flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                      isActive
                        ? 'text-[#8217d5] sidebar-item-active'
                        : 'text-[#525866] hover:text-[#525866] hover:bg-slate-50 sidebar-item-inactive'
                    }`}
                  >
                    <Icon className="w-6 h-6 flex-shrink-0" color={isActive ? "#8217d5" : "#525866"} />
                    <span className="sidebar-text expanded">{item.label}</span>
                    {hasSubItems && (
                      <ChevronDown className={`w-4 h-4 ml-auto transition-transform duration-200 ${itemExpanded ? 'rotate-180' : ''}`} color={isActive ? "#8217d5" : "#525866"} />
                    )}
                  </button>
                </div>
                
                {/* Sublinks */}
                {hasSubItems && itemExpanded && (
                  <ul className="sidebar-submenu expanded space-y-0">
                    {item.subItems.map((subItem) => {
                      const isSubActive = location.pathname === subItem.path;
                      
                      return (
                        <li key={subItem.path}>
                          <button
                            onClick={() => handleNavigation(subItem.path)}
                            className={`sidebar-menu-item w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                              isSubActive
                                ? 'text-[#8217d5] sidebar-item-active'
                                : 'text-[#525866] hover:text-[#525866] hover:bg-slate-50 sidebar-item-inactive'
                            }`}
                          >
                            <div className="w-6 h-6 flex-shrink-0"></div>
                            <span className="sidebar-text expanded">{subItem.label}</span>
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
      <div className="sidebar-footer expanded p-3 border-t border-slate-100">
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
    </aside>
  );
});