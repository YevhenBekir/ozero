// src/hooks/useNotifications.js
import { useState, useCallback } from "react";

export const useNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((notification) => {
    const id = Date.now();
    const newNotification = {
      id,
      ...notification,
      type: notification.type || "info",
    };

    setNotifications((prev) => [...prev, newNotification]);

    // Автоматичне видалення через 5 секунд
    setTimeout(() => {
      removeNotification(id);
    }, notification.duration || 5000);

    return id;
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  return {
    notifications,
    addNotification,
    removeNotification,
  };
};
