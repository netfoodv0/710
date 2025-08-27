import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const AutoRedirect: React.FC = () => {
  const { status, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Se estiver na rota raiz e autenticado, redirecionar para dashboard
    if (location.pathname === '/' && status === 'authenticated' && user) {
      navigate('/dashboard', { replace: true });
    }
  }, [location.pathname, status, user, navigate]);

  return null;
};
