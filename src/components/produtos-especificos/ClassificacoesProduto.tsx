import React from 'react';
import { Leaf, Droplets, Snowflake, Wine, Apple } from 'lucide-react';
import { ClassificacaoProduto, ClassificacoesProdutoProps } from '../../types/produtos';

export const ClassificacoesProduto: React.FC<ClassificacoesProdutoProps> = ({
  classificacoes,
  onChange,
  tipoProduto = 'comida'
}) => {
  const handleChange = (field: keyof ClassificacaoProduto, value: boolean | number) => {
    onChange({
      ...classificacoes,
      [field]: value
    });
  };

  const classificacoesComida = [
    {
      key: 'semIngredientesOrigemAnimal' as keyof ClassificacaoProduto,
      label: 'Sem ingredientes de origem animal',
      description: 'Produto 100% vegetariano',
      icon: Leaf
    },
    {
      key: 'semCarne' as keyof ClassificacaoProduto,
      label: 'Sem qualquer tipo de carne',
      description: 'Não contém carnes vermelhas, brancas ou processadas',
      icon: Leaf
    },
    {
      key: 'semLactose' as keyof ClassificacaoProduto,
      label: 'Sem lactose e derivados',
      description: 'Adequado para intolerantes à lactose',
      icon: Droplets
    },
    {
      key: 'semAcucar' as keyof ClassificacaoProduto,
      label: 'Livre de qualquer tipo de açúcar',
      description: 'Sem açúcares adicionados',
      icon: Leaf
    },
    {
      key: 'cultivadoSemAgrotoxicos' as keyof ClassificacaoProduto,
      label: 'Cultivado sem agrotóxicos (Lei 10.831)',
      description: 'Produto orgânico certificado',
      icon: Leaf
    }
  ];

  const classificacoesBebida = [
    {
      key: 'servidoGelado' as keyof ClassificacaoProduto,
      label: 'Servida diretamente da geladeira',
      description: 'Bebida gelada',
      icon: Snowflake
    },
    {
      key: 'teorAlcoolico' as keyof ClassificacaoProduto,
      label: 'Teor alcoólico de 0,5% a 54%',
      description: 'Bebida alcoólica',
      icon: Wine
    },
    {
      key: 'preparadoComFrutasFrescas' as keyof ClassificacaoProduto,
      label: 'Bebida preparada com frutas frescas',
      description: 'Suco natural ou bebida com frutas',
      icon: Apple
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Restrições Alimentares
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Selecione as características que se aplicam a este produto para ajudar seus clientes com preferências específicas.
        </p>
      </div>

      {/* Classificações para Comida */}
      {tipoProduto === 'comida' && (
        <div className="space-y-4">
          {classificacoesComida.map((classificacao) => {
            const Icon = classificacao.icon;
            return (
              <label key={classificacao.key} className="flex items-start space-x-3 p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <input
                  type="checkbox"
                  checked={classificacoes[classificacao.key] as boolean}
                  onChange={(e) => handleChange(classificacao.key, e.target.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <Icon size={16} className="text-green-600" />
                    <span className="font-medium text-gray-900">{classificacao.label}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{classificacao.description}</p>
                </div>
              </label>
            );
          })}
        </div>
      )}

      {/* Classificações para Bebida */}
      {tipoProduto === 'bebida' && (
        <div className="space-y-4">
          {classificacoesBebida.map((classificacao) => {
            const Icon = classificacao.icon;
            const isTeorAlcoolico = classificacao.key === 'teorAlcoolico';
            
            return (
              <div key={classificacao.key} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <label className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={isTeorAlcoolico ? !!classificacoes[classificacao.key] : classificacoes[classificacao.key] as boolean}
                    onChange={(e) => {
                      if (isTeorAlcoolico) {
                        handleChange(classificacao.key, e.target.checked ? 5.0 : undefined);
                      } else {
                        handleChange(classificacao.key, e.target.checked);
                      }
                    }}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <Icon size={16} className="text-blue-600" />
                      <span className="font-medium text-gray-900">{classificacao.label}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{classificacao.description}</p>
                    
                    {/* Campo específico para teor alcoólico */}
                    {isTeorAlcoolico && classificacoes.teorAlcoolico !== undefined && (
                      <div className="mt-3">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Teor Alcoólico (%)
                        </label>
                        <input
                          type="number"
                          value={classificacoes.teorAlcoolico}
                          onChange={(e) => handleChange('teorAlcoolico', parseFloat(e.target.value) || 0)}
                          className="w-32 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          min="0.5"
                          max="54"
                          step="0.1"
                        />
                        <span className="text-xs text-gray-500 ml-2">0.5% a 54%</span>
                      </div>
                    )}
                  </div>
                </label>
              </div>
            );
          })}
        </div>
      )}

      {/* Informações Adicionais */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-medium">i</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Como usar as classificações</h4>
            <p className="text-sm text-blue-700 mt-1">
              As classificações ajudam os clientes a encontrar produtos que atendem às suas necessidades específicas. 
              Selecione apenas as características que realmente se aplicam ao seu produto.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 
