import React from 'react';

interface ModalProdutoTabsProps {
  isEditing: boolean;
  activeTab: 'formulario' | 'preview' | 'score';
  onTabChange: (tab: 'formulario' | 'preview' | 'score') => void;
}

export function ModalProdutoTabs({ isEditing, activeTab, onTabChange }: ModalProdutoTabsProps) {
  if (!isEditing) return null;

  return (
    <div className="border-b border-gray-200">
      <nav className="-mb-px flex space-x-8 px-6">
        <button
          onClick={() => onTabChange('preview')}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'preview'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Preview
        </button>
        <button
          onClick={() => onTabChange('score')}
          className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
            activeTab === 'score'
              ? 'border-blue-500 text-blue-600'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          Score de Qualidade
        </button>
      </nav>
    </div>
  );
} 
