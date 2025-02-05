// src/components/features/AchievementNotification.jsx
import React, { useEffect } from 'react';
import { Trophy, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { playAchievementSound } from '@/utils/sound';

const AchievementNotification = ({ achievement, onClose }) => {
  useEffect(() => {
    if (achievement) {
      playAchievementSound();
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 100, opacity: 0 }}
        className="fixed top-4 right-4 w-80 bg-yellow-100 dark:bg-yellow-900/90 border border-yellow-200 dark:border-yellow-700 rounded-lg p-4 shadow-lg z-50"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
            <h4 className="font-medium text-yellow-800 dark:text-yellow-200">
              Нове досягнення!
            </h4>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="text-yellow-800 dark:text-yellow-200 hover:text-yellow-900 dark:hover:text-yellow-100"
          >
            <X className="w-5 h-5" />
          </motion.button>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-yellow-500 dark:bg-yellow-600 rounded-full flex items-center justify-center">
            <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              className="text-2xl"
            >
              {achievement.icon}
            </motion.span>
          </div>
          <div>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="font-medium text-yellow-800 dark:text-yellow-200"
            >
              {achievement.title}
            </motion.p>
            <motion.p
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-sm text-yellow-700 dark:text-yellow-300"
            >
              +{achievement.points} очків
            </motion.p>
          </div>
        </div>
        <motion.p
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mt-2 text-sm text-yellow-700 dark:text-yellow-300"
        >
          {achievement.description}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  );
};

export default AchievementNotification;
