import React, { useCallback, useMemo } from 'react';
import { Search, Filter, Calendar, X, CheckCircle, XCircle, CreditCard, DollarSign, QrCode, Package } from 'lucide-react';
import { FiltrosRelatoriosState } from '../types/relatorios.types';
import { CustomDropdown, DropdownOption } from '../../../components/ui/CustomDropdown';

interface FiltrosRelatoriosProps {
  filtros: FiltrosRelatoriosState;
  onFiltrosChange: (filtros: Partial<FiltrosRelatoriosState>) => void;
  onLimparFiltros: () => void;
}

export const FiltrosRelatorios = React.memo(function FiltrosRelatorios({ 
  filtros, 
  onFiltrosChange, 
  onLimparFiltros
}: FiltrosRelatoriosProps) {
  
  const handleFiltroChange = useCallback((campo: string, valor: string | number) => {
    onFiltrosChange({ [campo]: valor });
  }, [onFiltrosChange]);

  const temFiltrosAtivos = useMemo(() => {
    return filtros.categoria !== 'todas' ||
           filtros.formaPagamento !== 'todos' ||
           filtros.dataInicio !== '' ||
           filtros.dataFim !== '' ||
           filtros.status !== 'todos' ||
           filtros.valorMinimo !== undefined ||
           filtros.valorMaximo !== undefined;
  }, [filtros]);

  // Opções para os dropdowns
  const categoriaOptions: DropdownOption[] = [
    { value: 'todas', label: 'Todas as Categorias' },
    { value: 'pizzas', label: 'Pizzas', icon: <Package className="w-4 h-4 text-orange-500" /> },
    { value: 'lanches', label: 'Lanches', icon: <Package className="w-4 h-4 text-yellow-500" /> },
    { value: 'bebidas', label: 'Bebidas', icon: <Package className="w-4 h-4 text-blue-500" /> },
    { value: 'sobremesas', label: 'Sobremesas', icon: <Package className="w-4 h-4 text-pink-500" /> },
    { value: 'japonesa', label: 'Japonesa', icon: <Package className="w-4 h-4 text-red-500" /> },
    { value: 'saladas', label: 'Saladas', icon: <Package className="w-4 h-4 text-green-500" /> }
  ];

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
    <div className="bg-white border border-gray-200 rounded p-4">
      <div className="space-y-4">
        {/* Cabeçalho dos filtros */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <h3 className="text-sm font-semibold text-gray-900">Filtros de Relatório</h3>
          </div>
          
          {temFiltrosAtivos && (
            <button
              onClick={onLimparFiltros}
              className="flex items-center gap-2 px-3 py-2 text-xs text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded transition-colors"
            >
              <X className="w-3 h-3" />
              Limpar Filtros
            </button>
          )}
        </div>

        {/* Filtros em grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Filtro por Categoria */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Categoria
            </label>
            <CustomDropdown
              options={categoriaOptions}
              selectedValue={filtros.categoria}
              onValueChange={(value) => handleFiltroChange('categoria', value)}
              size="sm"
            />
          </div>

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
              <input
                type="date"
                value={filtros.dataInicio}
                onChange={(e) => handleFiltroChange('dataInicio', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Filtro por Data Fim */}
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Data Fim
            </label>
            <div className="relative">
              <input
                type="date"
                value={filtros.dataFim}
                onChange={(e) => handleFiltroChange('dataFim', e.target.value)}
                className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <Calendar className="absolute right-3 top-2.5 w-3 h-3 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Filtros de Valor */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Valor Mínimo (R$)
            </label>
            <input
              type="number"
              placeholder="0,00"
              value={filtros.valorMinimo || ''}
              onChange={(e) => handleFiltroChange('valorMinimo', e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-2">
              Valor Máximo (R$)
            </label>
            <input
              type="number"
              placeholder="0,00"
              value={filtros.valorMaximo || ''}
              onChange={(e) => handleFiltroChange('valorMaximo', e.target.value ? parseFloat(e.target.value) : undefined)}
              className="w-full px-3 py-2 text-xs border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Filtros Ativos */}
        {temFiltrosAtivos && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-gray-200">
            <span className="text-xs font-medium text-gray-500">Filtros ativos:</span>
            
            {filtros.categoria !== 'todas' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
                Categoria: {categoriaOptions.find(opt => opt.value === filtros.categoria)?.label}
              </span>
            )}
            
            {filtros.status !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                Status: {statusOptions.find(opt => opt.value === filtros.status)?.label}
              </span>
            )}
            
            {filtros.formaPagamento !== 'todos' && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-purple-100 text-purple-700">
                Pagamento: {formaPagamentoOptions.find(opt => opt.value === filtros.formaPagamento)?.label}
              </span>
            )}
            
            {(filtros.dataInicio || filtros.dataFim) && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Período: {filtros.dataInicio} - {filtros.dataFim}
              </span>
            )}
            
            {(filtros.valorMinimo || filtros.valorMaximo) && (
              <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                Valor: R$ {filtros.valorMinimo || 0} - R$ {filtros.valorMaximo || '∞'}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
});