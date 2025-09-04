import { useState, useMemo, useCallback } from 'react';
import { Pedido } from '../../types/global/pedidos';
import { FiltrosHistoricoState, filtrosHistoricoSchema } from '../types/historico.types';

export function useFiltrosHistorico(pedidos: Pedido[]) {
  const [filtros, setFiltros] = useState<FiltrosHistoricoState>({
    status: 'todos',
    dataInicio: '',
    dataFim: '',
    formaPagamento: 'todos'
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  // Validar filtros antes de aplicar
  const filtrosValidados = useMemo(() => {
    try {
      return filtrosHistoricoSchema.parse(filtros);
    } catch (error) {
      console.warn('Filtros inválidos:', error);
      return filtros; // Retorna filtros originais se falhar na validação
    }
  }, [filtros]);

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter(pedido => {
      // Busca geral em todos os campos - otimizada
      const searchLower = searchTerm.toLowerCase();
      const matchSearch = searchTerm === '' || 
        pedido.numero.toLowerCase().includes(searchLower) ||
        pedido.cliente?.nome?.toLowerCase().includes(searchLower) ||
        pedido.cliente?.telefone?.includes(searchTerm) ||
        pedido.formaPagamento.toLowerCase().includes(searchLower) ||
        pedido.status.toLowerCase().includes(searchLower) ||
        pedido.total.toString().includes(searchTerm) ||
        pedido.itens.some(item => item.nome.toLowerCase().includes(searchLower));

      // Filtros usando dados validados
      const matchStatus = filtrosValidados.status === 'todos' || pedido.status === filtrosValidados.status;
      const matchPagamento = filtrosValidados.formaPagamento === 'todos' || pedido.formaPagamento === filtrosValidados.formaPagamento;
      
      // Filtro de data otimizado
      let matchData = true;
      if (filtrosValidados.dataInicio && filtrosValidados.dataFim) {
        const dataInicio = new Date(filtrosValidados.dataInicio);
        const dataFim = new Date(filtrosValidados.dataFim);
        const dataPedido = new Date(pedido.dataHora);
        
        // Ajustar dataFim para incluir o dia inteiro
        dataFim.setHours(23, 59, 59, 999);
        
        matchData = dataPedido >= dataInicio && dataPedido <= dataFim;
      }

      return matchSearch && matchStatus && matchPagamento && matchData;
    });
  }, [pedidos, filtrosValidados, searchTerm]);

  // Estatísticas dos filtros aplicados
  const estatisticasFiltros = useMemo(() => {
    const total = pedidos.length;
    const filtrados = pedidosFiltrados.length;
    const percentualFiltrado = total > 0 ? (filtrados / total) * 100 : 0;

    return {
      total,
      filtrados,
      percentualFiltrado: Math.round(percentualFiltrado)
    };
  }, [pedidos, pedidosFiltrados]);

  const handleFiltrosChange = useCallback((novosFiltros: FiltrosHistoricoState) => {
    try {
      // Validar antes de aplicar
      filtrosHistoricoSchema.parse(novosFiltros);
      setFiltros(novosFiltros);
    } catch (error) {
      console.warn('Tentativa de aplicar filtros inválidos:', error);
    }
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros({
      status: 'todos',
      dataInicio: '',
      dataFim: '',
      formaPagamento: 'todos'
    });
    setSearchTerm('');
  }, []);

  const temFiltrosAtivos = useCallback(() => {
    return filtros.status !== 'todos' ||
           filtros.dataInicio !== '' ||
           filtros.dataFim !== '' ||
           filtros.formaPagamento !== 'todos' ||
           searchTerm !== '';
  }, [filtros, searchTerm]);

  // Aplicar filtros com debounce para busca
  const aplicarFiltrosComDebounce = useCallback((novosFiltros: FiltrosHistoricoState) => {
    // Implementar debounce se necessário
    handleFiltrosChange(novosFiltros);
  }, [handleFiltrosChange]);

  return {
    filtros,
    filtrosValidados,
    searchTerm,
    pedidosFiltrados,
    estatisticasFiltros,
    handleFiltrosChange,
    aplicarFiltrosComDebounce,
    setSearchTerm,
    limparFiltros,
    temFiltrosAtivos
  };
} 