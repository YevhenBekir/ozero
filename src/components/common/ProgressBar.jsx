// src/components/common/ProgressBar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Circle } from 'lucide-react';

export const ProgressBar = ({ progress }) => {
  const { steps, totalProgress } = progress;

  return (
    <div className="card p-6 mb-8">
      {/* Загальний прогрес */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Загальний прогрес
          </span>
          <motion.span
            key={totalProgress}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-sm font-medium text-gray-700 dark:text-gray-300"
          >
            {Math.round(totalProgress)}%
          </motion.span>
        </div>
        <div className="relative w-full h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${totalProgress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-yellow-500 to-yellow-400"
          />
          {/* Анімований блік */}
          <motion.div
            animate={{
              x: ['0%', '100%'],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              ease: 'linear',
              repeat: Infinity,
              repeatDelay: 1,
            }}
            className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
          />
        </div>
      </div>

      {/* Кроки */}
      <div className="space-y-4">
        {steps.map(({ field, percentage, isComplete }) => (
          <motion.div
            key={field}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="flex items-center gap-4"
          >
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex-shrink-0"
            >
              {isComplete ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : (
                <Circle className="w-5 h-5 text-gray-400 dark:text-gray-600" />
              )}
            </motion.div>

            <div className="flex-grow">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                  {field}
                </span>
                <motion.span
                  key={percentage}
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  {Math.round(percentage)}%
                </motion.span>
              </div>
              <div className="relative w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className={`absolute top-0 left-0 h-full rounded-full ${
                    isComplete ? 'bg-green-500' : 'bg-yellow-500'
                  }`}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
