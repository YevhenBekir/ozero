// src/components/features/AchievementNotification.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Star, Crown, ChevronRight, Lock } from 'lucide-react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Achievement = ({ achievement, isUnlocked, progress }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      className={`relative overflow-hidden rounded-lg border ${
        isUnlocked
          ? 'bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700'
          : 'bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700'
      } p-4 transition-all duration-200 group`}
    >
      {/* Фоновий патерн */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYtMi42ODYgNi02cy0yLjY4Ni02LTYtNi02IDIuNjg2LTYgNiAyLjY4NiA2IDYgNnptMCAxMmM2LjYyNyAwIDEyLTUuMzczIDEyLTEyUzQyLjYyNyA2IDM2IDYgMjQgMTEuMzczIDI0IDE4czUuMzczIDEyIDEyIDEyem0wIDEzYzYuNjI3IDAgMTItNS4zNzMgMTItMTJTNDIuNjI3IDE4IDM2IDE4IDI0IDIzLjM3MyAyNCAzMHM1LjM3MyAxMiAxMiAxMnptMCAxNGM2LjYyNyAwIDEyLTUuMzczIDEyLTEyUzQyLjYyNyAzMCAzNiAzMCAyNCAzNS4zNzMgMjQgNDJzNS4zNzMgMTIgMTIgMTJ6Ii8+PC9nPjwvc3ZnPg==')] opacity-50" />
      </div>

      {/* Анімований бордер для розблокованих досягнень */}
      {isUnlocked && (
        <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-400 to-yellow-600 opacity-30 group-hover:opacity-50 blur transition duration-500" />
      )}

      <div className="relative flex items-start gap-4">
        {/* Іконка досягнення */}
        <div
          className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
            isUnlocked
              ? 'bg-yellow-500 text-white'
              : 'bg-gray-200 dark:bg-gray-700'
          }`}
        >
          <motion.div
            animate={isUnlocked ? { rotate: 360 } : {}}
            transition={{ duration: 0.5 }}
            className="text-2xl"
          >
            {isUnlocked ? achievement.icon : <Lock className="w-6 h-6" />}
          </motion.div>
        </div>

        {/* Інформація про досягнення */}
        <div className="flex-1">
          <h4
            className={`font-medium text-lg ${
              isUnlocked
                ? 'text-yellow-800 dark:text-yellow-400'
                : 'text-gray-600 dark:text-gray-400'
            }`}
          >
            {achievement.title}
          </h4>
          <p
            className={`text-sm ${
              isUnlocked
                ? 'text-yellow-700 dark:text-yellow-300'
                : 'text-gray-500 dark:text-gray-500'
            }`}
          >
            {achievement.description}
          </p>

          {/* Прогрес */}
          {progress !== undefined && (
            <div className="mt-2">
              <div className="flex items-center gap-2">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-yellow-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min(100, progress)}%` }}
                  />
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400 min-w-[3rem]">
                  {Math.round(progress)}%
                </span>
              </div>
            </div>
          )}

          {/* Нагорода */}
          <div className="mt-2 flex items-center gap-2">
            <Star
              className={`w-4 h-4 ${
                isUnlocked ? 'text-yellow-500' : 'text-gray-400'
              }`}
            />
            <span
              className={`text-sm ${
                isUnlocked
                  ? 'text-yellow-700 dark:text-yellow-300'
                  : 'text-gray-500'
              }`}
            >
              {achievement.points} очків
            </span>
          </div>
        </div>

        {/* Індикатор розблокування */}
        <div className="flex-shrink-0 self-center">
          <ChevronRight
            className={`w-5 h-5 ${
              isUnlocked ? 'text-yellow-500' : 'text-gray-400'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export const Achievements = ({
  unlockedAchievements = [],
  allAchievements = {},
  totalPoints = 0,
  progress = {},
  newAchievement,
  onNewAchievementClose,
}) => {
  // Анімація для нового досягнення
  const newAchievementAnimation = {
    initial: { x: 100, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 100, opacity: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Нове досягнення */}
      <motion.div
        {...newAchievementAnimation}
        className="fixed top-4 right-4 w-80 z-50"
      >
        {newAchievement && (
          <div className="bg-yellow-100 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
                  Нове досягнення!
                </h4>
              </div>
              <button
                onClick={onNewAchievementClose}
                className="text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100"
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  ×
                </motion.div>
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center">
                <motion.span
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  className="text-2xl"
                >
                  {newAchievement.icon}
                </motion.span>
              </div>
              <div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="font-medium text-yellow-800 dark:text-yellow-200"
                >
                  {newAchievement.title}
                </motion.p>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="text-sm text-yellow-700 dark:text-yellow-300"
                >
                  +{newAchievement.points} очків
                </motion.p>
              </div>
            </div>
          </div>
        )}
      </motion.div>

      {/* Загальний прогрес */}
      <div className="card p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Trophy className="w-6 h-6 text-yellow-500" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Ваші досягнення
            </h3>
          </div>
          <div className="flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
              {totalPoints} очків
            </span>
          </div>
        </div>

        {/* Список досягнень */}
        <div className="grid gap-4">
          {Object.values(allAchievements).map((achievement) => {
            const isUnlocked = unlockedAchievements.some(
              (a) => a.id === achievement.id
            );

            return (
              <Achievement
                key={achievement.id}
                achievement={achievement}
                isUnlocked={isUnlocked}
                progress={progress[achievement.id]}
              />
            );
          })}

          {/* Пустий стан */}
          {Object.values(allAchievements).length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <Trophy className="w-12 h-12 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                У вас поки немає досягнень
              </p>
              <p className="text-sm text-gray-400 dark:text-gray-500">
                Продовжуйте працювати над своїми історіями!
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Achievements;
