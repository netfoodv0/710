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
  const { status } = useAuth();
  const isMobile = useIsMobile();
  const location = useLocation();

  // Rotas que não devem ter sidebar/layout
  const routesWithoutLayout = [
    '/landing',
    '/cadastro',
    '/login'
  ];
  
  // Rotas conhecidas do sistema (rotas protegidas e públicas válidas)
  const knownRoutes = [
    '/',
    '/dashboard',
    '/pedidos',
    '/historico',
    '/cardapio',
    '/horarios',
    '/configuracoes',
    '/relatorios/geral',
    '/relatorios/produtos',
    '/cupons',
    '/usuarios',
    '/usuarios/operadores',
    '/usuarios/motoboys',
    '/mapa',
    '/organograma',
    '/estoque/produtos',
    '/estoque/acompanhamentos',
    '/relatorios',
    '/estoque',
    '/acompanhamentos'
  ];

  // Verificar se é uma rota conhecida (exata ou que começa com uma rota conhecida)
  const isKnownRoute = knownRoutes.some(route => {
    if (location.pathname === route) return true;
    // Para rotas aninhadas (ex: /usuarios/operadores/nested)
    if (route !== '/' && location.pathname.startsWith(route + '/')) return true;
    return false;
  });

  // Se estiver na rota da landing page, sempre renderizar sem layout
  if (location.pathname === '/landing') {
    return <AppRoutes />;
  }

  // Se estiver carregando ou não autenticado, renderizar apenas as rotas sem layout
  if (status === 'idle' || status === 'loading' || status === 'unauthenticated') {
    return <AppRoutes />;
  }

  // Se estiver autenticado, mas em rota que não deve ter layout
  if (routesWithoutLayout.includes(location.pathname)) {
    return <AppRoutes />;
  }

  // Se a rota não for conhecida e estiver autenticado, é provavelmente um 404
  // Renderizar sem layout para a página NotFound
  if (status === 'authenticated' && !isKnownRoute && !routesWithoutLayout.includes(location.pathname)) {
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
