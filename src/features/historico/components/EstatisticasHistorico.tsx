import React from 'react';
import { HistoryIcon, BagIcon, RevenueIcon, TicketIcon, UsersIcon } from '../../../components/ui';
import { EstatisticasHistorico as EstatisticasHistoricoType } from '../services/historicoPedidoService';
import { FormSection } from '../../../components/forms/FormSection';
import { CardTiposPedidos } from './CardTiposPedidos';
import { CompletedOrderIcon, RejectedOrderIcon, NewCustomerIcon } from '../../../components/ui';

interface EstatisticasHistoricoProps {
  estatisticas: EstatisticasHistoricoType | null;
}

export const EstatisticasHistorico = ({ estatisticas }: EstatisticasHistoricoProps) => {
  // Verificação de segurança para evitar erros quando estatisticas for null
  if (!estatisticas) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((i) => (
          <div key={i} className="bg-white border rounded-lg p-4 animate-pulse" style={{ borderColor: '#cfd1d3' }}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-8 bg-gray-200 rounded"></div>
              </div>
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
        {/* Receita Total */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Receita Total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.valorTotal.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <RevenueIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Total de Pedidos */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total de Pedidos</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.totalPedidos}</p>
            </div>
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BagIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Produtos Ativos */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Produtos Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.totalPedidos > 0 ? estatisticas.totalPedidos : 0}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <TicketIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Clientes Ativos */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Clientes Ativos</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.clientesUnicos}</p>
            </div>
            <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
              <UsersIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Faturamento Total */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Faturamento Total</p>
              <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.valorTotal.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <RevenueIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Ticket Médio */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Ticket Médio</p>
              <p className="text-2xl font-bold text-gray-900">R$ {estatisticas.ticketMedio.toFixed(2).replace('.', ',')}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <TicketIcon size={20} color="#6b7280" />
            </div>
          </div>
        </div>

        {/* Pedidos Finalizados */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pedidos Finalizados</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.entregues}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <CompletedOrderIcon size={20} color="#8B5CF6" />
            </div>
          </div>
        </div>

        {/* Pedidos Rejeitados */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pedidos Rejeitados</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.cancelados}</p>
            </div>
            <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
              <RejectedOrderIcon size={20} color="#6B7280" />
            </div>
          </div>
        </div>

        {/* Clientes Novos */}
        <div className="bg-white border rounded-lg p-4" style={{ borderColor: '#cfd1d3' }}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Clientes Novos</p>
              <p className="text-2xl font-bold text-gray-900">{estatisticas.clientesUnicos}</p>
            </div>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <NewCustomerIcon size={20} color="#8B5CF6" />
            </div>
          </div>
        </div>
      </div>

      {/* Card de Tipos de Pedidos */}
      <div className="mb-6">
        <CardTiposPedidos />
      </div>
    </>
  );
}; 
