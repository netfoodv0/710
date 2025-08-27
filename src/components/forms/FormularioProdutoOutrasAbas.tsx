import React from 'react';
import { Produto } from '../../types/produtos';

interface FormularioProdutoOutrasAbasProps {
  activeTab: 'classificacoes' | 'disponibilidade' | 'descontos';
  formData: Partial<Produto>;
  onInputChange: (field: keyof Produto, value: any) => void;
}

export function FormularioProdutoOutrasAbas({ 
  activeTab, 
  formData, 
  onInputChange 
}: FormularioProdutoOutrasAbasProps) {
  if (activeTab === 'classificacoes') {
    return (
      <div className="space-y-6">
        {/* <ClassificacoesProduto
          classificacoes={formData.classificacoes || {
            semIngredientesOrigemAnimal: false,
            semCarne: false,
            semLactose: false,
            semAcucar: false,
            cultivadoSemAgrotoxicos: false,
            servidoGelado: false,
            teorAlcoolico: undefined,
            preparadoComFrutasFrescas: false
          }}
          onChange={(classificacoes) => onInputChange('classificacoes', classificacoes)}
          tipoProduto={formData.categoria?.toLowerCase().includes('bebida') ? 'bebida' : 'comida'}
        /> */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">Componente ClassificacoesProduto será implementado aqui</p>
        </div>
      </div>
    );
  }

  if (activeTab === 'disponibilidade') {
    return (
      <div className="space-y-6">
        {/* <DisponibilidadeProduto
          disponibilidade={formData.disponibilidade}
          onChange={(disponibilidade) => onInputChange('disponibilidade', disponibilidade)}
          produtoId={produto?.id || 'novo'}
        /> */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">Componente DisponibilidadeProduto será implementado aqui</p>
        </div>
      </div>
    );
  }

  if (activeTab === 'descontos') {
    return (
      <div className="space-y-6">
        {/* <DescontoProduto
          desconto={formData.desconto}
          onChange={(desconto) => onInputChange('desconto', desconto)}
        /> */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
          <p className="text-gray-500">Componente DescontoProduto será implementado aqui</p>
        </div>
      </div>
    );
  }

  return null;
} 
