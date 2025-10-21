import React from 'react';
import { DataTable } from '../../../components/ui';
import { AcompanhamentosTableProps } from '../types';

export function AcompanhamentosTable({
  produtos,
  columns,
  onOpenModal,
  onOpenModalDetalhes
}: AcompanhamentosTableProps) {
  // Extrair categorias únicas dos produtos
  const categorias = Array.from(new Set(produtos.map(p => p.categoria)))
    .map(categoria => ({ value: categoria, label: categoria }));

  return (
    <DataTable
      data={produtos}
      columns={columns}
      searchPlaceholder="Buscar acompanhamentos..."
      searchFields={['nome', 'categoria']}
      filters={{
        categories: categorias,
        statuses: [
          { value: 'em_estoque', label: 'Em Estoque' },
          { value: 'baixo_estoque', label: 'Baixo Estoque' },
          { value: 'sem_estoque', label: 'Sem Estoque' },
          { value: 'sem_controle', label: 'Sem Controle' }
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
      onAdd={() => console.log('Adicionar novo acompanhamento')}
      addButtonText="Novo Acompanhamento"
    />
  );
}


