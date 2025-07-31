import React from 'react';
import { useLoja } from '../../context/lojaContext';
import { useAuth } from '../../hooks/useAuth';
import { Loader2, AlertCircle } from 'lucide-react';

interface LojaProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const LojaProtectedRoute: React.FC<LojaProtectedRouteProps> = ({ 
  children, 
  fallback 
}) => {
  const { status } = useAuth();
  const { loja, isLoading, error } = useLoja();

  // Se não estiver autenticado, não renderizar nada
  if (status === 'unauthenticated') {
    return null;
  }

  // Se estiver carregando, mostrar loading
  if (status === 'loading' || isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <p className="text-gray-600">Carregando dados da loja...</p>
        </div>
      </div>
    );
  }

  // Se houver erro, mostrar mensagem
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4 p-6 bg-red-50 rounded-lg">
          <AlertCircle className="h-8 w-8 text-red-600" />
          <h3 className="text-lg font-semibold text-red-800">Erro ao carregar loja</h3>
          <p className="text-red-600 text-center max-w-md">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  // Se não houver dados da loja, mostrar fallback ou mensagem padrão
  if (!loja) {
    if (fallback) {
      return <>{fallback}</>;
    }
    
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="flex flex-col items-center space-y-4 p-6 bg-yellow-50 rounded-lg">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
          <h3 className="text-lg font-semibold text-yellow-800">Loja não encontrada</h3>
          <p className="text-yellow-600 text-center max-w-md">
            Não foi possível carregar os dados da sua loja. 
            Entre em contato com o suporte.
          </p>
        </div>
      </div>
    );
  }

  // Se tudo estiver ok, renderizar os children
  return <>{children}</>;
}; 