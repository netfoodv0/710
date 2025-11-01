import React from 'react';
import { CaixaModals, CaixaButton } from './components';
import { useCaixa } from './hooks';
import { useCaixaModals } from './context/CaixaModalsContext';

export function Caixa() {
  const { caixaAtual, loading, error } = useCaixa();
  const { openModalCaixaAbertoDetalhes } = useCaixaModals();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Cabeçalho */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Caixa</h1>
              <p className="text-sm text-gray-500">
                {caixaAtual ? 'Caixa aberto' : 'Nenhum caixa aberto'}
              </p>
            </div>
            
            <div className="flex gap-3">
              <CaixaButton />
            </div>
          </div>
        </div>
      </div>

      {/* Conteúdo */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-2 text-gray-500">Carregando...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-600">{error}</p>
          </div>
        ) : caixaAtual ? (
          <div 
            className="bg-white rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={openModalCaixaAbertoDetalhes}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Caixa Aberto
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <p className="text-sm text-green-600 font-medium">Saldo Inicial</p>
                <p className="text-2xl font-bold text-green-900">
                  R$ {caixaAtual.saldoInicial.toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-600 font-medium">Total Vendas</p>
                <p className="text-2xl font-bold text-blue-900">
                  R$ {(caixaAtual.totalVendas || 0).toFixed(2).replace('.', ',')}
                </p>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <p className="text-sm text-purple-600 font-medium">Saldo Atual</p>
                <p className="text-2xl font-bold text-purple-900">
                  R$ {((caixaAtual.saldoInicial || 0) + (caixaAtual.totalVendas || 0)).toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Nenhum caixa aberto
            </h3>
            <p className="text-gray-500 mb-6">
              Clique no botão "Caixa" para abrir uma nova sessão
            </p>
          </div>
        )}
      </div>

      {/* Modais */}
      <CaixaModals />
    </div>
  );
}
























