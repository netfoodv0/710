import React from 'react';
import { Plus, X, Package } from 'lucide-react';
import { CategoriaAdicional, ComplementosProdutoProps } from '../../types/produtos';

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
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Complementos
        </h3>
        <p className="text-sm text-gray-600 mb-4">
          Adicione categorias de complementos que podem ser escolhidos junto com este produto.
        </p>
      </div>

      {/* Complementos Selecionados */}
      {categoriasSelecionadas.length > 0 && (
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Complementos Selecionados</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {categoriasSelecionadas.map((categoria) => (
              <div
                key={categoria.id}
                className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
              >
                <div className="flex items-center space-x-2">
                  <Package size={16} className="text-blue-600" />
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
                <Plus size={16} className="text-gray-400" />
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
          <Package size={48} className="mx-auto text-gray-400 mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma categoria de complemento disponível
          </h4>
          <p className="text-gray-500">
            Primeiro, crie categorias de complementos no gerenciador de categorias.
          </p>
        </div>
      )}

      {/* Resumo */}
      {complementos.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Package size={20} className="text-green-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-green-900">Resumo dos Complementos</h4>
              <p className="text-sm text-green-700 mt-1">
                {complementos.length} categoria(s) de complemento(s) selecionada(s):
              </p>
              <div className="mt-2 flex flex-wrap gap-1">
                {categoriasSelecionadas.map(categoria => (
                  <span key={categoria.id} className="inline-flex items-center px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                    {categoria.nome}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Informações */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xs font-medium">i</span>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-medium text-blue-900">Como funcionam os complementos</h4>
            <p className="text-sm text-blue-700 mt-1">
              Os complementos permitem que os clientes personalizem seus pedidos. 
              Por exemplo, um hambúrguer pode ter complementos como "Queijos", "Molhos" ou "Bordas". 
              Os clientes poderão escolher itens dessas categorias ao fazer o pedido.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}; 