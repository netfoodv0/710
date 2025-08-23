import { useState, useEffect } from 'react';

export const useCardapioSkeleton = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular loading por exatamente 1 segundo
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return isLoading;
};
