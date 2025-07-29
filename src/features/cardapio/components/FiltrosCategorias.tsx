import React from 'react';
import { Categoria, Produto } from '../../types';

interface FiltrosCategoriasProps {
  categorias: Categoria[];
  produtos: Produto[];
  categoriaAtual: string;
  onCategoriaChange: (categoria: string) => void;
}

export function FiltrosCategorias({ categorias, produtos, categoriaAtual, onCategoriaChange }: FiltrosCategoriasProps) {
  const categoriasAtivas = categorias.filter(cat => cat.ativo);

  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={() => onCategoriaChange('todas')}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          categoriaAtual === 'todas'
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
        }`}
      >
        Todas ({produtos.length})
      </button>
      {categoriasAtivas.map((categoria) => {
        const count = produtos.filter(p => p.categoriaId === categoria.id).length;
        return (
          <button
            key={categoria.id}
            onClick={() => onCategoriaChange(categoria.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              categoriaAtual === categoria.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {categoria.nome} ({count})
          </button>
        );
      })}
    </div>
  );
}