import React from 'react';
import { CupomFormData, CupomValidacao } from '../../types/cupons';
import { Save } from 'lucide-react';

interface ModalCupomFormProps {
  formData: CupomFormData;
  setFormData: (data: CupomFormData | ((prev: CupomFormData) => CupomFormData)) => void;
  validacao: CupomValidacao;
  setValidacao: (validacao: CupomValidacao) => void;
  isEditing: boolean;
}

export function ModalCupomForm({ 
  formData, 
  setFormData, 
  validacao, 
  setValidacao,
  isEditing 
}: ModalCupomFormProps) {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Código do Cupom *
          </label>
          <input
            type="text"
            value={formData.codigo}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, codigo: e.target.value.toUpperCase() }));
              if (validacao.codigo) {
                setValidacao({ ...validacao, codigo: '' });
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validacao.codigo ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Ex: DESCONTO10"
          />
          {validacao.codigo && <p className="text-red-500 text-sm mt-1">{validacao.codigo}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Tipo do Cupom *
          </label>
          <select
            value={formData.tipo}
            onChange={(e) => setFormData(prev => ({ ...prev, tipo: e.target.value as 'desconto_fixo' | 'desconto_percentual' | 'frete_gratis' | 'brinde' }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="desconto_fixo">Desconto Fixo</option>
            <option value="desconto_percentual">Desconto Percentual</option>
            <option value="frete_gratis">Frete Grátis</option>
            <option value="brinde">Brinde</option>
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Descrição *
        </label>
        <input
          type="text"
          value={formData.descricao}
          onChange={(e) => {
            setFormData(prev => ({ ...prev, descricao: e.target.value }));
            if (validacao.descricao) {
              setValidacao({ ...validacao, descricao: '' });
            }
          }}
          className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
            validacao.descricao ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Descreva o cupom de desconto"
        />
        {validacao.descricao && <p className="text-red-500 text-sm mt-1">{validacao.descricao}</p>}
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {formData.tipo === 'desconto_percentual' && 'Valor do Desconto * (%)'}
            {formData.tipo === 'desconto_fixo' && 'Valor do Desconto * (R$)'}
            {formData.tipo === 'frete_gratis' && 'Valor do Frete Grátis (R$)'}
            {formData.tipo === 'brinde' && 'Valor do Brinde (R$)'}
          </label>
          <input
            type="number"
            min="0"
            max={formData.tipo === 'desconto_percentual' ? "100" : undefined}
            step={formData.tipo === 'desconto_percentual' ? "1" : "0.01"}
            value={formData.valor}
            disabled={formData.tipo === 'frete_gratis'}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, valor: parseFloat(e.target.value) || 0 }));
              if (validacao.valor) {
                setValidacao({ ...validacao, valor: '' });
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validacao.valor ? 'border-red-500' : 'border-gray-300'
            } ${formData.tipo === 'frete_gratis' ? 'bg-gray-100 cursor-not-allowed' : ''}`}
            placeholder={
              formData.tipo === 'frete_gratis' ? 'Frete grátis (sem valor)' :
              formData.tipo === 'brinde' ? 'Valor estimado do brinde' :
              formData.tipo === 'desconto_percentual' ? 'Ex: 10 (para 10%)' :
              'Ex: 5.00'
            }
          />
          {validacao.valor && <p className="text-red-500 text-sm mt-1">{validacao.valor}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Valor Mínimo do Pedido (R$)
          </label>
          <input
            type="number"
            step="0.01"
            min="0"
            value={formData.valorMinimoPedido}
            onChange={(e) => setFormData(prev => ({ ...prev, valorMinimoPedido: parseFloat(e.target.value) || 0 }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0 = Sem valor mínimo"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de Início *
          </label>
          <input
            type="date"
            value={formData.dataInicio}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, dataInicio: e.target.value }));
              if (validacao.dataInicio) {
                setValidacao({ ...validacao, dataInicio: '' });
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validacao.dataInicio ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validacao.dataInicio && <p className="text-red-500 text-sm mt-1">{validacao.dataInicio}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Data de Fim *
          </label>
          <input
            type="date"
            value={formData.dataFim}
            onChange={(e) => {
              setFormData(prev => ({ ...prev, dataFim: e.target.value }));
              if (validacao.dataFim) {
                setValidacao({ ...validacao, dataFim: '' });
              }
            }}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validacao.dataFim ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {validacao.dataFim && <p className="text-red-500 text-sm mt-1">{validacao.dataFim}</p>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Limite de Usos
          </label>
          <input
            type="number"
            min="0"
            value={formData.limiteUsos}
            onChange={(e) => setFormData(prev => ({ ...prev, limiteUsos: parseInt(e.target.value) || 0 }))}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              validacao.limiteUsos ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="0 = Ilimitado"
          />
          {validacao.limiteUsos && <p className="text-red-500 text-sm mt-1">{validacao.limiteUsos}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="ativo"
          checked={formData.ativo}
          onChange={(e) => setFormData(prev => ({ ...prev, ativo: e.target.checked }))}
          className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        />
        <label htmlFor="ativo" className="text-sm text-gray-700">
          Cupom ativo (disponível para uso)
        </label>
      </div>
    </div>
  );
}