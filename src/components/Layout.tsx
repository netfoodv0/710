import React, { memo } from 'react';
import { useAuth } from '../hooks';
import { DesktopSidebar } from './sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout = memo(({ children }: LayoutProps) => {
  const { user, loja } = useAuth();

  return (
    <div className="flex h-screen dashboard-container">
      {/* Desktop Sidebar */}
      <DesktopSidebar />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto dashboard-container">
          {children}
        </main>
      </div>
    </div>
  );
});