import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/authContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { status, user } = useAuth();
  const navigate = useNavigate();

  // Debug temporário
  console.log('ProtectedRoute - Status:', status);
  console.log('ProtectedRoute - User:', user);

  useEffect(() => {
    if (status === 'unauthenticated') {
      console.log('Redirecting to login...');
      navigate('/login');
    }
  }, [status, navigate]);

  // Se não estiver autenticado, não renderizar nada (será redirecionado)
  if (status === 'unauthenticated' || !user) {
    return null;
  }

  // Se estiver autenticado, renderizar o conteúdo
  return <>{children}</>;
}; 