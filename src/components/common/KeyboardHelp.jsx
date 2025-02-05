// src/components/common/KeyboardHelp.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Keyboard, X } from 'lucide-react';

const shortcuts = [
  { keys: ['Ctrl', 'S'], description: 'Зберегти історію' },
  { keys: ['Ctrl', 'H'], description: 'Показати/сховати допомогу' },
  { keys: ['Esc'], description: 'Закрити вікно' },
];

export const KeyboardHelp = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100]">
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md m-4"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Keyboard className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Клавіатурні скорочення
              </h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 
                       dark:hover:text-gray-300"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-4">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  {shortcut.keys.map((key, keyIndex) => (
                    <kbd
                      key={keyIndex}
                      className="px-2.5 py-1.5 text-sm font-mono font-medium text-gray-800 
                               dark:text-gray-200 bg-gray-100 dark:bg-gray-700 rounded-lg 
                               border border-gray-200 dark:border-gray-600 shadow-sm 
                               group-hover:border-yellow-500 transition-colors duration-200"
                    >
                      {key}
                    </kbd>
                  ))}
                </div>
                <span className="text-gray-600 dark:text-gray-300">
                  {shortcut.description}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div
          className="p-6 border-t border-gray-200 dark:border-gray-700 bg-gray-50 
                     dark:bg-gray-800/50 rounded-b-lg"
        >
          <button
            onClick={onClose}
            className="w-full py-2 bg-yellow-500 hover:bg-yellow-600 text-white 
                     rounded-lg transition-colors duration-200"
          >
            Зрозуміло
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default KeyboardHelp;
