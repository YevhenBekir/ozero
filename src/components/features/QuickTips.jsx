// src/components/features/QuickTips.jsx
import React from "react";
import { Lightbulb, X } from "lucide-react";

export const QuickTips = ({ tips, fieldTips, onClose }) => {
  const allTips = [...fieldTips, ...tips];

  if (allTips.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white rounded-lg shadow-lg overflow-hidden border border-yellow-200">
      <div className="bg-yellow-50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2 text-yellow-800">
          <Lightbulb className="w-5 h-5" />
          <h3 className="font-medium">Швидкі поради</h3>
        </div>
        <button
          onClick={onClose}
          className="text-yellow-800 hover:text-yellow-900"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto">
        <ul className="space-y-3">
          {allTips.map((tip) => (
            <li
              key={tip.id}
              className="flex items-start gap-2 text-sm text-gray-700"
            >
              <span className="text-yellow-500 mt-1">•</span>
              <span>{tip.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
