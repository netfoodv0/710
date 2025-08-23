import React from 'react';
import { useFidelidade } from '../../context/fidelidadeContext';
import { DataTable, DataTableColumn } from '../ui';
import { Button } from '@mui/material';
import { motion } from 'motion/react';
import { ClientePontos } from '../../context/fidelidadeContext';

export function ClientesPontos() {
  const { clientesPontos, handleExportarDados } = useFidelidade();

  // Colunas da tabela de Clientes com Pontos
  const colunasClientes: DataTableColumn<ClientePontos>[] = [
    {
      key: 'nome',
      label: 'Cliente',
      sortable: true,
      render: (cliente) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
            <span className="text-xs font-medium text-gray-600">
              {cliente.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{cliente.nome}</div>
            <div className="text-xs text-gray-500">{cliente.telefone}</div>
          </div>
        </div>
      )
    },
    {
      key: 'saldoAtual',
      label: 'Saldo Atual',
      sortable: true,
      render: (cliente) => (
        <div className="text-sm font-medium text-gray-900">
          {cliente.saldoAtual} pts
        </div>
      )
    },
    {
      key: 'pontosAcumulados',
      label: 'Total Acumulado',
      sortable: true,
      render: (cliente) => (
        <div className="text-sm text-gray-900">
          {cliente.pontosAcumulados} pts
        </div>
      )
    },
    {
      key: 'pontosUtilizados',
      label: 'Total Utilizado',
      sortable: true,
      render: (cliente) => (
        <div className="text-sm text-gray-900">
          {cliente.pontosUtilizados} pts
        </div>
      )
    },
    {
      key: 'ultimaCompra',
      label: 'Última Compra',
      sortable: true,
      render: (cliente) => (
        <div className="text-sm text-gray-900">
          {cliente.ultimaCompra}
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (cliente) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          cliente.status === 'ativo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {cliente.status === 'ativo' ? 'Ativo' : 'Inativo'}
        </span>
      )
    }
  ];

  return (
    <motion.div 
      className="bg-white border border-gray-200 rounded-lg p-6 min-h-[280px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>Clientes com Pontos</h3>
        <Button 
          variant="outlined" 
          size="medium"
          onClick={handleExportarDados}
          sx={{
            color: '#8b5cf6',
            borderColor: '#8b5cf6',
            '&:hover': {
              borderColor: '#7c3aed',
              backgroundColor: 'rgba(139, 92, 246, 0.04)'
            }
          }}
        >
          Exportar Dados
        </Button>
      </div>

      <DataTable
        data={clientesPontos}
        columns={colunasClientes}
        searchPlaceholder="Buscar por nome ou telefone..."
        searchFields={['nome', 'telefone']}
        filters={{
          statuses: [
            { value: 'ativo', label: 'Ativo' },
            { value: 'inativo', label: 'Inativo' }
          ]
        }}
        actions={{
          onView: (cliente) => console.log('Visualizar cliente', cliente.id),
          onEdit: (cliente) => console.log('Editar cliente', cliente.id)
        }}
        pagination={{
          itemsPerPageOptions: [5, 8, 10, 15],
          defaultItemsPerPage: 8
        }}
        defaultSort={{
          field: 'saldoAtual',
          direction: 'desc'
        }}
      />
    </motion.div>
  );
}
