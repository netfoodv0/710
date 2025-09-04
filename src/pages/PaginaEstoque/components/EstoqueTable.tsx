import React from 'react';
import { DataTable } from '../../../components/ui';
import { EstoqueTableProps } from '../types';

export function EstoqueTable({
  produtos,
  columns,
  onOpenModal,
  onOpenModalDetalhes
}: EstoqueTableProps) {
  return (
    <DataTable
      data={produtos}
      columns={columns}
      searchPlaceholder="Buscar produtos..."
      searchFields={['nome', 'categoria']}
      filters={{
        categories: [
          { value: 'Pizzas', label: 'Pizzas' },
          { value: 'Lanches', label: 'Lanches' },
          { value: 'Bebidas', label: 'Bebidas' },
          { value: 'Acompanhamentos', label: 'Acompanhamentos' },
          { value: 'Saladas', label: 'Saladas' }
        ],
        statuses: [
          { value: 'em_estoque', label: 'Em Estoque' },
          { value: 'baixo_estoque', label: 'Baixo Estoque' },
          { value: 'sem_estoque', label: 'Sem Estoque' }
        ],
        showDateRange: false
      }}
      actions={{
        onView: (produto) => onOpenModalDetalhes(produto),
        onEdit: (produto) => onOpenModal(produto)
      }}
      pagination={{
        itemsPerPageOptions: [5, 8, 10, 15, 20],
        defaultItemsPerPage: 8
      }}
      onAdd={() => console.log('Adicionar novo produto')}
      addButtonText="Novo Produto"
    />
  );
}
