import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit, Copy, Trash2, MoreVertical, Star, Eye, EyeOff, AlertTriangle, Package } from 'lucide-react';
import { Produto, ListaProdutosProps } from '../../types/produtos';
import { ModalProduto } from './ModalProduto';
import { usePagination } from '../../hooks/usePagination';
import { LoadMoreButton } from '../LoadMoreButton';

export const ListaProdutos: React.FC<ListaProdutosProps> = ({
  produtos,
  categorias,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
  onToggleStatus
}) => {
  // Paginação
  const {
    currentItems: produtosPaginados,
    hasMore,
    loadMore,
    totalItems,
  } = usePagination(produtos, { itemsPerPage: 10 });

  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCreate = () => {
    setProdutoSelecionado(undefined);
    setModalOpen(true);
  };

  const handleEdit = (produto: Produto) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setProdutoSelecionado(undefined);
    setDropdownOpen(null);
    setDropdownPosition(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      await onDelete(id);
    }
  };

  const handleDuplicate = async (id: string) => {
    await onDuplicate(id);
  };

  const handleToggleStatus = async (produto: Produto) => {
    const novoStatus = produto.status === 'ativo' ? 'inativo' : 'ativo';
    await onToggleStatus(produto.id, novoStatus);
  };

  const getStatusColor = (status: Produto['status']) => {
    switch (status) {
      case 'ativo':
        return 'bg-green-100 text-green-800';
      case 'inativo':
        return 'bg-gray-100 text-gray-800';
      case 'em_falta':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Produto['status']) => {
    switch (status) {
      case 'ativo':
        return 'Ativo';
      case 'inativo':
        return 'Inativo';
      case 'em_falta':
        return 'Em Falta';
      default:
        return status;
    }
  };

  const formatarPreco = (preco: number): string => {
    return preco.toFixed(2).replace('.', ',');
  };

  const formatarData = (data: Date): string => {
    return new Intl.DateTimeFormat('pt-BR').format(data);
  };

  // Fechar dropdown quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(null);
        setDropdownPosition(null);
      }
    };

    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  const handleDropdownToggle = (produtoId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (dropdownOpen === produtoId) {
      setDropdownOpen(null);
      setDropdownPosition(null);
    } else {
      const rect = event.currentTarget.getBoundingClientRect();
      setDropdownPosition({
        x: rect.right - 160, // 160px = largura do dropdown (w-40)
        y: rect.bottom + window.scrollY
      });
      setDropdownOpen(produtoId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Cabeçalho */}
      <div className="bg-white rounded border p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Produtos</h2>
          <button
            onClick={handleCreate}
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 transition-colors"
          >
            <Plus size={16} className="mr-2" />
            Novo Produto
          </button>
        </div>
      </div>

      {/* Lista de Produtos */}
      <div className="bg-white rounded border relative mb-[100px]">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2 text-xs">Carregando produtos...</p>
          </div>
        ) : produtos.length === 0 ? (
          <div className="p-8 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Nenhum produto encontrado
            </h3>
            <p className="text-gray-500 mb-6 text-xs">
              Comece criando seu primeiro produto para aparecer aqui.
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
            >
              <Plus size={14} className="mr-2" />
              Criar Primeiro Produto
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto overflow-y-visible relative">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Produto
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoria
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Preço
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Vendas
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Criado em
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Ações
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {produtosPaginados.map((produto) => (
                    <tr key={produto.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {produto.imagem && (
                            <img
                              src={produto.imagem}
                              alt={produto.nome}
                              className="h-8 w-8 rounded object-cover mr-3"
                            />
                          )}
                          <div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs font-medium text-gray-900">
                                {produto.nome}
                              </span>
                              {produto.destacado && (
                                <Star size={12} className="text-yellow-500" />
                              )}
                            </div>
                            <p className="text-xs text-gray-500 truncate max-w-xs">
                              {produto.descricao}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs text-gray-900">{produto.categoria}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs font-medium text-gray-900">
                          R$ {formatarPreco(produto.preco)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(produto.status)}`}>
                          {getStatusText(produto.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs text-gray-900">{produto.vendasTotais}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-xs text-gray-500">
                          {formatarData(produto.dataCriacao)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                        <div className="relative">
                          <button
                            ref={buttonRef}
                            onClick={(e) => handleDropdownToggle(produto.id, e)}
                            className="text-gray-400 hover:text-gray-600"
                          >
                            <MoreVertical size={14} />
                          </button>
                          
                          {dropdownOpen === produto.id && dropdownPosition && createPortal(
                            <div 
                              ref={dropdownRef}
                              className="fixed w-40 bg-white rounded shadow-lg border z-[9999]"
                              style={{
                                left: dropdownPosition.x,
                                top: dropdownPosition.y
                              }}
                            >
                              <div className="py-1">
                                <button
                                  onClick={() => {
                                    handleEdit(produto);
                                    setDropdownOpen(null);
                                    setDropdownPosition(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                >
                                  <Edit size={12} className="mr-2" />
                                  Editar
                                </button>
                                <button
                                  onClick={() => {
                                    handleDuplicate(produto.id);
                                    setDropdownOpen(null);
                                    setDropdownPosition(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                >
                                  <Copy size={12} className="mr-2" />
                                  Duplicar
                                </button>
                                <button
                                  onClick={() => {
                                    handleToggleStatus(produto);
                                    setDropdownOpen(null);
                                    setDropdownPosition(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                                >
                                  {produto.status === 'ativo' ? (
                                    <>
                                      <EyeOff size={12} className="mr-2" />
                                      Desativar
                                    </>
                                  ) : (
                                    <>
                                      <Eye size={12} className="mr-2" />
                                      Ativar
                                    </>
                                  )}
                                </button>
                                <button
                                  onClick={() => {
                                    handleDelete(produto.id);
                                    setDropdownOpen(null);
                                    setDropdownPosition(null);
                                  }}
                                  className="flex items-center w-full px-4 py-2 text-xs text-red-700 hover:bg-red-50"
                                >
                                  <Trash2 size={12} className="mr-2" />
                                  Excluir
                                </button>
                              </div>
                            </div>,
                            document.body
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Botão Carregar Mais */}
            {produtos.length > 10 && (
              <LoadMoreButton
                onLoadMore={loadMore}
                hasMore={hasMore}
                loading={loading}
                totalItems={totalItems}
                currentItems={produtosPaginados.length}
                itemsPerPage={10}
              />
            )}
          </>
        )}
      </div>

      {/* Modal */}
      <ModalProduto
        isOpen={modalOpen}
        onClose={handleCloseModal}
        produto={produtoSelecionado}
        onSave={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        loading={loading}
      />
      
      {/* Espaço adicional no final */}
      <div className="h-[100px]"></div>
    </div>
  );
}; 