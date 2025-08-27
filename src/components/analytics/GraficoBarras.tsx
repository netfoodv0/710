import React from 'react';
import { GraficoBarrasProps } from '../../types';

export const GraficoBarras: React.FC<GraficoBarrasProps> = ({
  title,
  data,
  className = ''
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        <div className="flex items-center justify-center h-48 text-gray-500">
          Nenhum dado disponível
        </div>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.valor));
  const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'];

  return (
    <div className={`bg-white border border-slate-200 rounded-lg p-4 ${className}`}>
      <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
      
      <div className="space-y-4">
        {data.map((item, index) => {
          const percentage = maxValue > 0 ? (item.valor / maxValue) * 100 : 0;
          const color = item.cor || colors[index % colors.length];
          
          return (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700 truncate pr-2">
                  {item.nome}
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {item.valor.toLocaleString('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL' 
                  })}
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: color
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}; 
