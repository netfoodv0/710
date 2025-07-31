import { useNotificationContext } from '../context/notificationContextUtils';

export const useNotifications = () => {
  return useNotificationContext();
}; 