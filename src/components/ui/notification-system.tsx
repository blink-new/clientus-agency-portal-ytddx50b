import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Card, CardContent } from './card';
import { Button } from './button';
import { Badge } from './badge';
import { X, Bell, CheckCircle, AlertTriangle, Info, AlertCircle } from 'lucide-react';
import { mockNotifications } from '../../data/mockData';

interface NotificationSystemProps {
  className?: string;
}

const NotificationSystem: React.FC<NotificationSystemProps> = ({ className }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      const userNotifications = mockNotifications.filter(n => n.userId === user.id && !n.read);
      setNotifications(userNotifications);
      setIsVisible(userNotifications.length > 0);
    }
  }, [user]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'border-green-200 bg-green-50';
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'error':
        return 'border-red-200 bg-red-50';
      default:
        return 'border-blue-200 bg-blue-50';
    }
  };

  const dismissNotification = (notificationId: string) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    if (notifications.length <= 1) {
      setIsVisible(false);
    }
  };

  const dismissAll = () => {
    setNotifications([]);
    setIsVisible(false);
  };

  if (!isVisible || notifications.length === 0) {
    return null;
  }

  return (
    <div className={`fixed top-20 right-4 z-50 space-y-3 max-w-sm ${className}`}>
      {notifications.length > 1 && (
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="flex items-center space-x-1">
            <Bell className="w-3 h-3" />
            <span>{notifications.length} notificações</span>
          </Badge>
          <Button
            variant="ghost"
            size="sm"
            onClick={dismissAll}
            className="text-xs"
          >
            Dispensar todas
          </Button>
        </div>
      )}
      
      {notifications.slice(0, 3).map((notification) => (
        <Card
          key={notification.id}
          className={`shadow-lg border-l-4 ${getNotificationColor(notification.type)} animate-in slide-in-from-right duration-300`}
        >
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              {getNotificationIcon(notification.type)}
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-slate-900">
                  {notification.title}
                </h4>
                <p className="text-sm text-slate-600 mt-1">
                  {notification.message}
                </p>
                <p className="text-xs text-slate-500 mt-2">
                  {new Date(notification.createdAt).toLocaleString('pt-BR')}
                </p>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => dismissNotification(notification.id)}
                className="h-6 w-6 p-0 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
      
      {notifications.length > 3 && (
        <Card className="shadow-lg border-slate-200 bg-slate-50">
          <CardContent className="p-3 text-center">
            <p className="text-sm text-slate-600">
              +{notifications.length - 3} notificações adicionais
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={dismissAll}
              className="text-xs mt-1"
            >
              Ver todas
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default NotificationSystem;