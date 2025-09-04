import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';

// Hooks customizados
import { useConfiguracoes } from './hooks/useConfiguracoes';

// Componentes
import { ConfiguracoesLayout } from './components/ConfiguracoesLayout';

export default function Configuracoes() {
  const { 
    config, 
    loading, 
    error, 
    salvarConfiguracao, 
    resetarConfiguracao,
    abaAtiva,
    setAbaAtiva,
    hasChanges
  } = useConfiguracoes();

  const { showNotification } = useNotificationContext();

  const handleSave = async () => {
    try {
      await salvarConfiguracao(config);
      showNotification({
        type: 'success',
        title: 'Configurações salvas',
        message: 'As configurações foram salvas com sucesso!'
      });
    } catch (error) {
      showNotification({
        type: 'error',
        title: 'Erro ao salvar',
        message: 'Não foi possível salvar as configurações. Tente novamente.'
      });
    }
  };

  const handleReset = () => {
    resetarConfiguracao();
    showNotification({
      type: 'info',
      title: 'Configurações resetadas',
      message: 'As configurações foram resetadas para os valores padrão.'
    });
  };

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        <ConfiguracoesLayout
          config={config}
          loading={loading}
          error={error}
          onSave={handleSave}
          onReset={handleReset}
          hasChanges={hasChanges}
          abaAtiva={abaAtiva}
          onAbaChange={setAbaAtiva}
        />
        
        <NotificationToast />
      </div>
    </ErrorBoundary>
  );
}