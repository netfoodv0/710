import React, { useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export interface NotificationToastProps {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <CheckCircle size={20} className="text-green-500" />;
      case 'error':
        return <AlertCircle size={20} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={20} className="text-yellow-500" />;
      case 'info':
        return <Info size={20} className="text-blue-500" />;
      default:
        return <Info size={20} className="text-gray-500" />;
    }
  };

  const getBackgroundColor = () => {
    switch (type) {
      case 'success':
        return 'bg-white border-green-200';
      case 'error':
        return 'bg-white border-red-200';
      case 'warning':
        return 'bg-white border-yellow-200';
      case 'info':
        return 'bg-white border-blue-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-sm w-full ${getBackgroundColor()} border rounded-sm shadow-lg p-4 transition-all duration-300 ease-in-out`}>
      <div className="flex items-start space-x-3">
        <div className="flex-shrink-0">
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-900">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}; 