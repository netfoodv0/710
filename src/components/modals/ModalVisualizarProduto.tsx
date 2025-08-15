import React from 'react';
import { Produto, Categoria } from '../../types';
import { ModalProdutoHeader } from './ModalProdutoHeader';
import { ModalProdutoImagem } from './ModalProdutoImagem';
import { ModalProdutoInformacoes } from './ModalProdutoInformacoes';
import { ModalProdutoDetalhes } from './ModalProdutoDetalhes';
import { ModalProdutoActions } from './ModalProdutoActions';

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
      <div className="bg-white border border-gray-200 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <ModalProdutoHeader 
          produto={produto} 
          modoEdicao={modoEdicao} 
          onClose={onClose} 
        />

        <div className="p-6 space-y-6">
          <ModalProdutoImagem produto={produto} modoEdicao={modoEdicao} />
          
          <ModalProdutoInformacoes 
            produto={produto} 
            categorias={categorias} 
            modoEdicao={modoEdicao} 
          />
          
          <ModalProdutoDetalhes produto={produto} modoEdicao={modoEdicao} />
        </div>

        <ModalProdutoActions 
          modoEdicao={modoEdicao} 
          onClose={onClose} 
          onEdit={onEdit} 
          onSave={onSave} 
        />
      </div>
    </div>
  );
}