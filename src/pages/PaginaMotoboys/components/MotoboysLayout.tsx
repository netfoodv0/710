import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { FixedPageHeader } from '../../../components/ui';
import { ModalCriarUsuario } from '../../../components/modals';
import { MotoboysTable } from './MotoboysTable';
import { MotoboysLayoutProps } from '../types';

export function MotoboysLayout({ data, onCreate }: MotoboysLayoutProps) {
  const [showModal, setShowModal] = useState(false);
  // Error state
  if (data.error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar motoboys</h3>
          </div>
          <p className="text-red-700 mb-4">{data.error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleEdit = (id: number) => {
    console.log('Edit motoboy:', id);
  };

  const handleDelete = (id: number) => {
    console.log('Delete motoboy:', id);
  };

  const handleCreate = () => {
    if (onCreate) onCreate();
  };

  // Botão Novo Motoboy
  const rightContent = (
    <button
      onClick={() => setShowModal(true)}
      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 text-white hover:bg-purple-700 transition-colors font-medium text-sm rounded"
      style={{ height: '32px' }}
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
      </svg>
      Novo Motoboy
    </button>
  );

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Cabeçalho fixo */}
        <FixedPageHeader
          title="Motoboys"
          rightContent={rightContent}
        />
        
        {/* Espaço para não sobrepor o conteúdo */}
        <div className="h-[50px]" />

        {/* Content */}
        <div className="px-4 sm:px-6 pt-4 pb-12" style={{ paddingTop: '16px' }}>
          <MotoboysTable
            motoboys={data.motoboys}
            loading={data.loading}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onCreate={handleCreate}
          />
        </div>

        {/* Modal de Criar Usuário */}
        {showModal && (
          <ModalCriarUsuario
            isOpen={showModal}
            onClose={() => setShowModal(false)}
            onSuccess={() => {
              setShowModal(false);
              handleCreate();
            }}
            tipoUsuario="motoboy"
          />
        )}
      </div>
    </ErrorBoundary>
  );
}


