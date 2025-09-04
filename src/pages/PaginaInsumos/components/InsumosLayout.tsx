import React from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { HeaderEstoqueCompartilhado } from '../../../components/estoque';
import { ModalEditarEstoque, ModalCadastroInsumo } from '../../../components/modals';
import { InsumosStats } from './InsumosStats';
import { InsumosTable } from './InsumosTable';
import { InsumosLayoutProps } from '../types';

export function InsumosLayout({
  insumos,
  columns,
  loading,
  error,
  isModalOpen,
  isModalDetalhesOpen,
  insumoSelecionado,
  onOpenModal,
  onCloseModal,
  onOpenModalDetalhes,
  onCloseModalDetalhes,
  onAlterarEstoque,
  onSave
}: InsumosLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Cabeçalho da página */}
        <HeaderEstoqueCompartilhado />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-0" />

        {/* Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-2 pb-12">
          {/* Loading state */}
          {loading && (
            <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 text-blue-700">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
                <span className="text-sm">Carregando dados dos insumos...</span>
              </div>
            </div>
          )}

          {/* Error state */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Erro ao carregar insumos</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <InsumosStats insumos={insumos} />
          
          {/* Margem de 24px abaixo das estatísticas */}
          <div className="mb-6"></div>

          {/* Tabela de Insumos */}
          <InsumosTable
            insumos={insumos}
            columns={columns}
            onOpenModal={onOpenModal}
            onOpenModalDetalhes={onOpenModalDetalhes}
          />

          {/* Modal de Edição */}
          <ModalEditarEstoque
            isOpen={isModalOpen}
            onClose={onCloseModal}
            produto={insumoSelecionado}
            onSave={onSave}
          />
          
          {/* Modal de Cadastro */}
          <ModalCadastroInsumo
            isOpen={isModalDetalhesOpen}
            onClose={onCloseModalDetalhes}
            produto={insumoSelecionado}
            onAlterarEstoque={onAlterarEstoque}
            onSalvarProduto={onSave}
          />
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
