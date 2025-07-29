import { createContext } from 'react';
import React, { ReactNode, useState, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

interface NotificationContextType {
  notifications: Notification[];
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  removeNotification: (id: string) => void;
}

// ✅ CORREÇÃO: Inicializar com valor padrão
const defaultContext: NotificationContextType = {
  notifications: [],
  showSuccess: () => {},
  showError: () => {},
  showInfo: () => {},
  showWarning: () => {},
  removeNotification: () => {}
};

export const NotificationContext = createContext<NotificationContextType>(defaultContext);

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((notification: Omit<Notification, 'id'>) => {
    const id = `notification-${Date.now()}-${Math.random()}`;
    const newNotification: Notification = {
      ...notification,
      id
    };
    
    setNotifications(prev => [...prev, newNotification]);
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  }, []);

  const showSuccess = useCallback((message: string, duration?: number) => {
    addNotification({ message, type: 'success', duration });
  }, [addNotification]);

  const showError = useCallback((message: string, duration?: number) => {
    addNotification({ message, type: 'error', duration });
  }, [addNotification]);

  const showInfo = useCallback((message: string, duration?: number) => {
    addNotification({ message, type: 'info', duration });
  }, [addNotification]);

  const showWarning = useCallback((message: string, duration?: number) => {
    addNotification({ message, type: 'warning', duration });
  }, [addNotification]);

  const value = {
    notifications,
    showSuccess,
    showError,
    showInfo,
    showWarning,
    removeNotification
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
}; 