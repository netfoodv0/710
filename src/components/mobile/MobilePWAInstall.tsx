import React, { useState } from 'react';
import { Download, X, Check } from 'lucide-react';
import { MobileCard } from './MobileCard';
import { MobileButton } from './MobileButton';
import { usePWA } from '../../hooks/usePWA';

export function MobilePWAInstall() {
  const { canInstall, isInstalled, installPWA } = usePWA();
  const [isVisible, setIsVisible] = useState(true);
  const [isInstalling, setIsInstalling] = useState(false);

  const handleInstall = async () => {
    setIsInstalling(true);
    try {
      await installPWA();
    } catch (error) {
      console.error('Failed to install PWA:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    // Store in localStorage to remember user dismissed it
    localStorage.setItem('pwa-install-dismissed', 'true');
  };

  // Don't show if already installed or user dismissed
  if (isInstalled || !canInstall || !isVisible) {
    return null;
  }

  // Check if user previously dismissed
  React.useEffect(() => {
    const dismissed = localStorage.getItem('pwa-install-dismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  return (
    <div className="fixed bottom-20 left-4 right-4 z-50 animate-slide-up">
      <MobileCard className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white bg-opacity-20 rounded-lg">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-sm">Instalar App</h3>
              <p className="text-xs text-blue-100">
                Acesse mais rápido e receba notificações
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <MobileButton
              variant="outline"
              size="sm"
              onClick={handleInstall}
              loading={isInstalling}
              className="text-white border-white hover:bg-white hover:text-blue-600"
            >
              {isInstalling ? 'Instalando...' : 'Instalar'}
            </MobileButton>
            
            <button
              onClick={handleDismiss}
              className="p-1 rounded-lg hover:bg-white hover:bg-opacity-20 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </MobileCard>
    </div>
  );
}

export function MobilePWAInstalled() {
  const { isInstalled } = usePWA();
  const [showSuccess, setShowSuccess] = useState(false);

  React.useEffect(() => {
    if (isInstalled) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  }, [isInstalled]);

  if (!showSuccess) return null;

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-slide-down">
      <MobileCard className="bg-green-600 text-white">
        <div className="flex items-center gap-3">
          <Check className="w-5 h-5" />
          <div>
            <h3 className="font-semibold text-sm">App Instalado!</h3>
            <p className="text-xs text-green-100">
              O Sistema Voult foi instalado com sucesso
            </p>
          </div>
        </div>
      </MobileCard>
    </div>
  );
} 
