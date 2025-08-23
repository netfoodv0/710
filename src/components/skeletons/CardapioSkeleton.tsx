import React from 'react';

export const CardapioSkeleton: React.FC = () => {
  return (
    <div className="pt-6 px-6">
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Sidebar de Categorias */}
        <div className="w-full lg:w-[360px] flex-shrink-0 space-y-6">
          <div className="bg-white border rounded-lg p-4" style={{ borderColor: 'rgb(207, 209, 211)' }}>
            {/* Header das Categorias - APENAS O HEADER */}
            <div className="bg-white border rounded-lg p-4 mb-4" style={{ borderColor: 'rgb(207, 209, 211)' }}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
                <div className="h-9 bg-gray-200 rounded-lg animate-pulse w-32"></div>
              </div>
            </div>
            
            {/* Lista de Categorias - SEPARADA do header */}
            <div className="space-y-3 lg:space-y-3 flex flex-row lg:flex-col gap-3 lg:gap-0 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
              {/* Categoria 1 */}
              <div className="flex-shrink-0 lg:w-full w-auto flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 relative" style={{ borderColor: 'rgb(207, 209, 211)' }}>
                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mr-2">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Categoria 2 */}
              <div className="flex-shrink-0 lg:w-full w-auto flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 relative" style={{ borderColor: 'rgb(207, 209, 211)' }}>
                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mr-2">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Categoria 3 */}
              <div className="flex-shrink-0 lg:w-full w-auto flex items-center gap-3 p-3 rounded-lg border transition-all duration-200 relative" style={{ borderColor: 'rgb(207, 209, 211)' }}>
                <div className="flex-shrink-0 w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                <div className="flex-1 min-w-0">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0 mr-2">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-4 h-4 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Área Principal - Produtos */}
        <div className="flex-1 space-y-6">
          <div className="bg-white border rounded-lg" style={{ borderColor: 'rgb(207, 209, 211)' }}>
            <div className="p-4">
              <div className="space-y-4">
                {/* Header da Categoria */}
                <div className="bg-white rounded-lg border p-4" style={{ height: '73px', borderColor: 'rgb(207, 209, 211)' }}>
                  <div className="flex items-center justify-between h-full">
                    <div className="h-6 bg-gray-200 rounded animate-pulse w-32"></div>
                    <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-36"></div>
                  </div>
                </div>

                {/* Grid de Produtos */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Produto 1 */}
                  <div className="bg-white border rounded-lg h-[98px] p-3" style={{ borderColor: 'rgb(207, 209, 211)' }}>
                    <div className="flex items-center gap-3 h-full">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col space-y-2 mb-0">
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="flex flex-col">
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                              </div>
                            </div>
                          </div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                        </div>
                      </div>
                      
                      {/* Imagem do Produto */}
                      <div className="flex-shrink-0 w-[70px] h-[70px]">
                        <div className="w-full h-full bg-gray-200 rounded-sm animate-pulse"></div>
                      </div>
                      
                      {/* Informações do Produto */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                      
                      {/* Botões de Ação */}
                      <div className="flex flex-col items-center justify-center gap-1 flex-shrink-0">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>

                  {/* Produto 2 */}
                  <div className="bg-white border rounded-lg h-[98px] p-3" style={{ borderColor: 'rgb(207, 209, 211)' }}>
                    <div className="flex items-center gap-3 h-full">
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="flex items-center gap-2">
                          <div className="flex flex-col space-y-2 mb-0">
                            <div className="flex items-center gap-3">
                              <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                              <div className="flex flex-col">
                                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                              </div>
                            </div>
                          </div>
                          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
                        </div>
                      </div>
                      
                      {/* Imagem do Produto */}
                      <div className="flex-shrink-0 w-[70px] h-[70px]">
                        <div className="w-full h-full bg-gray-200 rounded-sm animate-pulse"></div>
                      </div>
                      
                      {/* Informações do Produto */}
                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-20 mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                      
                      {/* Botões de Ação */}
                      <div className="flex flex-col items-center justify-center gap-1 flex-shrink-0">
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                        <div className="w-6 h-6 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
