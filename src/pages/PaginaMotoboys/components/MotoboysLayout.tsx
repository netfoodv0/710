import React from 'react';
import { AlertCircle } from 'lucide-react';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { MotoboysTable } from './MotoboysTable';
import { MotoboysLayoutProps } from '../types';

export function MotoboysLayout({ data }: MotoboysLayoutProps) {
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
    console.log('Create motoboy');
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen p-6">
        <MotoboysTable
          motoboys={data.motoboys}
          loading={data.loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onCreate={handleCreate}
        />
      </div>
    </ErrorBoundary>
  );
}
