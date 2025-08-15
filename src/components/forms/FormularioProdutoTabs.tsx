import React from 'react';
import { Image, Tag, Clock, Star, Package, Plus } from 'lucide-react';

type TabType = 'basico' | 'midia' | 'classificacoes' | 'disponibilidade' | 'descontos';

interface FormularioProdutoTabsProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

const tabs = [
  { id: 'basico' as const, label: 'Informações Básicas', icon: Package },
  { id: 'midia' as const, label: 'Mídia', icon: Image },
  { id: 'classificacoes' as const, label: 'Classificações', icon: Tag },
  { id: 'disponibilidade' as const, label: 'Disponibilidade', icon: Clock },
  { id: 'descontos' as const, label: 'Descontos', icon: Star }
];

export function FormularioProdutoTabs({ activeTab, onTabChange }: FormularioProdutoTabsProps) {
  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
} 