// src/components/features/FieldTips.jsx
import React from "react";

export const FieldTips = ({ tips }) => {
  if (tips.length === 0) return null;

  return (
    <div className="mt-2 p-3 bg-yellow-50 rounded-md border border-yellow-100">
      <ul className="space-y-2">
        {tips.map((tip) => (
          <li
            key={tip.id}
            className="flex items-start gap-2 text-sm text-yellow-800"
          >
            <span className="text-yellow-500 mt-1">•</span>
            <span>{tip.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
