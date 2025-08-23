import React from 'react';

export const ConfiguracoesSkeleton: React.FC = () => {
  return (
    <div className="px-6 py-6 space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Configurações Gerais */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              {/* Nome do Restaurante */}
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Descrição */}
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                <div className="h-20 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              
              {/* CNPJ */}
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Telefone */}
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
              
              {/* Link Personalizado */}
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                <div className="h-10 bg-gray-200 rounded-lg animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Informações da Loja */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-36 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              {/* Foto da Loja */}
              <div className="flex flex-col space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                <div className="relative border-2 border-dashed rounded-lg p-6 text-center border-gray-300">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-40 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              </div>
              
              {/* Banner da Loja */}
              <div className="flex flex-col space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                <div className="relative border-2 border-dashed rounded-lg p-6 text-center border-gray-300">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="w-8 h-8 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-40 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Entrega */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-44 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              {/* Toggles de Entrega */}
              <div className="space-y-3">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                  </div>
                </div>
              </div>
              
              {/* Campos de Configuração */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modos de Pedidos */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-36 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-56"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-52"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Agendamento */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-52"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-6">
              <div className="flex-1">
                <div className="mb-4">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
                  <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                    <div className="mb-3 p-2 bg-blue-100 rounded-lg">
                      <div className="text-center">
                        <div className="h-3 bg-blue-200 rounded animate-pulse w-24 mb-1"></div>
                        <div className="h-3 bg-blue-200 rounded animate-pulse w-20"></div>
                      </div>
                    </div>
                    <div className="bg-white border-2 border-red-500 rounded-lg p-3 mb-3 relative">
                      <div className="text-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
                        <div className="h-6 bg-gray-200 rounded animate-pulse w-12"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col space-y-2 flex-1">
                          <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-16"></div>
                      </div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col space-y-2 flex-1">
                          <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-16"></div>
                      </div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-64 mb-2"></div>
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col space-y-2 flex-1">
                          <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-20"></div>
                      </div>
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
                      <div className="flex items-center space-x-2">
                        <div className="flex flex-col space-y-2 flex-1">
                          <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                        </div>
                        <div className="h-10 bg-gray-200 rounded-lg animate-pulse w-20"></div>
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                        <div className="h-4 bg-gray-200 rounded animate-pulse w-56"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configuração da Notinha */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-44 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-56"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="flex gap-6">
              <div className="space-y-4 flex-1">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-48 mb-2"></div>
                  <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-56 mb-2"></div>
                  <div className="flex items-center gap-3">
                    <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                  </div>
                </div>
              </div>
              <div className="flex-shrink-0">
                <div className="bg-white border border-gray-300 rounded-none font-mono text-xs shadow-lg" style={{ width: '265px', minHeight: '400px' }}>
                  <div className="text-center py-2 border-b border-gray-300">
                    <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-40"></div>
                  </div>
                  <div className="px-2 py-1">
                    <div className="text-center">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-28 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-32"></div>
                    </div>
                  </div>
                  <div className="px-2 py-1">
                    <div className="mb-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-1"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                    </div>
                    <div className="mb-2">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16 mb-1"></div>
                      <div className="flex justify-between items-start">
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      </div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-40 ml-2"></div>
                    </div>
                  </div>
                  <div className="px-2 py-1">
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                      <div className="h-3 bg-gray-200 rounded animate-pulse w-16"></div>
                    </div>
                    <div className="flex justify-between border-t border-gray-300 pt-1 mt-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                      <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                    </div>
                  </div>
                  <div className="text-center py-2 border-t border-gray-300">
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-32 mb-1"></div>
                    <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Pagamento */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-44 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-16"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-8"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-24"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Notificações */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-44 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-40"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-36"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Configurações de Aparência */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-44 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-48"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-12 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="h-4 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-28"></div>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-11 bg-gray-200 rounded-full animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-20"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Fuso Horário */}
        <div className="bg-white rounded-lg p-4 border" style={{ padding: '16px', borderColor: 'rgb(207, 209, 211)' }}>
          <div className="mb-4" style={{ height: '73px' }}>
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3 h-full">
                <div style={{ height: '73px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div className="h-6 bg-gray-200 rounded animate-pulse w-24 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded animate-pulse w-56"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="space-y-4">
              <div>
                <div className="h-4 bg-gray-200 rounded animate-pulse w-40 mb-2"></div>
                <div className="h-10 bg-gray-200 rounded-md animate-pulse"></div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="h-4 bg-blue-200 rounded animate-pulse w-48 mb-2"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="h-4 bg-blue-200 rounded animate-pulse w-24 mb-1"></div>
                    <div className="h-4 bg-blue-200 rounded animate-pulse w-32"></div>
                  </div>
                  <div>
                    <div className="h-4 bg-blue-200 rounded animate-pulse w-28 mb-1"></div>
                    <div className="h-4 bg-blue-200 rounded animate-pulse w-20"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-25"></div>
    </div>
  );
};
