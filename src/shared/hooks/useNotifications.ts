import { useState, useCallback } from 'react';

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
}

export const useNotifications = () => {
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

  return {
    notifications,
    addNotification,
    removeNotification,
    showSuccess,
    showError,
    showInfo,
    showWarning
  };
}; 