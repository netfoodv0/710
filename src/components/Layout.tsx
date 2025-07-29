import React, { useState } from 'react';
import { Sidebar } from './';
import { useAuth } from '../hooks';
import { PeriodProvider, usePeriod } from '../context/periodContext';
import { PeriodType } from './PeriodFilter';

interface LayoutContentProps {
  children: React.ReactNode;
}

function LayoutContent({ children }: LayoutContentProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const { selectedPeriod, setSelectedPeriod } = usePeriod();
  const { user, loja } = useAuth();

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar */}
      <Sidebar 
        isCollapsed={sidebarCollapsed} 
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Main Content */}
        <main className="flex-1 always-scroll bg-slate-50">
          {children}
        </main>
      </div>
    </div>
  );
}

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <PeriodProvider>
      <LayoutContent>{children}</LayoutContent>
    </PeriodProvider>
  );
}