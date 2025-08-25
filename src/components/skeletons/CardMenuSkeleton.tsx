import React from 'react';

export const CardMenuSkeleton: React.FC = () => {
  return (
    <div className="px-6 py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 rounded w-24"></div>
          <div className="h-9 bg-gray-200 rounded-lg w-36"></div>
        </div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-4">
        <div className="h-10 bg-gray-200 rounded-lg w-40"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-32"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-28"></div>
        <div className="h-10 bg-gray-200 rounded-lg w-24"></div>
      </div>

      {/* Grid de Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border" style={{ borderColor: 'rgb(207, 209, 211)' }}>
            {/* Header da categoria */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
                <div className="h-3 bg-gray-200 rounded w-12"></div>
                <div className="w-4 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>

            {/* Lista de produtos */}
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, productIndex) => (
                <div key={productIndex} className="flex items-center space-x-3 p-2 bg-gray-50 rounded">
                  <div className="w-16 h-16 bg-gray-200 rounded"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                    <div className="w-6 h-6 bg-gray-200 rounded"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Botão de adicionar */}
            <div className="mt-4">
              <div className="h-10 bg-gray-200 rounded-lg w-full"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Grid de Produtos */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="bg-white rounded-lg p-4 border" style={{ borderColor: 'rgb(207, 209, 211)' }}>
            {/* Imagem do produto */}
            <div className="w-full h-32 bg-gray-200 rounded mb-3"></div>
            
            {/* Informações do produto */}
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-200 rounded w-20 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
            
            {/* Preço e ações */}
            <div className="flex items-center justify-between">
              <div className="h-6 w-11 bg-gray-200 rounded-full"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
                <div className="w-6 h-6 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Margem inferior */}
      <div className="h-25"></div>
    </div>
  );
};
