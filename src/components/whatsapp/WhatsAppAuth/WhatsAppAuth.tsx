import React, { useState, useEffect } from 'react';
import { 
  Wifi, 
  WifiOff, 
  Lock,
  Loader2,
  RefreshCw
} from 'lucide-react';

import { useWhatsAppConnection } from '../../../hooks/useWhatsAppConnection';

interface WhatsAppAuthProps {
  onAuthenticated: () => void;
}

export const WhatsAppAuth: React.FC<WhatsAppAuthProps> = ({ onAuthenticated }) => {
  const { connectionState, initializeClient, disconnect, isBackendConnected } = useWhatsAppConnection();
  const [isReloading, setIsReloading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);

  // Quando autenticado, chamar o callback
  useEffect(() => {
    if (connectionState.isConnected && connectionState.clientInfo) {
      // Aguardar um pouco para mostrar o sucesso
      const timer = setTimeout(() => {
        onAuthenticated();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [connectionState.isConnected, connectionState.clientInfo, onAuthenticated]);

  const handleConnect = async () => {
    setIsGenerating(true);
    try {
      await initializeClient();
    } catch (error) {
      console.error('Erro ao conectar:', error);
      setIsGenerating(false);
    }
  };

  const handleDisconnect = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error('Erro ao desconectar:', error);
    }
  };

  const handleRetry = async () => {
    setIsReloading(true);
    try {
      await handleDisconnect();
      setTimeout(async () => {
        await handleConnect();
        setIsReloading(false);
      }, 1000);
    } catch (error) {
      console.error('Erro ao recarregar:', error);
      setIsReloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#eeebeb] flex items-center justify-center p-4">
      {/* Card Principal de Autenticação */}
      <div className="bg-white rounded-lg p-8 max-w-4xl w-full">
        <h2 className="text-xl font-semibold text-[#41525d] mb-8">
          Etapas para acessar
        </h2>
        
        <div className="flex gap-12 items-start">
          {/* Instruções à Esquerda */}
          <div className="flex-1 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-gray-600 font-medium text-sm">1</div>
              </div>
              <div>
                <p className="text-[#41525d] text-sm leading-relaxed">
                  Abra o <strong className="text-[#25d366]">WhatsApp</strong> no seu celular.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-gray-600 font-medium text-sm">2</div>
              </div>
              <div>
                <p className="text-[#41525d] text-sm leading-relaxed">
                  Toque em <strong>Mais opções</strong> no Android ou em <strong>Configurações</strong> no iPhone.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-gray-600 font-medium text-sm">3</div>
              </div>
              <div>
                <p className="text-[#41525d] text-sm leading-relaxed">
                  Toque em <strong>Dispositivos conectados</strong> e, em seguida, em <strong>Conectar dispositivo</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center flex-shrink-0">
                <div className="text-gray-600 font-medium text-sm">4</div>
              </div>
              <div>
                <p className="text-[#41525d] text-sm leading-relaxed">
                  Escaneie o QR code para confirmar
                </p>
              </div>
            </div>
          </div>

          {/* QR Code à Direita */}
          <div className="flex-1 flex flex-col items-center">
            {connectionState.qrCode ? (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 w-[250px] h-[250px]">
                <div 
                  className="qr-code"
                  dangerouslySetInnerHTML={{ 
                    __html: `<img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(connectionState.qrCode)}" alt="QR Code" />` 
                  }}
                />
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg border border-gray-200 mb-6 shadow-sm w-[250px] h-[250px] flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <p className="text-sm leading-relaxed font-bold">
                    Clique no botão abaixo para gerar o QR Code
                  </p>
                </div>
              </div>
            )}

            {/* Controles de Conexão */}
            <div className="flex flex-col gap-3 items-center">
              {!connectionState.isConnected && !connectionState.qrCode && (
                <button
                  onClick={handleConnect}
                  disabled={!isBackendConnected || isGenerating}
                  className={`py-3 px-6 rounded-[100px] flex items-center justify-center gap-2 transition-colors w-[200px] ${
                    isGenerating 
                      ? 'bg-green-200 text-green-800 cursor-not-allowed' 
                      : 'bg-[#25d366] hover:bg-[#20c35e] disabled:bg-gray-400 text-black'
                  }`}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando
                    </>
                  ) : (
                    <>
                      Gerar QR Code
                    </>
                  )}
                </button>
              )}
              
              {!connectionState.isConnected && connectionState.qrCode && (
                <button
                  onClick={handleRetry}
                  disabled={isReloading}
                  className={`py-3 px-6 rounded-[100px] flex items-center justify-center gap-2 transition-colors w-[200px] ${
                    isReloading 
                      ? 'bg-green-200 text-green-800 cursor-not-allowed' 
                      : 'bg-[#25d366] hover:bg-[#20c35e] text-black'
                  }`}
                >
                  {isReloading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Gerando
                    </>
                  ) : (
                    <>
                      Recarregar
                    </>
                  )}
                </button>
              )}
              
              {connectionState.isConnected && (
                <button
                  onClick={handleDisconnect}
                  className="bg-red-500 hover:bg-red-600 text-white font-medium py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors w-full"
                >
                  <WifiOff className="w-4 h-4" />
                  Desconectar
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
