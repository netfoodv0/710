





























































































import React from 'react';

interface ConnectionStatusProps {
  isConnected: boolean;
  onReconnect: () => void;
}

export const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  isConnected, 
  onReconnect 
}) => {
  return (
    <div className="absolute top-4 right-4 flex flex-col gap-2">
      {/* Indicador de status */}
      <div className={`px-4 py-2 rounded text-white text-sm font-medium ${
        isConnected ? 'bg-purple-600 text-white'
        : 'bg-gray-600 text-white'
      }`}>
        {isConnected ? 'Conectado' : 'Desconectado'}
      </div>
      
      {/* Botão para reconectar */}
      <button
        onClick={onReconnect}
        className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded transition-colors"
      >
        Reconectar WhatsApp
      </button>
    </div>
  );
};
