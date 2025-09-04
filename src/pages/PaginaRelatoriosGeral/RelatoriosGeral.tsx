import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { useRelatoriosGeral } from './hooks';
import { RelatoriosGeralLayout, RelatoriosGeralError } from './components';

export default function RelatoriosGeral() {
  const {
    selectedPeriod,
    loading,
    error,
    dadosRelatorios,
    handlePeriodChange,
    handleReportTypeChange,
    handleExport,
    handleRetry
  } = useRelatoriosGeral();

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
        
        <RelatoriosGeralError error={error} onRetry={handleRetry} />
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

      <RelatoriosGeralLayout
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        onExport={handleExport}
        loading={loading}
        error={error}
        dadosRelatorios={dadosRelatorios}
      />
    </div>
  );
}
