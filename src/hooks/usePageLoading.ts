import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/loadingContext';

export const usePageLoading = () => {
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();

  useEffect(() => {
    // Mostra o carregamento quando a rota muda
    showLoading();

    // Esconde o carregamento após 1 segundo
    const timer = setTimeout(() => {
      hideLoading();
    }, 1000);

    // Cleanup do timer
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, showLoading, hideLoading]);
};

