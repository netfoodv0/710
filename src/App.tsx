import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { HeroUIProvider } from '@heroui/react';
import { Layout, LoadingScreen } from './components';
import { MobileLayout } from './components/mobile';
import { AuthProvider } from './context/authContext';
import { LojaProvider } from './context/lojaContext';
import { PeriodProvider } from './context/periodContext';
import { NotificationProvider } from './context/notificationContext';
import { AnalyticsProvider } from './context/analyticsContext';
import { CacheProvider } from './context/cacheContext';
import { LoadingProvider } from './context/loadingContext';
import { NavigationProvider } from './context/navigationContext';

import { useNotificationContext } from './context/notificationContextUtils';
import { NotificationToast } from './components/NotificationToast';
import { useLoading } from './context/loadingContext';
import { LoadingDebug } from './components/LoadingDebug';

import { AppRoutes } from './routes';
import { useAuth } from './hooks/useAuth';
import { useIsMobile } from './hooks/useMediaQuery';
import { usePageLoading } from './hooks/usePageLoading';

function AppContent() {
  const { status, user } = useAuth();
  const isMobile = useIsMobile();
  
  // Hook para controlar o carregamento da página
  usePageLoading();

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
  const { isLoading } = useLoading();

  return (
    <>
      <LoadingScreen isVisible={isLoading} />
      <LoadingDebug />
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
    <HeroUIProvider>
      <BrowserRouter>
        <CacheProvider>
          <LoadingProvider>
            <AuthProvider>
              <LojaProvider>
                <NotificationProvider>
                  <AnalyticsProvider>
                    <PeriodProvider>
                      <NavigationProvider>
                        <AppWithNotifications />
                      </NavigationProvider>
                    </PeriodProvider>
                  </AnalyticsProvider>
                </NotificationProvider>
              </LojaProvider>
            </AuthProvider>
          </LoadingProvider>
        </CacheProvider>
      </BrowserRouter>
    </HeroUIProvider>
  );
}

export default App;
