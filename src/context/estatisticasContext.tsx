import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface EstatisticasGerais {
  totalPedidos: number;
  faturamentoTotal: number;
  clientesAtivos: number;
  ticketMedio: number;
}

interface EstatisticasClientes {
  totalClientes: number;
  novosClientes: number;
  clientesAtivos: number;
  taxaRetencao: number;
}

interface EstatisticasContextType {
  estatisticasGerais: EstatisticasGerais;
  estatisticasClientes: EstatisticasClientes;
  loading: boolean;
  error: string | null;
  atualizarEstatisticasGerais: (estatisticas: EstatisticasGerais) => void;
  atualizarEstatisticasClientes: (estatisticas: EstatisticasClientes) => void;
  recarregarEstatisticas: () => Promise<void>;
}

const EstatisticasContext = createContext<EstatisticasContextType | undefined>(undefined);

interface EstatisticasProviderProps {
  children: ReactNode;
}

export const EstatisticasProvider: React.FC<EstatisticasProviderProps> = ({ children }) => {
  const [estatisticasGerais, setEstatisticasGerais] = useState<EstatisticasGerais>({
    totalPedidos: 0,
    faturamentoTotal: 0,
    clientesAtivos: 0,
    ticketMedio: 0
  });

  const [estatisticasClientes, setEstatisticasClientes] = useState<EstatisticasClientes>({
    totalClientes: 0,
    novosClientes: 0,
    clientesAtivos: 0,
    taxaRetencao: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const atualizarEstatisticasGerais = useCallback((estatisticas: EstatisticasGerais) => {
    setEstatisticasGerais(estatisticas);
  }, []);

  const atualizarEstatisticasClientes = useCallback((estatisticas: EstatisticasClientes) => {
    setEstatisticasClientes(estatisticas);
  }, []);

  const recarregarEstatisticas = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Aqui você pode implementar a lógica para buscar dados do Firebase ou API
      // Por enquanto, vamos simular um delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Dados mockados para exemplo
      setEstatisticasGerais({
        totalPedidos: 1247,
        faturamentoTotal: 45678.90,
        clientesAtivos: 342,
        ticketMedio: 36.63
      });
      
      setEstatisticasClientes({
        totalClientes: 456,
        novosClientes: 28,
        clientesAtivos: 342,
        taxaRetencao: 75.2
      });
    } catch (err) {
      setError('Erro ao carregar estatísticas');
    } finally {
      setLoading(false);
    }
  }, []);

  const value: EstatisticasContextType = {
    estatisticasGerais,
    estatisticasClientes,
    loading,
    error,
    atualizarEstatisticasGerais,
    atualizarEstatisticasClientes,
    recarregarEstatisticas
  };

  return (
    <EstatisticasContext.Provider value={value}>
      {children}
    </EstatisticasContext.Provider>
  );
};

export const useEstatisticas = (): EstatisticasContextType => {
  const context = useContext(EstatisticasContext);
  if (context === undefined) {
    throw new Error('useEstatisticas deve ser usado dentro de um EstatisticasProvider');
  }
  return context;
};
