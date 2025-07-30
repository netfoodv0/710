import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { Loader2, Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireLoja?: boolean; // Se true, verifica se o usuário tem uma loja
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireLoja = true 
}) => {
  const { status, user, loja, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Se não estiver autenticado, redirecionar para login
    if (status === 'unauthenticated') {
      console.log('Usuário não autenticado, redirecionando para login...');
      navigate('/login', { replace: true });
      return;
    }

    // Se requer loja mas o usuário não tem uma loja configurada
    if (requireLoja && status === 'authenticated' && !loja) {
      console.log('Usuário autenticado mas sem loja, redirecionando para configurações...');
      navigate('/configuracoes', { replace: true });
      return;
    }
  }, [status, user, loja, navigate, requireLoja]);

  // Loading state
  if (status === 'idle' || status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-slate-600">Carregando...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (status === 'error') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <Shield className="w-8 h-8 text-red-600 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-800 mb-2">Erro de Autenticação</h3>
          <p className="text-red-600 mb-4">Ocorreu um erro ao verificar sua autenticação</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Tentar Novamente
          </button>
        </div>
      </div>
    );
  }

  // Se não estiver autenticado, não renderizar nada (será redirecionado)
  if (!isAuthenticated) {
    return null;
  }

  // Se requer loja mas não tem loja, não renderizar nada
  if (requireLoja && !loja) {
    return null;
  }

  // Se estiver autenticado e com loja (se requerida), renderizar o conteúdo
  return <>{children}</>;
}; 