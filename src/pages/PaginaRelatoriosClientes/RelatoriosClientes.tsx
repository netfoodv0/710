import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { useRelatoriosClientes } from './hooks';
import { RelatoriosClientesLayout, RelatoriosClientesError } from './components';

export default function RelatoriosClientes() {
  const {
    selectedPeriod,
    loading,
    error,
    clientes,
    columns,
    categorias,
    statusOptions,
    estatisticasClientes,
    cardValues,
    cardPercentages,
    mostrarAnimacoes,
    carregamentoCompleto,
    alturasAnimadas,
    handlePeriodChange,
    handleReportTypeChange,
    handleExport,
    handleRetry
  } = useRelatoriosClientes();

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
        
        <RelatoriosClientesError error={error} onRetry={handleRetry} />
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

      <RelatoriosClientesLayout
        selectedPeriod={selectedPeriod}
        onPeriodChange={handlePeriodChange}
        onReportTypeChange={handleReportTypeChange}
        onExport={handleExport}
        loading={loading}
        error={error}
        clientes={clientes}
        columns={columns}
        categorias={categorias}
        statusOptions={statusOptions}
        estatisticasClientes={estatisticasClientes}
        cardValues={cardValues}
        cardPercentages={cardPercentages}
        mostrarAnimacoes={mostrarAnimacoes}
        carregamentoCompleto={carregamentoCompleto}
        alturasAnimadas={alturasAnimadas}
      />
    </div>
  );
}
