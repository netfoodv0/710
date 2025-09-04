import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { LoginForm } from '../../components/auth/LoginForm';
import { RotatingText, DarkVeil } from '@/components/ui';

export default function Login() {
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

  // Se já estiver autenticado, não renderizar nada (será redirecionado)
  if (status === 'authenticated' && user) {
    return null;
  }

  return (
    <div className="min-h-screen flex">
      {/* Card da Esquerda - 30% */}
      <div className="w-[30%] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden">
        {/* DarkVeil Background */}
        <div className="absolute inset-0">
          <DarkVeil className="w-full h-full" />
        </div>
        {/* Textura de fundo removida */}
        
        {/* Conteúdo do card esquerdo */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Bem-vindo de volta!</h1>
            <p className="text-lg opacity-90 mb-4">
              Acesse sua conta e gerencie seu negócio com facilidade
            </p>
            {/* Removed text "O sistema Voult é ..." as requested */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Dashboard completo</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Gestão de pedidos em tempo real</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Relatórios detalhados</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card da Direita - 70% */}
      <div className="w-[70%] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Formulário de Login */}
          <LoginForm
            onSubmit={handleLogin}
            isLoading={status === 'loading'}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};
