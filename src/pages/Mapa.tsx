import React, { useState, useCallback, useMemo } from 'react';
import { MapPin, Layers, Filter, X, Bike, CheckCircle2, Clock4, PackageOpen, XCircle, Route, Calendar } from 'lucide-react';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { CustomDropdown, DropdownOption } from '../components/ui/CustomDropdown';
import { LeafletMap } from '../components/maps/LeafletMap';
import { useMapData } from '../hooks/useMapData';
import { MapIcon } from '../components/ui';

interface FiltrosMapa {
  statusPedidos: string;
  entregadores: string;
  camadas: string;
  dataInicio: string;
  dataFim: string;
}

export function Mapa(): JSX.Element {
  const [filtros, setFiltros] = useState<FiltrosMapa>({
    statusPedidos: 'todos',
    entregadores: 'todos',
    camadas: 'todos',
    dataInicio: '',
    dataFim: ''
  });

  const { markers, isLoading } = useMapData(filtros);

  const handleFiltroChange = useCallback((campo: string, valor: string) => {
    setFiltros(prev => ({
      ...prev,
      [campo]: valor
    }));
  }, []);

  const limparFiltros = useCallback(() => {
    setFiltros({
      statusPedidos: 'todos',
      entregadores: 'todos',
      camadas: 'todos',
      dataInicio: '',
      dataFim: ''
    });
  }, []);

  const temFiltrosAtivos = useMemo(() => {
    return filtros.statusPedidos !== 'todos' ||
           filtros.entregadores !== 'todos' ||
           filtros.camadas !== 'todos' ||
           filtros.dataInicio !== '' ||
           filtros.dataFim !== '';
  }, [filtros]);

  // Opções para os dropdowns
  const statusPedidosOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todos os Status' },
    { value: 'entregue', label: 'Entregues', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
    { value: 'preparacao', label: 'Em preparação', icon: <Clock4 className="w-4 h-4 text-amber-600" /> },
    { value: 'entrega', label: 'Em entrega', icon: <Route className="w-4 h-4 text-blue-600" /> },
    { value: 'cancelado', label: 'Cancelados', icon: <XCircle className="w-4 w-4 text-rose-600" /> }
  ];

  const entregadoresOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todos os Entregadores' },
    { value: 'disponiveis', label: 'Disponíveis', icon: <Bike className="w-4 h-4 text-blue-600" /> },
    { value: 'rota', label: 'Em rota', icon: <MapIcon size={16} color="#10b981" /> },
    { value: 'coletando', label: 'Coletando', icon: <PackageOpen className="w-4 h-4 text-amber-600" /> }
  ];

  const camadasOptions: DropdownOption[] = [
    { value: 'todos', label: 'Todas as Camadas' },
    { value: 'zonas', label: 'Zonas de entrega', icon: <Layers className="w-4 h-4" /> },
    { value: 'heatmap', label: 'Heatmap de pedidos', icon: <Layers className="w-4 h-4" /> }
  ];

  return (
    <ErrorBoundary>
      <div className="h-full flex flex-col">
        {/* Content */}
        <div className="flex-1 overflow-auto">
          <div className="p-4 space-y-4">
            {/* Filtros */}
            <div className="bg-white border border-gray-300 rounded p-4">
              <div className="space-y-4">
                {/* Cabeçalho dos filtros */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <h3 className="text-sm font-semibold text-gray-900">Filtros do Mapa</h3>
                  </div>
                  

                </div>

                {/* Filtros em grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                  {/* Status dos Pedidos */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Status dos Pedidos
                    </label>
                    <CustomDropdown
                      options={statusPedidosOptions}
                      selectedValue={filtros.statusPedidos}
                      onValueChange={(value) => handleFiltroChange('statusPedidos', value)}
                      size="sm"
                    />
                  </div>

                  {/* Entregadores */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Entregadores
                    </label>
                    <CustomDropdown
                      options={entregadoresOptions}
                      selectedValue={filtros.entregadores}
                      onValueChange={(value) => handleFiltroChange('entregadores', value)}
                      size="sm"
                    />
                  </div>

                  {/* Camadas do Mapa */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Camadas do Mapa
                    </label>
                    <CustomDropdown
                      options={camadasOptions}
                      selectedValue={filtros.camadas}
                      onValueChange={(value) => handleFiltroChange('camadas', value)}
                      size="sm"
                    />
                  </div>

                  {/* Data Início */}
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

                  {/* Data Fim */}
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

                {/* Indicador de filtros ativos */}
                {temFiltrosAtivos && (
                  <div className="flex flex-wrap gap-2 pt-2">
                    {filtros.statusPedidos !== 'todos' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        Status: {statusPedidosOptions.find(opt => opt.value === filtros.statusPedidos)?.label}
                        <button
                          onClick={() => handleFiltroChange('statusPedidos', 'todos')}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filtros.entregadores !== 'todos' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        Entregadores: {entregadoresOptions.find(opt => opt.value === filtros.entregadores)?.label}
                        <button
                          onClick={() => handleFiltroChange('entregadores', 'todos')}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filtros.camadas !== 'todos' && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        Camadas: {camadasOptions.find(opt => opt.value === filtros.camadas)?.label}
                        <button
                          onClick={() => handleFiltroChange('camadas', 'todos')}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filtros.dataInicio && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        Data Início: {filtros.dataInicio}
                        <button
                          onClick={() => handleFiltroChange('dataInicio', '')}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                    {filtros.dataFim && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700">
                        Data Fim: {filtros.dataFim}
                        <button
                          onClick={() => handleFiltroChange('dataFim', '')}
                          className="ml-1 hover:bg-gray-200 rounded-full p-0.5 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Estatísticas rápidas removidas conforme solicitado */}

            {/* Área do mapa */}
            <div className="bg-white border border-gray-300 rounded p-4">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Mapa de Entregas

                </h2>
                <p className="text-sm text-gray-600 mt-1">
                  Visualize pedidos, entregadores e zonas de entrega em tempo real
                </p>
              </div>
              
              {isLoading ? (
                <div className="h-[60vh] w-full rounded border bg-gray-50 flex items-center justify-center">
                  <div className="text-center">
        

                  </div>
                </div>
              ) : (
                <LeafletMap
                  height="60vh"
                  center={[-23.5505, -46.6333]} // São Paulo
                  zoom={13}
                  markers={markers}
                  onMarkerClick={(markerId) => {
                    const marker = markers.find(m => m.id === markerId);
                    if (marker) {
                      console.log('Marcador clicado:', marker);
                      // Aqui você pode abrir um modal com detalhes do pedido/entregador
                    }
                  }}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
}

