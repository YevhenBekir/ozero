// src/components/common/KeyboardHelp.jsx
import React from "react";
import { Keyboard } from "lucide-react";

export const KeyboardHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const shortcuts = [
    { keys: ["Ctrl", "S"], description: "Зберегти історію" },
    { keys: ["Ctrl", "E"], description: "Експортувати історію" },
    { keys: ["Ctrl", "H"], description: "Показати/сховати допомогу" },
    { keys: ["Esc"], description: "Закрити вікно" },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-96">
        <div className="flex items-center gap-2 mb-4">
          <Keyboard className="w-6 h-6 text-yellow-500" />
          <h3 className="text-lg font-medium">Клавіатурні скорочення</h3>
        </div>

        <div className="space-y-3">
          {shortcuts.map((shortcut, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                {shortcut.keys.map((key, keyIndex) => (
                  <span
                    key={keyIndex}
                    className="px-2 py-1 bg-gray-100 rounded text-sm font-mono"
                  >
                    {key}
                  </span>
                ))}
              </div>
              <span className="text-gray-600">{shortcut.description}</span>
            </div>
          ))}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
        >
          Зрозуміло
        </button>
      </div>
    </div>
  );
};
