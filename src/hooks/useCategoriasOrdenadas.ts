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

  // Carregar ordem salva do localStorage
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
    
    // Se não há ordem salva ou é inválida, usar ordem padrão
    if (categorias.length > 0) {
      setCategoriasOrdenadas([...categorias]);
    }
  }, [categorias, storageKey]);

  // Atualizar automaticamente quando novas categorias são adicionadas
  useEffect(() => {
    if (categorias.length > 0) {
      // Se não há categorias ordenadas, usar todas as categorias
      if (categoriasOrdenadas.length === 0) {
        console.log('🆕 Primeira inicialização das categorias:', categorias);
        setCategoriasOrdenadas([...categorias]);
        return;
      }

      // Verificar se há novas categorias
      const novasCategorias = categorias.filter(cat => !categoriasOrdenadas.includes(cat));
      if (novasCategorias.length > 0) {
        console.log('🆕 Novas categorias detectadas:', novasCategorias);
        console.log('🆕 Categorias existentes:', categoriasOrdenadas);
        
        // Adicionar novas categorias ao final da lista ordenada
        const novaOrdem = [...categoriasOrdenadas, ...novasCategorias];
        console.log('🆕 Nova ordem completa:', novaOrdem);
        
        setCategoriasOrdenadas(novaOrdem);
        
        // Salvar nova ordem no localStorage
        try {
          localStorage.setItem(storageKey, JSON.stringify(novaOrdem));
          console.log('💾 Nova ordem salva no localStorage');
        } catch (error) {
          console.warn('Erro ao salvar nova ordem das categorias:', error);
        }
      }
    }
  }, [categorias]); // Remover dependências que causam loops

  // Salvar nova ordem no localStorage
  const reordenarCategorias = useCallback((novasCategorias: string[]) => {
    setCategoriasOrdenadas(novasCategorias);
    
    try {
      localStorage.setItem(storageKey, JSON.stringify(novasCategorias));
    } catch (error) {
      console.warn('Erro ao salvar ordem das categorias:', error);
    }
  }, [storageKey]);

  // Resetar para ordem padrão
  const resetarOrdem = useCallback(() => {
    const ordemPadrao = [...categorias];
    setCategoriasOrdenadas(ordemPadrao);
    
    try {
      localStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Erro ao resetar ordem das categorias:', error);
    }
  }, [categorias, storageKey]);

  return {
    categoriasOrdenadas,
    reordenarCategorias,
    resetarOrdem
  };
}
