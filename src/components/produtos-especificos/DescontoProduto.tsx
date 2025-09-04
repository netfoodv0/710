import React, { useState } from 'react';
import { Percent, DollarSign, Calendar, Star } from 'lucide-react';
import { DescontoProduto, DescontoProdutoProps } from '../../types/global/produtos';

export const DescontoProduto: React.FC<DescontoProdutoProps> = ({
  desconto,
  onChange
}) => {
  const [isActive, setIsActive] = useState(desconto?.ativo ?? false);

  const handleToggleActive = () => {
    const newActive = !isActive;
    setIsActive(newActive);
    
    if (newActive) {
      // Ativar com configuração padrão
      onChange({
        id: `desc-${Date.now()}`,
        tipo: 'percentual',
        valor: 10,
        ativo: true
      });
    } else {
      // Desativar
      onChange({
        id: desconto?.id || `desc-${Date.now()}`,
        tipo: desconto?.tipo || 'percentual',
        valor: desconto?.valor || 0,
        ativo: false,
        dataInicio: desconto?.dataInicio,
        dataFim: desconto?.dataFim
      });
    }
  };

  const handleTipoChange = (tipo: 'percentual' | 'valor_fixo') => {
    if (!desconto) return;

    onChange({
      ...desconto,
      tipo
    });
  };

  const handleValorChange = (valor: number) => {
    if (!desconto) return;

    onChange({
      ...desconto,
      valor
    });
  };

  const handleDataChange = (campo: 'dataInicio' | 'dataFim', valor: string) => {
    if (!desconto) return;

    onChange({
      ...desconto,
      [campo]: valor ? new Date(valor) : undefined
    });
  };

  const formatarData = (data?: Date): string => {
    if (!data) return '';
    return data.toISOString().split('T')[0];
  };

  const formatarValor = (valor: number, tipo: 'percentual' | 'valor_fixo'): string => {
    if (tipo === 'percentual') {
      return `${valor}%`;
    }
    return `R$ ${valor.toFixed(2).replace('.', ',')}`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Adicionar Desconto
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Configure descontos para atrair mais clientes e aumentar as vendas.
        </p>
      </div>

      {/* Toggle de Ativação */}
      <div className="flex items-center justify-between p-4 border rounded-lg">
        <div className="flex items-center space-x-3">
          <Star size={20} className="text-yellow-600" />
          <div>
            <h4 className="font-medium text-gray-900">Desconto Ativo</h4>
            <p className="text-sm text-gray-600">
              {isActive 
                ? desconto ? `${formatarValor(desconto.valor, desconto.tipo)} de desconto` : 'Configurar desconto'
                : 'Nenhum desconto aplicado'
              }
            </p>
          </div>
        </div>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={isActive}
            onChange={handleToggleActive}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
        </label>
      </div>

      {/* Configuração de Desconto */}
      {isActive && desconto && (
        <div className="space-y-6">
          {/* Tipo de Desconto */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Tipo de Desconto</h4>
            <div className="grid grid-cols-2 gap-4">
              <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="tipoDesconto"
                  value="percentual"
                  checked={desconto.tipo === 'percentual'}
                  onChange={() => handleTipoChange('percentual')}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <Percent size={20} className="text-green-600" />
                  <div>
                    <span className="font-medium text-gray-900">Percentual</span>
                    <p className="text-sm text-gray-600">Ex: 10% de desconto</p>
                  </div>
                </div>
              </label>

              <label className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="radio"
                  name="tipoDesconto"
                  value="valor_fixo"
                  checked={desconto.tipo === 'valor_fixo'}
                  onChange={() => handleTipoChange('valor_fixo')}
                  className="text-purple-600 focus:ring-purple-500"
                />
                <div className="flex items-center space-x-2">
                  <DollarSign size={20} className="text-green-600" />
                  <div>
                    <span className="font-medium text-gray-900">Valor Fixo</span>
                    <p className="text-sm text-gray-600">Ex: R$ 5,00 de desconto</p>
                  </div>
                </div>
              </label>
            </div>
          </div>

          {/* Valor do Desconto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Valor do Desconto
            </label>
            <div className="flex items-center space-x-2">
              {desconto.tipo === 'percentual' ? (
                <Percent size={20} className="text-gray-400" />
              ) : (
                <DollarSign size={20} className="text-gray-400" />
              )}
              <input
                type="number"
                value={desconto.valor}
                onChange={(e) => handleValorChange(parseFloat(e.target.value) || 0)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                min="0"
                max={desconto.tipo === 'percentual' ? 100 : 999}
                step={desconto.tipo === 'percentual' ? 1 : 0.01}
              />
              <span className="text-sm text-gray-500">
                {desconto.tipo === 'percentual' ? '%' : 'R$'}
              </span>
            </div>
          </div>

          {/* Período de Validade */}
          <div>
            <h4 className="font-medium text-gray-900 mb-3">Período de Validade (Opcional)</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Início
                </label>
                <input
                  type="date"
                  value={formatarData(desconto.dataInicio)}
                  onChange={(e) => handleDataChange('dataInicio', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Data de Fim
                </label>
                <input
                  type="date"
                  value={formatarData(desconto.dataFim)}
                  onChange={(e) => handleDataChange('dataFim', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>
          </div>

          {/* Resumo */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Star size={20} className="text-green-600 mt-0.5" />
              <div>
                <h4 className="font-medium text-green-900">Resumo do Desconto</h4>
                <p className="text-sm text-green-700 mt-1">
                  Desconto de {formatarValor(desconto.valor, desconto.tipo)} aplicado ao produto.
                  {desconto.dataInicio && desconto.dataFim && (
                    <span> Válido de {formatarData(desconto.dataInicio)} até {formatarData(desconto.dataFim)}.</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informações */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-medium">i</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Dicas sobre descontos</h4>
            <ul className="text-sm text-blue-700 mt-1 space-y-1">
              <li>• Descontos percentuais são ideais para produtos de alto valor</li>
              <li>• Descontos em valor fixo funcionam bem para produtos de baixo valor</li>
              <li>• Use períodos de validade para criar urgência</li>
              <li>• Descontos muito altos podem prejudicar a percepção de valor</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}; 
