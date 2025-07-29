import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { LoginForm } from '../components/auth/LoginForm';

export const Login: React.FC = () => {
  const { login, status, error, user } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (status === 'authenticated' && user) {
      navigate('/dashboard');
    }
  }, [status, user, navigate]);

  const handleLogin = async (data: { email: string; senha: string }) => {
    try {
      await login(data.email, data.senha);
      navigate('/dashboard');
    } catch (error) {
      // Erro já é tratado pelo contexto
    }
  };

  // Mostrar loading enquanto verifica autenticação
  if (status === 'idle' || status === 'loading') {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Formulário de Login */}
        <LoginForm
          onSubmit={handleLogin}
          isLoading={status === 'loading'}
          error={error}
        />
      </div>
    </div>
  );
}; 