import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components';
import { MobileLayout } from './components/mobile';
import { AuthProvider } from './context/authContext';
import { LojaProvider } from './context/lojaContext';
import { PeriodProvider } from './context/periodContext';
import { NotificationProvider } from './context/notificationContext';
import { AnalyticsProvider } from './context/analyticsContext';
import { useNotificationContext } from './context/notificationContextUtils';
import { NotificationToast } from './components/NotificationToast';
import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useIsMobile } from './hooks/useMediaQuery';

function AppContent() {
  const { status, user } = useAuth();
  const isMobile = useIsMobile();

  // Se estiver carregando ou não autenticado, renderizar apenas as rotas sem layout
  if (status === 'idle' || status === 'loading' || status === 'unauthenticated') {
    return <AppRoutes />;
  }

  // Se estiver autenticado, renderizar com layout
  return (
    <>
      {isMobile ? (
        <MobileLayout>
          <AppRoutes />
        </MobileLayout>
      ) : (
        <Layout>
          <AppRoutes />
        </Layout>
      )}
    </>
  );
}

function AppWithNotifications() {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <>
      <AppContent />
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={removeNotification}
        />
      ))}
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <LojaProvider>
          <NotificationProvider>
            <AnalyticsProvider>
              <PeriodProvider>
                <AppWithNotifications />
              </PeriodProvider>
            </AnalyticsProvider>
          </NotificationProvider>
        </LojaProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
