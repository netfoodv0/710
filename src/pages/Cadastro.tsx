import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import { CadastroForm } from '../components/auth/CadastroForm';
import type { CadastroLojaFormData } from '../types/auth';

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

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Formulário de Cadastro */}
        <CadastroForm
          onSubmit={handleCadastro}
          isLoading={status === 'loading'}
          error={error}
        />
      </div>
    </div>
  );
}; 