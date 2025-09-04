import React from 'react';
import { Plus, X, Package } from 'lucide-react';
import { CategoriaAdicional, ComplementosProdutoProps } from '../../types/global/produtos';

export const ComplementosProduto: React.FC<ComplementosProdutoProps> = ({
  complementos,
  categoriasAdicionais,
  onChange
}) => {
  const handleToggleComplemento = (categoriaId: string) => {
    const novosComplementos = complementos.includes(categoriaId)
      ? complementos.filter(id => id !== categoriaId)
      : [...complementos, categoriaId];
    
    onChange(novosComplementos);
  };

  const categoriasSelecionadas = categoriasAdicionais.filter(cat => 
    complementos.includes(cat.id)
  );

  const categoriasDisponiveis = categoriasAdicionais.filter(cat => 
    !complementos.includes(cat.id)
  );

  return (
    <div className="space-y-6">
      {/* Complementos Selecionados */}
      {categoriasSelecionadas.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Complementos Selecionados</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoriasSelecionadas.map((categoria) => (
              <div
                key={categoria.id}
                className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Package size={16} className="text-purple-600" />
                  <span className="text-sm font-medium text-gray-900">{categoria.nome}</span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleComplemento(categoria.id)}
                  className="text-red-500 hover:text-red-700 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Categorias Disponíveis */}
      {categoriasDisponiveis.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Categorias Disponíveis</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoriasDisponiveis.map((categoria) => (
              <button
                key={categoria.id}
                type="button"
                onClick={() => handleToggleComplemento(categoria.id)}
                className="flex items-center space-x-2 p-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <Plus size={16} className="text-purple-400" />
                <div>
                  <span className="text-sm font-medium text-gray-900">{categoria.nome}</span>
                  {categoria.descricao && (
                    <p className="text-xs text-gray-500 mt-1">{categoria.descricao}</p>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Estado Vazio */}
      {categoriasAdicionais.length === 0 && (
        <div className="text-center py-8">
          <Package size={48} className="mx-auto text-purple-400 mb-4" />
          <h4 className="text-sm font-medium text-gray-900 mb-2" style={{ fontSize: '14px' }}>
            Nenhuma categoria de complemento disponível
          </h4>
          <p className="text-gray-500" style={{ fontSize: '11px' }}>
            Primeiro, crie categorias de complementos no gerenciador de categorias.
          </p>
        </div>
      )}

      {/* Resumo */}
      {complementos.length > 0 && (
        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Package size={20} className="text-purple-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-purple-900">Resumo dos Complementos</h4>
              <p className="text-sm text-purple-700 mt-1">
                {complementos.length} categoria(s) de complemento(s) selecionada(s):
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {categoriasSelecionadas.map(categoria => (
                  <span key={categoria.id} className="inline-flex items-center px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                    {categoria.nome}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}


    </div>
  );
}; 
