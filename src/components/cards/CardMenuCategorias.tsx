import React from 'react';
import { Tag, Package, Coffee, Pizza, Cake, Wine, Utensils, Plus } from 'lucide-react';
import { DragIcon } from '../ui';
import { MenuAcoesCategoria } from '../menus/MenuAcoesCategoria';
import { Categoria } from '../../types/categoria';
import { DndContext, DragEndEvent, closestCenter, MeasuringStrategy } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FormSwitch } from '../forms/FormSwitch';

interface CardMenuCategoriasProps {
  categorias: string[];
  categoriaSelecionada?: string;
  onCategoriaClick: (categoria: string) => void;
  onNovaCategoria?: () => void;
  categoriasCompletas?: Categoria[];
  onEditCategoria?: (categoria: Categoria) => void;
  onDuplicateCategoria?: (categoria: Categoria) => void;
  onDeleteCategoria?: (categoria: Categoria) => void;
  onReorderCategorias?: (categorias: string[]) => void;
  onToggleStatus?: (categoria: Categoria) => void; // ✅ NOVA FUNCIONALIDADE: Toggle de status
}

// Mapeamento de ícones para categorias comuns
const getIconeCategoria = (categoria: string) => {
  const categoriaLower = categoria.toLowerCase();
  
  if (categoriaLower.includes('bebida') || categoriaLower.includes('drink')) {
    return Coffee;
  }
  if (categoriaLower.includes('pizza') || categoriaLower.includes('burguer') || categoriaLower.includes('hamburguer') || categoriaLower.includes('lanche')) {
    return Pizza;
  }
  if (categoriaLower.includes('sobremesa') || categoriaLower.includes('doce') || categoriaLower.includes('bolo')) {
    return Cake;
  }
  if (categoriaLower.includes('vinho') || categoriaLower.includes('cerveja') || categoriaLower.includes('alcool')) {
    return Wine;
  }
  if (categoriaLower.includes('prato') || categoriaLower.includes('comida') || categoriaLower.includes('refeicao')) {
    return Utensils;
  }
  
  return Package; // Ícone padrão
};

// Estilo neutro uniforme para todas as categorias
const getCoresCategoria = (categoria: string, isSelected: boolean) => {
  if (isSelected) {
    return {
      bg: 'bg-red-50',
      border: 'border-red-300',
      icon: 'text-red-600',
      text: 'text-red-700',
      hover: 'hover:bg-red-100'
    };
  }
  
  return {
    bg: 'bg-gray-50',
    border: 'border-gray-200', 
    icon: 'text-gray-600',
    text: 'text-gray-700',
    hover: 'hover:bg-gray-100'
  };
};

