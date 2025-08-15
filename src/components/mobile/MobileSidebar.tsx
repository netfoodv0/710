import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  X,
  Home, 
  ShoppingBag, 
  History,
  BookOpen, 
  Settings,
  Store,
  LogOut,
  User,
  BarChart3,
  Ticket,
  Map
} from 'lucide-react';
import { useAuth } from '../../hooks';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
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
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>
            
            {/* User Info */}
            {user && (
              <div className="bg-gray-50 rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{user.nome}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
                {loja && (
                  <div className="mt-2 pt-2 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Loja:</span> {loja.nome}
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
                const isActive = location.pathname === item.path;
                
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      onClick={handleItemClick}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-all duration-200 ${
                        isActive 
                          ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
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
                <span className="text-sm font-medium text-green-700">Sistema Online</span>
              </div>
              <p className="text-xs text-green-600">Última sincronização: agora</p>
            </div>
            
            <button
              onClick={logout}
              className="flex items-center gap-3 w-full px-3 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}