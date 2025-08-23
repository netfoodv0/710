import { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';
import { useOptimizedNavigation } from './useOptimizedNavigation';
import { MenuItem, SidebarState, SidebarActions } from '../types/sidebar';

export const useSidebarActions = (): [SidebarState, SidebarActions] => {
  const location = useLocation();
  const { logout } = useAuth();
  const { navigateTo } = useOptimizedNavigation();
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());

  // Expandir automaticamente os subtítulos quando estiver em uma página de relatório, estoque ou usuários
  useEffect(() => {
    if (location.pathname.startsWith('/relatorios')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/relatorios');
        return newSet;
      });
    }
    if (location.pathname.startsWith('/estoque')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/estoque');
        return newSet;
      });
    }
    if (location.pathname.startsWith('/usuarios')) {
      setExpandedItems(prev => {
        const newSet = new Set(prev);
        newSet.add('/usuarios');
        return newSet;
      });
    }
  }, [location.pathname]);

  const handleNavigation = useCallback((path: string) => {
    navigateTo(path);
  }, [navigateTo]);

  const toggleSubItems = useCallback((itemPath: string) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemPath)) {
        newSet.delete(itemPath);
      } else {
        newSet.add(itemPath);
      }
      return newSet;
    });
  }, []);

  const isExpanded = useCallback((itemPath: string) => {
    return expandedItems.has(itemPath);
  }, [expandedItems]);

  const handleItemClick = useCallback((item: MenuItem) => {
    if (item.subItems && item.subItems.length > 0) {
      // Se tem subitens, apenas expande/colapsa
      toggleSubItems(item.path);
    } else {
      // Se não tem subitens, navega
      handleNavigation(item.path);
    }
  }, [toggleSubItems, handleNavigation]);

  const isItemActive = useCallback((item: MenuItem) => {
    if (item.subItems && item.subItems.length > 0) {
      // Para itens com subitens, NUNCA são considerados ativos
      // Apenas expandem/colapsam
      return false;
    } else {
      // Para itens sem subitens, verifica se a rota atual é igual
      return location.pathname === item.path;
    }
  }, [location.pathname]);

  const isSubItemActive = useCallback((subItem: MenuItem) => {
    return location.pathname === subItem.path;
  }, [location.pathname]);

  const state: SidebarState = {
    expandedItems
  };

  const actions: SidebarActions = {
    handleNavigation,
    toggleSubItems,
    handleItemClick,
    isExpanded,
    isItemActive,
    isSubItemActive,
    logout
  };

  return [state, actions];
};
