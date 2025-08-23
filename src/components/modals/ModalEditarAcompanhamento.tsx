import React, { useState, useEffect } from 'react';
import { X, Save, Package, AlertTriangle } from 'lucide-react';

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

interface ModalEditarAcompanhamentoProps {
  isOpen: boolean;
  onClose: () => void;
  produto: ProdutoAcompanhamento | null;
  onSave: (produtoEditado: ProdutoAcompanhamento) => void;
}

export function ModalEditarAcompanhamento({ isOpen, onClose, produto, onSave }: ModalEditarAcompanhamentoProps) {
  const [formData, setFormData] = useState<ProdutoAcompanhamento | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (produto) {
      setFormData({ ...produto });
    }
  }, [produto]);

  const handleInputChange = (field: keyof ProdutoAcompanhamento, value: string | number | boolean) => {
    if (formData) {
      setFormData({
        ...formData,
        [field]: value
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    setLoading(true);
    try {
      // Simular delay de salvamento
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Atualizar custo do estoque
      const produtoAtualizado = {
        ...formData,
        custoEstoque: formData.quantidade * formData.precoCusto
      };
      
      onSave(produtoAtualizado);
      onClose();
    } catch (error) {
      console.error('Erro ao salvar:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (quantidade: number, quantidadeMinima: number) => {
    if (quantidade === 0) return 'text-red-600';
    if (quantidade <= quantidadeMinima) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusText = (quantidade: number, quantidadeMinima: number, semControleEstoque?: boolean) => {
    if (semControleEstoque) return 'Sem Controle de Estoque';
    if (quantidade === 0) return 'Sem Estoque';
    if (quantidade <= quantidadeMinima) return 'Estoque Baixo';
    return 'Em Estoque';
  };

  if (!isOpen || !produto || !formData) return null;

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
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Editar Acompanhamento</h3>
                <p className="text-sm text-gray-500">{produto.nome}</p>
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
            {/* Status atual */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Status Atual:</span>
                <div className="flex items-center space-x-2">
                  {formData.semControleEstoque ? (
                    <span className="text-sm font-medium text-gray-600">Sem Controle de Estoque</span>
                  ) : (
                    <>
                      <AlertTriangle className={`w-4 h-4 ${getStatusColor(formData.quantidade, formData.quantidadeMinima)}`} />
                      <span className={`text-sm font-medium ${getStatusColor(formData.quantidade, formData.quantidadeMinima)}`}>
                        {getStatusText(formData.quantidade, formData.quantidadeMinima, formData.semControleEstoque)}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Controle de Estoque */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="semControleEstoque"
                  checked={formData.semControleEstoque || false}
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
                  Nome do Produto
                </label>
                <input
                  type="text"
                  value={formData.nome}
                  onChange={(e) => handleInputChange('nome', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Categoria */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Categoria
                </label>
                <input
                  type="text"
                  value={formData.categoria}
                  onChange={(e) => handleInputChange('categoria', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Preço de Custo */}
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-700">
                  Preço de Custo (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={formData.precoCusto}
                  onChange={(e) => handleInputChange('precoCusto', parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Quantidade */}
              <div>
                <label className={`block text-sm font-medium mb-2 ${
                  formData.semControleEstoque ? 'text-gray-400' : 'text-gray-700'
                }`}>
                  Quantidade Atual
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
                type="submit"
                disabled={loading}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Salvando...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>Salvar Alterações</span>
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
