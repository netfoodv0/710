import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useLoading } from '../context/loadingContext';

export const usePageLoading = () => {
  const location = useLocation();
  const { showLoading, hideLoading } = useLoading();
  const previousPath = useRef(location.pathname);
  const isInitialRender = useRef(true);

  useEffect(() => {
    const currentPath = location.pathname;
    const previousPathValue = previousPath.current;

    // Não mostrar loading na primeira renderização
    if (isInitialRender.current) {
      isInitialRender.current = false;
      previousPath.current = currentPath;
      return;
    }

    // Não mostrar loading para navegações entre páginas de relatórios
    const isRelatoriosNavigation = 
      (currentPath.startsWith('/relatorios') && previousPathValue.startsWith('/relatorios')) ||
      (currentPath === '/historico' && previousPathValue === '/historico') ||
      (currentPath.startsWith('/relatorios') && previousPathValue === '/historico') ||
      (currentPath === '/historico' && previousPathValue.startsWith('/relatorios'));

    // Não mostrar loading para navegações internas de relatórios
    if (isRelatoriosNavigation) {
      previousPath.current = currentPath;
      return;
    }

    // Não mostrar loading para a mesma rota
    if (previousPathValue === currentPath) {
      return;
    }

    // Mostra o carregamento apenas para outras mudanças de rota
    showLoading();

    // Esconde o carregamento após 500ms (reduzido ainda mais)
    const timer = setTimeout(() => {
      hideLoading();
    }, 500);

    // Atualiza o path anterior
    previousPath.current = currentPath;

    // Cleanup do timer
    return () => {
      clearTimeout(timer);
    };
  }, [location.pathname, showLoading, hideLoading]);
};



