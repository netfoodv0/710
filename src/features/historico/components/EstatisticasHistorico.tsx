import React from 'react';
import { TrendingUp, Package, DollarSign, Users, Calendar, BarChart3 } from 'lucide-react';
import { EstatisticasHistorico } from '../../services/historicoPedidoService';
import { FormSection } from '../../../components/forms/FormSection';

interface EstatisticasHistoricoProps {
  estatisticas: EstatisticasHistorico | null;
}

export function EstatisticasHistoricoComponent({ estatisticas }: EstatisticasHistoricoProps) {
  if (!estatisticas) {
    return (
      <FormSection
        title="Estatísticas do Histórico"
        description="Métricas e indicadores dos pedidos"
        icon={<BarChart3 className="w-5 h-5" />}
        className="mt-4"
      >

      </FormSection>
    );
  }

  const formatarValor = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarPercentual = (valor: number, total: number) => {
    if (total === 0) return '0%';
    return `${Math.round((valor / total) * 100)}%`;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total de Pedidos */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.totalPedidos}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Package className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-500">
              {estatisticas.entregues} entregues • {estatisticas.cancelados} cancelados
            </span>
          </div>
        </div>

        {/* Pedidos Entregues */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pedidos Entregues</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.entregues}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-500">
              {formatarPercentual(estatisticas.entregues, estatisticas.totalPedidos)} do total
            </span>
          </div>
        </div>

        {/* Valor Total */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Valor Total</p>
              <p className="text-2xl font-bold text-gray-900">{formatarValor(estatisticas.valorTotal)}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-500">
              Ticket médio: {formatarValor(estatisticas.ticketMedio)}
            </span>
          </div>
        </div>

        {/* Top Clientes */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Top Clientes</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.topClientes.length}</p>
            </div>
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
              <Users className="w-4 h-4 text-gray-600" />
            </div>
          </div>
          <div className="mt-2 flex items-center text-xs">
            <span className="text-gray-500">
              {estatisticas.topClientes.length > 0 && (
                <span>Melhor: {estatisticas.topClientes[0].cliente}</span>
              )}
            </span>
          </div>
        </div>
      </div>
  );
} 