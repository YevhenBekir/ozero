// src/components/features/AiSuggestions.jsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Lightbulb, Target } from 'lucide-react';

export const AiSuggestions = ({ suggestions, type }) => {
  if (!suggestions || suggestions.length === 0) return null;

  const getTypeConfig = () => {
    switch (type) {
      case 'empty':
        return {
          icon: Target,
          baseStyle:
            'bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-900/20 dark:border-blue-800 dark:text-blue-200',
          iconColor: 'text-blue-500 dark:text-blue-400',
          title: 'Почніть з цього',
        };
      case 'short':
        return {
          icon: Lightbulb,
          baseStyle:
            'bg-yellow-50 border-yellow-200 text-yellow-800 dark:bg-yellow-900/20 dark:border-yellow-800 dark:text-yellow-200',
          iconColor: 'text-yellow-500 dark:text-yellow-400',
          title: 'Спробуйте додати',
        };
      case 'improvement':
        return {
          icon: Sparkles,
          baseStyle:
            'bg-green-50 border-green-200 text-green-800 dark:bg-green-900/20 dark:border-green-800 dark:text-green-200',
          iconColor: 'text-green-500 dark:text-green-400',
          title: 'Покращення',
        };
      default:
        return {
          icon: Sparkles,
          baseStyle:
            'bg-gray-50 border-gray-200 text-gray-800 dark:bg-gray-900/20 dark:border-gray-800 dark:text-gray-200',
          iconColor: 'text-gray-500 dark:text-gray-400',
          title: 'AI підказки',
        };
    }
  };

  const config = getTypeConfig();
  const Icon = config.icon;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`mt-3 p-4 rounded-lg border ${config.baseStyle}`}
      >
        {/* Заголовок */}
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`p-1.5 rounded-full ${config.baseStyle.split(' ')[0]} border ${config.baseStyle.split(' ')[1]}`}
          >
            <Icon className={`w-4 h-4 ${config.iconColor}`} />
          </div>
          <span className="font-medium">{config.title}</span>
        </div>

        {/* Підказки */}
        <ul className="space-y-3">
          {suggestions.map((suggestion, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-3 group"
            >
              <div className="flex-shrink-0 mt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2 }}
                  className={`w-1.5 h-1.5 rounded-full ${config.iconColor} group-hover:scale-125 transition-transform`}
                />
              </div>
              <motion.span
                whileHover={{ x: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
                className="flex-1 text-sm"
              >
                {suggestion}
              </motion.span>
            </motion.li>
          ))}
        </ul>

        {/* Декоративний елемент */}
        <motion.div
          className="absolute top-3 right-3"
          initial={{ opacity: 0, rotate: -45 }}
          animate={{ opacity: 0.1, rotate: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Icon className="w-24 h-24" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
