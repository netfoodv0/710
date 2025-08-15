import React, { useState } from 'react';
import { useWhatsAppConnection } from '../../../hooks/useWhatsAppConnection';
import { Wifi, WifiOff, Loader2, MessageCircle, Phone, AlertCircle, CheckCircle } from 'lucide-react';

interface WhatsAppConnectionProps {
  onConnectionChange?: (isConnected: boolean) => void;
}

export const WhatsAppConnection: React.FC<WhatsAppConnectionProps> = ({ onConnectionChange }) => {
  const { connectionState, initializeClient, disconnect, sendMessage, isBackendConnected } = useWhatsAppConnection();
  const [testMessage, setTestMessage] = useState('');
  const [testNumber, setTestNumber] = useState('');
  const [sending, setSending] = useState(false);

  React.useEffect(() => {
    onConnectionChange?.(connectionState.isConnected);
  }, [connectionState.isConnected, onConnectionChange]);

  const handleConnect = async () => {
    try {
      await initializeClient();
    } catch (error) {
      console.error('Erro ao conectar:', error);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  const handleSendTestMessage = async () => {
    if (!testNumber || !testMessage) return;

    setSending(true);
    try {
      await sendMessage(testNumber, testMessage);
      setTestMessage('');
      setTestNumber('');
      alert('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error('Erro ao enviar mensagem:', error);
      alert('Erro ao enviar mensagem: ' + (error as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-md mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-full ${connectionState.isConnected ? 'bg-green-100' : 'bg-gray-100'}`}>
            <MessageCircle className={`w-6 h-6 ${connectionState.isConnected ? 'text-green-600' : 'text-gray-600'}`} />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">WhatsApp Web</h3>
            <p className="text-sm text-gray-500">
              {connectionState.isConnected ? 'Conectado' : 'Desconectado'}
            </p>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className={`w-3 h-3 rounded-full ${
          connectionState.isConnected ? 'bg-green-500' : 
          connectionState.isConnecting ? 'bg-yellow-500' : 'bg-red-500'
        }`} />
      </div>

      {/* Backend Connection Status */}
      <div className="mb-4">
        <div className={`flex items-center gap-2 p-2 rounded-lg text-xs ${
          isBackendConnected 
            ? 'text-green-600 bg-green-50' 
            : 'text-red-600 bg-red-50'
        }`}>
          <div className={`w-2 h-2 rounded-full ${
            isBackendConnected ? 'bg-green-500' : 'bg-red-500'
          }`} />
          <span>
            Backend: {isBackendConnected ? 'Conectado' : 'Desconectado'}
          </span>
        </div>
      </div>

      {/* Connection Status */}
      <div className="mb-6">
        {connectionState.statusMessage && (
          <div className={`flex items-center gap-2 p-3 rounded-lg mb-3 ${
            connectionState.statusType === 'success' ? 'text-green-600 bg-green-50' :
            connectionState.statusType === 'error' ? 'text-red-600 bg-red-50' :
            connectionState.statusType === 'warning' ? 'text-yellow-600 bg-yellow-50' :
            'text-blue-600 bg-blue-50'
          }`}>
            {connectionState.isConnecting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : connectionState.statusType === 'success' ? (
              <CheckCircle className="w-4 h-4" />
            ) : connectionState.statusType === 'error' ? (
              <AlertCircle className="w-4 h-4" />
            ) : (
              <AlertCircle className="w-4 h-4" />
            )}
            <span className="text-sm">{connectionState.statusMessage}</span>
          </div>
        )}

        {connectionState.error && (
          <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg mb-3">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">{connectionState.error}</span>
          </div>
        )}

        {connectionState.isConnected && connectionState.clientInfo && (
          <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg">
            <CheckCircle className="w-4 h-4" />
            <div className="text-sm">
              <p>✅ <strong>{connectionState.clientInfo.pushname}</strong></p>
              <p>📱 {connectionState.clientInfo.wid.user}</p>
              <p>🌐 {connectionState.clientInfo.platform}</p>
            </div>
          </div>
        )}
      </div>

      {/* QR Code Display */}
      {connectionState.qrCode && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Escaneie o QR Code com seu WhatsApp:
          </h4>
          <div className="bg-white p-4 rounded-lg border-2 border-gray-200 flex items-center justify-center">
            <div 
              className="qr-code"
              dangerouslySetInnerHTML={{ 
                __html: `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(connectionState.qrCode)}" alt="QR Code" />` 
              }}
            />
          </div>
          <p className="text-xs text-gray-500 text-center mt-2">
            Abra o WhatsApp no seu celular → Menu → Aparelhos conectados → Conectar aparelho
          </p>
        </div>
      )}

      {/* Connection Controls */}
      <div className="mb-6">
        {!connectionState.isConnected && !connectionState.isConnecting ? (
          <button
            onClick={handleConnect}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
          >
            <Wifi className="w-4 h-4" />
            Conectar WhatsApp
          </button>
        ) : (
          <div className="space-y-3">
            <button
              onClick={handleDisconnect}
              disabled={connectionState.isConnecting}
              className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              <WifiOff className="w-4 h-4" />
              Desconectar WhatsApp
            </button>
            <p className="text-xs text-gray-500 text-center">
              ⚠️ Desconectar também fechará o terminal do backend
            </p>
          </div>
        )}
      </div>

      {/* Test Message Section */}
      {connectionState.isConnected && (
        <div className="border-t pt-6">
          <h4 className="text-sm font-medium text-gray-700 mb-3">Teste de Mensagem:</h4>
          
          <div className="space-y-3">
            <input
              type="text"
              placeholder="Número (ex: 5511999999999)"
              value={testNumber}
              onChange={(e) => setTestNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            
            <textarea
              placeholder="Digite sua mensagem..."
              value={testMessage}
              onChange={(e) => setTestMessage(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            />
            
            <button
              onClick={handleSendTestMessage}
              disabled={!testNumber || !testMessage || sending}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
            >
              {sending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Phone className="w-4 h-4" />
                  Enviar Mensagem
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
