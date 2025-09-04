import React from 'react';
import { PageHeader } from '../../../components/ui';
import { HorariosForm } from './HorariosForm';
import { HorariosError } from './HorariosError';
import { HorariosLayoutProps } from '../types';

export function HorariosLayout({ 
  data, 
  onSave, 
  onRetry, 
  loading = false 
}: HorariosLayoutProps) {
  const { config, error } = data;

  // Error state
  if (error) {
    return <HorariosError error={error} onRetry={onRetry} />;
  }

  return (
    <div 
      className="min-h-screen" 
      style={{ 
        backgroundColor: 'transparent',
        scrollbarWidth: 'none', 
        msOverflowStyle: 'none',
        overflow: 'hidden'
      }}
    >
      {/* Cabeçalho da página */}
      <PageHeader
        title="Horários de Funcionamento"
        subtitle="Configure os horários de funcionamento do seu restaurante"
        actionButton={{
          label: "Salvar Horários",
          onClick: onSave,
          loading: loading,
          disabled: loading,
          variant: "success",
          size: "md"
        }}
      />

      {/* Main Content */}
      <div className="px-6 pt-6 overflow-hidden">
        <div className="w-full overflow-hidden">
          <HorariosForm 
            config={config}
            onHorarioChange={() => {}}
            onAdicionarPausa={() => {}}
            onRemoverPausa={() => {}}
            onAtualizarPausa={() => {}}
            onAdicionarHorarioEspecial={() => {}}
            onRemoverHorarioEspecial={() => {}}
            onAtualizarHorarioEspecial={() => {}}
            onAtualizarConfiguracaoAvancada={() => {}}
          />
        </div>
      </div>
    </div>
  );
}
