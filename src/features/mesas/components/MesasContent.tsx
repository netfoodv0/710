import React from 'react';
import { MesasHeader } from './MesasHeader';
import { MesasGrid } from './MesasGrid';
import { MesasModals } from './MesasModals';
import { MesasNotifications } from './MesasNotifications';
import { MesasError } from './MesasError';
import { useMesasContext } from '../../../context/MesasContext';

export function MesasContent() {
  const { error } = useMesasContext();

  // Se houver erro, mostrar componente de erro
  if (error) {
    return (
      <MesasError 
        error={error} 
        onRetry={() => window.location.reload()} 
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#eeebeb' }}>
      {/* Notificações */}
      <MesasNotifications />

      {/* Cabeçalho */}
      <MesasHeader />

      {/* Espaço para não sobrepor o conteúdo */}
      <div className="h-0" />

      {/* Conteúdo Principal */}
      <div className="pt-6 px-6">
        <MesasGrid />
      </div>

      {/* Modais */}
      <MesasModals />
    </div>
  );
}