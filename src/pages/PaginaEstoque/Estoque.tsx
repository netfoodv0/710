import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { useEstoque } from './hooks';
import { EstoqueLayout, EstoqueError } from './components';

export default function Estoque() {
  const {
    produtos,
    columns,
    loading,
    error,
    isModalOpen,
    isModalDetalhesOpen,
    produtoSelecionado,
    handleOpenModal,
    handleCloseModal,
    handleOpenModalDetalhes,
    handleCloseModalDetalhes,
    handleAlterarEstoque,
    handleSave,
    handleRetry
  } = useEstoque();

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
        
        <EstoqueError error={error} onRetry={handleRetry} />
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

      <EstoqueLayout
        produtos={produtos}
        columns={columns}
        loading={loading}
        error={error}
        isModalOpen={isModalOpen}
        isModalDetalhesOpen={isModalDetalhesOpen}
        produtoSelecionado={produtoSelecionado}
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


