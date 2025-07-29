import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Layout } from './components';
import { MobileLayout } from './components/mobile';
import { NotificationProvider } from './context/notificationContext.tsx';
import { AnalyticsProvider } from './context/analyticsContext.tsx';
import { AuthProvider } from './context/authContext';
import { useNotificationContext } from './context/notificationContextUtils';
import { NotificationToast } from './components/NotificationToast';
import { AppRoutes } from './routes';
import { useAuth } from './context/authContext';
import { useMediaQuery } from './hooks/useMediaQuery';

function AppContent() {
  const { notifications, removeNotification } = useNotificationContext();
  const { status, user } = useAuth();
  const { isMobile } = useMediaQuery();

  // Debug temporário
  console.log('Auth Status:', status);
  console.log('User:', user);

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
        <NotificationProvider>
          <AnalyticsProvider>
            <AppContent />
          </AnalyticsProvider>
        </NotificationProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
