
import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info, TrendingUp, X } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useNotifications } from '@/contexts/NotificationContext';
import { Notification } from '@/types/notifications';

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'critical':
      return <AlertTriangle className="h-4 w-4 text-red-400" />;
    case 'opportunity':
      return <TrendingUp className="h-4 w-4 text-emerald-400" />;
    case 'success':
      return <CheckCircle className="h-4 w-4 text-green-400" />;
    case 'info':
    default:
      return <Info className="h-4 w-4 text-blue-400" />;
  }
};

const getNotificationBorderColor = (type: Notification['type']) => {
  switch (type) {
    case 'critical':
      return 'border-red-500/30';
    case 'opportunity':
      return 'border-emerald-500/30';
    case 'success':
      return 'border-green-500/30';
    case 'info':
    default:
      return 'border-blue-500/30';
  }
};

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const { markAsRead, dismissNotification } = useNotifications();

  const handleClick = () => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
  };

  const handleDismiss = (e: React.MouseEvent) => {
    e.stopPropagation();
    dismissNotification(notification.id);
  };

  const timeAgo = React.useMemo(() => {
    const now = new Date();
    const diff = now.getTime() - notification.timestamp.getTime();
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  }, [notification.timestamp]);

  return (
    <div
      className={`p-3 rounded-lg border bg-slate-800/50 backdrop-blur-sm cursor-pointer transition-all hover:bg-slate-700/50 ${
        getNotificationBorderColor(notification.type)
      } ${!notification.read ? 'ring-1 ring-blue-500/20' : ''}`}
      onClick={handleClick}
    >
      <div className="flex items-start justify-between space-x-3">
        <div className="flex items-start space-x-3 flex-1 min-w-0">
          <div className="flex-shrink-0 mt-0.5">
            {getNotificationIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-2">
              <h4 className="text-sm font-medium text-white truncate">
                {notification.title}
              </h4>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0"></div>
              )}
            </div>
            <p className="text-xs text-slate-300 mt-1 line-clamp-2">
              {notification.description}
            </p>
            <div className="flex items-center justify-between mt-2">
              <span className="text-xs text-slate-400">{timeAgo}</span>
              {notification.actionLabel && (
                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                  {notification.actionLabel}
                </button>
              )}
            </div>
          </div>
        </div>
        <button
          onClick={handleDismiss}
          className="text-slate-400 hover:text-slate-300 p-1 -mt-1 -mr-1"
        >
          <X className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};

export const NotificationPanel = () => {
  const { notifications, unreadCount, clearAll } = useNotifications();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button className="relative p-2 text-muted-foreground hover:text-foreground transition-colors touch-target">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-success rounded-full animate-pulse"></div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-80 p-0 bg-slate-900/95 backdrop-blur-xl border-white/10" 
        align="end"
      >
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-white">Notifications</h3>
            <div className="flex items-center space-x-2">
              {unreadCount > 0 && (
                <span className="text-xs bg-blue-500/20 text-blue-300 px-2 py-1 rounded-full">
                  {unreadCount} new
                </span>
              )}
              {notifications.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAll}
                  className="text-xs text-slate-400 hover:text-slate-300 h-auto p-1"
                >
                  Clear all
                </Button>
              )}
            </div>
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            <div className="p-3 space-y-3">
              {notifications.map((notification) => (
                <NotificationItem key={notification.id} notification={notification} />
              ))}
            </div>
          ) : (
            <div className="p-6 text-center">
              <Bell className="h-8 w-8 text-slate-600 mx-auto mb-2" />
              <p className="text-sm text-slate-400">No notifications yet</p>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
