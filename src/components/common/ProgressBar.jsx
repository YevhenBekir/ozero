// src/components/common/ProgressBar.jsx
import React from "react";
import { CheckCircle, Circle } from "lucide-react";

export const ProgressBar = ({ progress }) => {
  const { steps, totalProgress } = progress;

  return (
    <div className="mb-8">
      {/* Загальний прогрес */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">
            Загальний прогрес
          </span>
          <span className="text-sm font-medium text-gray-700">
            {Math.round(totalProgress)}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-yellow-500 h-2.5 rounded-full transition-all duration-300"
            style={{ width: `${totalProgress}%` }}
          />
        </div>
      </div>

      {/* Кроки */}
      <div className="space-y-4">
        {steps.map(({ field, percentage, isComplete }) => (
          <div key={field} className="flex items-center">
            <div className="flex-shrink-0">
              {isComplete ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400" />
              )}
            </div>
            <div className="ml-4 flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {field}
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {Math.round(percentage)}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-1.5">
                <div
                  className="bg-yellow-500 h-1.5 rounded-full transition-all duration-300"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
