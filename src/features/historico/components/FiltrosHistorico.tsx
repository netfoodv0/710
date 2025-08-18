import React, { useCallback, useMemo } from 'react';
import { Search, Filter, Calendar, X, CheckCircle, XCircle, CreditCard, DollarSign, QrCode } from 'lucide-react';
import { SettingsIcon } from '../../../components/ui';
import { FiltrosHistoricoState } from '../../types';
import { CustomDropdown, DropdownOption } from '../../../components/ui/CustomDropdown';
import { InputPersonalizado } from '../../../components/forms/InputPersonalizado';

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

  // Opções para os dropdowns
  const statusOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todos os Status' },
    { value: 'entregue', label: 'Entregue', icon: <CheckCircle className="w-4 h-4 text-green-500" /> },
    { value: 'cancelado', label: 'Cancelado', icon: <XCircle className="w-4 h-4 text-red-500" /> }
  ];

  const formaPagamentoOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todas as Formas' },
    { value: 'dinheiro', label: 'Dinheiro', icon: <DollarSign className="w-4 h-4 text-green-600" /> },
    { value: 'pix', label: 'PIX', icon: <QrCode className="w-4 h-4 text-blue-600" /> },
    { value: 'cartao', label: 'Cartão', icon: <CreditCard className="w-4 h-4 text-purple-600" /> }
  ];

  return (
    <div className="space-y-4">
        {/* Cabeçalho dos filtros */}
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-gray-500" />
          <h3 className="text-sm font-semibold text-gray-900">Filtros</h3>
        </div>

        {/* Filtros em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Filtro por Status */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Status
            </label>
            <CustomDropdown
              options={statusOptions}
              selectedValue={filtros.status}
              onValueChange={(value) => handleFiltroChange('status', value)}
              size="sm"
            />
          </div>

          {/* Filtro por Forma de Pagamento */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Forma de Pagamento
            </label>
            <CustomDropdown
              options={formaPagamentoOptions}
              selectedValue={filtros.formaPagamento}
              onValueChange={(value) => handleFiltroChange('formaPagamento', value)}
              size="sm"
            />
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
        <InputPersonalizado
          name="search"
          type="search"
          value={searchTerm}
          onChange={(value) => onSearchChange(value as string)}
          placeholder="Buscar por número do pedido, cliente, telefone, forma de pagamento, status..."
          icon={<Search className="w-4 h-4" />}
          size="md"
          variant="default"
          className="w-full"
          inputClassName="pl-12"
        />

        {/* Indicador de filtros ativos */}
        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 pt-2">
            {filtros.status !== 'todos' && (
              <span className="inline-flex items-center gap-2 px-3 h-7 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                <span>Status: {filtros.status === 'entregue' ? 'Entregue' : 'Cancelado'}</span>
                <button
                  onClick={() => handleFiltroChange('status', 'todos')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {filtros.formaPagamento !== 'todos' && (
              <span className="inline-flex items-center gap-2 px-3 h-7 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                <span>Pagamento: {filtros.formaPagamento}</span>
                <button
                  onClick={() => handleFiltroChange('formaPagamento', 'todos')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {(filtros.dataInicio || filtros.dataFim) && (
              <span className="inline-flex items-center gap-2 px-3 h-7 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                <span>Período: {filtros.dataInicio} - {filtros.dataFim}</span>
                <button
                  onClick={() => {
                    handleFiltroChange('dataInicio', '');
                    handleFiltroChange('dataFim', '');
                  }}
                  className="ml-1 hover:bg-purple-200 rounded-full p-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {searchTerm && (
              <span className="inline-flex items-center gap-2 px-3 h-7 rounded-lg text-sm font-medium bg-purple-100 text-purple-700 border border-purple-200">
                <span>Busca: {searchTerm}</span>
                <button
                  onClick={() => onSearchChange('')}
                  className="ml-1 hover:bg-purple-200 rounded-full p-1 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>
  );
}); 