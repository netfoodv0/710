import { useState, useMemo, useCallback } from 'react';
import { FiltrosRelatoriosState, DadosRelatorios } from '../types/relatorios.types';

export function useFiltrosRelatorios(dados: DadosRelatorios | null) {
  const [filtros, setFiltros] = useState<FiltrosRelatoriosState>({
    categoria: 'todas',
    formaPagamento: 'todos',
    dataInicio: '',
    dataFim: '',
    status: 'todos'
  });

  const handleFiltrosChange = useCallback((novosFiltros: Partial<FiltrosRelatoriosState>) => {
    setFiltros(prev => ({ ...prev, ...novosFiltros }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros({
      categoria: 'todas',
      formaPagamento: 'todos',
      dataInicio: '',
      dataFim: '',
      status: 'todos'
    });
  }, []);

  const dadosFiltrados = useMemo(() => {
    console.log('🔍 useFiltrosRelatorios: Processando dados:', dados);
    console.log('🔍 useFiltrosRelatorios: Filtros ativos:', filtros);
    
    if (!dados) {
      console.log('❌ useFiltrosRelatorios: Nenhum dado disponível');
      return null;
    }

    // Aplicar filtros aos dados
    let dadosProcessados = { ...dados };

    // Filtrar vendas por categoria
    if (filtros.categoria !== 'todas') {
      dadosProcessados.vendasPorCategoria = dados.vendasPorCategoria.filter(
        venda => venda.categoria === filtros.categoria
      );
    }

    // Filtrar formas de pagamento
    if (filtros.formaPagamento !== 'todos') {
      dadosProcessados.formasPagamento = dados.formasPagamento.filter(
        forma => forma.tipo === filtros.formaPagamento
      );
    }

    // Filtrar top produtos por categoria
    if (filtros.categoria !== 'todas') {
      dadosProcessados.topProdutos = dados.topProdutos.filter(
        produto => produto.categoria === filtros.categoria
      );
    }

    // Filtrar por valor mínimo e máximo
    if (filtros.valorMinimo || filtros.valorMaximo) {
      dadosProcessados.topProdutos = dadosProcessados.topProdutos.filter(produto => {
        const valor = produto.receitaGerada;
        const minimo = filtros.valorMinimo || 0;
        const maximo = filtros.valorMaximo || Infinity;
        return valor >= minimo && valor <= maximo;
      });
    }

    // Recalcular KPIs baseado nos filtros
    if (filtros.categoria !== 'todas' || filtros.formaPagamento !== 'todos') {
      const receitaFiltrada = dadosProcessados.vendasPorCategoria.reduce(
        (total, venda) => total + venda.valor, 0
      );
      
      const pedidosFiltrados = dadosProcessados.vendasPorCategoria.reduce(
        (total, venda) => total + venda.quantidade, 0
      );

      dadosProcessados.kpis = {
        ...dados.kpis,
        receitaTotal: receitaFiltrada,
        pedidosTotal: pedidosFiltrados,
        ticketMedio: pedidosFiltrados > 0 ? receitaFiltrada / pedidosFiltrados : 0
      };
    }

    return dadosProcessados;
  }, [dados, filtros]);

  const temFiltrosAtivos = useMemo(() => {
    return filtros.categoria !== 'todas' ||
           filtros.formaPagamento !== 'todos' ||
           filtros.dataInicio !== '' ||
           filtros.dataFim !== '' ||
           filtros.status !== 'todos' ||
           filtros.valorMinimo !== undefined ||
           filtros.valorMaximo !== undefined;
  }, [filtros]);

  return {
    filtros,
    dadosFiltrados,
    handleFiltrosChange,
    limparFiltros,
    temFiltrosAtivos
  };
}