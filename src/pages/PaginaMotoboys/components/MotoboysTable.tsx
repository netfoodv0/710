import React, { useMemo } from 'react';
import { DataTable, DataTableColumn } from '../../../components/ui';
import { MotoboysTableProps } from '../types';

export function MotoboysTable({ 
  motoboys, 
  loading, 
  onEdit, 
  onDelete, 
  onCreate
}: MotoboysTableProps) {

  const columns: DataTableColumn[] = useMemo(() => [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'telefone',
      label: 'Telefone',
      sortable: false
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => value === 'ativo' ? 'Ativo' : 'Inativo'
    },
    {
      key: 'dataContratacao',
      label: 'Data Contratação',
      sortable: true,
      render: (value: any) => {
        try {
          return value ? new Date(value).toLocaleDateString('pt-BR') : 'N/A';
        } catch {
          return 'N/A';
        }
      }
    },
    {
      key: 'ultimaEntrega',
      label: 'Última Entrega',
      sortable: true,
      render: (value: any) => {
        try {
          return value ? new Date(value).toLocaleDateString('pt-BR') : 'N/A';
        } catch {
          return 'N/A';
        }
      }
    },
    {
      key: 'avaliacao',
      label: 'Avaliação',
      sortable: true,
      render: (value: any) => {
        const numValue = typeof value === 'number' ? value : parseFloat(value) || 0;
        return `${numValue.toFixed(1)} ⭐`;
      }
    },
    {
      key: 'totalEntregas',
      label: 'Total Entregas',
      sortable: true
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false,
      render: (value: any, row: any) => `Editar | Excluir`
    }
  ], [onEdit, onDelete]);

  return (
    <div className="space-y-6">
      <DataTable
        data={motoboys}
        columns={columns}
        loading={loading}
        searchable
        pagination
        itemsPerPage={10}
      />
    </div>
  );
}
