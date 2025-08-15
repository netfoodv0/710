import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { CadastroForm } from '../components/auth/CadastroForm';
import type { CadastroLojaFormData } from '../types/auth';
import { DarkVeil } from '@/components/ui';

export const Cadastro: React.FC = () => {
  const { cadastrarLoja, status, error, user } = useAuth();
  const navigate = useNavigate();

  // Redirecionar se já estiver logado
  useEffect(() => {
    if (status === 'authenticated' && user) {
      navigate('/dashboard');
    }
  }, [status, user, navigate]);

  const handleCadastro = async (data: CadastroLojaFormData) => {
    try {
      await cadastrarLoja(data);
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
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Card da Esquerda - 30% */}
      <div className="w-full md:w-[30%] bg-gradient-to-br from-purple-600 via-purple-700 to-purple-800 relative overflow-hidden md:sticky md:top-0 md:h-screen">
        {/* DarkVeil Background */}
        <div className="absolute inset-0">
          <DarkVeil className="w-full h-full" />
        </div>
        
        {/* Conteúdo do card esquerdo */}
        <div className="relative z-10 h-full flex flex-col justify-center items-center p-8 text-white">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Crie sua conta!</h1>
            <p className="text-lg opacity-90 mb-8">
              Cadastre sua loja e comece a vender online hoje mesmo
            </p>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Cadastro rápido e fácil</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Comece a vender imediatamente</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-sm">Ferramentas completas de gestão</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Card da Direita - 70% */}
      <div className="w-full md:w-[70%] bg-white flex items-center justify-center p-8">
        <div className="w-full max-w-2xl">
          {/* Formulário de Cadastro */}
          <CadastroForm
            onSubmit={handleCadastro}
            isLoading={status === 'loading'}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};