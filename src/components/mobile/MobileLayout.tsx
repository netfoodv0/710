import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { MobileHeader } from './MobileHeader';
import { MobileSidebar } from './MobileSidebar';
import { MobilePWAInstall, MobilePWAInstalled } from './MobilePWAInstall';
import { useAuth } from '../../hooks';
import { usePeriod } from '../../context/periodContext';
import { PeriodType } from '../filters/FiltroPeriodo';

interface MobileLayoutProps {
  children: React.ReactNode;
}

export function MobileLayout({ children }: MobileLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { selectedPeriod, setSelectedPeriod } = usePeriod();
  const { user, loja } = useAuth();
  const location = useLocation();

  // Handle scroll for header shadow
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handlePeriodChange = (period: PeriodType) => {
    setSelectedPeriod(period);
  };

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <MobileHeader 
        onMenuToggle={handleSidebarToggle}
        currentPath={location.pathname}
        isScrolled={isScrolled}
      />
      
      {/* Main Content - Ajustado sem rodapé fixo */}
      <main className="flex-1 overflow-y-auto pt-2">
        <div className="px-4 py-2 w-full max-w-md mx-auto">
          {children}
        </div>
      </main>

      {/* Mobile Sidebar (Overlay) */}
      <MobileSidebar 
        isOpen={sidebarOpen}
        onClose={handleSidebarClose}
      />

      {/* PWA Components */}
      <MobilePWAInstall />
      <MobilePWAInstalled />
    </div>
  );
} 