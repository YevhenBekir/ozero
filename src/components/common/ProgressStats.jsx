// src/components/common/ProgressStats.jsx
import React from "react";
import { Trophy, Target, Zap } from "lucide-react";

export const ProgressStats = ({ progress }) => {
  const { completedSteps, totalSteps, totalProgress } = progress;

  return (
    <div className="grid grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">
            Завершено кроків
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {completedSteps}/{totalSteps}
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Target className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">
            Загальний прогрес
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {Math.round(totalProgress)}%
        </p>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="w-5 h-5 text-yellow-500" />
          <span className="text-sm font-medium text-gray-600">Залишилось</span>
        </div>
        <p className="text-2xl font-bold text-gray-800">
          {Math.round(100 - totalProgress)}%
        </p>
      </div>
    </div>
  );
};
