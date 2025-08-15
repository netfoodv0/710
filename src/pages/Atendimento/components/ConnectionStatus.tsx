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
      <div className={`px-3 py-1 rounded-full text-xs font-medium ${
        isConnected 
          ? 'bg-green-600 text-white' 
          : 'bg-red-600 text-white'
      }`}>
        {isConnected ? '🟢 Conectado' : '🔴 Desconectado'}
      </div>
      
      {/* Botão para reconectar */}
      <button
        onClick={onReconnect}
        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
      >
        Reconectar WhatsApp
      </button>
    </div>
  );
};
