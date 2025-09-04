import React from 'react';
import { useNotificationContext } from '../../context/notificationContextUtils';
import { NotificationToast } from '../../components/NotificationToast';
import { ErrorBoundary } from '../../components/ErrorBoundary';
import { useCupons } from './hooks';
import { CuponsLayout } from './components';

// Estilos removidos - usando apenas Tailwind CSS

export default function Cupons() {
  const { 
    data,
    handlePeriodChange,
    handleExport,
    handleView,
    handleEdit,
    handleDelete,
    handleAdd,
    categoriasFiltros,
    statusOptions,
    tipoOptions,
    columns,
    carregamentoCompleto,
    mostrarAnimacoes,
    alturasAnimadas
  } = useCupons();

  const { notifications, removeNotification } = useNotificationContext();

  return (
    <ErrorBoundary>
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

        {/* Conteúdo Principal */}
        <CuponsLayout 
          data={data}
          onPeriodChange={handlePeriodChange}
          onExport={handleExport}
          onView={handleView}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAdd}
          loading={data.loading}
          categoriasFiltros={categoriasFiltros}
          statusOptions={statusOptions}
          tipoOptions={tipoOptions}
          columns={columns}
          carregamentoCompleto={carregamentoCompleto}
          mostrarAnimacoes={mostrarAnimacoes}
          alturasAnimadas={alturasAnimadas}
        />
      </div>
    </ErrorBoundary>
  );
}
