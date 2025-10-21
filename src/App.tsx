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
import { AutoRedirect } from './components/auth/AutoRedirect';

import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useIsMobile } from './hooks/useMediaQuery';

function AppContentInner() {
  const { status, user } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Se estiver na rota da landing page, sempre renderizar sem layout
  if (location.pathname === '/landing') {
    return <AppRoutes />;
  }

  // Se estiver carregando ou não autenticado, renderizar apenas as rotas sem layout
  if (status === 'idle' || status === 'loading' || status === 'unauthenticated') {
    return <AppRoutes />;
  }

  // Se estiver autenticado, renderizar com layout
  // Mas apenas se não estiver nas rotas de login/cadastro
  if (location.pathname === '/login' || location.pathname === '/cadastro') {
    return <AppRoutes />;
  }

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
      <AutoRedirect />
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
