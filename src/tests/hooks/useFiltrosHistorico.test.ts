import { renderHook, act } from '@testing-library/react';
import { useFiltrosHistorico } from '../../hooks/useFiltrosHistorico';
import { Pedido } from '../../types';

const mockPedidos: Pedido[] = [
  {
    id: '1',
    numero: '001',
    status: 'entregue',
    dataHora: new Date('2024-01-15T10:00:00'),
    cliente: { nome: 'João Silva', telefone: '123456789' },
    itens: [{ id: '1', nome: 'Hambúrguer', quantidade: 1, preco: 25 }],
    total: 25,
    formaPagamento: 'pix',
    formaEntrega: 'delivery',
    origemPedido: 'pdv',
    pagamento: { valorPago: 25, statusPagamento: 'pago' },
    clienteNovo: false,
    tempoEstimado: '30 min'
  },
  {
    id: '2',
    numero: '002',
    status: 'cancelado',
    dataHora: new Date('2024-01-16T14:00:00'),
    cliente: { nome: 'Maria Santos', telefone: '987654321' },
    itens: [{ id: '2', nome: 'Pizza', quantidade: 1, preco: 35 }],
    total: 35,
    formaPagamento: 'dinheiro',
    formaEntrega: 'retirada',
    origemPedido: 'cardapio_digital',
    pagamento: { valorPago: 0, statusPagamento: 'cancelado' },
    clienteNovo: true,
    tempoEstimado: '45 min'
  }
];

describe('useFiltrosHistorico', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    expect(result.current.filtros).toEqual({
      status: 'todos',
      dataInicio: '',
      dataFim: '',
      formaPagamento: 'todos'
    });
    expect(result.current.searchTerm).toBe('');
    expect(result.current.pedidosFiltrados).toEqual(mockPedidos);
  });

  it('should filter by status', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        status: 'entregue'
      });
    });

    expect(result.current.pedidosFiltrados).toHaveLength(1);
    expect(result.current.pedidosFiltrados[0].status).toBe('entregue');
  });

  it('should filter by payment method', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        formaPagamento: 'pix'
      });
    });

    expect(result.current.pedidosFiltrados).toHaveLength(1);
    expect(result.current.pedidosFiltrados[0].formaPagamento).toBe('pix');
  });

  it('should filter by date range', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        dataInicio: '2024-01-15',
        dataFim: '2024-01-15'
      });
    });

    expect(result.current.pedidosFiltrados).toHaveLength(1);
    expect(result.current.pedidosFiltrados[0].numero).toBe('001');
  });

  it('should filter by search term', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    act(() => {
      result.current.setSearchTerm('João');
    });

    expect(result.current.pedidosFiltrados).toHaveLength(1);
    expect(result.current.pedidosFiltrados[0].cliente?.nome).toBe('João Silva');
  });

  it('should clear filters', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    // Aplicar filtros
    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        status: 'entregue'
      });
      result.current.setSearchTerm('test');
    });

    expect(result.current.pedidosFiltrados).toHaveLength(1);

    // Limpar filtros
    act(() => {
      result.current.limparFiltros();
    });

    expect(result.current.filtros.status).toBe('todos');
    expect(result.current.searchTerm).toBe('');
    expect(result.current.pedidosFiltrados).toEqual(mockPedidos);
  });

  it('should detect active filters', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    // Sem filtros ativos
    expect(result.current.temFiltrosAtivos()).toBe(false);

    // Com filtros ativos
    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        status: 'entregue'
      });
    });

    expect(result.current.temFiltrosAtivos()).toBe(true);
  });

  it('should provide filter statistics', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    expect(result.current.estatisticasFiltros).toEqual({
      total: 2,
      filtrados: 2,
      percentualFiltrado: 100
    });

    // Aplicar filtro
    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        status: 'entregue'
      });
    });

    expect(result.current.estatisticasFiltros).toEqual({
      total: 2,
      filtrados: 1,
      percentualFiltrado: 50
    });
  });

  it('should handle invalid filters gracefully', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    // Tentar aplicar filtro inválido
    act(() => {
      result.current.handleFiltrosChange({
        ...result.current.filtros,
        status: 'invalid_status' as any
      });
    });

    // Deve manter o estado anterior
    expect(result.current.filtros.status).toBe('todos');
  });

  it('should combine multiple filters', () => {
    const { result } = renderHook(() => useFiltrosHistorico(mockPedidos));

    act(() => {
      result.current.handleFiltrosChange({
        status: 'entregue',
        dataInicio: '2024-01-15',
        dataFim: '2024-01-15',
        formaPagamento: 'pix'
      });
    });

    expect(result.current.pedidosFiltrados).toHaveLength(1);
    expect(result.current.pedidosFiltrados[0].numero).toBe('001');
  });
}); 