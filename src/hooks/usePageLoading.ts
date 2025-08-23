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

    // Não mostrar loading para navegações entre páginas de relatórios, pedidos, dashboard E cardápio
    const isOptimizedNavigation = 
      // Navegações entre relatórios
      (currentPath.startsWith('/relatorios') && previousPathValue.startsWith('/relatorios')) ||
      (currentPath === '/historico' && previousPathValue === '/historico') ||
      (currentPath.startsWith('/relatorios') && previousPathValue === '/historico') ||
      (currentPath === '/historico' && previousPathValue.startsWith('/relatorios')) ||
      // Navegações entre pedidos e relatórios
      (currentPath === '/pedidos' && previousPathValue.startsWith('/relatorios')) ||
      (currentPath.startsWith('/relatorios') && previousPathValue === '/pedidos') ||
      (currentPath === '/pedidos' && previousPathValue === '/historico') ||
      (currentPath === '/historico' && previousPathValue === '/pedidos') ||
      // Navegações internas de pedidos
      (currentPath === '/pedidos' && previousPathValue === '/pedidos') ||
      // Navegações entre dashboard e outras páginas principais
      (currentPath === '/' && (previousPathValue === '/dashboard' || previousPathValue === '/pedidos' || previousPathValue.startsWith('/relatorios'))) ||
      (currentPath === '/dashboard' && (previousPathValue === '/' || previousPathValue === '/pedidos' || previousPathValue.startsWith('/relatorios'))) ||
      (currentPath === '/pedidos' && (previousPathValue === '/' || previousPathValue === '/dashboard')) ||
      (currentPath.startsWith('/relatorios') && (previousPathValue === '/' || previousPathValue === '/dashboard')) ||
      // Navegações envolvendo cardápio (incluindo sub-rotas)
      (currentPath.startsWith('/cardapio') || previousPathValue.startsWith('/cardapio')) ||
      // Navegações envolvendo configurações e horários (incluindo sub-rotas)
      (currentPath.startsWith('/configuracoes') || previousPathValue.startsWith('/configuracoes')) ||
      (currentPath.startsWith('/horarios') || previousPathValue.startsWith('/horarios'));

    // Não mostrar loading para navegações otimizadas
    if (isOptimizedNavigation) {
      console.log('🚀 Navegação otimizada - sem loading:', previousPathValue, '->', currentPath);
      previousPath.current = currentPath;
      return;
    }

    // Não mostrar loading para a mesma rota
    if (previousPathValue === currentPath) {
      return;
    }

    console.log('⏳ Mostrando loading para navegação:', previousPathValue, '->', currentPath);
    
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



