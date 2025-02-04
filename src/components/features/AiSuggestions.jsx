// src/components/features/AiSuggestions.jsx
import React from "react";
import { Sparkles } from "lucide-react";

export const AiSuggestions = ({ suggestions, type }) => {
  if (!suggestions || suggestions.length === 0) return null;

  const getTypeStyles = () => {
    switch (type) {
      case "empty":
        return "bg-blue-50 border-blue-200 text-blue-800";
      case "short":
        return "bg-yellow-50 border-yellow-200 text-yellow-800";
      case "improvement":
        return "bg-green-50 border-green-200 text-green-800";
      default:
        return "bg-gray-50 border-gray-200 text-gray-800";
    }
  };

  return (
    <div className={`mt-3 p-3 rounded-lg border ${getTypeStyles()}`}>
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-4 h-4" />
        <span className="font-medium">AI підказки:</span>
      </div>
      <ul className="space-y-2">
        {suggestions.map((suggestion, index) => (
          <li key={index} className="flex items-start gap-2">
            <span>•</span>
            <span>{suggestion}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
