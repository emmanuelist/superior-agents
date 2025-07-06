
export interface Notification {
  id: string;
  type: 'critical' | 'opportunity' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: Date;
  read: boolean;
  dismissed: boolean;
  category: 'yield' | 'portfolio' | 'agent' | 'transaction' | 'gas';
  actionUrl?: string;
  actionLabel?: string;
}

export interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read' | 'dismissed'>) => void;
  markAsRead: (id: string) => void;
  dismissNotification: (id: string) => void;
  clearAll: () => void;
}
