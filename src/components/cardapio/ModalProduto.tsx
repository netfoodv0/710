import React from 'react';
import { X, Upload, Clock, DollarSign } from 'lucide-react';
import { Produto, Categoria } from '../../types';
import { StatusBadge } from '../StatusBadge';

interface ModalProdutoProps {
  produto: Produto;
  categorias: Categoria[];
  modoEdicao: boolean;
  onClose: () => void;
  onEdit: () => void;
  onSave: () => void;
}

export function ModalProduto({ produto, categorias, modoEdicao, onClose, onEdit, onSave }: ModalProdutoProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                {modoEdicao ? 'Editar Produto' : 'Detalhes do Produto'}
              </h2>
              <p className="text-gray-600 mt-1">
                {produto.categoria}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Imagem do produto */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Imagem do Produto
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {produto.imagem ? (
                <img
                  src={produto.imagem}
                  alt={produto.nome}
                  className="mx-auto h-32 w-32 object-cover rounded-lg"
                />
              ) : (
                <div className="text-gray-400">
                  <Upload className="mx-auto h-12 w-12 mb-2" />
                  <p>Clique para adicionar uma imagem</p>
                </div>
              )}
            </div>
          </div>

          {/* Informações básicas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Nome do Produto
              </label>
              <input
                type="text"
                defaultValue={produto.nome}
                disabled={!modoEdicao}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Categoria
              </label>
              <select
                defaultValue={produto.categoriaId}
                disabled={!modoEdicao}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
              >
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Preço
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  step="0.01"
                  defaultValue={produto.preco}
                  disabled={!modoEdicao}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tempo de Preparo (min)
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="number"
                  defaultValue={produto.tempoPreparoMinutos}
                  disabled={!modoEdicao}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Descrição
            </label>
            <textarea
              rows={3}
              defaultValue={produto.descricao}
              disabled={!modoEdicao}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50"
            />
          </div>

          {/* Ingredientes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ingredientes
            </label>
            <div className="flex flex-wrap gap-2">
              {produto.ingredientes?.map((ingrediente, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {ingrediente}
                </span>
              ))}
            </div>
          </div>

          {/* Extras */}
          {produto.extras && produto.extras.length > 0 && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Extras Disponíveis
              </label>
              <div className="space-y-2">
                {produto.extras.map((extra, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-900">{extra.nome}</span>
                    <span className="text-green-600 font-medium">
                      + R$ {extra.preco.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Status
            </label>
            <div className="flex items-center gap-4">
              <StatusBadge status={produto.ativo ? 'ativo' : 'inativo'} />
              {modoEdicao && (
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    defaultChecked={produto.ativo}
                    className="mr-2"
                  />
                  Produto ativo
                </label>
              )}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-200 flex justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
          >
            Fechar
          </button>
          <div className="flex gap-2">
            {!modoEdicao ? (
              <button
                onClick={onEdit}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Editar
              </button>
            ) : (
              <button
                onClick={onSave}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Salvar
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}