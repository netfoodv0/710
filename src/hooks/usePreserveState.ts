import { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Hook para preservar estado entre navegações
 * Útil para evitar recarregamento desnecessário de dados
 */
export function usePreserveState<T>(
  initialState: T,
  key: string,
  dependencies: any[] = []
): [T, (value: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(initialState);
  const location = useLocation();
  const isInitialMount = useRef(true);
  const savedState = useRef<Map<string, T>>(new Map());

  // Salvar estado quando mudar de rota
  useEffect(() => {
    if (!isInitialMount.current) {
      savedState.current.set(key, state);
    }
    isInitialMount.current = false;
  }, [location.pathname, key, state]);

  // Restaurar estado quando voltar para a rota
  useEffect(() => {
    const saved = savedState.current.get(key);
    if (saved && !isInitialMount.current) {
      setState(saved);
    }
  }, [location.pathname, key]);

  // Limpar estado quando dependências mudarem
  useEffect(() => {
    if (dependencies.length > 0) {
      savedState.current.delete(key);
    }
  }, dependencies);

  return [state, setState];
}

/**
 * Hook para cache de dados com expiração
 */
export function useDataCache<T>(
  key: string,
  fetchData: () => Promise<T>,
  ttl: number = 5 * 60 * 1000 // 5 minutos padrão
): [T | null, boolean, () => Promise<void>] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const cache = useRef<Map<string, { data: T; timestamp: number }>>(new Map());

  const loadData = async () => {
    const cached = cache.current.get(key);
    const now = Date.now();

    // Verificar se cache é válido
    if (cached && (now - cached.timestamp) < ttl) {
      setData(cached.data);
      return;
    }

    setLoading(true);
    try {
      const newData = await fetchData();
      setData(newData);
      cache.current.set(key, { data: newData, timestamp: now });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  return [data, loading, loadData];
}
