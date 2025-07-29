import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Plus, Edit, Copy, Trash2, MoreVertical, Clock, Package, Plus as PlusIcon } from 'lucide-react';
import { Categoria, CategoriaAdicional, DisponibilidadeCategoria } from '../../types';
import { ModalCategoria } from './ModalCategoria';

interface ListaCategoriasProps {
  categorias: (Categoria | CategoriaAdicional)[];
  loading: boolean;
  onCreate: (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'> | Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => Promise<void>;
  onEdit: (id: string, categoria: Partial<Categoria> | Partial<CategoriaAdicional>) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onDuplicate: (id: string) => Promise<void>;
  onUpdateStatus: (id: string, status: Categoria['status'] | CategoriaAdicional['status']) => Promise<void>;
  onUpdateDisponibilidade: (id: string, disponibilidade: Categoria['disponibilidade'] | CategoriaAdicional['disponibilidade']) => Promise<void>;
  title: string;
  tipo: 'produtos' | 'adicionais';
}

export const ListaCategorias: React.FC<ListaCategoriasProps> = ({
  categorias,
  loading,
  onCreate,
  onEdit,
  onDelete,
  onDuplicate,
  onUpdateStatus,
  onUpdateDisponibilidade,
  title,
  tipo
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<Categoria | CategoriaAdicional | undefined>();
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<{ x: number; y: number } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleCreate = () => {
    setCategoriaSelecionada(undefined);
    setModalOpen(true);
  };

  const handleEdit = (categoria: Categoria | CategoriaAdicional) => {
    setCategoriaSelecionada(categoria);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setCategoriaSelecionada(undefined);
    setDropdownOpen(null);
    setDropdownPosition(null);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir esta categoria?')) {
      await onDelete(id);
    }
  };

  const handleDuplicate = async (id: string) => {
    await onDuplicate(id);
  };

  const handleToggleStatus = async (categoria: Categoria | CategoriaAdicional) => {
    const novoStatus = categoria.status === 'ativo' ? 'inativo' : 'ativo';
    await onUpdateStatus(categoria.id, novoStatus);
  };

  const getStatusColor = (status: Categoria['status'] | CategoriaAdicional['status']) => {
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

  const getStatusText = (status: Categoria['status'] | CategoriaAdicional['status']) => {
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

  const getTipoText = (tipo: 'padrao' | 'pizza') => {
    switch (tipo) {
      case 'padrao':
        return 'Padrão';
      case 'pizza':
        return 'Pizza';
      default:
        return tipo;
    }
  };

  const getTipoAdicionalText = (tipo: 'padrao' | 'obrigatorio') => {
    switch (tipo) {
      case 'padrao':
        return 'Padrão';
      case 'obrigatorio':
        return 'Obrigatório';
      default:
        return tipo;
    }
  };

  const getTipoSelecaoText = (tipoSelecao: 'unica' | 'multipla' | 'somavel') => {
    switch (tipoSelecao) {
      case 'unica':
        return 'Opção Única';
      case 'multipla':
        return 'Opção Múltipla';
      case 'somavel':
        return 'Opção Somável';
      default:
        return 'Desconhecido';
    }
  };

  const formatarData = (data: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(data);
  };

  const formatarDisponibilidade = (categoria: Categoria | CategoriaAdicional) => {
    if (!categoria.disponibilidade) return 'Não configurado';
    
    const diasAtivos = categoria.disponibilidade.diasSemana.filter(dia => dia.ativo);
    if (diasAtivos.length === 0) return 'Nenhum dia selecionado';
    
    return `${diasAtivos.length} dias • ${categoria.disponibilidade.horarioInicio} - ${categoria.disponibilidade.horarioFim}`;
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

  const handleDropdownToggle = (categoriaId: string, event: React.MouseEvent) => {
    if (dropdownOpen === categoriaId) {
      setDropdownOpen(null);
      setDropdownPosition(null);
    } else {
      const button = event.currentTarget as HTMLButtonElement;
      const rect = button.getBoundingClientRect();
      setDropdownPosition({
        x: rect.right - 192, // 192px = largura do dropdown (w-48)
        y: rect.top - 8 // 8px acima do botão
      });
      setDropdownOpen(categoriaId);
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
          <p className="text-gray-600 mt-1 text-xs">
            Gerencie todas as categorias do seu cardápio
          </p>
        </div>
        <button
          onClick={handleCreate}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
        >
          <Plus size={14} className="mr-2" />
          Nova Categoria
        </button>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded border">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded">
              <Package size={16} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Ativas</p>
              <p className="text-lg font-semibold text-gray-900">
                {categorias.filter(c => c.status === 'ativo').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded">
              <PlusIcon size={16} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Total</p>
              <p className="text-lg font-semibold text-gray-900">
                {categorias.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <div className="flex items-center">
            <div className="p-2 bg-red-100 rounded">
              <Clock size={16} className="text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Em Falta</p>
              <p className="text-lg font-semibold text-gray-900">
                {categorias.filter(c => c.status === 'em_falta').length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded border">
          <div className="flex items-center">
            <div className="p-2 bg-gray-100 rounded">
              <Package size={16} className="text-gray-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs font-medium text-gray-600">Inativas</p>
              <p className="text-lg font-semibold text-gray-900">
                {categorias.filter(c => c.status === 'inativo').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lista de Categorias */}
      <div className="bg-white rounded border relative">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-gray-600 mt-2 text-xs">Carregando categorias...</p>
          </div>
        ) : categorias.length === 0 ? (
          <div className="p-8 text-center">
            <Package size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-sm font-medium text-gray-900 mb-2">
              Nenhuma categoria encontrada
            </h3>
            <p className="text-gray-500 mb-6 text-xs">
              Comece criando sua primeira categoria para aparecer aqui.
            </p>
            <button
              onClick={handleCreate}
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors text-xs"
            >
              <Plus size={14} className="mr-2" />
              Criar Primeira Categoria
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-visible relative">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Disponibilidade
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
                {categorias.map((categoria) => (
                  <tr key={categoria.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs font-medium text-gray-900">
                            {categoria.nome}
                          </span>
                        </div>
                        {categoria.descricao && (
                          <p className="text-xs text-gray-500 truncate max-w-xs">
                            {categoria.descricao}
                          </p>
                        )}
                      </div>
                    </td>
                                         <td className="px-6 py-4 whitespace-nowrap">
                       <div className="text-xs text-gray-900">
                         {tipo === 'produtos' && 'tipo' in categoria && (
                           getTipoText(categoria.tipo)
                         )}
                         {tipo === 'adicionais' && 'tipo' in categoria && (
                           <>
                             {getTipoAdicionalText(categoria.tipo)}
                             {tipo === 'adicionais' && 'tipoSelecao' in categoria && (
                               <> • {getTipoSelecaoText(categoria.tipoSelecao)}</>
                             )}
                             {tipo === 'adicionais' && 'quantidadeMinima' in categoria && 'quantidadeMaxima' in categoria && 
                              categoria.tipoSelecao !== 'unica' && categoria.quantidadeMinima && categoria.quantidadeMaxima && (
                               <> • <span className="text-gray-500">{categoria.quantidadeMinima}-{categoria.quantidadeMaxima} unid.</span></>
                             )}
                           </>
                         )}
                       </div>
                     </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${getStatusColor(categoria.status)}`}>
                        {getStatusText(categoria.status)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1 text-gray-400" />
                        <span className="text-xs text-gray-500">
                          {formatarDisponibilidade(categoria)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-xs text-gray-500">
                        {formatarData(categoria.dataCriacao)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-xs font-medium">
                      <div className="relative" ref={dropdownRef}>
                        <button
                          ref={buttonRef}
                          onClick={(e) => handleDropdownToggle(categoria.id, e)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <MoreVertical size={14} />
                        </button>
                        
                        {dropdownOpen === categoria.id && dropdownPosition && createPortal(
                          <div 
                            ref={dropdownRef}
                            className="fixed w-48 bg-white rounded shadow-lg border z-[9999]"
                            style={{
                              left: dropdownPosition.x,
                              top: dropdownPosition.y
                            }}
                          >
                            <div className="py-1">
                              <button
                                onClick={() => {
                                  handleEdit(categoria);
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
                                  handleDuplicate(categoria.id);
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
                                  handleToggleStatus(categoria);
                                  setDropdownOpen(null);
                                  setDropdownPosition(null);
                                }}
                                className="flex items-center w-full px-4 py-2 text-xs text-gray-700 hover:bg-gray-100"
                              >
                                {categoria.status === 'ativo' ? (
                                  <>
                                    <Package size={12} className="mr-2" />
                                    Desativar
                                  </>
                                ) : (
                                  <>
                                    <Package size={12} className="mr-2" />
                                    Ativar
                                  </>
                                )}
                              </button>
                              <button
                                onClick={() => {
                                  handleDelete(categoria.id);
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
        )}
      </div>

      {/* Modal */}
      <ModalCategoria
        isOpen={modalOpen}
        onClose={handleCloseModal}
        categoria={categoriaSelecionada}
        onSave={onCreate}
        onEdit={onEdit}
        onDelete={onDelete}
        onDuplicate={onDuplicate}
        onUpdateStatus={onUpdateStatus}
        onUpdateDisponibilidade={onUpdateDisponibilidade}
        loading={loading}
        tipo={tipo}
      />
    </div>
  );
}; 