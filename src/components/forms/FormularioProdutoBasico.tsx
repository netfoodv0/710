import React from 'react';
import { Categoria } from '../../types/produtos';

interface FormularioProdutoBasicoProps {
  formData: Partial<Produto>;
  errors: Record<string, string>;
  categorias: Categoria[];
  onInputChange: (field: keyof Produto, value: any) => void;
  formatarPreco: (valor: number) => string;
  parsearPreco: (valor: string) => number;
}

export function FormularioProdutoBasico({ 
  formData, 
  errors, 
  categorias, 
  onInputChange, 
  formatarPreco, 
  parsearPreco 
}: FormularioProdutoBasicoProps) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Nome do Produto *
          </label>
          <input
            type="text"
            value={formData.nome || ''}
            onChange={(e) => onInputChange('nome', e.target.value)}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.nome ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="Ex: Smashelândia Burger"
          />
          {errors.nome && <p className="text-red-500 text-sm mt-1">{errors.nome}</p>}
        </div>

        {/* Categoria */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Categoria *
          </label>
          <select
            value={formData.categoriaId || ''}
            onChange={(e) => {
              const categoria = categorias.find(cat => cat.id === e.target.value);
              onInputChange('categoriaId', e.target.value);
              onInputChange('categoria', categoria?.nome || '');
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.categoria ? 'border-red-300' : 'border-gray-300'
            }`}
          >
            <option value="">Selecione uma categoria</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nome}
              </option>
            ))}
          </select>
          {errors.categoria && <p className="text-red-500 text-sm mt-1">{errors.categoria}</p>}
        </div>

        {/* Preço */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preço (R$) *
          </label>
          <input
            type="text"
            value={formatarPreco(formData.preco || 0)}
            onChange={(e) => onInputChange('preco', parsearPreco(e.target.value))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.preco ? 'border-red-300' : 'border-gray-300'
            }`}
            placeholder="0,00"
          />
          {errors.preco && <p className="text-red-500 text-sm mt-1">{errors.preco}</p>}
        </div>

        {/* Tamanho da Porção */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Serve até (pessoas)
          </label>
          <input
            type="number"
            value={formData.tamanhoPorcao || 1}
            onChange={(e) => onInputChange('tamanhoPorcao', parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="10"
          />
        </div>

        {/* Tempo de Preparo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tempo de Preparo (minutos)
          </label>
          <input
            type="number"
            value={formData.tempoPreparoMinutos || 20}
            onChange={(e) => onInputChange('tempoPreparoMinutos', parseInt(e.target.value) || 20)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            min="1"
            max="120"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Status
          </label>
          <select
            value={formData.status || 'ativo'}
            onChange={(e) => onInputChange('status', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="ativo">Ativo</option>
            <option value="inativo">Inativo</option>
            <option value="em_falta">Em Falta</option>
          </select>
        </div>
      </div>

      {/* Descrição */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Descrição do Produto *
        </label>
        <textarea
          value={formData.descricao || ''}
          onChange={(e) => onInputChange('descricao', e.target.value)}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            errors.descricao ? 'border-red-300' : 'border-gray-300'
          }`}
          placeholder="Descreva o produto..."
          rows={4}
        />
        {errors.descricao && <p className="text-red-500 text-sm mt-1">{errors.descricao}</p>}
      </div>

      {/* Checkboxes */}
      <div className="flex space-x-6">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.agendamentoObrigatorio || false}
            onChange={(e) => onInputChange('agendamentoObrigatorio', e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Agendamento obrigatório</span>
        </label>

        <label className="flex items-center">
          <input
            type="checkbox"
            checked={formData.destacado || false}
            onChange={(e) => onInputChange('destacado', e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm">Destacar produto</span>
        </label>
      </div>
    </div>
  );
} 