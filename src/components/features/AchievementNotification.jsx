// src/components/features/AchievementNotification.jsx
import React, { useEffect } from "react";
import { Trophy, X } from "lucide-react";

export const AchievementNotification = ({ achievement, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000); // Автоматично закриваємо через 5 секунд
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-4 right-4 w-80 bg-yellow-100 border border-yellow-200 rounded-lg p-4 shadow-lg animate-slide-in">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-600" />
          <h4 className="font-medium text-yellow-800">Нове досягнення!</h4>
        </div>
        <button
          onClick={onClose}
          className="text-yellow-800 hover:text-yellow-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-2xl">{achievement.icon}</span>
        <div>
          <p className="font-medium text-yellow-800">{achievement.title}</p>
          <p className="text-sm text-yellow-700">+{achievement.points} очків</p>
        </div>
      </div>
      <p className="mt-2 text-sm text-yellow-700">{achievement.description}</p>
    </div>
  );
};
