import React from 'react';
import { DataTableColumn } from '../../components/ui';
import { Produto } from '../../data/produtosMock';

export const useConfiguracaoTabelaProdutos = () => {
  // Funções auxiliares para a tabela de produtos
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const isActive = status === 'ativo';
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        isActive 
          ? 'bg-green-100 text-green-800' 
          : 'bg-red-100 text-red-800'
      }`}>
        {isActive ? 'Ativo' : 'Inativo'}
      </span>
    );
  };

  const getDestaqueBadge = (destaque: boolean) => {
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
        destaque 
          ? 'bg-yellow-100 text-yellow-800' 
          : 'bg-gray-100 text-gray-800'
      }`}>
        {destaque ? 'Destaque' : 'Normal'}
      </span>
    );
  };

  const getAvaliacaoStars = (avaliacao: number) => {
    const stars = [];
    const fullStars = Math.floor(avaliacao);
    const hasHalfStar = avaliacao % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <svg key={`full-${i}`} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <svg key="half" className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
          <defs>
            <linearGradient id="halfStar">
              <stop offset="50%" stopColor="currentColor" />
              <stop offset="50%" stopColor="#e5e7eb" />
            </linearGradient>
          </defs>
          <path fill="url(#halfStar)" d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <svg key={`empty-${i}`} className="w-4 h-4 text-gray-300" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
    
    return (
      <div className="flex items-center gap-1">
        {stars}
        <span className="text-xs text-gray-600 ml-1">({avaliacao})</span>
      </div>
    );
  };

  // Definir colunas da tabela de produtos
  const columns: DataTableColumn<Produto>[] = [
    {
      key: 'nome',
      label: 'Produto',
      sortable: true,
      render: (produto) => (
        <div className="flex items-center">
          <div className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center mr-2">
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
        <div className="text-sm text-gray-900">{produto.categoria}</div>
      )
    },
    {
      key: 'preco',
      label: 'Preço',
      sortable: true,
      render: (produto) => formatCurrency(produto.preco)
    },
    {
      key: 'vendas',
      label: 'Vendas',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{produto.vendas}</div>
        </div>
      )
    },
    {
      key: 'receita',
      label: 'Receita',
      sortable: true,
      render: (produto) => formatCurrency(produto.receita)
    },
    {
      key: 'destaque',
      label: 'Destaque',
      sortable: true,
      render: (produto) => getDestaqueBadge(produto.destaque)
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (produto) => getStatusBadge(produto.status)
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false
    }
  ];

  return { columns, formatCurrency, getStatusBadge, getDestaqueBadge, getAvaliacaoStars };
};
