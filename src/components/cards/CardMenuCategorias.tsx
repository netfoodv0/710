import React, { useState } from 'react';
import { Tag, Package, Coffee, Pizza, Cake, Wine, Utensils, Plus } from 'lucide-react';
import { DragIcon, ActionButton } from '../ui';
import { MenuAcoesCategoria } from '../menus/MenuAcoesCategoria';
import { Categoria } from '../../types/global/categoria';
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
  
  // Props para complementos
  complementos?: any[]; // Array de complementos
  complementoSelecionado?: string;
  onComplementoClick?: (complemento: string) => void;
  onNovoComplemento?: () => void;
  complementosCompletos?: any[];
  onEditComplemento?: (complemento: any) => void;
  onDuplicateComplemento?: (complemento: any) => void;
  onDeleteComplemento?: (complemento: any) => void;
  onReorderComplementos?: (complementos: any[]) => void;
  onToggleStatusComplemento?: (complemento: any) => void;
  
  // Props para categorias de complementos
  categoriasComplementos?: string[]; // Array de nomes de categorias de complementos
  categoriaComplementoSelecionada?: string; // Categoria de complemento selecionada
  onCategoriaComplementoClick?: (categoria: string) => void; // Callback para clicar em categoria de complemento
  onNovaCategoriaComplemento?: () => void;
  categoriasComplementosCompletas?: any[]; // Array completo de categorias de complementos
  onEditCategoriaComplemento?: (categoria: any) => void;
  onDuplicateCategoriaComplemento?: (categoria: any) => void;
  onDeleteCategoriaComplemento?: (categoria: any) => void;
  onReorderCategoriasComplementos?: (categorias: string[]) => void;
  onToggleStatusCategoriaComplemento?: (categoria: any) => void;
  
  // Callback para mudança de aba
  onAbaChange?: (aba: 'produtos' | 'complementos') => void;
}

// Tipo para as abas da navbar
type TipoAba = 'produtos' | 'complementos';

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
             <div className={`flex-shrink-0 lg:w-full w-auto flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 relative hover:bg-gray-50 border-dashboard bg-white ${
         categoriaCompleta?.status === 'inativo' 
           ? 'bg-gray-50 opacity-75' 
           : ''
       }`}>
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
            <FormSwitch
              name={`status-${categoria}`}
              label=""
              checked={categoriaCompleta.status === 'ativo'}
              onChange={(checked) => {
                onToggleStatus(categoriaCompleta);
              }}
              className="mb-0"
            />
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

