import React from 'react';
import { BrowserRouter, useLocation } from 'react-router-dom';
import { Layout } from './components';
import { MobileLayout } from './components/mobile';
import { AuthProvider } from './context/authContext';
import { LojaProvider } from './context/lojaContext';
import { PeriodProvider } from './context/periodContext';
import { NotificationProvider } from './context/notificationContext';
import { AnalyticsProvider } from './context/analyticsContext';
import { CacheProvider } from './context/cacheContext';
import { NavigationProvider } from './context/navigationContext';
import { EstatisticasProvider } from './context/estatisticasContext';

import { useNotificationContext } from './context/notificationContextUtils';
import { NotificationToast } from './components/NotificationToast';

import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useIsMobile } from './hooks/useMediaQuery';

function AppContentInner() {
  const { status, user } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Se estiver na rota raiz (LandingPage), sempre renderizar sem layout
  if (location.pathname === '/') {
    return <AppRoutes />;
  }

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

function AppContent() {
  return <AppContentInner />;
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
          onClose={() => removeNotification(notification.id)}
        />
      ))}

    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <CacheProvider>
        <AuthProvider>
          <LojaProvider>
            <NotificationProvider>
              <AnalyticsProvider>
                <PeriodProvider>
                  <EstatisticasProvider>
                    <NavigationProvider>
                      <AppWithNotifications />
                    </NavigationProvider>
                  </EstatisticasProvider>
                </PeriodProvider>
              </AnalyticsProvider>
            </NotificationProvider>
          </LojaProvider>
        </AuthProvider>
      </CacheProvider>
    </BrowserRouter>
  );
}

export default App;
