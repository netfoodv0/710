import { useCallback } from 'react';

export function usePaginaEmBrancoTranslation() {
  const t = useCallback((key: string): string => {
    // Implemente aqui a lógica de tradução
    // Por enquanto, retorna a chave como está
    return key;
  }, []);

  return { t };
}