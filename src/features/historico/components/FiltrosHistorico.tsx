import React, { useCallback, useMemo } from 'react';
import { Search, Filter, Calendar, X } from 'lucide-react';
import { FiltrosHistoricoState } from '../../types';

interface FiltrosHistoricoProps {
  filtros: FiltrosHistoricoState;
  onFiltrosChange: (filtros: FiltrosHistoricoState) => void;
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export const FiltrosHistorico = React.memo(function FiltrosHistorico({ 
  filtros, 
  onFiltrosChange, 
  searchTerm, 
  onSearchChange 
}: FiltrosHistoricoProps) {
  
  const handleFiltroChange = useCallback((campo: string, valor: string) => {
    onFiltrosChange({
      ...filtros,
      [campo]: valor
    });
  }, [filtros, onFiltrosChange]);

  const limparFiltros = useCallback(() => {
    onFiltrosChange({
      status: 'todos',
      dataInicio: '',
      dataFim: '',
      formaPagamento: 'todos'
    });
    onSearchChange('');
  }, [onFiltrosChange, onSearchChange]);

  const temFiltrosAtivos = useMemo(() => {
    return filtros.status !== 'todos' ||
           filtros.dataInicio !== '' ||
           filtros.dataFim !== '' ||
           filtros.formaPagamento !== 'todos' ||
           searchTerm !== '';
  }, [filtros, searchTerm]);

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  }, [onSearchChange]);

  return (
    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="space-y-4">
        {/* Cabeçalho dos filtros */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Filtros</h3>
          </div>
          
          {temFiltrosAtivos && (
            <button
              onClick={limparFiltros}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-3 h-3" />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Filtros em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro por Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status
            </label>
            <select
              value={filtros.status}
              onChange={(e) => handleFiltroChange('status', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="todos">Todos os Status</option>
              <option value="entregue">Entregue</option>
              <option value="cancelado">Cancelado</option>
            </select>
          </div>

          {/* Filtro por Forma de Pagamento */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Forma de Pagamento
            </label>
            <select
              value={filtros.formaPagamento}
              onChange={(e) => handleFiltroChange('formaPagamento', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
            >
              <option value="todos">Todas as Formas</option>
              <option value="dinheiro">Dinheiro</option>
              <option value="pix">PIX</option>
              <option value="cartao">Cartão</option>
            </select>
          </div>

          {/* Filtro por Data Início */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Data Início
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filtro por Data Fim */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Data Fim
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
              <input
                type="date"
                value={filtros.dataFim}
                onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
                className="w-full pl-8 pr-3 py-2 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Barra de pesquisa principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-3 h-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar por número do pedido, cliente, telefone, forma de pagamento, status..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-8 pr-4 h-8 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-gray-500 focus:border-transparent"
          />
        </div>

        {/* Indicador de filtros ativos */}
        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filtros.status !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Status: {filtros.status === 'entregue' ? 'Entregue' : 'Cancelado'}
              </span>
            )}
            {filtros.formaPagamento !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Pagamento: {filtros.formaPagamento}
              </span>
            )}
            {(filtros.dataInicio || filtros.dataFim) && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Período: {filtros.dataInicio} - {filtros.dataFim}
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Busca: {searchTerm}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}); 