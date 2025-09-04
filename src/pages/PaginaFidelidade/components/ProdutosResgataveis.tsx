import React from 'react';
import { DataTable, DataTableColumn } from '../../../components/ui';
import { motion } from 'framer-motion';
import { ProdutoResgatavel } from '../types';

interface ProdutosResgataveisProps {
  produtos: ProdutoResgatavel[];
  onAdicionarProduto: () => void;
}

export function ProdutosResgataveis({ produtos, onAdicionarProduto }: ProdutosResgataveisProps) {
  // Colunas da tabela de Produtos Resgatáveis
  const colunasProdutos: DataTableColumn<ProdutoResgatavel>[] = [
    {
      key: 'nome',
      label: 'Produto',
      sortable: true,
      render: (produto) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-3">
            <span className="text-xs font-medium text-gray-600">
              {produto.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
            <div className="text-xs text-gray-500">{produto.categoria}</div>
          </div>
        </div>
      )
    },
    {
      key: 'pontosNecessarios',
      label: 'Pontos Necessários',
      sortable: true,
      render: (produto) => (
        <div className="text-sm font-medium text-gray-900">
          {produto.pontosNecessarios} pts
        </div>
      )
    },
    {
      key: 'valorOriginal',
      label: 'Valor Original',
      sortable: true,
      render: (produto) => (
        <div className="text-sm text-gray-900">
          R$ {produto.valorOriginal.toFixed(2)}
        </div>
      )
    },
    {
      key: 'estoque',
      label: 'Estoque',
      sortable: true,
      render: (produto) => (
        <div className="text-sm text-gray-900">
          {produto.estoque} unidades
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (produto) => (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          produto.status === 'ativo' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {produto.status === 'ativo' ? 'Ativo' : 'Inativo'}
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
        <h3 className="text-xl font-semibold text-gray-800" style={{ fontSize: '16px' }}>Produtos Resgatáveis</h3>
        <button 
          onClick={onAdicionarProduto}
          className="px-4 py-2 border border-purple-500 text-purple-500 rounded hover:bg-purple-50 hover:border-purple-600 transition-colors"
        >
          Adicionar Produto
        </button>
      </div>

      <DataTable
        data={produtos}
        columns={colunasProdutos}
        searchPlaceholder="Buscar produtos..."
        searchFields={['nome', 'categoria']}
        filters={{
          categories: [
            { value: 'Lanches', label: 'Lanches' },
            { value: 'Bebidas', label: 'Bebidas' },
            { value: 'Acompanhamentos', label: 'Acompanhamentos' }
          ],
          statuses: [
            { value: 'ativo', label: 'Ativo' },
            { value: 'inativo', label: 'Inativo' }
          ]
        }}
        actions={{
          onEdit: (produto) => console.log('Editar produto', produto.id),
          onDelete: (produto) => console.log('Excluir produto', produto.id),
          onView: (produto) => console.log('Visualizar produto', produto.id)
        }}
        pagination={{
          itemsPerPageOptions: [5, 8, 10, 15],
          defaultItemsPerPage: 8
        }}
        defaultSort={{
          field: 'nome',
          direction: 'asc'
        }}
        onAdd={() => console.log('Adicionar novo produto')}
        addButtonText="Novo Produto"
      />
    </motion.div>
  );
}
