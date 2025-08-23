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



  useEffect(() => {
    const timer = setTimeout(() => {
      setCarregamentoCompleto(true);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (percentuais.length > 0) {
      // Inicializar alturas
      setAlturasAnimadas(new Array(percentuais.length).fill(0));
      
      // Animar cada card
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
      
      // Marcar como completo
      setTimeout(() => {
        setCarregamentoCompleto(true);
      }, percentuais.length * delayEntreCards + duracaoAnimacao);
    }
  }, [percentuais, duracaoAnimacao, delayEntreCards]);

  return {
    carregamentoCompleto,
    mostrarAnimacoes,
    alturasAnimadas
  };
};
