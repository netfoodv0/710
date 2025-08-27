import React from 'react';
import { Categoria } from '../../types/produtos';
import { InputPersonalizado } from './InputPersonalizado';
import { GoogleFloatingSelect } from '../ui/google-floating-select';

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
  // Preparar opções para o select de categoria
  const categoriaOptions = categorias.map((categoria) => ({
    value: categoria.id,
    label: categoria.nome
  }));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nome */}
        <div>
          <InputPersonalizado
            label="Nome do Produto"
            name="nome"
            value={formData.nome || ''}
            onChange={(value) => onInputChange('nome', value)}
            placeholder="Ex: Smashelândia Burger"
            required
            error={errors.nome}
          />
        </div>

        {/* Categoria */}
        <div>
          <GoogleFloatingSelect
            label="Categoria *"
            value={formData.categoriaId || ''}
            onChange={(value) => {
              const categoria = categorias.find(cat => cat.id === value);
              onInputChange('categoriaId', value);
              onInputChange('categoria', categoria?.nome || '');
            }}
            options={categoriaOptions}
            placeholder="Selecione uma categoria"
            error={errors.categoria}
            required
          />
        </div>

        {/* Preço */}
        <div>
          <InputPersonalizado
            label="Preço (R$)"
            name="preco"
            value={formatarPreco(formData.preco || 0)}
            onChange={(value) => onInputChange('preco', parsearPreco(value))}
            placeholder="0,00"
            required
            error={errors.preco}
            suffix="R$"
          />
        </div>

        {/* Tamanho da Porção */}
        <div>
          <InputPersonalizado
            label="Serve até (pessoas)"
            name="tamanhoPorcao"
            type="number"
            value={formData.tamanhoPorcao?.toString() || '1'}
            onChange={(value) => onInputChange('tamanhoPorcao', parseInt(value) || 1)}
            placeholder="1"
            min={1}
            max={10}
          />
        </div>

        {/* Tempo de Preparo */}
        <div>
          <InputPersonalizado
            label="Tempo de Preparo (minutos)"
            name="tempoPreparoMinutos"
            type="number"
            value={formData.tempoPreparoMinutos?.toString() || '20'}
            onChange={(value) => onInputChange('tempoPreparoMinutos', parseInt(value) || 20)}
            placeholder="20"
            min={1}
            max={120}
            suffix="min"
          />
        </div>

        {/* Status */}
        <div>
          <GoogleFloatingSelect
            label="Status"
            value={formData.status || 'ativo'}
            onChange={(value) => onInputChange('status', value)}
            options={[
              { value: 'ativo', label: 'Ativo' },
              { value: 'inativo', label: 'Inativo' },
              { value: 'em_falta', label: 'Em Falta' }
            ]}
            placeholder="Selecione o status"
          />
        </div>
      </div>

      {/* Descrição */}
      <div>
        <InputPersonalizado
          label="Descrição do Produto"
          name="descricao"
          value={formData.descricao || ''}
          onChange={(value) => onInputChange('descricao', value)}
          placeholder="Descreva o produto..."
          required
          error={errors.descricao}
        />
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
