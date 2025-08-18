import React from 'react';
import '../Sidebar.css';
import { Link, useLocation } from 'react-router-dom';
import { 
  X,
  Store,
  LogOut,
  User
} from 'lucide-react';
import { SettingsIcon, ClockIcon, ReportIcon, CouponIcon, HistoryIcon, OrderIcon, DashboardIcon, MenuIcon, SupportIcon, MapIcon, TableIcon, TestIcon, UsersIcon, BagIcon } from '../ui';
import { useAuth } from '../../hooks';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
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
        icon: ReportIcon
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
  }
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const { user, loja, logout } = useAuth();

  const handleItemClick = () => {
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold italic text-gray-900">VAULT</h1>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <X className="w-5 h-5 text-[#525866]" />
              </button>
            </div>
            
            {/* User Info */}
            {user && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-[#525866]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-[#525866]">{user.nome}</p>
                    <p className="text-sm text-[#525866]">{user.email}</p>
                  </div>
                </div>
                {loja && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-sm text-[#525866]">
                      <span className="font-medium">Loja:</span> {loja.nomeLoja}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto p-4">
            
            <ul className="space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path || 
                               (item.subItems && item.subItems.some(subItem => location.pathname === subItem.path));
                const hasSubItems = item.subItems && item.subItems.length > 0;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={handleItemClick}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'text-[#8217d5] sidebar-item-active' 
                          : 'text-[#525866] hover:bg-gray-50 sidebar-item-inactive'
                      }`}
                    >
                      <Icon className="w-6 h-6" color={isActive ? "#8217d5" : "#525866"} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                    
                    {/* Sublinks */}
                    {hasSubItems && (
                      <ul className="ml-6 mt-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const SubIcon = subItem.icon;
                          const isSubActive = location.pathname === subItem.path;
                          
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                onClick={handleItemClick}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all duration-200 ${
                                  isSubActive 
                                    ? 'text-[#8217d5] bg-purple-50 border-l-2 border-[#8217d5]' 
                                    : 'text-[#525866] hover:bg-gray-50'
                                }`}
                              >
                                <SubIcon className="w-4 h-4" color={isSubActive ? "#8217d5" : "#525866"} />
                                <span className="text-sm font-medium">{subItem.label}</span>
                              </Link>
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
          <div className="p-4 border-t border-gray-200">
            <div className="bg-green-50 rounded-lg p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#525866]">Sistema Online</span>
              </div>
              <p className="text-xs text-[#525866]">Última sincronização: agora</p>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-3 py-3 text-[#525866] hover:bg-red-50 rounded-lg transition-colors"
            >
                              <LogOut className="w-6 h-6 text-[#525866]" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}