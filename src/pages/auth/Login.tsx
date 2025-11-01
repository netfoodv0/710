import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../components/auth/LoginForm';
import type { LoginFormData } from '../../types/global/auth';
import { DarkVeil } from '@/components/ui';

export default function Login() {
  const { login, status, error, user } = useAuth();
  const navigate = useNavigate();
  
  const isLoading = status === 'idle' || status === 'loading';

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (status === 'authenticated' && user) {
      navigate('/dashboard');
    }
  }, [status, user, navigate]);

  const handleLogin = async (data: LoginFormData) => {
    try {
      await login(data);
      navigate('/dashboard');
    } catch (error) {
      // Erro já é tratado pelo contexto
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (isLoading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        {/* Loading state - você pode adicionar um spinner aqui se desejar */}
      </div>
    );
  }

  // Se já estiver autenticado, não renderizar nada (será redirecionado)
  if (status === 'authenticated' && user) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Card da Esquerda - 40% */}
      <div className="w-full md:w-[40%] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden md:sticky md:top-0 md:h-screen">
        {/* DarkVeil Background */}
        <div className="absolute inset-0">
          <DarkVeil className="w-full h-full" />
        </div>
        
        {/* Conteúdo do card esquerdo */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-white">
          <div className="text-center max-w-md">
            <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h1>
            <p className="text-lg opacity-90 mb-8">
              Acesse sua conta e continue gerenciando seu negócio
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Gerencie seus pedidos em tempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Acompanhe vendas e estatísticas</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Controle completo do seu cardápio</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Relatórios detalhados de desempenho</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card da Direita - 60% */}
      <div className="w-full md:w-[60%] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Formulário de Login */}
          <LoginForm
            onSubmit={handleLogin}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
}
