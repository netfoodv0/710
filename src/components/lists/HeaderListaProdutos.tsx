import React from 'react';
import { Plus } from 'lucide-react';

interface ListaProdutosHeaderProps {
  onCreate: () => void;
  categoriaSelecionada?: string;
  categorias?: string[];
  onShowCategoryToast?: () => void;
}

export function ListaProdutosHeader({ onCreate, categoriaSelecionada, categorias = [], onShowCategoryToast }: ListaProdutosHeaderProps) {
  // Título dinâmico baseado na categoria selecionada
  const titulo = categoriaSelecionada && categoriaSelecionada !== 'todos' 
    ? categoriaSelecionada 
    : 'Produtos';

  const handleCreateProduct = () => {
    // Verificar se há categorias disponíveis
    if (categorias.length === 0) {
      if (onShowCategoryToast) {
        onShowCategoryToast();
      }
      return;
    }
    
    // Usar o callback onCreate em vez de navegação
    onCreate();
  };
  
  return (
    <div className="bg-white rounded-lg border p-4" style={{ height: '73px', borderColor: 'rgb(207 209 211)' }}>
      <div className="flex items-center justify-between h-full">
        {/* Título à esquerda */}
        <h2 className="text-lg font-semibold text-gray-900">{titulo}</h2>
        
        {/* Botão à direita */}
        <button
          onClick={handleCreateProduct}
          className="inline-flex items-center px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors"
        >
          <Plus size={16} className="mr-2" />
          Novo Produto
        </button>
      </div>
    </div>
  );
}