import React from 'react';
import { CardTiposPedidos } from './CardTiposPedidos';

/**
 * Exemplo de uso do Card de Tipos de Pedidos
 * 
 * Este componente demonstra como usar o CardTiposPedidos
 * que foi criado baseado no gráfico de formas de pagamento.
 * 
 * O card inclui:
 * - Gráfico de pizza mostrando a distribuição de tipos de pedidos
 * - Estatísticas detalhadas com cores e percentuais
 * - Design minimalista seguindo as preferências do usuário
 */
export const ExemploCardTiposPedidos: React.FC = () => {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Exemplo: Card de Tipos de Pedidos
        </h1>
        
        <p className="text-gray-600 mb-6">
          Este é um exemplo do novo card de tipos de pedidos que foi criado baseado 
          no gráfico de formas de pagamento existente. Ele mostra a distribuição de 
          pedidos por tipo de entrega (Delivery, Retirada, Balcão).
        </p>

        {/* Card de Tipos de Pedidos */}
        <CardTiposPedidos />
        
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h3 className="font-semibold text-blue-900 mb-2">Características do Card:</h3>
          <ul className="text-blue-800 text-sm space-y-1">
            <li>• Gráfico de pizza interativo com labels externos</li>
            <li>• Cores minimalistas (verde, azul, roxo)</li>
            <li>• Estatísticas detalhadas com percentuais</li>
            <li>• Design responsivo e limpo</li>
            <li>• Segue o padrão visual do sistema</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
