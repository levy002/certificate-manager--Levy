import React, { useEffect, useState } from 'react';
import './Notification.css';

type NotificationType = 'success' | 'error';

interface NotificationProps {
  message: string;
  type: NotificationType;
}

const notificationEmitter = new EventTarget();

export const triggerNotification = (message: string, type: NotificationType) => {
  notificationEmitter.dispatchEvent(new CustomEvent('notification', { detail: { message, type } }));
};

const Notification: React.FC = () => {
  const [notification, setNotification] = useState<NotificationProps | null>(null);

  useEffect(() => {
    const handleNotification = (event: Event) => {
      const { message, type } = (event as CustomEvent).detail;
      setNotification({ message, type });
      setTimeout(() => setNotification(null), 3000);
    };

    notificationEmitter.addEventListener('notification', handleNotification);

    return () => {
      notificationEmitter.removeEventListener('notification', handleNotification);
    };
  }, []);

  if (!notification) return null;

  return (
    <div className={`notification ${notification.type}`}>
      <p>{notification.message}</p>
    </div>
  );
};

export default Notification;
