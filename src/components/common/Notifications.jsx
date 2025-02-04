// src/components/common/Notifications.jsx
import React from "react";
import { CheckCircle, AlertCircle, XCircle, Info, X } from "lucide-react";

export const Notifications = ({ notifications, onRemove }) => {
  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "error":
        return <XCircle className="w-5 h-5 text-red-500" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  const getStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200 text-green-800";
      case "error":
        return "bg-red-50 border-red-200 text-red-800";
      case "warning":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      default:
        return "bg-blue-50 border-blue-200 text-blue-800";
    }
  };

  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`flex items-start gap-2 p-4 rounded-lg border shadow-lg max-w-sm animate-slide-in ${getStyles(
            notification.type
          )}`}
        >
          {getIcon(notification.type)}
          <div className="flex-1">
            {notification.title && (
              <h4 className="font-medium">{notification.title}</h4>
            )}
            <p className="text-sm">{notification.message}</p>
          </div>
          <button
            onClick={() => onRemove(notification.id)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};
