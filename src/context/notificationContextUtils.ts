import { useContext } from 'react';
import { NotificationContext, Notification } from './notificationContext';

interface NotificationContextType {
  notifications: Notification[];
  showSuccess: (message: string, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  removeNotification: (id: string) => void;
}

export const useNotificationContext = (): NotificationContextType => {
  return useContext(NotificationContext);
}; 