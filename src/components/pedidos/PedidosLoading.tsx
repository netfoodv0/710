import React from 'react';

interface PedidosLoadingProps {
  isVisible: boolean;
  type?: 'skeleton' | 'spinner' | 'progress';
}

export const PedidosLoading: React.FC<PedidosLoadingProps> = ({ 
  isVisible, 
  type = 'skeleton' 
}) => {
  if (!isVisible) return null;

  if (type === 'spinner') {
    return (
      <div className="flex items-center justify-center py-12 px-6">
        <div className="relative">
          <div className="w-12 h-12 border-4 border-gray-200 border-t-purple-600 rounded-full"></div>
          <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-400 rounded-full"></div>
        </div>
        <span className="ml-4 text-gray-600 font-medium">Carregando pedidos...</span>
      </div>
    );
  }

  if (type === 'progress') {
    return (
      <div className="space-y-4 py-8 px-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-gray-200 border-t-purple-600 rounded-full"></div>
          <h3 className="text-lg font-medium text-gray-800 mb-2">Carregando pedidos</h3>
          <div className="w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
          </div>
        </div>
      </div>
    );
  }

  // Default: skeleton loading simples - apenas cards de sessão
  return (
    <div className="space-y-6 px-6">
      {/* Cards de sessão skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-white border h-[62px] rounded-t-lg"
            style={{ borderColor: 'rgb(207, 209, 211)' }}
          >
            <div className="bg-white px-3 py-2 h-full relative rounded-t-lg">
              <div className="bg-gray-200 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold absolute top-2 right-2"></div>
              <div className="h-4 bg-gray-200 rounded w-20 mb-1"></div>
              <div className="flex items-center gap-2">
                <div className="h-4 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
