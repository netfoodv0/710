import React from 'react';
import { AlertCircle } from 'lucide-react';
import { PageHeader } from '../../../components/ui';
import { NotificationToast } from '../../../components/NotificationToast';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { UsuariosMenu } from './UsuariosMenu';
import { UsuariosLayoutProps } from '../types';

export function UsuariosLayout({ data }: UsuariosLayoutProps) {
  // Error state
  if (data.error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar usuários</h3>
          </div>
          <p className="text-red-700 mb-4">{data.error}</p>
          <div className="flex gap-3">
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Cabeçalho da página */}
        <PageHeader
          title="Usuários"
          subtitle="Gerencie operadores e motoboys do sistema"
        />

        {/* Conteúdo principal */}
        <div className="px-6 py-6 space-y-6">
          {/* Menu de navegação */}
          <UsuariosMenu onNavigate={(path) => {
            // Navegação será tratada pelo React Router
            console.log('Navigate to:', path);
          }} />
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
