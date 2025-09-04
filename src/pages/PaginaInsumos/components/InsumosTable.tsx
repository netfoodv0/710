import React from 'react';
import { DataTable } from '../../../components/ui';
import { InsumosTableProps } from '../types';

export function InsumosTable({
  insumos,
  columns,
  onOpenModal,
  onOpenModalDetalhes
}: InsumosTableProps) {
  return (
    <DataTable
      data={insumos}
      columns={columns}
      searchPlaceholder="Buscar insumos..."
      searchFields={['nome', 'categoria']}
      filters={{
        categories: [
          { value: 'Farinhas', label: 'Farinhas' },
          { value: 'Carnes', label: 'Carnes' },
          { value: 'Laticínios', label: 'Laticínios' },
          { value: 'Vegetais', label: 'Vegetais' },
          { value: 'Temperos', label: 'Temperos' }
        ],
        statuses: [
          { value: 'em_estoque', label: 'Em Estoque' },
          { value: 'baixo_estoque', label: 'Baixo Estoque' },
          { value: 'sem_estoque', label: 'Sem Estoque' }
        ],
        showDateRange: false
      }}
      actions={{
        onView: (insumo) => onOpenModalDetalhes(insumo),
        onEdit: (insumo) => onOpenModal(insumo)
      }}
      pagination={{
        itemsPerPageOptions: [5, 8, 10, 15, 20],
        defaultItemsPerPage: 8
      }}
      onAdd={() => console.log('Adicionar novo insumo')}
      addButtonText="Novo Insumo"
    />
  );
}
