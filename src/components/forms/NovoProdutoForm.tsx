import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Image as ImageIcon, 
  Info, 
  Tag, 
  Clock, 
  Calendar,
  BarChart3,
  Search,
  Settings,
  Plus,
  Minus,
  DollarSign
} from 'lucide-react';
import { InputPersonalizado } from './InputPersonalizado';
import { InputPersonalizadoPreco } from './InputPersonalizadoPreco';
import { InputNumericoComSpinner } from './InputNumericoComSpinner';
import { UnidadeSelect } from './UnidadeSelect';
import { FormTextarea } from './FormTextarea';
import { FormSelect } from './FormSelect';
import { FormSwitch } from './FormSwitch';
import { FormImageUpload } from './FormImageUpload';
import { FormSection } from './FormSection';
import { useNovoProdutoForm, FormData } from '../../hooks/useNovoProdutoForm';
import { ComplementosProduto } from '../produtos-especificos/ComplementosProduto';

import { firebaseCardapioService } from '../../services/firebaseCardapioService';

// Estilos CSS para os spinners dos campos numéricos
const spinnerStyles = `
  input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  .custom-spinner {
    position: absolute;
    right: 8px;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }
  
  .spinner-btn {
    width: 16px;
    height: 16px;
    background: #f3e8ff;
    border: 1px solid #e9d5ff;
    border-radius: 2px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }
  
  .spinner-btn:hover {
    background: #e9d5ff;
    border-color: #c084fc;
  }
  
  .spinner-btn svg {
    width: 10px;
    height: 10px;
    color: #a855f7;
  }
`;

interface NovoProdutoFormProps {
  onSubmit: (data: FormData) => Promise<void>;
  status?: 'ativo' | 'inativo' | 'em_falta';
  onStatusChange?: (status: 'ativo' | 'inativo' | 'em_falta') => void;
  categorias?: Array<{ value: string; label: string }>;
  loadingCategorias?: boolean;
  dadosIniciais?: Partial<FormData>;
}



const alergenosComuns = [
  'Glúten', 'Lactose', 'Ovos', 'Amendoim', 'Nozes', 'Soja', 
  'Peixes', 'Crustáceos', 'Gergelim', 'Mostarda'
];

const tagsComuns = [
  'Picante', 'Doce', 'Salgado', 'Crocante', 'Cremoso', 'Refrescante',
  'Tradicional', 'Gourmet', 'Caseiro', 'Artesanal', 'Light', 'Fit'
];

