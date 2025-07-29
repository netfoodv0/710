import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Home, 
  ShoppingBag, 
  History,
  BookOpen, 
  Settings
} from 'lucide-react';

interface MobileBottomNavProps {
  currentPath: string;
}

const navItems = [
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
    label: 'Config',
    icon: Settings
  }
];

export function MobileBottomNav({ currentPath }: MobileBottomNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPath === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all duration-200 min-w-[60px] ${
                isActive 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-500'}`} />
              <span className={`text-xs font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-blue-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
} 