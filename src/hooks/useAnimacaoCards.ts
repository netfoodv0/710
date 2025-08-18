import { useState, useEffect, useCallback } from 'react';

interface UseAnimacaoCardsProps {
  percentuais: number[];
  duracaoAnimacao?: number;
  delayEntreCards?: number;
}

export const useAnimacaoCards = ({
  percentuais,
  duracaoAnimacao = 2000,
  delayEntreCards = 500
}: UseAnimacaoCardsProps) => {
  const [carregamentoCompleto, setCarregamentoCompleto] = useState(false);
  const [mostrarAnimacoes, setMostrarAnimacoes] = useState(true);
  const [alturasAnimadas, setAlturasAnimadas] = useState<number[]>([]);

  const animarCarregamento = useCallback(() => {
    setCarregamentoCompleto(false);
    setAlturasAnimadas(new Array(percentuais.length).fill(0));
    
    percentuais.forEach((percentualFinal, index) => {
      const delayInicial = index * delayEntreCards;
      const intervalos = 40;
      const incrementoPorPasso = percentualFinal / intervalos;
      
      setTimeout(() => {
        let passoAtual = 0;
        
        const animarPasso = () => {
          if (passoAtual < intervalos) {
            setAlturasAnimadas(prev => {
              const novas = [...prev];
              novas[index] = Math.min(incrementoPorPasso * passoAtual, percentualFinal);
              return novas;
            });
            
            passoAtual++;
            setTimeout(animarPasso, duracaoAnimacao / intervalos);
          }
        };
        
        animarPasso();
      }, delayInicial);
    });
    
    setTimeout(() => {
      setCarregamentoCompleto(true);
    }, percentuais.length * delayEntreCards + duracaoAnimacao);
  }, [percentuais, duracaoAnimacao, delayEntreCards]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregamentoCompleto(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    animarCarregamento();
  }, [animarCarregamento]);

  return {
    carregamentoCompleto,
    mostrarAnimacoes,
    alturasAnimadas,
    animarCarregamento
  };
};
