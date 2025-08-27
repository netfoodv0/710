import React from 'react';
import { AlertCircle } from 'lucide-react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { PageHeader } from '../../components/ui';

// Hooks customizados
import { useConfiguracoes } from './hooks/useConfiguracoes';
import { useConfiguracoesForm } from './hooks/useConfiguracoesForm';
import { useConfiguracoesActions } from './hooks/useConfiguracoesActions';

// Componentes refatorados
import {
  ConfiguracoesGerais,
  InformacoesLoja,
  EnderecoLoja,
  ConfiguracoesEntrega,
  ModosPedidos,
  ConfiguracoesAgendamento,
  ConfiguracaoNotinha,
  ConfiguracoesPagamento,
  ConfiguracoesNotificacoes,
  ConfiguracoesAparencia,
  FusoHorario
} from './components';

export default function Configuracoes() {
  const { 
    config, 
    setConfig, 
    salvando,
    handleSalvar, 
    error, 
    limparErro
  } = useConfiguracoes();
  
  const {
    notifications,
    removeNotification
  } = useNotificationContext();

  // Hook customizado para gerenciar o formulário
  const form = useConfiguracoesForm(config, setConfig);

  // Hook customizado para gerenciar as ações
  const actions = useConfiguracoesActions(
    config,
    handleSalvar,
    limparErro
  );

  // Error state
  if (error) {
    return (
      <div className="h-full p-4">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-center mb-4">
            <AlertCircle className="w-6 h-6 text-red-600 mr-3" />
            <h3 className="text-lg font-medium text-red-800">Erro ao carregar configurações</h3>
          </div>
          <p className="text-red-700 mb-4">{error}</p>
          <div className="flex gap-3">
            <button
              onClick={actions.handleRetry}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={actions.handleReload}
              className="px-4 py-2 border border-red-300 text-red-700 text-sm font-medium rounded hover:bg-red-50 transition-colors"
            >
              Recarregar Página
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="min-h-screen">
        {/* Notificações */}
        <div className="fixed top-4 right-4 z-50 space-y-2">
          {notifications.map((notification) => (
            <NotificationToast
              key={notification.id}
              {...notification}
              onClose={() => removeNotification(notification.id)}
            />
          ))}
        </div>

        {/* Cabeçalho da página */}
        <PageHeader
          title="Configurações"
          subtitle="Gerencie as configurações do seu restaurante"
          actionButton={{
            label: "Salvar Configurações",
            onClick: actions.handleSave,
            disabled: salvando,
            variant: "success",
            size: "md"
          }}
        />

        {/* Conteúdo principal */}
        <div className="px-6 py-6 space-y-6">
          {/* Grid principal com 2 colunas para os cards */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            
            {/* Configurações Gerais */}
            <ConfiguracoesGerais form={form} />

            {/* Informações da Loja */}
            <InformacoesLoja form={form} />

            {/* Endereço da Loja */}
            <EnderecoLoja form={form} />

            {/* Configurações de Entrega */}
            <ConfiguracoesEntrega form={form} />

            {/* Modos de Pedidos */}
            <ModosPedidos form={form} />

            {/* Configurações de Agendamento */}
            <ConfiguracoesAgendamento form={form} />

            {/* Configuração da Notinha */}
            <ConfiguracaoNotinha form={form} />

            {/* Configurações de Pagamento */}
            <ConfiguracoesPagamento form={form} />

            {/* Configurações de Notificações */}
            <ConfiguracoesNotificacoes form={form} />

            {/* Configurações de Aparência */}
            <ConfiguracoesAparencia form={form} />

            {/* Fuso Horário */}
            <FusoHorario form={form} />
          </div> {/* Fim do grid principal */}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
