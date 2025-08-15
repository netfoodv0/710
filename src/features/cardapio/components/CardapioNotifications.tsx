import React from 'react';
import { NotificationToast } from '../../../components/NotificationToast';
import { useNotificationContext } from '../../../context/notificationContextUtils';

export function CardapioNotifications() {
  const { notifications, removeNotification } = useNotificationContext();

  return (
    <>
      {notifications.map((notification) => (
        <NotificationToast
          key={notification.id}
          id={notification.id}
          message={notification.message}
          type={notification.type}
          duration={notification.duration}
          onClose={removeNotification}
        />
      ))}
    </>
  );
}
