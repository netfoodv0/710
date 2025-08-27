import React, { useState } from 'react';
import { PageHeader, BagIcon, DataTable, DataTableColumn } from '@/components/ui';
import { AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { ModalEditarEstoque, ModalDetalhesProduto } from '../../components/modals';
import { HeaderEstoqueCompartilhado } from '../../components/estoque';
import { EstatisticasCustom } from '../../components/EstatisticasCustom';

// Dados fictícios de produtos em estoque
const produtosEstoque = [
  {
    id: 1,
    nome: 'Pizza Margherita',
    categoria: 'Pizzas',
    quantidade: 45,
    quantidadeMinima: 10,
    precoCusto: 12.50,
    custoEstoque: 562.50,
    precoUnitario: 28.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'un'
  },
  {
    id: 2,
    nome: 'Hambúrguer Clássico',
    categoria: 'Lanches',
    quantidade: 8,
    quantidadeMinima: 15,
    precoCusto: 8.20,
    custoEstoque: 65.60,
    precoUnitario: 18.50,
    status: 'estoque_baixo',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'un'
  },
  {
    id: 3,
    nome: 'Refrigerante Cola',
    categoria: 'Bebidas',
    quantidade: 120,
    quantidadeMinima: 20,
    precoCusto: 3.50,
    custoEstoque: 420.00,
    precoUnitario: 6.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Não',
    medida: 'ml'
  },
  {
    id: 4,
    nome: 'Batata Frita',
    categoria: 'Acompanhamentos',
    quantidade: 0,
    quantidadeMinima: 25,
    precoCusto: 5.80,
    custoEstoque: 0.00,
    precoUnitario: 12.00,
    status: 'sem_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'g'
  },
  {
    id: 5,
    nome: 'Sorvete de Chocolate',
    categoria: 'Sobremesas',
    quantidade: 32,
    quantidadeMinima: 8,
    precoCusto: 7.90,
    custoEstoque: 252.80,
    precoUnitario: 15.80,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Não',
    medida: 'un'
  },
  {
    id: 6,
    nome: 'Salada Caesar',
    categoria: 'Saladas',
    quantidade: 5,
    quantidadeMinima: 12,
    precoCusto: 11.20,
    custoEstoque: 56.00,
    precoUnitario: 22.50,
    status: 'estoque_baixo',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'un'
  },
  {
    id: 7,
    nome: 'Suco Natural Laranja',
    categoria: 'Bebidas',
    quantidade: 0,
    quantidadeMinima: 30,
    precoCusto: 4.50,
    custoEstoque: 0.00,
    precoUnitario: 8.90,
    status: 'sem_estoque',
    semControleEstoque: true,
    fichaTecnica: 'Não',
    medida: 'ml'
  },
  {
    id: 8,
    nome: 'Pizza Quatro Queijos',
    categoria: 'Pizzas',
    quantidade: 28,
    quantidadeMinima: 10,
    precoCusto: 14.80,
    custoEstoque: 414.40,
    precoUnitario: 32.00,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  }
];

export default function Estoque() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDetalhesOpen, setIsModalDetalhesOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<typeof produtosEstoque[0] | null>(null);
  const [produtos, setProdutos] = useState(produtosEstoque);

  // Função para abrir modal de detalhes
  const handleVerDetalhes = (produto: typeof produtosEstoque[0]) => {
    setProdutoSelecionado(produto);
    setIsModalDetalhesOpen(true);
  };

  // Função para abrir modal de edição
  const handleEdit = (produto: typeof produtosEstoque[0]) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  // Função para alterar estoque
  const handleAlterarEstoque = (produto: typeof produtosEstoque[0], tipo: 'adicionar' | 'retirar', quantidade: number, descricao: string) => {
    const novaQuantidade = tipo === 'adicionar' 
      ? produto.quantidade + quantidade 
      : Math.max(0, produto.quantidade - quantidade);
    
    const produtoAtualizado = { ...produto, quantidade: novaQuantidade };
    setProdutos(prev => prev.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
    
    // Atualizar o produto selecionado para refletir as mudanças no modal
    setProdutoSelecionado(produtoAtualizado);
  };

  // Função para salvar alterações
  const handleSave = (produtoEditado: typeof produtosEstoque[0]) => {
    setProdutos(prev => prev.map(p => p.id === produtoEditado.id ? produtoEditado : p));
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  };

  // Função para fechar modal de detalhes
  const handleCloseModalDetalhes = () => {
    setIsModalDetalhesOpen(false);
    setProdutoSelecionado(null);
  };

  // Função para fechar modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  };

  // Funções auxiliares para a tabela
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      em_estoque: { label: 'Em Estoque', color: 'bg-purple-100 text-purple-800' },
      estoque_baixo: { label: 'Estoque Baixo', color: 'bg-gray-100 text-gray-800' },
      sem_estoque: { label: 'Sem Estoque', color: 'bg-gray-100 text-gray-800' }
    };
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.em_estoque;
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        {config.label}
      </span>
    );
  };

  const getQuantidadeBadge = (quantidade: number, quantidadeMinima: number) => {
    if (quantidade === 0) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {quantidade}
        </span>
      );
    } else if (quantidade <= quantidadeMinima) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          {quantidade}
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
          {quantidade}
        </span>
      );
    }
  };

  // Definir colunas da tabela de estoque
  const columns: DataTableColumn<typeof produtosEstoque[0]>[] = [
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
            <button
              onClick={() => handleVerDetalhes(produto)}
              className="text-left hover:text-blue-600 transition-colors"
            >
              <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
              <div className="text-xs text-gray-500">{produto.categoria}</div>
            </button>
          </div>
        </div>
      )
    },
    {
      key: 'status',
      label: 'Status',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            produto.status === 'em_estoque' || produto.status === 'estoque_baixo' || produto.status === 'sem_estoque'
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {produto.status === 'em_estoque' || produto.status === 'estoque_baixo' || produto.status === 'sem_estoque' ? 'Ativo' : 'Inativo'}
          </span>
        </div>
      )
    },
    {
      key: 'precoCusto',
      label: 'Preço Custo',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">
            {formatCurrency(produto.precoCusto)}
          </div>
        </div>
      )
    },
    {
      key: 'custoEstoque',
      label: 'Custo Estoque',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">
            {formatCurrency(produto.custoEstoque)}
          </div>
        </div>
      )
    },
    {
      key: 'quantidadeMinima',
      label: 'Mínimo',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{produto.quantidadeMinima}</div>
        </div>
      )
    },
    {
      key: 'quantidade',
      label: 'Atual',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <div className="text-sm font-medium text-gray-900">{produto.quantidade}</div>
        </div>
      )
    },
    {
      key: 'medida',
      label: 'Medida',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {produto.medida}
          </span>
        </div>
      )
    },
    {
      key: 'fichaTecnica',
      label: 'Ficha Técnica',
      sortable: true,
      render: (produto) => (
        <div className="text-center">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
            produto.fichaTecnica === 'Sim' 
              ? 'bg-purple-100 text-purple-800' 
              : 'bg-gray-100 text-gray-800'
          }`}>
            {produto.fichaTecnica}
          </span>
        </div>
      )
    },
    {
      key: 'semControleEstoque',
      label: 'Estoque',
      sortable: true,
      render: (produto) => {
        if (produto.semControleEstoque) {
          return (
            <div className="text-center">
              <span className="block mx-auto w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                Sem Controle
              </span>
            </div>
          );
        }
        
        let statusText = '';
        let statusColor = '';
        
        if (produto.quantidade === 0) {
          statusText = 'Sem Estoque';
          statusColor = 'bg-gray-100 text-gray-800';
        } else if (produto.quantidade <= produto.quantidadeMinima) {
          statusText = 'Estoque Baixo';
          statusColor = 'bg-gray-100 text-gray-800';
        } else {
          statusText = 'Em Estoque';
          statusColor = 'bg-purple-100 text-purple-800';
        }
        
        return (
          <div className="text-center">
            <span className={`block mx-auto w-fit items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
              {statusText}
            </span>
          </div>
        );
      }
    },
    {
      key: 'actions',
      label: 'Ações',
      sortable: false,
      render: (produto) => (
        <div className="flex justify-center space-x-2">
          <button
            onClick={() => handleVerDetalhes(produto)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Ver detalhes"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={() => handleEdit(produto)}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
            title="Editar estoque"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      )
    }
  ];

  // Categorias únicas para filtros
  const categorias = React.useMemo(() => {
    const cats = [...new Set(produtos.map(p => p.categoria))];
    return cats.map(cat => ({ value: cat, label: cat }));
  }, [produtos]);

  // Status únicos para filtros
  const statusOptions = React.useMemo(() => {
    const status = [...new Set(produtos.map(p => p.status))];
    return status.map(st => ({ 
      value: st, 
      label: st === 'em_estoque' ? 'Em Estoque' : 
             st === 'estoque_baixo' ? 'Estoque Baixo' : 'Sem Estoque' 
    }));
  }, [produtos]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho da página */}
      <HeaderEstoqueCompartilhado
        actionButton={{
          label: "Atualizar Estoque",
          onClick: () => {},
          loading: false,
          disabled: false,
          variant: "primary",
          size: "md"
        }}
      />

      {/* Conteúdo Principal */}
      <div className="px-6 pt-6 flex-1">
        {/* Estatísticas do Estoque */}
        <EstatisticasCustom
          estatisticas={[
            {
              label: 'Total de Produtos',
              valor: produtos.length,
              icon: BagIcon,
              iconColor: '#6b7280'
            },
            {
              label: 'Em Estoque',
              valor: produtos.filter(p => p.status === 'em_estoque').length,
              icon: Package,
              iconColor: '#6b7280'
            },
            {
              label: 'Estoque Baixo',
              valor: produtos.filter(p => p.status === 'estoque_baixo').length,
              icon: AlertTriangle,
              iconColor: '#6b7280'
            },
            {
              label: 'Sem Estoque',
              valor: produtos.filter(p => p.status === 'sem_estoque').length,
              icon: TrendingUp,
              iconColor: '#6b7280'
            }
          ]}
        />
        
        {/* Margem de 24px abaixo das estatísticas */}
        <div className="mb-6"></div>

        {/* Tabela de Estoque */}
        <DataTable
          data={produtos}
          columns={columns}
          searchPlaceholder="Buscar produtos..."
          searchFields={['nome', 'categoria', 'fichaTecnica']}
          filters={{
            categories: categorias,
            statuses: statusOptions,
            showDateRange: true
          }}
          actions={{
            onEdit: handleEdit
          }}
          pagination={{
            itemsPerPageOptions: [5, 8, 10, 15, 20],
            defaultItemsPerPage: 8
          }}
          defaultSort={{
            field: 'quantidade',
            direction: 'asc'
          }}
          onAdd={() => console.log('Adicionar novo produto')}
          addButtonText="Novo Produto"
        />

        {/* Modal de Edição */}
        <ModalEditarEstoque
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          produto={produtoSelecionado}
          onSave={handleSave}
        />

        {/* Modal de Detalhes */}
        <ModalDetalhesProduto
          isOpen={isModalDetalhesOpen}
          onClose={handleCloseModalDetalhes}
          produto={produtoSelecionado}
          onAlterarEstoque={handleAlterarEstoque}
          onSalvarProduto={handleSave}
        />
        
        {/* Margem inferior da página */}
        <div className="h-25"></div>
      </div>
    </div>
  );
}
