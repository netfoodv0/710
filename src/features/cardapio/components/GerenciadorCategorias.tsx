import React, { useState, useMemo } from 'react';
import { Package, Plus, Settings } from 'lucide-react';
import { useCategoriasFirebase } from '../../hooks/useCategoriasFirebase';
import { useCategoriasAdicionaisFirebase } from '../../hooks/useCategoriasAdicionaisFirebase';
import { ListaCategorias } from './ListaCategorias';
import { Categoria, CategoriaAdicional, DisponibilidadeCategoria } from '../../types';

export const GerenciadorCategorias: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'produtos' | 'adicionais'>('produtos');
  
  const {
    categorias: categoriasProdutos,
    loading: loadingProdutos,
    error: errorProdutos,
    criarCategoria: criarCategoriaProduto,
    editarCategoria: editarCategoriaProduto,
    excluirCategoria: excluirCategoriaProduto,
    recarregarCategorias
  } = useCategoriasFirebase();

  const {
    categorias: categoriasAdicionais,
    loading: loadingAdicionais,
    error: errorAdicionais,
    criarCategoria: criarCategoriaAdicional,
    editarCategoria: editarCategoriaAdicional,
    excluirCategoria: excluirCategoriaAdicional,
    recarregarCategorias: recarregarCategoriasAdicionais
  } = useCategoriasAdicionaisFirebase();

  // ✅ MELHORIA: Memoização dos tabs para evitar re-renders desnecessários
  const tabs = useMemo(() => [
    {
      id: 'produtos' as const,
      label: 'Categorias de Produtos',
      icon: Package,
      count: categoriasProdutos.length
    },
    {
      id: 'adicionais' as const,
      label: 'Categorias de Adicionais',
      icon: Plus,
      count: categoriasAdicionais.length
    }
  ], [categoriasProdutos.length, categoriasAdicionais.length]);

  const handleCriarCategoria = async (categoria: Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'> | Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>) => {
    if (activeTab === 'produtos') {
      await criarCategoriaProduto(categoria as Omit<Categoria, 'id' | 'dataCriacao' | 'dataAtualizacao'>);
    } else {
      await criarCategoriaAdicional(categoria as Omit<CategoriaAdicional, 'id' | 'dataCriacao' | 'dataAtualizacao'>);
    }
  };

  const handleEditarCategoria = async (id: string, categoria: Partial<Categoria> | Partial<CategoriaAdicional>) => {
    if (activeTab === 'produtos') {
      await editarCategoriaProduto(id, categoria as Partial<Categoria>);
    } else {
      await editarCategoriaAdicional(id, categoria as Partial<CategoriaAdicional>);
    }
  };

  const handleExcluirCategoria = async (id: string) => {
    if (activeTab === 'produtos') {
      await excluirCategoriaProduto(id);
    } else {
      await excluirCategoriaAdicional(id);
    }
  };

  // ✅ MELHORIA: Implementação da funcionalidade de duplicação
  const handleDuplicarCategoria = async (id: string) => {
    try {
      if (activeTab === 'produtos') {
        const categoriaOriginal = categoriasProdutos.find(cat => cat.id === id);
        if (categoriaOriginal) {
          const categoriaDuplicada = {
            ...categoriaOriginal,
            nome: `${categoriaOriginal.nome} (Cópia)`,
            descricao: categoriaOriginal.descricao ? `${categoriaOriginal.descricao} (Cópia)` : undefined
          };
          delete (categoriaDuplicada as any).id;
          delete (categoriaDuplicada as any).dataCriacao;
          delete (categoriaDuplicada as any).dataAtualizacao;
          await criarCategoriaProduto(categoriaDuplicada);
        }
      } else {
        const categoriaOriginal = categoriasAdicionais.find(cat => cat.id === id);
        if (categoriaOriginal) {
          const categoriaDuplicada = {
            ...categoriaOriginal,
            nome: `${categoriaOriginal.nome} (Cópia)`,
            descricao: categoriaOriginal.descricao ? `${categoriaOriginal.descricao} (Cópia)` : undefined
          };
          delete (categoriaDuplicada as any).id;
          delete (categoriaDuplicada as any).dataCriacao;
          delete (categoriaDuplicada as any).dataAtualizacao;
          await criarCategoriaAdicional(categoriaDuplicada);
        }
      }
    } catch (error) {
      console.error('Erro ao duplicar categoria:', error);
    }
  };

  const handleAtualizarStatus = async (id: string, status: Categoria['status'] | CategoriaAdicional['status']) => {
    if (activeTab === 'produtos') {
      await editarCategoriaProduto(id, { status: status as Categoria['status'] });
    } else {
      await editarCategoriaAdicional(id, { status: status as CategoriaAdicional['status'] });
    }
  };

  const handleAtualizarDisponibilidade = async (id: string, disponibilidade: DisponibilidadeCategoria) => {
    if (activeTab === 'produtos') {
      await editarCategoriaProduto(id, { disponibilidade });
    } else {
      await editarCategoriaAdicional(id, { disponibilidade });
    }
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-sm font-bold text-gray-900">Gerenciar Categorias</h1>
          <p className="text-gray-600 mt-1 text-xs">
            Organize suas categorias de produtos e adicionais
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs text-gray-500">
          <Settings size={14} />
          <span>Configurações do Cardápio</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-xs transition-colors ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon size={14} />
                <span>{tab.label}</span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Error Messages */}
      {(errorProdutos || errorAdicionais) && (
        <div className="bg-red-50 border border-red-200 rounded p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">
                Erro ao carregar categorias
              </h3>
              <div className="mt-2 text-sm text-red-700">
                {errorProdutos && <p>Produtos: {errorProdutos}</p>}
                {errorAdicionais && <p>Adicionais: {errorAdicionais}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {activeTab === 'produtos' ? (
        <ListaCategorias
          categorias={categoriasProdutos}
          loading={loadingProdutos}
          onCreate={handleCriarCategoria}
          onEdit={handleEditarCategoria}
          onDelete={handleExcluirCategoria}
          onDuplicate={handleDuplicarCategoria}
          onUpdateStatus={handleAtualizarStatus}
          onUpdateDisponibilidade={handleAtualizarDisponibilidade}
          title="Categorias de Produtos"
          tipo="produtos"
        />
      ) : (
        <ListaCategorias
          // ✅ MELHORIA: Tipagem correta sem usar 'any'
          categorias={categoriasAdicionais}
          loading={loadingAdicionais}
          onCreate={handleCriarCategoria}
          onEdit={handleEditarCategoria}
          onDelete={handleExcluirCategoria}
          onDuplicate={handleDuplicarCategoria}
          onUpdateStatus={handleAtualizarStatus}
          onUpdateDisponibilidade={handleAtualizarDisponibilidade}
          title="Categorias de Adicionais"
          tipo="adicionais"
        />
      )}

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-blue-50 border border-blue-200 rounded p-4">
          <h3 className="text-sm font-semibold text-blue-900 mb-2">
            Categorias de Produtos
          </h3>
          <p className="text-blue-700 text-xs mb-3">
            Organize seus produtos em categorias para facilitar a navegação dos clientes.
          </p>
          <div className="space-y-1 text-xs text-blue-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded mr-2"></span>
              Categorias padrão para produtos gerais
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded mr-2"></span>
              Categorias especiais para pizzas
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-blue-400 rounded mr-2"></span>
              Configure disponibilidade por dia e horário
            </div>
          </div>
        </div>

        <div className="bg-green-50 border border-green-200 rounded p-4">
          <h3 className="text-sm font-semibold text-green-900 mb-2">
            Categorias de Adicionais
          </h3>
          <p className="text-green-700 text-xs mb-3">
            Crie categorias para organizar extras, complementos e personalizações.
          </p>
          <div className="space-y-1 text-xs text-green-600">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded mr-2"></span>
              Queijos, molhos e bordas
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded mr-2"></span>
              Complementos e acompanhamentos
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded mr-2"></span>
              Personalizações específicas
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 