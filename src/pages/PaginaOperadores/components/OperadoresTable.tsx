import React, { useMemo } from 'react';
import { DataTable, DataTableColumn } from '../../../components/ui';
import { OperadoresTableProps } from '../types';

export function OperadoresTable({ 
  operadores, 
  loading, 
  onEdit, 
  onDelete, 
  onCreate
}: OperadoresTableProps) {

  const columns: DataTableColumn[] = useMemo(() => [
    {
      key: 'nome',
      label: 'Nome',
      sortable: true
    },
    {
      key: 'email',
      label: 'Email',
      sortable: true
    },
    {
      key: 'telefone',
      label: 'Telefone',
      sortable: false
    },
    {
      key: 'cargo',
      label: 'Cargo',
      sortable: true
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (value: string) => value === 'ativo' ? 'Ativo' : 'Inativo'
    },
    {
      key: 'dataAdmissao',
      label: 'Data Admissão',
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
      key: 'ultimoAcesso',
      label: 'Último Acesso',
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
      key: 'actions',
      label: 'Ações',
      sortable: false,
      render: (value: any, row: any) => `Editar | Excluir`
    }
  ], [onEdit, onDelete]);

  return (
    <div className="space-y-6">
      <DataTable
        data={operadores}
        columns={columns}
        loading={loading}
        searchable
        pagination
        itemsPerPage={10}
      />
    </div>
  );
}
