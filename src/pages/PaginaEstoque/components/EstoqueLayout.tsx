import React from 'react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { HeaderEstoqueCompartilhado } from '../../../components/estoque';
import { ModalEditarEstoque, ModalDetalhesProduto } from '../../../components/modals';
import { EstoqueStats } from './EstoqueStats';
import { EstoqueTable } from './EstoqueTable';
import { EstoqueLayoutProps } from '../types';

export function EstoqueLayout({
  produtos,
  columns,
  loading,
  error,
  isModalOpen,
  isModalDetalhesOpen,
  produtoSelecionado,
  onOpenModal,
  onCloseModal,
  onOpenModalDetalhes,
  onCloseModalDetalhes,
  onAlterarEstoque,
  onSave
}: EstoqueLayoutProps) {
  return (
    <ErrorBoundary>
      <div className="min-h-screen w-full overflow-x-hidden">
        {/* Cabeçalho da página */}
        <HeaderEstoqueCompartilhado />

        {/* Content */}
        <div className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-12" style={{ paddingTop: '16px' }}>

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
                  <h3 className="text-sm font-medium text-red-800">Erro ao carregar estoque</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Estatísticas */}
          <EstoqueStats produtos={produtos} />
          
          {/* Margem de 24px abaixo das estatísticas */}
          <div className="mb-6"></div>

          {/* Tabela de Produtos */}
          <EstoqueTable
            produtos={produtos}
            columns={columns}
            onOpenModal={onOpenModal}
            onOpenModalDetalhes={onOpenModalDetalhes}
          />

          {/* Modal de Edição */}
          <ModalEditarEstoque
            isOpen={isModalOpen}
            onClose={onCloseModal}
            produto={produtoSelecionado}
            onSave={onSave}
          />
          
          {/* Modal de Detalhes */}
          <ModalDetalhesProduto
            isOpen={isModalDetalhesOpen}
            onClose={onCloseModalDetalhes}
            produto={produtoSelecionado}
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


