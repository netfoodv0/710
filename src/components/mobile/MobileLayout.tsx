import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileHeader } from './MobileHeader';
import { MobileBottomNav } from './MobileBottomNav';
import { MobileSidebar } from './MobileSidebar';
import { MobilePWAInstall, MobilePWAInstalled } from './MobilePWAInstall';
import { useAuth } from '../../hooks';
import { PeriodProvider, usePeriod } from '../../context/periodContext';
import { PeriodType } from '../PeriodFilter';

interface MobileLayoutContentProps {
  children: React.ReactNode;
}

function MobileLayoutContent({ children }: MobileLayoutContentProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { selectedPeriod, setSelectedPeriod } = usePeriod();
  const { user, loja } = useAuth();
  const location = useLocation();

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader 
        onMenuToggle={handleSidebarToggle}
        currentPath={location.pathname}
      />
      
      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-20">
        <div className="px-4 py-4">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar (Overlay) */}
      <MobileSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Bottom Navigation */}
      <MobileBottomNav currentPath={location.pathname} />

      {/* PWA Components */}
      <MobilePWAInstall />
      <MobilePWAInstalled />
    </div>
  );
}

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  return (
    <PeriodProvider>
      <MobileLayoutContent>{children}</MobileLayoutContent>
    </PeriodProvider>
  );
} 