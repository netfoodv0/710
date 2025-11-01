import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  X,
  Store,
  LogOut,
  User,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { SettingsIcon, ClockIcon, ReportIcon, CouponIcon, HistoryIcon, OrderIcon, DashboardIcon, MenuIcon, SupportIcon, MapIcon, UsersIcon, BagIcon, EstoqueIcon, ModalIcon, OrganogramaIcon } from '../ui';
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
    path: '/modal',
    label: 'Modal',
    icon: ModalIcon
  },
  {
    path: '/horarios',
    label: 'Horários',
    icon: ClockIcon
  },
  {
    path: '/configuracoes',
    label: 'Configurações',
    icon: SettingsIcon
  },
  {
    path: '/usuarios',
    label: 'Usuários',
    icon: UsersIcon,
    subItems: [
      {
        path: '/usuarios/operadores',
        label: 'Operadores',
        icon: UsersIcon
      },
      {
        path: '/usuarios/motoboys',
        label: 'Motoboys',
        icon: UsersIcon
      }
    ]
  },
  {
    path: '/organograma',
    label: 'Organograma',
    icon: OrganogramaIcon
  },
  {
    path: '/cupons',
    label: 'Cupons',
    icon: CouponIcon
  },
  {
    path: '/relatorios',
    label: 'Relatórios',
    icon: ReportIcon,
    subItems: [
      {
        path: '/relatorios/geral',
        label: 'Geral',
        icon: ReportIcon
      },{
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
  {
    path: '/estoque',
    label: 'Estoque',
    icon: EstoqueIcon,
    subItems: [
      {
        path: '/estoque/produtos',
        label: 'Produtos',
        icon: EstoqueIcon
      },
      {
        path: '/estoque/acompanhamentos',
        label: 'Acompanhamentos',
        icon: EstoqueIcon
      }
    ]
  }
];

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loja, logout } = useAuth();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  const handleLogoClick = () => {
    navigate('/landing');
    onClose();
  };

  // Expandir automaticamente os subtítulos quando estiver em uma página de relatório, estoque ou usuários
  useEffect(() => {
    if (location.pathname.startsWith('/relatorios')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/relatorios');
        return newSet;
      });
    }
    if (location.pathname.startsWith('/estoque')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/estoque');
        return newSet;
      });
    }
    if (location.pathname.startsWith('/usuarios')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/usuarios');
        return newSet;
      });
    }
  }, [location.pathname]);

  const handleItemClick = (item: any) => {
    if (item.subItems && item.subItems.length > 0) {
      // Se tem subitens, apenas expande/colapsa
      toggleSubItems(item.path);
    } else {
      // Se não tem subitens, fecha o sidebar e navega
      onClose();
    }
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

  const isItemActive = (item: any) => {
    if (item.subItems && item.subItems.length > 0) {
      // Para itens com subitens, NUNCA são considerados ativos
      // Apenas expandem/colapsam
      return false;
    } else {
      // Para itens sem subitens, verifica se a rota atual é igual
      return location.pathname === item.path;
    }
  };

  const isSubItemActive = (subItem: any) => {
    return location.pathname === subItem.path;
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
      <div className={`fixed top-0 left-0 h-full w-80 bg-white shadow-xl z-50 transform ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <h1 
                  onClick={handleLogoClick}
                  className="text-2xl font-bold italic text-gray-900 cursor-pointer hover:opacity-80"
                >
                  VOULT
                </h1>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100"
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
                const isActive = isItemActive(item);
                const hasSubItems = item.subItems && item.subItems.length > 0;
                const itemExpanded = isExpanded(item.path);
                
                return (
                  <li key={item.path}>
                    <div className="w-full">
                      <Link
                        to={hasSubItems ? '#' : item.path}
                        onClick={() => handleItemClick(item)}
                        className={`w-full flex items-center gap-3 px-3 py-3 rounded ${
                          isActive 
                            ? 'text-[#8217d5] bg-purple-50' 
                            : 'text-[#525866] hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-6 h-6" color={isActive ? "#8217d5" : "#525866"} />
                        <span>{item.label}</span>
                        {hasSubItems && (
                          <ChevronDown className={`w-4 h-4 ml-auto ${itemExpanded ? 'rotate-180' : ''}`} color={isActive ? "#8217d5" : "#525866"} />
                        )}
                      </Link>
                    </div>
                    
                    {/* Sublinks */}
                    {hasSubItems && itemExpanded && (
                      <ul className="mt-1 space-y-1">
                        {item.subItems.map((subItem) => {
                          const isSubActive = isSubItemActive(subItem);
                          
                          return (
                            <li key={subItem.path}>
                              <Link
                                to={subItem.path}
                                onClick={onClose}
                                className={`flex items-center gap-3 px-3 py-2 rounded ${
                                  isSubActive 
                                    ? 'text-[#8217d5] bg-purple-50' 
                                    : 'text-[#525866] hover:bg-gray-50'
                                }`}
                              >
                                <div className="w-6 h-6 flex-shrink-0"></div>
                                <span className="text-sm">{subItem.label}</span>
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
                <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-[#525866]">Sistema Online</span>
              </div>
              <p className="text-xs text-[#525866]">Última sincronização: agora</p>
            </div>
            
            <button
              onClick={logout}
                              className="flex items-center gap-3 w-full px-3 py-3 text-[#525866] hover:bg-red-50 rounded"
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