// ✅ CORREÇÃO: Componente SortableItem memoizado para evitar re-renders desnecessários
const SortableItem = React.memo(function SortableItem({ 
  categoria, 
  categoriaCompleta, 
  categoriaSelecionada, 
  onCategoriaClick, 
  onEditCategoria, 
  onDuplicateCategoria, 
  onDeleteCategoria,
  onToggleStatus
}: {
  categoria: string;
  categoriaCompleta?: Categoria;
  categoriaSelecionada?: string;
  onCategoriaClick: (categoria: string) => void;
  onEditCategoria?: (categoria: Categoria) => void;
  onDuplicateCategoria?: (categoria: Categoria) => void;
  onDeleteCategoria?: (categoria: Categoria) => void;
  onToggleStatus?: (categoria: Categoria) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: categoria });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: isDragging ? 'none' : transition,
    zIndex: isDragging ? 9999 : 'auto',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`sortable-categoria ${isDragging ? 'dragging' : ''}`}
    >
      <div className={`flex-shrink-0 lg:w-full w-auto flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 relative hover:bg-gray-50 ${
        categoriaCompleta?.status === 'inativo' 
          ? 'bg-gray-50 opacity-75' 
          : ''
      }`} style={{ borderColor: '#cfd1d3' }}>
        {/* Ícone de arrasto */}
        <div 
          {...attributes} 
          {...listeners}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors cursor-grab active:cursor-grabbing"
        >
          <DragIcon size={24} color="#9ca3af" />
        </div>
        
        {/* Conteúdo clicável da categoria */}
        <button
          onClick={() => onCategoriaClick(categoria)}
          className="flex-1 flex items-center text-left min-w-0"
        >
          <div className="flex-1 min-w-0">
            <span className={`text-sm font-medium block truncate whitespace-nowrap lg:whitespace-normal ${
              categoriaSelecionada === categoria 
                ? 'text-purple-600' 
                : categoriaCompleta?.status === 'inativo' 
                  ? 'text-gray-500' 
                  : 'text-gray-900'
            }`}>
              {categoria}
            </span>
          </div>
        </button>

        {/* ✅ Toggle de Status da Categoria - Isolado do Drag */}
        {onToggleStatus && categoriaCompleta && (
          <div 
            className="flex items-center gap-2 flex-shrink-0 mr-2"
            onMouseDown={(e) => e.stopPropagation()} // ✅ CRÍTICO: Bloquear drag no toggle
            onTouchStart={(e) => e.stopPropagation()} // ✅ CRÍTICO: Bloquear drag no mobile
          >
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault(); // Evitar comportamento padrão
                e.stopPropagation(); // Evitar propagação para elementos pais
                onToggleStatus(categoriaCompleta);
              }}
              onMouseDown={(e) => {
                e.preventDefault(); // ✅ CRÍTICO: Evitar que o mouseDown inicie o drag
                e.stopPropagation();
              }}
              onTouchStart={(e) => {
                e.preventDefault(); // ✅ CRÍTICO: Evitar que o touch inicie o drag
                e.stopPropagation();
              }}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 flex-shrink-0
                ${categoriaCompleta.status === 'ativo'
                  ? 'bg-purple-600 hover:bg-purple-700' 
                  : 'bg-gray-300 hover:bg-gray-400'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2
                cursor-pointer z-10
              `}
              title={categoriaCompleta.status === 'ativo' ? 'Clique para desativar categoria' : 'Clique para ativar categoria'}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 shadow-lg
                  ${categoriaCompleta.status === 'ativo' ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
            <span className="text-xs text-gray-600 font-medium w-12 text-center">
              {categoriaCompleta.status === 'ativo' ? 'Ativo' : 'Inativo'}
            </span>
          </div>
        )}

        {/* Menu de ações */}
        {onEditCategoria && onDuplicateCategoria && onDeleteCategoria && (
          <div className="flex-shrink-0">
            <MenuAcoesCategoria
              categoria={categoriaCompleta || {
                id: categoria,
                nome: categoria,
                status: 'ativo',
                agendamentoPrevio: false,
                tempoExtraProducao: false,
                disponibilidade: [],
                dataCriacao: new Date(),
                dataAtualizacao: new Date(),
                lojaId: 'desenvolvimento'
              }}
              onEdit={onEditCategoria}
              onDuplicate={onDuplicateCategoria}
              onDelete={onDeleteCategoria}
            />
          </div>
        )}
      </div>
    </div>
  );
});

export function CardMenuCategorias({ 
  categorias, 
  categoriaSelecionada, 
  onCategoriaClick, 
  onNovaCategoria,
  categoriasCompletas,
  onEditCategoria,
  onDuplicateCategoria,
  onDeleteCategoria,
  onReorderCategorias,
  onToggleStatus
}: CardMenuCategoriasProps) {
  // Sempre mostrar o card, mesmo sem categorias (para permitir criar)
  const temCategorias = categorias && categorias.length > 0;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && onReorderCategorias && over) {
      const oldIndex = categorias.indexOf(active.id as string);
      const newIndex = categorias.indexOf(over.id as string);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newCategorias = [...categorias];
        const [removed] = newCategorias.splice(oldIndex, 1);
        newCategorias.splice(newIndex, 0, removed);
        
        onReorderCategorias(newCategorias);
      }
    }
  };

  return (
    <div className="bg-white border rounded-lg p-4" style={{ borderColor: 'rgb(207 209 211)' }}>
      <div className="bg-white border rounded-lg p-4 mb-4" style={{ borderColor: 'rgb(207 209 211)' }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">Categorias</h3>
          </div>
          {onNovaCategoria && (
            <button
              onClick={onNovaCategoria}
              className="inline-flex items-center gap-1.5 px-3 h-9 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors duration-200"
            >
              <Plus className="w-3.5 h-3.5" />
              Nova categoria
            </button>
          )}
        </div>
      </div>
      
      {/* Conteúdo do card */}
      {!temCategorias ? (
        /* Estado vazio */
        <div className="text-center py-6">
          <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-3">
            Nenhuma categoria encontrada
          </p>
          <p className="text-xs text-gray-400">
            Crie sua primeira categoria para organizar os produtos
          </p>
        </div>
      ) : (
        /* Lista de categorias com Drag and Drop */
        <DndContext 
          onDragEnd={handleDragEnd}
          collisionDetection={closestCenter}
          measuring={{
            droppable: {
              strategy: MeasuringStrategy.Always
            }
          }}
          modifiers={[]}
        >
          <div className="space-y-3 lg:space-y-3 flex flex-row lg:flex-col gap-3 lg:gap-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
            <SortableContext
              items={categorias}
              strategy={verticalListSortingStrategy}
            >
              {categorias.map((categoria, index) => {
                const categoriaCompleta = categoriasCompletas?.find(c => c.nome === categoria);
                
                return (
                  <SortableItem
                    key={`categoria-${categoria}-${index}`} // ✅ CORREÇÃO: Key mais estável
                    categoria={categoria}
                    categoriaCompleta={categoriaCompleta}
                    categoriaSelecionada={categoriaSelecionada}
                    onCategoriaClick={onCategoriaClick}
                    onEditCategoria={onEditCategoria}
                    onDuplicateCategoria={onDuplicateCategoria}
                    onDeleteCategoria={onDeleteCategoria}
                    onToggleStatus={onToggleStatus}
                  />
                );
              })}
            </SortableContext>
          </div>
        </DndContext>
      )}
    </div>
  );
}
