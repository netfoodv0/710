import React from 'react';
import { DataTable } from '../../../components/ui';
import { CuponsTableProps } from '../types';

export function CuponsTable({ 
  cupons, 
  columns, 
  categoriasFiltros, 
  statusOptions, 
  tipoOptions, 
  onView, 
  onEdit, 
  onDelete, 
  onAdd 
}: CuponsTableProps) {
  return (
    <div className="cupons-table-container">
      <DataTable
        data={cupons}
        columns={columns}
        searchPlaceholder="Buscar cupons..."
        searchFields={['codigo', 'descricao']}
        filters={{
          categories: categoriasFiltros,
          statuses: statusOptions,
          tipos: tipoOptions,
          showDateRange: true
        }}
        actions={{
          onView: onView,
          onEdit: onEdit,
          onDelete: onDelete
        }}
        pagination={{
          itemsPerPageOptions: [5, 8, 10, 15, 20],
          defaultItemsPerPage: 8
        }}
        onAdd={onAdd}
        addButtonText="Novo Cupom"
      />
    </div>
  );
}


