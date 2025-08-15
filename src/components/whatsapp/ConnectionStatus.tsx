import React, { memo, useMemo } from 'react';
import { Wifi, WifiOff, Loader2, AlertCircle, CheckCircle } from 'lucide-react';

interface ConnectionStatusProps {
  isConnected: boolean;
  isConnecting: boolean;
  error: string | null;
  statusMessage?: string;
  statusType?: 'info' | 'success' | 'error' | 'warning';
}

export const ConnectionStatus = memo(({
  isConnected,
  isConnecting,
  error,
  statusMessage,
  statusType
}: ConnectionStatusProps) => {
  
  // Memoizar o status para evitar re-renders desnecessários
  const statusInfo = useMemo(() => {
    if (isConnecting) {
      return {
        icon: <Loader2 className="w-4 h-4 animate-spin" />,
        text: statusMessage || 'Conectando...',
        color: 'text-blue-500',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-200'
      };
    }

    if (error) {
      return {
        icon: <AlertCircle className="w-4 h-4" />,
        text: error,
        color: 'text-red-500',
        bgColor: 'bg-red-50',
        borderColor: 'border-red-200'
      };
    }

    if (isConnected) {
      return {
        icon: <CheckCircle className="w-4 h-4" />,
        text: statusMessage || 'Conectado',
        color: 'text-green-500',
        bgColor: 'bg-green-50',
        borderColor: 'border-green-200'
      };
    }

    return {
      icon: <WifiOff className="w-4 h-4" />,
      text: statusMessage || 'Desconectado',
      color: 'text-gray-500',
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-200'
    };
  }, [isConnected, isConnecting, error, statusMessage]);

  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${statusInfo.bgColor} ${statusInfo.borderColor}`}>
      <div className={statusInfo.color}>
        {statusInfo.icon}
      </div>
      <span className={`text-sm font-medium ${statusInfo.color}`}>
        {statusInfo.text}
      </span>
    </div>
  );
});

ConnectionStatus.displayName = 'ConnectionStatus';
