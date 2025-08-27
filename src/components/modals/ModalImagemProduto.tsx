import React from 'react';
import { Upload } from 'lucide-react';
import { Produto } from '../../../types';

interface ModalProdutoImagemProps {
  produto: Produto;
  modoEdicao: boolean;
}

export function ModalProdutoImagem({ produto, modoEdicao }: ModalProdutoImagemProps) {
  return (
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
  );
} 
