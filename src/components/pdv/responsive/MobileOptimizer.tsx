import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Menu, X, Smartphone } from 'lucide-react';

interface MobileContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  showMobileMenu: boolean;
  toggleMobileMenu: () => void;
  closeMobileMenu: () => void;
}

const MobileContext = createContext<MobileContextType | undefined>(undefined);

export const useMobile = () => {
  const context = useContext(MobileContext);
  if (!context) {
    throw new Error('useMobile deve ser usado dentro de MobileProvider');
  }
  return context;
};

interface MobileProviderProps {
  children: ReactNode;
}

export const MobileProvider: React.FC<MobileProviderProps> = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      setIsTablet(width >= 768 && width < 1024);
      setIsDesktop(width >= 1024);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);

    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMobileMenu = () => {
    setShowMobileMenu(prev => !prev);
  };

  const closeMobileMenu = () => {
    setShowMobileMenu(false);
  };

  const value: MobileContextType = {
    isMobile,
    isTablet,
    isDesktop,
    showMobileMenu,
    toggleMobileMenu,
    closeMobileMenu
  };

  return (
    <MobileContext.Provider value={value}>
      {children}
    </MobileContext.Provider>
  );
};

// Componente para mostrar menu mobile
export const MobileMenuToggle: React.FC = () => {
  const { isMobile, showMobileMenu, toggleMobileMenu } = useMobile();

  if (!isMobile) return null;

  return (
    <button
      onClick={toggleMobileMenu}
      className="lg:hidden p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
    >
      {showMobileMenu ? <X size={20} /> : <Menu size={20} />}
    </button>
  );
};

// Componente para adaptar layout mobile
export const MobileLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { isMobile, showMobileMenu } = useMobile();

  if (!isMobile) {
    return <>{children}</>;
  }

  return (
    <div className={`transition-all duration-300 ${showMobileMenu ? 'ml-0' : '-ml-full'}`}>
      {children}
    </div>
  );
};

// Componente para mostrar indicador de modo mobile
export const MobileIndicator: React.FC = () => {
  const { isMobile, isTablet } = useMobile();

  if (!isMobile && !isTablet) return null;

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <div className="flex items-center space-x-2 px-3 py-2 bg-gray-800 text-white rounded-full text-xs">
        <Smartphone size={14} />
        <span>{isMobile ? 'Mobile' : 'Tablet'}</span>
      </div>
    </div>
  );
};
