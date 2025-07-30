import React from 'react';
import { Categoria, CategoriaAdicional } from '../../../types';
import { useListaCategorias } from '../../hooks/useListaCategorias';
import { ListaCategoriasHeader } from './HeaderListaCategorias';
import { ListaCategoriasStats } from './EstatisticasListaCategorias';
import { ListaCategoriasEmpty } from './ListaCategoriasVazia';
import { ListaCategoriasTable } from './TabelaCategorias';
import { ModalCategoria } from '../modals/ModalCriarEditarCategoria';

interface ListaCategoriasProps {
  categorias: (Categoria | CategoriaAdicional)[];
  loading: boolean;
  onCreate: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'> | Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit: (id: string, categoria: Partial<Categoria> | Partial<CategoriaAdicional>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: Categoria['status'] | CategoriaAdicional['status']) => Promise<void>;
  onUpdateDisponibilidade: (id: string, disponibilidade: Categoria['disponibilidade'] | CategoriaAdicional['disponibilidade']) => Promise<void>;
  title: string;
  tipo: 'produtos' | 'adicionais';
}

export const ListaCategorias: React.FC<ListaCategoriasProps> = ({
  categorias,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
  onUpdateStatus,
  onUpdateDisponibilidade,
  title,
  tipo
}) => {
  const {
    modalOpen,
    categoriaSelecionada,
    handleCreate,
    handleEdit,
    handleCloseModal,
    handleDelete,
    handleDuplicate,
    handleToggleStatus
  } = useListaCategorias({ onDelete, onDuplicate, onUpdateStatus });

  return (
    <div className="space-y-4">
              <ListaCategoriasHeader title={title} onCreate={handleCreate} />
      
              <ListaCategoriasStats categorias={categorias} />

      <div className="bg-white rounded border relative">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2 text-xs">Carregando categorias...</p>
          </div>
        ) : categorias.length === 0 ? (
          <ListaCategoriasEmpty onCreate={handleCreate} />
        ) : (
          <ListaCategoriasTable
            categorias={categorias}
            tipo={tipo}
            onEdit={handleEdit}
            onDuplicate={handleDuplicate}
            onToggleStatus={handleToggleStatus}
            onDelete={handleDelete}
          />
        )}
      </div>

      <ModalCategoria
        isOpen={modalOpen}
        onClose={handleCloseModal}
        categoria={categoriaSelecionada}
        onSave={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onUpdateStatus={onUpdateStatus}
        onUpdateDisponibilidade={onUpdateDisponibilidade}
        loading={loading}
        tipo={tipo}
      />
    </div>
  );
}; 