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







  // Se tudo estiver ok, renderizar os children
  return <>{children}</>;
}; 