export function NovoProdutoForm({ onSubmit, status, onStatusChange, categorias = [], loadingCategorias = false, dadosIniciais = {} }: NovoProdutoFormProps) {
  const {
    formData,
    errors,
    isSubmitting,
    updateField,
    addToArray,
    removeFromArray,
    addVariacao,
    updateVariacao,
    removeVariacao,
    submitForm,
    formatPrice,
    parsePrice
  } = useNovoProdutoForm(dadosIniciais);

  // Remover o useEffect que estava aplicando apenas a categoria, pois agora o hook faz isso
  // useEffect(() => {
  //   if (dadosIniciais.categoria && formData.categoria === '') {
  //     updateField('categoria', dadosIniciais.categoria);
  //   }
  // }, [dadosIniciais.categoria, formData.categoria, updateField]);

  const categoriasAdicionais = [];
  const categoriasReais = [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await submitForm(onSubmit);
    if (success) {
      // Formulário enviado com sucesso
    }
  };

  const handleAddIngrediente = (ingrediente: string) => {
    if (ingrediente.trim() && !formData.ingredientes.includes(ingrediente.trim())) {
      addToArray('ingredientes', ingrediente.trim());
    }
  };

  const handleAddTag = (tag: string) => {
    if (tag.trim() && !formData.tags.includes(tag.trim())) {
      addToArray('tags', tag.trim());
    }
  };



  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
      <style>{spinnerStyles}</style>
      <div className="p-6 space-y-6" style={{ backgroundColor: '#f7f5f3' }}>
        <form id="produto-form" onSubmit={handleSubmit} className="space-y-6">
        
        {/* Grid principal com 2 colunas para os cards */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        
        {/* Informações Básicas */}
        <FormSection
          title="Informações Básicas"
          description="Dados essenciais do produto"
        >
          <div className="space-y-4">
            <InputPersonalizado
              label="Nome do Produto"
              name="nome"
              value={formData.nome}
              onChange={(value) => updateField('nome', value)}
              placeholder="Ex: Pizza Margherita Especial"
              required
              error={errors.nome}
              maxLength={100}
            />

            <FormTextarea
              label="Descrição"
              name="descricao"
              value={formData.descricao}
              onChange={(value) => updateField('descricao', value)}
              placeholder="Descreva seu produto de forma atrativa e detalhada..."
              required
              error={errors.descricao}
              rows={3}
              maxLength={500}
            />

            <FormSelect
              label="Categoria"
              name="categoria"
              value={formData.categoria}
              onChange={(value) => updateField('categoria', value)}
              options={categorias}
              placeholder="Selecione a categoria"
              required
              error={errors.categoria}
              disabled={loadingCategorias}
            />

            <div className="grid grid-cols-2 gap-4">
              <InputPersonalizadoPreco
                label="Preço"
                name="preco"
                value={formData.preco}
                onChange={(value) => updateField('preco', value)}
                placeholder="0,00"
                required
                error={errors.preco}
                min={0}
                step={0.01}
              />

              <InputPersonalizadoPreco
                label="Preço Promocional"
                name="precoPromocional"
                value={formData.precoPromocional || 0}
                onChange={(value) => updateField('precoPromocional', value)}
                placeholder="0,00"
                error={errors.precoPromocional}
                min={0}
                step={0.01}
              />
            </div>
          </div>
        </FormSection>

        {/* Mídia */}
        <FormSection
          title="Fotos do Produto"
          description="Adicione imagens atrativas do seu produto"
        >
          <FormImageUpload
            label="Imagens"
            value={formData.imagens}
            onChange={(images) => updateField('imagens', images)}
            maxImages={5}
            maxSize={5}
            error={errors.imagens}
          />
        </FormSection>

        {/* Detalhes do Produto */}
        <FormSection
          title="Detalhes do Produto"
          description="Informações adicionais importantes"
        >
          <div className="grid grid-cols-2 gap-4">
            <div className="flex gap-2">
              <div className="flex-1">
                <InputNumericoComSpinner
                  label="Tamanho da porção"
                  name="tamanhoPorcao"
                  value={formData.tamanhoPorcao || 0}
                  onChange={(value) => updateField('tamanhoPorcao', value)}
                  placeholder="1"
                  error={errors.tamanhoPorcao}
                  min={0}
                  step={1}
                />
              </div>
              <div className="w-24">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  {formData.unidadePorcao === 'ml' ? 'Mililitros' :
                   formData.unidadePorcao === 'l' ? 'Litros' :
                   formData.unidadePorcao === 'g' ? 'Gramas' :
                   formData.unidadePorcao === 'kg' ? 'Quilogramas' :
                   formData.unidadePorcao === 'un' ? 'Unidades' :
                   formData.unidadePorcao === 'cm' ? 'Centímetros' : 'Unidade'}
                </label>
                <UnidadeSelect
                  value={formData.unidadePorcao || 'un'}
                  onChange={(value) => updateField('unidadePorcao', value)}
                />
              </div>
            </div>

                        <div className="flex gap-2">
              <div className="flex-1">
                <InputNumericoComSpinner
                  label="Serve até"
                  name="serveAte"
                  value={formData.serveAte || 1}
                  onChange={(value) => updateField('serveAte', value)}
                  placeholder="1"
                  error={errors.serveAte}
                  min={1}
                />
              </div>
              <div className="w-24 flex items-end">
                <div className="h-10 px-4 border border-gray-300 rounded-md text-sm bg-gray-50 flex items-center justify-center text-gray-500 w-full">
                  {formData.serveAte === 1 ? 'pessoa' : 'pessoas'}
                </div>
              </div>
            </div>
          </div>
        </FormSection>

        {/* Ingredientes e Alergênos */}
        <FormSection
          title="Ingredientes e Alergênos"
          description="Liste os ingredientes e possíveis alergênos"
        >
          <div className="space-y-4">
            {/* Ingredientes */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Ingredientes
              </label>
              <div className="space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Digite um ingrediente e pressione Enter"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const input = e.target as HTMLInputElement;
                        handleAddIngrediente(input.value);
                        input.value = '';
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2">
                  {formData.ingredientes.map((ingrediente, index) => (
                    <span
                      key={index}
                      className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                    >
                      {ingrediente}
                      <button
                        type="button"
                        onClick={() => removeFromArray('ingredientes', index)}
                        className="text-purple-600 hover:text-purple-800"
                      >
                        <Minus className="w-6 h-6" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Alergênos */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Alergênos
              </label>
              <div className="grid grid-cols-2 gap-2">
                {alergenosComuns.map((alergeno) => (
                  <label key={alergeno} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.alergenos.includes(alergeno)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          addToArray('alergenos', alergeno);
                        } else {
                          const index = formData.alergenos.indexOf(alergeno);
                          if (index > -1) removeFromArray('alergenos', index);
                        }
                      }}
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-gray-700">{alergeno}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </FormSection>

        {/* Classificações Alimentares */}
        <FormSection
          title="Classificações Alimentares"
          description="Marque as classificações que se aplicam"
        >
          <div className="grid grid-cols-2 gap-3">
            <FormSwitch
              label="Vegetariano"
              name="vegetariano"
              checked={formData.vegetariano}
              onChange={(checked) => updateField('vegetariano', checked)}
            />
            <FormSwitch
              label="Vegano"
              name="vegano"
              checked={formData.vegano}
              onChange={(checked) => updateField('vegano', checked)}
            />
            <FormSwitch
              label="Sem Glúten"
              name="semGluten"
              checked={formData.semGluten}
              onChange={(checked) => updateField('semGluten', checked)}
            />
            <FormSwitch
              label="Sem Lactose"
              name="semLactose"
              checked={formData.semLactose}
              onChange={(checked) => updateField('semLactose', checked)}
            />
            <FormSwitch
              label="Sem Açúcar"
              name="semAcucar"
              checked={formData.semAcucar}
              onChange={(checked) => updateField('semAcucar', checked)}
            />
            <FormSwitch
              label="Orgânico"
              name="organico"
              checked={formData.organico}
              onChange={(checked) => updateField('organico', checked)}
            />
          </div>
        </FormSection>

        {/* Tags */}
        <FormSection
          title="Tags e Características"
          description="Adicione tags para facilitar a busca"
        >
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Digite uma tag e pressione Enter"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-purple-500 text-sm"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    const input = e.target as HTMLInputElement;
                    handleAddTag(input.value);
                    input.value = '';
                  }
                }}
              />
            </div>

            <div className="space-y-2">
              <div className="text-xs text-gray-600">Tags sugeridas:</div>
              <div className="flex flex-wrap gap-1">
                {tagsComuns.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleAddTag(tag)}
                    disabled={formData.tags.includes(tag)}
                    className={`px-2 py-1 rounded-full text-xs transition-colors ${
                      formData.tags.includes(tag)
                        ? 'bg-purple-100 text-purple-800 cursor-not-allowed'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer'
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-1">
              {formData.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-purple-100 text-purple-800 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeFromArray('tags', index)}
                    className="text-purple-600 hover:text-purple-800"
                  >
                    <Minus className="w-6 h-6" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </FormSection>

        {/* Disponibilidade */}
        <FormSection
          title="Disponibilidade e Horários"
          description="Configure quando o produto estará disponível"
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-3">
              <FormSwitch
                label="Disponível"
                name="disponivel"
                checked={formData.disponivel}
                onChange={(checked) => updateField('disponivel', checked)}
                description="Produto ativo no cardápio"
              />
              <FormSwitch
                label="Produto em Destaque"
                name="destaque"
                checked={formData.destaque}
                onChange={(checked) => updateField('destaque', checked)}
                description="Aparece em posição de destaque"
              />
              <FormSwitch
                label="Em Promoção"
                name="promocao"
                checked={formData.promocao}
                onChange={(checked) => updateField('promocao', checked)}
                description="Produto com desconto especial"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-2 block">
                Dias da Semana
              </label>
              <div className="grid grid-cols-7 gap-1">
                {Object.entries(formData.disponibilidadeDias).map(([dia, ativo]) => (
                  <label key={dia} className="flex flex-col items-center space-y-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ativo}
                      onChange={(e) => 
                        updateField('disponibilidadeDias', {
                          ...formData.disponibilidadeDias,
                          [dia]: e.target.checked
                        })
                      }
                      className="w-4 h-4"
                    />
                    <span className="text-xs text-gray-700 capitalize">
                      {dia.substring(0, 3)}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <InputPersonalizado
                label="Horário de Início"
                name="horarioInicio"
                type="time"
                value={formData.horarioInicio}
                onChange={(value) => updateField('horarioInicio', value)}
                required
                error={errors.horarioInicio}
              />
              <InputPersonalizado
                label="Horário de Fim"
                name="horarioFim"
                type="time"
                value={formData.horarioFim}
                onChange={(value) => updateField('horarioFim', value)}
                required
                error={errors.horarioFim}
              />
            </div>
          </div>
        </FormSection>

        {/* Controle de Estoque */}
        <FormSection
          title="Controle de Estoque"
          description="Gerencie o estoque do produto"
        >
          <div className="space-y-4">
            <FormSwitch
              label="Controlar Estoque"
              name="controlarEstoque"
              checked={formData.controlarEstoque}
              onChange={(checked) => updateField('controlarEstoque', checked)}
              description="Ativar controle automático de estoque"
            />

            {formData.controlarEstoque && (
              <div className="grid grid-cols-2 gap-3">
                <InputPersonalizado
                  label="Quantidade em Estoque"
                  name="quantidadeEstoque"
                  type="number"
                  value={formData.quantidadeEstoque || ''}
                  onChange={(value) => updateField('quantidadeEstoque', value)}
                  placeholder="100"
                  required={formData.controlarEstoque}
                  error={errors.quantidadeEstoque}
                  min={0}
                />
                <InputPersonalizado
                  label="Estoque Mínimo"
                  name="estoqueMinimo"
                  type="number"
                  value={formData.estoqueMinimo || ''}
                  onChange={(value) => updateField('estoqueMinimo', value)}
                  placeholder="10"
                  required={formData.controlarEstoque}
                  error={errors.estoqueMinimo}
                  min={0}
                />
              </div>
            )}
          </div>
        </FormSection>

        {/* Adicionais/Complementos */}
        <FormSection>
          <ComplementosProduto
            complementos={formData.complementos}
            categoriasAdicionais={categoriasAdicionais}
            onChange={(complementos) => updateField('complementos', complementos)}
          />
        </FormSection>

        {/* Variações */}
        <FormSection
          title="Variações do Produto"
          description="Adicione diferentes tamanhos ou opções"
        >
          <div className="space-y-4">
            <FormSwitch
              label="Produto tem Variações"
              name="temVariacoes"
              checked={formData.temVariacoes}
              onChange={(checked) => updateField('temVariacoes', checked)}
              description="Ex: Pequeno, Médio, Grande"
            />

            {formData.temVariacoes && (
              <div className="space-y-3">
                {formData.variacoes.map((variacao, index) => (
                  <div key={index} className="flex gap-3 items-end p-3 bg-gray-50 rounded-lg">
                    <div className="flex-1">
                      <InputPersonalizado
                        label="Nome da Variação"
                        name={`variacao_${index}_nome`}
                        value={variacao.nome}
                        onChange={(value) => updateVariacao(index, 'nome', value)}
                        placeholder="Ex: Pequeno"
                        error={errors[`variacao_${index}_nome`]}
                      />
                    </div>
                    <div className="flex-1">
                      <InputPersonalizadoPreco
                        label="Preço"
                        name={`variacao_${index}_preco`}
                        value={variacao.preco}
                        onChange={(value) => updateVariacao(index, 'preco', value)}
                        placeholder="0,00"
                        error={errors[`variacao_${index}_preco`]}
                        min={0}
                        step={0.01}
                        size="sm"
                      />
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={variacao.disponivel}
                        onChange={(e) => updateVariacao(index, 'disponivel', e.target.checked)}
                        className="w-4 h-4"
                      />
                      <span className="text-xs text-gray-700">Disponível</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeVariacao(index)}
                      className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addVariacao}
                  className="flex items-center gap-2 px-3 py-2 border border-dashed border-gray-300 rounded text-gray-600 hover:border-blue-400 hover:text-blue-600 transition-colors text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Adicionar Variação
                </button>
              </div>
            )}
          </div>
        </FormSection>

        </div> {/* Fim do grid principal */}

        </form>
        
        {/* Margem inferior da página */}
        <div className="h-25"></div>
      </div>
    </div>
  );
}
