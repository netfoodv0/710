import { useState, useEffect, useCallback } from 'react';
import { firebasePedidoService } from '../../../services/firebasePedidoService';
import { PedidoEmAndamento } from '../types/dashboard.types';
import { Pedido } from '../../../types';
import { useAuth } from '../../../hooks/useAuth';

interface UsePedidosEmAndamentoReturn {
  pedidos: PedidoEmAndamento[];
  loading: boolean;
  error: string | null;
  refreshPedidos: () => void;
}

export const usePedidosEmAndamento = (): UsePedidosEmAndamentoReturn => {
  const { isAuthenticated } = useAuth();
  const [pedidos, setPedidos] = useState<PedidoEmAndamento[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const converterPedidoParaEmAndamento = useCallback((pedido: Pedido): PedidoEmAndamento => {
    return {
      id: pedido.id,
      numero: pedido.numero || `#${pedido.id.slice(-6)}`,
      cliente: pedido.cliente?.nome || 'Cliente não informado',
      status: pedido.status,
      total: pedido.total || 0,
      horario: pedido.dataHora ? pedido.dataHora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }) : undefined
    };
  }, []);

  const carregarPedidos = useCallback(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    // Configurar listener em tempo real para pedidos com status "pendente", "confirmado" e "pronto"
    const unsubscribe = firebasePedidoService.buscarPedidosTempoReal(
      { 
        status: ['pendente', 'confirmado', 'pronto'],
        limit: 15 // Aumentar limite para incluir mais pedidos
      },
      (pedidosFirebase: Pedido[]) => {
        try {
          const pedidosConvertidos = pedidosFirebase.map(converterPedidoParaEmAndamento);
          setPedidos(pedidosConvertidos);
          setError(null);
        } catch (err) {
          console.error('Erro ao converter pedidos:', err);
          setError('Erro ao processar pedidos');
        } finally {
          setLoading(false);
        }
      }
    );

    // Retornar função de limpeza
    return unsubscribe;
  }, [isAuthenticated, converterPedidoParaEmAndamento]);

  const refreshPedidos = useCallback(() => {
    carregarPedidos();
  }, [carregarPedidos]);

  useEffect(() => {
    const unsubscribe = carregarPedidos();
    
    // Cleanup function
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [carregarPedidos]);

  return {
    pedidos,
    loading,
    error,
    refreshPedidos
  };
};