// Componente da Navbar com abas
const NavbarAbas = ({ 
  abaAtiva, 
  onMudarAba, 
  onAbaChange 
}: { 
  abaAtiva: TipoAba; 
  onMudarAba: (aba: TipoAba) => void;
  onAbaChange?: (aba: TipoAba) => void;
}) => {
  return (
    <div className="bg-white border rounded-lg p-1 mb-4 border-dashboard shadow-sm">
      <div className="flex bg-gray-100 rounded-md p-1">
        <button
          onClick={() => {
            onMudarAba('produtos');
            onAbaChange?.('produtos');
          }}
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            abaAtiva === 'produtos'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Produtos
        </button>
        <button
          onClick={() => {
            onMudarAba('complementos');
            onAbaChange?.('complementos');
          }}
          className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-md transition-all duration-200 ${
            abaAtiva === 'complementos'
              ? 'bg-white text-purple-600 shadow-sm'
              : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
          }`}
        >
          Complementos
        </button>
      </div>
    </div>
  );
};

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
  onToggleStatus,
  
  // Props para complementos
  complementos = [],
  complementoSelecionado,
  onComplementoClick,
  onNovoComplemento,
  complementosCompletos = [],
  onEditComplemento,
  onDuplicateComplemento,
  onDeleteComplemento,
  onReorderComplementos,
  onToggleStatusComplemento,
  
  // Props para categorias de complementos
  categoriasComplementos = [],
  categoriaComplementoSelecionada,
  onCategoriaComplementoClick,
  onNovaCategoriaComplemento,
  categoriasComplementosCompletas = [],
  onEditCategoriaComplemento,
  onDuplicateCategoriaComplemento,
  onDeleteCategoriaComplemento,
  onReorderCategoriasComplementos,
  onToggleStatusCategoriaComplemento,
  
  onAbaChange
}: CardMenuCategoriasProps) {
  // Estado para controlar qual aba está ativa
  const [abaAtiva, setAbaAtiva] = useState<TipoAba>('produtos');
  
  // Dados baseados na aba ativa
  const dadosAtivos = abaAtiva === 'produtos' ? {
    items: categorias,
    itemSelecionado: categoriaSelecionada,
    onItemClick: onCategoriaClick,
    onNovoItem: onNovaCategoria,
    itemsCompletos: categoriasCompletas,
    onEditItem: onEditCategoria,
    onDuplicateItem: onDuplicateCategoria,
    onDeleteItem: onDeleteCategoria,
    onReorderItems: onReorderCategorias,
    onToggleStatusItem: onToggleStatus,
    temItems: categorias && categorias.length > 0
  } : {
    items: categoriasComplementos || [], // Usar categorias de complementos em vez de complementos
    itemSelecionado: categoriaComplementoSelecionada, // Usar categoria de complemento selecionada
    onItemClick: onCategoriaComplementoClick, // Usar callback para categoria de complemento
    onNovoItem: onNovaCategoriaComplemento, // Usar callback para nova categoria de complemento
    itemsCompletos: categoriasComplementosCompletas, // Usar categorias completas de complementos
    onEditItem: onEditCategoriaComplemento, // Usar callback para editar categoria de complemento
    onDuplicateItem: onDuplicateCategoriaComplemento, // Usar callback para duplicar categoria de complemento
    onDeleteItem: onDeleteCategoriaComplemento, // Usar callback para excluir categoria de complemento
    onReorderItems: onReorderCategoriasComplementos, // Usar callback para reordenar categorias de complementos
    onToggleStatusItem: onToggleStatusCategoriaComplemento, // Usar callback para toggle status categoria de complemento
    temItems: categoriasComplementos && categoriasComplementos.length > 0 // Verificar se há categorias de complementos
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (active.id !== over?.id && dadosAtivos.onReorderItems && over) {
      const oldIndex = dadosAtivos.items.indexOf(active.id as string);
      const newIndex = dadosAtivos.items.indexOf(over.id as string);
      
      if (oldIndex !== -1 && newIndex !== -1) {
        const newItems = [...dadosAtivos.items];
        const [removed] = newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, removed);
        
        dadosAtivos.onReorderItems(newItems);
      }
    }
  };

  return (
    <div className={`bg-white/60 border-2 rounded-2xl p-4`} style={{ borderColor: 'white' }}>
      {/* Navbar com abas - NO TOPO */}
      <NavbarAbas 
        abaAtiva={abaAtiva} 
        onMudarAba={setAbaAtiva} 
        onAbaChange={onAbaChange}
      />
      
      <div className="bg-white border rounded-lg p-4 mb-4 border-dashboard">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {abaAtiva === 'produtos' ? 'Produtos' : 'Complementos'}
            </h3>
          </div>
          {dadosAtivos.onNovoItem && (
            <ActionButton
              label={`Nova ${abaAtiva === 'produtos' ? 'categoria' : 'complemento'}`}
              onClick={dadosAtivos.onNovoItem}
              variant="primary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
            />
          )}
        </div>
      </div>
      
      {/* Conteúdo do card */}
      {!dadosAtivos.temItems ? (
        /* Estado vazio */
        <div className="text-center py-6">
          <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
          <p className="text-sm text-gray-500 mb-3">
            {abaAtiva === 'produtos' 
              ? 'Nenhuma categoria de produtos encontrada'
              : 'Nenhuma categoria de complementos encontrada'
            }
          </p>
          <p className="text-xs text-gray-400">
            {abaAtiva === 'produtos'
              ? 'Crie sua primeira categoria para organizar os produtos'
              : 'Crie sua primeira categoria para organizar os complementos'
            }
          </p>
        </div>
      ) : (
        /* Conteúdo baseado na aba ativa */
        <div className="space-y-4">
          {/* Indicador da aba ativa */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className={`w-2 h-2 rounded-full ${abaAtiva === 'produtos' ? 'bg-blue-500' : 'bg-green-500'}`}></div>
            <span>
              {abaAtiva === 'produtos' 
                ? 'Gerenciando categorias de produtos' 
                : 'Gerenciando categorias de complementos'
              }
            </span>
          </div>

          {/* Lista de categorias com Drag and Drop */}
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
              items={dadosAtivos.items}
              strategy={verticalListSortingStrategy}
            >
              {dadosAtivos.items.map((item, index) => {
                const itemCompleto = dadosAtivos.itemsCompletos?.find(c => c.nome === item || c.id === item);
                
                return (
                  <SortableItem
                    key={`${abaAtiva}-${item}-${index}`} // ✅ CORREÇÃO: Key mais estável
                    categoria={item}
                    categoriaCompleta={itemCompleto}
                    categoriaSelecionada={dadosAtivos.itemSelecionado}
                    onCategoriaClick={dadosAtivos.onItemClick}
                    onEditCategoria={dadosAtivos.onEditItem}
                    onDuplicateCategoria={dadosAtivos.onDuplicateItem}
                    onDeleteCategoria={dadosAtivos.onDeleteItem}
                    onToggleStatus={dadosAtivos.onToggleStatusItem}
                  />
                );
              })}
            </SortableContext>
            </div>
          </DndContext>
        </div>
      )}
    </div>
  );
}
