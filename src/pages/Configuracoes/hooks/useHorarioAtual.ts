import { useState, useEffect } from 'react';

export function useHorarioAtual() {
  const [horarioAtual, setHorarioAtual] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setHorarioAtual(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return horarioAtual;
}
