// src/components/modals/AchievementsModal.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Lock, X } from 'lucide-react';

export const AchievementsModal = ({
  isOpen,
  onClose,
  achievements = {}, // Змінили з масиву на об'єкт
  unlockedAchievements = [],
  totalPoints = 0,
  progress = {},
}) => {
  if (!isOpen) return null;

  // Конвертуємо об'єкт досягнень в масив
  const achievementsArray = Object.values(achievements);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Досягнення
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

        {/* Stats */}
        <div
          className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 
                     bg-gray-50 dark:bg-gray-700/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Загальний рахунок
              </p>
              <p className="text-2xl font-bold text-yellow-500 flex items-center gap-2">
                <Star className="w-5 h-5" />
                {totalPoints} очків
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Розблоковано
              </p>
              <p className="text-2xl font-bold text-gray-700 dark:text-gray-300">
                {unlockedAchievements.length} / {achievementsArray.length}
              </p>
            </div>
          </div>
        </div>

        {/* Achievements List */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-250px)]">
          <div className="grid gap-4">
            {achievementsArray.map((achievement) => {
              const isUnlocked = unlockedAchievements.some(
                (a) => a.id === achievement.id
              );
              const currentProgress = progress[achievement.id] || 0;

              return (
                <motion.div
                  key={achievement.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-4 rounded-lg border relative overflow-hidden
                    ${
                      isUnlocked
                        ? 'border-yellow-200 dark:border-yellow-700 bg-yellow-50 dark:bg-yellow-900/20'
                        : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700'
                    }`}
                >
                  {/* Rest of the achievement card content... */}
                  <div className="flex items-start gap-4 relative z-10">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center
                      ${
                        isUnlocked
                          ? 'bg-yellow-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                    >
                      {isUnlocked ? (
                        <span className="text-2xl">{achievement.icon}</span>
                      ) : (
                        <Lock className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>

                    <div className="flex-1">
                      <h4
                        className={`font-medium ${
                          isUnlocked
                            ? 'text-yellow-800 dark:text-yellow-300'
                            : 'text-gray-700 dark:text-gray-300'
                        }`}
                      >
                        {achievement.title}
                      </h4>
                      <p
                        className={`text-sm mt-1 ${
                          isUnlocked
                            ? 'text-yellow-700 dark:text-yellow-400'
                            : 'text-gray-500 dark:text-gray-400'
                        }`}
                      >
                        {achievement.description}
                      </p>

                      {/* Progress */}
                      {currentProgress > 0 && currentProgress < 100 && (
                        <div className="mt-2">
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-600 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500"
                                style={{ width: `${currentProgress}%` }}
                              />
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              {Math.round(currentProgress)}%
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Points */}
                      <div className="mt-2 flex items-center gap-1">
                        <Star
                          className={`w-4 h-4 ${
                            isUnlocked
                              ? 'text-yellow-500'
                              : 'text-gray-400 dark:text-gray-500'
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            isUnlocked
                              ? 'text-yellow-700 dark:text-yellow-400'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {achievement.points} очків
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default AchievementsModal;
