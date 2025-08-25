import React, { useState } from 'react';
import { PageHeader, BagIcon, DataTable, DataTableColumn } from '@/components/ui';
import { AlertTriangle, TrendingUp, Package } from 'lucide-react';
import { ModalEditarEstoque, ModalCadastroInsumo } from '../../components/modals';
import { HeaderEstoqueCompartilhado } from '../../components/estoque';

// Dados fictícios de produtos em estoque
const produtosEstoque = [
  {
    id: 1,
    nome: 'Farinha de Trigo',
    categoria: 'Farinhas',
    quantidade: 45,
    quantidadeMinima: 10,
    precoCusto: 12.50,
    custoEstoque: 562.50,
    precoUnitario: 28.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 2,
    nome: 'Carne Moída',
    categoria: 'Carnes',
    quantidade: 8,
    quantidadeMinima: 15,
    precoCusto: 8.20,
    custoEstoque: 65.60,
    precoUnitario: 18.50,
    status: 'estoque_baixo',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 3,
    nome: 'Óleo de Soja',
    categoria: 'Óleos',
    quantidade: 120,
    quantidadeMinima: 20,
    precoCusto: 3.50,
    custoEstoque: 420.00,
    precoUnitario: 6.90,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Não',
    medida: 'l'
  },
  {
    id: 4,
    nome: 'Batata Inglesa',
    categoria: 'Legumes',
    quantidade: 0,
    quantidadeMinima: 25,
    precoCusto: 5.80,
    custoEstoque: 0.00,
    precoUnitario: 12.00,
    status: 'sem_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 5,
    nome: 'Queijo Mussarela',
    categoria: 'Laticínios',
    quantidade: 32,
    quantidadeMinima: 8,
    precoCusto: 7.90,
    custoEstoque: 252.80,
    precoUnitario: 15.80,
    status: 'em_estoque',
    semControleEstoque: false,
    fichaTecnica: 'Não',
    medida: 'l'
  },
  {
    id: 6,
    nome: 'Tomate',
    categoria: 'Legumes',
    quantidade: 5,
    quantidadeMinima: 12,
    precoCusto: 11.20,
    custoEstoque: 56.00,
    precoUnitario: 22.50,
    status: 'estoque_baixo',
    semControleEstoque: false,
    fichaTecnica: 'Sim',
    medida: 'kg'
  },
  {
    id: 7,
    nome: 'Açúcar Cristal',
    categoria: 'Condimentos',
    quantidade: 0,
    quantidadeMinima: 30,
    precoCusto: 4.50,
    custoEstoque: 0.00,
    precoUnitario: 8.90,
    status: 'sem_estoque',
    semControleEstoque: true,
    fichaTecnica: 'Não',
    medida: 'l'
  },
  {
    id: 8,
    nome: 'Frango Desfiado',
    categoria: 'Carnes',
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

export default function Insumos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalCadastroOpen, setIsModalCadastroOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<typeof produtosEstoque[0] | null>(null);
  const [produtos, setProdutos] = useState(produtosEstoque);

  // Função para abrir modal de cadastro
  const handleNovoInsumo = () => {
    setIsModalCadastroOpen(true);
  };

  // Função para abrir modal de edição
  const handleEdit = (produto: typeof produtosEstoque[0]) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  // Função para salvar novo insumo
  const handleSaveInsumo = (novoInsumo: any) => {
    // Converter o formato do novo insumo para o formato da tabela
    const insumoConvertido = {
      id: novoInsumo.id,
      nome: novoInsumo.nome,
      categoria: novoInsumo.categoria,
      quantidade: novoInsumo.estoqueAtual || 0,
      quantidadeMinima: novoInsumo.estoqueMinimo || 0,
      precoCusto: novoInsumo.precoCusto,
      custoEstoque: (novoInsumo.precoCusto * (novoInsumo.estoqueAtual || 0)),
      precoUnitario: novoInsumo.precoCusto * 1.5, // Margem de 50%
      status: (novoInsumo.estoqueAtual || 0) > 0 ? 'em_estoque' : 'sem_estoque',
      semControleEstoque: !novoInsumo.controleEstoque,
      fichaTecnica: 'Sim',
      medida: novoInsumo.unidadeMedida
    };
    
    setProdutos(prev => [...prev, insumoConvertido]);
    setIsModalCadastroOpen(false);
  };

  // Função para salvar alterações
  const handleSave = (produtoEditado: typeof produtosEstoque[0]) => {
    setProdutos(prev => prev.map(p => p.id === produtoEditado.id ? produtoEditado : p));
    setIsModalOpen(false);
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
            <div className="text-sm font-medium text-gray-900">{produto.nome}</div>
            <div className="text-xs text-gray-500">{produto.categoria}</div>
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
              ? 'bg-green-100 text-green-800' 
              : 'bg-red-100 text-red-800'
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
              ? 'bg-green-100 text-green-800' 
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
          statusColor = 'bg-red-100 text-red-800';
        } else if (produto.quantidade <= produto.quantidadeMinima) {
          statusText = 'Estoque Baixo';
          statusColor = 'bg-yellow-100 text-yellow-800';
        } else {
          statusText = 'Em Estoque';
          statusColor = 'bg-green-100 text-green-800';
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
        <div className="flex justify-center">
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
    <div className="min-h-screen flex flex-col bg-dashboard-rgb">
      {/* Cabeçalho da página */}
      <HeaderEstoqueCompartilhado
        actionButton={{
          label: "Atualizar Insumos",
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
        <div className="bg-white border rounded-lg p-4 flex-shrink-0 mb-6 border-dashboard">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg border border-dashboard">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Total de Produtos</p>
                  <p className="text-lg font-bold text-gray-900">{produtos.length}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <BagIcon size={24} color="#6b7280" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-dashboard">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Em Estoque</p>
                  <p className="text-lg font-bold text-gray-900">
                    {produtos.filter(p => p.status === 'em_estoque').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package size={24} color="#6b7280" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-dashboard">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Estoque Baixo</p>
                  <p className="text-lg font-bold text-gray-900">
                    {produtos.filter(p => p.status === 'estoque_baixo').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={24} color="#6b7280" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border border-dashboard">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-gray-600">Sem Estoque</p>
                  <p className="text-lg font-bold text-gray-900">
                    {produtos.filter(p => p.status === 'sem_estoque').length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} color="#6b7280" />
                </div>
              </div>
            </div>
          </div>
        </div>

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
          onAdd={handleNovoInsumo}
          addButtonText="Novo Insumo"
        />

        {/* Modal de Edição */}
        <ModalEditarEstoque
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          produto={produtoSelecionado}
          onSave={handleSave}
        />

        {/* Modal de Cadastro */}
        <ModalCadastroInsumo
          isOpen={isModalCadastroOpen}
          onClose={() => setIsModalCadastroOpen(false)}
          onSave={handleSaveInsumo}
        />
        
        {/* Margem inferior da página */}
        <div className="h-25"></div>
      </div>
    </div>
  );
}
