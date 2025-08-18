import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { PageHeader } from '../components/ui';
import { Plus } from 'lucide-react';
import { DataTable, DataTableColumn } from '../components/ui';

// Dados fictícios de produtos
const produtosFicticios = [
  {
    id: 1,
    nome: 'Hambúrguer Clássico',
    categoria: 'Lanches',
    preco: 18.90,
    estoque: 45,
    status: 'Ativo',
    vendas: 127,
    avaliacao: 4.8,
    dataCriacao: '2024-01-15'
  },
  {
    id: 2,
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    preco: 32.50,
    estoque: 23,
    status: 'Ativo',
    vendas: 89,
    avaliacao: 4.6,
    dataCriacao: '2024-01-10'
  },
  {
    id: 3,
    nome: 'Batata Frita',
    categoria: 'Acompanhamentos',
    preco: 12.90,
    estoque: 67,
    status: 'Ativo',
    vendas: 234,
    avaliacao: 4.4,
    dataCriacao: '2024-01-20'
  },
  {
    id: 4,
    nome: 'Refrigerante Cola',
    categoria: 'Bebidas',
    preco: 6.50,
    estoque: 120,
    status: 'Ativo',
    vendas: 456,
    avaliacao: 4.2,
    dataCriacao: '2024-01-05'
  },
  {
    id: 5,
    nome: 'Sorvete de Chocolate',
    categoria: 'Sobremesas',
    preco: 8.90,
    estoque: 34,
    status: 'Inativo',
    vendas: 67,
    avaliacao: 4.7,
    dataCriacao: '2024-01-12'
  },
  {
    id: 6,
    nome: 'Salada Caesar',
    categoria: 'Saladas',
    preco: 22.90,
    estoque: 28,
    status: 'Ativo',
    vendas: 45,
    avaliacao: 4.5,
    dataCriacao: '2024-01-18'
  },
  {
    id: 7,
    nome: 'Frango Grelhado',
    categoria: 'Pratos Principais',
    preco: 28.90,
    estoque: 15,
    status: 'Ativo',
    vendas: 78,
    avaliacao: 4.9,
    dataCriacao: '2024-01-08'
  },
  {
    id: 8,
    nome: 'Suco Natural Laranja',
    categoria: 'Bebidas',
    preco: 9.90,
    estoque: 42,
    status: 'Ativo',
    vendas: 156,
    avaliacao: 4.3,
    dataCriacao: '2024-01-14'
  }
];

export function Tabelas() {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'Ativo';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {status}
      </span>
    );
  };

  const getRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        <span className="text-sm font-medium text-gray-900">{rating}</span>
        <div className="flex">
          {[1, 2, 3, 4, 5].map((star) => (
            <svg
              key={star}
              className={`w-4 h-4 ${
                star <= rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      </div>
    );
  };

  // Definir colunas da tabela
  const columns: DataTableColumn<typeof produtosFicticios[0]>[] = [
    {
      key: 'nome',
      label: 'Produto',
      sortable: true,
      render: (produto) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-2">
            <span className="text-xs font-medium text-gray-600">
              {produto.nome.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
          </div>
        </div>
      )
    },
    {
      key: 'categoria',
      label: 'Categoria',
      sortable: true,
      render: (produto) => (
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
          {produto.categoria}
        </span>
      )
    },
    {
      key: 'preco',
      label: 'Preço',
      sortable: true,
      render: (produto) => formatCurrency(produto.preco)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (produto) => getStatusBadge(produto.status)
    },
    {
      key: 'vendas',
      label: 'Vendas',
      sortable: true
    },
    {
      key: 'dataCriacao',
      label: 'Data Criação',
      sortable: true,
      render: (produto) => (
        <div>
          <div>{formatDate(produto.dataCriacao)}</div>
          <div className="text-xs text-gray-400">
            {new Date(produto.dataCriacao).toLocaleTimeString('pt-BR', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </div>
        </div>
      )
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  // Categorias únicas para filtros
  const categorias = useMemo(() => {
    const cats = [...new Set(produtosFicticios.map(p => p.categoria))];
    return cats.map(cat => ({ value: cat, label: cat }));
  }, []);

  // Status únicos para filtros
  const statusOptions = useMemo(() => {
    const status = [...new Set(produtosFicticios.map(p => p.status))];
    return status.map(st => ({ value: st, label: st }));
  }, []);

  return (
    <ErrorBoundary>
      <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
        {/* Cabeçalho da página */}
        <PageHeader
          title="Tabelas"
          subtitle="Gerenciamento de produtos e dados tabulares"
          rightContent={
            <button className="inline-flex items-center gap-2 px-4 py-2 bg-[#8217d5] text-white rounded-lg hover:bg-[#6b14b3] transition-colors">
              <Plus className="w-4 h-4" />
              Novo Produto
            </button>
          }
        />

        {/* Conteúdo da página */}
        <div className="container mx-auto px-4 py-8">
          <DataTable
            data={produtosFicticios}
            columns={columns}
            searchPlaceholder="Buscar produtos..."
            searchFields={['nome', 'categoria']}
            filters={{
              categories: categorias,
              statuses: statusOptions,
              showDateRange: true
            }}
            actions={{
              onView: (produto) => console.log('Visualizar:', produto),
              onEdit: (produto) => console.log('Editar:', produto),
              onDelete: (produto) => console.log('Excluir:', produto)
            }}
            pagination={{
              itemsPerPageOptions: [5, 8, 10, 15, 20],
              defaultItemsPerPage: 8
            }}
            onAdd={() => console.log('Adicionar novo produto')}
            addButtonText="Novo Produto"
          />
        </div>
      </div>
    </ErrorBoundary>
  );
}
