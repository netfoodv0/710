import React from 'react';
import { Star } from 'lucide-react';
import { Produto } from '../../types/global/produtos';

interface ModalProdutoPreviewProps {
  produto: Produto;
}

export function ModalProdutoPreview({ produto }: ModalProdutoPreviewProps) {
  return (
    <div className="space-y-6">
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Preview do Produto</h3>
        
        {/* Card do produto */}
        <div className="bg-white rounded-lg shadow-sm border p-4 max-w-md" style={{ borderColor: 'rgb(207 209 211)' }}>
          {produto.imagem && (
            <img 
              src={produto.imagem} 
              alt={produto.nome}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
          )}
          
          <div className="space-y-2">
            <h4 className="text-lg font-semibold">{produto.nome}</h4>
            <p className="text-gray-600 text-sm">{produto.descricao}</p>
            
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold text-green-600">
                R$ {produto.preco.toFixed(2).replace('.', ',')}
              </span>
              <span className="text-sm text-gray-500">
                {produto.tempoPreparoMinutos} min
              </span>
            </div>
            
            {produto.destacado && (
              <div className="flex items-center text-yellow-600">
                <Star size={16} className="mr-1" />
                <span className="text-sm">Destacado</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
