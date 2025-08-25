import React from 'react';
import { EstatisticasCard } from './';
import { EstatisticasHistorico } from '../features/historico/services/historicoPedidoService';
import { DadosRelatorios } from '../features/relatorios/types/relatorios.types';
import { DiscountIcon, RejectedOrderIcon, CompletedOrderIcon, NewCustomerIcon, BagIcon, RevenueIcon, TicketIcon, UsersIcon } from './ui';

interface EstatisticasHistoricoContainerProps {
	estatisticas: EstatisticasHistorico | null;
	dadosRelatorios?: DadosRelatorios | null;
}

export const EstatisticasHistoricoContainer: React.FC<EstatisticasHistoricoContainerProps> = ({ 
  children, 
  className = '',
  title,
  subtitle,
  actions
}) => {
  return (
    <div className={`bg-white rounded-lg p-4 border-dashboard ${className}`}>
      {(title || subtitle || actions) && (
        <div className="flex items-center justify-between mb-4">
          <div>
            {title && (
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            )}
            {subtitle && (
              <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
            )}
          </div>
          {actions && (
            <div className="flex items-center gap-2">
              {actions}
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {children}
      </div>
    </div>
  );
};

export default EstatisticasHistoricoContainer;
