import React from 'react';
import { Plus } from 'lucide-react';
import { ActionButton } from '../ui';
import { ListaComplementosHeader } from './HeaderListaComplementos';
import { ComplementoCard } from './ComplementoCard';
import { DndContext, DragEndEvent, closestCenter, MeasuringStrategy } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

interface ComplementosListProps {
  complementos?: any[];
  categorias?: any[];
  onCreate?: () => void;
  onEdit?: (complemento: any) => void;
  onDelete?: (id: string) => void;
  onDuplicate?: (id: string) => void;
  onToggleStatus?: (id: string) => void;
  categoriaSelecionada?: string;
  onShowCategoryToast?: () => void;
  onReorderComplementos?: () => void;
}

export function ComplementosList({ 
  complementos = [], 
  categorias = [],
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus,
  categoriaSelecionada,
  onShowCategoryToast,
  onReorderComplementos
}: ComplementosListProps) {
  // Filtrar complementos pela categoria selecionada
  const complementosFiltrados = React.useMemo(() => {
    if (!categoriaSelecionada || categoriaSelecionada === 'todos') {
      return complementos;
    }
    return complementos.filter(complemento => complemento.categoria === categoriaSelecionada);
  }, [complementos, categoriaSelecionada]);

  // Estado local para controlar a ordem dos complementos
  const [complementosOrdenados, setComplementosOrdenados] = React.useState<any[]>(complementosFiltrados);

  // Atualizar complementos ordenados quando complementos filtrados mudarem
  React.useEffect(() => {
    setComplementosOrdenados(complementosFiltrados);
  }, [complementosFiltrados]);

  // Usar diretamente a função onCreate passada como prop
  const handleCreate = () => {
    onCreate?.();
  };

  // Componente SortableItem para cada complemento
  function SortableComplemento({ complemento }: { complemento: any }) {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ 
      id: complemento.id,
    });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: isDragging ? 'none' : transition,
      zIndex: isDragging ? 9999 : 'auto',
    };

    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`sortable-complemento ${isDragging ? 'dragging' : ''}`}
      >
        {/* ComplementoCard com ícone de arrastar integrado */}
        <ComplementoCard
          nome={complemento.nome}
          preco={complemento.preco}
          categoria={complemento.categoria}
          status={complemento.status}
          tipo={complemento.tipo}
          descricao={complemento.descricao}
          onToggleStatus={(status) => onToggleStatus?.(complemento.id)}
          onEditar={() => onEdit?.(complemento)}
          onExcluir={() => onDelete?.(complemento.id)}
          onDuplicar={() => onDuplicate?.(complemento.id)}
          dragHandleProps={{ attributes, listeners }}
        />
      </div>
    );
  }

  // Handler para o fim do drag
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = complementosOrdenados.findIndex(complemento => complemento.id === active.id);
      const newIndex = complementosOrdenados.findIndex(complemento => complemento.id === over?.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newComplementos = [...complementosOrdenados];
        const [removed] = newComplementos.splice(oldIndex, 1);
        newComplementos.splice(newIndex, 0, removed);
        
        setComplementosOrdenados(newComplementos);
        
        // TODO: Implementar função para salvar nova ordem no backend
        // onReorderComplementos?.(newComplementos);
      }
    }
  };

  // Se não há complementos, mostrar mensagem
  if (complementosOrdenados.length === 0) {
    return (
      <div className="space-y-4">
        <ListaComplementosHeader 
          onCreate={handleCreate} 
          categoriaSelecionada={categoriaSelecionada}
          categorias={categorias}
          onShowCategoryToast={onShowCategoryToast}
        />
        
        <div className="text-center py-12">
          <div className="text-gray-500">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">Nenhum complemento encontrado</h3>
            <p className="mt-1 text-sm text-gray-500">
              {categoriaSelecionada 
                ? `Nenhum complemento na categoria "${categoriaSelecionada}"`
                : 'Comece criando seu primeiro complemento.'
              }
            </p>
            <div className="mt-6">
              <button
                onClick={handleCreate}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Criar Complemento
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ListaComplementosHeader 
        onCreate={handleCreate} 
        categoriaSelecionada={categoriaSelecionada}
        categorias={categorias}
        onShowCategoryToast={onShowCategoryToast}
      />

      {/* Complementos com DnD em lista vertical */}
      {complementosOrdenados.length > 0 && (
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
          <SortableContext
            items={complementosOrdenados.map(complemento => complemento.id)}
            strategy={verticalListSortingStrategy}
            modifiers={[]}
          >
            <div className="grid grid-cols-1 gap-4">
              {complementosOrdenados.map((complemento) => (
                <SortableComplemento key={complemento.id} complemento={complemento} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
}
