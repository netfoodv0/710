import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { useRelatoriosProdutos } from './hooks';
import { RelatoriosProdutosLayout, RelatoriosProdutosError } from './components';

export default function RelatoriosProdutos() {
  const {
    selectedPeriod,
    loading,
    error,
    produtos,
    columns,
    categoriasFiltros,
    statusOptions,
    destaqueOptions,
    estatisticasProdutos,
    handlePeriodChange,
    handleExport,
    handleRetry
  } = useRelatoriosProdutos();

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
        
        <RelatoriosProdutosError error={error} onRetry={handleRetry} />
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

      <RelatoriosProdutosLayout
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        onExport={handleExport}
        loading={loading}
        error={error}
        produtos={produtos}
        columns={columns}
        categoriasFiltros={categoriasFiltros}
        statusOptions={statusOptions}
        destaqueOptions={destaqueOptions}
        estatisticasProdutos={estatisticasProdutos}
      />
    </div>
  );
}


