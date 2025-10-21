import React from 'react';
import { Plus } from 'lucide-react';
import { ActionButton } from '../ui';

// ===== TIPOS =====
interface ListaComplementosHeaderProps {
  onCreate: () => void;
  categoriaSelecionada?: string;
  categorias?: string[];
  onShowCategoryToast?: () => void;
}

// ===== COMPONENTE =====
export function ListaComplementosHeader({ 
  onCreate, 
  categoriaSelecionada, 
  categorias = [], 
  onShowCategoryToast 
}: ListaComplementosHeaderProps) {
  // ===== LÓGICA =====
  const titulo = categoriaSelecionada && categoriaSelecionada !== 'todos' 
    ? categoriaSelecionada 
    : 'Complementos';

  const handleCreateComplemento = () => {
    // Remover verificação de categorias temporariamente para permitir criação
    // if (categorias.length === 0) {
    //   if (onShowCategoryToast) {
    //     onShowCategoryToast();
    //   }
    //   return;
    // }
    
    // Usar o callback onCreate
    onCreate();
  };
  
  // ===== RENDERIZAÇÃO =====
  return (
    <div className="bg-white rounded-lg border p-4" style={{ height: '73px', borderColor: 'rgb(207 209 211)' }}>
      <div className="flex items-center justify-between h-full">
        {/* Título à esquerda */}
        <h2 className="text-lg font-semibold text-gray-900">{titulo}</h2>
        
        {/* Botão à direita */}
        <ActionButton
          label="Novo Complemento"
          onClick={handleCreateComplemento}
          variant="primary"
          size="md"
          icon={<Plus size={16} />}
        />
      </div>
    </div>
  );
}




