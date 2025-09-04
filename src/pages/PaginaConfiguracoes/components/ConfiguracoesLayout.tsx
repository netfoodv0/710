import React from 'react';
import { AlertCircle, Settings, Store, MapPin, Truck, ShoppingCart, Calendar, Receipt, CreditCard, Bell, Palette, Clock } from 'lucide-react';
import { PageHeader } from '../../../components/ui';
import { NotificationToast } from '../../../components/NotificationToast';
import { ErrorBoundary } from '../../../components/ErrorBoundary';
import { FormSection } from '../../../components/forms/FormSection';
import { ConfiguracoesLayoutProps } from '../types';

// Componentes de configuração
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
} from './index';

export function ConfiguracoesLayout({
  config,
  loading,
  error,
  onSave,
  onReset,
  hasChanges,
  abaAtiva,
  onAbaChange
}: ConfiguracoesLayoutProps) {
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
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700 transition-colors"
            >
              Tentar Novamente
            </button>
            <button
              onClick={() => window.location.reload()}
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
        {/* Cabeçalho da página */}
        <PageHeader
          title="Configurações"
          subtitle="Gerencie as configurações do seu restaurante"
          actionButton={{
            label: "Salvar Configurações",
            onClick: onSave,
            disabled: loading,
            variant: "success",
            size: "md"
          }}
        />

        {/* Conteúdo principal */}
        <div className="px-6 py-6 space-y-6">
          {/* Grid principal com 1 coluna para os cards em acordeão */}
          <div className="grid grid-cols-1 gap-6">
            
            {/* Configurações Gerais */}
            <FormSection
              title="Configurações Gerais"
              description="Configurações básicas do sistema"
              icon={<Settings size={30} />}
              defaultExpanded={true}
            >
              <ConfiguracoesGerais 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Informações da Loja */}
            <FormSection
              title="Informações da Loja"
              description="Dados da sua empresa"
              icon={<Store size={30} />}
            >
              <InformacoesLoja 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Endereço da Loja */}
            <FormSection
              title="Endereço da Loja"
              description="Localização e endereço"
              icon={<MapPin size={30} />}
            >
              <EnderecoLoja 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Configurações de Entrega */}
            <FormSection
              title="Configurações de Entrega"
              description="Configurações de delivery"
              icon={<Truck size={30} />}
            >
              <ConfiguracoesEntrega 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Modos de Pedidos */}
            <FormSection
              title="Modos de Pedidos"
              description="Configurações de pedidos"
              icon={<ShoppingCart size={30} />}
            >
              <ModosPedidos 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Configurações de Agendamento */}
            <FormSection
              title="Configurações de Agendamento"
              description="Horários e agendamentos"
              icon={<Calendar size={30} />}
            >
              <ConfiguracoesAgendamento 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Configuração da Notinha */}
            <FormSection
              title="Configuração da Notinha"
              description="Configurações de impressão"
              icon={<Receipt size={30} />}
            >
              <ConfiguracaoNotinha 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Configurações de Pagamento */}
            <FormSection
              title="Configurações de Pagamento"
              description="Métodos de pagamento"
              icon={<CreditCard size={30} />}
            >
              <ConfiguracoesPagamento 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Configurações de Notificações */}
            <FormSection
              title="Configurações de Notificações"
              description="Alertas e notificações"
              icon={<Bell size={30} />}
            >
              <ConfiguracoesNotificacoes 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Configurações de Aparência */}
            <FormSection
              title="Configurações de Aparência"
              description="Tema e visual"
              icon={<Palette size={30} />}
            >
              <ConfiguracoesAparencia 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>

            {/* Fuso Horário */}
            <FormSection
              title="Fuso Horário"
              description="Configurações de horário"
              icon={<Clock size={30} />}
            >
              <FusoHorario 
                config={config} 
                onConfigChange={(updates) => {
                  console.log('Config change:', updates);
                }}
                loading={loading}
              />
            </FormSection>
          </div> {/* Fim do grid principal */}
          
          {/* Margem inferior da página */}
          <div className="h-25"></div>
        </div>
      </div>
    </ErrorBoundary>
  );
}
