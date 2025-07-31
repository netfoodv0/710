import React, { useState, useMemo } from 'react';
import { Package, Plus, Settings } from 'lucide-react';
import { useCategoriasFirebase } from '../../hooks/useCategoriasFirebase';
import { useCategoriasAdicionaisFirebase } from '../../hooks/useCategoriasAdicionaisFirebase';
import { ListaCategorias } from '../lists/ListaCategorias';
import { Categoria, CategoriaAdicional, DisponibilidadeCategoria } from '../../../types';

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
      <div>
        <h1 className="text-sm font-bold text-gray-900">Gerenciar Categorias</h1>
        <p className="text-gray-600 mt-1 text-xs">
          Organize suas categorias de produtos e adicionais
        </p>
      </div>

      {/* Tabs - Melhorado para Mobile */}
      <div className="bg-gray-100 rounded-lg p-1">
        <div className="flex space-x-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium rounded-md transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                <span className="sm:hidden">
                  {tab.id === 'produtos' ? 'Produtos' : 'Adicionais'}
                </span>
                <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>
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
    </div>
  );
}; 