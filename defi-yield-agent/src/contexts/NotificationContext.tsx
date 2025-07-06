
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Notification, NotificationContextType } from '@/types/notifications';

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider = ({ children }: NotificationProviderProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load notifications from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('defi-notifications');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setNotifications(parsed.map((n: any) => ({
          ...n,
          timestamp: new Date(n.timestamp)
        })));
      } catch (error) {
        console.error('Failed to load notifications:', error);
      }
    }

    // Add some initial mock notifications
    addInitialNotifications();
  }, []);

  // Save to localStorage whenever notifications change
  useEffect(() => {
    localStorage.setItem('defi-notifications', JSON.stringify(notifications));
  }, [notifications]);

  const addInitialNotifications = () => {
    const mockNotifications = [
      {
        type: 'opportunity' as const,
        title: 'High Yield Detected',
        description: 'Compound USDT yield increased to 8.2% APY',
        category: 'yield' as const,
        actionUrl: '/yields',
        actionLabel: 'View Details'
      },
      {
        type: 'info' as const,
        title: 'Portfolio Milestone',
        description: 'Your portfolio crossed $15,000 in total value',
        category: 'portfolio' as const,
        actionUrl: '/overview',
        actionLabel: 'View Portfolio'
      },
      {
        type: 'success' as const,
        title: 'Auto-Rebalance Complete',
        description: 'Agent successfully optimized your yield allocation',
        category: 'agent' as const
      }
    ];

    setTimeout(() => {
      mockNotifications.forEach((notif, index) => {
        setTimeout(() => {
          addNotification(notif);
        }, index * 1000);
      });
    }, 2000);
  };

  const addNotification = (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'dismissed'>) => {
    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
      read: false,
      dismissed: false
    };

    setNotifications(prev => [newNotification, ...prev]);
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const dismissNotification = (id: string) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, dismissed: true } : notification
      )
    );
  };

  const clearAll = () => {
    setNotifications(prev =>
      prev.map(notification => ({ ...notification, read: true, dismissed: true }))
    );
  };

  const activeNotifications = notifications.filter(n => !n.dismissed);
  const unreadCount = activeNotifications.filter(n => !n.read).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications: activeNotifications,
        unreadCount,
        addNotification,
        markAsRead,
        dismissNotification,
        clearAll
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
