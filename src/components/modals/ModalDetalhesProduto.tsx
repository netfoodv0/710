import React from 'react';
import { Produto } from '../../../types';
import { StatusBadge } from '../../../components/StatusBadge';

interface ModalProdutoDetalhesProps {
  produto: Produto;
  modoEdicao: boolean;
}

export function ModalProdutoDetalhes({ produto, modoEdicao }: ModalProdutoDetalhesProps) {
  return (
    <>
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
    </>
  );
} 