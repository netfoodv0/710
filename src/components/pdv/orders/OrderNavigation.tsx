import React, { useState } from 'react';
import { ShoppingBag, User, ChevronRight } from 'lucide-react';

type TabType = 'sacola' | 'cliente';

interface OrderNavigationProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const OrderNavigation: React.FC<OrderNavigationProps> = ({
  activeTab,
  onTabChange
}) => {
  return (
    <div className="bg-white border-b border-gray-200">
      <div className="flex">
        {/* Tab Sacola */}
        <button
          onClick={() => onTabChange('sacola')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'sacola'
              ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <ShoppingBag size={18} />
          <span>Sacola</span>
        </button>

        {/* Tab Cliente */}
        <button
          onClick={() => onTabChange('cliente')}
          className={`flex-1 flex items-center justify-center space-x-2 px-4 py-3 text-sm font-medium transition-colors ${
            activeTab === 'cliente'
              ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          <User size={18} />
          <span>Cliente</span>
        </button>
      </div>
    </div>
  );
};

