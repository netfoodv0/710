import React, { useState } from 'react';
import { X, Save, Package, Plus } from 'lucide-react';

interface ProdutoAcompanhamento {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  quantidadeMinima: number;
  precoCusto: number;
  custoEstoque: number;
  semControleEstoque: boolean;
  fichaTecnica: string;
  status: string;
}

interface ModalCadastroAcompanhamentoProps {
  isOpen: boolean;
  onClose: () => void;
  produto: ProdutoAcompanhamento | null;
  onAlterarEstoque: (produto: ProdutoAcompanhamento) => void;
  onSalvarProduto: (produto: ProdutoAcompanhamento) => void;
}

export function ModalCadastroAcompanhamento({ 
  isOpen, 
  onClose, 
  produto, 
  onAlterarEstoque, 
  onSalvarProduto 
}: ModalCadastroAcompanhamentoProps) {
  const [formData, setFormData] = useState<ProdutoAcompanhamento>({
    id: Date.now(),
    nome: '',
    categoria: '',
    quantidade: 0,
    quantidadeMinima: 1,
    precoCusto: 0,
    custoEstoque: 0,
    semControleEstoque: false,
    fichaTecnica: 'Não',
    status: 'em_estoque'
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (field: keyof ProdutoAcompanhamento, value: string | number | boolean) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar custo do estoque
      const produtoAtualizado = {
        ...formData,
        custoEstoque: formData.quantidade * formData.precoCusto
      };
      
      onSalvarProduto(produtoAtualizado);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAlterarEstoque = () => {
    const produtoAtualizado = {
      ...formData,
      custoEstoque: formData.quantidade * formData.precoCusto
    };
    onAlterarEstoque(produtoAtualizado);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <Plus className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Novo Acompanhamento</h3>
                <p className="text-sm text-gray-500">Cadastre um novo produto de acompanhamento</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Controle de Estoque */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="semControleEstoque"
                  checked={formData.semControleEstoque}
                  onChange={(e) => handleInputChange('semControleEstoque', e.target.checked)}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <label htmlFor="semControleEstoque" className="text-sm font-medium text-blue-800">
                  Sem Controle de Estoque
                </label>
              </div>
              <p className="text-xs text-blue-600 mt-2 ml-7">
                Marque esta opção se o cliente optou por não controlar o estoque deste produto
              </p>
            </div>

            {/* Campos do formulário */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Nome */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Nome do Produto *
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Categoria *
                </label>
                <input
                  type="text"
                  value={formData.categoria}
                  onChange={(e) => handleInputChange('categoria', e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Preço de Custo */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Preço de Custo (R$) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.precoCusto}
                  onChange={(e) => handleInputChange('precoCusto', parseFloat(e.target.value) || 0)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Quantidade */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  formData.semControleEstoque ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  Quantidade Inicial
                </label>
                <input
                  type="number"
                  min="0"
                  value={formData.quantidade}
                  onChange={(e) => handleInputChange('quantidade', parseInt(e.target.value) || 0)}
                  disabled={formData.semControleEstoque}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formData.semControleEstoque 
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Quantidade Mínima */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  formData.semControleEstoque ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  Quantidade Mínima
                </label>
                <input
                  type="number"
                  min="1"
                  value={formData.quantidadeMinima}
                  onChange={(e) => handleInputChange('quantidadeMinima', parseInt(e.target.value) || 1)}
                  disabled={formData.semControleEstoque}
                  className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    formData.semControleEstoque 
                      ? 'border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed' 
                      : 'border-gray-300'
                  }`}
                />
              </div>

              {/* Ficha Técnica */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Ficha Técnica
                </label>
                <select
                  value={formData.fichaTecnica}
                  onChange={(e) => handleInputChange('fichaTecnica', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="Sim">Sim</option>
                  <option value="Não">Não</option>
                </select>
              </div>

              {/* Status */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="em_estoque">Em Estoque</option>
                  <option value="estoque_baixo">Estoque Baixo</option>
                  <option value="sem_estoque">Sem Estoque</option>
                </select>
              </div>
            </div>

            {/* Custo do Estoque Calculado */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Custo do Estoque:</span>
                <span className="text-lg font-bold text-gray-900">
                  R$ {(formData.quantidade * formData.precoCusto).toFixed(2)}
                </span>
              </div>
            </div>

            {/* Botões */}
            <div className="flex items-center justify-end space-x-3 pt-4 border-t border-gray-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleAlterarEstoque}
                className="px-4 py-2 text-sm font-medium text-blue-700 bg-blue-50 border border-blue-300 rounded-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Alterar Estoque
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar Produto</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
