import { useState, useEffect, useCallback } from 'react';

interface UseCategoriasOrdenadasProps {
  categorias: string[];
  storageKey?: string;
}

export function useCategoriasOrdenadas({ 
  categorias, 
  storageKey = 'categorias-ordenadas' 
}: UseCategoriasOrdenadasProps) {
  const [categoriasOrdenadas, setCategoriasOrdenadas] = useState<string[]>([]);

  // ✅ CORREÇÃO: Carregar ordem salva do localStorage, mantendo posições fixas
  useEffect(() => {
    try {
      const savedOrder = localStorage.getItem(storageKey);
      if (savedOrder) {
        const parsedOrder = JSON.parse(savedOrder);
        // Filtrar apenas categorias que ainda existem
        const validOrder = parsedOrder.filter((cat: string) => 
          categorias.includes(cat)
        );
        if (validOrder.length > 0) {
          setCategoriasOrdenadas(validOrder);
          return;
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar ordem das categorias:', error);
    }
    
    // Se não há ordem salva ou é inválida, usar ordem alfabética por nome
    if (categorias.length > 0) {
      const ordemAlfabetica = [...categorias].sort((a, b) => a.localeCompare(b));
      setCategoriasOrdenadas(ordemAlfabetica);
    }
  }, [categorias, storageKey]);

  // ✅ CORREÇÃO: Atualizar automaticamente quando novas categorias são adicionadas, mantendo ordem
  useEffect(() => {
    if (categorias.length > 0) {
      // Se não há categorias ordenadas, usar todas as categorias
      if (categoriasOrdenadas.length === 0) {
        setCategoriasOrdenadas([...categorias]);
        return;
      }

      // Verificar se há novas categorias
      const novasCategorias = categorias.filter(cat => !categoriasOrdenadas.includes(cat));
      if (novasCategorias.length > 0) {
        // Adicionar novas categorias ao final da lista ordenada
        const novaOrdem = [...categoriasOrdenadas, ...novasCategorias];
        
        setCategoriasOrdenadas(novaOrdem);
        
        // Salvar nova ordem no localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(novaOrdem));
        } catch (error) {
          console.warn('Erro ao salvar nova ordem das categorias:', error);
        }
      }
    }
  }, [categorias, categoriasOrdenadas.length, storageKey]);

  // ✅ CORREÇÃO: Salvar nova ordem no localStorage, garantindo posições fixas
  const reordenarCategorias = useCallback((novasCategorias: string[]) => {
    setCategoriasOrdenadas(novasCategorias);
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(novasCategorias));
    } catch (error) {
      console.warn('Erro ao salvar ordem das categorias:', error);
    }
  }, [storageKey]);

  // ✅ CORREÇÃO: Resetar para ordem alfabética por nome
  const resetarOrdem = useCallback(() => {
    if (categorias.length > 0) {
      const ordemAlfabetica = [...categorias].sort((a, b) => a.localeCompare(b));
      setCategoriasOrdenadas(ordemAlfabetica);
      
      try {
        localStorage.setItem(storageKey, JSON.stringify(ordemAlfabetica));
      } catch (error) {
        console.warn('Erro ao salvar ordem alfabética das categorias:', error);
      }
    }
  }, [categorias, storageKey]);

  return {
    categoriasOrdenadas,
    reordenarCategorias,
    resetarOrdem
  };
}
