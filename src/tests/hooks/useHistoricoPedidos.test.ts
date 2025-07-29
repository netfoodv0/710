import { renderHook, act, waitFor } from '@testing-library/react';
import { useHistoricoPedidos } from '../../hooks/useHistoricoPedidos';
import { historicoPedidoService } from '../../services/historicoPedidoService';

// Mock do serviço
jest.mock('../../services/historicoPedidoService', () => ({
  historicoPedidoService: {
    obterHistoricoComFiltros: jest.fn(),
    obterEstatisticas: jest.fn(),
    obterPedidosPorPeriodo: jest.fn(),
    obterPedidosPorCliente: jest.fn(),
    exportarHistoricoCSV: jest.fn()
  }
}));

const mockHistoricoPedidoService = historicoPedidoService as jest.Mocked<typeof historicoPedidoService>;

describe('useHistoricoPedidos', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default state', () => {
    const { result } = renderHook(() => useHistoricoPedidos());

    expect(result.current.pedidosHistorico).toEqual([]);
    expect(result.current.loading).toEqual({
      data: false,
      estatisticas: false,
      exportacao: false
    });
    expect(result.current.error).toBeNull();
    expect(result.current.estatisticas).toBeNull();
  });

  it('should load historico data successfully', async () => {
    const mockPedidos = [
      {
        id: '1',
        numero: '001',
        status: 'entregue',
        dataHora: new Date(),
        cliente: { nome: 'João', telefone: '123456789' },
        itens: [],
        total: 50,
        formaPagamento: 'pix',
        formaEntrega: 'delivery',
        origemPedido: 'pdv',
        pagamento: { valorPago: 50, statusPagamento: 'pago' },
        clienteNovo: false,
        tempoEstimado: '30 min'
      }
    ];

    mockHistoricoPedidoService.obterHistoricoComFiltros.mockResolvedValue(mockPedidos);
    mockHistoricoPedidoService.obterEstatisticas.mockResolvedValue({
      totalPedidos: 1,
      entregues: 1,
      cancelados: 0,
      valorTotal: 50,
      ticketMedio: 50,
      pedidosPorDia: [],
      topClientes: []
    });

    const { result } = renderHook(() => useHistoricoPedidos());

    await waitFor(() => {
      expect(result.current.pedidosHistorico).toEqual(mockPedidos);
      expect(result.current.loading.data).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it('should handle error when loading historico', async () => {
    const errorMessage = 'Erro ao carregar dados';
    mockHistoricoPedidoService.obterHistoricoComFiltros.mockRejectedValue(new Error(errorMessage));

    const { result } = renderHook(() => useHistoricoPedidos());

    await waitFor(() => {
      expect(result.current.error).toBe(errorMessage);
      expect(result.current.loading.data).toBe(false);
    });
  });

  it('should export historico successfully', async () => {
    const mockCsvContent = 'Número,Cliente,Total\n001,João,50';
    mockHistoricoPedidoService.exportarHistoricoCSV.mockResolvedValue(mockCsvContent);

    // Mock do DOM para download
    const mockLink = {
      setAttribute: jest.fn(),
      click: jest.fn(),
      style: { visibility: 'hidden' }
    };
    const mockCreateElement = jest.fn(() => mockLink);
    const mockAppendChild = jest.fn();
    const mockRemoveChild = jest.fn();
    const mockRevokeObjectURL = jest.fn();

    Object.defineProperty(document, 'createElement', {
      value: mockCreateElement,
      writable: true
    });
    Object.defineProperty(document.body, 'appendChild', {
      value: mockAppendChild,
      writable: true
    });
    Object.defineProperty(document.body, 'removeChild', {
      value: mockRemoveChild,
      writable: true
    });
    Object.defineProperty(URL, 'createObjectURL', {
      value: jest.fn(() => 'blob:url'),
      writable: true
    });
    Object.defineProperty(URL, 'revokeObjectURL', {
      value: mockRevokeObjectURL,
      writable: true
    });

    const { result } = renderHook(() => useHistoricoPedidos());

    await act(async () => {
      await result.current.exportarHistorico({});
    });

    expect(mockHistoricoPedidoService.exportarHistoricoCSV).toHaveBeenCalledWith({});
    expect(mockCreateElement).toHaveBeenCalledWith('a');
    expect(mockLink.click).toHaveBeenCalled();
    expect(mockRevokeObjectURL).toHaveBeenCalled();
  });

  it('should clear error when limparErro is called', () => {
    const { result } = renderHook(() => useHistoricoPedidos());

    // Simular erro
    act(() => {
      result.current.error = 'Test error';
    });

    expect(result.current.error).toBe('Test error');

    // Limpar erro
    act(() => {
      result.current.limparErro();
    });

    expect(result.current.error).toBeNull();
  });
}); 