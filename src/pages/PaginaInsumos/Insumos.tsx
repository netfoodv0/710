import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { useInsumos } from './hooks';
import { InsumosLayout, InsumosError } from './components';

export default function Insumos() {
  const {
    insumos,
    columns,
    loading,
    error,
    isModalOpen,
    isModalDetalhesOpen,
    insumoSelecionado,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalDetalhes,
    handleCloseModalDetalhes,
    handleAlterarEstoque,
    handleSave,
    handleRetry
  } = useInsumos();

  const {
    notifications,
    removeNotification
  } = useNotificationContext();

  // Error state
  if (error) {
    return (
      <div className="min-h-screen">
        {/* Notificações */}
        {notifications.map((notification) => (
          <NotificationToast
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            duration={notification.duration}
            onClose={() => removeNotification(notification.id)}
          />
        ))}
        
        <InsumosError error={error} onRetry={handleRetry} />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Notificações */}
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={() => removeNotification(notification.id)}
        />
      ))}

      <InsumosLayout
        insumos={insumos}
        columns={columns}
        loading={loading}
        error={error}
        isModalOpen={isModalOpen}
        isModalDetalhesOpen={isModalDetalhesOpen}
        insumoSelecionado={insumoSelecionado}
        onOpenModal={handleOpenModal}
        onCloseModal={handleCloseModal}
        onOpenModalDetalhes={handleOpenModalDetalhes}
        onCloseModalDetalhes={handleCloseModalDetalhes}
        onAlterarEstoque={handleAlterarEstoque}
        onSave={handleSave}
      />
    </div>
  );
}
