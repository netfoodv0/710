import React, { useState } from 'react';
import { PageHeader, DataTable, DataTableColumn, EstoqueNavigation } from '@/components/ui';
import { ModalEditarAcompanhamento } from '@/components/modals/ModalEditarAcompanhamento';
import { ShoppingBag, Package, AlertTriangle, TrendingUp } from 'lucide-react';

interface ProdutoAcompanhamento {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  semControleEstoque: boolean;
  fichaTecnica: string;
  status: string;
  medida: string;
}

export default function Acompanhamentos() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoAcompanhamento | null>(null);
  const [produtos, setProdutos] = useState<ProdutoAcompanhamento[]>([
    {
      id: 1,
      nome: 'Batata Frita',
      categoria: 'Acompanhamentos',
      quantidade: 45,
      quantidadeMinima: 20,
      precoCusto: 8.50,
      custoEstoque: 382.50,
      semControleEstoque: false,
      fichaTecnica: 'Sim',
      status: 'em_estoque',
      medida: 'g'
    },
    {
      id: 2,
      nome: 'Arroz Branco',
      categoria: 'Acompanhamentos',
      quantidade: 12,
      quantidadeMinima: 15,
      precoCusto: 12.00,
      custoEstoque: 144.00,
      semControleEstoque: false,
      fichaTecnica: 'Não',
      status: 'estoque_baixo',
      medida: 'kg'
    },
    {
      id: 3,
      nome: 'Feijão Carioca',
      categoria: 'Acompanhamentos',
      quantidade: 0,
      quantidadeMinima: 10,
      precoCusto: 15.50,
      custoEstoque: 0.00,
      semControleEstoque: false,
      fichaTecnica: 'Sim',
      status: 'sem_estoque',
      medida: 'kg'
    },
    {
      id: 4,
      nome: 'Farofa',
      categoria: 'Acompanhamentos',
      quantidade: 8,
      quantidadeMinima: 5,
      precoCusto: 6.80,
      custoEstoque: 54.40,
      semControleEstoque: true,
      fichaTecnica: 'Não',
      status: 'em_estoque',
      medida: 'g'
    },
    {
      id: 5,
      nome: 'Vinagrete',
      categoria: 'Acompanhamentos',
      quantidade: 25,
      quantidadeMinima: 12,
      precoCusto: 4.20,
      custoEstoque: 105.00,
      semControleEstoque: false,
      fichaTecnica: 'Sim',
      status: 'em_estoque',
      medida: 'un'
    }
  ]);

  const handleEdit = (produto: ProdutoAcompanhamento) => {
    setProdutoSelecionado(produto);
    setIsModalOpen(true);
  };

  const handleSave = (produtoAtualizado: ProdutoAcompanhamento) => {
    setProdutos(prev => prev.map(p => 
      p.id === produtoAtualizado.id ? produtoAtualizado : p
    ));
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setProdutoSelecionado(null);
  };

  // Funções auxiliares
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: { text: string; color: string } } = {
      'em_estoque': { text: 'Ativo', color: 'bg-green-100 text-green-800' },
      'estoque_baixo': { text: 'Ativo', color: 'bg-green-100 text-green-800' },
      'sem_estoque': { text: 'Ativo', color: 'bg-green-100 text-green-800' }
    };
    
    const statusInfo = statusMap[status] || { text: 'Inativo', color: 'bg-red-100 text-red-800' };
    
    return (
      <div className="text-center">
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusInfo.color}`}>
          {statusInfo.text}
        </span>
      </div>
    );
  };

  const columns: DataTableColumn<ProdutoAcompanhamento>[] = [
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
            title="Editar acompanhamento"
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
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'rgb(238, 235, 235)' }}>
      {/* Cabeçalho da página */}
      <PageHeader
        title="Acompanhamentos"
        subtitle="Gerenciamento dos acompanhamentos do restaurante"
        leftContent={
          <EstoqueNavigation currentPage="acompanhamento" />
        }
        actionButton={{
          label: "Atualizar Acompanhamentos",
          onClick: () => {},
          loading: false,
          disabled: false,
          variant: "primary",
          size: "md"
        }}
      />

      {/* Conteúdo Principal */}
      <div className="px-6 pt-6 flex-1">
        {/* Estatísticas dos Acompanhamentos */}
        <div className="bg-white border rounded-lg p-4 flex-shrink-0 mb-6" style={{ borderColor: '#cfd1d3' }}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-600">Total de Acompanhamentos</p>
                  <p className="text-lg font-bold text-gray-900">{produtos.length}</p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag size={24} color="#6b7280" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-600">Em Estoque</p>
                  <p className="text-lg font-bold text-gray-900">
                    {produtos.filter(p => p.quantidade > p.quantidadeMinima && !p.semControleEstoque).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <Package size={24} color="#6b7280" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-600">Estoque Baixo</p>
                  <p className="text-lg font-bold text-gray-900">
                    {produtos.filter(p => p.quantidade <= p.quantidadeMinima && p.quantidade > 0 && !p.semControleEstoque).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <AlertTriangle size={24} color="#6b7280" />
                </div>
              </div>
            </div>
            
            <div className="bg-white p-3 rounded-lg border" style={{ borderColor: '#cfd1d3' }}>
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <p className="text-xs font-medium text-gray-600">Sem Estoque</p>
                  <p className="text-lg font-bold text-gray-900">
                    {produtos.filter(p => p.quantidade === 0 && !p.semControleEstoque).length}
                  </p>
                </div>
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                  <TrendingUp size={24} color="#6b7280" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tabela de Acompanhamentos */}
        <DataTable
          data={produtos}
          columns={columns}
          searchPlaceholder="Buscar acompanhamentos..."
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
          onAdd={() => console.log('Adicionar novo acompanhamento')}
          addButtonText="Novo Acompanhamento"
        />

        {/* Margem inferior */}
        <div className="h-25"></div>
      </div>

      {/* Modal de edição */}
      {isModalOpen && produtoSelecionado && (
        <ModalEditarAcompanhamento
          isOpen={isModalOpen}
          produto={produtoSelecionado}
          onSave={handleSave}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
