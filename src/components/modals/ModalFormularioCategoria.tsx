import React from 'react';
import { Categoria, CategoriaAdicional } from '../../types';

interface ModalCategoriaFormProps {
  formData: {
    nome: string;
    descricao: string;
    tipo: 'padrao' | 'pizza' | 'obrigatorio';
    tipoSelecao: 'unica' | 'multipla' | 'somavel';
    quantidadeMinima: number;
    quantidadeMaxima: number;
    status: Categoria['status'] | CategoriaAdicional['status'];
  };
  setFormData: (data: any) => void;
  tipo: 'produtos' | 'adicionais';
  isEditing: boolean;
}

export function ModalCategoriaForm({ 
  formData, 
  setFormData, 
  tipo, 
  isEditing 
}: ModalCategoriaFormProps) {
  const getTipoSelecaoDescription = (tipo: 'unica' | 'multipla' | 'somavel') => {
    switch (tipo) {
      case 'unica':
        return 'Cliente pode escolher apenas um item desta categoria';
      case 'multipla':
        return 'Cliente pode escolher um item de cada tipo desta categoria';
      case 'somavel':
        return 'Cliente pode escolher uma quantidade determinada de cada item';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Nome */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Nome da Categoria *
        </label>
        <input
          type="text"
          value={formData.nome}
          onChange={(e) => setFormData(prev => ({ ...prev, nome: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: Pizzas, Hambúrgueres, Bebidas..."
          required
        />
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição
        </label>
        <textarea
          value={formData.descricao}
          onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Descrição da categoria..."
          rows={3}
        />
      </div>

      {/* Tipo de Categoria - Para categorias de produtos */}
      {tipo === 'produtos' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Categoria *
          </label>
          <select
            value={formData.tipo}
            onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'padrao' | 'pizza' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="padrao">Padrão</option>
            <option value="pizza">Categoria de Pizza</option>
          </select>
        </div>
      )}

      {/* Tipo de Adicional - Para categorias de adicionais */}
      {tipo === 'adicionais' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Adicional *
          </label>
          <select
            value={formData.tipo}
            onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'padrao' | 'obrigatorio' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option value="padrao">Padrão</option>
            <option value="obrigatorio">Obrigatório</option>
          </select>
          <p className="text-sm text-gray-500 mt-1">
            {formData.tipo === 'obrigatorio' 
              ? 'O cliente será obrigado a escolher um item desta categoria no cardápio digital'
              : 'O cliente pode escolher se quer ou não itens desta categoria'
            }
          </p>
        </div>
      )}

      {/* Tipo de Seleção - Apenas para categorias de adicionais */}
      {tipo === 'adicionais' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tipo de Seleção *
          </label>
          <div className="space-y-3">
            {(['unica', 'multipla', 'somavel'] as const).map((tipo) => (
              <label key={tipo} className="flex items-start space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                <input
                  type="radio"
                  name="tipoSelecao"
                  value={tipo}
                  checked={formData.tipoSelecao === tipo}
                  onChange={() => setFormData(prev => ({ ...prev, tipoSelecao: tipo }))}
                  className="mt-1"
                  required
                />
                <div className="flex-1">
                  <div className="font-medium capitalize">
                    {tipo === 'unica' ? 'Opção Única' : tipo === 'multipla' ? 'Opção Múltipla' : 'Opção Somável'}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {getTipoSelecaoDescription(tipo)}
                  </div>
                </div>
              </label>
            ))}
          </div>
        </div>
      )}

      {/* Quantidade para Escolha - Apenas para opções múltipla ou somável */}
      {tipo === 'adicionais' && (formData.tipoSelecao === 'multipla' || formData.tipoSelecao === 'somavel') && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Quantidade para Escolha
          </label>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">O cliente escolherá de</span>
            <input
              type="number"
              value={formData.quantidadeMinima}
              onChange={(e) => setFormData(prev => ({ ...prev, quantidadeMinima: parseInt(e.target.value) || 0 }))}
              className="w-20 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
            <span className="text-sm text-gray-600">até</span>
            <input
              type="number"
              value={formData.quantidadeMaxima}
              onChange={(e) => setFormData(prev => ({ ...prev, quantidadeMaxima: parseInt(e.target.value) || 0 }))}
              className="w-20 h-10 px-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              required
            />
            <span className="text-sm text-gray-600">unidades</span>
          </div>
          <p className="text-sm text-gray-500 mt-1">
            {formData.tipoSelecao === 'multipla' 
              ? 'Quantidade de itens diferentes que o cliente pode escolher'
              : 'Quantidade total de unidades que o cliente pode escolher'
            }
          </p>
        </div>
      )}
    </div>
  );
} 