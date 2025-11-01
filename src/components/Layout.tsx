import React, { memo } from 'react';
import { useAuth } from '../hooks';
import { DesktopSidebar } from './sidebar';
import { PageHeaderProvider } from './ui/PageHeaderContext';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  const { user, loja } = useAuth();

  return (
    <div className="flex h-screen dashboard-container">
      {/* Desktop Sidebar - Fixo */}
      <div className="flex-shrink-0">
        <DesktopSidebar />
      </div>
      
      {/* Main Content - Com margem à esquerda para respeitar o sidebar */}
      <PageHeaderProvider>
        <div className="flex-1 flex flex-col ml-0">
          {/* Main Content */}
          <main className="flex-1 overflow-y-auto dashboard-container dashboard-main-content">
            {children}
          </main>
        </div>
      </PageHeaderProvider>
    </div>
  );
});